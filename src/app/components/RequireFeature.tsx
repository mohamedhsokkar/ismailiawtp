import { Navigate } from "react-router";
import type { ReactElement } from "react";
import { getSession } from "../lib/auth";
import { canAccessFeature } from "../lib/roles";
import type { AppFeature } from "../lib/roles";

interface RequireFeatureProps {
  feature: AppFeature;
  children: ReactElement;
}

export function RequireFeature({ feature, children }: RequireFeatureProps) {
  const session = getSession();

  if (!session?.isAuthenticated || !session.user) {
    return <Navigate to="/login" replace />;
  }

  if (!canAccessFeature(session.user.role, feature)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
