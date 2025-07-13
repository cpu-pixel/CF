# 🚀 UrbanSync Deployment Guide

This guide will help you deploy UrbanSync to production using free hosting services.

## 📋 Prerequisites

- GitHub account
- MongoDB Atlas account (free tier)
- Vercel account (free)
- Railway account (free)

## 🗄️ Step 1: Set up MongoDB Atlas (Database)

1. **Create MongoDB Atlas Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Sign up for a free account
   - Create a new cluster (M0 Free tier)

2. **Configure Database**
   - Create a database user with read/write permissions
   - Get your connection string
   - Add your IP address to the whitelist (or use 0.0.0.0/0 for all IPs)

3. **Get Connection String**
   - Your connection string will look like:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/urbansync?retryWrites=true&w=majority
   ```

## 🔧 Step 2: Deploy Backend to Railway

1. **Create Railway Account**
   - Go to [Railway](https://railway.app/)
   - Sign up with GitHub

2. **Deploy Backend**
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your UrbanSync repository
   - Set the root directory to `backend`

3. **Configure Environment Variables**
   - Go to your project settings
   - Add these environment variables:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/urbansync?retryWrites=true&w=majority
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   FRONTEND_URL=https://your-frontend-url.vercel.app
   ```

4. **Get Backend URL**
   - Railway will provide a URL like: `https://your-app.railway.app`
   - Save this URL for the frontend configuration

## 🌐 Step 3: Deploy Frontend to Vercel

1. **Create Vercel Account**
   - Go to [Vercel](https://vercel.com/)
   - Sign up with GitHub

2. **Deploy Frontend**
   - Click "New Project" → "Import Git Repository"
   - Select your UrbanSync repository
   - Set the root directory to `frontend`
   - Set the build command to: `npm run build`
   - Set the output directory to: `build`

3. **Configure Environment Variables**
   - Go to your project settings → Environment Variables
   - Add this environment variable:
   ```
   REACT_APP_API_URL=https://your-backend-url.railway.app
   ```

4. **Redeploy**
   - After adding environment variables, redeploy the project

## 🔄 Step 4: Update Backend CORS

1. **Update Frontend URL in Railway**
   - Go back to Railway project settings
   - Update the `FRONTEND_URL` environment variable with your Vercel URL
   - Redeploy the backend

## 🧪 Step 5: Test Your Deployment

1. **Test Backend Health**
   - Visit: `https://your-backend-url.railway.app/health`
   - Should return: `{"status":"OK","message":"UrbanSync API is running"}`

2. **Test Frontend**
   - Visit your Vercel URL
   - Try to register/login
   - Create a test project

## 🔐 Step 6: Create Admin User

1. **Access Railway Console**
   - Go to your Railway project
   - Click on "Deployments" → "View Logs"
   - Open the terminal

2. **Run Admin Creation Script**
   ```bash
   node scripts/createAdmin.js
   ```

3. **Test Admin Login**
   - Use the credentials provided by the script
   - Email: `admin@urbansync.com`
   - Password: `admin123`

## 📱 Step 7: Custom Domain (Optional)

### Vercel (Frontend)
1. Go to your Vercel project settings
2. Click "Domains"
3. Add your custom domain
4. Configure DNS as instructed

### Railway (Backend)
1. Go to your Railway project settings
2. Click "Custom Domains"
3. Add your custom domain
4. Update CORS settings accordingly

## 🔧 Environment Variables Reference

### Backend (Railway)
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/urbansync?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
FRONTEND_URL=https://your-frontend-url.vercel.app
```

### Frontend (Vercel)
```env
REACT_APP_API_URL=https://your-backend-url.railway.app
```

## 🚨 Security Notes

1. **Change Default Passwords**
   - Update admin password after first login
   - Use strong, unique passwords

2. **JWT Secret**
   - Use a strong, random JWT secret
   - Never commit secrets to Git

3. **MongoDB Security**
   - Use strong database passwords
   - Restrict IP access if possible

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Check `FRONTEND_URL` in Railway environment variables
   - Ensure the URL matches exactly (including https://)

2. **Database Connection Issues**
   - Verify MongoDB Atlas connection string
   - Check IP whitelist settings
   - Ensure database user has correct permissions

3. **Build Failures**
   - Check Vercel build logs
   - Ensure all dependencies are in package.json
   - Verify build commands are correct

4. **Environment Variables Not Working**
   - Redeploy after adding environment variables
   - Check variable names (case-sensitive)
   - Ensure no extra spaces or quotes

## 📞 Support

If you encounter issues:
1. Check the deployment logs
2. Verify all environment variables are set correctly
3. Test the API endpoints individually
4. Check browser console for frontend errors

## 🎉 Success!

Once deployed, your UrbanSync application will be available at:
- **Frontend**: `https://your-app.vercel.app`
- **Backend**: `https://your-app.railway.app`

Share your application with others and start managing civic projects! 