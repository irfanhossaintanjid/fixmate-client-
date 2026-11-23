"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";

export function CopyTransactionButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      toast.add({ title: "Could not copy transaction ID", description: "Select and copy the ID manually.", type: "error" });
    }
  };
  return <Button type="button" variant="ghost" size="icon-sm" className="size-9" onClick={() => void copy()} aria-label="Copy transaction ID">{copied ? <Check className="text-green-600" /> : <Copy />}</Button>;
}
