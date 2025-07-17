"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    
    if (!session) {
      router.push("/admin/login");
      return;
    }

    const userRole = session.user?.role;
    if (!userRole || (userRole !== "ADMIN" && userRole !== "CONTENT_MANAGER")) {
      router.push("/admin/login");
    }
  }, [session, status, router]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return null;
  }

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: "/" });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Admin Dashboard
          </h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              Welcome, {session.user?.name || session.user?.email}
            </span>
            <Button onClick={handleLogout} variant="outline">
              Logout
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Pages</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
                <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 text-sm">📄</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Services</p>
                  <p className="text-2xl font-bold">6</p>
                </div>
                <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-sm">⚙️</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">New Leads</p>
                  <p className="text-2xl font-bold">8</p>
                </div>
                <div className="h-8 w-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <span className="text-yellow-600 text-sm">👥</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                  <p className="text-2xl font-bold">24%</p>
                </div>
                <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 text-sm">📈</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Management Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                📄 Pages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Manage website pages and content
              </p>
              <div className="space-y-2">
                <Button
                  onClick={() => router.push("/admin/pages")}
                  className="w-full"
                  size="sm"
                >
                  Manage Pages
                </Button>
                <div className="text-xs text-gray-500">
                  12 pages • 8 published
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                ⚙️ Services
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Configure services and offerings
              </p>
              <div className="space-y-2">
                <Button
                  onClick={() => router.push("/admin/services")}
                  className="w-full"
                  size="sm"
                >
                  Manage Services
                </Button>
                <div className="text-xs text-gray-500">
                  6 services • 6 active
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                👥 Leads
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                View and manage customer leads
              </p>
              <div className="space-y-2">
                <Button
                  onClick={() => router.push("/admin/leads")}
                  className="w-full"
                  size="sm"
                >
                  View Leads
                </Button>
                <div className="text-xs text-gray-500">
                  8 new • 24% conversion
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                ⚙️ Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Configure system settings
              </p>
              <div className="space-y-2">
                <Button
                  onClick={() => router.push("/admin/settings")}
                  className="w-full"
                  size="sm"
                >
                  Settings
                </Button>
                <div className="text-xs text-gray-500">
                  System configuration
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 text-sm">👥</span>
                    </div>
                    <div>
                      <p className="font-medium">New lead from John Smith</p>
                      <p className="text-sm text-gray-600">Web Development inquiry</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">2 hours ago</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 text-sm">📄</span>
                    </div>
                    <div>
                      <p className="font-medium">Page "About Us" updated</p>
                      <p className="text-sm text-gray-600">Content changes published</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">5 hours ago</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                      <span className="text-yellow-600 text-sm">⚙️</span>
                    </div>
                    <div>
                      <p className="font-medium">New service "Cloud Migration" added</p>
                      <p className="text-sm text-gray-600">Service published to website</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">1 day ago</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}