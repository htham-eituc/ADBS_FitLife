import { cn } from "@/utils/index";
import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

// Shopco button variants, with existing FitLife sizes and Base UI render support.
const buttonVariants = cva(
  "group/button [--icon-color:#000] inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-black/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 aria-invalid:ring-2 aria-invalid:ring-red-500 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-5",
  {
    variants: {
      variant: {
        default: "[--icon-color:#fff] bg-black text-white hover:bg-black/90",
        destructive: "[--icon-color:#fff] bg-[#FF3333] text-white hover:bg-[#FF3333]/90",
        outline:
          "border border-black/10 bg-white text-black hover:bg-[#F0F0F0]",
        secondary: "bg-[#F0F0F0] text-black hover:bg-[#F0F0F0]/80",
        ghost: "bg-transparent text-black hover:bg-[#F0F0F0]",
        link: "h-auto! p-0! text-black underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 gap-2 px-6 py-3",
        xs: "h-8 gap-1.5 px-3 text-xs",
        sm: "h-9 gap-1.5 px-4 text-sm",
        lg: "h-[52px] gap-2 px-8 py-4",
        icon: "size-10 p-0",
        "icon-xs": "size-8 p-0",
        "icon-sm": "size-9 p-0",
        "icon-lg": "size-11 p-0",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
