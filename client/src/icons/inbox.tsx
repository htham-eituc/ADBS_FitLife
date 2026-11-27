import type { IconProps } from "@/icons/types";

export function InboxIcon(props: IconProps) {
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
        d="M4.75 13.25h3.6l1.15 2.5h5l1.15-2.5h3.6M4.75 13.25l2.1-7.2c.13-.46.55-.8 1.03-.8h8.24c.48 0 .9.34 1.03.8l2.1 7.2M4.75 13.25v4a2 2 0 002 2h10.5a2 2 0 002-2v-4"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
