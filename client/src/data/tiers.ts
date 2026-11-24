export const TIERS = [
  { name: "Silver", threshold: 0, discount: 0 },
  { name: "Gold", threshold: 20000000, discount: 5 },
  { name: "Platinum", threshold: 50000000, discount: 10 },
] as const;

export const tierColor = (tier: string) =>
  tier === "Platinum" ? "primary" : tier === "Gold" ? "warning" : "gray";

export const tierTextClass = (tier: string) =>
  tier === "Platinum"
    ? "text-brand-600 dark:text-brand-400"
    : tier === "Gold"
      ? "text-amber-600 dark:text-orange-400"
      : "text-gray-600 dark:text-gray-400";
