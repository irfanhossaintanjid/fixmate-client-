export async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("/api/upload", { method: "POST", body: formData });
  if (!response.ok) throw new Error("Image upload failed");

  const result = await response.json() as { url?: unknown };
  if (typeof result.url !== "string") throw new Error("Image upload failed");
  return result.url;
}
