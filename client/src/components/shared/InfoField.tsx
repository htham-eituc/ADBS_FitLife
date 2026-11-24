import type { ReactNode } from "react";
import { cn } from "@/utils";
interface InfoFieldProps {
  label: string;
  value: ReactNode;
  className?: string;
}

export default function InfoField({ label, value, className }: InfoFieldProps) {
  return (
    <div className={cn("flex flex-col gap-1 sm:gap-2", className)}>
      <p className="text-xs font-normal text-gray-500 sm:text-sm dark:text-gray-400">
        {label}
      </p>
      <p className="text-sm font-medium text-gray-800 sm:text-base dark:text-white/90">
        {value || "—"}
      </p>
    </div>
  );
}
