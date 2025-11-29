# VividCanvas Backend - Railway Deployment Guide

## Overview
This guide provides step-by-step instructions to deploy VividCanvas backend to **Railway** - the best free hosting option for Node.js/Express applications with no cold starts and automatic GitHub integration.

### Why Railway?
- ✅ **$5 free monthly credits** (enough for hobby projects)
- ✅ **No cold starts** (unlike Render)
- ✅ **GitHub auto-deployment** (push to main → auto-deploy)
- ✅ **Managed PostgreSQL database** support
- ✅ **Custom domains** available
- ✅ **Environment variables** management built-in
- ✅ **Automatic SSL certificates**

---

## Part 1: Prepare Your Repository

### Step 1.1: Ensure `.env.local` Variables Are Set
Create a `.env.local` file in the **server directory** (if not already present):

```bash
cd server
cat > .env.local << EOF
PORT=5000
NODE_ENV=production
JWT_SECRET=your-super-secret-jwt-key-here-minimum-32-chars
EOF
```

### Step 1.2: Verify `package.json` Has Start Script
Ensure your `server/package.json` contains:

```json
{
  "scripts": {
    "dev": "tsx watch index.ts",
    "start": "node dist/index.js",
    "build": "tsc"
  }
}
```

### Step 1.3: Create `Procfile` (Optional but Recommended)
In the **server directory root**, create a `Procfile`:

```
web: npm start
```

### Step 1.4: Commit Changes
```bash
git add -A
git commit -m "chore: Add Railway deployment configuration"
git push origin main
```

---

## Part 2: Set Up Railway Account

