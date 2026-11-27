import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { TooltipProvider } from "@/components/ui/tooltip";
import type { PropsWithChildren } from "react";
import {
  NAVIGATION,
  type PageNavigation,
  type RoleNavigation,
} from "./navigation";
import { getRoleHomePath } from "./routes";
import { Link } from "react-router";

export default function MainLayout({
  children,
  role,
  onRoleChange,
  page,
}: PropsWithChildren<PageNavigation & RoleNavigation>) {
  const current = NAVIGATION[role].find((item) => item.page === page);
  return (
    <TooltipProvider>
      <div className="flex min-h-dvh flex-col bg-white text-black">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-99999 focus:rounded-full focus:bg-black focus:px-6 focus:py-3 focus:text-white"
        >
          Đến nội dung chính
        </a>
        <Header role={role} onRoleChange={onRoleChange} />
        <main
          id="main-content"
          tabIndex={-1}
          className="mx-auto w-full max-w-frame flex-1 px-4 pb-12 outline-none xl:px-0 md:pb-20"
        >
          <nav
            aria-label="Đường dẫn"
            className="flex items-center gap-3 py-5 text-sm text-black/60 md:py-6"
          >
            <Link to={getRoleHomePath(role)} className="hover:text-black">
              FitLife
            </Link>
            <span aria-hidden="true">›</span>
            <span aria-current="page" className="text-black">
              {current?.label}
            </span>
          </nav>
          <div id="sketch" className="min-w-0">
            {children}
          </div>
        </main>
        <Footer role={role} onRoleChange={onRoleChange} />
      </div>
    </TooltipProvider>
  );
}
