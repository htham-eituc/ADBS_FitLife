import type { ComponentProps } from "react";
import { cn } from "@/utils";

// Settings-style rows for existing information fields and editable fields.
export default function InfoList({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "space-y-4 [&>[data-slot=info-field]]:grid [&>[data-slot=info-field]]:items-start [&>[data-slot=info-field]]:gap-x-6 [&>[data-slot=info-field]]:gap-y-2 sm:[&>[data-slot=info-field]]:grid-cols-[minmax(8rem,0.3fr)_minmax(0,1fr)] [&_[data-slot=info-label]]:py-2 [&_[data-slot=info-value]]:min-h-10 [&_[data-slot=info-value]]:rounded-lg [&_[data-slot=info-value]]:border [&_[data-slot=info-value]]:border-black/10 [&_[data-slot=info-value]]:bg-gray-50 [&_[data-slot=info-value]]:px-3 [&_[data-slot=info-value]]:py-2 [&_[data-slot=info-value]]:text-sm [&>[data-slot=field]]:grid [&>[data-slot=field]]:items-start [&>[data-slot=field]]:gap-x-6 [&>[data-slot=field]]:gap-y-2 sm:[&>[data-slot=field]]:grid-cols-[minmax(8rem,0.3fr)_minmax(0,1fr)] [&>[data-slot=field]>[data-slot=field-label]]:py-2 [&>[data-slot=field]>[data-slot=field-label]]:font-normal",
        className,
      )}
      {...props}
    />
  );
}
