import { useEffect, type ComponentType } from "react";
import {
  Link,
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router";
import { APP_ROUTES, ROLE_BASE_PATHS, getRoleHomePath, getPagePath } from "./layouts/routes";
import { Button } from "./components/ui/button";
import { Card, CardDescription, CardTitle } from "./components/ui/card";
import MainLayout from "./layouts/MainLayout";
import { ROLES, type PageId } from "./layouts/navigation";
import Home from "./pages/Home";
import Schedule from "./pages/Schedule";
import Plans from "./pages/Plans";
import Orders from "./pages/Orders";
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
  orders: Orders,
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

function ApplicationLayout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const normalizedPath = pathname.replace(/\/+$/, "").toLowerCase() || "/";
  const current = APP_ROUTES.find((route) => route.path === normalizedPath);

  useEffect(() => {
    if (current) document.title = current.label;
    window.scrollTo(0, 0);
  }, [current, pathname]);

  if (!current) return null;
  return (
    <MainLayout
      role={current.role}
      page={current.page}
      onRoleChange={(role) => navigate(getRoleHomePath(role))}
    >
      <Outlet />
    </MainLayout>
  );
}

function NotFound() {
  useEffect(() => {
    document.title = "Không tìm thấy trang";
  }, []);
  return (
    <main className="flex min-h-dvh items-center justify-center p-6">
      <Card className="w-full max-w-lg">
        <CardTitle className="text-xl font-semibold">
          Không tìm thấy trang
        </CardTitle>
        <CardDescription>
          Đường dẫn này không tồn tại. Chọn bên dưới để quay về Lịch tập.
        </CardDescription>
        <Button render={<Link to={getRoleHomePath("member")} />}>
          Về Lịch tập
        </Button>
      </Card>
    </main>
  );
}

function LegacyMemberRedirect({ to }: { to: string }) {
  const { search, hash } = useLocation();
  return <Navigate to={{ pathname: to, search, hash }} replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {ROLES.filter(({ id }) => id !== "gate").map(({ id }) => (
        <Route
          key={id}
          path={ROLE_BASE_PATHS[id]}
          element={<Navigate to={getRoleHomePath(id)} replace />}
        />
      ))}
      {APP_ROUTES.filter(({ role }) => role === "member").map(({ path }) => (
        <Route
          key={`legacy-${path}`}
          path={path.slice(ROLE_BASE_PATHS.member.length)}
          element={<LegacyMemberRedirect to={path} />}
        />
      ))}
      {[getPagePath("member", "plans"), "/plans"].map((path) => (
        <Route
          key={path}
          path={path}
          element={<Navigate to={`${getPagePath("member", "profile")}?tab=plans`} replace />}
        />
      ))}
      <Route element={<ApplicationLayout />}>
        {APP_ROUTES.map(({ path, page }) => {
          const Page = PAGES[page];
          return <Route key={path} path={path} element={<Page key={path} />} />;
        })}
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
