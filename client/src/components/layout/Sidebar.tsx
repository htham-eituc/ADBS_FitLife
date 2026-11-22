import FitLifeIcon from "@/components/shared/FitLifeIcon";
import {
  Sidebar as SidebarRoot,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { CalendarIcon } from "@/icons/calendar";
import { DumbbellsIcon } from "@/icons/dumbbells";
import { PageIcon } from "@/icons/page";
import { HourglassIcon } from "@/icons/hourglass";
import { StarIcon } from "@/icons/star";
import { UserIcon } from "@/icons/user";
import { cn } from "@/utils";
import type { PageNavigation, PageId } from "@/layouts/navigation";

const items: { page: PageId; label: string; Icon: typeof CalendarIcon }[] = [
  { page: "schedule", label: "Lịch PT", Icon: CalendarIcon },
  { page: "plans", label: "Gói dịch vụ", Icon: DumbbellsIcon },
  { page: "billing", label: "Hóa đơn", Icon: PageIcon },
  { page: "history", label: "Lịch sử", Icon: HourglassIcon },
  { page: "rewards", label: "Điểm & hạng", Icon: StarIcon },
  { page: "profile", label: "Hồ sơ", Icon: UserIcon },
];

export default function Sidebar({ page, onNavigate }: PageNavigation) {
  const { open, isHovered, isMobile, setOpenMobile } = useSidebar();
  const showContent = open || isHovered || isMobile;

  return (
    <SidebarRoot side="left" collapsible="icon">
      <SidebarHeader className="px-5 pt-5 pb-8">
        <a
          href="#sketch"
          className="flex items-center gap-3"
          aria-label="FitLife"
        >
          <FitLifeIcon size={showContent ? "icon" : "icon-sm"} />
          {showContent && (
            <span className="text-title-sm font-semibold text-gray-900">
              FitLife
            </span>
          )}
        </a>
      </SidebarHeader>
      <SidebarContent className="overflow-y-auto px-5 duration-300 ease-linear">
        <nav aria-label="Điều hướng chính" className="mb-6">
          <SidebarGroup className="p-0">
            {showContent && (
              <SidebarGroupLabel className="mb-4 flex h-auto p-0 text-xs leading-5 text-gray-400 uppercase">
                Menu
              </SidebarGroupLabel>
            )}
            <SidebarMenu className="gap-1">
              {items.map((item) => (
                <SidebarMenuItem key={item.page}>
                  <button
                    type="button"
                    aria-label={item.label}
                    aria-current={page === item.page ? "page" : undefined}
                    className={cn(
                      "group menu-item",
                      page === item.page
                        ? "menu-item-active"
                        : "menu-item-inactive",
                    )}
                    onClick={() => {
                      onNavigate(item.page);
                      setOpenMobile(false);
                    }}
                  >
                    <span
                      className={
                        page === item.page
                          ? "menu-item-icon-active"
                          : "menu-item-icon-inactive"
                      }
                    >
                      <item.Icon className="size-6" />
                    </span>
                    {showContent && (
                      <span className="menu-item-text">{item.label}</span>
                    )}
                  </button>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </nav>
      </SidebarContent>
    </SidebarRoot>
  );
}
