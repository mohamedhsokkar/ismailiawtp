const ROLE_FEATURES = {
  admin: ["lab", "assets", "issues", "user-management"],
  engineer: ["lab", "assets", "issues"],
  operator: ["assets", "issues"],
  chemist: ["lab"]
};
const canAccessFeature = (role, feature) => ROLE_FEATURES[role]?.includes(feature) ?? false;
export {
  canAccessFeature
};
