import { useState } from "react";
import MainLayout from "./layouts/MainLayout";
import type { PageId } from "./layouts/navigation";
import Schedule from "./pages/Schedule";
import Plans from "./pages/Plans";
import Billing from "./pages/Billing";
import History from "./pages/History";
import Rewards from "./pages/Rewards";
import Profile from "./pages/Profile";

export default function App() {
  const [page, setPage] = useState<PageId>("schedule");
  const pages = {
    schedule: <Schedule />,
    plans: <Plans />,
    billing: <Billing />,
    history: <History />,
    rewards: <Rewards />,
    profile: <Profile />,
  };
  return (
    <MainLayout page={page} onNavigate={setPage}>
      {pages[page]}
    </MainLayout>
  );
}
