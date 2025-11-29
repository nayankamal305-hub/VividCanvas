# PlacementPanic - AI Mock Interview Panic Buster

## Overview

PlacementPanic is a full-stack web application designed to help computer science students overcome interview anxiety through realistic mock interviews, AI-powered feedback, and comprehensive performance analytics. The platform provides timed interview sessions across multiple categories (DSA, Web Development, Java, System Design, HR) with self-rating mechanisms and detailed progress tracking.

The application follows a modern monorepo structure with a TypeScript-based React frontend and Express backend, utilizing PostgreSQL for data persistence and JWT-based authentication for security.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack**: React with TypeScript, using Vite as the build tool and bundler.

**UI Framework**: The application uses shadcn/ui components (a collection of Radix UI primitives) with Tailwind CSS for styling. This provides accessible, customizable components with a consistent design system.

**Design System**: Dark-themed interface following a glassmorphism aesthetic with:
- Primary color scheme: Indigo (#6366F1), Purple (#8B5CF6), Cyan (#06B6D4)
- Typography: Inter for body text, Poppins for display/headlines
- Spacing system based on Tailwind's 4px unit scale
- Glass cards with backdrop blur effects and subtle borders

**State Management**:
- Zustand for authentication state (persisted to localStorage)
- TanStack Query (React Query) for server state management and caching
- Form handling via React Hook Form with Zod validation

**Routing**: Client-side routing using Wouter (lightweight alternative to React Router).

**Key Features**:
- Protected routes requiring authentication
- Public-only routes (redirect authenticated users away from login/signup)
- Mock interview session with countdown timer and question progression
- Dashboard with animated statistics and performance metrics
- Responsive design with mobile-first approach

### Backend Architecture

**Technology Stack**: Node.js with Express, TypeScript for type safety.

**API Design**: RESTful JSON API with the following main routes:
- `/api/auth/*` - User authentication (signup, login)
- `/api/questions/*` - Question bank management and retrieval
- `/api/interviews/*` - Interview session management and statistics

**Authentication Strategy**: JWT-based authentication with:
- bcrypt for password hashing (10 salt rounds)
- JWT tokens issued on successful login
- Bearer token authentication middleware for protected routes
- Token validation on each protected request

**Data Layer**: 
- In-memory storage implementation (`MemStorage`) for development/demo purposes
- Database schema defined using Drizzle ORM with PostgreSQL dialect
- Prepared for production migration to PostgreSQL (Neon serverless or similar)

**Request/Response Pipeline**:
- JSON body parsing with raw body preservation
- Custom logging middleware tracking request method, path, status, and duration
- Error handling with structured JSON responses

### Data Storage

**Database**: PostgreSQL configured via Drizzle ORM.

**Schema Design**:
- **users** table: id (UUID), email (unique), password (hashed), name, college, year, targetRole
- **questions** table: id (UUID), text, category, difficulty
- **interviews** table: id (UUID), userId (foreign key), category, difficulty, duration, questionsAnswered, totalQuestions, averageRating, ratings (JSONB array), completedAt

**ORM Choice**: Drizzle ORM selected for:
- Type-safe query building
- Minimal runtime overhead
- Direct SQL generation (no heavy abstractions)
- Integration with Zod for schema validation

**Migration Strategy**: Drizzle Kit configured for schema migrations with `drizzle.config.ts` pointing to `./migrations` directory.

**Current Implementation**: In-memory storage with seeded question bank for rapid prototyping, designed to be swapped with actual database implementation without changing business logic.

### Authentication & Authorization

**Password Security**: bcrypt hashing with salt rounds of 10, industry-standard practice for password storage.

**Session Management**: Stateless JWT tokens containing user id and email, signed with secret key from environment variables.

**Token Flow**:
1. User submits credentials to `/api/auth/login` or `/api/auth/signup`
2. Server validates credentials, generates JWT
3. Client stores token in Zustand store (persisted to localStorage)
4. Client includes token in Authorization header as Bearer token
5. Server middleware validates token on protected routes

**Protected Route Middleware**: `authenticateToken` function verifies JWT, decodes payload, attaches user info to request object, or returns 401/403 errors.

## External Dependencies

### Core Framework Dependencies
- **React 18+**: Frontend UI library
- **Express**: Backend web framework
- **TypeScript**: Type safety across the stack
- **Vite**: Frontend build tool and dev server with HMR

### UI Component Libraries
- **Radix UI**: Accessible component primitives (@radix-ui/react-*)
- **shadcn/ui**: Pre-built component patterns using Radix
- **Tailwind CSS**: Utility-first CSS framework
- **class-variance-authority**: Component variant styling
- **Lucide React**: Icon library

### Database & ORM
- **@neondatabase/serverless**: PostgreSQL serverless driver for Neon
- **Drizzle ORM**: TypeScript ORM for database operations
- **drizzle-zod**: Schema validation integration

### Authentication & Security
- **bcryptjs**: Password hashing
- **jsonwebtoken**: JWT token generation and verification
- **zod**: Runtime schema validation

### State Management & Data Fetching
- **@tanstack/react-query**: Server state management and caching
- **zustand**: Client-side state management (auth)

### Form Handling
- **react-hook-form**: Form state management
- **@hookform/resolvers**: Validation resolver adapters

### Development Tools
- **tsx**: TypeScript execution for development
- **esbuild**: Fast bundling for production server code
- **@replit/vite-plugin-***: Replit-specific development plugins

### Utilities
- **date-fns**: Date formatting and manipulation
- **wouter**: Lightweight client-side routing
- **clsx** / **tailwind-merge**: Conditional class name utilities
- **nanoid**: Unique ID generation

### Build & Deployment
- Production build combines Vite (client) and esbuild (server)
- Server dependencies selectively bundled to reduce syscalls and improve cold start times
- Static file serving from dist/public directory
- Environment variables for database URL and session secrets