import { jsx, jsxs } from "react/jsx-runtime";
import { NavLink, Outlet } from "react-router";
function ModuleLayout({ title, description, tabs }) {
  return /* @__PURE__ */ jsxs("div", { className: "p-6 space-y-4", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h1", { children: title }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600 mt-1", children: description })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "w-full border-b bg-white overflow-x-auto", children: /* @__PURE__ */ jsx("div", { className: "flex min-w-max", children: tabs.map((tab) => /* @__PURE__ */ jsx(
      NavLink,
      {
        to: tab.to,
        end: tab.to === ".",
        className: ({ isActive }) => `px-4 py-3 text-sm whitespace-nowrap border-b-2 transition-colors ${isActive ? "border-blue-600 text-blue-700" : "border-transparent text-gray-600 hover:text-gray-900"}`,
        children: tab.label
      },
      tab.to
    )) }) }),
    /* @__PURE__ */ jsx(Outlet, {})
  ] });
}
export {
  ModuleLayout
};
