# API Documentation - VividCanvas

## Base URL

```
https://your-api-domain.com/api
```

## Authentication

All requests require a JWT token in the Authorization header:

```
Authorization: Bearer {token}
```

## Endpoints

### 1. Authentication Routes

#### Sign Up
- **Method:** POST
- **Endpoint:** `/auth/signup`
- **Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "name": "John Doe"
}
```
- **Response:** `{ token: string, user: User }`

#### Login
- **Method:** POST
- **Endpoint:** `/auth/login`
- **Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```
- **Response:** `{ token: string, user: User }`

#### Refresh Token
- **Method:** POST
- **Endpoint:** `/auth/refresh`
- **Headers:** `Authorization: Bearer {token}`
- **Response:** `{ token: string }`

### 2. User Routes

#### Get Current User
- **Method:** GET
- **Endpoint:** `/user/profile`
- **Headers:** `Authorization: Bearer {token}`
- **Response:** `User object`

#### Update User Profile
- **Method:** PUT
- **Endpoint:** `/user/profile`
- **Headers:** `Authorization: Bearer {token}`
- **Body:**
```json
{
  "name": "Updated Name",
  "bio": "Bio text",
  "timezone": "IST"
}
```
- **Response:** `Updated User object`

#### Update Interview Preferences
- **Method:** PUT
- **Endpoint:** `/user/preferences`
- **Headers:** `Authorization: Bearer {token}`
- **Body:**
```json
{
  "interviewTypes": ["DSA", "System Design"],
  "experienceLevel": "Junior",
  "programmingLanguages": ["Java", "Python"],
  "targetCompanies": ["Google", "Amazon"]
}
```
- **Response:** `Updated preferences object`

### 3. Interview Sessions Routes

#### Create Interview Session
- **Method:** POST
- **Endpoint:** `/interviews/sessions`
- **Headers:** `Authorization: Bearer {token}`
- **Body:**
```json
{
  "type": "mock",
  "duration": 60,
  "difficulty": "medium",
  "categories": ["Arrays", "Strings"]
}
```
- **Response:** `{ sessionId: string, questions: Question[] }`

#### Get Interview Sessions
- **Method:** GET
- **Endpoint:** `/interviews/sessions`
- **Headers:** `Authorization: Bearer {token}`
- **Query Parameters:** `?page=1&limit=10&status=completed`
- **Response:** `{ sessions: Session[], total: number }`

#### Get Interview Session Details
- **Method:** GET
- **Endpoint:** `/interviews/sessions/{sessionId}`
- **Headers:** `Authorization: Bearer {token}`
- **Response:** `Session object with answers`

#### Submit Answer
- **Method:** POST
- **Endpoint:** `/interviews/sessions/{sessionId}/answers`
- **Headers:** `Authorization: Bearer {token}`
- **Body:**
```json
{
  "questionId": "q123",
  "answer": "Solution code",
  "timeSpent": 300
}
```
- **Response:** `{ correct: boolean, feedback: string }`

#### End Interview Session
- **Method:** POST
- **Endpoint:** `/interviews/sessions/{sessionId}/end`
- **Headers:** `Authorization: Bearer {token}`
- **Response:** `{ score: number, performance: object }`

### 4. Questions Routes

#### Get All Questions
- **Method:** GET
- **Endpoint:** `/questions`
- **Headers:** `Authorization: Bearer {token}`
- **Query Parameters:** `?page=1&limit=20&difficulty=medium&category=Arrays&search=keyword`
- **Response:** `{ questions: Question[], total: number }`

#### Get Question Details
- **Method:** GET
- **Endpoint:** `/questions/{questionId}`
- **Headers:** `Authorization: Bearer {token}`
- **Response:** `Question object with detailed description`

#### Get Question Solution
- **Method:** GET
- **Endpoint:** `/questions/{questionId}/solution`
- **Headers:** `Authorization: Bearer {token}`
- **Response:** `{ solution: string, explanation: string, timeComplexity: string }`

#### Mark Question as Favorite
- **Method:** POST
- **Endpoint:** `/questions/{questionId}/favorite`
- **Headers:** `Authorization: Bearer {token}`
- **Response:** `{ favorited: boolean }`

### 5. Progress Routes

#### Get Progress Statistics
- **Method:** GET
- **Endpoint:** `/progress/stats`
- **Headers:** `Authorization: Bearer {token}`
- **Response:**
```json
{
  "totalQuestionsAttempted": 50,
  "totalQuestionsCorrect": 35,
  "successRate": 70,
  "totalTimeSpent": 5000,
  "categoryWiseProgress": []
}
```

#### Get Category Progress
- **Method:** GET
- **Endpoint:** `/progress/categories`
- **Headers:** `Authorization: Bearer {token}`
- **Response:** `Array of category progress objects`

## Error Responses

All error responses follow this format:

```json
{
  "error": "Error message",
  "code": "ERROR_CODE",
  "statusCode": 400
}
```

## Status Codes

- `200` OK
- `201` Created
- `400` Bad Request
- `401` Unauthorized
- `403` Forbidden
- `404` Not Found
- `409` Conflict
- `500` Internal Server Error

## Rate Limiting

API requests are rate-limited to:
- 1000 requests per hour for authenticated users
- 100 requests per hour for unauthenticated users

## Data Models

### User
```json
{
  "id": "string",
  "email": "string",
  "name": "string",
  "bio": "string",
  "timezone": "string",
  "createdAt": "ISO 8601 date",
  "updatedAt": "ISO 8601 date"
}
```

### Question
```json
{
  "id": "string",
  "title": "string",
  "description": "string",
  "difficulty": "easy|medium|hard",
  "category": "string",
  "acceptance_rate": "number"
}
```

### Session
```json
{
  "id": "string",
  "userId": "string",
  "type": "practice|mock",
  "status": "ongoing|completed",
  "score": "number",
  "startedAt": "ISO 8601 date",
  "endedAt": "ISO 8601 date",
  "answers": "Answer[]"
}
```

## Webhooks (Future)

Webhook events for session completion and achievement unlocking.

---

For more details or to report API issues, please check [CONTRIBUTING.md](CONTRIBUTING.md).
