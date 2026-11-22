import { buttonVariants } from "@/components/ui/button";
import { DumbbellsIcon } from "@/icons/dumbbells";
import { cn } from "@/utils";

type FitLifeIconProps = {
  size?: "icon" | "icon-sm";
};

export default function FitLifeIcon({ size = "icon" }: FitLifeIconProps) {
  return (
    <span className={cn(buttonVariants({ size }))} aria-hidden="true">
      <DumbbellsIcon className="size-6" />
    </span>
  );
}
