export async function uploadImage(file: File, options: { profile?: boolean; service?: boolean } = {}): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const context = options.profile ? "profile" : options.service ? "service" : null;
  const uploadUrl = context ? `/api/upload?context=${context}` : "/api/upload";
  const response = await fetch(uploadUrl, { method: "POST", body: formData });
  if (!response.ok) {
    let message = "Photo upload failed. Try again.";
    try {
      const result = await response.json() as { message?: unknown };
      if (typeof result.message === "string") message = result.message;
    } catch {
      // Keep a safe user-facing fallback for non-JSON responses.
    }
    throw new Error(message);
  }

  const result = await response.json() as { url?: unknown };
  if (typeof result.url !== "string") throw new Error("Image upload failed");
  return result.url;
}
