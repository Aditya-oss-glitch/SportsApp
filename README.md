# 🏆 SportsHub - Sports Tournament Platform

A modern, interactive web application for managing sports tournaments, player registrations, and competitions.

## ✨ Features

- 🎨 **Modern UI/UX** - Beautiful, responsive design with smooth animations
- 🏃 **Player Registration** - Easy registration with form validation
- 👥 **Team Registration** - Register teams with multiple players
- 🏆 **Tournament Management** - Create and view tournaments
- 📚 **Sports Rules** - Comprehensive rules and information for all sports
- 🎯 **Interactive Sports Cards** - Click to learn about each sport
- 📊 **Google Sheets Integration** - All data saved to Google Sheets (optional)
- 📱 **Responsive Design** - Works on all devices
- ⚡ **Real-time Updates** - Dynamic data fetching from backend
- 🎯 **Interactive Elements** - Hover effects, transitions, and micro-interactions
- ⚙️ **Admin Dashboard** - Create tournaments and manage events
- 🤝 **Partners Section** - Showcase sponsors and partners

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd SportsApp
   ```

2. **Install Backend Dependencies**
   ```bash
   cd Backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../Frontend
   npm install
   ```

### Running the Application

#### Option 1: Run Separately (Recommended for Development)

**Terminal 1 - Backend:**
```bash
cd Backend
npm start
```
Backend will run on `http://localhost:5001`

**Terminal 2 - Frontend:**
```bash
cd Frontend
npm run dev
```
Frontend will run on `http://localhost:5173`

#### Option 2: Using npm scripts (if configured)

```bash
# From root directory
npm run dev:backend  # Start backend
npm run dev:frontend # Start frontend
```

## 🔧 Configuration

### Backend Configuration

1. **Create `.env` file in Backend directory:**
   ```env
   PORT=5001
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5173
   ```

2. **Optional: Google Sheets Integration**
   
   To enable Google Sheets for data persistence:
   
   - Create a Google Cloud Project
   - Enable Google Sheets API
   - Create a Service Account
   - Download credentials JSON
   - Add to `.env`:
     ```env
     GOOGLE_CLIENT_EMAIL=your-service-account@project.iam.gserviceaccount.com
     GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
     GOOGLE_SHEET_ID=your-sheet-id
     ```
   
   **Note:** The app works perfectly without Google Sheets using mock data!

### Frontend Configuration

Create `.env` file in Frontend directory (optional):
```env
VITE_API_URL=http://localhost:5001/api
```

### Google Sheets Setup

For complete data persistence, see [GOOGLE_SHEETS_SETUP.md](./GOOGLE_SHEETS_SETUP.md) for detailed instructions.

**Quick Setup:**
1. Create Google Cloud Project
2. Enable Google Sheets API
3. Create Service Account
4. Download JSON credentials
5. Create Google Sheet with proper headers
6. Share sheet with service account
7. Add credentials to Backend `.env` file

**Note:** The app works perfectly without Google Sheets using mock data!

## 📁 Project Structure

```
SportsApp/
├── Backend/
│   ├── routes/
│   │   ├── register.js      # Player registration endpoints
│   │   ├── tournaments.js   # Tournament management endpoints
│   │   └── sports.js        # Sports information endpoints
│   ├── server.js            # Express server setup
│   ├── sheets.js            # Google Sheets integration
│   └── package.json
│
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx   # Navigation component
│   │   │   └── Card.jsx     # Reusable card component
│   │   ├── pages/
│   │   │   ├── Home.jsx     # Home page with hero section
│   │   │   ├── Register.jsx # Player registration form
│   │   │   ├── TeamRegister.jsx # Team registration form
│   │   │   ├── Tournament.jsx # Tournament listing
│   │   │   ├── SportDetails.jsx # Sport rules and details
│   │   │   ├── Admin.jsx    # Admin dashboard
│   │   │   ├── Partners.jsx # Partners and sponsors
│   │   │   └── About.jsx    # About and contact page
│   │   ├── config/
│   │   │   └── api.js       # API configuration
│   │   ├── App.jsx          # Main app component
│   │   ├── main.jsx         # React entry point
│   │   └── styles.css       # Global styles
│   └── package.json
│
└── README.md
```

## 🔌 API Endpoints

### Health Check
- `GET /health` - Check if backend is running

### Registration
- `POST /api/register` - Register a new player
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "sport": "Football",
    "age": 25
  }
  ```

### Teams
- `POST /api/teams` - Register a new team
- `GET /api/teams` - Get all teams

### Tournaments
- `GET /api/tournaments` - Get all tournaments
- `POST /api/tournaments` - Create a new tournament
  ```json
  {
    "name": "Summer Championship",
    "sport": "Cricket",
    "date": "2024-07-15",
    "venue": "Main Stadium",
    "format": "T20",
    "prize": "$5,000"
  }
  ```

### Sports
- `GET /api/sports` - Get all available sports
- `GET /api/sports/:sportName` - Get specific sport details

## 🎨 Tech Stack

### Frontend
- **React 18** - UI library
- **React Router** - Client-side routing
- **Framer Motion** - Animations
- **Vite** - Build tool
- **CSS3** - Styling with modern features

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **CORS** - Cross-origin resource sharing
- **Google Sheets API** - Data persistence (optional)

## 🛠️ Development

### Backend Development
- Server runs on port 5000 by default
- Hot reload not configured (restart server after changes)
- Check console for API logs

### Frontend Development
- Vite dev server with hot module replacement
- Changes reflect immediately
- Check browser console for errors

## 🐛 Troubleshooting

### Backend not connecting?
- Check if backend is running on port 5000
- Verify CORS settings in `server.js`
- Check `.env` file configuration

### Frontend can't reach backend?
- Ensure backend is running
- Check `VITE_API_URL` in frontend `.env`
- Verify CORS allows your frontend URL

### Google Sheets errors?
- App works without Google Sheets (uses mock data)
- Check service account credentials
- Verify sheet ID is correct
- Ensure sheet has proper headers

## 📝 License

This project is open source and available for use.

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

---

**Made with ❤️ for sports enthusiasts**
