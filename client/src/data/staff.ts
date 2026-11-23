import { formatDate, isoDate, member } from "./member";

const today = new Date();
const monthLabel = (offset: number) => {
  const date = new Date(today.getFullYear(), today.getMonth() + offset, 1);
  return `Tháng ${date.getMonth() + 1}/${date.getFullYear()}`;
};
export const CURRENT_PERIOD = monthLabel(0);
const PREVIOUS_PERIOD = monthLabel(-1);
export const PAYROLL_PERIODS = [
  CURRENT_PERIOD,
  PREVIOUS_PERIOD,
  monthLabel(-2),
];

export const teachingSessions = [
  {
    id: "LH2201",
    date: isoDate(0),
    time: "08:00",
    member: member.name,
    branch: "Chi nhánh Quận 1",
    plan: "PT 10 buổi – còn 8",
    status: "Chờ hội viên xác nhận",
    note: "",
  },
  {
    id: "LH2202",
    date: isoDate(0),
    time: "18:00",
    member: member.name,
    branch: "Chi nhánh Quận 1",
    plan: "PT 10 buổi – còn 8",
    status: "Đã đặt",
    note: "",
  },
  {
    id: "LH2206",
    date: isoDate(0),
    time: "20:00",
    member: "Trương Mỹ Duyên",
    branch: "Chi nhánh Quận 1",
    plan: "PT 10 buổi – còn 9",
    status: "Đã đặt",
    note: "",
  },
  {
    id: "LH2205",
    date: isoDate(2),
    time: "18:00",
    member: member.name,
    branch: "Chi nhánh Quận 1",
    plan: "PT 10 buổi – còn 8",
    status: "Đã đặt",
    note: "",
  },
  {
    id: "LH2210",
    date: isoDate(3),
    time: "07:00",
    member: "Nguyễn Minh Khang",
    branch: "Chi nhánh Quận 1",
    plan: "PT 20 buổi – còn 14",
    status: "Đã đặt",
    note: "",
  },
  {
    id: "LH2198",
    date: isoDate(-2),
    time: "18:00",
    member: member.name,
    branch: "Chi nhánh Quận 1",
    plan: "PT 10 buổi",
    status: "Đã hoàn thành",
    note: "",
  },
  {
    id: "LH2190",
    date: isoDate(-4),
    time: "19:00",
    member: "Trương Mỹ Duyên",
    branch: "Chi nhánh Quận 1",
    plan: "PT 10 buổi",
    status: "Đã hoàn thành",
    note: "",
  },
  {
    id: "LH2187",
    date: isoDate(-5),
    time: "06:00",
    member: "Nguyễn Minh Khang",
    branch: "Chi nhánh Quận 1",
    plan: "PT 20 buổi",
    status: "Hủy",
    note: "Hội viên hủy, không trừ buổi",
  },
];
export type TeachingSession = (typeof teachingSessions)[number];

export const trainerReviews = [
  {
    id: "DG40",
    date: isoDate(-4),
    member: "Trương Mỹ Duyên",
    stars: 4,
    comment: "Bài tập hợp lý, mong có thêm phần giãn cơ.",
  },
  {
    id: "DG37",
    date: isoDate(-9),
    member: "Nguyễn Minh Khang",
    stars: 5,
    comment: "Giáo án sức mạnh tốt, theo dõi tiến độ sát.",
  },
  {
    id: "DG35",
    date: isoDate(-12),
    member: "Đỗ Thảo Vy",
    stars: 3,
    comment: "Đến trễ 5 phút nhưng có bù giờ.",
  },
  {
    id: "DG31",
    date: isoDate(-20),
    member: "Lê Ngọc Anh",
    stars: 5,
    comment: "Rất nhiệt tình.",
  },
];

const TRANSFER_DATE = isoDate(-12);
export const trainerPayslips = [
  {
    period: CURRENT_PERIOD,
    status: "Chưa chốt",
    baseSalary: 9000000,
    commissions: [
      {
        branch: "Chi nhánh Quận 3",
        range: `Đến ${formatDate(isoDate(-13))}`,
        sessions: 9,
        rate: 140000,
      },
      {
        branch: "Chi nhánh Quận 1",
        range: `Từ ${formatDate(TRANSFER_DATE)}`,
        sessions: 14,
        rate: 150000,
      },
    ],
  },
  {
    period: PREVIOUS_PERIOD,
    status: "Đã chốt",
    baseSalary: 9000000,
    commissions: [
      {
        branch: "Chi nhánh Quận 3",
        range: "Cả kỳ",
        sessions: 26,
        rate: 140000,
      },
    ],
  },
];
type Payslip = (typeof trainerPayslips)[number];
export const payslipTotal = (slip: Payslip) =>
  slip.baseSalary +
  slip.commissions.reduce((sum, row) => sum + row.sessions * row.rate, 0);

