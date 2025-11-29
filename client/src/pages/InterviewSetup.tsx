import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { GlassCard } from "@/components/GlassCard";
import { CATEGORIES, DIFFICULTIES, DURATIONS, type Category, type Difficulty, type Duration } from "@shared/schema";
import { 
  ArrowLeft, 
  Play, 
  Clock, 
  Target, 
  Layers, 
  Video, 
  VideoOff,
  Code2,
  Globe,
  Coffee,
  Server,
  Users
} from "lucide-react";
import { Link } from "wouter";
import { cn } from "@/lib/utils";

const categoryIcons: Record<Category, typeof Code2> = {
  "DSA": Code2,
  "Web Development": Globe,
  "Java": Coffee,
  "System Design": Server,
  "HR": Users,
};

const categoryDescriptions: Record<Category, string> = {
  "DSA": "Data Structures & Algorithms",
  "Web Development": "Frontend, Backend & Full-stack",
  "Java": "Core Java & OOP Concepts",
  "System Design": "Architecture & Scalability",
  "HR": "Behavioral & Soft Skills",
};

export default function InterviewSetup() {
  const [, navigate] = useLocation();
  const [category, setCategory] = useState<Category>("DSA");
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [duration, setDuration] = useState<Duration>(10);
  const [cameraOn, setCameraOn] = useState(false);

  const handleStart = () => {
    const params = new URLSearchParams({
      category,
      difficulty,
      duration: duration.toString(),
    });
    navigate(`/interview/session?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/dashboard">
          <a className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8" data-testid="link-back-dashboard">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </a>
        </Link>

        <div className="text-center mb-12">
          <h1 className="font-display text-4xl font-bold text-foreground mb-4">
            Configure Your Interview
          </h1>
          <p className="text-muted-foreground text-lg">
            Choose your preferences and get ready to practice
          </p>
        </div>

        <div className="space-y-8">
          <GlassCard className="p-6 opacity-0 animate-fade-in-up">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <Target className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="font-display text-xl font-semibold text-foreground">
                  Select Category
                </h2>
                <p className="text-sm text-muted-foreground">
                  Choose the topic you want to practice
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {CATEGORIES.map((cat) => {
                const Icon = categoryIcons[cat];
                return (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={cn(
                      "p-4 rounded-xl border-2 text-left transition-all hover-elevate",
                      category === cat
                        ? "border-primary bg-primary/10"
                        : "border-white/10 hover:border-white/20"
                    )}
                    data-testid={`category-${cat.toLowerCase().replace(" ", "-")}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={cn(
                        "h-10 w-10 rounded-lg flex items-center justify-center",
                        category === cat ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                      )}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{cat}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {categoryDescriptions[cat]}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </GlassCard>

          <GlassCard className="p-6 opacity-0 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-lg bg-secondary/20 flex items-center justify-center">
                <Layers className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <h2 className="font-display text-xl font-semibold text-foreground">
                  Select Difficulty
                </h2>
                <p className="text-sm text-muted-foreground">
                  Choose your challenge level
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {DIFFICULTIES.map((diff) => (
                <button
                  key={diff}
                  onClick={() => setDifficulty(diff)}
                  className={cn(
                    "p-4 rounded-xl border-2 text-center transition-all hover-elevate",
                    difficulty === diff
                      ? "border-primary bg-primary/10"
                      : "border-white/10 hover:border-white/20"
                  )}
                  data-testid={`difficulty-${diff}`}
                >
                  <p className={cn(
                    "font-display text-lg font-semibold capitalize",
                    diff === "easy" && "text-success",
                    diff === "medium" && "text-secondary",
                    diff === "hard" && "text-destructive"
                  )}>
                    {diff}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {diff === "easy" && "Fundamentals"}
                    {diff === "medium" && "Intermediate"}
                    {diff === "hard" && "Advanced"}
                  </p>
                </button>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-6 opacity-0 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-lg bg-accent/20 flex items-center justify-center">
                <Clock className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h2 className="font-display text-xl font-semibold text-foreground">
                  Session Duration
                </h2>
                <p className="text-sm text-muted-foreground">
                  How long do you want to practice?
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {DURATIONS.map((dur) => (
                <button
                  key={dur}
                  onClick={() => setDuration(dur)}
                  className={cn(
                    "p-4 rounded-xl border-2 text-center transition-all hover-elevate",
                    duration === dur
                      ? "border-primary bg-primary/10"
                      : "border-white/10 hover:border-white/20"
                  )}
                  data-testid={`duration-${dur}`}
                >
                  <p className="font-display text-3xl font-bold text-foreground">{dur}</p>
                  <p className="text-sm text-muted-foreground">minutes</p>
                </button>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-6 opacity-0 animate-fade-in-up" style={{ animationDelay: "300ms" }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                  {cameraOn ? (
                    <Video className="h-5 w-5 text-foreground" />
                  ) : (
                    <VideoOff className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
                <div>
                  <Label htmlFor="camera-toggle" className="font-display text-lg font-semibold text-foreground cursor-pointer">
                    Camera Mode
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Simulate real interview conditions (UI only)
                  </p>
                </div>
              </div>
              <Switch
                id="camera-toggle"
                checked={cameraOn}
                onCheckedChange={setCameraOn}
                data-testid="switch-camera"
              />
            </div>
          </GlassCard>

          <div className="flex justify-center pt-4 opacity-0 animate-fade-in-up" style={{ animationDelay: "400ms" }}>
            <Button
              size="lg"
              onClick={handleStart}
              className="bg-gradient-to-r from-primary to-secondary text-lg px-12 py-6 hover:opacity-90 transition-all hover:scale-[1.02] shadow-lg shadow-primary/25 gap-2"
              data-testid="button-start-session"
            >
              <Play className="h-5 w-5" />
              Start Interview
            </Button>
          </div>

          <p className="text-center text-sm text-muted-foreground opacity-0 animate-fade-in-up" style={{ animationDelay: "500ms" }}>
            You'll be asked questions from the {category} category at {difficulty} difficulty for {duration} minutes.
          </p>
        </div>
      </div>
    </div>
  );
}
