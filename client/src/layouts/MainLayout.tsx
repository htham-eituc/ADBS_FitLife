import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import type { PropsWithChildren } from "react";
import type { PageNavigation } from "./navigation";

export default function MainLayout({
  children,
  page,
  onNavigate,
}: PropsWithChildren<PageNavigation>) {
  return (
    <TooltipProvider>
      <SidebarProvider>
        <Sidebar page={page} onNavigate={onNavigate} />
        <SidebarInset>
          <Header />
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
