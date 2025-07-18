const { PrismaClient } = require('@prisma/client');

async function testDatabase() {
  const prisma = new PrismaClient();
  
  try {
    console.log('🔍 Testing database connection...');
    
    // Test basic connection
    await prisma.$connect();
    console.log('✅ Database connected successfully');
    
    // Test basic query
    const userCount = await prisma.user.count();
    console.log(`✅ User count: ${userCount}`);
    
    const leadCount = await prisma.lead.count();
    console.log(`✅ Lead count: ${leadCount}`);
    
    const serviceCount = await prisma.service.count();
    console.log(`✅ Service count: ${serviceCount}`);
    
    const pageCount = await prisma.page.count();
    console.log(`✅ Page count: ${pageCount}`);
    
    console.log('✅ All database tests passed!');
    
  } catch (error) {
    console.error('❌ Database error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testDatabase();