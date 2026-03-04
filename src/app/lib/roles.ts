import type { UserRole } from "../types/auth";

export type AppFeature = "lab" | "assets" | "user-management";

const ROLE_FEATURES: Record<UserRole, AppFeature[]> = {
  admin: ["lab", "assets", "user-management"],
  engineer: ["lab", "assets"],
  operator: ["lab", "assets"],
  chemist: ["lab"],
};

export const canAccessFeature = (role: UserRole, feature: AppFeature) =>
  ROLE_FEATURES[role]?.includes(feature) ?? false;
