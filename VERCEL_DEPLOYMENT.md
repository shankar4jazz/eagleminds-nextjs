# Vercel Deployment Guide

## Prerequisites

1. Create a PostgreSQL database (recommended: Vercel Postgres, Supabase, or Railway)
2. Have your Vercel account ready

## Step 1: Set Up Environment Variables in Vercel

Go to your Vercel dashboard → Project → Settings → Environment Variables and add:

### Required Variables:

```
DATABASE_URL = postgresql://username:password@hostname:port/database?sslmode=require
NEXTAUTH_URL = https://your-domain.vercel.app
NEXTAUTH_SECRET = your-super-secure-random-string-here
```

### How to get DATABASE_URL:

#### Option A: Vercel Postgres (Recommended)
1. Go to Vercel Dashboard → Storage → Create Database → Postgres
2. Copy the connection string from the `.env.local` tab

#### Option B: Supabase
1. Create project at https://supabase.com
2. Go to Settings → Database → Connection string
3. Replace `[YOUR-PASSWORD]` with your actual password

#### Option C: Railway
1. Create project at https://railway.app
2. Add PostgreSQL service
3. Copy connection string from Variables tab

## Step 2: Generate NEXTAUTH_SECRET

Run this command to generate a secure secret:
```bash
openssl rand -base64 32
```

## Step 3: Deploy

1. Push your code to GitHub
2. Connect repository to Vercel
3. Vercel will automatically deploy

## Step 4: Initialize Database

After first deployment, run these commands in Vercel Functions or locally:

```bash
# Generate Prisma client
npx prisma generate

# Push database schema
npx prisma db push

# (Optional) Seed initial data
npx prisma db seed
```

## Troubleshooting

### Error: "Server error - There is a problem with the server configuration"
This usually means environment variables are missing or database isn't accessible.

**Quick Fix Steps:**
1. Check `/api/debug` endpoint to see which environment variables are missing
2. Check `/api/health` endpoint to test database connection
3. Ensure all required environment variables are set in Vercel dashboard

### Error: "DATABASE_URL references Secret database_url, which does not exist"
- Make sure you set DATABASE_URL as an environment variable in Vercel dashboard, not as a secret
- Remove the old vercel.json with @database_url references

### Error: "Can't reach database server"
- Check your DATABASE_URL format
- Ensure database allows connections from external IPs
- For Supabase/Railway, make sure you're using the external connection string
- Run `npx prisma db push` to initialize the database schema

### Error: "Authentication callback failed"
- Make sure NEXTAUTH_URL matches your Vercel domain exactly
- Ensure NEXTAUTH_SECRET is set and not empty
- Generate NEXTAUTH_SECRET with: `openssl rand -base64 32`

### Missing Database Schema
If database exists but tables are missing:
```bash
# In Vercel dashboard, go to Functions tab and run:
npx prisma db push
```

### Debug Endpoints
- `/api/debug` - Check environment variables
- `/api/health` - Test database connection
- `/api/auth/providers` - Check NextAuth configuration