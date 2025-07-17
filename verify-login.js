const { execSync } = require('child_process');

console.log('🔧 EagleMinds Login System Verification');
console.log('=====================================\n');

// Check if development server is running
console.log('1. Checking development server...');
try {
  const response = execSync('curl -s -o /dev/null -w "%{http_code}" http://localhost:3004', { encoding: 'utf8' });
  if (response.trim() === '200') {
    console.log('✅ Development server is running on http://localhost:3004');
  } else {
    console.log('❌ Development server is not responding properly');
  }
} catch (error) {
  console.log('❌ Development server is not running or curl is not available');
}

// Check login page
console.log('\n2. Checking login page...');
try {
  const response = execSync('curl -s -o /dev/null -w "%{http_code}" http://localhost:3004/admin/login', { encoding: 'utf8' });
  if (response.trim() === '200') {
    console.log('✅ Login page is accessible');
  } else {
    console.log('❌ Login page is not accessible');
  }
} catch (error) {
  console.log('❌ Cannot access login page');
}

// Check database connection
console.log('\n3. Checking database connection...');
try {
  const { PrismaClient } = require('@prisma/client');
  const prisma = new PrismaClient();
  
  prisma.$connect().then(async () => {
    const userCount = await prisma.user.count();
    console.log(`✅ Database connected successfully (${userCount} users)`);
    
    const adminUser = await prisma.user.findUnique({
      where: { email: 'admin@eagleminds.com' }
    });
    
    if (adminUser) {
      console.log('✅ Admin user exists');
    } else {
      console.log('❌ Admin user not found');
    }
    
    await prisma.$disconnect();
  }).catch(error => {
    console.log('❌ Database connection failed:', error.message);
  });
} catch (error) {
  console.log('❌ Database check failed:', error.message);
}

console.log('\n📋 Login Instructions:');
console.log('1. Open http://localhost:3004/admin/login in your browser');
console.log('2. Enter credentials:');
console.log('   Email: admin@eagleminds.com');
console.log('   Password: admin123');
console.log('3. Click "Sign in to Admin"');
console.log('4. You should be redirected to the admin dashboard');
console.log('\n🐛 If login fails, check the browser console for error messages');