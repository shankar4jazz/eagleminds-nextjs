"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AdminLayout } from "@/components/admin/admin-layout";
import { 
  TrendingUp, 
  Users, 
  FileText, 
  Settings, 
  Activity,
  Eye,
  BarChart3,
  Clock
} from "lucide-react";
import { motion } from "framer-motion";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalPages: 0,
    activeServices: 0,
    newLeads: 0,
    conversionRate: 0
  });

  useEffect(() => {
    // Fetch real stats from API
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // This would be actual API calls
      setStats({
        totalPages: 12,
        activeServices: 6,
        newLeads: 8,
        conversionRate: 24
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const statCards = [
    {
      title: "Total Pages",
      value: stats.totalPages,
      icon: FileText,
      color: "blue",
      change: "+12%",
      trend: "up"
    },
    {
      title: "Active Services", 
      value: stats.activeServices,
      icon: Settings,
      color: "green",
      change: "+5%",
      trend: "up"
    },
    {
      title: "New Leads",
      value: stats.newLeads,
      icon: Users,
      color: "yellow",
      change: "+18%",
      trend: "up"
    },
    {
      title: "Conversion Rate",
      value: `${stats.conversionRate}%`,
      icon: TrendingUp,
      color: "purple",
      change: "+3%",
      trend: "up"
    }
  ];

  const quickActions = [
    {
      title: "Manage Pages",
      description: "Create, edit, and organize website pages",
      icon: FileText,
      href: "/admin/pages",
      color: "blue"
    },
    {
      title: "Manage Services",
      description: "Configure services and offerings",
      icon: Settings,
      href: "/admin/services", 
      color: "green"
    },
    {
      title: "View Leads",
      description: "Monitor and manage customer leads",
      icon: Users,
      href: "/admin/leads",
      color: "yellow"
    },
    {
      title: "System Settings",
      description: "Configure system preferences",
      icon: Settings,
      href: "/admin/settings",
      color: "purple"
    }
  ];

  return (
    <AdminLayout title="Dashboard">
      <div className="space-y-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back!</h1>
              <p className="text-blue-100">
                Here's what's happening with your website today.
              </p>
            </div>
            <div className="hidden md:block">
              <BarChart3 className="h-16 w-16 text-blue-200" />
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">
                        {card.title}
                      </p>
                      <p className="text-3xl font-bold text-gray-900">
                        {card.value}
                      </p>
                      <div className="flex items-center mt-2">
                        <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                        <span className="text-sm text-green-600 font-medium">
                          {card.change}
                        </span>
                        <span className="text-sm text-gray-500 ml-1">
                          from last month
                        </span>
                      </div>
                    </div>
                    <div className={`h-12 w-12 bg-${card.color}-100 rounded-full flex items-center justify-center`}>
                      <card.icon className={`h-6 w-6 text-${card.color}-600`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action, index) => (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-all hover:scale-105">
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`h-10 w-10 bg-${action.color}-100 rounded-lg flex items-center justify-center`}>
                      <action.icon className={`h-5 w-5 text-${action.color}-600`} />
                    </div>
                    <CardTitle className="text-lg">{action.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    {action.description}
                  </p>
                  <Button 
                    className="w-full"
                    onClick={() => window.location.href = action.href}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Open
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5" />
                <span>Recent Activity</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    action: "New lead from John Smith",
                    description: "Web Development inquiry",
                    time: "2 hours ago",
                    icon: Users,
                    color: "blue"
                  },
                  {
                    action: "Page 'About Us' updated",
                    description: "Content changes published",
                    time: "5 hours ago",
                    icon: FileText,
                    color: "green"
                  },
                  {
                    action: "New service 'Cloud Migration' added",
                    description: "Service published to website",
                    time: "1 day ago",
                    icon: Settings,
                    color: "yellow"
                  }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                    <div className="flex items-center space-x-3">
                      <div className={`h-10 w-10 bg-${activity.color}-100 rounded-full flex items-center justify-center`}>
                        <activity.icon className={`h-5 w-5 text-${activity.color}-600`} />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{activity.action}</p>
                        <p className="text-sm text-gray-600">{activity.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      {activity.time}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </AdminLayout>
  );
}

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