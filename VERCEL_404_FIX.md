# Quick Fix for 404 Error on Vercel

## The Problem
You're seeing a 404 NOT_FOUND error after deploying to Vercel. This is because Vercel doesn't know where your application files are located.

## The Solution (Choose One)

### ✅ RECOMMENDED: Set Root Directory to `frontend`

This is the cleanest solution:

1. **Go to Vercel Dashboard**
   - Open your project: https://vercel.com/dashboard
   - Click on your project name

2. **Update Root Directory**
   - Go to **Settings** → **General**
   - Scroll to **Root Directory**
   - Click **Edit**
   - Enter: `frontend`
   - Click **Save**

3. **Verify Build Settings**
   - Go to **Settings** → **Build & Development Settings**
   - Verify these settings:
     - **Framework Preset**: Vite (auto-detected)
     - **Build Command**: `npm run build` (auto-detected)
     - **Output Directory**: `dist` (auto-detected)
     - **Install Command**: `npm install` (auto-detected)

4. **Redeploy**
   - Go to **Deployments** tab
   - Click the **⋯** (three dots) on the latest deployment
   - Click **Redeploy**
   - Or push a new commit to trigger a new deployment

5. **Test**
   - Wait for deployment to complete
   - Visit your deployment URL
   - It should now work! ✅

### Alternative: Keep Root Directory as Root

If you prefer to keep the root directory as `.` (root), the `vercel.json` at the root is already configured. Just make sure:

1. The root `vercel.json` exists (✅ it does)
2. In Vercel project settings:
   - **Root Directory**: `.` (or leave blank)
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Output Directory**: `frontend/dist`
   - **Install Command**: `cd frontend && npm install`

## Why This Happens

Vercel needs to know:
- Where your application code is (`frontend/` folder)
- Where the build output is (`frontend/dist/` folder)
- How to handle routing for your React Router SPA

Setting the root directory to `frontend` tells Vercel that all your app files are in that folder, making the configuration simpler.

## Still Having Issues?

1. **Check Build Logs**
   - Go to your deployment in Vercel
   - Click on the deployment
   - Check the build logs for any errors

2. **Verify Environment Variables**
   - Go to **Settings** → **Environment Variables**
   - Make sure all required variables are set:
     - `VITE_GEMINI_API_KEY`
     - `VITE_API_BASE_URL`
     - `VITE_SUPABASE_URL`
     - `VITE_SUPABASE_ANON_KEY`

3. **Check File Structure**
   - Ensure `frontend/dist/index.html` exists after build
   - Verify `frontend/package.json` has the build script

4. **Clear Cache and Redeploy**
   - In deployment settings, enable "Clear Build Cache"
   - Redeploy

