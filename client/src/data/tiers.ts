export const TIERS = [
  { name: "Silver", threshold: 0, discount: 0 },
  { name: "Gold", threshold: 20000000, discount: 5 },
  { name: "Platinum", threshold: 50000000, discount: 10 },
] as const;

export const tierColor = (tier: string) =>
  tier === "Platinum" ? "primary" : "gray";

export const tierTextClass = (tier: string) => tier === "Platinum" ? "text-black" : "text-gray-700";
