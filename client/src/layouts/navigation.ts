export type PageId =
  "schedule" | "plans" | "billing" | "history" | "rewards" | "profile";
export type PageNavigation = {
  page: PageId;
  onNavigate: (page: PageId) => void;
};
