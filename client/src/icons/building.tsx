import type { IconProps } from "@/icons/types";

export function BuildingIcon(props: IconProps) {
  return (
    <svg data-slot="icon"
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        d="M4.75 19.25h14.5M6.25 19.25V5.75a1 1 0 011-1h6.5a1 1 0 011 1v13.5m0-9.5h2a1 1 0 011 1v8.5M9 8.25h2.5M9 11.25h2.5M9 14.25h2.5"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
