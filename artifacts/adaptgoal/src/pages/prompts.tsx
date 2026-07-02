import { useState } from "react";
import { useListPrompts, getListPromptsQueryKey } from "@workspace/api-client-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Calendar, Sparkles } from "lucide-react";
import { format } from "date-fns";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

export default function Prompts() {
  const { data: prompts, isLoading } = useListPrompts();
  const [isGenerating, setIsGenerating] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [streamedPrompt, setStreamedPrompt] = useState("");

  const handleGenerate = async () => {
    setIsGenerating(true);
    setStreamedPrompt("");
    try {
      const response = await fetch("/api/prompts/generate", { method: "POST" });
      if (!response.ok || !response.body) throw new Error("Failed to generate");

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
                setStreamedPrompt(prev => prev + data.content);
              }
              if (data.done) {
                queryClient.invalidateQueries({ queryKey: getListPromptsQueryKey() });
                toast({ title: "New prompt generated" });
              }
            } catch (err) {}
          }
        }
      }
    } catch (error) {
      toast({ title: "Failed to generate prompt", variant: "destructive" });
    } finally {
      setIsGenerating(false);
      setStreamedPrompt("");
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-semibold text-foreground tracking-tight">Motivational Prompts</h1>
          <p className="text-muted-foreground mt-1">Your AI-generated daily reinforcement history.</p>
        </div>
        <Button onClick={handleGenerate} disabled={isGenerating} className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Sparkles className="w-4 h-4 mr-2" />
          {isGenerating ? "Generating..." : "Generate Fresh Prompt"}
        </Button>
      </div>

      {isGenerating && streamedPrompt && (
        <Card className="bg-primary/10 border-primary/20 shadow-none overflow-hidden relative border-2 border-primary/30">
          <CardContent className="p-8">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                <Sparkles className="w-6 h-6 text-primary animate-pulse" />
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">Synthesizing...</h3>
                <p className="text-xl md:text-2xl font-serif text-foreground leading-relaxed italic opacity-80">
                  {streamedPrompt}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => <div key={i} className="h-32 bg-muted rounded-xl animate-pulse"></div>)}
        </div>
      ) : (
        <div className="space-y-6">
          {prompts?.sort((a,b) => new Date(b.generatedAt).getTime() - new Date(a.generatedAt).getTime()).map((prompt, i) => (
            <Card key={prompt.id} className="relative overflow-hidden hover:border-primary/30 transition-colors">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/50 to-accent/50"></div>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <Calendar className="w-4 h-4" />
                  {format(new Date(prompt.generatedAt), "EEEE, MMMM do, yyyy")}
                </div>
                <p className="text-lg font-serif text-foreground leading-relaxed">
                  "{prompt.content}"
                </p>
              </CardContent>
            </Card>
          ))}
          {prompts?.length === 0 && (
            <div className="py-12 text-center border border-dashed rounded-xl text-muted-foreground">
              <Zap className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No prompts generated yet.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
