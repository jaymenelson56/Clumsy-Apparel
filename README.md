# Clumsy Apparel

A .NET 8 + Next.js Electron desktop application for managing apparel products.

---
## Tech Stack

**Frontend**
- Next.js 15 (React framework)
- Reactstrap (Bootstrap components)

**Backend**
- .NET 8 Web API
- Entity Framework Core
- SQLite (embedded database)

**Desktop**
- Electron (cross-platform desktop wrapper)

---

## Prerequisites

Make sure the following are installed on your machine:

- [.NET 8 SDK](https://dotnet.microsoft.com/download)
- [Node.js & npm](https://nodejs.org/)


---


## Development Setup

1. Clone the repository:
   ```bash
   git clone git@github.com:jaymenelson56/Clumsy-Apparel.git
   cd Clumsy-Apparel
2. **Configure database:**
```bash
   dotnet user-secrets init
   dotnet user-secrets set clumsyapparelDbConnectionString "Data Source=clumsyapparel.db"
```

3. **Apply migrations:**
```bash
   dotnet ef database update
```
4. **Install frontend dependencies:**
```bash
   cd client
   npm install
```
5. **Run in development mode:**
   
    **Electron app (recommended):**
```bash
   cd client
   npm run electron
```
   This automatically starts both backend and frontend.

   **Web only (alternative):**
```bash
   # Terminal 1 - Backend
   dotnet run
   
   # Terminal 2 - Frontend
   cd client
   npm run dev
```
   Open http://localhost:3000

---

## Building for Production

1. **Ensure connection string in appsettings.json:**
```json
   {
     "clumsyapparelDbConnectionString": "Data Source=clumsyapparel.db"
   }
```

2. **Build installer:**
```bash
   cd client
   npm run dist:win
```
   This automatically builds backend, frontend, and packages everything.

3. **Installer location:**
```
   dist/Clumsy Apparel Setup 0.1.0.exe
```
   You might have to put this block in quotes.

---
## Using the Application

**Starting the app:**
- Double-click the desktop shortcut or Start Menu entry
- App minimizes to system tray (bottom-right, near clock)

**Quitting the app:**
- Right-click the tray icon → **Quit**
- Or from menu bar: **File → Quit**
- Simply closing the window only hides it to tray

**Accessing hidden app:**
- Click the tray icon to show/hide the window
- Or right-click tray icon → **Show App**

---

## Scripts

**Development:**
- `npm run electron` - Run Electron app (auto-starts backend & frontend)
- `npm run dev` - Start Next.js dev server only

**Production:**
- `npm run dist:win` - Build complete Windows installer (handles everything)
- `npm run build` - Build Next.js only
- `npm run build:backend` - Copy frontend to backend wwwroot
- `npm run build:dotnet` - Publish .NET backend only

---

## Database

The app uses SQLite with a single file database (`clumsyapparel.db`). Database is automatically created and migrated on first run. No manual setup required for packaged app.

