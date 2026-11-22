const today = new Date();
export function isoDate(offset = 0) {
  const date = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + offset,
  );
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");
}
export const formatDate = (value: string) =>
  new Date(value + "T12:00:00").toLocaleDateString("vi-VN");
export const money = (value: number) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
    value,
  );
export const member = {
  id: "HV0001",
  name: "Meo Meo",
  email: "demo@fitlife.example",
  phone: "0900 000 001",
  branch: "Chi nhánh Quận 1",
  tier: "Gold",
  points: 240,
  spending: 24000000,
  year: today.getFullYear(),
};
export const plans = [
  {
    id: "GYM01",
    name: "Gym 3 tháng",
    service: "Gym",
    start: isoDate(-30),
    end: isoDate(60),
    remaining: "Không giới hạn",
    status: "Còn hiệu lực",
  },
  {
    id: "PT01",
    name: "PT 10 buổi",
    service: "PT 1-1",
    start: isoDate(-14),
    end: isoDate(45),
    remaining: "Còn 8 buổi",
    status: "Còn hiệu lực",
  },
  {
    id: "SPA01",
    name: "Vé Spa",
    service: "Spa/Sauna",
    start: isoDate(-7),
    end: null,
    remaining: "Còn 1 lượt",
    status: "Còn lượt",
  },
];
export const invoices = [
  {
    id: "HD0003",
    date: isoDate(-1),
    item: "Gia hạn Gym 3 tháng",
    amount: 3000000,
    status: "Chờ thanh toán",
  },
  {
    id: "HD0002",
    date: isoDate(-14),
    item: "PT 10 buổi",
    amount: 6000000,
    status: "Đã thanh toán",
  },
  {
    id: "HD0001",
    date: isoDate(-30),
    item: "Gym 3 tháng",
    amount: 3000000,
    status: "Đã thanh toán",
  },
];
export const visits = [
  { date: isoDate(-1), branch: member.branch, start: "17:45", end: "19:10" },
  { date: isoDate(-2), branch: member.branch, start: "17:50", end: "19:15" },
  {
    date: isoDate(-4),
    branch: "Chi nhánh Quận 3",
    start: "06:15",
    end: "07:30",
  },
];

export type Invoice = (typeof invoices)[number];
export type ServicePlan = (typeof plans)[number];