### Step 2.1: Create Railway Account
1. Visit [railway.app](https://railway.app)
2. Click **"Start Project"** button
3. Choose **"GitHub"** login option
4. Authorize Railway to access your GitHub account
5. Wait for redirect back to Railway dashboard

### Step 2.2: Verify Email (Important!)
Check your email and verify your Railway account - this unlocks the $5 free credits.

---

## Part 3: Deploy to Railway

### Step 3.1: Create New Project
1. Click **"+ New Project"** on Railway dashboard
2. Select **"Deploy from GitHub"**
3. Search for **"VividCanvas"** repository
4. Click to select it
5. Railway will ask "Do you want to deploy from this repo?" - click **"Yes"**

### Step 3.2: Configure Service
Railway will detect it's a Node.js project:

1. **Watch the build process** (takes 2-5 minutes)
2. Once built, navigate to the **"Deployments"** tab
3. Check deployment logs for errors
4. Look for success message: **"Deployment complete"**

### Step 3.3: Set Environment Variables
1. Go to **"Variables"** tab in the project
2. Add these environment variables:

```
NODE_ENV = production
PORT = 5000
JWT_SECRET = your-super-secret-jwt-key-minimum-32-chars
```

3. Click **"Add"** for each variable
4. Railway will **auto-redeploy** when variables are saved

### Step 3.4: Get Your Deployed URL
1. Go to **"Settings"** tab
2. Look for **"Deployment Domain"** section
3. Your URL will be something like: `https://vividcanvas-production.up.railway.app`
4. **Save this URL** - you'll need it for frontend configuration

---

## Part 4: Verify Deployment

### Step 4.1: Test Backend is Running
```bash
# Replace with your actual Railway URL
curl https://vividcanvas-production.up.railway.app/health
```

Expected response:
```json
{"status": "ok"}
```

### Step 4.2: Test Signup Endpoint
```bash
curl -X POST https://vividcanvas-production.up.railway.app/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "name": "Test User"
  }'
```

Expected response:
```json
{
  "token": "eyJhbGc...",
  "user": {
    "id": "1",
    "email": "test@example.com",
    "name": "Test User"
  }
}
```

### Step 4.3: Test Protected Route
```bash
# Use the JWT token from signup response
curl https://vividcanvas-production.up.railway.app/api/questions \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

---

## Part 5: Connect Frontend to Deployed Backend

### Step 5.1: Update Frontend Environment
In your **client directory**, create `.env.local`:

```bash
VITE_API_URL=https://vividcanvas-production.up.railway.app
```

### Step 5.2: Update API Configuration
In `client/src/services/api.ts` (or similar):

```typescript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});
```

### Step 5.3: Deploy Frontend
Deploy your frontend to Vercel, Netlify, or GitHub Pages pointing to the Railway backend URL.

---

## Part 6: Database Setup (If Using PostgreSQL)

### Step 6.1: Add PostgreSQL Database
1. In Railway project, click **"+ Add"**
2. Select **"Database"** → **"PostgreSQL"**
3. Wait for database to provision (1-2 minutes)
4. Click on the PostgreSQL service
5. Go to **"Connect"** tab
6. Copy the **PostgreSQL Connection String**

### Step 6.2: Add Database URL to Environment
1. Go back to main service (Node.js app)
2. Go to **"Variables"** tab
3. Add: `DATABASE_URL` = (paste the PostgreSQL connection string)
4. Save - Railway will auto-redeploy

### Step 6.3: Initialize Database
If using a migration tool, run:
```bash
npm run migrate:deploy
```

---

## Part 7: Monitor & Troubleshooting

### Viewing Logs
1. Go to **"Logs"** tab in your project
2. Watch real-time application logs
3. Check for errors during startup

### Common Issues & Fixes

**Issue: Build Failed**
- Solution: Check if `package.json` has a `build` script
- Add to server/package.json: `"build": "tsc"`

**Issue: Port Already in Use**
- Solution: Railway sets PORT env variable automatically
- Use: `const port = process.env.PORT || 5000`

**Issue: Environment Variables Not Loading**
- Solution: Ensure variables are added in Railway Variables tab
- Redeploy manually after adding variables

**Issue: JWT Token Errors**
- Solution: Ensure JWT_SECRET is set (minimum 32 characters)
- Use same secret in production as development

---

## Part 8: Automatic Deployments

### Enable Auto-Deploy on Git Push
1. Go to **"Settings"** tab
2. Ensure **"Auto-Deploy"** is toggled **ON**
3. Select branch: **"main"**
4. Now every `git push origin main` auto-deploys!

### View Deployment History
1. Go to **"Deployments"** tab
2. See all previous deployments
3. Click any deployment to view logs

---

## Part 9: API Endpoints Reference

All endpoints are now live at: `https://vividcanvas-production.up.railway.app`

### Authentication Endpoints
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Interview Endpoints
- `GET /api/interviews` - Get user's interviews
- `POST /api/interviews` - Create new interview
- `GET /api/interviews/:id` - Get interview details
- `PUT /api/interviews/:id` - Update interview

### Questions Endpoint
- `GET /api/questions` - Get random questions (54+ pre-seeded)
- `POST /api/questions` - Submit answer

### Feedback Endpoint
- `POST /api/feedback` - Generate AI-powered feedback

---

## Part 10: Next Steps

✅ **Deployment Complete!**

1. **Frontend Integration**
   - Connect your React/Vue frontend to Railway URL
   - Test all API calls against live backend
   - Deploy frontend to Vercel/Netlify

2. **Database Setup** (if needed)
   - Connect PostgreSQL from Railway
   - Run migrations
   - Seed initial data

3. **Custom Domain**
   - Add custom domain in Railway settings
   - Configure DNS records
   - Enable SSL certificate

4. **Monitoring**
   - Set up error logging (Sentry)
   - Monitor API response times
   - Track error rates

5. **Scaling**
   - Upgrade to paid plan when needed
   - Auto-scaling available
   - Database optimization

---

## Support Resources

- **Railway Docs**: https://docs.railway.app
- **Railway Discord**: Community support
- **GitHub Issues**: Report bugs in repository
- **Backend Setup Guide**: See `BACKEND_SETUP.md`

---

**Backend is now live and ready for production use!** 🚀
