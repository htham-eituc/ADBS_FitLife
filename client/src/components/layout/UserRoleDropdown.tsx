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
import {
  ROLES,
  roleLabel,
  type RoleNavigation,
  type Role,
} from "@/layouts/navigation";

export default function UserRoleDropdown({
  role,
  onRoleChange,
}: RoleNavigation) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger
        render={<Button variant="outline" />}
        aria-label={`Vai trò hiện tại: ${roleLabel(role)}`}
      >
        {roleLabel(role)}
        <ChevronDownIcon
          className={cn(
            "size-5 text-gray-500 duration-200 dark:text-gray-400",
            isOpen ? "rotate-180" : "rotate-0",
          )}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={12}>
        <DropdownMenuRadioGroup
          value={role}
          onValueChange={(value) => onRoleChange(value as Role)}
        >
          {ROLES.map((item) => (
            <DropdownMenuRadioItem key={item.id} value={item.id} closeOnClick>
              {item.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
