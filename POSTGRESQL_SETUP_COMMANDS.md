# PostgreSQL Database Setup Commands

## 🚨 Current Issue
**Authentication Error**: The PostgreSQL server at `139.84.133.107` is not accepting the password `Eagelminds@123` for user `postgres`.

## 🔧 Server-Side Setup Required

### Step 1: Connect to PostgreSQL Server
```bash
# SSH into the server
ssh root@139.84.133.107

# Or if using a different user
ssh your_username@139.84.133.107
```

### Step 2: Check PostgreSQL Status
```bash
# Check if PostgreSQL is running
sudo systemctl status postgresql

# If not running, start it
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

### Step 3: Configure PostgreSQL User
```bash
# Switch to postgres user
sudo -u postgres psql

# In PostgreSQL prompt, set password
ALTER USER postgres PASSWORD 'Eagelminds@123';

# Create the database
CREATE DATABASE eagleminds;

# Grant privileges
GRANT ALL PRIVILEGES ON DATABASE eagleminds TO postgres;

# List databases to verify
\l

# Exit PostgreSQL
\q
```

### Step 4: Configure Remote Access
```bash
# Edit postgresql.conf
sudo nano /etc/postgresql/*/main/postgresql.conf

# Find and uncomment/modify this line:
listen_addresses = '*'

# Edit pg_hba.conf
sudo nano /etc/postgresql/*/main/pg_hba.conf

# Add this line at the end:
host    all             all             0.0.0.0/0               md5
```

### Step 5: Restart PostgreSQL
```bash
sudo systemctl restart postgresql
```

### Step 6: Open Firewall
```bash
# Ubuntu/Debian
sudo ufw allow 5432

# CentOS/RHEL
sudo firewall-cmd --permanent --add-port=5432/tcp
sudo firewall-cmd --reload
```

### Step 7: Test Local Connection
```bash
# Test locally on the server
psql -U postgres -h localhost -d postgres

# Test with the new database
psql -U postgres -h localhost -d eagleminds
```

## 🔄 Alternative: Create Dedicated Database User

If you prefer a dedicated user instead of using postgres:

```bash
# Connect as postgres
sudo -u postgres psql

# Create new user
CREATE USER eagleminds WITH PASSWORD 'Eagelminds@123';

# Create database owned by new user
CREATE DATABASE eagleminds OWNER eagleminds;

# Grant privileges
GRANT ALL PRIVILEGES ON DATABASE eagleminds TO eagleminds;
ALTER USER eagleminds CREATEDB;

# Exit
\q
```

## 🧪 Test Connection from Client

After server configuration, test from your local machine:

```bash
# Test with postgres user
psql -U postgres -h 139.84.133.107 -p 5432 -d eagleminds

# Or test with dedicated user
psql -U eagleminds -h 139.84.133.107 -p 5432 -d eagleminds
```

## 📝 Environment Variables

Once the database is working, update your `.env` file:

```bash
# For postgres user
DATABASE_URL="postgresql://postgres:Eagelminds@123@139.84.133.107:5432/eagleminds"

# For dedicated user
DATABASE_URL="postgresql://eagleminds:Eagelminds@123@139.84.133.107:5432/eagleminds"
```

## 🚀 After Database is Ready

Run these commands to set up the application:

```bash
# Generate Prisma client
npx prisma generate

# Push database schema
npx prisma db push

# Seed database with initial data
npx prisma db seed

# Start development server
npm run dev
```

## 🐛 Common Issues and Solutions

### Issue: "Connection Refused"
```bash
# Check if PostgreSQL is listening on all interfaces
sudo netstat -plunt | grep 5432

# Should show: 0.0.0.0:5432
```

### Issue: "Authentication Failed"
```bash
# Check authentication method in pg_hba.conf
sudo grep -v "^#" /etc/postgresql/*/main/pg_hba.conf | grep -v "^$"

# Should include: host all all 0.0.0.0/0 md5
```

### Issue: "Database Does Not Exist"
```bash
# List all databases
sudo -u postgres psql -c "\l"

# Create database if missing
sudo -u postgres psql -c "CREATE DATABASE eagleminds;"
```

## 📞 Need Help?

If you're still having issues:

1. **Check PostgreSQL logs**:
   ```bash
   sudo tail -f /var/log/postgresql/postgresql-*-main.log
   ```

2. **Verify configuration**:
   ```bash
   sudo -u postgres psql -c "SELECT name, setting FROM pg_settings WHERE name IN ('listen_addresses', 'port', 'max_connections');"
   ```

3. **Test network connectivity**:
   ```bash
   telnet 139.84.133.107 5432
   ```

Let me know once you've completed the server-side setup, and I'll help you connect the application!