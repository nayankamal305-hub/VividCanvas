import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { GlassCard } from "@/components/GlassCard";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { loginSchema, signupSchema, type LoginInput, type SignupInput } from "@shared/schema";
import { Zap, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { Link } from "wouter";

interface AuthPageProps {
  mode: "login" | "signup";
}

export default function Auth({ mode }: AuthPageProps) {
  const [, navigate] = useLocation();
  const { login } = useAuth();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);

  const isLogin = mode === "login";

  const form = useForm<LoginInput | SignupInput>({
    resolver: zodResolver(isLogin ? loginSchema : signupSchema),
    defaultValues: isLogin
      ? { email: "", password: "" }
      : { email: "", password: "", name: "", college: "", year: "", targetRole: "" },
  });

  const mutation = useMutation({
    mutationFn: async (data: LoginInput | SignupInput) => {
      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/signup";
      const response = await apiRequest("POST", endpoint, data);
      return response.json();
    },
    onSuccess: (data) => {
      login(data.user, data.token);
      toast({
        title: isLogin ? "Welcome back!" : "Account created!",
        description: isLogin
          ? "You've successfully logged in."
          : "Your account has been created successfully.",
      });
      navigate("/dashboard");
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: LoginInput | SignupInput) => {
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
      </div>

      <div className="w-full max-w-md relative z-10">
        <Link href="/">
          <a className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8" data-testid="link-back-home">
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </a>
        </Link>

        <GlassCard className="p-8">
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <span className="font-display text-2xl font-bold text-foreground">PlacementPanic</span>
          </div>

          <h1 className="font-display text-2xl font-bold text-foreground text-center mb-2">
            {isLogin ? "Welcome Back" : "Create Your Account"}
          </h1>
          <p className="text-muted-foreground text-center mb-8">
            {isLogin
              ? "Enter your credentials to continue"
              : "Start your journey to interview confidence"}
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {!isLogin && (
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="John Doe"
                          {...field}
                          className="bg-input/50"
                          data-testid="input-name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="you@example.com"
                        {...field}
                        className="bg-input/50"
                        data-testid="input-email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          {...field}
                          className="bg-input/50 pr-10"
                          data-testid="input-password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {!isLogin && (
                <>
                  <FormField
                    control={form.control}
                    name="college"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>College (Optional)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Your college name"
                            {...field}
                            className="bg-input/50"
                            data-testid="input-college"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="year"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Year</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-input/50" data-testid="select-year">
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="1st Year">1st Year</SelectItem>
                              <SelectItem value="2nd Year">2nd Year</SelectItem>
                              <SelectItem value="3rd Year">3rd Year</SelectItem>
                              <SelectItem value="4th Year">4th Year</SelectItem>
                              <SelectItem value="Graduate">Graduate</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="targetRole"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Target Role</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-input/50" data-testid="select-role">
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="SDE">SDE</SelectItem>
                              <SelectItem value="Web Developer">Web Developer</SelectItem>
                              <SelectItem value="Data Scientist">Data Scientist</SelectItem>
                              <SelectItem value="DevOps">DevOps</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </>
              )}

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity mt-6"
                disabled={mutation.isPending}
                data-testid="button-submit"
              >
                {mutation.isPending
                  ? "Please wait..."
                  : isLogin
                  ? "Sign In"
                  : "Create Account"}
              </Button>
            </form>
          </Form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <Link href={isLogin ? "/signup" : "/login"}>
              <a className="text-primary hover:underline" data-testid="link-toggle-auth">
                {isLogin ? "Sign up" : "Sign in"}
              </a>
            </Link>
          </p>
        </GlassCard>
      </div>
    </div>
  );
}
