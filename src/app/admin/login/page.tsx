"use client";

import { useState } from "react";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Shield, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      console.log("🔍 Attempting login with:", { email });
      
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      console.log("📝 SignIn result:", result);

      if (result?.error) {
        console.error("❌ Login failed:", result.error);
        setError("Invalid email or password. Please try again.");
      } else if (result?.ok) {
        console.log("✅ SignIn successful, checking session...");
        
        // Wait for session to be established
        let attempts = 0;
        const maxAttempts = 10;
        
        const checkSession = async () => {
          try {
            const session = await getSession();
            console.log("📋 Session check attempt", attempts + 1, ":", session);
            
            if (session?.user) {
              console.log("✅ Session established, user role:", session.user.role);
              if (session.user.role === "ADMIN" || session.user.role === "CONTENT_MANAGER") {
                console.log("🚀 Redirecting to admin dashboard");
                router.push("/admin/dashboard");
                return;
              } else {
                setError("Access denied. Admin privileges required.");
                return;
              }
            }
            
            attempts++;
            if (attempts < maxAttempts) {
              setTimeout(checkSession, 200);
            } else {
              console.error("❌ Session timeout after", maxAttempts, "attempts");
              setError("Session timeout. Please try again.");
            }
          } catch (sessionError) {
            console.error("❌ Session error:", sessionError);
            setError("Session error. Please try again.");
          }
        };
        
        checkSession();
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("❌ Login error:", error);
      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-60 right-32 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>
      
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-2xl">
          <CardHeader className="text-center pb-6">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Shield className="w-8 h-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-white mb-2">
              Admin Login
            </CardTitle>
            <p className="text-white/70 text-sm">
              Sign in to access the admin dashboard
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email" className="text-white/90 font-medium">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 focus:ring-blue-400/20 mt-1"
                  placeholder="admin@eagleminds.com"
                  required
                  disabled={isLoading}
                />
              </div>
              
              <div>
                <Label htmlFor="password" className="text-white/90 font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 focus:ring-blue-400/20 mt-1 pr-10"
                    placeholder="Enter your password"
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/70 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-500/20 border border-red-500/30 rounded-lg p-3"
                >
                  <div className="text-red-200 text-sm">{error}</div>
                </motion.div>
              )}
              
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Signing in...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Sign in to Admin
                  </>
                )}
              </Button>
            </form>
            
            {/* Demo Credentials */}
            <div className="bg-white/5 rounded-lg p-4 mt-6 border border-white/10">
              <h3 className="text-white/90 font-medium text-sm mb-2">Demo Credentials:</h3>
              <div className="space-y-1 text-xs">
                <div className="text-white/70">
                  <span className="font-medium">Email:</span> admin@eagleminds.com
                </div>
                <div className="text-white/70">
                  <span className="font-medium">Password:</span> admin123
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}