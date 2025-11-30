# VividCanvas – PlacementPanic Full‑Stack TypeScript Interview Prep Platform

VividCanvas (based on the PlacementPanic stack) is a full‑stack TypeScript web application that helps students and job‑seekers prepare for technical interviews. It provides authentication, user profiles, and interview‑focused features on top of a modern React + Node.js + PostgreSQL stack.

## Features

- User authentication (sign up, login, protected routes) backed by a TypeScript Express API.
- User profiles for storing basic details and interview preferences.
- Interview preparation flows (sessions, questions, progress tracking) powered by a PostgreSQL database and Drizzle ORM.
- Shared TypeScript types between client and server for end‑to‑end type safety.
- Production‑ready deployment setup (Railway and alternatives) plus Replit support.

## Tech Stack

**Frontend**
- React + Vite (in the `client` folder).
- Tailwind CSS (configured via `tailwind.config.ts` and `postcss.config.js`).

**Backend**
- Node.js + Express with TypeScript (in the `server` folder).
- Drizzle ORM with PostgreSQL (configured via `drizzle.config.ts`).

**Tooling & Infra**
- Monorepo managed by root `package.json` and `package-lock.json`.
- Deployment guides for Railway and other platforms in `DEPLOYMENT_*.md`.
- Replit support via `.replit` and `replit.md`.

## Project Structure

```
VividCanvas/
  client/          # React + Vite frontend
  server/          # Express + TypeScript backend
  shared/          # Shared types and utilities
  script/          # Scripts and tooling helpers
  attached_assets/ # Assets used by docs and guides
  BACKEND_SETUP.md
  DEPLOYMENT_INDEX.md
  DEPLOYMENT_QUICKSTART.md
  DEPLOYMENT_RAILWAY.md
  DEPLOYMENT_ALTERNATIVES.md
  FIX_NPM_DEPLOYMENT.md
  design_guidelines.md
  drizzle.config.ts
  package.json
  package-lock.json
  tsconfig.json
  tailwind.config.ts
  vite.config.ts
```

## Getting Started (Local Development)

### 1. Clone and Install

```
git clone https://github.com/nayankamal305-hub/VividCanvas.git
cd VividCanvas
npm install
```

### 2. Backend Setup

Follow the detailed instructions in `BACKEND_SETUP.md` for:

- Creating a PostgreSQL database (Neon, Railway, or local).
- Setting environment variables in a `.env` file.
- Running Drizzle migrations.
- Starting the backend server.

### 3. Run the Frontend

From the project root (or `client` folder, depending on scripts in `package.json`):

```
npm run dev
```

Then open the shown URL in your browser to access the app.

## Deployment

Use the deployment documentation included in the repo:

- `DEPLOYMENT_QUICKSTART.md` – step‑by‑step quick start.
- `DEPLOYMENT_RAILWAY.md` – full guide for deploying to Railway.
- `DEPLOYMENT_ALTERNATIVES.md` – notes for other platforms (e.g., Render).
- `FIX_NPM_DEPLOYMENT.md` – how to fix NPM lockfile issues during deploy.

## Contributing

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes with clear messages.
4. Open a pull request describing what you changed.

## License

This project is for educational and interview‑preparation purposes. Add your preferred license here (e.g., MIT) and create a `LICENSE` file if required.
