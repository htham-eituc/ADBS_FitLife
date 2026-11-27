import type { IconProps } from "@/icons/types";

export function DoorIcon(props: IconProps) {
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
        d="M14 20.25H5.75V4.6c0-.48.4-.85.87-.8l6.5.73c.5.06.88.48.88.99v14.73zm0 0h4.25V6.25H14M11 12.75v-1.5"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
