import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown";
import { ChevronDownIcon } from "@/icons/chevron-down";
import { cn } from "@/utils";

const roles = ["Hội viên", "Huấn luyện viên", "Nhân viên"];

type UserRoleDropdownProps = {
  role: string;
  onRoleChange: (role: string) => void;
};

export default function UserRoleDropdown({
  role,
  onRoleChange,
}: UserRoleDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger
        render={<Button variant="outline" />}
        aria-label={`Vai trò hiện tại: ${role}`}
      >
        {role}
        <ChevronDownIcon
          className={cn(
            "size-5 text-gray-500 duration-200 dark:text-gray-400",
            isOpen ? "rotate-180" : "rotate-0",
          )}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={12}>
        <DropdownMenuRadioGroup value={role} onValueChange={onRoleChange}>
          {roles.map((item) => (
            <DropdownMenuRadioItem key={item} value={item} closeOnClick>
              {item}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
