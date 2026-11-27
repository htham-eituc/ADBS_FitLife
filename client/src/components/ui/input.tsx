import { useField } from "@/components/ui/field";
import { cn } from "@/utils/index";
import { Input as InputPrimitive } from "@base-ui/react/input";
import * as React from "react";

function Input({
  className,
  type,
  id,
  ...props
}: React.ComponentProps<"input">) {
  const field = useField();
  const resolvedId = id ?? field?.id;

  return (
    <InputPrimitive
      type={type}
      id={resolvedId}
      data-slot="input"
      className={cn(
        "h-12 w-full min-w-0 rounded-full border border-transparent bg-[#F0F0F0] px-4 py-3 text-sm font-normal text-black outline-none transition-all placeholder:text-black/40 focus:border-black/20 focus:ring-2 focus:ring-black/10 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-[#FF3333] aria-invalid:ring-2 aria-invalid:ring-[#FF3333]/20 file:mr-3 file:border-0 file:bg-transparent file:text-sm",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
