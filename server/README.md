# Backend Setup — FitLife Hub

This directory contains the Node.js/Express backend for FitLife Hub, which connects to Microsoft SQL Server using the `mssql` driver.

## 1. Local Development Architecture

Each team member maintains an independent local development environment:

```text
React (localhost:5173)
    ↓ HTTP
Express (localhost:4000)
    ↓ SQL Server connection
Local SQL Server (FitLifeHubDB)
```

SQL Server stores the application's data, while SQL Server Management Studio (SSMS) is used to manage and inspect the database.

## 2. Prerequisites

Before running the backend, ensure that you have:

- Node.js and npm
- Microsoft SQL Server
- SQL Server Management Studio (SSMS)
- Git and access to the project repository

## 3. Local SQL Server Connection Setup

Each team member is responsible for configuring their own local SQL Server instance.

Follow these general steps:

1. **Install and verify SQL Server**
   - Install a supported SQL Server edition and SSMS.
   - Identify the SQL Server instance you intend to use.
   - Verify that you can connect to the instance through SSMS.

2. **Create the project database**
   - Create `FitLifeHubDB` using the SQL scripts in `database/`.
   - Apply schema definitions, constraints, and required database objects in the documented order.

3. **Configure SQL Server networking**
   - Enable TCP/IP for the selected SQL Server instance.
   - Configure a listening port (typically `1433`).
   - Restart the corresponding SQL Server service to apply configuration changes.
   - Verify that SQL Server is accepting TCP connections.

4. **Configure SQL Server authentication**
   - Enable SQL Server Authentication if using a SQL login.
   - Create a dedicated login for the application.
   - Map the login to `FitLifeHubDB` and grant the necessary database permissions.
   - Verify the credentials by connecting through SSMS.

5. **Configure backend environment variables**
   - Copy `server/.env.example` to `server/.env`.
   - Update the database host, port, name, username, and password to match your local SQL Server configuration.
   - Configure encryption and certificate trust settings appropriately for your environment.
   - Never commit `.env` or actual credentials to GitHub.

6. **Verify backend connectivity**
   - Install the project dependencies.
   - Start the Express backend.
   - Verify that the application connects successfully to `FitLifeHubDB`.
   - Test a database-backed API endpoint before implementing additional features.

Consult the official Microsoft SQL Server and `mssql` documentation if you encounter instance, networking, authentication, or connection issues.

## 4. Team Database Workflow

**The team follows this approach: one local SQL Server database per member.**

Each member runs an independent copy of `FitLifeHubDB` on their own computer.

### Shared through GitHub

- Database schema and migration scripts
- Stored procedures, functions, and triggers
- Indexes, partitions, and optimization scripts
- Test data generators and seed scripts
- Backend and frontend source code
- Benchmark scripts, results, and documentation

### Maintained locally

- SQL Server installation and instance configuration
- Local `FitLifeHubDB` database and its actual records
- Database login credentials and `.env`
- Local SQL Server service and networking configuration

### Development Workflow

1. Pull the latest changes from `main`.
2. Apply any new database migration scripts to your local database.
3. Develop and test your assigned functionality against your local SQL Server.
4. Commit the corresponding SQL scripts whenever database objects or schemas change.
5. Create a pull request and request review before merging changes into `main`.
6. After merging, notify teammates if new migrations or seed updates must be applied.

### Database Conventions

- **SQL scripts in GitHub are the source of truth for database structure.**
- Do not rely on manual changes made exclusively through SSMS.
- Maintain database changes through version-controlled scripts.
- Do not modify previously applied migration files; create new migrations instead.
- Respect foreign key relationships when generating test data.
- Avoid committing large database backups or generated datasets unless explicitly required.
- Keep performance benchmarks reproducible by documenting the dataset, SQL queries, and optimization settings.

**Important:** Git synchronizes source code and SQL scripts, not the actual database contents. Pulling the repository does not automatically update your local SQL Server database.