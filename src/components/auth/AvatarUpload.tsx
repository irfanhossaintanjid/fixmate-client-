"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ImagePlus, Trash2, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";

const MAX_FILE_SIZE = 2 * 1024 * 1024;
const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp"]);

export function AvatarUpload({
  file,
  onChange,
  disabled = false,
}: {
  file: File | null;
  onChange: (file: File | null) => void;
  disabled?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selected = event.target.files?.[0] ?? null;
    if (!selected) return;
    if (!allowedTypes.has(selected.type)) {
      setError("Choose a JPG, PNG, or WebP image.");
      setPreviewUrl(null);
      onChange(null);
      event.target.value = "";
      return;
    }
    if (selected.size > MAX_FILE_SIZE) {
      setError("Image must be 2 MB or smaller.");
      setPreviewUrl(null);
      onChange(null);
      event.target.value = "";
      return;
    }
    setError("");
    setPreviewUrl(URL.createObjectURL(selected));
    onChange(selected);
  }

  function removeFile() {
    onChange(null);
    setError("");
    setPreviewUrl(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  const descriptionId = error ? "profile-photo-hint profile-photo-error" : "profile-photo-hint";

  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-background/60 p-2.5 sm:gap-4 sm:p-3">
      <div className="relative grid size-14 shrink-0 place-items-center overflow-hidden rounded-full border border-border bg-secondary text-primary sm:size-16">
        {previewUrl ? (
          <Image src={previewUrl} alt="Profile photo preview" fill sizes="64px" unoptimized className="object-cover" />
        ) : (
          <UserRound className="size-6" aria-hidden="true" />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold text-foreground">Profile photo <span className="font-normal text-muted-foreground">(optional)</span></p>
        <p id="profile-photo-hint" className="mt-1 text-[11px] leading-4 text-muted-foreground">Optional. JPG, PNG or WebP, up to 2 MB.</p>
        {error && <p id="profile-photo-error" className="mt-1 text-xs text-destructive" role="alert">{error}</p>}
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <Button
            type="button"
            variant="outline"
            disabled={disabled}
            aria-controls="profile-photo-input"
            aria-describedby={descriptionId}
            onClick={() => inputRef.current?.click()}
            className="h-9 min-h-9 rounded-lg px-3 text-xs focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <ImagePlus className="size-3.5" aria-hidden="true" /> {file ? "Change" : "Upload photo"}
          </Button>
          {file && (
            <Button
              type="button"
              variant="ghost"
              disabled={disabled}
              onClick={removeFile}
              className="h-9 min-h-9 rounded-lg px-2.5 text-xs text-muted-foreground hover:text-destructive focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Trash2 className="size-3.5" aria-hidden="true" /> Remove
            </Button>
          )}
          <input
            ref={inputRef}
            id="profile-photo-input"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileChange}
            aria-label="Choose an optional profile photo"
            aria-invalid={Boolean(error)}
            aria-describedby={descriptionId}
            className="sr-only"
            tabIndex={-1}
          />
        </div>
      </div>
    </div>
  );
}
