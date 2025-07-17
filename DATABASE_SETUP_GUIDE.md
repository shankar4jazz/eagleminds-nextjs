# PostgreSQL Database Setup Guide

## 🔧 Current Connection Issue

**Error**: `password authentication failed for user "postgres"`
**Error Code**: `28P01`

## 🔍 Troubleshooting Steps

### 1. Verify PostgreSQL Server Status
```bash
# Check if PostgreSQL is running
sudo systemctl status postgresql

# Check PostgreSQL version
psql --version
```

### 2. Check PostgreSQL Configuration

#### A. Check pg_hba.conf
Location: `/etc/postgresql/[version]/main/pg_hba.conf`

Should contain:
```
# TYPE  DATABASE        USER            ADDRESS                 METHOD
local   all             postgres                                peer
host    all             postgres        127.0.0.1/32            md5
host    all             postgres        ::1/128                 md5
host    all             all             0.0.0.0/0               md5
```

#### B. Check postgresql.conf
Location: `/etc/postgresql/[version]/main/postgresql.conf`

Should contain:
```
listen_addresses = '*'
port = 5432
```

### 3. Reset PostgreSQL Password
```bash
# Switch to postgres user
sudo -u postgres psql

# Reset password
ALTER USER postgres PASSWORD 'Eagelminds@123';

# Create database
CREATE DATABASE eagleminds;

# Grant privileges
GRANT ALL PRIVILEGES ON DATABASE eagleminds TO postgres;

# Exit
\q
```

### 4. Alternative: Create New User
```bash
# Connect as postgres
sudo -u postgres psql

# Create new user
CREATE USER eagleminds WITH PASSWORD 'Eagelminds@123';

# Create database
CREATE DATABASE eagleminds OWNER eagleminds;

# Grant privileges
GRANT ALL PRIVILEGES ON DATABASE eagleminds TO eagleminds;

# Exit
\q
```

### 5. Test Connection Manually
```bash
# Test local connection
psql -U postgres -h 139.84.133.107 -p 5432 -d postgres

# Test with new user
psql -U eagleminds -h 139.84.133.107 -p 5432 -d eagleminds
```

## 🔄 After Fixing Server Configuration

Once the PostgreSQL server is properly configured, update the connection string:

### Option 1: Using postgres user
```
DATABASE_URL="postgresql://postgres:Eagelminds@123@139.84.133.107:5432/eagleminds"
```

### Option 2: Using dedicated user
```
DATABASE_URL="postgresql://eagleminds:Eagelminds@123@139.84.133.107:5432/eagleminds"
```

## 🚀 Next Steps After Database is Ready

1. **Update Environment Variables**
```bash
# Update .env file
DATABASE_URL="postgresql://postgres:Eagelminds@123@139.84.133.107:5432/eagleminds"
```

2. **Generate Prisma Client**
```bash
npx prisma generate
```

3. **Push Database Schema**
```bash
npx prisma db push
```

4. **Seed Database**
```bash
npx prisma db seed
```

5. **Test Application**
```bash
npm run dev
```

## 📞 Common Issues and Solutions

### Issue: "Connection Refused"
- Check if PostgreSQL is running
- Verify port 5432 is open
- Check firewall settings

### Issue: "Authentication Failed"
- Verify password is correct
- Check pg_hba.conf configuration
- Ensure user exists

### Issue: "Database Does Not Exist"
- Create database manually
- Check database name spelling
- Verify user has access

## 🔧 Database Setup Commands

Run these commands on your PostgreSQL server:

```sql
-- Connect as superuser
sudo -u postgres psql

-- Create database
CREATE DATABASE eagleminds;

-- Verify database exists
\l

-- Connect to database
\c eagleminds

-- Create tables (or use Prisma)
-- (Tables will be created by Prisma)

-- Exit
\q
```