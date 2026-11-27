import { cn } from "@/utils/index";
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";

const badgeVariants = cva(
  "group/badge [--icon-color:#000] inline-flex w-fit shrink-0 items-center justify-center gap-1 font-medium whitespace-nowrap transition-colors select-none [&>svg]:pointer-events-none [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        light: "",
        solid: "",
        ghost: "bg-transparent",
      },
      color: {
        primary: "",
        success: "",
        error: "",
        warning: "",
        info: "",
        gray: "",
        light: "",
        dark: "",
      },
      size: {
        sm: "h-5.5 rounded-full px-2 py-0.5 text-xs [&:has(>svg:first-child)]:ps-1.5 [&:has(>svg:last-child)]:pe-1.5 [&>svg]:size-3",
        default:
          "h-6 rounded-full px-2.5 py-0.5 text-sm [&:has(>svg:first-child)]:ps-2 [&:has(>svg:last-child)]:pe-2 [&>svg]:size-3.5",
        lg: "h-7 rounded-full px-3 py-1 text-sm [&:has(>svg:first-child)]:ps-2.5 [&:has(>svg:last-child)]:pe-2.5 [&>svg]:size-3.5",
      },
    },
    compoundVariants: [
      // Ghost size overrides
      {
        variant: "ghost",
        className:
          "px-0 py-0 [&:has(>svg:first-child)]:ps-0 [&:has(>svg:last-child)]:pe-0",
      },
      // Primary
      {
        variant: "light",
        color: "primary",
        className: "bg-brand-50 text-brand-500",
      },
      {
        variant: "solid",
        color: "primary",
        className: "bg-brand-500 text-white [--icon-color:#fff] shadow-none",
      },
      {
        variant: "ghost",
        color: "primary",
        className: "text-brand-500",
      },
      // Success
      {
        variant: "light",
        color: "success",
        className: "bg-green-50 text-green-600",
      },
      {
        variant: "solid",
        color: "success",
        className: "bg-green-500 text-white [--icon-color:#fff] shadow-none",
      },
      {
        variant: "ghost",
        color: "success",
        className: "text-green-600",
      },
      // Error
      {
        variant: "light",
        color: "error",
        className: "bg-[#FF3333]/10 text-[#FF3333]",
      },
      {
        variant: "solid",
        color: "error",
        className: "bg-red-500 text-white [--icon-color:#fff] shadow-none",
      },
      {
        variant: "ghost",
        color: "error",
        className: "text-red-600",
      },
      // Warning
      {
        variant: "light",
        color: "warning",
        className: "bg-amber-50 text-amber-600",
      },
      {
        variant: "solid",
        color: "warning",
        className: "bg-amber-500 text-white [--icon-color:#fff] shadow-none",
      },
      {
        variant: "ghost",
        color: "warning",
        className: "text-amber-600",
      },
      // Info
      {
        variant: "light",
        color: "info",
        className: "bg-gray-100 text-black",
      },
      {
        variant: "solid",
        color: "info",
        className: "bg-black text-white [--icon-color:#fff] shadow-none",
      },
      {
        variant: "ghost",
        color: "info",
        className: "text-black",
      },
      // Gray
      {
        variant: "light",
        color: "gray",
        className: "bg-gray-100 text-gray-700",
      },
      {
        variant: "solid",
        color: "gray",
        className: "bg-gray-700 text-white [--icon-color:#fff] shadow-none",
      },
      {
        variant: "ghost",
        color: "gray",
        className: "text-gray-700",
      },
      // Light (alias)
      {
        variant: "light",
        color: "light",
        className: "bg-gray-100 text-gray-700",
      },
      {
        variant: "solid",
        color: "light",
        className: "bg-gray-400 text-white [--icon-color:#fff]",
      },
      {
        variant: "ghost",
        color: "light",
        className: "text-gray-700",
      },
      // Dark (alias)
      {
        variant: "light",
        color: "dark",
        className: "bg-gray-500/15 text-gray-800",
      },
      {
        variant: "solid",
        color: "dark",
        className: "bg-gray-800 text-white [--icon-color:#fff]",
      },
      {
        variant: "ghost",
        color: "dark",
        className: "text-gray-800",
      },
    ],
    defaultVariants: {
      variant: "light",
      color: "primary",
      size: "default",
    },
  },
);

export interface BadgeProps
  extends
    Omit<useRender.ComponentProps<"span">, "color">,
    VariantProps<typeof badgeVariants> {}

function Badge({
  className,
  variant = "light",
  color = "primary",
  size = "default",
  render,
  ...props
}: BadgeProps) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps(
      {
        className: cn(badgeVariants({ variant, color, size }), className),
      },
      props,
    ),
    render,
    state: {
      slot: "badge",
      variant,
      color,
      size,
    },
  });
}

export { Badge, badgeVariants };
