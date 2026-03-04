import type { UserRole } from "../types/auth";

export type AppFeature = "dashboard" | "data-entry" | "analytics" | "water-quality" | "user-management";

const ROLE_FEATURES: Record<UserRole, AppFeature[]> = {
  admin: ["dashboard", "data-entry", "analytics", "water-quality", "user-management"],
  engineer: ["dashboard", "analytics", "water-quality", "user-management"],
  operator: ["dashboard", "data-entry", "analytics", "water-quality"],
  chemist: ["dashboard", "data-entry", "water-quality"],
};

export const canAccessFeature = (role: UserRole, feature: AppFeature) =>
  ROLE_FEATURES[role]?.includes(feature) ?? false;
