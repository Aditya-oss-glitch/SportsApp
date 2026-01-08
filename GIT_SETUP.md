# 🔧 Git Setup Instructions

Since there are permission restrictions, please run these commands in your terminal to set up git and prepare for deployment.

## Step 1: Initialize Git Repository

Open your terminal and navigate to the project directory, then run:

```bash
cd /Users/mac_0s/Documents/SportsApp
git init
```

## Step 2: Add All Files

```bash
git add .
```

## Step 3: Create Initial Commit

```bash
git commit -m "Initial commit - SportsHub app ready for Render deployment"
```

## Step 4: Create GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the **"+"** icon → **"New repository"**
3. Name it: `SportsApp` (or your preferred name)
4. **Don't** initialize with README, .gitignore, or license (we already have these)
5. Click **"Create repository"**

## Step 5: Connect Local Repository to GitHub

After creating the GitHub repository, GitHub will show you commands. Use these:

```bash
# Add the remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/SportsApp.git

# Rename branch to main (if needed)
git branch -M main

# Push your code
git push -u origin main
```

## Step 6: Verify

Check that your code is on GitHub by visiting:
`https://github.com/YOUR_USERNAME/SportsApp`

## Next Steps

Once your code is on GitHub, follow the instructions in `RENDER_DEPLOYMENT.md` to deploy to Render.

---

**Note**: If you encounter any issues, make sure:
- You have git installed: `git --version`
- You're logged into GitHub: `gh auth login` (if using GitHub CLI)
- Your GitHub account has permission to create repositories

