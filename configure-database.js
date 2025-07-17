const fs = require('fs');
const { execSync } = require('child_process');
const { PrismaClient } = require('@prisma/client');

async function configureDatabase(dbType = 'auto') {
  console.log('🔧 EagleMinds Database Configuration');
  console.log('=====================================\n');
  
  if (dbType === 'auto') {
    // Try PostgreSQL first, fallback to SQLite
    console.log('🔍 Auto-detecting database...');
    
    try {
      // Test PostgreSQL connection
      await testPostgreSQLConnection();
      dbType = 'postgresql';
      console.log('✅ PostgreSQL detected and working');
    } catch (error) {
      console.log('❌ PostgreSQL not available:', error.message);
      dbType = 'sqlite';
      console.log('🔄 Falling back to SQLite');
    }
  }
  
  if (dbType === 'postgresql') {
    await setupPostgreSQL();
  } else if (dbType === 'sqlite') {
    await setupSQLite();
  }
  
  console.log('\\n🎉 Database configuration completed!');
  console.log('\\n🚀 Ready to start development server:');
  console.log('npm run dev');
}

async function testPostgreSQLConnection() {
  const connectionString = "postgresql://postgres:Eagelminds@123@139.84.133.107:5432/eagleminds";
  
  // Update env temporarily
  const envContent = fs.readFileSync('.env', 'utf8');
  const newEnvContent = envContent.replace(
    /DATABASE_URL=".*"/,
    `DATABASE_URL="${connectionString}"`
  );
  fs.writeFileSync('.env', newEnvContent);
  
  // Update schema
  const schemaContent = fs.readFileSync('prisma/schema.prisma', 'utf8');
  const newSchemaContent = schemaContent.replace(
    /provider = "sqlite"/,
    'provider = "postgresql"'
  );
  fs.writeFileSync('prisma/schema.prisma', newSchemaContent);
  
  // Test connection
  const prisma = new PrismaClient();
  await prisma.$connect();
  await prisma.$disconnect();
}

async function setupPostgreSQL() {
  console.log('📦 Setting up PostgreSQL configuration...');
  
  // Update environment
  const envContent = fs.readFileSync('.env', 'utf8');
  const newEnvContent = envContent.replace(
    /DATABASE_URL=".*"/,
    'DATABASE_URL="postgresql://postgres:Eagelminds@123@139.84.133.107:5432/eagleminds"'
  );
  fs.writeFileSync('.env', newEnvContent);
  
  // Update schema
  const schemaContent = fs.readFileSync('prisma/schema.prisma', 'utf8');
  const newSchemaContent = schemaContent.replace(
    /provider = "sqlite"/,
    'provider = "postgresql"'
  );
  fs.writeFileSync('prisma/schema.prisma', newSchemaContent);
  
  console.log('✅ PostgreSQL configuration updated');
  
  // Generate client and setup database
  execSync('npx prisma generate', { stdio: 'inherit' });
  execSync('npx prisma db push', { stdio: 'inherit' });
  execSync('npx prisma db seed', { stdio: 'inherit' });
  
  console.log('✅ PostgreSQL database setup completed');
}

async function setupSQLite() {
  console.log('📦 Setting up SQLite configuration...');
  
  // Update environment
  const envContent = fs.readFileSync('.env', 'utf8');
  const newEnvContent = envContent.replace(
    /DATABASE_URL=".*"/,
    'DATABASE_URL="file:./dev.db"'
  );
  fs.writeFileSync('.env', newEnvContent);
  
  // Update schema
  const schemaContent = fs.readFileSync('prisma/schema.prisma', 'utf8');
  const newSchemaContent = schemaContent.replace(
    /provider = "postgresql"/,
    'provider = "sqlite"'
  );
  fs.writeFileSync('prisma/schema.prisma', newSchemaContent);
  
  console.log('✅ SQLite configuration updated');
  
  // Generate client and setup database
  execSync('npx prisma generate', { stdio: 'inherit' });
  execSync('npx prisma db push', { stdio: 'inherit' });
  execSync('npx prisma db seed', { stdio: 'inherit' });
  
  console.log('✅ SQLite database setup completed');
}

// Command line usage
const args = process.argv.slice(2);
const dbType = args[0] || 'auto';

if (!['auto', 'postgresql', 'sqlite'].includes(dbType)) {
  console.error('Usage: node configure-database.js [auto|postgresql|sqlite]');
  process.exit(1);
}

configureDatabase(dbType).catch(console.error);