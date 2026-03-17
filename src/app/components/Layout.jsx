import { useEffect, useState } from "react";
import { Outlet, useNavigate, NavLink } from "react-router";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Droplets, LayoutDashboard, FlaskConical, Factory, AlertTriangle, Menu, LogOut, UserCircle2 } from "lucide-react";
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
  const navItems = [{
    to: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard
  }, {
    to: "/lab",
    label: "Lab",
    icon: FlaskConical,
    feature: "lab"
  }, {
    to: "/assets",
    label: "Assets",
    icon: Factory,
    feature: "assets"
  }, {
    to: "/issues",
    label: "Issues",
    icon: AlertTriangle,
    feature: "issues"
  }, {
    to: "/users",
    label: "Users",
    icon: UserCircle2,
    feature: "user-management"
  }].filter(item => !("feature" in item) || canAccessFeature(session.user.role, item.feature));
  const NavContent = () => <><div className="flex items-center gap-2 px-4 py-6"><div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center"><Droplets className="w-6 h-6 text-white" /></div><div className="flex-1"><h1 className="font-semibold">Ismailia Water Treatment Plant</h1><p className="text-sm text-gray-600">{session.user.name}</p></div></div><nav className="flex-1 px-2 space-y-1">{navItems.map(item => <NavLink to={item.to} end={item.to === "/"} onClick={() => setMobileOpen(false)} className={({
        isActive
      }) => `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-100"}`} key={item.to}><item.icon className="w-5 h-5" /><span>{item.label}</span></NavLink>)}</nav><div className="p-4 border-t"><NavLink to="/profile" onClick={() => setMobileOpen(false)} className={({
        isActive
      }) => `flex items-center gap-2 px-3 py-2 rounded-lg mb-3 ${isActive ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-100"}`}><UserCircle2 className="w-4 h-4" /><span>Profile</span></NavLink><div className="mb-3 px-3 py-2 bg-blue-50 rounded-lg"><p className="text-xs text-gray-600">Role</p><p className="font-medium text-sm capitalize">{session.user.role}</p></div><Button variant="outline" className="w-full justify-start gap-2" onClick={handleLogout}><LogOut className="w-4 h-4" />Logout</Button></div></>;
  return <div className="flex h-screen bg-gray-50"><aside className="hidden md:flex md:flex-col w-64 bg-white border-r"><NavContent /></aside><div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b flex items-center px-4 z-10"><Sheet open={mobileOpen} onOpenChange={setMobileOpen}><SheetTrigger asChild={true}><Button variant="ghost" size="icon"><Menu className="w-6 h-6" /></Button></SheetTrigger><SheetContent side="left" className="p-0 w-64"><div className="flex flex-col h-full"><NavContent /></div></SheetContent></Sheet><div className="flex items-center gap-2 ml-4"><Droplets className="w-6 h-6 text-blue-600" /><span className="font-semibold">Water Treatment</span></div></div><main className="flex-1 overflow-auto md:pt-0 pt-16"><Outlet /></main></div>;
}
export { Layout };
