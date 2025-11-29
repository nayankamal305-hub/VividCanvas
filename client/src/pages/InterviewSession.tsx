import { useState, useEffect, useCallback } from "react";
import { useLocation, useSearch } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { GlassCard } from "@/components/GlassCard";
import { CircularProgress } from "@/components/CircularProgress";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Question, Category, Difficulty } from "@shared/schema";
import { 
  ArrowRight, 
  X, 
  Clock, 
  AlertCircle,
  CheckCircle,
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function InterviewSession() {
  const [, navigate] = useLocation();
  const search = useSearch();
  const { user } = useAuth();
  const { toast } = useToast();

  const params = new URLSearchParams(search);
  const category = params.get("category") as Category || "DSA";
  const difficulty = params.get("difficulty") as Difficulty || "medium";
  const duration = parseInt(params.get("duration") || "10");

  const [currentIndex, setCurrentIndex] = useState(0);
  const [ratings, setRatings] = useState<number[]>([]);
  const [currentRating, setCurrentRating] = useState(3);
  const [timeLeft, setTimeLeft] = useState(duration * 60);
  const [isComplete, setIsComplete] = useState(false);
  const [confidenceLevel, setConfidenceLevel] = useState(50);
  const [startTime] = useState(Date.now());

  const { data: questions, isLoading, error } = useQuery<Question[]>({
    queryKey: ["/api/questions/random", category, difficulty],
    queryFn: async () => {
      const response = await fetch(`/api/questions/random?category=${category}&difficulty=${difficulty}&count=10`);
      if (!response.ok) throw new Error("Failed to fetch questions");
      return response.json();
    },
  });

  const saveMutation = useMutation({
    mutationFn: async () => {
      const totalRatings = [...ratings, currentRating];
      const avgRating = Math.round(totalRatings.reduce((a, b) => a + b, 0) / totalRatings.length);
      
      const response = await apiRequest("POST", "/api/interviews", {
        userId: user?.id,
        category,
        difficulty,
        duration,
        questionsAnswered: totalRatings.length,
        totalQuestions: questions?.length || 0,
        averageRating: avgRating,
        ratings: totalRatings,
      });
      return response.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["/api/interviews/stats"] });
      navigate(`/report/${data.id}`);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to save session. Please try again.",
        variant: "destructive",
      });
    },
  });

  useEffect(() => {
    if (timeLeft <= 0 || isComplete) {
      if (!isComplete) {
        setIsComplete(true);
        saveMutation.mutate();
      }
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isComplete]);

  useEffect(() => {
    const newConfidence = Math.min(100, 30 + (ratings.length * 10) + (currentRating * 5));
    setConfidenceLevel(newConfidence);
  }, [ratings, currentRating]);

  const handleNext = useCallback(() => {
    setRatings((prev) => [...prev, currentRating]);
    
    if (questions && currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setCurrentRating(3);
    } else {
      setIsComplete(true);
      saveMutation.mutate();
    }
  }, [currentRating, currentIndex, questions]);

  const handleExit = () => {
    if (ratings.length > 0) {
      saveMutation.mutate();
    } else {
      navigate("/dashboard");
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getTimerColor = () => {
    const percentage = (timeLeft / (duration * 60)) * 100;
    if (percentage > 50) return "stroke-accent";
    if (percentage > 25) return "stroke-secondary";
    return "stroke-destructive";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Zap className="h-8 w-8 text-primary" />
          </div>
          <p className="text-foreground font-display text-xl">Loading questions...</p>
        </div>
      </div>
    );
  }

  if (error || !questions || questions.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <GlassCard className="p-8 text-center max-w-md">
          <div className="h-16 w-16 rounded-full bg-destructive/20 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="h-8 w-8 text-destructive" />
          </div>
          <h2 className="font-display text-xl font-semibold text-foreground mb-2">
            No Questions Available
          </h2>
          <p className="text-muted-foreground mb-6">
            We couldn't find questions for this category and difficulty. Please try another combination.
          </p>
          <Button onClick={() => navigate("/interview/setup")} className="bg-gradient-to-r from-primary to-secondary">
            Go Back
          </Button>
        </GlassCard>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  if (isComplete || saveMutation.isPending) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <GlassCard className="p-8 text-center max-w-md" glow>
          <div className="h-16 w-16 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-success" />
          </div>
          <h2 className="font-display text-2xl font-bold text-foreground mb-2">
            Session Complete!
          </h2>
          <p className="text-muted-foreground mb-2">
            Saving your results...
          </p>
          <div className="flex justify-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <CircularProgress
                value={timeLeft}
                max={duration * 60}
                size={48}
                strokeWidth={4}
                colorClass={getTimerColor()}
                showLabel={false}
              />
              <div>
                <p className="font-display text-2xl font-bold text-foreground tabular-nums">
                  {formatTime(timeLeft)}
                </p>
                <p className="text-xs text-muted-foreground">remaining</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Question</span>
              <span className="font-display font-bold text-foreground">
                {currentIndex + 1}/{questions.length}
              </span>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={handleExit}
              className="text-muted-foreground hover:text-foreground"
              data-testid="button-exit"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="pt-24 pb-32">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <GlassCard className="p-8 md:p-12 animate-scale-in" glow>
            <div className="flex items-center justify-between mb-8">
              <span className={cn(
                "px-3 py-1 rounded-full text-sm font-medium",
                category === "DSA" && "bg-primary/20 text-primary",
                category === "Web Development" && "bg-accent/20 text-accent",
                category === "Java" && "bg-chart-5/20 text-chart-5",
                category === "System Design" && "bg-secondary/20 text-secondary",
                category === "HR" && "bg-success/20 text-success"
              )}>
                {category}
              </span>
              <span className={cn(
                "px-3 py-1 rounded-full text-sm font-medium capitalize",
                difficulty === "easy" && "bg-success/20 text-success",
                difficulty === "medium" && "bg-secondary/20 text-secondary",
                difficulty === "hard" && "bg-destructive/20 text-destructive"
              )}>
                {difficulty}
              </span>
            </div>

            <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground text-center leading-relaxed mb-12" data-testid="text-question">
              {currentQuestion.text}
            </h2>

            <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8" />

            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Label className="text-sm font-medium text-muted-foreground">
                    How confident do you feel about your answer?
                  </Label>
                  <span className="font-display text-xl font-bold text-foreground">
                    {currentRating}/5
                  </span>
                </div>
                <div className="relative px-2">
                  <Slider
                    value={[currentRating]}
                    onValueChange={(value) => setCurrentRating(value[0])}
                    min={1}
                    max={5}
                    step={1}
                    className="w-full"
                    data-testid="slider-rating"
                  />
                  <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                    <span>Not confident</span>
                    <span>Very confident</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-center pt-4">
                <Button
                  size="lg"
                  onClick={handleNext}
                  className="bg-gradient-to-r from-primary to-secondary text-lg px-12 gap-2 hover:opacity-90 transition-opacity"
                  data-testid="button-next"
                >
                  {currentIndex < questions.length - 1 ? "Next Question" : "Finish Session"}
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="mt-6 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Confidence Meter</span>
              </div>
              <span className="font-medium text-foreground">{confidenceLevel}%</span>
            </div>
            <div className="mt-3 h-3 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary via-secondary to-accent transition-all duration-500"
                style={{ width: `${confidenceLevel}%` }}
              />
            </div>
          </GlassCard>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-xl border-t border-white/10 py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-2">
            {questions.map((_, i) => (
              <div
                key={i}
                className={cn(
                  "h-2 w-2 rounded-full transition-all",
                  i < currentIndex && "bg-success",
                  i === currentIndex && "bg-primary w-8",
                  i > currentIndex && "bg-muted"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <label className={className}>{children}</label>;
}
