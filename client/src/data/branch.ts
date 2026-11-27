import { isoDate } from "./member";

export const BRANCHES = [
  { id: "CN01", name: "Chi nhánh Quận 1", capacity: 180, ptRate: 150000 },
  { id: "CN02", name: "Chi nhánh Quận 3", capacity: 150, ptRate: 140000 },
  { id: "CN03", name: "Chi nhánh Quận 5", capacity: 120, ptRate: 130000 },
  { id: "CN04", name: "Chi nhánh Quận 7", capacity: 200, ptRate: 150000 },
  { id: "CN05", name: "Chi nhánh Quận 10", capacity: 130, ptRate: 130000 },
  { id: "CN06", name: "Chi nhánh Bình Thạnh", capacity: 160, ptRate: 140000 },
  { id: "CN07", name: "Chi nhánh Phú Nhuận", capacity: 110, ptRate: 130000 },
  { id: "CN08", name: "Chi nhánh Tân Bình", capacity: 170, ptRate: 140000 },
  { id: "CN09", name: "Chi nhánh Gò Vấp", capacity: 140, ptRate: 120000 },
  { id: "CN10", name: "Chi nhánh Thủ Đức", capacity: 220, ptRate: 130000 },
  { id: "CN11", name: "Chi nhánh Đà Nẵng", capacity: 160, ptRate: 120000 },
  { id: "CN12", name: "Chi nhánh Hà Nội", capacity: 200, ptRate: 150000 },
];
export const BRANCH_NAMES = BRANCHES.map((branch) => branch.name);

export const homeBranch = {
  id: "CN01",
  name: "Chi nhánh Quận 1",
  address: "12 Lê Lợi, Phường Bến Nghé, Quận 1, TP.HCM",
  phone: "028 3800 0001",
  open: "05:00",
  close: "22:00",
  capacity: 180,
  ptRate: 150000,
  services: ["Gym", "Yoga", "GroupX", "PT 1-1", "Spa"],
  gates: ["Cửa 1", "Cửa 2", "Cửa 3"],
};

export const servicePackages = [
  {
    id: "GYM03",
    image: "/images/packages/gym.jpg",
    name: "Gym 3 tháng",
    type: "Gym",
    months: 3,
    sessions: null,
    price: 3000000,
    status: "Đang bán",
  },
  {
    id: "GYM06",
    image: "/images/packages/gym.jpg",
    name: "Gym 6 tháng",
    type: "Gym",
    months: 6,
    sessions: null,
    price: 5500000,
    status: "Đang bán",
  },
  {
    id: "GYM12",
    image: "/images/packages/gym.jpg",
    name: "Gym 12 tháng",
    type: "Gym",
    months: 12,
    sessions: null,
    price: 10000000,
    status: "Đang bán",
  },
  {
    id: "YOGA03",
    image: "/images/packages/yoga1.jpg",
    name: "Yoga 3 tháng",
    type: "Yoga",
    months: 3,
    sessions: null,
    price: 3600000,
    status: "Đang bán",
  },
  {
    id: "YOGA12",
    image: "/images/packages/yoga1.jpg",
    name: "Yoga 12 tháng",
    type: "Yoga",
    months: 12,
    sessions: null,
    price: 12000000,
    status: "Ngừng bán",
  },
  {
    id: "GX06",
    image: "/images/packages/groupx.jpg",
    name: "GroupX 6 tháng",
    type: "GroupX",
    months: 6,
    sessions: null,
    price: 4800000,
    status: "Đang bán",
  },
  {
    id: "PT10",
    image: "/images/packages/pt.jpg",
    name: "PT 10 buổi",
    type: "PT 1-1",
    months: 3,
    sessions: 10,
    price: 6000000,
    status: "Đang bán",
  },
  {
    id: "PT20",
    image: "/images/packages/pt2.jpg",
    name: "PT 20 buổi",
    type: "PT 1-1",
    months: 6,
    sessions: 20,
    price: 11000000,
    status: "Đang bán",
  },
  {
    id: "SPA01",
    image: "/images/packages/spaticket.jpg",
    name: "Vé Spa lẻ",
    type: "Spa",
    months: null,
    sessions: 1,
    price: 350000,
    status: "Đang bán",
  },
];

export const products = [
  {
    id: "SP01",
    name: "Nước khoáng 500ml",
    type: "Đồ uống",
    price: 10000,
    stock: 140,
    status: "Đang bán",
  },
  {
    id: "SP02",
    name: "Whey protein 1kg",
    type: "Thực phẩm bổ sung",
    price: 950000,
    stock: 6,
    status: "Đang bán",
  },
  {
    id: "SP03",
    name: "Khăn tập",
    type: "Phụ kiện",
    price: 120000,
    stock: 35,
    status: "Đang bán",
  },
  {
    id: "SP04",
    name: "Bình nước 750ml",
    type: "Phụ kiện",
    price: 150000,
    stock: 0,
    status: "Đang bán",
  },
  {
    id: "SP05",
    name: "Găng tay tập",
    type: "Phụ kiện",
    price: 250000,
    stock: 18,
    status: "Đang bán",
  },
  {
    id: "SP06",
    name: "Thanh năng lượng",
    type: "Đồ ăn nhẹ",
    price: 35000,
    stock: 9,
    status: "Đang bán",
  },
  {
    id: "SP07",
    name: "Dây kháng lực",
    type: "Phụ kiện",
    price: 180000,
    stock: 4,
    status: "Ngừng bán",
  },
];

export const stockStatus = (stock: number) =>
  stock === 0 ? "Hết hàng" : "Còn hàng";

export const stockReceipts = [
  {
    id: "PN0024",
    date: isoDate(0),
    staff: "Võ Gia Bảo",
    lines: [
      { product: "Nước khoáng 500ml", quantity: 96, cost: 6000 },
      { product: "Thanh năng lượng", quantity: 40, cost: 22000 },
    ],
  },
  {
    id: "PN0023",
    date: isoDate(-3),
    staff: "Võ Gia Bảo",
    lines: [{ product: "Whey protein 1kg", quantity: 10, cost: 720000 }],
  },
  {
    id: "PN0022",
    date: isoDate(-8),
    staff: "Trần Thu Hà",
    lines: [
      { product: "Khăn tập", quantity: 30, cost: 70000 },
      { product: "Găng tay tập", quantity: 20, cost: 150000 },
    ],
  },
  {
    id: "PN0021",
    date: isoDate(-15),
    staff: "Võ Gia Bảo",
    lines: [{ product: "Bình nước 750ml", quantity: 24, cost: 90000 }],
  },
];
export type StockReceipt = (typeof stockReceipts)[number];

export const receiptTotal = (receipt: StockReceipt) =>
  receipt.lines.reduce((sum, line) => sum + line.quantity * line.cost, 0);
