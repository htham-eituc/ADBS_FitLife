import { ACCOUNTS } from "@/data/accounts";
import { roleLabel, type Role } from "@/layouts/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown";
import { UserIcon } from "@/icons/user";

type ProfileDropdownProps = {
  role: Role;
};

export default function ProfileDropdown({ role }: ProfileDropdownProps) {
  const account = ACCOUNTS[role];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Mở thông tin cá nhân"
        className="dropdown-toggle flex items-center text-gray-700 dark:text-gray-400"
      >
        <Avatar>
          <AvatarFallback>
            <UserIcon />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={12}>
        <div className="px-3 py-2">
          <span className="block text-sm font-medium text-gray-700 dark:text-gray-400">
            {account.name}
          </span>
          <span className="mt-0.5 block text-xs text-gray-500 dark:text-gray-400">
            {account.email}
          </span>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel>Vai trò hiện tại</DropdownMenuLabel>
          <div className="px-3 py-2">
            <span className="block text-sm font-medium text-gray-700 dark:text-gray-400">
              {roleLabel(role)}
            </span>
            <span className="mt-0.5 block text-xs text-gray-500 dark:text-gray-400">
              {account.branch}
            </span>
          </div>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
