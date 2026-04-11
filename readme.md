# Taskflow-KJ

Taskflow-KJ is a modern web application designed to manage tasks and projects efficiently. Built with React, TypeScript, and TailwindCSS, it provides a robust and scalable solution for task management.

## Features

- **Authentication**: Secure login and registration system.
- **Task Management**: Create, update, and manage tasks.
- **Project Management**: Organize tasks into projects.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Customizable Themes**: Light and dark mode support.

## Tech Stack

- **Frontend**: React, TypeScript, TailwindCSS
- **Routing**: React Router
- **State Management**: Context API
- **Build Tool**: Vite
- **Linting**: ESLint

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Development

To start the development server:
```bash
npm run dev
```

## Build

To build the project for production:
```bash
npm run build
```

## Preview

To preview the production build:
```bash
npm run preview
```

## Folder Structure

- **src/**: Contains the main application code.
  - **components/**: Reusable UI components.
  - **pages/**: Application pages.
  - **hooks/**: Custom React hooks.
  - **lib/**: Utility functions and constants.
  - **types/**: TypeScript type definitions.


## Architecture Decisions

1. Strategic Project Structure

Problem: Frontend grows into spaghetti code — hard to debug or extend

Solution: Layered architecture — hooks/ for state, lib/ for utilities, logic kept out of UI

Outcome: UI changes don't break business logic. Scalable and testable.

imporvements: can do more code splitting for some component, i tried doing it but left it because of time limit  ex- taskSheet and taskTable


2.  Authentication & State Hydration

Problem: Session management with no dedicated backend

Solution: Mock-JWT via React Context — login generates token + expiresAt (60 min TTL), AuthContext wraps the app for global access and protected routes

Outcome: Simulates production-grade auth flow without a real backend

intentionally left : my login with credetials is working but the regitration is not 

3. Persistence & Data Strategy

Problem: Data lost on page refresh

Solution: Hybrid persistence — Projects use localStorage (persists across sessions), Tasks use a JSON mock layer (state-only)

⚠ Trade-off: Task edits are volatile. Next iteration migrates tasks to localStorage to match project persistence.

limitation: locastorage have 5 mb of storage so no execessive tasks can be stored

4. Global Theming (Dark/Light Mode)

Problem: Theme must persist and load without a flash (FOUC)

Solution: ThemeContext injects .dark/.light on root <html>. On mount, checks localStorage first, falls back to prefers-color-scheme

Outcome: No FOUC. Respects OS preference. Persists across sessions.

Impact: This ensures a seamless UI transition and prevents "Flash of Unstyled Content" (FOUC), providing a modern, professional feel to the application.


## Future additons
1. Make the registration work also

2. Add a service that will send the email to the assigned useed that their taks is pending

3. Add a proper database to store the tasks

4. after logging in user can shift the owner ship of the project to differnt user right now its limited to the user 

5. Improve my codebase quality

6. Making the taks draggable up and down