import { Navigate } from "react-router";
import { getSession } from "../lib/auth";
import { canAccessFeature } from "../lib/roles";
function RequireFeature({
  feature,
  children
}) {
  const session = getSession();
  if (!session?.isAuthenticated || !session.user) {
    return <Navigate to="/login" replace={true} />;
  }
  if (!canAccessFeature(session.user.role, feature)) {
    return <Navigate to="/" replace={true} />;
  }
  return children;
}
export { RequireFeature };
