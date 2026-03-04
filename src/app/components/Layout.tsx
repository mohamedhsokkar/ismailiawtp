import { useEffect, useState } from 'react';
import { Outlet, useNavigate, NavLink } from 'react-router';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { 
  Droplets, 
  LayoutDashboard, 
  FileInput, 
  BarChart3, 
  Waves,
  Menu,
  LogOut,
} from 'lucide-react';

interface User {
  username: string;
  role: 'operator' | 'viewer';
  isAuthenticated: boolean;
}

export function Layout() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!user) return null;

  const navItems = [
    { to: '/', label: 'Dashboard', icon: LayoutDashboard, allowedRoles: ['operator', 'viewer'] },
    { to: '/data-entry', label: 'Data Entry', icon: FileInput, allowedRoles: ['operator'] },
    { to: '/analytics', label: 'Analytics', icon: BarChart3, allowedRoles: ['operator', 'viewer'] },
    { to: '/water-quality', label: 'Water Quality', icon: Waves, allowedRoles: ['operator', 'viewer'] },
  ].filter(item => item.allowedRoles.includes(user.role));

  const NavContent = () => (
    <>
      <div className="flex items-center gap-2 px-4 py-6">
        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
          <Droplets className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h1 className="font-semibold">Ismailia Water Treatment Plant</h1>
          <p className="text-sm text-gray-600">{user.username}</p>
        </div>
      </div>
      
      <nav className="flex-1 px-2 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t">
        <div className="mb-3 px-3 py-2 bg-blue-50 rounded-lg">
          <p className="text-xs text-gray-600">Role</p>
          <p className="font-medium text-sm capitalize">{user.role}</p>
        </div>
        <Button 
          variant="outline" 
          className="w-full justify-start gap-2"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </div>
    </>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:flex-col w-64 bg-white border-r">
        <NavContent />
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b flex items-center px-4 z-10">
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64">
            <div className="flex flex-col h-full">
              <NavContent />
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-2 ml-4">
          <Droplets className="w-6 h-6 text-blue-600" />
          <span className="font-semibold">Water Treatment</span>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-auto md:pt-0 pt-16">
        <Outlet />
      </main>
    </div>
  );
}
