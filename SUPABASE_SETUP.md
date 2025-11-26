# Supabase Configuration for Email Confirmation

## Important: Update Supabase Redirect URLs

After deploying to Vercel, you need to update your Supabase project settings to allow redirects to your production URL.

### Steps:

1. **Go to Supabase Dashboard**
   - Visit [supabase.com/dashboard](https://supabase.com/dashboard)
   - Select your project

2. **Navigate to Authentication Settings**
   - Go to **Authentication** → **URL Configuration**
   - Or go to **Project Settings** → **Authentication** → **URL Configuration**

3. **Add Site URL**
   - **Site URL**: `https://your-project.vercel.app` (replace with your actual Vercel URL)
   - This is the default URL where users will be redirected after authentication

4. **Add Redirect URLs**
   In the **Redirect URLs** section, add these URLs (one per line):
   ```
   https://your-project.vercel.app/auth/callback
   https://your-project.vercel.app/auth/reset-password
   http://localhost:3000/auth/callback
   http://localhost:3000/auth/reset-password
   ```
   
   Replace `your-project.vercel.app` with your actual Vercel deployment URL.

5. **Save Changes**
   - Click **Save** to apply the changes

### Why This is Needed

Supabase requires you to whitelist redirect URLs for security. Without adding your Vercel URL to the allowed redirect URLs, email confirmation links will fail with redirect errors.

### Testing

After updating the settings:
1. Try registering a new user
2. Check your email for the confirmation link
3. Click the confirmation link
4. You should be redirected to your Vercel deployment (not localhost)
5. The user should be automatically logged in

### Troubleshooting

- **Still redirecting to localhost?**: Make sure you've updated the redirect URLs in Supabase and redeployed your app
- **"Invalid redirect URL" error?**: Double-check that your Vercel URL is exactly correct in Supabase settings
- **Email not received?**: Check spam folder, and verify email settings in Supabase

