import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { useGetProfile, useCreateOpenaiConversation } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Send, Bot, User, Sparkles, Globe, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface CultureOption {
  id: string;
  label: string;
  flag: string;
  tagline: string;
}

const CULTURES: CultureOption[] = [
  { id: "india", label: "India", flag: "🇮🇳", tagline: "IIT grind, family pride, jugaad spirit" },
  { id: "usa", label: "United States", flag: "🇺🇸", tagline: "Personal agency, hustle, measurable wins" },
  { id: "general", label: "Global / Other", flag: "🌍", tagline: "Universally applicable coaching" },
];

const OPENERS: Record<string, string> = {
  india: "Okay, I've read 47 self-help books so you don't have to — plus the entire JEE syllabus (that last part is a lie). I'm AdaptGoal AI, your personal coach minus the $300/hour rate and the unsolicited advice about waking up at 4am. So — what's that one thing you keep telling yourself you'll \"start after this exam\"?",
  usa: "Okay, I've read 47 self-help books so you don't have to. I'm AdaptGoal AI — your personal coach, minus the $300/hour rate and the unsolicited life advice about cold plunges. Let's figure out what you actually want to accomplish. What's one thing you keep telling yourself you'll \"start on Monday\"?",
  general: "Okay, I've read 47 self-help books so you don't have to. I'm AdaptGoal AI — your personal coach, minus the $300/hour rate and the unsolicited life advice about cold plunges. Let's figure out what you actually want to accomplish. What's one big thing you've been meaning to start?",
};

export default function Onboarding() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { data: profile, isLoading: profileLoading, isError: profileError } = useGetProfile();
  const createConv = useCreateOpenaiConversation();

  const [step, setStep] = useState<"culture" | "chat">("culture");
  const [selectedCulture, setSelectedCulture] = useState<string | null>(null);
  const [conversationId, setConversationId] = useState<number | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [profileComplete, setProfileComplete] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!profileLoading && !profileError && profile?.onboardingComplete) {
      setLocation("/");
    }
  }, [profile, profileLoading, profileError, setLocation]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const startChat = (cultureId: string) => {
    setSelectedCulture(cultureId);

    // Save cultural background immediately before chat
    fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: profile?.name || "User",
        personalityTraits: profile?.personalityTraits || [],
        habits: profile?.habits || [],
        ambitions: profile?.ambitions || [],
        motivationStyle: profile?.motivationStyle || "balanced",
        culturalBackground: cultureId,
        onboardingComplete: false,
      }),
    }).catch(() => {});

    const opener = OPENERS[cultureId] ?? OPENERS.general;
    setMessages([{ role: "assistant", content: opener }]);
    setStep("chat");

    createConv.mutate({ data: { title: "Onboarding" } }, {
      onSuccess: (data) => setConversationId(data.id),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !conversationId || isStreaming) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsStreaming(true);

    try {
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      const response = await fetch(`/api/openai/conversations/${conversationId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: userMessage }),
      });

      if (!response.ok || !response.body) throw new Error("Failed to send message");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantContent = "";

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
            if (data.content) {
              assistantContent += data.content;
              setMessages((prev) => {
                const updated = [...prev];
                updated[updated.length - 1] = { role: "assistant", content: assistantContent };
                return updated;
              });
            }
            if (data.done && data.profileExtracted) {
              setProfileComplete(true);
            }
          } catch {}
        }
      }

      setIsStreaming(false);

      if (profileComplete) {
        toast({ title: "Profile complete", description: "Taking you to your dashboard..." });
        setTimeout(() => setLocation("/"), 1800);
      }
    } catch {
      setIsStreaming(false);
      toast({ title: "Error", description: "Failed to process message.", variant: "destructive" });
    }
  };

  if (profileLoading && !profileError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Sparkles className="animate-spin text-primary w-8 h-8" />
      </div>
    );
  }

  if (step === "culture") {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-lg space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="text-center space-y-3">
            <div className="flex items-center justify-center gap-2 text-primary mb-2">
              <Globe className="w-6 h-6" />
            </div>
            <h1 className="text-3xl font-display font-semibold">Where are you from?</h1>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Your coach adapts to your cultural context — the goals that matter, the pressures you face, and what actually motivates you.
            </p>
          </div>

          <div className="space-y-3">
            {CULTURES.map((culture) => (
              <button
                key={culture.id}
                onClick={() => startChat(culture.id)}
                data-testid={`button-culture-${culture.id}`}
                className={cn(
                  "w-full text-left rounded-xl border p-4 transition-all duration-200",
                  "hover:border-primary/60 hover:bg-primary/5 hover:shadow-sm",
                  "focus:outline-none focus:ring-2 focus:ring-primary/30",
                  "flex items-center justify-between gap-4 group"
                )}
              >
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{culture.flag}</span>
                  <div>
                    <p className="font-semibold text-foreground">{culture.label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{culture.tagline}</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
              </button>
            ))}
          </div>

          <p className="text-center text-xs text-muted-foreground">
            More regions coming soon — your input shapes them.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl flex flex-col h-[85vh]">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-display font-semibold mb-1">Welcome to AdaptGoal AI</h1>
          <p className="text-muted-foreground text-sm">
            Building your personalised profile
            {selectedCulture && selectedCulture !== "general" && (
              <span className="ml-1">
                — {CULTURES.find((c) => c.id === selectedCulture)?.flag}{" "}
                {CULTURES.find((c) => c.id === selectedCulture)?.label} mode
              </span>
            )}
          </p>
        </div>

        <Card className="flex-1 flex flex-col overflow-hidden shadow-lg border-primary/10">
          <div className="flex-1 overflow-y-auto p-6 space-y-5" ref={scrollRef}>
            {messages.map((msg, i) => (
              <div
                key={i}
                className={cn(
                  "flex gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300",
                  msg.role === "user" ? "flex-row-reverse" : "flex-row"
                )}
              >
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5",
                    msg.role === "assistant"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground"
                  )}
                >
                  {msg.role === "assistant" ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>
                <div
                  className={cn(
                    "px-4 py-3 rounded-2xl max-w-[82%] text-sm leading-relaxed",
                    msg.role === "assistant"
                      ? "bg-muted text-foreground rounded-tl-sm"
                      : "bg-primary text-primary-foreground rounded-tr-sm"
                  )}
                >
                  {msg.content ? (
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                  ) : (
                    <span className="flex gap-1 items-center h-5">
                      <span className="w-1.5 h-1.5 rounded-full bg-current animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-current animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-current animate-bounce" style={{ animationDelay: "300ms" }} />
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t bg-card/80 backdrop-blur-sm">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your response..."
                disabled={isStreaming || !conversationId}
                className="flex-1"
                data-testid="input-message"
              />
              <Button
                type="submit"
                disabled={isStreaming || !input.trim() || !conversationId}
                data-testid="button-send-message"
              >
                <Send className="w-4 h-4 mr-2" />
                Send
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
}
