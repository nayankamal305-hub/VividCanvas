import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/Navbar";
import { useAuth } from "@/lib/auth";
import Landing from "@/pages/Landing";
import Auth from "@/pages/Auth";
import Dashboard from "@/pages/Dashboard";
import InterviewSetup from "@/pages/InterviewSetup";
import InterviewSession from "@/pages/InterviewSession";
import Report from "@/pages/Report";
import NotFound from "@/pages/not-found";

function ProtectedRoute({ component: Component }: { component: React.ComponentType }) {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }
  
  return <Component />;
}

function PublicOnlyRoute({ component: Component }: { component: React.ComponentType }) {
  const { isAuthenticated } = useAuth();
  
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  
  return <Component />;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/login">
        <PublicOnlyRoute component={() => <Auth mode="login" />} />
      </Route>
      <Route path="/signup">
        <PublicOnlyRoute component={() => <Auth mode="signup" />} />
      </Route>
      <Route path="/dashboard">
        <ProtectedRoute component={Dashboard} />
      </Route>
      <Route path="/interview/setup">
        <ProtectedRoute component={InterviewSetup} />
      </Route>
      <Route path="/interview/session">
        <ProtectedRoute component={InterviewSession} />
      </Route>
      <Route path="/report/:id">
        <ProtectedRoute component={Report} />
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-background">
          <Navbar />
          <Router />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
