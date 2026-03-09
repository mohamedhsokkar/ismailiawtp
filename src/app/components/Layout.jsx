import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Outlet, useNavigate, NavLink } from "react-router";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import {
  Droplets,
  LayoutDashboard,
  FlaskConical,
  Factory,
  AlertTriangle,
  Menu,
  LogOut,
  UserCircle2
} from "lucide-react";
import { clearSession, getSession } from "../lib/auth";
import { canAccessFeature } from "../lib/roles";
function Layout() {
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const currentSession = getSession();
    if (!currentSession?.isAuthenticated) {
      navigate("/login");
    } else {
      setSession(currentSession);
    }
  }, [navigate]);
  const handleLogout = () => {
    clearSession();
    navigate("/login");
  };
  if (!session?.user) return null;
  const navItems = [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/lab", label: "Lab", icon: FlaskConical, feature: "lab" },
    { to: "/assets", label: "Assets", icon: Factory, feature: "assets" },
    { to: "/issues", label: "Issues", icon: AlertTriangle, feature: "issues" },
    { to: "/users", label: "Users", icon: UserCircle2, feature: "user-management" }
  ].filter((item) => !("feature" in item) || canAccessFeature(session.user.role, item.feature));
  const NavContent = () => /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 px-4 py-6", children: [
      /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center", children: /* @__PURE__ */ jsx(Droplets, { className: "w-6 h-6 text-white" }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsx("h1", { className: "font-semibold", children: "Ismailia Water Treatment Plant" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: session.user.name })
      ] })
    ] }),
    /* @__PURE__ */ jsx("nav", { className: "flex-1 px-2 space-y-1", children: navItems.map((item) => /* @__PURE__ */ jsxs(
      NavLink,
      {
        to: item.to,
        end: item.to === "/",
        onClick: () => setMobileOpen(false),
        className: ({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-100"}`,
        children: [
          /* @__PURE__ */ jsx(item.icon, { className: "w-5 h-5" }),
          /* @__PURE__ */ jsx("span", { children: item.label })
        ]
      },
      item.to
    )) }),
    /* @__PURE__ */ jsxs("div", { className: "p-4 border-t", children: [
      /* @__PURE__ */ jsxs(
        NavLink,
        {
          to: "/profile",
          onClick: () => setMobileOpen(false),
          className: ({ isActive }) => `flex items-center gap-2 px-3 py-2 rounded-lg mb-3 ${isActive ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-100"}`,
          children: [
            /* @__PURE__ */ jsx(UserCircle2, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsx("span", { children: "Profile" })
          ]
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "mb-3 px-3 py-2 bg-blue-50 rounded-lg", children: [
        /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-600", children: "Role" }),
        /* @__PURE__ */ jsx("p", { className: "font-medium text-sm capitalize", children: session.user.role })
      ] }),
      /* @__PURE__ */ jsxs(
        Button,
        {
          variant: "outline",
          className: "w-full justify-start gap-2",
          onClick: handleLogout,
          children: [
            /* @__PURE__ */ jsx(LogOut, { className: "w-4 h-4" }),
            "Logout"
          ]
        }
      )
    ] })
  ] });
  return /* @__PURE__ */ jsxs("div", { className: "flex h-screen bg-gray-50", children: [
    /* @__PURE__ */ jsx("aside", { className: "hidden md:flex md:flex-col w-64 bg-white border-r", children: /* @__PURE__ */ jsx(NavContent, {}) }),
    /* @__PURE__ */ jsxs("div", { className: "md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b flex items-center px-4 z-10", children: [
      /* @__PURE__ */ jsxs(Sheet, { open: mobileOpen, onOpenChange: setMobileOpen, children: [
        /* @__PURE__ */ jsx(SheetTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "icon", children: /* @__PURE__ */ jsx(Menu, { className: "w-6 h-6" }) }) }),
        /* @__PURE__ */ jsx(SheetContent, { side: "left", className: "p-0 w-64", children: /* @__PURE__ */ jsx("div", { className: "flex flex-col h-full", children: /* @__PURE__ */ jsx(NavContent, {}) }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 ml-4", children: [
        /* @__PURE__ */ jsx(Droplets, { className: "w-6 h-6 text-blue-600" }),
        /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "Water Treatment" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("main", { className: "flex-1 overflow-auto md:pt-0 pt-16", children: /* @__PURE__ */ jsx(Outlet, {}) })
  ] });
}
export {
  Layout
};
