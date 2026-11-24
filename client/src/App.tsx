import { useState, type ComponentType } from "react";
import MainLayout from "./layouts/MainLayout";
import { NAVIGATION, type PageId, type Role } from "./layouts/navigation";
import Schedule from "./pages/Schedule";
import Plans from "./pages/Plans";
import Billing from "./pages/Billing";
import History from "./pages/History";
import Rewards from "./pages/Rewards";
import Profile from "./pages/Profile";
import Members from "./pages/front-desk/Members";
import PointOfSale from "./pages/front-desk/PointOfSale";
import CheckIns from "./pages/front-desk/CheckIns";
import PtBookings from "./pages/front-desk/PtBookings";
import MemberCare from "./pages/front-desk/MemberCare";
import StockReceipts from "./pages/sales/StockReceipts";
import Inventory from "./pages/sales/Inventory";
import Teaching from "./pages/trainer/Teaching";
import TrainerReviews from "./pages/trainer/TrainerReviews";
import TrainerPayslip from "./pages/trainer/TrainerPayslip";
import Catalog from "./pages/manager/Catalog";
import Staff from "./pages/manager/Staff";
import Payroll from "./pages/manager/Payroll";
import BranchReports from "./pages/manager/BranchReports";
import SystemReports from "./pages/director/SystemReports";
import TierSettings from "./pages/director/TierSettings";
import GateKiosk from "./pages/gate/GateKiosk";

const PAGES: Record<PageId, ComponentType> = {
  schedule: Schedule,
  plans: Plans,
  billing: Billing,
  history: History,
  rewards: Rewards,
  profile: Profile,
  members: Members,
  pos: PointOfSale,
  checkins: CheckIns,
  "pt-bookings": PtBookings,
  care: MemberCare,
  "stock-receipts": StockReceipts,
  inventory: Inventory,
  teaching: Teaching,
  reviews: TrainerReviews,
  payslip: TrainerPayslip,
  catalog: Catalog,
  staff: Staff,
  payroll: Payroll,
  "branch-reports": BranchReports,
  "system-reports": SystemReports,
  tiers: TierSettings,
  gate: GateKiosk,
};

export default function App() {
  const [role, setRole] = useState<Role>("member");
  const [page, setPage] = useState<PageId>("schedule");
  const Page = PAGES[page];

  const changeRole = (next: Role) => {
    setRole(next);
    setPage(NAVIGATION[next][0].page);
  };

  return (
    <MainLayout
      role={role}
      onRoleChange={changeRole}
      page={page}
      onNavigate={setPage}
    >
      <Page key={page} />
    </MainLayout>
  );
}
