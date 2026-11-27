import type { IconProps } from "@/icons/types";

export function TierIcon({ tier, ...props }: IconProps & { tier: string }) {
  return (
    <svg
      data-slot="icon"
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {tier === "Platinum" ? (
        <>
          <path d="m3 9 4-5h10l4 5-9 12L3 9Z" />
          <path d="M3 9h18M7 4l5 17 5-17M7 9l5-5 5 5" />
        </>
      ) : tier === "Gold" ? (
        <>
          <path d="m3 6 5 5 4-7 4 7 5-5-2 12H5L3 6Z" />
          <path d="M5 21h14" />
        </>
      ) : (
        <>
          <circle cx="12" cy="9" r="6" />
          <circle cx="12" cy="9" r="2" />
          <path d="m7 13-2 8 7-3 7 3-2-8" />
        </>
      )}
    </svg>
  );
}
