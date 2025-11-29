import { 
  type User, 
  type InsertUser, 
  type Question, 
  type InsertQuestion,
  type Interview,
  type InsertInterview,
  type UserStats,
  type Feedback
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getQuestions(): Promise<Question[]>;
  getRandomQuestions(category: string, difficulty: string, count: number): Promise<Question[]>;
  createQuestion(question: InsertQuestion): Promise<Question>;
  
  getInterview(id: string): Promise<Interview | undefined>;
  getInterviewsByUser(userId: string): Promise<Interview[]>;
  createInterview(interview: InsertInterview): Promise<Interview>;
  getUserStats(userId: string): Promise<UserStats>;
  generateFeedback(interview: Interview): Feedback;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private questions: Map<string, Question>;
  private interviews: Map<string, Interview>;

  constructor() {
    this.users = new Map();
    this.questions = new Map();
    this.interviews = new Map();
    this.seedQuestions();
  }

  private seedQuestions() {
    const questionsData: InsertQuestion[] = [
      { text: "Explain the difference between an array and a linked list. When would you use each?", category: "DSA", difficulty: "easy" },
      { text: "What is the time complexity of binary search and why?", category: "DSA", difficulty: "easy" },
      { text: "Describe how a hash table works and its average time complexities.", category: "DSA", difficulty: "easy" },
      { text: "What is the difference between a stack and a queue?", category: "DSA", difficulty: "easy" },
      { text: "Explain Big O notation and why it matters.", category: "DSA", difficulty: "easy" },
      { text: "How would you reverse a linked list? Explain your approach.", category: "DSA", difficulty: "medium" },
      { text: "Explain how you would detect a cycle in a linked list.", category: "DSA", difficulty: "medium" },
      { text: "What is dynamic programming? Give an example.", category: "DSA", difficulty: "medium" },
      { text: "How would you find the kth largest element in an unsorted array?", category: "DSA", difficulty: "medium" },
      { text: "Explain the difference between BFS and DFS traversals.", category: "DSA", difficulty: "medium" },
      { text: "Design an LRU cache. What data structures would you use?", category: "DSA", difficulty: "hard" },
      { text: "How would you find the shortest path in a weighted graph?", category: "DSA", difficulty: "hard" },
      { text: "Explain how you would solve the N-Queens problem.", category: "DSA", difficulty: "hard" },
      { text: "What is the difference between HTTP and HTTPS?", category: "Web Development", difficulty: "easy" },
      { text: "Explain the concept of responsive design.", category: "Web Development", difficulty: "easy" },
      { text: "What is the difference between GET and POST requests?", category: "Web Development", difficulty: "easy" },
      { text: "What is the DOM and how does it work?", category: "Web Development", difficulty: "easy" },
      { text: "Explain the difference between cookies and local storage.", category: "Web Development", difficulty: "easy" },
      { text: "What is CORS and why is it important?", category: "Web Development", difficulty: "medium" },
      { text: "Explain the concept of RESTful APIs.", category: "Web Development", difficulty: "medium" },
      { text: "What is the Virtual DOM and how does React use it?", category: "Web Development", difficulty: "medium" },
      { text: "Explain the concept of JWT authentication.", category: "Web Development", difficulty: "medium" },
      { text: "What is server-side rendering vs client-side rendering?", category: "Web Development", difficulty: "medium" },
      { text: "How would you optimize a slow-loading website?", category: "Web Development", difficulty: "hard" },
      { text: "Explain WebSockets and when you would use them over HTTP.", category: "Web Development", difficulty: "hard" },
      { text: "What are the four pillars of OOP?", category: "Java", difficulty: "easy" },
      { text: "Explain the difference between abstract classes and interfaces in Java.", category: "Java", difficulty: "easy" },
      { text: "What is the difference between == and .equals() in Java?", category: "Java", difficulty: "easy" },
      { text: "Explain the concept of garbage collection in Java.", category: "Java", difficulty: "easy" },
      { text: "What are Java collections? Name the main interfaces.", category: "Java", difficulty: "easy" },
      { text: "Explain the difference between HashMap and TreeMap.", category: "Java", difficulty: "medium" },
      { text: "What is multithreading? How do you achieve it in Java?", category: "Java", difficulty: "medium" },
      { text: "Explain the synchronized keyword and its use cases.", category: "Java", difficulty: "medium" },
      { text: "What are Java streams and lambda expressions?", category: "Java", difficulty: "medium" },
      { text: "Explain the SOLID principles with examples.", category: "Java", difficulty: "hard" },
      { text: "How would you design a thread-safe singleton pattern?", category: "Java", difficulty: "hard" },
      { text: "What is horizontal vs vertical scaling?", category: "System Design", difficulty: "easy" },
      { text: "Explain the concept of load balancing.", category: "System Design", difficulty: "easy" },
      { text: "What is caching and why is it important?", category: "System Design", difficulty: "easy" },
      { text: "Explain the CAP theorem.", category: "System Design", difficulty: "medium" },
      { text: "How would you design a URL shortening service?", category: "System Design", difficulty: "medium" },
      { text: "Explain microservices architecture and its benefits.", category: "System Design", difficulty: "medium" },
      { text: "What is database sharding and when would you use it?", category: "System Design", difficulty: "medium" },
      { text: "How would you design Twitter's trending topics feature?", category: "System Design", difficulty: "hard" },
      { text: "Design a distributed message queue system.", category: "System Design", difficulty: "hard" },
      { text: "Tell me about yourself.", category: "HR", difficulty: "easy" },
      { text: "Why do you want to work for our company?", category: "HR", difficulty: "easy" },
      { text: "What are your strengths and weaknesses?", category: "HR", difficulty: "easy" },
      { text: "Where do you see yourself in 5 years?", category: "HR", difficulty: "easy" },
      { text: "Describe a challenging project you worked on.", category: "HR", difficulty: "medium" },
      { text: "Tell me about a time you had a conflict with a team member.", category: "HR", difficulty: "medium" },
      { text: "How do you handle tight deadlines?", category: "HR", difficulty: "medium" },
      { text: "Describe a time you failed and what you learned.", category: "HR", difficulty: "hard" },
      { text: "How would you handle a situation where you disagree with your manager?", category: "HR", difficulty: "hard" },
    ];

    questionsData.forEach((q) => {
      const id = randomUUID();
      this.questions.set(id, { ...q, id });
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find((user) => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getQuestions(): Promise<Question[]> {
    return Array.from(this.questions.values());
  }

  async getRandomQuestions(category: string, difficulty: string, count: number): Promise<Question[]> {
    const filtered = Array.from(this.questions.values()).filter(
      (q) => q.category === category && q.difficulty === difficulty
    );
    const shuffled = filtered.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  }

  async createQuestion(insertQuestion: InsertQuestion): Promise<Question> {
    const id = randomUUID();
    const question: Question = { ...insertQuestion, id };
    this.questions.set(id, question);
    return question;
  }

  async getInterview(id: string): Promise<Interview | undefined> {
    return this.interviews.get(id);
  }

  async getInterviewsByUser(userId: string): Promise<Interview[]> {
    return Array.from(this.interviews.values())
      .filter((i) => i.userId === userId)
      .sort((a, b) => {
        const dateA = a.completedAt ? new Date(a.completedAt).getTime() : 0;
        const dateB = b.completedAt ? new Date(b.completedAt).getTime() : 0;
        return dateB - dateA;
      });
  }

  async createInterview(insertInterview: InsertInterview): Promise<Interview> {
    const id = randomUUID();
    const interview: Interview = {
      ...insertInterview,
      id,
      completedAt: new Date(),
    };
    this.interviews.set(id, interview);
    return interview;
  }

  async getUserStats(userId: string): Promise<UserStats> {
    const interviews = await this.getInterviewsByUser(userId);
    
    if (interviews.length === 0) {
      return {
        totalInterviews: 0,
        averageScore: 0,
        bestScore: 0,
        panicReductionIndex: 0,
        recentSessions: [],
        categoryBreakdown: {},
        difficultyBreakdown: {},
        scoreHistory: [],
      };
    }

    const totalInterviews = interviews.length;
    const averageScore = interviews.reduce((acc, i) => acc + i.averageRating, 0) / totalInterviews;
    const bestScore = Math.max(...interviews.map((i) => i.averageRating));
    const panicReductionIndex = Math.min(5 * totalInterviews, 90);

    const categoryBreakdown: Record<string, number> = {};
    const difficultyBreakdown: Record<string, number> = {};

    interviews.forEach((i) => {
      categoryBreakdown[i.category] = (categoryBreakdown[i.category] || 0) + 1;
      difficultyBreakdown[i.difficulty] = (difficultyBreakdown[i.difficulty] || 0) + 1;
    });

    const scoreHistory = interviews.slice(0, 20).map((i) => ({
      date: i.completedAt?.toISOString() || new Date().toISOString(),
      score: i.averageRating,
    })).reverse();

    return {
      totalInterviews,
      averageScore: Math.round(averageScore * 10) / 10,
      bestScore,
      panicReductionIndex,
      recentSessions: interviews.slice(0, 10),
      categoryBreakdown,
      difficultyBreakdown,
      scoreHistory,
    };
  }

  generateFeedback(interview: Interview): Feedback {
    const { averageRating, questionsAnswered, category, difficulty, ratings } = interview;
    
    let overallMessage = "";
    const strengths: string[] = [];
    const improvements: string[] = [];
    const tips: string[] = [];

    if (averageRating >= 4) {
      overallMessage = `Excellent performance! You demonstrated strong confidence throughout this ${category} session. Your consistent high ratings show you're well-prepared for ${difficulty} level questions. Keep up the great work!`;
      strengths.push("Strong overall confidence in your answers");
      strengths.push(`Good grasp of ${category} concepts at ${difficulty} level`);
      strengths.push("Maintained composure throughout the session");
      improvements.push("Consider challenging yourself with harder difficulty levels");
      improvements.push("Practice explaining your thought process out loud");
      improvements.push("Try to reduce time spent on simpler questions");
    } else if (averageRating >= 3) {
      overallMessage = `Good job! You showed solid understanding of ${category} concepts. While there's room for improvement, your performance indicates you're on the right track. Focus on building confidence in areas where you rated yourself lower.`;
      strengths.push("Demonstrated understanding of core concepts");
      strengths.push("Completed a reasonable number of questions");
      strengths.push("Showed persistence throughout the session");
      improvements.push("Work on building confidence for lower-rated topics");
      improvements.push(`Practice more ${difficulty} level ${category} questions`);
      improvements.push("Review concepts that felt challenging during the session");
    } else if (averageRating >= 2) {
      overallMessage = `You're making progress! This ${category} session highlighted some areas that need more practice. Don't be discouraged - every interview is a learning opportunity. Focus on the fundamentals and gradually build up.`;
      strengths.push("Showed courage by attempting challenging questions");
      strengths.push("Completed the session despite difficulties");
      strengths.push("Identified areas that need improvement");
      improvements.push("Review fundamental concepts before attempting harder questions");
      improvements.push("Consider starting with easier difficulty levels");
      improvements.push(`Dedicate more time to practicing ${category} basics`);
    } else {
      overallMessage = `This session was challenging, but that's okay! Everyone starts somewhere. The key is to identify gaps in your knowledge and work on them systematically. Consider reviewing the basics and practicing more frequently.`;
      strengths.push("Showed initiative by taking this practice session");
      strengths.push("Identified areas that need significant improvement");
      strengths.push("Took the first step toward interview preparation");
      improvements.push("Start with foundational concepts before complex problems");
      improvements.push("Try easier difficulty levels to build confidence");
      improvements.push("Break down study sessions into smaller, focused blocks");
    }

    tips.push(`Practice ${category} questions for at least 30 minutes daily`);
    tips.push("Mock interviews help reduce anxiety - do them regularly");
    tips.push("Review your answers after each session to identify patterns");

    if (ratings && ratings.length > 0) {
      const lowRatings = ratings.filter((r) => r <= 2).length;
      const highRatings = ratings.filter((r) => r >= 4).length;
      
      if (lowRatings > highRatings) {
        tips.push("Focus on understanding why you felt less confident on certain questions");
      } else {
        tips.push("Your confidence pattern shows good progress - maintain this momentum");
      }
    }

    if (questionsAnswered < 5) {
      improvements.push("Try to answer more questions to get better practice");
    }

    return { overallMessage, strengths, improvements, tips };
  }
}

export const storage = new MemStorage();
