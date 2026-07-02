import { useState, useRef } from "react";
import { useParams, useLocation } from "wouter";
import { useGetGoal, useUpdateGoal, useDeleteGoal, getGetGoalQueryKey, getListGoalsQueryKey, getGetGoalsDashboardQueryKey } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, CheckCircle2, Circle, ArrowLeft, Trash2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export default function GoalDetail() {
  const params = useParams();
  const id = parseInt(params.id || "0", 10);
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: goal, isLoading } = useGetGoal(id, { query: { enabled: !!id, queryKey: getGetGoalQueryKey(id) } });
  const updateGoal = useUpdateGoal();
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
        const lines = chunk.split("\n");
        
        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const dataStr = line.replace("data: ", "").trim();
            if (dataStr === "[DONE]") continue;
            try {
              const data = JSON.parse(dataStr);
              if (data.content) {
                setDecompositionStream(prev => prev + data.content);
              }
              if (data.done) {
                queryClient.invalidateQueries({ queryKey: getGetGoalQueryKey(id) });
              }
            } catch (err) {}
          }
        }
      }
    } catch (error) {
      toast({ title: "Failed to decompose goal", variant: "destructive" });
    } finally {
      setIsDecomposing(false);
    }
  };

  const toggleMilestone = async (milestoneId: number, currentStatus: string) => {
    // We don't have useUpdateMilestone in standard exported bindings if it's nested or missing, let's just use raw fetch or mock patch
    try {
      await fetch(`/api/milestones/${milestoneId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: currentStatus === "completed" ? "pending" : "completed" })
      });
      queryClient.invalidateQueries({ queryKey: getGetGoalQueryKey(id) });
      queryClient.invalidateQueries({ queryKey: getGetGoalsDashboardQueryKey() });
    } catch (e) {
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
        }
      });
    }
  };

  if (isLoading || !goal) return <div className="p-8"><div className="h-8 w-32 bg-muted rounded animate-pulse"></div></div>;

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Button variant="ghost" size="sm" onClick={() => setLocation("/goals")} className="mb-4">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Goals
      </Button>

      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div className="space-y-2">
          <div className="flex gap-2 mb-2">
            <Badge variant="secondary">{goal.category}</Badge>
            <Badge variant="outline">{goal.difficulty}</Badge>
            <Badge variant={goal.status === "completed" ? "default" : "secondary"}>{goal.status}</Badge>
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-semibold text-foreground">{goal.title}</h1>
          {goal.description && <p className="text-muted-foreground">{goal.description}</p>}
        </div>
        <div className="flex items-center gap-2">
          {(!goal.milestones || goal.milestones.length === 0) && (
            <Button onClick={handleDecompose} disabled={isDecomposing} className="bg-indigo-600 hover:bg-indigo-700 text-white">
              <Sparkles className="w-4 h-4 mr-2" />
              {isDecomposing ? "Decomposing..." : "AI Decompose"}
            </Button>
          )}
          <Button variant="outline" size="icon" onClick={handleDelete} className="text-destructive hover:bg-destructive/10 border-destructive/20">
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <Card className="bg-primary/5 border-primary/10">
        <CardContent className="p-6">
          <div className="flex justify-between items-end mb-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Overall Progress</p>
              <h3 className="text-2xl font-display font-bold">{goal.completionRate}%</h3>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-muted-foreground">Current Streak</p>
              <p className="font-semibold text-orange-500">{goal.currentStreak} days</p>
            </div>
          </div>
          <Progress value={goal.completionRate} className="h-3" />
        </CardContent>
      </Card>

      {isDecomposing && (
        <Card className="border-indigo-200 bg-indigo-50/50 dark:bg-indigo-950/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4 text-indigo-600">
              <Sparkles className="w-5 h-5 animate-pulse" />
              <h3 className="font-semibold">AI is analyzing your goal...</h3>
            </div>
            <p className="whitespace-pre-wrap text-sm leading-relaxed opacity-80">{decompositionStream}</p>
          </CardContent>
        </Card>
      )}

      {goal.milestones && goal.milestones.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-display font-semibold">Milestones</h3>
          <div className="space-y-3">
            {goal.milestones.sort((a,b) => a.order - b.order).map((milestone) => (
              <Card 
                key={milestone.id} 
                className={cn(
                  "transition-all",
                  milestone.status === "completed" ? "bg-muted/50 border-transparent opacity-75" : "hover:border-primary/50"
                )}
              >
                <CardContent className="p-4 flex items-start gap-4">
                  <button 
                    onClick={() => toggleMilestone(milestone.id, milestone.status)}
                    className="mt-1 shrink-0 text-muted-foreground hover:text-primary transition-colors"
                  >
                    {milestone.status === "completed" ? (
                      <CheckCircle2 className="w-6 h-6 text-green-500" />
                    ) : (
                      <Circle className="w-6 h-6" />
                    )}
                  </button>
                  <div className="flex-1">
                    <h4 className={cn("font-medium", milestone.status === "completed" && "line-through text-muted-foreground")}>
                      {milestone.title}
                    </h4>
                    {milestone.description && (
                      <p className="text-sm text-muted-foreground mt-1">{milestone.description}</p>
                    )}
                  </div>
                  <Badge variant="outline" className="shrink-0">{milestone.difficulty}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
