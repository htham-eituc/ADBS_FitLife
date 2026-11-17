# FitLife Hub

**FitLife Hub** is a database-driven management system for a fitness center chain, developed as part of **CSC12002 – Advanced Database Systems** at the University of Science, VNU-HCM.

The system manages multiple fitness branches, members, service subscriptions, gym check-ins, personal trainer bookings, billing, loyalty programs, inventory, and staff operations.

The project focuses on **physical database design, transaction management, query optimization, indexing, partitioning, and performance evaluation** using Microsoft SQL Server.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, Vite |
| Backend | Node.js, Express |
| Database | Microsoft SQL Server |
| Database Management | SQL Server Management Studio (SSMS) |

## Architecture

```text
React + Vite (localhost:5173)
          |
          | HTTP / REST API
          v
Node.js + Express (localhost:4000)
          |
          | mssql driver
          v
Microsoft SQL Server
      FitLifeHubDB
```

Each team member uses a **local SQL Server instance** for independent development. Database schemas, migrations, and scripts are synchronized through GitHub.

## Project Structure

```text
fitlife-hub/
├── client/         # React frontend
├── server/         # Express REST API
├── database/       # SQL scripts, migrations, seeds, benchmarks
├── docs/           # Project documentation and reports
├── scripts/        # Development utilities
└── README.md
```

## Getting Started

### 1. Prerequisites

- Node.js and npm
- Microsoft SQL Server
- SQL Server Management Studio (SSMS)
- Git

### 2. Clone and install

```bash
git clone <repository-url>
cd fitlife-hub
npm install
```

### 3. Set up the database

Create a local SQL Server database named `FitLifeHubDB` and apply the database scripts in `database/` according to their documented execution order.

Configure SQL Server networking and authentication so the backend can connect to your local instance.

See [Backend Setup Guide](server/README.md) for details.

### 4. Configure environment variables

Create `server/.env` from `server/.env.example` and update the database connection settings:

```dotenv
PORT=4000

DB_SERVER=127.0.0.1
DB_PORT=1433
DB_NAME=FitLifeHubDB
DB_USER=fitlife_dev
DB_PASSWORD=your_password

DB_ENCRYPT=false
DB_TRUST_SERVER_CERTIFICATE=true
```

The encryption settings shown are intended for local development only. Never commit actual credentials to GitHub.

If required, also create `client/.env` from `client/.env.example`.

### 5. Start the application

From the repository root:

```bash
npm run dev
```

Or start the applications separately:

```bash
npm run dev:server
npm run dev:client
```

Once running:

| Service | URL |
|---|---|
| Frontend | http://localhost:5173 |
| Backend | http://localhost:4000 |
| API Health Check | http://localhost:4000/api/health |

These commands assume the npm workspace scripts and API health endpoint have been configured.

## Development Workflow

1. Pull the latest changes from `main`.
2. Apply new database migrations to your local SQL Server.
3. Create a feature branch for your assigned task.
4. Implement and test your changes locally.
5. Commit source code and relevant SQL scripts.
6. Open a pull request for review before merging.

**Note:** Git synchronizes SQL scripts, not live database contents. Every member is responsible for keeping their local database up to date.

## Documentation

- [Backend Setup Guide](server/README.md)
- [Database Scripts](database/)
- [Project Documentation](docs/)