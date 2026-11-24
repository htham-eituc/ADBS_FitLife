import type { IconProps } from "@/icons/types";

export function BellIcon(props: IconProps) {
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
        d="M9.75 19.25a2.25 2.25 0 004.5 0M6.25 10a5.75 5.75 0 0111.5 0v3.6l1.5 2.65H4.75l1.5-2.65V10z"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
