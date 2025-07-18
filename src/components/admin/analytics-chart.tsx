"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, TrendingDown } from "lucide-react";
import { motion } from "framer-motion";

interface AnalyticsData {
  label: string;
  value: number;
  change: number;
  changeType: 'up' | 'down';
}

interface AnalyticsChartProps {
  title: string;
  data: AnalyticsData[];
  timeRange?: string;
}

export function AnalyticsChart({ title, data, timeRange = "Last 7 days" }: AnalyticsChartProps) {
  const maxValue = Math.max(...data.map(d => d.value));
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5 text-blue-600" />
            <span>{title}</span>
          </div>
          <span className="text-sm text-gray-500">{timeRange}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center justify-between"
            >
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-900">{item.label}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold">{item.value.toLocaleString()}</span>
                    <div className={`flex items-center text-sm ${
                      item.changeType === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {item.changeType === 'up' ? (
                        <TrendingUp className="h-3 w-3 mr-1" />
                      ) : (
                        <TrendingDown className="h-3 w-3 mr-1" />
                      )}
                      {Math.abs(item.change)}%
                    </div>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(item.value / maxValue) * 100}%` }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}