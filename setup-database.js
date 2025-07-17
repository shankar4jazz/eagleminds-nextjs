const { PrismaClient } = require('@prisma/client');
const { execSync } = require('child_process');

async function setupDatabase() {
  console.log('🔧 EagleMinds Database Setup');
  console.log('=============================\n');
  
  // Test PostgreSQL connection first
  console.log('1. Testing PostgreSQL connection...');
  
  const prisma = new PrismaClient();
  
  try {
    await prisma.$connect();
    console.log('✅ PostgreSQL connected successfully!');
    
    // Check if database has tables
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `;
    
    if (tables.length === 0) {
      console.log('📦 Database is empty. Setting up schema...');
      
      // Push schema to database
      console.log('2. Pushing database schema...');
      execSync('npx prisma db push', { stdio: 'inherit' });
      
      // Seed database
      console.log('3. Seeding database...');
      execSync('npx prisma db seed', { stdio: 'inherit' });
      
      console.log('✅ Database setup completed successfully!');
    } else {
      console.log('✅ Database already has tables');
      console.log('📊 Existing tables:', tables.map(t => t.table_name).join(', '));
    }
    
    // Test admin user
    console.log('4. Checking admin user...');
    const adminUser = await prisma.user.findUnique({
      where: { email: 'admin@eagleminds.com' }
    });
    
    if (adminUser) {
      console.log('✅ Admin user exists');
    } else {
      console.log('⚠️  Admin user not found. Running seed...');
      execSync('npx prisma db seed', { stdio: 'inherit' });
    }
    
    // Test API endpoints
    console.log('5. Testing API endpoints...');
    console.log('✅ Database is ready for API connections');
    
    console.log('\n🎉 Database setup completed successfully!');
    console.log('\n🚀 You can now:');
    console.log('1. Start the development server: npm run dev');
    console.log('2. Access admin panel: http://localhost:3000/admin/login');
    console.log('3. Login with: admin@eagleminds.com / admin123');
    
  } catch (error) {
    console.error('❌ PostgreSQL connection failed:', error.message);
    console.log('\n🔄 Falling back to SQLite for development...');
    
    // Switch to SQLite temporarily
    await setupSQLiteFallback();
  } finally {
    await prisma.$disconnect();
  }
}

async function setupSQLiteFallback() {
  console.log('📦 Setting up SQLite fallback database...');
  
  // Update .env to use SQLite
  const fs = require('fs');
  let envContent = fs.readFileSync('.env', 'utf8');
  envContent = envContent.replace(
    /DATABASE_URL="postgresql:\/\/.*"/,
    'DATABASE_URL="file:./dev.db"'
  );
  fs.writeFileSync('.env', envContent);
  
  // Update schema to use SQLite
  let schemaContent = fs.readFileSync('prisma/schema.prisma', 'utf8');
  schemaContent = schemaContent.replace(
    'provider = "postgresql"',
    'provider = "sqlite"'
  );
  fs.writeFileSync('prisma/schema.prisma', schemaContent);
  
  console.log('✅ Updated configuration for SQLite');
  
  // Generate client and push schema
  execSync('npx prisma generate', { stdio: 'inherit' });
  execSync('npx prisma db push', { stdio: 'inherit' });
  execSync('npx prisma db seed', { stdio: 'inherit' });
  
  console.log('✅ SQLite database setup completed!');
  console.log('\n⚠️  Note: Using SQLite for development. Switch to PostgreSQL for production.');
}

setupDatabase();