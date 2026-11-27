import type { IconProps } from "@/icons/types";

export function HeartIcon(props: IconProps) {
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
        d="M12 19.25s-7.25-4.1-7.25-9.3A4.2 4.2 0 0112 7.3a4.2 4.2 0 017.25 2.65c0 5.2-7.25 9.3-7.25 9.3z"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
