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
import { cn } from "@/utils";
import {
  NAVIGATION,
  type PageNavigation,
  type Role,
} from "@/layouts/navigation";

export default function Sidebar({
  role,
  page,
  onNavigate,
}: PageNavigation & { role: Role }) {
  const { open, isHovered, isMobile, setOpenMobile } = useSidebar();
  const showContent = open || isHovered || isMobile;
  const items = NAVIGATION[role];

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
