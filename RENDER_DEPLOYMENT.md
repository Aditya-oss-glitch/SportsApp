# 🚀 Render Deployment Guide

This guide will help you deploy your SportsHub application to Render and ensure login functionality works correctly.

## Prerequisites

1. A GitHub account with your code pushed to a repository
2. A Render account (sign up at [render.com](https://render.com))
3. (Optional) Google Sheets credentials if you want to use Google Sheets as your database

## Step 1: Prepare Your Repository

Make sure your code is pushed to GitHub:

```bash
git add .
git commit -m "Prepare for Render deployment"
git push origin main
```

## Step 2: Deploy Backend Service

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure the backend service:
   - **Name**: `sportshub-backend` (or your preferred name)
   - **Environment**: `Node`
   - **Build Command**: `cd Backend && npm install`
   - **Start Command**: `cd Backend && npm start`
   - **Plan**: Free (or choose a paid plan)

5. **Environment Variables** - Add these in the Render dashboard:
   ```
   NODE_ENV=production
   PORT=10000
   FRONTEND_URL=https://your-frontend-name.onrender.com
   ```
   
   **Optional (for Google Sheets):**
   ```
   GOOGLE_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
   GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"
   GOOGLE_SHEET_ID=your-sheet-id-here
   ```

6. Click **"Create Web Service"**
7. Wait for the deployment to complete
8. **Copy your backend URL** (e.g., `https://sportshub-backend.onrender.com`)

## Step 3: Deploy Frontend Service

1. In Render Dashboard, click **"New +"** → **"Static Site"**
2. Connect the same GitHub repository
3. Configure the frontend service:
   - **Name**: `sportshub-frontend` (or your preferred name)
   - **Build Command**: `cd Frontend && npm install && npm run build`
   - **Publish Directory**: `Frontend/dist`

4. **Environment Variables** - Add this:
   ```
   VITE_API_URL=https://your-backend-name.onrender.com/api
   ```
   (Replace `your-backend-name` with your actual backend service name)

5. Click **"Create Static Site"**
6. Wait for the deployment to complete
7. **Copy your frontend URL** (e.g., `https://sportshub-frontend.onrender.com`)

## Step 4: Update Environment Variables

After both services are deployed, you need to update the environment variables:

### Update Backend FRONTEND_URL:
1. Go to your backend service in Render
2. Go to **"Environment"** tab
3. Update `FRONTEND_URL` to your frontend URL:
   ```
   FRONTEND_URL=https://sportshub-frontend.onrender.com
   ```
4. Click **"Save Changes"** - this will trigger a redeploy

### Verify Frontend VITE_API_URL:
1. Go to your frontend service in Render
2. Go to **"Environment"** tab
3. Verify `VITE_API_URL` is set to:
   ```
   VITE_API_URL=https://sportshub-backend.onrender.com/api
   ```
4. If it's incorrect, update it and click **"Save Changes"**

## Step 5: Test Login

Once both services are deployed and environment variables are updated:

1. Visit your frontend URL: `https://sportshub-frontend.onrender.com`
2. Navigate to the login page
3. Test login with these credentials:

### Admin Login:
- **Email**: `admin@sportshub.com`
- **Password**: `admin123`
- **Role**: Admin

### Team Captain Login:
- Use credentials from your registration
- **Default Password**: `default123` (if you haven't changed it)
- **Role**: Team Captain

### Partner Login:
- Use credentials from your partner registration
- **Role**: Partner

## Troubleshooting

### CORS Errors
If you see CORS errors in the browser console:
1. Make sure `FRONTEND_URL` in backend matches your frontend URL exactly
2. Check that both services are deployed and running
3. The backend CORS configuration automatically allows `.onrender.com` domains

### API Connection Errors
If the frontend can't connect to the backend:
1. Verify `VITE_API_URL` in frontend is set correctly
2. Check that the backend URL is accessible (visit `https://your-backend.onrender.com/health`)
3. Make sure the backend service is running (check Render dashboard)

### Build Failures
If the build fails:
1. Check the build logs in Render dashboard
2. Make sure all dependencies are in `package.json`
3. Verify Node.js version compatibility (Render uses Node 18+ by default)

### Login Not Working
If login doesn't work:
1. Check browser console for errors
2. Verify backend is receiving requests (check Render logs)
3. Test the backend API directly:
   ```bash
   curl -X POST https://your-backend.onrender.com/api/admin/login \
     -H "Content-Type: application/json" \
     -d '{"email":"admin@sportshub.com","password":"admin123"}'
   ```

## Using render.yaml (Alternative Method)

If you prefer to use the `render.yaml` file:

1. Push `render.yaml` to your repository root
2. In Render Dashboard, click **"New +"** → **"Blueprint"**
3. Connect your repository
4. Render will automatically detect `render.yaml` and create both services
5. You'll still need to set environment variables manually in the Render dashboard

## Environment Variables Reference

### Backend (.env)
```env
NODE_ENV=production
PORT=10000
FRONTEND_URL=https://your-frontend-name.onrender.com
GOOGLE_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=your-sheet-id-here
```

### Frontend (.env)
```env
VITE_API_URL=https://your-backend-name.onrender.com/api
```

## Important Notes

1. **Free Tier Limitations**: Render's free tier spins down after 15 minutes of inactivity. The first request after spin-down may take 30-60 seconds.

2. **Environment Variables**: Frontend environment variables must start with `VITE_` to be accessible in the React app.

3. **CORS**: The backend automatically allows requests from any `.onrender.com` domain, so CORS should work automatically.

4. **Google Sheets**: If you don't configure Google Sheets, the app will work with mock data (data logged to console).

5. **HTTPS**: Render provides HTTPS automatically for all services.

## Next Steps

After successful deployment:
- Test all login flows (Admin, Partner, Captain)
- Test registration flows
- Verify data persistence (if using Google Sheets)
- Set up custom domains (optional, requires paid plan)
- Configure auto-deploy from GitHub (enabled by default)

## Support

If you encounter issues:
1. Check Render service logs
2. Check browser console for frontend errors
3. Test backend endpoints directly using curl or Postman
4. Verify all environment variables are set correctly

---

**Happy Deploying! 🎉**

