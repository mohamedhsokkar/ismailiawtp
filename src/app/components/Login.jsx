import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Droplets } from "lucide-react";
import { login, register } from "../lib/auth";
import { toast } from "sonner";
function Login() {
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState({
    workID: "",
    password: ""
  });
  const [registerForm, setRegisterForm] = useState({
    name: "",
    workID: "",
    mobileNumber: "",
    password: "",
    nationalID: "",
    role: "operator"
  });
  const [loading, setLoading] = useState(false);
  const handleLogin = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(loginForm.workID, loginForm.password);
      navigate("/");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to sign in");
    } finally {
      setLoading(false);
    }
  };
  const handleRegister = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(registerForm);
      toast.success("User created. You can now sign in.");
      setLoginForm({
        workID: registerForm.workID,
        password: ""
      });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to register");
    } finally {
      setLoading(false);
    }
  };
  return <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50 p-4"><Card className="w-full max-w-md"><CardHeader className="space-y-1 text-center"><div className="flex justify-center mb-4"><div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center"><Droplets className="w-10 h-10 text-white" /></div></div><CardTitle>Water Treatment Plant</CardTitle><CardDescription>Sign in to access the management system</CardDescription></CardHeader><CardContent><Tabs defaultValue="sign-in" className="space-y-4"><TabsList className="grid w-full grid-cols-2"><TabsTrigger value="sign-in">Sign In</TabsTrigger><TabsTrigger value="register">Register</TabsTrigger></TabsList><TabsContent value="sign-in"><form onSubmit={handleLogin} className="space-y-4"><div className="space-y-2"><Label htmlFor="work-id">Work ID</Label><Input id="work-id" type="number" placeholder="Enter work ID" value={loginForm.workID} onChange={e => setLoginForm(prev => ({
                  ...prev,
                  workID: e.target.value
                }))} required={true} /></div><div className="space-y-2"><Label htmlFor="password">Password</Label><Input id="password" type="password" placeholder="Enter password" value={loginForm.password} onChange={e => setLoginForm(prev => ({
                  ...prev,
                  password: e.target.value
                }))} required={true} /></div><Button type="submit" className="w-full" disabled={loading}>{loading ? "Signing In..." : "Sign In"}</Button></form></TabsContent><TabsContent value="register"><form onSubmit={handleRegister} className="space-y-4"><div className="space-y-2"><Label htmlFor="name">Name</Label><Input id="name" type="text" value={registerForm.name} onChange={e => setRegisterForm(prev => ({
                  ...prev,
                  name: e.target.value
                }))} required={true} /></div><div className="space-y-2"><Label htmlFor="register-work-id">Work ID</Label><Input id="register-work-id" type="number" value={registerForm.workID} onChange={e => setRegisterForm(prev => ({
                  ...prev,
                  workID: e.target.value
                }))} required={true} /></div><div className="space-y-2"><Label htmlFor="register-mobile-number">Mobile Number</Label><Input id="register-mobile-number" inputMode="numeric" maxLength={11} placeholder="Optional" value={registerForm.mobileNumber} onChange={e => setRegisterForm(prev => ({
                  ...prev,
                  mobileNumber: e.target.value.replace(/\D/g, "").slice(0, 11)
                }))} /></div><div className="space-y-2"><Label htmlFor="register-password">Password</Label><Input id="register-password" type="password" value={registerForm.password} onChange={e => setRegisterForm(prev => ({
                  ...prev,
                  password: e.target.value
                }))} required={true} /></div><div className="space-y-2"><Label htmlFor="national-id">National ID</Label><Input id="national-id" type="text" placeholder="Optional" value={registerForm.nationalID} onChange={e => setRegisterForm(prev => ({
                  ...prev,
                  nationalID: e.target.value
                }))} /></div><div className="space-y-2"><Label htmlFor="register-role">Role</Label><Select value={registerForm.role} onValueChange={value => setRegisterForm(prev => ({
                  ...prev,
                  role: value
                }))}><SelectTrigger id="register-role"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="admin">Admin</SelectItem><SelectItem value="engineer">Engineer</SelectItem><SelectItem value="operator">Operator</SelectItem><SelectItem value="chemist">Chemist</SelectItem></SelectContent></Select></div><Button type="submit" className="w-full" disabled={loading}>{loading ? "Creating..." : "Create User"}</Button></form></TabsContent></Tabs></CardContent></Card></div>;
}
export { Login };
