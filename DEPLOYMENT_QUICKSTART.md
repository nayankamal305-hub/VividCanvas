# VividCanvas Backend - Quick Start Deployment Checklist

## 🚀 Deploy to Railway in 5 Minutes

Follow this checklist to get your VividCanvas backend live on Railway with zero cold starts and $5 free monthly credits.

---

## Step 1: Prepare Your Repository ✅

- [ ] Navigate to your VividCanvas repository on GitHub
- [ ] Verify `server/package.json` exists with build script: `"build": "tsc"`
- [ ] Verify `server/package.json` has start script: `"start": "node dist/index.js"`
- [ ] Check that TypeScript is compiled: `npm run build` runs without errors
- [ ] Commit all changes: `git add -A && git commit -m "ready for deployment"`
- [ ] Push to GitHub: `git push origin main`

**Time: 2 minutes**

---

## Step 2: Create Railway Account ✅

- [ ] Visit https://railway.app
- [ ] Click "Start Project"
- [ ] Select "GitHub" login
- [ ] Authorize Railway to access your GitHub
- [ ] **Check email and verify account** (unlocks $5 credits!)
- [ ] Confirm you see Railway dashboard

**Time: 1 minute**

---

## Step 3: Deploy to Railway ✅

- [ ] Click "+ New Project" on Railway dashboard
- [ ] Select "Deploy from GitHub"
- [ ] Search for and select "VividCanvas" repository
- [ ] Click "Yes" when asked to confirm deployment
- [ ] **Watch the build process** (2-5 minutes)
- [ ] Verify build completes successfully
- [ ] Check "Deployments" tab shows "Deployment complete"

**Time: 5 minutes (automatic)**

---

## Step 4: Configure Environment Variables ✅

1. **Go to "Variables" tab**
   - [ ] Click the "Variables" tab in your Railway project

2. **Add these variables**:
   - [ ] `NODE_ENV` = `production`
   - [ ] `PORT` = `5000`
   - [ ] `JWT_SECRET` = `your-secret-key-minimum-32-characters-long`
   - [ ] Click "Add" for each variable

3. **Wait for auto-redeploy**
   - [ ] Railway automatically redeploys when variables are saved
   - [ ] Check "Deployments" tab - should show new deployment

**Time: 2 minutes**

---

## Step 5: Get Your Live URL ✅

- [ ] Go to "Settings" tab
- [ ] Look for "Deployment Domain" section
- [ ] Copy your URL (e.g., `https://vividcanvas-production.up.railway.app`)
- [ ] **Save this URL** - you'll need it for frontend

**Time: 30 seconds**

---

## Step 6: Verify It's Working ✅

### Test 1: Health Check
```bash
curl https://YOUR_URL_HERE/health
```
Expected: `{"status": "ok"}` 

- [ ] Health check endpoint returns success

### Test 2: Signup
```bash
curl -X POST https://YOUR_URL_HERE/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Password123!",
    "name": "Test User"
  }'
```
Expected: Returns JWT token and user object

- [ ] Signup endpoint works
- [ ] JWT token received in response

### Test 3: Protected Route
```bash
curl https://YOUR_URL_HERE/api/questions \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```
Expected: Returns array of interview questions

- [ ] Protected routes work
- [ ] Questions endpoint returns data

**Time: 2 minutes**

---

## Step 7: Connect Frontend ✅

1. **Update frontend environment**
   - [ ] In `client/` directory, create or update `.env.local`
   - [ ] Add: `VITE_API_URL=https://YOUR_URL_HERE`
   - [ ] Example: `VITE_API_URL=https://vividcanvas-production.up.railway.app`

2. **Update API configuration**
   - [ ] Find your API client file (likely `client/src/services/api.ts` or similar)
   - [ ] Update `baseURL` to use `import.meta.env.VITE_API_URL`

