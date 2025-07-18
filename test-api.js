const { PrismaClient } = require('@prisma/client');

async function testDashboardAPI() {
  const prisma = new PrismaClient();
  
  try {
    console.log('🔍 Testing dashboard API logic...');
    
    // Simulate the dashboard API queries
    const [
      totalPages,
      totalServices,
      totalLeads,
      newLeads,
      publishedServices,
      convertedLeads
    ] = await Promise.all([
      prisma.page.count(),
      prisma.service.count(),
      prisma.lead.count(),
      prisma.lead.count({ where: { status: "NEW" } }),
      prisma.service.count({ where: { status: "PUBLISHED" } }),
      prisma.lead.count({ where: { status: "CONVERTED" } })
    ]);

    console.log('📊 Dashboard Stats:');
    console.log(`   Total Pages: ${totalPages}`);
    console.log(`   Total Services: ${totalServices}`);
    console.log(`   Total Leads: ${totalLeads}`);
    console.log(`   New Leads: ${newLeads}`);
    console.log(`   Published Services: ${publishedServices}`);
    console.log(`   Converted Leads: ${convertedLeads}`);

    // Calculate conversion rate
    const conversionRate = totalLeads > 0 ? Math.round((convertedLeads / totalLeads) * 100) : 0;
    console.log(`   Conversion Rate: ${conversionRate}%`);

    // Get recent activity (leads created in last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const recentLeads = await prisma.lead.count({
      where: {
        createdAt: {
          gte: sevenDaysAgo
        }
      }
    });
    
    console.log(`   Recent Leads (7 days): ${recentLeads}`);
    console.log('✅ Dashboard API logic test passed!');
    
  } catch (error) {
    console.error('❌ Dashboard API test error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testDashboardAPI();