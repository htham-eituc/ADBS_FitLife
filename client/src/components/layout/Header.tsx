// Shopco TopNavbar layout, without search; existing role URLs remain unchanged.
import { useState } from "react";
import { Link, NavLink } from "react-router";
import {
  NAVIGATION,
  roleLabel,
  type RoleNavigation,
} from "@/layouts/navigation";
import { getPagePath } from "@/layouts/routes";
import UserRoleDropdown from "./UserRoleDropdown";
import { UserIcon } from "@/icons/user";
import { CartIcon } from "@/icons/cart";
import { MenuTwoIcon } from "@/icons/menu-two";
import { XIcon } from "@/icons/x";
import { cn } from "@/utils";
import { useMemberOrders } from "@/data/member-orders";

export default function Header({ role, onRoleChange }: RoleNavigation) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { count } = useMemberOrders();
  const pages = NAVIGATION[role];
  const links = () => (
    <>
      <NavLink
        to="/"
        state={{ role }}
        end
        onClick={() => setMenuOpen(false)}
        className={({ isActive }) =>
          cn(
            "shrink-0 whitespace-nowrap py-2 text-sm transition-colors hover:text-black",
            isActive ? "font-semibold text-black" : "text-black/70",
          )
        }
      >
        Trang chủ
      </NavLink>
      {pages.map((item) => (
        <NavLink
          key={item.page}
          to={getPagePath(role, item.page)}
          end
          onClick={() => setMenuOpen(false)}
          className={({ isActive }) =>
            cn(
              "shrink-0 whitespace-nowrap py-2 text-sm transition-colors hover:text-black",
              isActive
                ? "font-semibold text-black underline underline-offset-8"
                : "text-black/70",
            )
          }
        >
          {item.label}
        </NavLink>
      ))}
    </>
  );
  return (
    <>
      <div className="bg-black px-4 py-2 text-center text-xs text-white sm:text-sm">
        FitLife Hub <span className="mx-2 text-white/40">/</span>{" "}
        {roleLabel(role)}
      </div>
      <header className="sticky top-0 z-50 bg-white">
        <div className="mx-auto flex max-w-frame items-center gap-2 px-4 py-5 sm:gap-3 md:gap-5 md:py-6 xl:px-0">
          <button
            type="button"
            aria-label={menuOpen ? "Đóng menu" : "Mở menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen(!menuOpen)}
            className="shrink-0 rounded-full p-1 xl:hidden"
          >
            {menuOpen ? (
              <XIcon className="size-5" />
            ) : (
              <MenuTwoIcon className="size-5" />
            )}
          </button>
          <Link
            to="/"
            state={{ role }}
            aria-label="FitLife - trang chủ"
            onClick={() => setMenuOpen(false)}
            className="mr-auto shrink-0 font-integral text-xl font-bold sm:text-2xl xl:mr-3 lg:text-[32px]"
          >
            FITLIFE.
          </Link>
          <nav
            aria-label={`Các trang ${roleLabel(role)}`}
            className="hidden min-w-0 flex-1 items-center gap-5 overflow-x-auto xl:flex"
          >
            {links()}
          </nav>
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <UserRoleDropdown
              role={role}
              onRoleChange={(next) => {
                setMenuOpen(false);
                onRoleChange(next);
              }}
            />
            {role === "member" && (
              <>
                <Link
                  to={`${getPagePath(role, "orders")}?tab=cart`}
                  aria-label={`Giỏ hàng, ${count} sản phẩm`}
                  onClick={() => setMenuOpen(false)}
                  className="relative rounded-full p-1 hover:bg-[#F0F0F0]"
                >
                  <CartIcon aria-hidden="true" className="size-5 sm:size-6" />
                  {count > 0 && (
                    <span
                      aria-hidden="true"
                      className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-black px-1 text-[10px] font-bold leading-none text-white ring-2 ring-white"
                    >
                      {count}
                    </span>
                  )}
                </Link>
                <Link
                  to={getPagePath(role, "profile")}
                  aria-label="Hồ sơ hội viên"
                  className="hidden rounded-full p-1 hover:bg-[#F0F0F0] min-[375px]:block"
                >
                  <UserIcon className="size-5 sm:size-6" />
                </Link>
              </>
            )}
          </div>
        </div>
        {menuOpen && (
          <nav
            id="mobile-navigation"
            aria-label="Menu trên điện thoại"
            className="grid grid-cols-2 gap-x-4 border-t border-black/10 px-4 py-4 xl:hidden"
          >
            {links()}
          </nav>
        )}
      </header>
    </>
  );
}
