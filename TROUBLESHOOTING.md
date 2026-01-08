# 🔧 Troubleshooting Guide

## Common Issues and Solutions

### 1. "Route not found" Error

**If you see this error when accessing the backend URL directly:**
- ✅ **Fixed!** The backend now has a root route that shows API information
- The backend is an API server - you should access it through the frontend, not directly
- To test the backend, use: `https://your-backend.onrender.com/health`

**If you see this error in the frontend:**
- Make sure you're accessing the **frontend URL**, not the backend URL
- Frontend URL: `https://your-frontend-name.onrender.com`
- Backend URL: `https://your-backend-name.onrender.com` (API only)

### 2. CORS Errors

**Symptoms:** Browser console shows CORS errors when trying to login or make API calls

**Solutions:**
1. Verify `FRONTEND_URL` in backend environment variables matches your frontend URL exactly
2. Check that both services are deployed and running
3. The backend automatically allows `.onrender.com` domains, so this should work automatically

### 3. Login Not Working

**Symptoms:** Login form submits but nothing happens, or shows "Login failed"

**Checklist:**
1. ✅ Verify `VITE_API_URL` in frontend is set to: `https://your-backend-name.onrender.com/api`
2. ✅ Check browser console (F12) for errors
3. ✅ Test backend directly:
   ```bash
   curl -X POST https://your-backend.onrender.com/api/admin/login \
     -H "Content-Type: application/json" \
     -d '{"email":"admin@sportshub.com","password":"admin123"}'
   ```
4. ✅ Check Render service logs for backend errors

### 4. Frontend Can't Connect to Backend

**Symptoms:** All API calls fail, network errors in console

**Solutions:**
1. Verify backend is running (check Render dashboard)
2. Test backend health endpoint: `https://your-backend.onrender.com/health`
3. Verify `VITE_API_URL` environment variable is set correctly
4. Make sure backend `FRONTEND_URL` includes your frontend URL

### 5. Environment Variables Not Working

**For Frontend:**
- Environment variables must start with `VITE_` prefix
- After changing environment variables, you need to **rebuild** the frontend
- In Render: Go to frontend service → Environment → Update → Save (triggers rebuild)

**For Backend:**
- Environment variables take effect immediately (no rebuild needed)
- After changing, the service will automatically restart

### 6. Build Failures

**Backend Build Fails:**
- Check that `package.json` has all dependencies
- Verify Node.js version (Render uses Node 18+)
- Check build logs in Render dashboard

**Frontend Build Fails:**
- Make sure `npm run build` works locally
- Check for TypeScript/ESLint errors
- Verify all dependencies are in `package.json`

### 7. Free Tier Spin-Down

**Symptoms:** First request after inactivity takes 30-60 seconds

**Explanation:**
- Render's free tier spins down after 15 minutes of inactivity
- First request "wakes up" the service (cold start)
- This is normal for free tier

**Solution:**
- Upgrade to paid plan for always-on service
- Or use a service like UptimeRobot to ping your backend every 10 minutes

### 8. GitHub Repository Not Found

**Error:** `fatal: repository 'https://github.com/...' not found`

**Solutions:**
1. Make sure the repository exists on GitHub
2. Check the repository name and username are correct
3. Verify you have access to the repository
4. Try using SSH instead of HTTPS:
   ```bash
   git remote set-url origin git@github.com:YOUR_USERNAME/SportsApp.git
   ```

## Testing Your Deployment

### Test Backend
```bash
# Health check
curl https://your-backend.onrender.com/health

# Test admin login
curl -X POST https://your-backend.onrender.com/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@sportshub.com","password":"admin123"}'
```

### Test Frontend
1. Visit your frontend URL
2. Open browser console (F12)
3. Check for any errors
4. Try logging in with admin credentials

## Quick Checklist

Before reporting an issue, verify:

- [ ] Both backend and frontend services are deployed and running
- [ ] Environment variables are set correctly in Render dashboard
- [ ] Backend `FRONTEND_URL` matches your frontend URL
- [ ] Frontend `VITE_API_URL` points to your backend API
- [ ] You're accessing the frontend URL (not backend URL) in browser
- [ ] Browser console shows no CORS errors
- [ ] Backend health endpoint responds: `/health`

## Getting Help

1. Check Render service logs (Dashboard → Your Service → Logs)
2. Check browser console for frontend errors
3. Test backend endpoints directly with curl
4. Verify all environment variables are set correctly

---

**Still having issues?** Make sure you've followed all steps in `RENDER_DEPLOYMENT.md`

