import { BRANCHES, homeBranch } from "./branch";
import { isoDate } from "./member";

export const percent = (value: number) => `${Math.round(value)}%`;
export const compactMoney = (value: number) =>
  value >= 1e9
    ? `${(value / 1e9).toLocaleString("vi-VN", { maximumFractionDigits: 2 })} tỷ`
    : `${(value / 1e6).toLocaleString("vi-VN", { maximumFractionDigits: 1 })} tr`;

export const branchRevenueDays = [6, 5, 4, 3, 2, 1, 0].map((offset, index) => ({
  date: isoDate(-offset),
  value: [21400000, 18900000, 25600000, 30200000, 16800000, 27900000, 14590000][
    index
  ],
}));

export const checkinSlots = [
  { slot: "05:00–08:00", checkins: 212, inside: 18 },
  { slot: "08:00–11:00", checkins: 96, inside: 41 },
  { slot: "11:00–14:00", checkins: 58, inside: 22 },
  { slot: "14:00–17:00", checkins: 74, inside: 19 },
  { slot: "17:00–20:00", checkins: 388, inside: 64 },
  { slot: "20:00–22:00", checkins: 141, inside: 121 },
].map((row) => ({
  ...row,
  occupancy: (row.inside / homeBranch.capacity) * 100,
}));

export const topPackages = [
  { label: "Gym 3 tháng", value: 48, revenue: 144000000 },
  { label: "PT 10 buổi", value: 21, revenue: 126000000 },
  { label: "Gym 12 tháng", value: 9, revenue: 90000000 },
  { label: "Yoga 3 tháng", value: 17, revenue: 61200000 },
  { label: "Vé Spa lẻ", value: 64, revenue: 22400000 },
];
export const topProducts = [
  { label: "Nước khoáng 500ml", value: 420 },
  { label: "Thanh năng lượng", value: 133 },
  { label: "Khăn tập", value: 41 },
  { label: "Whey protein 1kg", value: 12 },
];

export const trainerPerformance = [
  {
    trainer: "HLV An (mẫu)",
    sessions: 21,
    cancelled: 1,
    rating: 4.8,
    reviews: 15,
  },
  {
    trainer: "HLV Trang (mẫu)",
    sessions: 17,
    cancelled: 2,
    rating: 4.6,
    reviews: 11,
  },
  {
    trainer: "HLV Minh (mẫu)",
    sessions: 14,
    cancelled: 1,
    rating: 4.4,
    reviews: 5,
  },
];

const revenueThisMonth = [
  612, 488, 365, 701, 402, 455, 318, 529, 377, 664, 342, 590,
];
const revenueLastMonth = [
  580, 502, 340, 655, 410, 430, 325, 498, 360, 610, 330, 571,
];
export const branchRevenue = BRANCHES.map((branch, index) => ({
  id: branch.id,
  branch: branch.name,
  current: revenueThisMonth[index] * 1e6,
  previous: revenueLastMonth[index] * 1e6,
  members: [1240, 980, 720, 1410, 760, 890, 610, 1050, 700, 1320, 690, 1180][
    index
  ],
  checkins: [
    9800, 7600, 5400, 11200, 5900, 6900, 4700, 8300, 5300, 10400, 5100, 9200,
  ][index],
}));

export const topPackagesSixMonths = [
  { label: "Gym 12 tháng", value: 1280000000 },
  { label: "PT 20 buổi", value: 1155000000 },
  { label: "Gym 3 tháng", value: 984000000 },
  { label: "PT 10 buổi", value: 912000000 },
  { label: "Gym 6 tháng", value: 671000000 },
  { label: "GroupX 6 tháng", value: 336000000 },
];

export const tierDistribution = [
  { label: "Silver", value: 8120 },
  { label: "Gold", value: 2610 },
  { label: "Platinum", value: 820 },
];

export const staffSummary = BRANCHES.map((branch, index) => ({
  branch: branch.name,
  staff: [24, 19, 15, 27, 16, 18, 13, 21, 15, 26, 14, 23][index],
  trainers: [8, 6, 5, 9, 5, 6, 4, 7, 5, 9, 4, 8][index],
  payroll:
    [214, 168, 131, 241, 139, 158, 112, 186, 129, 232, 121, 205][index] * 1e6,
  commission: [31, 24, 17, 36, 18, 22, 14, 27, 16, 34, 15, 30][index] * 1e6,
  transfers: [2, 1, 0, 1, 0, 1, 0, 1, 0, 2, 0, 1][index],
}));

// Illustrative aggregates for previewing report period controls, not backend results.
export const revenuePeriodSamples: Record<
  string,
  { label: string; value: number }[]
> = {
  "7 ngày gần nhất": branchRevenueDays.map((row) => ({
    label: new Date(row.date + "T12:00:00").toLocaleDateString("vi-VN"),
    value: row.value,
  })),
  "Tháng này": [142, 156, 168, 146].map((value, index) => ({
    label: `Tuần ${index + 1}`,
    value: value * 1e6,
  })),
  "Quý này": [580, 596, 612].map((value, index) => ({
    label: `Tháng ${index + 1} của quý`,
    value: value * 1e6,
  })),
  "Năm nay": [450, 480, 510, 490, 540, 560, 575, 590, 580, 596, 612, 625].map(
    (value, index) => ({ label: `Tháng ${index + 1}`, value: value * 1e6 }),
  ),
};
