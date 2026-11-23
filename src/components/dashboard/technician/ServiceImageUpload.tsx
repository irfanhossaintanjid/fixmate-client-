"use client";

import Image from "next/image";
import { useRef, type ChangeEvent } from "react";
import { ImagePlus, Trash2, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = { file: File | null; preview: string | null; existingImage?: string; error?: string; onChange: (file: File | null, error?: string) => void };
const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp"]);
const maxSize = 2 * 1024 * 1024;

export function ServiceImageUpload({ file, preview, existingImage, error, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(event: ChangeEvent<HTMLInputElement>) {
    const selected = event.currentTarget.files?.[0] ?? null;
    event.currentTarget.value = "";
    if (!selected) return;
    if (!allowedTypes.has(selected.type)) return onChange(null, "Choose a JPG, PNG, or WebP image.");
    if (selected.size > maxSize) return onChange(null, "Choose an image no larger than 2 MB.");
    onChange(selected);
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3"><div><h3 className="text-sm font-medium text-foreground">Upload Service Image <span className="text-destructive" aria-hidden="true">*</span></h3><p id="service-image-hint" className="mt-1 text-xs text-muted-foreground">JPG, PNG or WebP, up to 2 MB.</p></div>{file && <Button type="button" variant="ghost" onClick={() => onChange(null)} className="min-h-10 text-xs text-destructive"><Trash2 className="size-4" aria-hidden="true" /> Remove</Button>}</div>
      <button type="button" onClick={() => inputRef.current?.click()} aria-describedby={error ? "service-image-hint service-image-error" : "service-image-hint"} data-invalid={Boolean(error)} className="group relative flex min-h-52 w-full flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed border-border bg-muted/25 p-4 text-center transition hover:border-primary/50 hover:bg-primary/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring data-[invalid=true]:border-destructive">
        {preview || existingImage ? <><Image src={preview || existingImage || ""} alt={preview ? "Selected service preview" : "Current service image"} fill unoptimized sizes="(max-width: 768px) 100vw, 720px" className="object-cover" /><span className="absolute inset-x-0 bottom-0 flex min-h-11 items-center justify-center gap-2 bg-black/65 px-3 text-xs font-medium text-white"><ImagePlus className="size-4" aria-hidden="true" /> Replace image</span></> : <><span className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary"><UploadCloud className="size-6" aria-hidden="true" /></span><span className="mt-3 text-sm font-semibold text-foreground">Choose an image from your device</span><span className="mt-1 text-xs text-muted-foreground">A clear image helps customers understand your service.</span></>}
      </button>
      <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" aria-label="Upload service image" aria-describedby={error ? "service-image-hint service-image-error" : "service-image-hint"} onChange={handleFile} />
      {file && <p className="truncate text-xs text-muted-foreground" title={file.name}>Selected: {file.name}</p>}
      {error && <p id="service-image-error" className="text-xs text-destructive" role="alert">{error}</p>}
    </div>
  );
}
