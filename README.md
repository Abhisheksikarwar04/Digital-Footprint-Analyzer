# Digital Footprint Analyzer (DFA)

Digital Footprint Analyzer (DFA) is a production-style MERN application that analyzes a user's email and optional username to estimate online exposure and generate an explainable risk report.

It produces:
- A risk score from 0 to 100
- A risk level: LOW, MEDIUM, or HIGH
- A factor-wise breakdown
- Actionable security recommendations

## Features

### Backend
- Layered architecture: Controller -> Service -> Utility
- Async workflows with `async/await`
- Parallel service execution with `Promise.all`
- Joi validation and standard error responses
- Helmet and rate limiting for basic API security
- SHA-256 email hashing before database storage
- MongoDB persistence with TTL expiration
- JWT demo authentication support
- In-memory caching and timeout utility support

### Risk engine
- Weighted scoring model capped at 100
- Explainable scoring across five factors:
  - Breach Exposure (0-40)
  - Password Strength (0-20)
  - Username Presence (0-15)
  - Email Hygiene (0-15)
  - Security Posture (0-10)
- Recommendation generation based on detected risk signals

### Frontend
- React + Vite + Tailwind UI
- Home page with scan form and validation
- Results page with:
  - Risk score and level
  - Breakdown visualization
  - Breach list
  - Public profile list
  - Recommendation cards
- Dark mode toggle
- PDF export support

## Tech stack

| Layer | Technologies |
|------|--------------|
| Frontend | React, Vite, Tailwind CSS, Axios, Recharts, jsPDF |
| Backend | Node.js, Express, Joi, JWT, Helmet, express-rate-limit |
| Database | MongoDB, Mongoose |
| Utilities | SHA-256 hashing, in-memory cache, timeout wrapper |



## How it works

1. The user enters an email and optional username on the frontend.
2. The frontend sends a scan request to the backend.
3. The backend creates a scan record and immediately returns a `scanId` with `processing` status.
4. The scan service runs breach lookup, email checks, and username presence analysis in parallel using `Promise.all`.
5. The risk engine computes a weighted score, breakdown, level, and recommendations.
6. The result is stored in MongoDB.
7. The frontend polls the scan result endpoint until the analysis is completed.
8. The final result is shown in a dashboard view.

## Local setup

### Prerequisites
- Node.js 18+
- npm
- MongoDB Community Server or MongoDB Atlas

### Backend
```bash
cd server
cp .env.example .env
npm install
npm run dev
```

### Frontend
```bash
cd client
npm install
npm run dev
```

### MongoDB
For local MongoDB, make sure the database server is running before starting the backend.

## Docker setup

If you want to avoid installing MongoDB locally, the project can be run with Docker Compose using three containers: MongoDB, backend, and frontend.

Typical command:

```bash
docker compose up --build
```

## Security notes
- Raw passwords are never stored
- Emails are hashed before persistence
- Rate limiting is enabled
- Helmet is enabled
- Environment variables are used for secrets and runtime configuration

## Use cases
- Personal exposure analysis
- Security awareness demos
- Portfolio-grade MERN project showcase
- Explainable risk scoring prototype

## Future improvements
- Real breach API integrations
- Redis caching
- User accounts and saved history
- Report sharing and email delivery
- Stronger posture analysis signals

## License

This project is published under the MIT License.
