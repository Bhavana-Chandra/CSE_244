# Vercel Deployment Guide

This guide will help you deploy your Vite + React application to Vercel.

## Prerequisites

1. A Vercel account (sign up at [vercel.com](https://vercel.com))
2. Your project pushed to a Git repository (GitHub, GitLab, or Bitbucket)

## Deployment Steps

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to GitHub/GitLab/Bitbucket**
   - Make sure your code is committed and pushed to a repository

2. **Import Project in Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Click "Import Project"
   - Select your repository
   - Vercel will auto-detect it's a Vite project

3. **Configure Project Settings**
   - **Root Directory**: Set to `frontend` (or leave blank if deploying from root)
   - **Framework Preset**: Vite (should be auto-detected)
   - **Build Command**: `npm run build` (if root is `frontend`) or `cd frontend && npm run build`
   - **Output Directory**: `dist` (if root is `frontend`) or `frontend/dist`
   - **Install Command**: `npm install` (if root is `frontend`) or `cd frontend && npm install`

4. **Set Environment Variables**
   Go to Project Settings → Environment Variables and add:
   - `VITE_GEMINI_API_KEY` - Your Google Gemini API key
   - `VITE_API_BASE_URL` - Your API base URL (if applicable)
   - `VITE_SUPABASE_URL` - Your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY` - Your Supabase anonymous key

5. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete
   - Your app will be live at `your-project.vercel.app`

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Navigate to your project root**
   ```bash
   cd frontend
   ```

4. **Deploy**
   ```bash
   vercel
   ```
   - Follow the prompts
   - For production deployment, use: `vercel --prod`

5. **Set Environment Variables**
   ```bash
   vercel env add VITE_GEMINI_API_KEY
   vercel env add VITE_API_BASE_URL
   vercel env add VITE_SUPABASE_URL
   vercel env add VITE_SUPABASE_ANON_KEY
   ```

## Important Notes

- **Root Directory**: If your `frontend` folder is the main application, you can either:
  - Deploy from the `frontend` directory directly, OR
  - Configure Vercel to use `frontend` as the root directory in project settings

- **Environment Variables**: All `VITE_*` variables must be set in Vercel's environment variables section. They will be available at build time.

- **SPA Routing**: The `vercel.json` includes a rewrite rule to handle client-side routing for React Router.

- **Build Output**: Vite builds to the `dist` folder by default, which is configured in `vercel.json`.

## Troubleshooting

### Fixing 404 NOT_FOUND Error

If you're getting a 404 error after deployment, follow these steps:

**Option A: Set Root Directory to `frontend` (RECOMMENDED)**

1. Go to your Vercel project settings
2. Navigate to **Settings** → **General**
3. Under **Root Directory**, click **Edit**
4. Set it to `frontend` and click **Save**
5. Go to **Settings** → **Build & Development Settings**
6. Verify:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build` (should auto-detect)
   - **Output Directory**: `dist` (should auto-detect)
   - **Install Command**: `npm install` (should auto-detect)
7. Redeploy your project

**Option B: Keep Root Directory as Root (Current Setup)**

If you want to keep the root directory as `.` (root), ensure:
1. The root `vercel.json` file exists (it should)
2. Build Command: `cd frontend && npm install && npm run build`
3. Output Directory: `frontend/dist`
4. Install Command: `cd frontend && npm install`

**Verify the Fix:**
- After redeploying, check the build logs to ensure the build completed successfully
- Visit your deployment URL - it should load the homepage
- Try navigating to different routes (e.g., `/games`, `/parts`) - they should all work

### Other Common Issues

- **Build Fails**: Check that all dependencies are in `package.json` and environment variables are set
- **404 on Routes**: Ensure the rewrite rule in `vercel.json` is working (it should redirect all routes to `index.html`)
- **Environment Variables Not Working**: Make sure they're prefixed with `VITE_` and redeploy after adding them
- **Assets Not Loading**: Check that the build output includes the `dist` folder with all assets

## After Deployment

Your app will be available at:
- Preview deployments: `your-project-git-branch-username.vercel.app`
- Production: `your-project.vercel.app` (or your custom domain)

You can also set up a custom domain in the Vercel project settings.

