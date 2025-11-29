import { cn } from "@/lib/utils";
import { type ReactNode, type CSSProperties } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  style?: CSSProperties;
}

export function GlassCard({ children, className, hover = false, glow = false, style }: GlassCardProps) {
  return (
    <div
      className={cn(
        "relative rounded-xl border border-white/10 bg-card/60 backdrop-blur-xl",
        "shadow-lg transition-all duration-300",
        hover && "hover:-translate-y-1 hover:border-white/20 hover:shadow-xl",
        glow && "animate-pulse-glow",
        className
      )}
      style={style}
    >
      {children}
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: { value: number; positive: boolean };
  delay?: number;
}

export function StatCard({ title, value, icon, trend, delay = 0 }: StatCardProps) {
  return (
    <GlassCard 
      hover 
      className={cn(
        "p-6 opacity-0 animate-fade-in-up",
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="mt-2 font-display text-4xl font-bold text-foreground">
            {value}
          </p>
          {trend && (
            <p className={cn(
              "mt-2 text-sm font-medium",
              trend.positive ? "text-success" : "text-destructive"
            )}>
              {trend.positive ? "+" : ""}{trend.value}% from last week
            </p>
          )}
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20">
          {icon}
        </div>
      </div>
    </GlassCard>
  );
}
