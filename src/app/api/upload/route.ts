import "server-only";

const MAX_FILE_SIZE = 2 * 1024 * 1024;
const MAX_REQUEST_SIZE = MAX_FILE_SIZE + 64 * 1024;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_UPLOADS_PER_WINDOW = 5;
const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp"]);
const rateLimit = new Map<string, { count: number; resetAt: number }>();

function getClientIp(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || request.headers.get("x-real-ip")
    || "unknown";
}

function isAllowedOrigin(origin: string | null) {
  if (!origin) return false;
  const configuredOrigins = [
    process.env.BETTER_AUTH_URL,
    ...(process.env.BETTER_AUTH_TRUSTED_ORIGINS ?? "").split(","),
  ];
  let requestOrigin: string;
  try {
    requestOrigin = new URL(origin).origin;
  } catch {
    return false;
  }
  return configuredOrigins.some((configuredOrigin) => {
    if (!configuredOrigin?.trim()) return false;
    try {
      return new URL(configuredOrigin.trim()).origin === requestOrigin;
    } catch {
      return false;
    }
  });
}

function isRateLimited(ip: string) {
  const now = Date.now();
  if (rateLimit.size > 5000) {
    for (const [key, entry] of rateLimit) {
      if (entry.resetAt <= now) rateLimit.delete(key);
    }
  }
  const current = rateLimit.get(ip);
  if (!current && rateLimit.size >= 5000) return true;
  if (!current || current.resetAt <= now) {
    rateLimit.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  current.count += 1;
  return current.count > MAX_UPLOADS_PER_WINDOW;
}

export async function POST(request: Request) {
  if (!isAllowedOrigin(request.headers.get("origin"))) {
    return Response.json({ message: "Upload request is not allowed." }, { status: 403 });
  }

  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return Response.json({ message: "Too many upload attempts. Please try again later." }, { status: 429 });
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_REQUEST_SIZE) {
    return Response.json({ message: "Image must be 2 MB or smaller." }, { status: 413 });
  }
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("multipart/form-data")) {
    return Response.json({ message: "Choose an image to upload." }, { status: 400 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");
    if (!(file instanceof File)) {
      return Response.json({ message: "Choose an image to upload." }, { status: 400 });
    }
    if (!allowedTypes.has(file.type)) {
      return Response.json({ message: "Choose a JPG, PNG, or WebP image." }, { status: 400 });
    }
    if (file.size > MAX_FILE_SIZE) {
      return Response.json({ message: "Image must be 2 MB or smaller." }, { status: 400 });
    }

    const apiKey = process.env.IMGBB_API_KEY;
    if (!apiKey) return Response.json({ message: "Image upload is temporarily unavailable." }, { status: 500 });

    const uploadBody = new FormData();
    uploadBody.append("image", file, file.name);
    const uploadUrl = new URL("https://api.imgbb.com/1/upload");
    uploadUrl.searchParams.set("key", apiKey);

    const upstream = await fetch(uploadUrl, { method: "POST", body: uploadBody, cache: "no-store" });
    if (!upstream.ok) return Response.json({ message: "Image upload failed." }, { status: 500 });

    const result = await upstream.json() as { success?: boolean; data?: { url?: string } };
    const imageUrl = result.data?.url;
    if (!result.success || !imageUrl || !isImgBbUrl(imageUrl)) {
      return Response.json({ message: "Image upload failed." }, { status: 500 });
    }

    return Response.json({ url: imageUrl });
  } catch {
    return Response.json({ message: "Image upload failed." }, { status: 500 });
  }
}

function isImgBbUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && url.hostname === "i.ibb.co" && !url.port && !url.username && !url.password;
  } catch {
    return false;
  }
}
