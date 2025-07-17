const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testDatabaseConnection() {
  console.log('🔌 Testing database connection...');
  
  try {
    await prisma.$connect();
    console.log('✅ Database connected successfully!');
    
    // Test basic query
    const result = await prisma.$queryRaw`SELECT version()`;
    console.log('✅ Database version:', result[0].version.substring(0, 50) + '...');
    
    console.log('\n🚀 Ready to push schema and seed database!');
    console.log('Run these commands:');
    console.log('1. npx prisma db push');
    console.log('2. npx prisma db seed');
    console.log('3. npm run dev');
    
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    console.error('\n🔧 Please complete the PostgreSQL server setup first:');
    console.error('1. Follow the instructions in POSTGRESQL_SETUP_COMMANDS.md');
    console.error('2. Ensure the database "eagleminds" exists');
    console.error('3. Verify remote connections are allowed');
    return false;
  } finally {
    await prisma.$disconnect();
  }
}

testDatabaseConnection();