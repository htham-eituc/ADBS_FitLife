import FitLifeIcon from '@/components/shared/FitLifeIcon';
import { Sidebar as SidebarRoot, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar';
import { LayoutGridIcon } from '@/icons/layout-grid';

export default function Sidebar() {
  const { open, isHovered, isMobile, setOpenMobile } = useSidebar();
  const showContent = open || isHovered || isMobile;

  return (
    <SidebarRoot side="left" collapsible="icon">
      <SidebarHeader className="px-5 pt-5 pb-8">
        <a href="#sketch" className="flex items-center gap-3" aria-label="FitLife">
          <FitLifeIcon size={showContent ? 'icon' : 'icon-sm'} />
          {showContent && <span className="text-title-sm font-semibold text-gray-900">FitLife</span>}
        </a>
      </SidebarHeader>
      <SidebarContent className="overflow-y-auto px-5 duration-300 ease-linear">
        <nav aria-label="Điều hướng chính" className="mb-6">
          <SidebarGroup className="p-0">
            {showContent && <SidebarGroupLabel className="mb-4 flex h-auto p-0 text-xs leading-5 text-gray-400 uppercase">Menu</SidebarGroupLabel>}
            <SidebarMenu className="gap-1">
              <SidebarMenuItem>
                <a href="#sketch" aria-current="page" className="group menu-item menu-item-active" onClick={() => setOpenMobile(false)}>
                  <span className="menu-item-icon-active"><LayoutGridIcon className="size-6" /></span>
                  {showContent && <span className="menu-item-text">Tổng quan</span>}
                </a>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </nav>
      </SidebarContent>
    </SidebarRoot>
  );
}
