# VividCanvas Backend Setup & Documentation

## Overview

VividCanvas is a **full-stack mock interview platform** designed to help CS students ace technical interviews. The backend is built with **Express.js**, **TypeScript**, and **JWT Authentication** with in-memory storage (production-ready for PostgreSQL).

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Server runs on: **http://localhost:5001**

### 3. Build for Production
```bash
npm run build
npm start
```

## Environment Variables

Create `.env.local`:
```env
PORT=5001
NODE_ENV=development
SESSION_SECRET=your-secret-key-here
DATABASE_URL=postgresql://user:password@localhost:5432/vivid_canvas
```

## API Endpoints

### Authentication
- **POST** `/api/auth/signup` - Register new user
- **POST** `/api/auth/login` - Login with JWT token
- **GET** `/api/auth/me` - Get current user (protected)

### Questions
- **GET** `/api/questions/random?category=DSA&difficulty=easy&count=10` - Get random questions

### Interviews
- **POST** `/api/interviews` - Start/save interview (protected)
- **GET** `/api/interviews/:id` - Get interview details (protected)
- **GET** `/api/interviews/stats` - Get user statistics (protected)
- **GET** `/api/interviews/:id/feedback` - Get AI feedback (protected)

## Database Schema

### Users
- `id`: UUID (primary key)
- `email`: string (unique)
- `password`: string (bcrypt hashed)
- `name`: string

### Questions (54+ pre-seeded)
- **Categories**: DSA, Web Development, Java, System Design, HR
- **Difficulties**: easy, medium, hard

### Interviews
- `userId`, `category`, `difficulty`, `duration`
- `questionsAnswered`, `averageRating`, `ratings[]`
- `completedAt`: timestamp

## Key Features

✅ JWT authentication with 7-day expiry
✅ Bcrypt password hashing (10 salt rounds)
✅ 54+ pre-seeded interview questions
✅ Real-time performance analytics
✅ AI-style feedback generation
✅ User statistics tracking
✅ In-memory storage (expandable to PostgreSQL)

## File Structure

```
server/
├── index.ts          # Main entry point
├── routes.ts         # All API endpoints
├── storage.ts        # Data management & feedback
├── static.ts         # Production static serving
├── vite.ts          # Dev server integration
└── schema.ts        # Drizzle ORM schemas
```

## Security

- JWT tokens verify on protected routes
- Password hashing with bcryptjs
- Email uniqueness validation
- CORS-ready (configure in index.ts)

## Performance

- Fast question retrieval with in-memory cache
- Optimized random selection algorithm
- Real-time stats calculation
- Minimal database queries

## Testing Endpoints

```bash
# Signup
curl -X POST http://localhost:5001/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"123456","name":"Test User"}'

# Get random questions
curl http://localhost:5001/api/questions/random?category=DSA&difficulty=easy&count=5
```

## Deployment

Production-ready for:
- **Replit** (current setup)
- **Vercel** (Node.js)
- **Railway** (Docker)
- **AWS Elastic Beanstalk**

## Next Steps

1. Connect frontend to these endpoints
2. Test JWT authentication flow
3. Monitor interview performance
4. Expand question bank as needed
5. Upgrade to PostgreSQL when needed

---

**Status**: ✅ Fully Functional & Production-Ready
