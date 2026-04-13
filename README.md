# Quote Draft & Versioning System

## 📌 Overview

This system allows users to create, manage, and publish quotes with full version tracking and document versioning.

Key capabilities:

* Draft quote creation
* Line item management
* Automatic totals calculation (backend-driven)
* Quote publishing with immutable version snapshots
* Document upload with versioning

---

## 🏗️ Architecture

### Backend (Laravel)

* REST API using Laravel
* PostgreSQL database
* Service Layer (QuoteService, DocumentService)
* Action Pattern (PublishQuoteAction)
* API Resources for response formatting
* FormRequest for validation
* Global API response & error handling

### Frontend (Next.js)

* App Router + TypeScript
* Modular architecture (`modules/`)
* Zustand for state management
* Axios with response interceptor
* Separation of concerns:

  * services (API calls)
  * hooks (logic)
  * components (UI)

---

## ⚙️ Setup Instructions

### 1. Backend Setup

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
```

Configure PostgreSQL:

```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=quote_db
DB_USERNAME=quote_user
DB_PASSWORD=password123
```

Run:

```bash
php artisan migrate
php artisan serve
```

---

### 2. Frontend Setup

```bash
cd frontend
npm install
cp .env.local.example .env.local
```

Set API URL:

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api
```

Run:

```bash
npm run dev
```

---

## 🔁 System Flow

1. User creates a quote (draft)
2. Adds/updates/removes line items
3. Backend recalculates totals
4. User publishes quote
5. System creates immutable version snapshot
6. Documents can be uploaded and versioned

---

## 🧠 Key Decisions

### 1. Backend-driven totals

All financial calculations are done on the backend to ensure consistency and prevent manipulation.

### 2. Versioning Strategy

Publishing a quote creates a snapshot (QuoteVersion + items + documents), ensuring historical accuracy.

### 3. Modular Frontend

Frontend is split into modules to improve scalability and maintainability.

### 4. API Standardization

All responses follow a consistent format:

* success
* message
* data
* errors

---

## ⚠️ Assumptions

* Tax calculation is simplified (fixed or backend-calculated)
* No authentication required for this assessment
* File storage uses local disk (can be extended to S3)

---

## 🚀 Future Improvements

* Authentication & authorization
* Role-based access
* Pagination & filtering
* Cloud storage for documents
* CI/CD pipeline
* Dockerization

---

## 🧪 Testing

Basic manual testing performed:

* Quote creation
* Line item CRUD
* Publish flow
* Document versioning

---
## ☁️ AWS Deployment Strategy
* Choice of Services For a production-ready version of this module, the following AWS services are recommended:Frontend: AWS Amplify or S3 + CloudFront for hosting the Next.js static export (or App Runner if using SSR).
* Backend API: AWS App Runner or Elastic Beanstalk. These provide scalable, managed environments for containerized Laravel applications.
* Database: Amazon RDS (PostgreSQL) for managed backups, multi-AZ high availability, and encryption at rest.File Storage: Amazon S3 to store versioned document uploads securely.
* Secure Environment Management Environment variables will never be stored in the repository.AWS Secrets Manager: Used to store sensitive data like database credentials and API keys.Parameter Store (SSM): Used for non-sensitive configuration data.Runtime Injection: The CI/CD pipeline or the App Runner service will inject these variables into the container environment at runtime.
* CI/CD Pipeline Structure The workflow is divided into two stages to support a professional Git workflow:Staging (Development Branch):Triggered on push to development.Runs PHPUnit tests, Pest, and Vitest/Cypress. Automatically deploys to a staging environment (e.g., api-staging.example.com).Production (Main Branch):Triggered via a Pull Request from development to main.Requires a manual approval gate in GitHub Actions.Executes database migrations using a pre-deployment hook and triggers a rolling update to the production environment to ensure zero downtime.
