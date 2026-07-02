import { useState } from "react";
import { useLocation, Link } from "wouter";
import { useListGoals, useCreateGoal, getListGoalsQueryKey, getGetGoalsDashboardQueryKey } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Target, ArrowRight } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

export default function Goals() {
  const { data: goals, isLoading } = useListGoals();
  const createGoal = useCreateGoal();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({ title: "", category: "Career", difficulty: "Medium" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) return;

    createGoal.mutate({ data: formData }, {
      onSuccess: (newGoal) => {
        setIsDialogOpen(false);
        setFormData({ title: "", category: "Career", difficulty: "Medium" });
        queryClient.invalidateQueries({ queryKey: getListGoalsQueryKey() });
        queryClient.invalidateQueries({ queryKey: getGetGoalsDashboardQueryKey() });
        toast({ title: "Goal created successfully" });
        setLocation(`/goals/${newGoal.id}`);
      }
    });
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-semibold text-foreground tracking-tight">Your Goals</h1>
          <p className="text-muted-foreground mt-1">Manage and track your active objectives.</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="w-4 h-4 mr-2" />
              New Goal
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create a New Goal</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="title">Goal Title</Label>
                <Input 
                  id="title" 
                  value={formData.title} 
                  onChange={(e) => setFormData(p => ({ ...p, title: e.target.value }))}
                  placeholder="e.g., Launch my startup"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={formData.category} onValueChange={(val) => setFormData(p => ({ ...p, category: val }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Career">Career</SelectItem>
                    <SelectItem value="Health">Health</SelectItem>
                    <SelectItem value="Learning">Learning</SelectItem>
                    <SelectItem value="Personal">Personal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="difficulty">Difficulty</Label>
                <Select value={formData.difficulty} onValueChange={(val) => setFormData(p => ({ ...p, difficulty: val }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Easy">Easy</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Hard">Hard</SelectItem>
                    <SelectItem value="Epic">Epic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full" disabled={createGoal.isPending}>
                {createGoal.isPending ? "Creating..." : "Create Goal"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => <div key={i} className="h-48 bg-muted rounded-xl animate-pulse"></div>)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {goals?.map(goal => (
            <Link key={goal.id} href={`/goals/${goal.id}`}>
              <Card className="hover-elevate cursor-pointer h-full border-border/50 bg-card hover:border-primary/50 transition-colors">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-4">
                    <Badge variant={goal.status === "completed" ? "default" : "secondary"}>
                      {goal.status}
                    </Badge>
                    <Badge variant="outline">{goal.difficulty}</Badge>
                  </div>
                  <h3 className="font-display font-semibold text-lg mb-2 text-foreground">{goal.title}</h3>
                  <div className="mt-auto space-y-3 pt-4">
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Progress</span>
                      <span>{goal.completionRate}%</span>
                    </div>
                    <Progress value={goal.completionRate} className="h-2" />
                    <div className="flex items-center text-sm text-muted-foreground pt-2">
                      <Target className="w-4 h-4 mr-2" />
                      <span>{goal.category}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
          {goals?.length === 0 && (
            <div className="col-span-full py-12 text-center border border-dashed rounded-xl">
              <Target className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium">No active goals</h3>
              <p className="text-muted-foreground mb-4">You haven't set any goals yet.</p>
              <Button onClick={() => setIsDialogOpen(true)} variant="outline">Set your first goal</Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
