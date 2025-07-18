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

### Error: "DATABASE_URL references Secret database_url, which does not exist"
- Make sure you set DATABASE_URL as an environment variable in Vercel dashboard, not as a secret
- Remove the old vercel.json with @database_url references

### Error: "Can't reach database server"
- Check your DATABASE_URL format
- Ensure database allows connections from external IPs
- For Supabase/Railway, make sure you're using the external connection string

### Error: "Authentication callback failed"
- Make sure NEXTAUTH_URL matches your Vercel domain exactly
- Ensure NEXTAUTH_SECRET is set and not empty