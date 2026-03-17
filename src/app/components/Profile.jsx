import { useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { changePassword, getSession } from "../lib/auth";
import { toast } from "sonner";
function Profile() {
  const session = useMemo(() => getSession(), []);
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [loading, setLoading] = useState(false);
  const handleChangePassword = async e => {
    e.preventDefault();
    if (form.newPassword !== form.confirmPassword) {
      toast.error("New password and confirmation do not match");
      return;
    }
    setLoading(true);
    try {
      await changePassword(form.currentPassword, form.newPassword);
      toast.success("Password updated successfully");
      setForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to update password");
    } finally {
      setLoading(false);
    }
  };
  return <div className="p-6 space-y-6"><div><h1>Profile</h1><p className="text-gray-600 mt-1">View your account information and update password</p></div><Tabs defaultValue="info" className="space-y-6"><div className="w-full border-b bg-white"><TabsList className="h-11 bg-transparent p-0"><TabsTrigger value="info" className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600">My Info</TabsTrigger><TabsTrigger value="password" className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600">Change Password</TabsTrigger></TabsList></div><TabsContent value="info"><Card><CardHeader><CardTitle>User Information</CardTitle><CardDescription>Your current account details</CardDescription></CardHeader><CardContent className="space-y-4"><div><Label>Name</Label><Input value={session?.user?.name ?? ""} disabled={true} /></div><div><Label>Work ID</Label><Input value={session?.user?.workID?.toString() ?? ""} disabled={true} /></div><div><Label>Mobile Number</Label><Input value={session?.user?.mobileNumber ?? ""} disabled={true} /></div><div><Label>Role</Label><Input value={session?.user?.role ?? ""} disabled={true} /></div><div><Label>National ID</Label><Input value={session?.user?.nationalID?.toString() ?? ""} disabled={true} /></div></CardContent></Card></TabsContent><TabsContent value="password"><Card><CardHeader><CardTitle>Change Password</CardTitle><CardDescription>Update your account password</CardDescription></CardHeader><CardContent><form onSubmit={handleChangePassword} className="space-y-4 max-w-xl"><div className="space-y-2"><Label htmlFor="current-password">Current Password</Label><Input id="current-password" type="password" value={form.currentPassword} onChange={e => setForm(prev => ({
                  ...prev,
                  currentPassword: e.target.value
                }))} required={true} /></div><div className="space-y-2"><Label htmlFor="new-password">New Password</Label><Input id="new-password" type="password" value={form.newPassword} onChange={e => setForm(prev => ({
                  ...prev,
                  newPassword: e.target.value
                }))} required={true} /></div><div className="space-y-2"><Label htmlFor="confirm-password">Confirm New Password</Label><Input id="confirm-password" type="password" value={form.confirmPassword} onChange={e => setForm(prev => ({
                  ...prev,
                  confirmPassword: e.target.value
                }))} required={true} /></div><Button type="submit" disabled={loading}>{loading ? "Updating..." : "Update Password"}</Button></form></CardContent></Card></TabsContent></Tabs></div>;
}
export { Profile };
