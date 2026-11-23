"use client";

import Image from "next/image";
import { useState } from "react";
import { Wrench } from "lucide-react";

export function ServiceThumbnail({ src, alt, className = "size-12" }: { src?: string; alt: string; className?: string }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) return <span className={`flex shrink-0 items-center justify-center rounded-xl bg-secondary text-primary ${className}`}><Wrench className="size-5" aria-hidden="true" /></span>;
  return <span className={`relative block shrink-0 overflow-hidden rounded-xl bg-secondary ${className}`}><Image src={src} alt={alt} fill sizes="64px" className="object-cover" onError={() => setFailed(true)} /></span>;
}
