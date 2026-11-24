import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import type { PropsWithChildren } from "react";
import type { PageNavigation, RoleNavigation } from "./navigation";

export default function MainLayout({
  children,
  role,
  onRoleChange,
  page,
}: PropsWithChildren<PageNavigation & RoleNavigation>) {
  return (
    <TooltipProvider>
      <SidebarProvider>
        <Sidebar role={role} page={page} />
        <SidebarInset>
          <Header role={role} onRoleChange={onRoleChange} />
          <div
            id="sketch"
            className="p-4 mx-auto w-full max-w-(--breakpoint-2xl) md:p-6"
          >
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