3. **Test connection**
   - [ ] Run `npm run dev` in client directory
   - [ ] Try signing up in the UI
   - [ ] Verify JWT token is stored
   - [ ] Verify questions load

**Time: 3 minutes**

---

## Step 8: Deploy Frontend ✅

Choose one:

### Option A: Vercel (Recommended)
- [ ] Visit https://vercel.com
- [ ] Connect GitHub repository
- [ ] Set `VITE_API_URL` environment variable
- [ ] Deploy with one click
- [ ] Get your live frontend URL

### Option B: Netlify
- [ ] Visit https://netlify.com
- [ ] Connect GitHub repository
- [ ] Set `VITE_API_URL` environment variable
- [ ] Deploy with one click
- [ ] Get your live frontend URL

### Option C: GitHub Pages
- [ ] Build locally: `npm run build`
- [ ] Deploy dist folder to GitHub Pages
- [ ] Get your live frontend URL

**Time: 5 minutes (automated)**

---

## 🎯 You're Done! ✅

Your full-stack VividCanvas application is now live:

- ✅ Backend: Running on Railway
- ✅ Frontend: Deployed on Vercel/Netlify/GitHub Pages
- ✅ Authentication: JWT tokens working
- ✅ Database: Ready for PostgreSQL (optional)

---

## Troubleshooting Quick Reference

### "Build failed"
**Solution**: Ensure `server/package.json` has `"build": "tsc"` script

### "Cannot connect to backend"
**Solution**: Check API URL in frontend `.env.local` matches Railway domain

### "JWT errors"
**Solution**: Ensure JWT_SECRET is set (min 32 characters) and same on backend

### "Port already in use"
**Solution**: Railway sets PORT automatically, use `process.env.PORT || 5000`

### "Frontend not loading"
**Solution**: Check CORS headers - add to `server/index.ts`:
```typescript
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173'
}));
```

---

## What's Next?

### Short Term (This Week)
- [ ] Share deployed URL with team
- [ ] Test all features in production
- [ ] Gather feedback

### Medium Term (This Month)
- [ ] Set up PostgreSQL database on Railway
- [ ] Migrate data from development
- [ ] Set up monitoring (Sentry.io)
- [ ] Enable custom domain

### Long Term (For Production)
- [ ] Set up auto-backups
- [ ] Enable database replication
- [ ] Set up staging environment
- [ ] Enable rate limiting
- [ ] Set up error logging

---

## Key Files Reference

If something breaks, check these files:

- **Backend entry point**: `server/index.ts`
- **Routes**: `server/routes.ts`
- **Package config**: `server/package.json`
- **TypeScript config**: `server/tsconfig.json`
- **Frontend API client**: `client/src/services/api.ts` or similar
- **Frontend config**: `client/.env.local`

---

## Useful Links

- **Railway Dashboard**: https://railway.app
- **Vercel Deployment**: https://vercel.com
- **Netlify Deployment**: https://netlify.com
- **Full Deploy Guide**: See `DEPLOYMENT_RAILWAY.md`
- **Alternative Platforms**: See `DEPLOYMENT_ALTERNATIVES.md`
- **Backend Setup**: See `BACKEND_SETUP.md`

---

## Success Metrics

You're successful when:

1. ✅ Backend URL accessible (health check passes)
2. ✅ JWT authentication works (signup endpoint returns token)
3. ✅ Protected routes work (questions endpoint returns data)
4. ✅ Frontend connects to backend
5. ✅ Users can sign up, login, and view questions
6. ✅ Live URL shareable with others

---

## Getting Help

- **Railway Docs**: https://docs.railway.app
- **GitHub Issues**: Report bugs in repository
- **Stack Overflow**: Tag questions with `railway` + `nodejs`
- **Backend Setup Guide**: See `BACKEND_SETUP.md` for detailed info

---

**Total Time: ~10-15 minutes for full deployment** ⏱️

**You've successfully deployed VividCanvas to production!** 🎉
