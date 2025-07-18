# 🚀 EagleMinds Next.js Deployment Guide

This guide covers multiple deployment options for the EagleMinds Technologies website.

## 📋 Prerequisites

Before deploying, ensure you have:
- Node.js 18+ installed
- Git repository set up
- Environment variables configured
- Database setup completed

## 🌟 Deployment Options

### Option 1: Vercel (Recommended)

Vercel is the optimal choice for Next.js applications with full SSR support.

#### 1. Install Vercel CLI
```bash
npm install -g vercel
```

#### 2. Login to Vercel
```bash
vercel login
```

#### 3. Deploy
```bash
npm run deploy:vercel
```

#### 4. Environment Variables
Set these in Vercel dashboard:
- `DATABASE_URL`: Your database connection string
- `NEXTAUTH_SECRET`: Random secret for NextAuth.js
- `NEXTAUTH_URL`: Your deployment URL (e.g., https://your-app.vercel.app)

### Option 2: Cloudflare Pages

For static generation deployment (limited server-side features).

#### 1. Build for Cloudflare
```bash
npm run build:cloudflare
```

#### 2. Deploy to Cloudflare Pages
```bash
npm run deploy:cloudflare
```

#### 3. Manual Cloudflare Pages Setup
1. Go to [Cloudflare Pages](https://pages.cloudflare.com/)
2. Connect your GitHub repository
3. Set build command: `DEPLOY_TARGET=cloudflare npm run build`
4. Set build output directory: `out`
5. Add environment variables in Cloudflare dashboard

### Option 3: Netlify

#### 1. Create netlify.toml
```toml
[build]
  publish = "out"
  command = "DEPLOY_TARGET=netlify npm run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

#### 2. Deploy
Connect your GitHub repository in Netlify dashboard.

## 🗄️ Database Configuration

### For Production Deployment

#### PostgreSQL (Recommended)
```bash
# Install PostgreSQL adapter
npm install @prisma/client prisma postgresql

# Update DATABASE_URL in .env
DATABASE_URL="postgresql://username:password@host:port/database"

# Push schema to production database
npx prisma db push

# Seed the database
npm run db:seed
```

#### SQLite (Development)
The current setup uses SQLite which works for development but isn't recommended for production.

## 🔐 Environment Variables

Create these environment variables in your deployment platform:

### Required Variables
```env
# Database
DATABASE_URL="your-database-connection-string"

# Authentication
NEXTAUTH_SECRET="your-random-secret-key"
NEXTAUTH_URL="your-deployment-url"

# Optional: Email Configuration
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASSWORD="your-app-password"
```

## 🛠️ Build Commands by Platform

| Platform | Build Command | Output Directory |
|----------|---------------|------------------|
| Vercel | `npm run build` | `.next` |
| Cloudflare Pages | `DEPLOY_TARGET=cloudflare npm run build` | `out` |
| Netlify | `DEPLOY_TARGET=netlify npm run build` | `out` |

## 📊 Admin Setup

After deployment:

1. Create admin user in database:
```sql
INSERT INTO User (id, email, name, role, password, createdAt, updatedAt) 
VALUES (
  'admin-id', 
  'admin@eagleminds.net', 
  'Admin User', 
  'ADMIN', 
  '$2a$12$hashedpassword', 
  datetime('now'), 
  datetime('now')
);
```

2. Access admin panel at: `your-domain.com/admin/login`

## 🔍 Troubleshooting

### Build Errors
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Database Issues
```bash
# Reset and push schema
npx prisma db push --force-reset
npm run db:seed
```

### Environment Variable Issues
- Ensure all required variables are set
- Check variable names match exactly
- Restart deployment after adding variables

## 📱 Performance Optimizations

### Image Optimization
- Images are configured for Cloudinary
- Domains whitelisted: `res.cloudinary.com`, `eagleminds.net`

### Caching
- Static assets cached automatically
- API routes have appropriate cache headers

### Bundle Size
- Tree shaking enabled
- Unused dependencies removed
- Code splitting implemented

## 🔒 Security Considerations

- NextAuth.js for secure authentication
- CSRF protection enabled
- Input validation with Zod
- SQL injection protection via Prisma
- XSS protection with React

## 📈 Monitoring

### Analytics
- Google Analytics ready (configure GA_TRACKING_ID)
- Performance monitoring via Vercel Analytics

### Error Tracking
- Consider adding Sentry for error tracking
- Console errors logged for debugging

## 🆙 Updates

### Updating the Application
```bash
git pull origin main
npm install
npm run build
npm run deploy:vercel  # or your chosen platform
```

### Database Migrations
```bash
npx prisma migrate dev  # for development
npx prisma migrate deploy  # for production
```

---

## 🎯 Quick Deployment Checklist

- [ ] Environment variables configured
- [ ] Database set up and accessible
- [ ] Build completes successfully
- [ ] Admin user created
- [ ] SSL certificate configured
- [ ] Custom domain set up (if applicable)
- [ ] Analytics configured
- [ ] Error monitoring set up

For support or questions, contact the development team or check the repository issues.