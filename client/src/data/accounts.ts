import type { Role } from "@/layouts/navigation";
import { member } from "./member";
import { homeBranch } from "./branch";

const HOME_BRANCH = homeBranch.name;

export const ACCOUNTS: Record<
  Role,
  { name: string; email: string; branch: string }
> = {
  member: { name: member.name, email: member.email, branch: member.branch },
  reception: {
    name: "Trần Thu Hà",
    email: "le.tan@fitlife.example",
    branch: HOME_BRANCH,
  },
  sales: {
    name: "Võ Gia Bảo",
    email: "ban.hang@fitlife.example",
    branch: HOME_BRANCH,
  },
  trainer: {
    name: "HLV Minh",
    email: "hlv.minh@fitlife.example",
    branch: HOME_BRANCH,
  },
  manager: {
    name: "Lê Hoàng Nam",
    email: "quan.ly.q1@fitlife.example",
    branch: HOME_BRANCH,
  },
  director: {
    name: "Ban giám đốc",
    email: "bgd@fitlife.example",
    branch: "Toàn hệ thống",
  },
  gate: {
    name: "Cửa vào số 1",
    email: "cua.vao.1@fitlife.example",
    branch: HOME_BRANCH,
  },
};
