import type { IconProps } from "@/icons/types";

export function WalletIcon(props: IconProps) {
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
        d="M19.25 9.25V7.5a2.25 2.25 0 00-2.25-2.25H6.5A2.25 2.25 0 004.25 7.5v9A2.25 2.25 0 006.5 18.75H17a2.25 2.25 0 002.25-2.25v-1.75m0-5.5h-3.5a2.75 2.75 0 000 5.5h3.5m0-5.5a1 1 0 011 1v3.5a1 1 0 01-1 1M15.9 12h.01"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
