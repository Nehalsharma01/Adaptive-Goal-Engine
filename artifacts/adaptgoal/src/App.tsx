import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "@/components/layout";
import Dashboard from "@/pages/dashboard";
import Onboarding from "@/pages/onboarding";
import Goals from "@/pages/goals";
import GoalDetail from "@/pages/goal-detail";
import Prompts from "@/pages/prompts";
import NotFound from "@/pages/not-found";
import { useGetProfile } from "@workspace/api-client-react";
import { useEffect } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        if (error instanceof Error && "status" in error) {
          const status = (error as { status: number }).status;
          if (status >= 400 && status < 500) return false;
        }
        return failureCount < 2;
      },
    },
  },
});

function ProtectedRoute({ component: Component }: { component: React.ComponentType }) {
  const { data: profile, isLoading, isError } = useGetProfile();
  const [location, setLocation] = useLocation();

  useEffect(() => {
    if (!isLoading && (isError || !profile || !profile.onboardingComplete) && location !== "/onboarding") {
      setLocation("/onboarding");
    }
  }, [profile, isLoading, isError, location, setLocation]);

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center h-full">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary/20"></div>
          <div className="h-4 w-24 bg-primary/10 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <Component />
    </Layout>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/onboarding" component={Onboarding} />
      <Route path="/">
        <ProtectedRoute component={Dashboard} />
      </Route>
      <Route path="/goals">
        <ProtectedRoute component={Goals} />
      </Route>
      <Route path="/goals/:id">
        <ProtectedRoute component={GoalDetail} />
      </Route>
      <Route path="/prompts">
        <ProtectedRoute component={Prompts} />
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
