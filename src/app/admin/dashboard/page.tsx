"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AdminLayout } from "@/components/admin/admin-layout";
import { AnalyticsChart } from "@/components/admin/analytics-chart";
import {
  TrendingUp,
  Users,
  FileText,
  Settings,
  Activity,
  Eye,
  BarChart3,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  RefreshCw
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState({
    totalPages: 0,
    activeServices: 0,
    newLeads: 0,
    conversionRate: 0,
    totalViews: 0,
    activeUsers: 0
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setIsLoading(true);
      
      const response = await fetch('/api/admin/dashboard');
      
      if (!response.ok) {
        throw new Error('Failed to fetch dashboard stats');
      }
      
      const data = await response.json();
      setStats(data.stats);
    } catch (error) {
      console.error('Error fetching stats:', error);
      // Fallback to default values on error
      setStats({
        totalPages: 0,
        activeServices: 0,
        newLeads: 0,
        conversionRate: 0,
        totalViews: 0,
        activeUsers: 0
      });
    } finally {
      setIsLoading(false);
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

  const analyticsData = [
    { label: "Page Views", value: 1247, change: 12, changeType: "up" as const },
    { label: "Unique Visitors", value: 934, change: 8, changeType: "up" as const },
    { label: "Contact Forms", value: 23, change: 15, changeType: "up" as const },
    { label: "Service Requests", value: 8, change: 3, changeType: "down" as const },
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
                    <div className={`h-12 w-12 rounded-full flex items-center justify-center ${
                      card.color === 'blue' ? 'bg-blue-100' :
                      card.color === 'green' ? 'bg-green-100' :
                      card.color === 'yellow' ? 'bg-yellow-100' :
                      'bg-purple-100'
                    }`}>
                      <card.icon className={`h-6 w-6 ${
                        card.color === 'blue' ? 'text-blue-600' :
                        card.color === 'green' ? 'text-green-600' :
                        card.color === 'yellow' ? 'text-yellow-600' :
                        'text-purple-600'
                      }`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Analytics Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <AnalyticsChart
            title="Website Analytics"
            data={analyticsData}
            timeRange="Last 30 days"
          />
        </motion.div>

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
                    <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                      action.color === 'blue' ? 'bg-blue-100' :
                      action.color === 'green' ? 'bg-green-100' :
                      action.color === 'yellow' ? 'bg-yellow-100' :
                      'bg-purple-100'
                    }`}>
                      <action.icon className={`h-5 w-5 ${
                        action.color === 'blue' ? 'text-blue-600' :
                        action.color === 'green' ? 'text-green-600' :
                        action.color === 'yellow' ? 'text-yellow-600' :
                        'text-purple-600'
                      }`} />
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
                    onClick={() => router.push(action.href)}
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
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                        activity.color === 'blue' ? 'bg-blue-100' :
                        activity.color === 'green' ? 'bg-green-100' :
                        activity.color === 'yellow' ? 'bg-yellow-100' :
                        'bg-purple-100'
                      }`}>
                        <activity.icon className={`h-5 w-5 ${
                          activity.color === 'blue' ? 'text-blue-600' :
                          activity.color === 'green' ? 'text-green-600' :
                          activity.color === 'yellow' ? 'text-yellow-600' :
                          'text-purple-600'
                        }`} />
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