import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

type RouteContext = { params: Promise<{ path: string[] }> };

async function forward(request: Request, context: RouteContext) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { path } = await context.params;
  const safePath = path.map((part) => encodeURIComponent(part)).join("/");
  const baseUrl = process.env.NEXT_PUBLIC_API_URL?.trim().replace(/\/$/, "");
  if (!baseUrl) return NextResponse.json({ message: "The API URL is not configured." }, { status: 500 });

  const incomingUrl = new URL(request.url);
  const target = `${baseUrl}/api/${safePath}${incomingUrl.search}`;
  const requestHeaders = new Headers({ Authorization: `Bearer ${session.session.token}` });
  if (request.headers.get("content-type")) requestHeaders.set("content-type", request.headers.get("content-type")!);
  const response = await fetch(target, {
    method: request.method,
    headers: requestHeaders,
    body: request.method === "GET" || request.method === "HEAD" ? undefined : await request.text(),
    cache: "no-store",
  });
  const body = await response.text();
  return new NextResponse(body, {
    status: response.status,
    headers: { "content-type": response.headers.get("content-type") || "application/json" },
  });
}

export const GET = forward;
export const POST = forward;
export const PATCH = forward;
