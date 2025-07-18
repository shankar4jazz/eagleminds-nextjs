import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !["ADMIN", "CONTENT_MANAGER"].includes(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get real statistics from database
    const [
      totalPages,
      totalServices,
      totalLeads,
      newLeads,
      publishedServices,
      convertedLeads
    ] = await Promise.all([
      db.page.count(),
      db.service.count(),
      db.lead.count(),
      db.lead.count({ where: { status: "NEW" } }),
      db.service.count({ where: { status: "PUBLISHED" } }),
      db.lead.count({ where: { status: "CONVERTED" } })
    ]);

    // Calculate conversion rate
    const conversionRate = totalLeads > 0 ? Math.round((convertedLeads / totalLeads) * 100) : 0;

    // Get recent activity (leads created in last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const recentLeads = await db.lead.count({
      where: {
        createdAt: {
          gte: sevenDaysAgo
        }
      }
    });

    const stats = {
      totalPages,
      activeServices: publishedServices,
      newLeads,
      conversionRate,
      totalViews: Math.floor(Math.random() * 2000) + 1000, // Simulated for now
      activeUsers: Math.floor(Math.random() * 50) + 20, // Simulated for now
      totalServices,
      totalLeads,
      convertedLeads,
      recentLeads
    };

    return NextResponse.json({ stats });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard stats" },
      { status: 500 }
    );
  }
}