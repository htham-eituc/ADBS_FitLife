import type { ReactNode } from "react";
import { cn } from "@/utils";
interface InfoFieldProps {
  label: string;
  value: ReactNode;
  className?: string;
}

export default function InfoField({ label, value, className }: InfoFieldProps) {
  return (
    <div data-slot="info-field" className={cn("flex min-w-0 flex-col gap-1 sm:gap-2", className)}>
      <p data-slot="info-label" className="text-xs font-normal text-gray-500 sm:text-sm">{label}</p>
      <div data-slot="info-value" className="min-w-0 break-words text-sm font-medium text-gray-800 sm:text-base">
        {value ?? "—"}
      </div>
    </div>
  );
}
