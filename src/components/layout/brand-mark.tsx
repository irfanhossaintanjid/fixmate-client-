"use client";

import Image from "next/image";
import lightLogo from "@/app/assets/fixmate-icon-light.png";
import darkLogo from "@/app/assets/fixmate-icon-dark.png";
import { useTheme } from "@/components/layout/theme-provider";

export function BrandMark({ className = "size-10 rounded-xl" }: { className?: string }) {
  const { theme } = useTheme();

  return (
    <Image
      src={theme === "dark" ? darkLogo : lightLogo}
      alt=""
      width={40}
      height={40}
      priority
      className={`${className} object-contain`}
    />
  );
}
