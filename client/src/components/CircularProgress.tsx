import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface CircularProgressProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  showLabel?: boolean;
  label?: string;
  colorClass?: string;
  animated?: boolean;
}

export function CircularProgress({
  value,
  max = 100,
  size = 120,
  strokeWidth = 8,
  className,
  showLabel = true,
  label,
  colorClass = "stroke-primary",
  animated = true,
}: CircularProgressProps) {
  const [displayValue, setDisplayValue] = useState(0);
  
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const percentage = Math.min((displayValue / max) * 100, 100);
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  useEffect(() => {
    if (!animated) {
      setDisplayValue(value);
      return;
    }

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / 1500, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(easeOut * value);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [value, animated]);

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-muted/30"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className={cn("transition-all duration-500", colorClass)}
          style={{
            filter: "drop-shadow(0 0 6px currentColor)",
          }}
        />
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="100%" stopColor="hsl(var(--accent))" />
          </linearGradient>
        </defs>
      </svg>
      {showLabel && (
        <div className="absolute flex flex-col items-center justify-center">
          <span className="font-display text-2xl font-bold text-foreground">
            {Math.round(displayValue)}
            {max === 100 ? "%" : ""}
          </span>
          {label && (
            <span className="text-xs text-muted-foreground">{label}</span>
          )}
        </div>
      )}
    </div>
  );
}
