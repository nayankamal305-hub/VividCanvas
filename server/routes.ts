import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { loginSchema, signupSchema, insertInterviewSchema } from "@shared/schema";
import { z } from "zod";

const JWT_SECRET = process.env.SESSION_SECRET || "placement-panic-secret-key";

interface AuthRequest extends Request {
  user?: { id: string; email: string };
}

function authenticateToken(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Authentication required" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string; email: string };
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid or expired token" });
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.post("/api/auth/signup", async (req, res) => {
    try {
      const data = signupSchema.parse(req.body);
      
      const existingUser = await storage.getUserByEmail(data.email);
      if (existingUser) {
        return res.status(400).json({ error: "Email already registered" });
      }

      const hashedPassword = await bcrypt.hash(data.password, 10);
      const user = await storage.createUser({
        ...data,
        password: hashedPassword,
      });

      const token = jwt.sign(
        { id: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: "7d" }
      );

      const { password: _, ...userWithoutPassword } = user;
      res.json({ user: userWithoutPassword, token });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors[0].message });
      }
      console.error("Signup error:", error);
      res.status(500).json({ error: "Failed to create account" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const data = loginSchema.parse(req.body);
      
      const user = await storage.getUserByEmail(data.email);
      if (!user) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      const validPassword = await bcrypt.compare(data.password, user.password);
      if (!validPassword) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: "7d" }
      );

      const { password: _, ...userWithoutPassword } = user;
      res.json({ user: userWithoutPassword, token });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors[0].message });
      }
      console.error("Login error:", error);
      res.status(500).json({ error: "Failed to login" });
    }
  });

  app.get("/api/auth/me", authenticateToken, async (req: AuthRequest, res) => {
    try {
      const user = await storage.getUser(req.user!.id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      const { password: _, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      console.error("Get user error:", error);
      res.status(500).json({ error: "Failed to get user" });
    }
  });

  app.get("/api/questions/random", async (req, res) => {
    try {
      const { category, difficulty, count = "10" } = req.query;
      
      if (!category || !difficulty) {
        return res.status(400).json({ error: "Category and difficulty are required" });
      }

      const questions = await storage.getRandomQuestions(
        category as string,
        difficulty as string,
        parseInt(count as string)
      );

      res.json(questions);
    } catch (error) {
      console.error("Get questions error:", error);
      res.status(500).json({ error: "Failed to get questions" });
    }
  });

  app.post("/api/interviews", authenticateToken, async (req: AuthRequest, res) => {
    try {
      const data = insertInterviewSchema.parse({
        ...req.body,
        userId: req.user!.id,
      });

      const interview = await storage.createInterview(data);
      res.json(interview);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors[0].message });
      }
      console.error("Create interview error:", error);
      res.status(500).json({ error: "Failed to save interview" });
    }
  });

  app.get("/api/interviews/stats", authenticateToken, async (req: AuthRequest, res) => {
    try {
      const stats = await storage.getUserStats(req.user!.id);
      res.json(stats);
    } catch (error) {
      console.error("Get stats error:", error);
      res.status(500).json({ error: "Failed to get stats" });
    }
  });

  app.get("/api/interviews/:id", authenticateToken, async (req: AuthRequest, res) => {
    try {
      const interview = await storage.getInterview(req.params.id);
      
      if (!interview) {
        return res.status(404).json({ error: "Interview not found" });
      }

      if (interview.userId !== req.user!.id) {
        return res.status(403).json({ error: "Not authorized" });
      }

      res.json(interview);
    } catch (error) {
      console.error("Get interview error:", error);
      res.status(500).json({ error: "Failed to get interview" });
    }
  });

  app.get("/api/interviews/:id/feedback", authenticateToken, async (req: AuthRequest, res) => {
    try {
      const interview = await storage.getInterview(req.params.id);
      
      if (!interview) {
        return res.status(404).json({ error: "Interview not found" });
      }

      if (interview.userId !== req.user!.id) {
        return res.status(403).json({ error: "Not authorized" });
      }

      const feedback = storage.generateFeedback(interview);
      res.json(feedback);
    } catch (error) {
      console.error("Get feedback error:", error);
      res.status(500).json({ error: "Failed to generate feedback" });
    }
  });

  return httpServer;
}
