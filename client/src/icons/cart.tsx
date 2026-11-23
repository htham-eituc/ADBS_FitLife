import type { IconProps } from "@/icons/types";

export function CartIcon(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        d="M3.75 4.5h1.6c.46 0 .86.31.97.76l2.1 8.48c.11.45.51.76.97.76h7.92c.45 0 .85-.3.97-.74l1.58-5.76H7.02M10 19a1 1 0 11-2 0 1 1 0 012 0zm8 0a1 1 0 11-2 0 1 1 0 012 0z"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
