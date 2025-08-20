# Clumsy Apparel

A .NET + React application for managing apparel products.

---
## Tech Stack

**Frontend**
- React.js
- Vite (development server & bundler)
- Reactstrap (Bootstrap components & styling)

**Backend**
- .NET 8 Web API
- Entity Framework Core
- PostgreSQL (database)

**Tooling**
- npm (package management)
- dotnet CLI
- User Secrets (for local environment configuration)

---

## Prerequisites

Make sure the following are installed on your machine:

- [.NET 8 SDK](https://dotnet.microsoft.com/download)
- [Node.js & npm](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/download/) (required for the database)

> **Optional**: You may use [pgAdmin](https://www.pgadmin.org/) or another database tool to manage PostgreSQL, but it is not required.

---


## Installation

1. Clone the repository:
   ```bash
   git clone git@github.com:jaymenelson56/Clumsy-Apparel.git
   cd Clumsy-Apparel
2. Initialize user secrets:
   ```bash
   dotnet user-secrets init
3. Add your PostgreSQL connection string:
   ```bash
   dotnet user-secrets set clumsyapparelDbContextDbConnectionString "Host=localhost;Port=5432;Username=postgres;Password=<your password>;Database=clumsyapparelDbContext"
   ```
   Replace <your password> with your local PostgreSQL password.
4. Apply database migrations:
   ```bash
   dotnet ef database update
5. Start the backend API:
   ```bash
   dotnet run
6. In a separate terminal navigate to the client folder:
   ```bash
   cd client
   npm install
   npm run dev
7. Open the application in your browser:
   ```bash
   http://localhost:3000
   
   

