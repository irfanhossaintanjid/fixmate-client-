"use client";

import { useRef } from "react";
import { Camera, ImagePlus, Info, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { UserRole } from "@/lib/roles";

type ProfilePhotoCardProps = {
  name: string;
  role: UserRole;
  image?: string | null;
  previewUrl?: string | null;
  error?: string;
  onSelect: (file: File | null, error?: string) => void;
};

const imageTypes = new Set(["image/jpeg", "image/png", "image/webp"]);
const maxFileSize = 2 * 1024 * 1024;

export function ProfilePhotoCard({ name, role, image, previewUrl, error, onSelect }: ProfilePhotoCardProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const initials = name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase() || "FM";
  const roleLabel = role.charAt(0).toUpperCase() + role.slice(1);

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.currentTarget.files?.[0];
    event.currentTarget.value = "";
    if (!file) return;
    if (!imageTypes.has(file.type)) {
      onSelect(null, "Choose a JPG, PNG or WebP image.");
      return;
    }
    if (file.size > maxFileSize) {
      onSelect(null, "Choose an image up to 2 MB.");
      return;
    }
    onSelect(file);
  }

  return (
    <Card className="h-fit rounded-2xl border-border bg-card shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between px-5 pb-1 pt-5">
        <CardTitle className="text-base font-semibold">Profile Photo</CardTitle>
        <Camera className="size-4 text-muted-foreground" aria-hidden="true" />
      </CardHeader>
      <CardContent className="flex flex-col items-center px-5 pb-5 pt-4 text-center">
        <div className="relative">
          <Avatar className="size-24 border-4 border-card shadow-md ring-1 ring-border sm:size-28">
            {previewUrl || image ? <AvatarImage src={previewUrl || image || undefined} alt={`${name}'s profile photo`} /> : null}
            <AvatarFallback className="bg-secondary text-xl font-semibold text-primary">{initials}</AvatarFallback>
          </Avatar>
          <span className="absolute bottom-0 right-0 flex size-8 items-center justify-center rounded-full border-2 border-card bg-primary text-primary-foreground shadow-sm" aria-hidden="true">
            <Camera className="size-3.5" />
          </span>
        </div>
        <p className="mt-4 max-w-full truncate text-sm font-semibold text-foreground" title={name}>{name}</p>
        <Badge variant="secondary" className="mt-1 rounded-full border-0 bg-primary/10 px-2.5 text-primary">{roleLabel}</Badge>

        <label className="mt-4 flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-border bg-secondary/70 px-3 text-sm font-medium text-primary transition hover:bg-secondary focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
          <ImagePlus className="size-4" aria-hidden="true" />
          Change Photo
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="sr-only"
            aria-label="Choose a profile photo"
            aria-describedby={error ? "profile-photo-hint profile-photo-error" : "profile-photo-hint"}
            aria-invalid={Boolean(error)}
            onChange={handleFileChange}
          />
        </label>
        <p id="profile-photo-hint" className="mt-2 text-xs text-muted-foreground">JPG, PNG or WebP, up to 2 MB.</p>
        {error && <p id="profile-photo-error" className="mt-2 text-xs text-destructive" role="alert">{error}</p>}
        {previewUrl && (
          <Button type="button" variant="ghost" onClick={() => onSelect(null)} className="mt-2 min-h-10 text-xs text-muted-foreground hover:text-foreground">
            <X className="size-3.5" aria-hidden="true" /> Remove selected photo
          </Button>
        )}
        <p className="mt-3 flex items-start gap-2 rounded-lg bg-secondary/70 px-3 py-2 text-left text-[11px] leading-4 text-muted-foreground">
          <Info className="mt-0.5 size-3.5 shrink-0 text-primary" aria-hidden="true" />
          New photo will preview here before saving.
        </p>
      </CardContent>
    </Card>
  );
}
