# Task Plan: Run Project and Fix Admin Portal Errors

## 📋 Overview
The goal is to start the full-stack Pawsitive project (AI Core, Backend, Frontend), log in as admin, identify any present errors in the admin portal, and fix them.

---

## 🛠️ Phase 1: Environment & Dependency Setup
- [ ] Create/Update `.env` files for `backend` and `aicore` (copy from `.env.example`).
- [ ] Install Python dependencies for `aicore`.
- [ ] Install Node.js dependencies for `backend` and `frontend`.

## 🗄️ Phase 2: Database & Server Initialization
- [ ] Run `python setup_database.py` in `aicore` to initialize PostgreSQL database and seed data.
- [ ] Start `aicore` API server (FastAPI) on port 8000.
- [ ] Start `backend` server (Express) on port 5001.
- [ ] Start `frontend` server (Vite/React) on port 5173.

## 🌐 Phase 3: Browser Automation & Bug Discovery
- [ ] Open browser to `http://localhost:5173/login` (or admin login page).
- [ ] Log in with `admin@pawsitive.com` / `Pawsitive@2024`.
- [ ] Navigate to the Admin dashboard.
- [ ] Monitor console logs and network requests for errors (4xx, 5xx, JS crashes).

## 🔧 Phase 4: Systematic Debugging & Fixing
- [ ] Trace identified errors to backend/frontend source code.
- [ ] Apply fixes using `debugger` and specialist agents.
- [ ] Verify fixes in the browser.

---

## 🚦 Verification Criteria
- All three services (`aicore`, `backend`, `frontend`) are running without crashing.
- Admin login is successful.
- Admin dashboard loads without console/network errors.
- Any initially discovered bugs are resolved.

## 🤖 Agent Assignments
| Agent | Role |
|-------|------|
| `devops-engineer` | Environment setup, service startup, and DB initialization. |
| `frontend-specialist` | UI bug investigation and fixing. |
| `backend-specialist` | API bug investigation and fixing. |
| `debugger` | Root cause analysis for complex issues. |
| `orchestrator` | Overall coordination and browser interaction. |
