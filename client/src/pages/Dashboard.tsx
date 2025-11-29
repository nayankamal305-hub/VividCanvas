import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { GlassCard, StatCard } from "@/components/GlassCard";
import { CircularProgress } from "@/components/CircularProgress";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { useAuth } from "@/lib/auth";
import type { UserStats, Interview } from "@shared/schema";
import {
  BarChart3,
  TrendingUp,
  Award,
  Target,
  Clock,
  ChevronRight,
  Play,
  Calendar,
  Zap,
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export default function Dashboard() {
  const { user } = useAuth();

  const { data: stats, isLoading } = useQuery<UserStats>({
    queryKey: ["/api/interviews/stats"],
  });

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  const defaultStats: UserStats = {
    totalInterviews: 0,
    averageScore: 0,
    bestScore: 0,
    panicReductionIndex: 0,
    recentSessions: [],
    categoryBreakdown: {},
    difficultyBreakdown: {},
    scoreHistory: [],
  };

  const data = stats || defaultStats;

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">
              Welcome back, {user?.name?.split(" ")[0]}
            </h1>
            <p className="text-muted-foreground mt-1">
              {data.totalInterviews === 0
                ? "Ready to start your interview training?"
                : "Here's your interview performance overview"}
            </p>
          </div>
          <Link href="/interview/setup">
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity gap-2"
              data-testid="button-start-interview-dashboard"
            >
              <Play className="h-5 w-5" />
              Start New Interview
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Interviews"
            value={data.totalInterviews}
            icon={<BarChart3 className="h-6 w-6 text-primary" />}
            delay={0}
          />
          <StatCard
            title="Average Score"
            value={`${data.averageScore.toFixed(1)}/5`}
            icon={<TrendingUp className="h-6 w-6 text-secondary" />}
            delay={100}
          />
          <StatCard
            title="Best Score"
            value={`${data.bestScore}/5`}
            icon={<Award className="h-6 w-6 text-accent" />}
            delay={200}
          />
          <StatCard
            title="Questions Done"
            value={data.recentSessions.reduce((acc, s) => acc + s.questionsAnswered, 0)}
            icon={<Target className="h-6 w-6 text-success" />}
            delay={300}
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <GlassCard className="lg:col-span-2 p-6 opacity-0 animate-fade-in-up" style={{ animationDelay: "400ms" }}>
            <h2 className="font-display text-xl font-semibold text-foreground mb-6">
              Performance Overview
            </h2>
            {data.scoreHistory.length > 0 ? (
              <div className="h-64 flex items-end gap-2">
                {data.scoreHistory.slice(-10).map((item, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <div
                      className="w-full rounded-t-lg bg-gradient-to-t from-primary to-secondary transition-all duration-500"
                      style={{
                        height: `${(item.score / 5) * 200}px`,
                        animationDelay: `${i * 100}ms`,
                      }}
                    />
                    <span className="text-xs text-muted-foreground">
                      {format(new Date(item.date), "MM/dd")}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-64 flex flex-col items-center justify-center text-center">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <BarChart3 className="h-8 w-8 text-primary" />
                </div>
                <p className="text-muted-foreground">
                  Complete interviews to see your performance chart
                </p>
              </div>
            )}
          </GlassCard>

          <GlassCard className="p-6 opacity-0 animate-fade-in-up" style={{ animationDelay: "500ms" }}>
            <h2 className="font-display text-xl font-semibold text-foreground mb-6">
              Panic Reduction Index
            </h2>
            <div className="flex flex-col items-center">
              <CircularProgress
                value={data.panicReductionIndex}
                size={160}
                strokeWidth={12}
                colorClass="stroke-[url(#progressGradient)]"
                label="confidence"
              />
              <p className="text-center text-muted-foreground mt-4">
                {data.panicReductionIndex < 30
                  ? "Keep practicing to build confidence!"
                  : data.panicReductionIndex < 60
                  ? "You're making great progress!"
                  : data.panicReductionIndex < 90
                  ? "Almost there! Keep it up!"
                  : "Outstanding! You're interview ready!"}
              </p>
            </div>
          </GlassCard>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <GlassCard className="p-6 opacity-0 animate-fade-in-up" style={{ animationDelay: "600ms" }}>
            <h2 className="font-display text-xl font-semibold text-foreground mb-6">
              Category Breakdown
            </h2>
            {Object.keys(data.categoryBreakdown).length > 0 ? (
              <div className="space-y-4">
                {Object.entries(data.categoryBreakdown).map(([category, count], i) => {
                  const total = Object.values(data.categoryBreakdown).reduce((a, b) => a + b, 0);
                  const percentage = (count / total) * 100;
                  return (
                    <div key={category}>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-foreground font-medium">{category}</span>
                        <span className="text-muted-foreground">{count} sessions</span>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <div
                          className={cn(
                            "h-full rounded-full transition-all duration-1000",
                            i === 0 && "bg-primary",
                            i === 1 && "bg-secondary",
                            i === 2 && "bg-accent",
                            i === 3 && "bg-success",
                            i >= 4 && "bg-chart-5"
                          )}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="h-40 flex items-center justify-center">
                <p className="text-muted-foreground">No sessions yet</p>
              </div>
            )}
          </GlassCard>

          <GlassCard className="p-6 opacity-0 animate-fade-in-up" style={{ animationDelay: "700ms" }}>
            <h2 className="font-display text-xl font-semibold text-foreground mb-6">
              Difficulty Distribution
            </h2>
            {Object.keys(data.difficultyBreakdown).length > 0 ? (
              <div className="flex items-end justify-around h-40">
                {["easy", "medium", "hard"].map((diff, i) => {
                  const count = data.difficultyBreakdown[diff] || 0;
                  const maxCount = Math.max(...Object.values(data.difficultyBreakdown));
                  const height = maxCount > 0 ? (count / maxCount) * 100 : 0;
                  return (
                    <div key={diff} className="flex flex-col items-center gap-2">
                      <span className="text-sm font-semibold text-foreground">{count}</span>
                      <div
                        className={cn(
                          "w-16 rounded-t-lg transition-all duration-1000",
                          diff === "easy" && "bg-success",
                          diff === "medium" && "bg-secondary",
                          diff === "hard" && "bg-destructive"
                        )}
                        style={{ height: `${height}%`, minHeight: count > 0 ? "20px" : "4px" }}
                      />
                      <span className="text-xs text-muted-foreground capitalize">{diff}</span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="h-40 flex items-center justify-center">
                <p className="text-muted-foreground">No sessions yet</p>
              </div>
            )}
          </GlassCard>
        </div>

        <GlassCard className="p-6 opacity-0 animate-fade-in-up" style={{ animationDelay: "800ms" }}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-xl font-semibold text-foreground">
              Recent Sessions
            </h2>
            {data.recentSessions.length > 0 && (
              <Link href="/history">
                <a className="text-sm text-primary hover:underline flex items-center gap-1">
                  View all
                  <ChevronRight className="h-4 w-4" />
                </a>
              </Link>
            )}
          </div>

          {data.recentSessions.length > 0 ? (
            <div className="space-y-4">
              {data.recentSessions.slice(0, 5).map((session, i) => (
                <Link key={session.id} href={`/report/${session.id}`}>
                  <a className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover-elevate transition-all" data-testid={`session-${session.id}`}>
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                        <Calendar className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{session.category}</p>
                        <p className="text-sm text-muted-foreground">
                          {session.questionsAnswered} questions · {session.duration} min ·{" "}
                          <span className="capitalize">{session.difficulty}</span>
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-display font-bold text-foreground">
                          {session.averageRating}/5
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {session.completedAt && format(new Date(session.completedAt), "MMM d, h:mm a")}
                        </p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </a>
                </Link>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                No sessions yet
              </h3>
              <p className="text-muted-foreground mb-4">
                Start your first mock interview to begin tracking progress
              </p>
              <Link href="/interview/setup">
                <Button className="bg-gradient-to-r from-primary to-secondary">
                  Start Your First Interview
                </Button>
              </Link>
            </div>
          )}
        </GlassCard>
      </div>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="h-10 w-64 bg-muted/50 rounded-lg animate-pulse mb-8" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 bg-card/60 rounded-xl animate-pulse" />
          ))}
        </div>
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 h-80 bg-card/60 rounded-xl animate-pulse" />
          <div className="h-80 bg-card/60 rounded-xl animate-pulse" />
        </div>
      </div>
    </div>
  );
}
