import { NAVIGATION, ROLES, type PageId, type Role } from "./navigation";

export const ROLE_BASE_PATHS: Record<Role, string> = {
  member: "/member",
  reception: "/reception",
  sales: "/sales",
  trainer: "/trainer",
  manager: "/admin",
  director: "/director",
  gate: "/gate",
};

const PAGE_SLUGS: Record<PageId, string> = {
  schedule: "schedule",
  plans: "plans",
  orders: "orders",
  billing: "billing",
  history: "history",
  rewards: "rewards",
  profile: "profile",
  members: "members",
  pos: "pos",
  checkins: "check-ins",
  "pt-bookings": "pt-bookings",
  care: "member-care",
  "stock-receipts": "stock-receipts",
  inventory: "inventory",
  teaching: "schedule",
  reviews: "reviews",
  payslip: "payslip",
  catalog: "catalog",
  staff: "staff",
  payroll: "payroll",
  "branch-reports": "reports",
  "system-reports": "reports",
  tiers: "tiers",
  gate: "gate",
};

export const getPagePath = (role: Role, page: PageId) =>
  role === "gate" ? "/gate" : `${ROLE_BASE_PATHS[role]}/${PAGE_SLUGS[page]}`;

export const getRoleHomePath = (role: Role) =>
  getPagePath(role, NAVIGATION[role][0].page);

export const APP_ROUTES = ROLES.flatMap(({ id: role }) =>
  NAVIGATION[role].map(({ page, label }) => ({
    path: getPagePath(role, page),
    role,
    page,
    label,
  })),
);
