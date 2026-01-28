# Natasha's Pregnancy Journey - Vercel Deployment Guide

## 📦 What's Included
All the files needed to deploy Natasha's pregnancy tracker to Vercel are ready!

## 🚀 Step-by-Step Vercel Deployment

### Step 1: Create a Vercel Account
1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up" in the top right
3. Sign up with GitHub, GitLab, Bitbucket, or Email
   - **I recommend GitHub** - it makes deployment easier
4. Complete the sign-up process

### Step 2: Prepare Your Files
You have two options:

#### **Option A: Deploy from GitHub (Recommended)**
1. Create a GitHub account at [github.com](https://github.com) if you don't have one
2. Create a new repository called `natasha-pregnancy-journey`
3. Upload all these files to the repository:
   - `package.json`
   - `vite.config.js`
   - `index.html`
   - `src/main.jsx`
   - `src/App.jsx`
4. Go to [vercel.com/new](https://vercel.com/new)
5. Click "Import Git Repository"
6. Select your `natasha-pregnancy-journey` repository
7. Vercel will auto-detect the settings - just click "Deploy"!

#### **Option B: Deploy via Vercel CLI (Alternative)**
1. Download all the project files to a folder on your computer
2. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```
3. Open terminal/command prompt in the project folder
4. Run:
   ```bash
   vercel login
   ```
5. Follow the login prompts
6. Run:
   ```bash
   vercel
   ```
7. Follow the prompts (accept defaults)
8. Your app will be deployed!

### Step 3: Access Your App
- Vercel will give you a URL like: `natasha-pregnancy-journey.vercel.app`
- Share this link with Natasha - she can bookmark it on her phone!
- Every time she visits, her data will be saved in her browser

### Step 4: (Optional) Add a Custom Domain
1. In Vercel dashboard, go to your project
2. Click "Settings" → "Domains"
3. Add your custom domain (like `natasha.yourlastname.com`)
4. Follow Vercel's instructions to connect it

## 🎨 Customization Tips

### Change the App Name
Edit `index.html` line 6 to change the browser tab title.

### Update Due Date or Current Week
Edit `src/App.jsx`:
- Line 7: Change due date
- Line 8: Change current week

### Add More Weekly Data
Edit the `weekData` object in `src/App.jsx` (around line 54) to add information for more weeks.

## 🔒 Privacy & Data
- All of Natasha's data is stored **locally in her browser**
- Nothing is sent to servers
- Data persists across sessions on the same device
- If she uses multiple devices, she'll need to access the same URL from each

## 💡 Troubleshooting

**Problem: Build fails on Vercel**
- Make sure all files are uploaded correctly
- Check that `package.json` is in the root directory

**Problem: App shows blank page**
- Clear browser cache
- Check browser console for errors (F12 → Console tab)

**Problem: Data not saving**
- Make sure she's using a modern browser (Chrome, Firefox, Safari, Edge)
- Check that browser storage isn't disabled

## 📱 Mobile Access
- Natasha can add the website to her phone's home screen for easy access
- **iPhone**: Safari → Share → Add to Home Screen
- **Android**: Chrome → Menu → Add to Home Screen

## 🆘 Need Help?
If you run into issues:
1. Check Vercel's deployment logs in the dashboard
2. Google the specific error message
3. Vercel has excellent documentation at [vercel.com/docs](https://vercel.com/docs)

---

**Estimated Time:** 15-20 minutes total
**Cost:** FREE (Vercel's free tier is very generous)
