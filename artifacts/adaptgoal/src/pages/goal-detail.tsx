import { useState } from "react";
import { useParams, useLocation } from "wouter";
import { useGetGoal, useDeleteGoal, getGetGoalQueryKey, getListGoalsQueryKey, getGetGoalsDashboardQueryKey } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, CheckCircle2, Circle, ArrowLeft, Trash2, Flame } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

function StreakCalendar({ milestones }: { milestones: Array<{ completedAt?: string | null }> }) {
  const today = new Date();
  const weeks = 15;
  const totalDays = weeks * 7;

  const completedDates = new Set(
    milestones
      .filter((m) => m.completedAt)
      .map((m) => {
        const d = new Date(m.completedAt!);
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
      })
  );

  const days: { date: Date; key: string; active: boolean; isToday: boolean }[] = [];
  for (let i = totalDays - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    days.push({ date: d, key, active: completedDates.has(key), isToday: i === 0 });
  }

  const monthLabels: { label: string; colIndex: number }[] = [];
  for (let w = 0; w < weeks; w++) {
    const dayIndex = w * 7;
    const d = days[dayIndex];
    if (d && (w === 0 || d.date.getDate() <= 7)) {
      monthLabels.push({
        label: d.date.toLocaleString("default", { month: "short" }),
        colIndex: w,
      });
    }
  }

  const dayLabels = ["", "Mon", "", "Wed", "", "Fri", ""];

  return (
    <div className="space-y-2">
      <div className="flex gap-1 text-xs text-muted-foreground">
        {monthLabels.map((m, i) => (
          <span
            key={i}
            style={{ marginLeft: i === 0 ? `${m.colIndex * 14}px` : `${(m.colIndex - (monthLabels[i - 1]?.colIndex ?? 0) - 1) * 14}px` }}
          >
            {m.label}
          </span>
        ))}
      </div>
      <div className="flex gap-1">
        <div className="flex flex-col gap-1 text-xs text-muted-foreground w-8 shrink-0">
          {dayLabels.map((l, i) => (
            <span key={i} className="h-3 leading-3 text-right pr-1">{l}</span>
          ))}
        </div>
        <div className="flex gap-1 overflow-x-auto">
          {Array.from({ length: weeks }).map((_, w) => (
            <div key={w} className="flex flex-col gap-1">
              {days.slice(w * 7, w * 7 + 7).map((day) => (
                <div
                  key={day.key}
                  title={`${day.date.toLocaleDateString("en-US", { month: "short", day: "numeric" })}${day.active ? " — milestone completed" : ""}`}
                  className={cn(
                    "w-3 h-3 rounded-sm transition-all",
                    day.active
                      ? "bg-primary shadow-sm shadow-primary/30"
                      : "bg-muted/60",
                    day.isToday && !day.active && "ring-1 ring-primary/50"
                  )}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2 text-xs text-muted-foreground pt-1">
        <span>Less</span>
        <div className="flex gap-1">
          <div className="w-3 h-3 rounded-sm bg-muted/60" />
          <div className="w-3 h-3 rounded-sm bg-primary/30" />
          <div className="w-3 h-3 rounded-sm bg-primary/60" />
          <div className="w-3 h-3 rounded-sm bg-primary" />
        </div>
        <span>More</span>
      </div>
    </div>
  );
}

export default function GoalDetail() {
  const params = useParams();
  const id = parseInt(params.id || "0", 10);
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: goal, isLoading } = useGetGoal(id, { query: { enabled: !!id, queryKey: getGetGoalQueryKey(id) } });
  const deleteGoal = useDeleteGoal();

  const [isDecomposing, setIsDecomposing] = useState(false);
  const [decompositionStream, setDecompositionStream] = useState("");

  const handleDecompose = async () => {
    setIsDecomposing(true);
    setDecompositionStream("");
    try {
      const response = await fetch(`/api/goals/${id}/decompose`, { method: "POST" });
      if (!response.ok || !response.body) throw new Error("Failed to decompose");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        for (const line of chunk.split("\n")) {
          if (!line.startsWith("data: ")) continue;
          const dataStr = line.slice(6).trim();
          if (dataStr === "[DONE]") continue;
          try {
            const data = JSON.parse(dataStr);
            if (data.content) setDecompositionStream((prev) => prev + data.content);
            if (data.done) queryClient.invalidateQueries({ queryKey: getGetGoalQueryKey(id) });
          } catch {}
        }
      }
    } catch {
      toast({ title: "Failed to decompose goal", variant: "destructive" });
    } finally {
      setIsDecomposing(false);
      setDecompositionStream("");
    }
  };

  const toggleMilestone = async (milestoneId: number, currentStatus: string) => {
    try {
      await fetch(`/api/milestones/${milestoneId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: currentStatus === "completed" ? "pending" : "completed" }),
      });
      queryClient.invalidateQueries({ queryKey: getGetGoalQueryKey(id) });
      queryClient.invalidateQueries({ queryKey: getGetGoalsDashboardQueryKey() });
    } catch {
      toast({ title: "Failed to update milestone", variant: "destructive" });
    }
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this goal?")) {
      deleteGoal.mutate({ id }, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getListGoalsQueryKey() });
          queryClient.invalidateQueries({ queryKey: getGetGoalsDashboardQueryKey() });
          setLocation("/goals");
          toast({ title: "Goal deleted" });
        },
      });
    }
  };

  if (isLoading || !goal) {
    return (
      <div className="p-8 max-w-5xl mx-auto space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-20 bg-muted rounded-xl animate-pulse" />
        ))}
      </div>
    );
  }

  const completedMilestones = goal.milestones?.filter((m) => m.status === "completed").length ?? 0;
  const totalMilestones = goal.milestones?.length ?? 0;

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Button variant="ghost" size="sm" onClick={() => setLocation("/goals")} data-testid="button-back-to-goals">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Goals
      </Button>

      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div className="space-y-2">
          <div className="flex flex-wrap gap-2 mb-2">
            <Badge variant="secondary">{goal.category}</Badge>
            <Badge variant="outline">{goal.difficulty}</Badge>
            <Badge variant={goal.status === "completed" ? "default" : "secondary"}>{goal.status}</Badge>
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-semibold text-foreground" data-testid="text-goal-title">
            {goal.title}
          </h1>
          {goal.description && <p className="text-muted-foreground">{goal.description}</p>}
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={handleDecompose}
            disabled={isDecomposing}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
            data-testid="button-ai-decompose"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            {isDecomposing ? "Decomposing..." : totalMilestones > 0 ? "Regenerate" : "AI Decompose"}
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleDelete}
            className="text-destructive hover:bg-destructive/10 border-destructive/20"
            data-testid="button-delete-goal"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-primary/5 border-primary/10">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground mb-1">Progress</p>
            <p className="text-2xl font-display font-bold" data-testid="text-completion-rate">
              {Math.round(goal.completionRate)}%
            </p>
            <Progress value={goal.completionRate} className="h-1.5 mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground mb-1">Streak</p>
            <p className="text-2xl font-display font-bold text-orange-500 flex items-center gap-1">
              <Flame className="w-5 h-5" />
              {goal.currentStreak}
            </p>
            <p className="text-xs text-muted-foreground mt-1">days</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground mb-1">Milestones</p>
            <p className="text-2xl font-display font-bold" data-testid="text-milestones-progress">
              {completedMilestones}/{totalMilestones}
            </p>
            <p className="text-xs text-muted-foreground mt-1">completed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground mb-1">Total Days</p>
            <p className="text-2xl font-display font-bold">{goal.totalDays ?? 0}</p>
            <p className="text-xs text-muted-foreground mt-1">tracked</p>
          </CardContent>
        </Card>
      </div>

      {/* Streak calendar */}
      {goal.milestones && goal.milestones.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Activity</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 overflow-x-auto">
            <StreakCalendar milestones={goal.milestones} />
          </CardContent>
        </Card>
      )}

      {/* AI decompose stream */}
      {isDecomposing && (
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4 text-primary">
              <Sparkles className="w-5 h-5 animate-pulse" />
              <h3 className="font-semibold">AI is breaking down your goal...</h3>
            </div>
            <p className="whitespace-pre-wrap text-sm leading-relaxed opacity-80">{decompositionStream}</p>
          </CardContent>
        </Card>
      )}

      {/* Milestones list */}
      {goal.milestones && goal.milestones.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-display font-semibold">Milestones</h3>
          <div className="space-y-3">
            {[...goal.milestones].sort((a, b) => a.order - b.order).map((milestone, index) => (
              <Card
                key={milestone.id}
                data-testid={`card-milestone-${milestone.id}`}
                className={cn(
                  "transition-all duration-300",
                  milestone.status === "completed"
                    ? "bg-muted/40 border-transparent opacity-70"
                    : "hover:border-primary/40 hover:shadow-sm"
                )}
                style={{ animationDelay: `${index * 40}ms` }}
              >
                <CardContent className="p-4 flex items-start gap-4">
                  <button
                    onClick={() => toggleMilestone(milestone.id, milestone.status)}
                    className="mt-0.5 shrink-0 text-muted-foreground hover:text-primary transition-colors duration-200"
                    data-testid={`button-toggle-milestone-${milestone.id}`}
                  >
                    {milestone.status === "completed" ? (
                      <CheckCircle2 className="w-6 h-6 text-green-500" />
                    ) : (
                      <Circle className="w-6 h-6" />
                    )}
                  </button>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground font-mono shrink-0">
                        {String(milestone.order).padStart(2, "0")}
                      </span>
                      <h4
                        className={cn(
                          "font-medium transition-all",
                          milestone.status === "completed" && "line-through text-muted-foreground"
                        )}
                        data-testid={`text-milestone-title-${milestone.id}`}
                      >
                        {milestone.title}
                      </h4>
                    </div>
                    {milestone.description && (
                      <p className="text-sm text-muted-foreground mt-1 ml-7">{milestone.description}</p>
                    )}
                    {milestone.completedAt && (
                      <p className="text-xs text-green-600 mt-1 ml-7">
                        Completed {new Date(milestone.completedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </p>
                    )}
                  </div>
                  <Badge variant="outline" className="shrink-0 text-xs">
                    {milestone.difficulty}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {!goal.milestones || goal.milestones.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground space-y-3">
          <Sparkles className="w-10 h-10 mx-auto opacity-30" />
          <p className="font-medium">No milestones yet</p>
          <p className="text-sm">Hit "AI Decompose" and watch this goal turn into a plan.</p>
        </div>
      ) : null}
    </div>
  );
}
