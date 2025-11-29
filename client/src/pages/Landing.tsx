import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/GlassCard";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { 
  Zap, 
  Brain, 
  TrendingUp, 
  Clock, 
  Target, 
  Users, 
  ChevronRight,
  CheckCircle2,
  BarChart3,
  MessageSquare
} from "lucide-react";
import heroImage from "@assets/generated_images/confident_developer_at_desk.png";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/85 to-background/70" />
          <div className="absolute inset-0 bg-hero-gradient" />
        </div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20">
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm text-primary mb-8 animate-fade-in">
              <Zap className="h-4 w-4" />
              <span>Powered by AI-Driven Feedback</span>
            </div>
            
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              Panic-Proof Your
              <br />
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-gradient-shift" style={{ backgroundSize: "200% auto" }}>
                Interview Skills
              </span>
            </h1>

            <p className="max-w-2xl text-lg sm:text-xl text-muted-foreground mb-8 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              92% of students fail due to panic, not skills. Train with realistic mock interviews, 
              get AI-powered feedback, and track your progress to interview success.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-16 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              <Link href="/signup">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary to-secondary text-lg px-8 py-6 hover:opacity-90 transition-all hover:scale-[1.02] shadow-lg shadow-primary/25"
                  data-testid="button-hero-cta"
                >
                  Start Panic Training
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-6 border-white/20 backdrop-blur-md"
                  data-testid="button-hero-login"
                >
                  I have an account
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-3xl opacity-0 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
              <GlassCard className="p-4 text-center">
                <p className="font-display text-3xl font-bold text-foreground">
                  <AnimatedCounter end={10} suffix="K+" duration={2000} />
                </p>
                <p className="text-sm text-muted-foreground">Interviews Done</p>
              </GlassCard>
              <GlassCard className="p-4 text-center">
                <p className="font-display text-3xl font-bold text-foreground">
                  <AnimatedCounter end={4.8} decimals={1} duration={2000} />
                </p>
                <p className="text-sm text-muted-foreground">Avg Rating</p>
              </GlassCard>
              <GlassCard className="p-4 text-center">
                <p className="font-display text-3xl font-bold text-foreground">
                  <AnimatedCounter end={85} suffix="%" duration={2000} />
                </p>
                <p className="text-sm text-muted-foreground">Success Rate</p>
              </GlassCard>
              <GlassCard className="p-4 text-center">
                <p className="font-display text-3xl font-bold text-foreground">
                  <AnimatedCounter end={500} suffix="+" duration={2000} />
                </p>
                <p className="text-sm text-muted-foreground">Questions</p>
              </GlassCard>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/50 flex justify-center pt-2">
            <div className="w-1 h-2 rounded-full bg-muted-foreground/50" />
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-b from-background to-card/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-6">
                The Real Problem Isn't Your Skills
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                You've studied for months. You know the algorithms. You can solve problems. 
                But when the interview starts, your mind goes blank. Sound familiar?
              </p>
              
              <div className="space-y-4">
                {[
                  { stat: "92%", text: "of students experience interview anxiety" },
                  { stat: "67%", text: "perform worse than their practice scores" },
                  { stat: "3x", text: "more likely to fail due to panic than lack of knowledge" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="flex h-12 w-16 items-center justify-center rounded-lg bg-destructive/10 text-destructive font-display font-bold">
                      {item.stat}
                    </div>
                    <p className="text-muted-foreground">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <GlassCard className="p-8" glow>
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <Brain className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-foreground">Panic Detection</h3>
                    <p className="text-sm text-muted-foreground">Real-time confidence tracking</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Confidence Level</span>
                      <span className="text-accent font-medium">75%</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-1000" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Panic Reduction</span>
                      <span className="text-success font-medium">+45%</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div className="h-full w-[45%] rounded-full bg-gradient-to-r from-success to-accent transition-all duration-1000" />
                    </div>
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Everything You Need to Conquer Interview Anxiety
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A complete toolkit designed specifically for CS students who want to perform at their best
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Target,
                title: "Category-Based Practice",
                description: "DSA, Web Development, Java, System Design, and HR questions tailored to your goals",
                gradient: "from-primary to-primary/50",
              },
              {
                icon: Clock,
                title: "Timed Sessions",
                description: "5, 10, or 15-minute sessions that simulate real interview pressure",
                gradient: "from-secondary to-secondary/50",
              },
              {
                icon: BarChart3,
                title: "Performance Analytics",
                description: "Track your progress with detailed metrics and panic reduction index",
                gradient: "from-accent to-accent/50",
              },
              {
                icon: MessageSquare,
                title: "AI Feedback",
                description: "Get personalized strengths and improvement suggestions after each session",
                gradient: "from-success to-success/50",
              },
              {
                icon: TrendingUp,
                title: "Progress Tracking",
                description: "Visualize your improvement over time with beautiful charts",
                gradient: "from-chart-5 to-chart-5/50",
              },
              {
                icon: Users,
                title: "Role-Specific Prep",
                description: "Target SDE, Web Dev, or any role with specialized question sets",
                gradient: "from-primary to-secondary",
              },
            ].map((feature, i) => (
              <GlassCard key={i} hover className="p-6">
                <div className={`h-12 w-12 rounded-lg bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-b from-card/30 to-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground">
              Three simple steps to interview confidence
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Choose Your Focus",
                description: "Select category, difficulty, and duration that matches your target role",
              },
              {
                step: "02",
                title: "Practice Under Pressure",
                description: "Answer questions with a countdown timer and rate your confidence",
              },
              {
                step: "03",
                title: "Analyze & Improve",
                description: "Review AI feedback, track metrics, and watch your panic index drop",
              },
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="absolute -top-4 -left-4 font-display text-7xl font-bold text-primary/10">
                  {item.step}
                </div>
                <GlassCard className="relative p-6 pt-8">
                  <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {item.description}
                  </p>
                </GlassCard>
                {i < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ChevronRight className="h-8 w-8 text-primary/30" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <GlassCard className="p-8 sm:p-12 text-center relative overflow-hidden" glow>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
            <div className="relative z-10">
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Ready to Beat Interview Panic?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
                Join thousands of students who have transformed their interview anxiety into interview confidence.
              </p>
              <Link href="/signup">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary to-secondary text-lg px-8 py-6 hover:opacity-90 transition-all hover:scale-[1.02]"
                  data-testid="button-cta-bottom"
                >
                  Start Your Free Training
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <div className="mt-8 flex items-center justify-center gap-8 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  Free to start
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  No credit card required
                </span>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      <footer className="border-t border-white/10 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary">
                <Zap className="h-4 w-4 text-white" />
              </div>
              <span className="font-display font-semibold text-foreground">PlacementPanic</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Built for CS students who refuse to let panic win
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
