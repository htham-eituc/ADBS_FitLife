import type { IconProps } from "@/icons/types";

export function UsersIcon(props: IconProps) {
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
        d="M16.5 19.5v-1.25a3.75 3.75 0 00-3.75-3.75h-5.5A3.75 3.75 0 003.5 18.25v1.25M18 14.75a3.25 3.25 0 012.75 3.2v1.55M15.5 4.6a3.25 3.25 0 010 6.3M13 7.75a3.25 3.25 0 11-6.5 0 3.25 3.25 0 016.5 0z"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
