import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Hash the password for the admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);

  // Create initial admin user
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@eagleminds.com' },
    update: {},
    create: {
      email: 'admin@eagleminds.com',
      name: 'Admin User',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  console.log('✅ Admin user created:', adminUser.email);

  // Create sample services
  const services = [
    {
      name: 'Web Development',
      slug: 'web-development',
      description: 'Custom web applications and websites built with modern technologies',
      features: ['Responsive Design', 'Modern Frontend', 'Backend APIs', 'Database Integration'],
      pricing: { price: 5000, currency: 'USD' },
      status: 'PUBLISHED',
    },
    {
      name: 'Mobile Development',
      slug: 'mobile-development',
      description: 'Native and cross-platform mobile applications for iOS and Android',
      features: ['Native iOS/Android', 'Cross-platform', 'App Store Deployment', 'Push Notifications'],
      pricing: { price: 8000, currency: 'USD' },
      status: 'PUBLISHED',
    },
    {
      name: 'Cloud Solutions',
      slug: 'cloud-solutions',
      description: 'Cloud infrastructure, migration, and DevOps services',
      features: ['AWS/Azure/GCP', 'Cloud Migration', 'CI/CD Pipelines', '24/7 Monitoring'],
      pricing: { price: 3000, currency: 'USD' },
      status: 'PUBLISHED',
    },
    {
      name: 'AI & Machine Learning',
      slug: 'ai-machine-learning',
      description: 'Custom AI solutions and machine learning model development',
      features: ['Custom AI Models', 'Data Analysis', 'Automation', 'Predictive Analytics'],
      pricing: { price: 12000, currency: 'USD' },
      status: 'PUBLISHED',
    },
    {
      name: 'Digital Marketing',
      slug: 'digital-marketing',
      description: 'Complete digital marketing strategies and campaign management',
      features: ['SEO Optimization', 'Social Media Marketing', 'PPC Campaigns', 'Analytics'],
      pricing: { price: 2000, currency: 'USD' },
      status: 'PUBLISHED',
    },
    {
      name: 'Consulting Services',
      slug: 'consulting-services',
      description: 'Technology consulting and strategic planning services',
      features: ['Technology Strategy', 'Architecture Review', 'Performance Optimization', 'Security Audit'],
      pricing: { price: 1500, currency: 'USD' },
      status: 'PUBLISHED',
    },
  ];

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: {},
      create: service,
    });
  }

  console.log('✅ Services created successfully');

  // Create sample pages
  const pages = [
    {
      title: 'Home',
      slug: 'home',
      content: 'Welcome to EagleMinds Technologies - Your trusted partner in digital transformation.',
      status: 'PUBLISHED',
      metaTitle: 'EagleMinds Technologies - Digital Transformation Partners',
      metaDesc: 'Transform your business with cutting-edge technology solutions from EagleMinds.',
      authorId: adminUser.id,
    },
    {
      title: 'About Us',
      slug: 'about',
      content: 'EagleMinds Technologies is a leading technology company specializing in innovative solutions.',
      status: 'PUBLISHED',
      metaTitle: 'About EagleMinds Technologies',
      metaDesc: 'Learn about our mission, vision, and the team behind EagleMinds Technologies.',
      authorId: adminUser.id,
    },
    {
      title: 'Services',
      slug: 'services',
      content: 'Discover our comprehensive range of technology services and solutions.',
      status: 'PUBLISHED',
      metaTitle: 'Our Services - EagleMinds Technologies',
      metaDesc: 'Explore our web development, mobile apps, cloud solutions, and AI services.',
      authorId: adminUser.id,
    },
    {
      title: 'Contact',
      slug: 'contact',
      content: 'Get in touch with our team to discuss your next project.',
      status: 'PUBLISHED',
      metaTitle: 'Contact EagleMinds Technologies',
      metaDesc: 'Contact us for a consultation about your technology needs.',
      authorId: adminUser.id,
    },
  ];

  for (const page of pages) {
    await prisma.page.upsert({
      where: { slug: page.slug },
      update: {},
      create: page,
    });
  }

  console.log('✅ Pages created successfully');

  // Create sample leads
  const leads = [
    {
      name: 'John Smith',
      email: 'john.smith@example.com',
      phone: '+1-555-0123',
      service: 'Web Development',
      message: 'I need a new website for my business. Looking for modern design and e-commerce functionality.',
      status: 'NEW',
      source: 'WEBSITE',
    },
    {
      name: 'Sarah Johnson',
      email: 'sarah.johnson@company.com',
      phone: '+1-555-0456',
      service: 'Mobile Development',
      message: 'We need a mobile app for our retail business. Both iOS and Android platforms.',
      status: 'CONTACTED',
      source: 'REFERRAL',
    },
    {
      name: 'Mike Chen',
      email: 'mike.chen@startup.com',
      phone: '+1-555-0789',
      service: 'Cloud Solutions',
      message: 'Looking to migrate our infrastructure to the cloud. Need consultation on AWS services.',
      status: 'QUALIFIED',
      source: 'SOCIAL_MEDIA',
    },
  ];

  for (const lead of leads) {
    await prisma.lead.create({
      data: lead,
    });
  }

  console.log('✅ Sample leads created successfully');

  console.log('\n🎉 Database seeding completed!');
  console.log('\n📝 Admin Login Credentials:');
  console.log('Email: admin@eagleminds.com');
  console.log('Password: admin123');
  console.log('\n🌐 Admin Panel: http://localhost:3000/admin/login');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });