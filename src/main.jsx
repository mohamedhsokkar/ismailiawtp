import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { createRoot } from "react-dom/client";
import App from "./app/App.jsx";
import { Toaster } from "./app/components/ui/sonner";
import "./styles/index.css";
createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(App, {}),
    /* @__PURE__ */ jsx(Toaster, {})
  ] })
);
