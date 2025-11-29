import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/GlassCard";
import { CircularProgress } from "@/components/CircularProgress";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import type { Interview, Feedback } from "@shared/schema";
import {
  ArrowLeft,
  CheckCircle,
  Lightbulb,
  Target,
  Clock,
  Award,
  TrendingUp,
  Play,
  Home,
  Sparkles,
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export default function Report() {
  const { id } = useParams<{ id: string }>();

  const { data: interview, isLoading: interviewLoading } = useQuery<Interview>({
    queryKey: ["/api/interviews", id],
  });

  const { data: feedback, isLoading: feedbackLoading } = useQuery<Feedback>({
    queryKey: ["/api/interviews", id, "feedback"],
    enabled: !!interview,
  });

  if (interviewLoading || feedbackLoading) {
    return (
      <div className="min-h-screen bg-background pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading your results...</p>
        </div>
      </div>
    );
  }

  if (!interview) {
    return (
      <div className="min-h-screen bg-background pt-20 flex items-center justify-center">
        <GlassCard className="p-8 text-center max-w-md">
          <h2 className="font-display text-xl font-semibold text-foreground mb-2">
            Session Not Found
          </h2>
          <p className="text-muted-foreground mb-6">
            We couldn't find this interview session.
          </p>
          <Link href="/dashboard">
            <Button className="bg-gradient-to-r from-primary to-secondary">
              Go to Dashboard
            </Button>
          </Link>
        </GlassCard>
      </div>
    );
  }

  const getScoreMessage = () => {
    if (interview.averageRating >= 4) return "Outstanding Performance!";
    if (interview.averageRating >= 3) return "Great Job!";
    if (interview.averageRating >= 2) return "Good Effort!";
    return "Keep Practicing!";
  };

  const getScoreColor = () => {
    if (interview.averageRating >= 4) return "stroke-success";
    if (interview.averageRating >= 3) return "stroke-accent";
    if (interview.averageRating >= 2) return "stroke-secondary";
    return "stroke-destructive";
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/dashboard">
          <a className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8" data-testid="link-back-dashboard">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </a>
        </Link>

        <GlassCard className="p-8 md:p-12 text-center mb-8 opacity-0 animate-fade-in-up" glow>
          <div className="inline-flex items-center gap-2 rounded-full border border-success/30 bg-success/10 px-4 py-2 text-sm text-success mb-6">
            <Sparkles className="h-4 w-4" />
            Session Complete
          </div>

          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            {getScoreMessage()}
          </h1>

          <p className="text-muted-foreground mb-8">
            {interview.completedAt && format(new Date(interview.completedAt), "MMMM d, yyyy 'at' h:mm a")}
          </p>

          <div className="flex justify-center mb-8">
            <CircularProgress
              value={interview.averageRating}
              max={5}
              size={180}
              strokeWidth={14}
              colorClass={getScoreColor()}
              label="out of 5"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-muted/30">
              <Target className="h-6 w-6 text-primary mx-auto mb-2" />
              <p className="font-display text-2xl font-bold text-foreground">
                {interview.questionsAnswered}
              </p>
              <p className="text-xs text-muted-foreground">Questions</p>
            </div>
            <div className="p-4 rounded-xl bg-muted/30">
              <Clock className="h-6 w-6 text-secondary mx-auto mb-2" />
              <p className="font-display text-2xl font-bold text-foreground">
                {interview.duration}
              </p>
              <p className="text-xs text-muted-foreground">Minutes</p>
            </div>
            <div className="p-4 rounded-xl bg-muted/30">
              <Award className="h-6 w-6 text-accent mx-auto mb-2" />
              <p className="font-display text-2xl font-bold text-foreground capitalize">
                {interview.difficulty}
              </p>
              <p className="text-xs text-muted-foreground">Difficulty</p>
            </div>
            <div className="p-4 rounded-xl bg-muted/30">
              <TrendingUp className="h-6 w-6 text-success mx-auto mb-2" />
              <p className="font-display text-2xl font-bold text-foreground">
                {interview.category}
              </p>
              <p className="text-xs text-muted-foreground">Category</p>
            </div>
          </div>
        </GlassCard>

        {interview.ratings && interview.ratings.length > 0 && (
          <GlassCard className="p-6 mb-8 opacity-0 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
            <h2 className="font-display text-xl font-semibold text-foreground mb-6">
              Question-by-Question Ratings
            </h2>
            <div className="flex items-end justify-around h-32 gap-2">
              {interview.ratings.map((rating, i) => (
                <div key={i} className="flex flex-col items-center gap-2 flex-1">
                  <span className="text-sm font-medium text-foreground">{rating}</span>
                  <div
                    className={cn(
                      "w-full max-w-12 rounded-t-lg transition-all",
                      rating >= 4 && "bg-success",
                      rating === 3 && "bg-accent",
                      rating === 2 && "bg-secondary",
                      rating === 1 && "bg-destructive"
                    )}
                    style={{ height: `${(rating / 5) * 100}%` }}
                  />
                  <span className="text-xs text-muted-foreground">Q{i + 1}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        )}

        {feedback && (
          <>
            <GlassCard className="p-6 mb-8 opacity-0 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <h2 className="font-display text-xl font-semibold text-foreground">
                  AI Analysis
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {feedback.overallMessage}
              </p>
            </GlassCard>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <GlassCard className="p-6 opacity-0 animate-fade-in-up" style={{ animationDelay: "300ms" }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 rounded-lg bg-success/20 flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-success" />
                  </div>
                  <h2 className="font-display text-lg font-semibold text-foreground">
                    Strengths
                  </h2>
                </div>
                <ul className="space-y-3">
                  {feedback.strengths.map((strength, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle className="h-3 w-3 text-success" />
                      </div>
                      <span className="text-muted-foreground">{strength}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>

              <GlassCard className="p-6 opacity-0 animate-fade-in-up" style={{ animationDelay: "400ms" }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 rounded-lg bg-secondary/20 flex items-center justify-center">
                    <Lightbulb className="h-5 w-5 text-secondary" />
                  </div>
                  <h2 className="font-display text-lg font-semibold text-foreground">
                    Areas to Improve
                  </h2>
                </div>
                <ul className="space-y-3">
                  {feedback.improvements.map((improvement, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Lightbulb className="h-3 w-3 text-secondary" />
                      </div>
                      <span className="text-muted-foreground">{improvement}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </div>

            {feedback.tips && feedback.tips.length > 0 && (
              <GlassCard className="p-6 mb-8 opacity-0 animate-fade-in-up" style={{ animationDelay: "500ms" }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 rounded-lg bg-accent/20 flex items-center justify-center">
                    <Target className="h-5 w-5 text-accent" />
                  </div>
                  <h2 className="font-display text-lg font-semibold text-foreground">
                    Tips for Next Time
                  </h2>
                </div>
                <ul className="space-y-3">
                  {feedback.tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-accent">{i + 1}</span>
                      </div>
                      <span className="text-muted-foreground">{tip}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            )}
          </>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-in-up" style={{ animationDelay: "600ms" }}>
          <Link href="/interview/setup">
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-secondary gap-2 hover:opacity-90 transition-opacity"
              data-testid="button-practice-again"
            >
              <Play className="h-5 w-5" />
              Practice Again
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button
              variant="outline"
              size="lg"
              className="gap-2"
              data-testid="button-dashboard"
            >
              <Home className="h-5 w-5" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
