import type { ComponentType } from "react";
import type { IconProps } from "@/icons/types";
import { BoxIcon } from "@/icons/box";
import { BuildingIcon } from "@/icons/building";
import { CalendarIcon } from "@/icons/calendar";
import { CartIcon } from "@/icons/cart";
import { ChartIcon } from "@/icons/chart";
import { DoorIcon } from "@/icons/door";
import { DumbbellsIcon } from "@/icons/dumbbells";
import { HeartIcon } from "@/icons/heart";
import { HourglassIcon } from "@/icons/hourglass";
import { InboxIcon } from "@/icons/inbox";
import { PageIcon } from "@/icons/page";
import { StarIcon } from "@/icons/star";
import { UserIcon } from "@/icons/user";
import { UsersIcon } from "@/icons/users";
import { WalletIcon } from "@/icons/wallet";

export type Role =
  | "member"
  | "reception"
  | "sales"
  | "trainer"
  | "manager"
  | "director"
  | "gate";

export type PageId =
  | "schedule"
  | "plans"
  | "billing"
  | "history"
  | "rewards"
  | "profile"
  | "members"
  | "pos"
  | "checkins"
  | "pt-bookings"
  | "care"
  | "stock-receipts"
  | "inventory"
  | "teaching"
  | "reviews"
  | "payslip"
  | "catalog"
  | "staff"
  | "payroll"
  | "branch-reports"
  | "system-reports"
  | "tiers"
  | "gate";

export type PageNavigation = {
  page: PageId;
  onNavigate: (page: PageId) => void;
};

export type RoleNavigation = {
  role: Role;
  onRoleChange: (role: Role) => void;
};

export type NavItem = {
  page: PageId;
  label: string;
  Icon: ComponentType<IconProps>;
};

export const ROLES: { id: Role; label: string }[] = [
  { id: "member", label: "Hội viên" },
  { id: "reception", label: "Lễ tân" },
  { id: "sales", label: "Nhân viên bán hàng" },
  { id: "trainer", label: "Huấn luyện viên" },
  { id: "manager", label: "Quản lý chi nhánh" },
  { id: "director", label: "Ban giám đốc" },
  { id: "gate", label: "Cửa kiểm soát" },
];

export const roleLabel = (role: Role) =>
  ROLES.find((item) => item.id === role)?.label ?? role;

export const NAVIGATION: Record<Role, NavItem[]> = {
  member: [
    { page: "schedule", label: "Lịch PT", Icon: CalendarIcon },
    { page: "plans", label: "Gói dịch vụ", Icon: DumbbellsIcon },
    { page: "billing", label: "Hóa đơn", Icon: PageIcon },
    { page: "history", label: "Lịch sử", Icon: HourglassIcon },
    { page: "rewards", label: "Điểm & hạng", Icon: StarIcon },
    { page: "profile", label: "Hồ sơ", Icon: UserIcon },
  ],
  reception: [
    { page: "members", label: "Hội viên", Icon: UsersIcon },
    { page: "pos", label: "Bán hàng", Icon: CartIcon },
    { page: "checkins", label: "Ra vào", Icon: DoorIcon },
    { page: "pt-bookings", label: "Lịch PT", Icon: CalendarIcon },
    { page: "care", label: "Chăm sóc hội viên", Icon: HeartIcon },
  ],
  sales: [
    { page: "pos", label: "Bán hàng", Icon: CartIcon },
    { page: "stock-receipts", label: "Nhập hàng", Icon: InboxIcon },
    { page: "inventory", label: "Tồn kho", Icon: BoxIcon },
  ],
  trainer: [
    { page: "teaching", label: "Lịch dạy", Icon: CalendarIcon },
    { page: "reviews", label: "Đánh giá", Icon: StarIcon },
    { page: "payslip", label: "Lương & hoa hồng", Icon: WalletIcon },
  ],
  manager: [
    { page: "catalog", label: "Danh mục", Icon: BuildingIcon },
    { page: "staff", label: "Nhân sự", Icon: UsersIcon },
    { page: "payroll", label: "Bảng lương", Icon: WalletIcon },
    { page: "branch-reports", label: "Báo cáo", Icon: ChartIcon },
  ],
  director: [
    { page: "system-reports", label: "Báo cáo", Icon: ChartIcon },
    { page: "tiers", label: "Hạng hội viên", Icon: StarIcon },
  ],
  gate: [{ page: "gate", label: "Quét thẻ", Icon: DoorIcon }],
};
