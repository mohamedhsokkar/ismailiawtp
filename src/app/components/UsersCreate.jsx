import { useState } from "react";
import { useNavigate } from "react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { adminCreateUser } from "../lib/auth";
import { toast } from "sonner";
function UsersCreate() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    workID: "",
    mobileNumber: "",
    password: "",
    nationalID: "",
    role: "operator"
  });
  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      await adminCreateUser(form);
      toast.success("User created successfully");
      navigate("/users/list");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to create user");
    } finally {
      setLoading(false);
    }
  };
  return <Card><CardHeader><CardTitle>Create New User</CardTitle><CardDescription>Add a user and assign role-based access</CardDescription></CardHeader><CardContent><form onSubmit={handleSubmit} className="space-y-4 max-w-xl"><div className="space-y-2"><Label htmlFor="new-user-name">Name</Label><Input id="new-user-name" value={form.name} onChange={e => setForm(prev => ({
            ...prev,
            name: e.target.value
          }))} required={true} /></div><div className="space-y-2"><Label htmlFor="new-user-work-id">Work ID</Label><Input id="new-user-work-id" type="number" value={form.workID} onChange={e => setForm(prev => ({
            ...prev,
            workID: e.target.value
          }))} required={true} /></div><div className="space-y-2"><Label htmlFor="new-user-mobile-number">Mobile Number</Label><Input id="new-user-mobile-number" inputMode="numeric" maxLength={11} value={form.mobileNumber} placeholder="Optional" onChange={e => setForm(prev => ({
            ...prev,
            mobileNumber: e.target.value.replace(/\D/g, "").slice(0, 11)
          }))} /></div><div className="space-y-2"><Label htmlFor="new-user-password">Password</Label><Input id="new-user-password" type="password" value={form.password} onChange={e => setForm(prev => ({
            ...prev,
            password: e.target.value
          }))} required={true} /></div><div className="space-y-2"><Label htmlFor="new-user-national-id">National ID</Label><Input id="new-user-national-id" value={form.nationalID} placeholder="Optional" onChange={e => setForm(prev => ({
            ...prev,
            nationalID: e.target.value
          }))} /></div><div className="space-y-2"><Label htmlFor="new-user-role">Role</Label><Select value={form.role} onValueChange={value => setForm(prev => ({
            ...prev,
            role: value
          }))}><SelectTrigger id="new-user-role"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="admin">Admin</SelectItem><SelectItem value="engineer">Engineer</SelectItem><SelectItem value="operator">Operator</SelectItem><SelectItem value="chemist">Chemist</SelectItem></SelectContent></Select></div><Button type="submit" disabled={loading}>{loading ? "Creating..." : "Create User"}</Button></form></CardContent></Card>;
}
export { UsersCreate };
