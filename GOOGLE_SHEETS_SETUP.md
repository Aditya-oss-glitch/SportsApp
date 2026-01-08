# 📊 Google Sheets Setup Guide

This guide will help you set up Google Sheets as your database for SportsHub.

## Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **Google Sheets API**:
   - Go to "APIs & Services" > "Library"
   - Search for "Google Sheets API"
   - Click "Enable"

## Step 2: Create a Service Account

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "Service Account"
3. Fill in the details:
   - Service account name: `sportshub-api`
   - Click "Create and Continue"
   - Skip role assignment (click "Continue")
   - Click "Done"

## Step 3: Create and Download Key

1. Click on the service account you just created
2. Go to "Keys" tab
3. Click "Add Key" > "Create new key"
4. Choose "JSON" format
5. Download the JSON file (keep it secure!)

## Step 4: Create Google Sheet

1. Go to [Google Sheets](https://sheets.google.com/)
2. Create a new spreadsheet
3. Name it "SportsHub Database"
4. Create the following sheets (tabs at the bottom):

### Sheet 1: "Registrations"
Headers in Row 1:
```
Timestamp | Name | Email | Phone | Sport | Age
```

### Sheet 2: "Teams"
Headers in Row 1:
```
Timestamp | Team Name | Sport | Captain Name | Captain Email | Captain Phone | Player Count | Player Names
```

### Sheet 3: "Tournaments"
Headers in Row 1:
```
Name | Sport | Date | Venue | Format | Prize | Participants | Status
```

### Sheet 4: "Partners"
Headers in Row 1:
```
Timestamp | Partner Type | Organization Name | Contact Person | Email | Phone | Website | Address | Description | Services
```

### Sheet 5: "Matches" (Optional for future)
Headers in Row 1:
```
Tournament ID | Match Date | Team 1 | Team 2 | Score | Winner | Status
```

## Step 5: Share Sheet with Service Account

1. Open your Google Sheet
2. Click "Share" button (top right)
3. Add the **Service Account Email** (from the JSON file, it looks like: `xxx@xxx.iam.gserviceaccount.com`)
4. Give it **Editor** permissions
5. Click "Send"

## Step 6: Get Your Sheet ID

1. Open your Google Sheet
2. Look at the URL: `https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit`
3. Copy the `SHEET_ID_HERE` part (long string of letters and numbers)

## Step 7: Configure Backend

1. Open the downloaded JSON file
2. Find these values:
   - `client_email` (Service Account Email)
   - `private_key` (Private Key - keep the `\n` characters)

3. Create `.env` file in `Backend/` directory:

```env
PORT=5001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# Google Sheets Configuration
GOOGLE_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=your-sheet-id-here
```

**Important Notes:**
- Keep the `\n` characters in the private key
- Wrap the private key in quotes
- Never commit the `.env` file to git

## Step 8: Test the Setup

1. Start your backend server:
   ```bash
   cd Backend
   npm start
   ```

2. You should see: `✅ Google Sheets API configured`

3. Try registering a player through the website

4. Check your Google Sheet - the data should appear!

## Troubleshooting

### "Permission denied" error
- Make sure you shared the sheet with the service account email
- Check that the service account has Editor permissions

### "Sheet not found" error
- Verify the sheet name matches exactly (case-sensitive)
- Check that the sheet ID is correct

### "Invalid credentials" error
- Verify the private key includes `\n` characters
- Make sure the private key is wrapped in quotes in `.env`
- Check that the service account email is correct

## Alternative: Use Without Google Sheets

The app works perfectly without Google Sheets! It will:
- Log all data to console
- Work with mock data
- Still function normally

Just don't set the Google Sheets environment variables, and the app will use mock mode.

---

**Need Help?** Check the console logs for detailed error messages.
