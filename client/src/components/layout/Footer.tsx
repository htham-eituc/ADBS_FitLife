// Layout, spacing and colors adapted from Shopco Footer and NewsLetterSection.
import { Link } from "react-router";
import {
  NAVIGATION,
  ROLES,
  roleLabel,
  type RoleNavigation,
} from "@/layouts/navigation";
import { getPagePath } from "@/layouts/routes";
export default function Footer({ role, onRoleChange }: RoleNavigation) {
  return (
    <footer className="mt-10">
      <div className="relative px-4">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-1/2 bg-[#F0F0F0]"
        />
        <div className="relative mx-auto flex max-w-frame flex-col justify-between gap-6 rounded-[20px] bg-black px-6 py-9 text-white md:flex-row md:items-center md:px-16">
          <p className="max-w-xl font-integral text-[28px] font-bold leading-tight md:text-[40px]">
            MOVE BETTER.
            <br />
            LIVE BETTER.
          </p>
          <Link
            to="/" state={{ role }}
            className="inline-flex items-center justify-center rounded-full bg-white px-10 py-4 text-sm font-medium text-black transition-colors hover:bg-white/90"
          >
            Trang chính - {roleLabel(role)}{" "}
            <span aria-hidden="true" className="ml-4">
              ↗
            </span>
          </Link>
        </div>
      </div>
      <div className="bg-[#F0F0F0] px-4 pb-6 pt-10 md:pt-[50px]">
        <div className="mx-auto max-w-frame">
          <div className="grid gap-8 pb-9 md:grid-cols-[1.2fr_1fr_1fr]">
            <div>
              <Link
                to="/" state={{ role }}
                className="font-integral text-[32px] font-bold"
              >
                FITLIFE.
              </Link>
              <p className="mt-5 max-w-xs text-sm leading-relaxed text-black/60">
                Đồng hành cùng bạn trong mỗi buổi tập. Quản lý dịch vụ, lịch tập
                và hoạt động tại FitLife Hub.
              </p>
            </div>
            <nav aria-label="Liên kết cuối trang">
              <p className="mb-5 text-sm font-bold tracking-[3px] uppercase">
                {roleLabel(role)}
              </p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                {NAVIGATION[role].map((item) => (
                  <Link
                    key={item.page}
                    to={getPagePath(role, item.page)}
                    className="text-sm text-black/60 hover:text-black"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </nav>
            <div>
              <p className="mb-5 text-sm font-bold tracking-[3px] uppercase">
                Đổi vai trò
              </p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                {ROLES.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onRoleChange(item.id)}
                    aria-pressed={item.id === role}
                    className="text-left text-sm text-black/60 hover:text-black aria-pressed:font-bold aria-pressed:text-black"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap justify-between gap-3 border-t border-black/10 pt-6 text-xs text-black/60">
            <span>FitLife Hub · Hệ thống quản lý trung tâm thể hình</span>
            <span>Giao diện dựa trên SHOP.CO</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
