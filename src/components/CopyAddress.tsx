"use client";
import { useToast } from "@/hooks/use-toast";
import { shortPubKey } from "@/lib/shortAddress";
import { cn } from "@/lib/utils";
import { Copy } from "lucide-react";

export default function CopyAddress({
  address,
  label,
  size = "default",
  len,
}: {
  address: string;
  label?: string;
  size?: "default" | "small";
  len?: number;
}) {
  const { toast } = useToast();
  if (!address) {
    return null;
  }
  const copyEl = (
    <div
      className="flex flex-row items-center gap-2 line-clamp-1 w-fit cursor-pointer max-sm:gap-1"
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        navigator.clipboard.writeText(address);
        toast({
          title: "Address copied",
          description: address,
        });
      }}
    >
      <span className={cn("font-normal", size === "small" && "text-xs")}>
        {shortPubKey(address, { len })}
      </span>
      <Copy
        className={cn(" size-5 max-sm:size-4", size === "small" && "size-4")}
      />
    </div>
  );
  if (!label) {
    return copyEl;
  }
  return (
    <div className="w-full flex flex-row justify-between items-center gap-6">
      <div className="text-secondary font-bold line-clamp-1">{label}</div>
      {copyEl}
    </div>
  );
}
