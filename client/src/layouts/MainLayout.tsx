import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { TooltipProvider } from '@/components/ui/tooltip';
import type { ReactNode } from 'react';

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <TooltipProvider>
      <SidebarProvider>
        <Sidebar />
        <SidebarInset>
          <Header />
          <div id="sketch" className="p-4 mx-auto w-full max-w-(--breakpoint-2xl) md:p-6">
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
