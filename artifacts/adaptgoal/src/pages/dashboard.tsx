import { useGetGoalsDashboard, useGetTodaysPrompt } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Target, Trophy, Activity, Zap, ArrowRight, CheckCircle2, Clock } from "lucide-react";
import { format } from "date-fns";

export default function Dashboard() {
  const { data: dashboard, isLoading: dashboardLoading } = useGetGoalsDashboard();
  const { data: todayPrompt, isLoading: promptLoading } = useGetTodaysPrompt();

  if (dashboardLoading || promptLoading) {
    return (
      <div className="p-8 space-y-6">
        <div className="h-10 w-48 bg-muted rounded animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-32 bg-muted rounded-xl animate-pulse"></div>
          ))}
        </div>
        <div className="h-48 bg-muted rounded-xl animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-semibold text-foreground tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Here is your progress overview.</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{format(new Date(), "EEEE, MMMM do")}</p>
        </div>
      </div>

      {todayPrompt && (
        <Card className="bg-primary/5 border-primary/20 shadow-none overflow-hidden relative">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Zap className="w-48 h-48" />
          </div>
          <CardContent className="p-8 relative z-10">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">Today's Motivation</h3>
                <p className="text-xl md:text-2xl font-serif text-foreground leading-relaxed">
                  "{todayPrompt.content}"
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover-elevate transition-all">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
              <Target className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Active Goals</p>
              <h4 className="text-2xl font-display font-semibold">{dashboard?.activeGoals || 0}</h4>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-elevate transition-all">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Completion Rate</p>
              <h4 className="text-2xl font-display font-semibold">{dashboard?.overallCompletionRate || 0}%</h4>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-elevate transition-all">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center shrink-0">
              <Trophy className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Longest Streak</p>
              <h4 className="text-2xl font-display font-semibold">{dashboard?.longestStreak || 0} days</h4>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-elevate transition-all">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center shrink-0">
              <Activity className="w-6 h-6 text-purple-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Milestones</p>
              <h4 className="text-2xl font-display font-semibold">{dashboard?.completedMilestones || 0} / {dashboard?.totalMilestones || 0}</h4>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2">
              <Activity className="w-5 h-5 text-muted-foreground" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            {dashboard?.recentActivity?.length ? (
              <div className="space-y-6">
                {dashboard.recentActivity.map((activity, i) => (
                  <div key={i} className="flex gap-4 relative">
                    {i !== dashboard.recentActivity.length - 1 && (
                      <div className="absolute top-8 bottom-[-24px] left-[11px] w-px bg-border"></div>
                    )}
                    <div className="w-6 h-6 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 z-10">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                    </div>
                    <div className="space-y-1 pb-2">
                      <p className="text-sm text-foreground">{activity.description}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {format(new Date(activity.timestamp), "MMM d, h:mm a")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-muted-foreground">
                <p>No recent activity.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
