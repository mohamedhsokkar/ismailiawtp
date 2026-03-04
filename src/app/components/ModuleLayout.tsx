import { NavLink, Outlet } from "react-router";

export interface ModuleTab {
  to: string;
  label: string;
}

interface ModuleLayoutProps {
  title: string;
  description: string;
  tabs: ModuleTab[];
}

export function ModuleLayout({ title, description, tabs }: ModuleLayoutProps) {
  return (
    <div className="p-6 space-y-4">
      <div>
        <h1>{title}</h1>
        <p className="text-gray-600 mt-1">{description}</p>
      </div>

      <div className="w-full border-b bg-white overflow-x-auto">
        <div className="flex min-w-max">
          {tabs.map((tab) => (
            <NavLink
              key={tab.to}
              to={tab.to}
              end={tab.to === "."}
              className={({ isActive }) =>
                `px-4 py-3 text-sm whitespace-nowrap border-b-2 transition-colors ${
                  isActive
                    ? "border-blue-600 text-blue-700"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`
              }
            >
              {tab.label}
            </NavLink>
          ))}
        </div>
      </div>

      <Outlet />
    </div>
  );
}