export const POSITIONS = ["HLV", "Lễ tân", "Quản lý CN", "NV bán hàng"];
export const staffMembers = [
  {
    id: "NV001",
    name: "Lê Hoàng Nam",
    phone: "0911 000 001",
    position: "Quản lý CN",
    branch: "Chi nhánh Quận 1",
    salary: 18000000,
    since: "2024-03-01",
    status: "Đang làm việc",
  },
  {
    id: "NV014",
    name: "HLV Minh (mẫu)",
    phone: "0911 000 014",
    position: "HLV",
    branch: "Chi nhánh Quận 1",
    salary: 9000000,
    since: "2024-05-01",
    status: "Đang làm việc",
  },
  {
    id: "NV015",
    name: "HLV An (mẫu)",
    phone: "0911 000 015",
    position: "HLV",
    branch: "Chi nhánh Quận 1",
    salary: 9500000,
    since: "2025-01-10",
    status: "Đang làm việc",
  },
  {
    id: "NV016",
    name: "HLV Trang (mẫu)",
    phone: "0911 000 016",
    position: "HLV",
    branch: "Chi nhánh Quận 1",
    salary: 9000000,
    since: "2025-06-01",
    status: "Đang làm việc",
  },
  {
    id: "NV021",
    name: "Trần Thu Hà",
    phone: "0911 000 021",
    position: "Lễ tân",
    branch: "Chi nhánh Quận 1",
    salary: 7500000,
    since: "2024-08-15",
    status: "Đang làm việc",
  },
  {
    id: "NV022",
    name: "Ngô Thanh Tâm",
    phone: "0911 000 022",
    position: "Lễ tân",
    branch: "Chi nhánh Quận 1",
    salary: 7200000,
    since: "2025-09-01",
    status: "Đang làm việc",
  },
  {
    id: "NV030",
    name: "Võ Gia Bảo",
    phone: "0911 000 030",
    position: "NV bán hàng",
    branch: "Chi nhánh Quận 1",
    salary: 7000000,
    since: "2025-02-20",
    status: "Đang làm việc",
  },
];
export type StaffMember = (typeof staffMembers)[number];

export const workHistory: Record<
  string,
  { branch: string; position: string; from: string; to: string | null }[]
> = {
  NV014: [
    {
      branch: "Chi nhánh Quận 3",
      position: "HLV",
      from: "2024-05-01",
      to: isoDate(-13),
    },
    {
      branch: "Chi nhánh Quận 1",
      position: "HLV",
      from: TRANSFER_DATE,
      to: null,
    },
  ],
};
export const salaryHistory: Record<string, { from: string; salary: number }[]> =
  {
    NV014: [
      { from: "2024-05-01", salary: 8000000 },
      { from: "2025-07-01", salary: 9000000 },
    ],
  };

export const transfers = [
  {
    id: "DC07",
    staff: "HLV Minh (mẫu)",
    from: "Chi nhánh Quận 3",
    to: "Chi nhánh Quận 1",
    position: "HLV",
    effective: TRANSFER_DATE,
  },
  {
    id: "DC06",
    staff: "Phan Khánh Ly",
    from: "Chi nhánh Quận 1",
    to: "Chi nhánh Quận 7",
    position: "Lễ tân",
    effective: isoDate(-48),
  },
];

export const payrollRows = [
  {
    id: "NV001",
    name: "Lê Hoàng Nam",
    position: "Quản lý CN",
    base: 18000000,
    sessions: 0,
    commission: 0,
  },
  {
    id: "NV014",
    name: "HLV Minh (mẫu)",
    position: "HLV",
    base: 9000000,
    sessions: 14,
    commission: 2100000,
  },
  {
    id: "NV015",
    name: "HLV An (mẫu)",
    position: "HLV",
    base: 9500000,
    sessions: 21,
    commission: 3150000,
  },
  {
    id: "NV016",
    name: "HLV Trang (mẫu)",
    position: "HLV",
    base: 9000000,
    sessions: 17,
    commission: 2550000,
  },
  {
    id: "NV021",
    name: "Trần Thu Hà",
    position: "Lễ tân",
    base: 7500000,
    sessions: 0,
    commission: 0,
  },
  {
    id: "NV022",
    name: "Ngô Thanh Tâm",
    position: "Lễ tân",
    base: 7200000,
    sessions: 0,
    commission: 0,
  },
  {
    id: "NV030",
    name: "Võ Gia Bảo",
    position: "NV bán hàng",
    base: 7000000,
    sessions: 0,
    commission: 0,
  },
];
export type PayrollRow = (typeof payrollRows)[number];

export const payrollIssues = [
  {
    id: "SL1",
    trainer: "HLV Minh (mẫu)",
    session: "LH2140",
    date: isoDate(-15),
    detail:
      "Lịch ghi Chi nhánh Quận 1 nhưng ngày dạy HLV còn công tác tại Chi nhánh Quận 3.",
  },
];
