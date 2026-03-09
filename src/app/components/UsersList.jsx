import { jsx, jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { getAllUsers } from "../lib/auth";
import { toast } from "sonner";
function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Unable to load users");
      } finally {
        setLoading(false);
      }
    };
    void loadUsers();
  }, []);
  return /* @__PURE__ */ jsxs(Card, { children: [
    /* @__PURE__ */ jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsx(CardTitle, { children: "Users and Roles" }),
      /* @__PURE__ */ jsx(CardDescription, { children: "All active users in the system" })
    ] }),
    /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("div", { className: "rounded-md border", children: /* @__PURE__ */ jsxs(Table, { children: [
      /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
        /* @__PURE__ */ jsx(TableHead, { children: "Name" }),
        /* @__PURE__ */ jsx(TableHead, { children: "Email" }),
        /* @__PURE__ */ jsx(TableHead, { children: "Role" }),
        /* @__PURE__ */ jsx(TableHead, { children: "National ID" })
      ] }) }),
      /* @__PURE__ */ jsx(TableBody, { children: users.length === 0 ? /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(TableCell, { colSpan: 4, className: "text-center py-8 text-gray-500", children: loading ? "Loading users..." : "No users found" }) }) : users.map((user) => /* @__PURE__ */ jsxs(TableRow, { children: [
        /* @__PURE__ */ jsx(TableCell, { children: user.name }),
        /* @__PURE__ */ jsx(TableCell, { children: user.email }),
        /* @__PURE__ */ jsx(TableCell, { className: "capitalize", children: user.role }),
        /* @__PURE__ */ jsx(TableCell, { children: user.nationalID ?? "-" })
      ] }, user._id)) })
    ] }) }) })
  ] });
}
export {
  UsersList
};
