# Internal Server Error Diagnostic

## 🔍 **STEP 1: Access the Application**
The server is now running on **PORT 3001** instead of 3000.

### **URLs to Test:**
- **Homepage**: http://localhost:3001
- **Admin Login**: http://localhost:3001/admin/login
- **Admin Dashboard**: http://localhost:3001/admin/dashboard

## 🔍 **STEP 2: Common Error Sources**

### **If error occurs on Homepage:**
- Issue likely with main page rendering or API calls

### **If error occurs on Admin Login:**
- Issue with authentication setup

### **If error occurs on Admin Dashboard:**
- Issue with new dashboard API endpoint `/api/admin/dashboard`

### **If error occurs on Admin Pages/Services/Leads:**
- Issue with the CRUD API endpoints

## 🔧 **STEP 3: Check Browser Console**
1. Open browser Developer Tools (F12)
2. Go to Console tab
3. Look for any JavaScript errors
4. Check Network tab for failed API requests

## 🔧 **STEP 4: Check Server Terminal**
Look at the terminal where `npm run dev` is running for any server-side errors.

## 🛠 **STEP 5: Quick Fix Attempts**

### **If Dashboard Error:**
The new dashboard API might have issues. Try accessing other pages first.

### **If Database Error:**
Run: `npm run db:push` and `npm run db:seed`

### **If Build Error:**
Run: `npm run build` to check for compilation errors

## 📋 **Please Provide:**
1. **Exact URL** where error occurs
2. **Browser console errors** (copy/paste)
3. **Server terminal errors** (copy/paste)
4. **What action** triggered the error

This will help identify the exact cause of the Internal Server Error.