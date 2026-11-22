import { member } from "@/data/member";
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
  role: string;
};

export default function ProfileDropdown({ role }: ProfileDropdownProps) {
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
            {member.name}
          </span>
          <span className="mt-0.5 block text-xs text-gray-500 dark:text-gray-400">
            {member.email}
          </span>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel>Vai trò hiện tại</DropdownMenuLabel>
          <div className="px-3 py-2">
            <span className="block text-sm font-medium text-gray-700 dark:text-gray-400">
              {role}
            </span>
          </div>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
