import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Brain, Send, Lightbulb } from "lucide-react";
import { toast } from "sonner";

const AICoach = () => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const analyzeWeakness = () => {
    if (!input.trim()) {
      toast.error("Please describe your weakness or observation");
      return;
    }

    // Simple keyword-based suggestions (in real app, this would use NLP)
    const keywords = input.toLowerCase();
    const newSuggestions: string[] = [];

    if (keywords.includes("tire") || keywords.includes("endurance") || keywords.includes("stamina")) {
      newSuggestions.push("Increase cardio training: 30-minute running sessions 3x per week");
      newSuggestions.push("Add interval training to build stamina");
      newSuggestions.push("Practice longer rally drills to improve match endurance");
    }
    
    if (keywords.includes("footwork") || keywords.includes("movement") || keywords.includes("slow")) {
      newSuggestions.push("Ladder drills for 15 minutes daily to improve agility");
      newSuggestions.push("Shadow badminton practice to enhance court coverage");
      newSuggestions.push("Multi-shuttle feeding drills for quick directional changes");
    }
    
    if (keywords.includes("net") || keywords.includes("front court")) {
      newSuggestions.push("Net shot practice: 100 repetitions daily");
      newSuggestions.push("Practice tumbling and net recovery techniques");
      newSuggestions.push("Work on net kill variations and deception");
    }
    
    if (keywords.includes("smash") || keywords.includes("power") || keywords.includes("attack")) {
      newSuggestions.push("Overhead smash drills with focus on arm rotation");
      newSuggestions.push("Strengthen shoulder and core muscles");
      newSuggestions.push("Practice jump smash technique for powerful attacks");
    }

    if (newSuggestions.length === 0) {
      newSuggestions.push("Focus on all-around skill development");
      newSuggestions.push("Analyze match recordings to identify specific weaknesses");
      newSuggestions.push("Consult with coach for personalized training plan");
    }

    setSuggestions(newSuggestions);
    toast.success("AI analysis complete!");
  };

  return (
    <div className="min-h-screen bg-gradient-dark">
      <Navbar />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary to-glow-secondary bg-clip-text text-transparent">
                AI Coach Assistant
              </span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Get personalized drill recommendations based on your weaknesses
            </p>
          </div>

          <Card className="p-8 bg-gradient-card border-border animate-fade-in-up mb-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center shadow-glow">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-primary">Describe Your Weakness</h2>
            </div>
            
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Example: I tire quickly during long rallies, or My net shots are inconsistent..."
              rows={5}
              className="mb-4 bg-background border-border focus:border-primary transition-colors resize-none"
            />
            
            <Button
              onClick={analyzeWeakness}
              className="w-full bg-gradient-primary shadow-glow hover:shadow-glow-strong"
            >
              <Send className="w-4 h-4 mr-2" />
              Get AI Recommendations
            </Button>
          </Card>

          {suggestions.length > 0 && (
            <Card className="p-8 bg-gradient-card border-border animate-fade-in">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center shadow-glow">
                  <Lightbulb className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-primary">Recommended Drills</h2>
              </div>
              
              <div className="space-y-4">
                {suggestions.map((suggestion, idx) => (
                  <div key={idx} className="p-4 bg-gradient-to-r from-primary/10 to-transparent rounded-lg border border-primary/30 group hover:border-primary transition-all">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center shadow-glow flex-shrink-0 mt-1">
                        <span className="text-white font-bold">{idx + 1}</span>
                      </div>
                      <p className="text-foreground leading-relaxed flex-1">{suggestion}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          <Card className="mt-8 p-6 bg-gradient-card border-border animate-fade-in-up">
            <h3 className="text-xl font-bold mb-3 text-primary">How to Use AI Coach</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Type any weakness or observation about your game</li>
              <li>• Be specific: mention skills like footwork, endurance, net play, or smash</li>
              <li>• The AI will analyze your input and suggest targeted drills</li>
              <li>• Save suggestions and integrate them into your training planner</li>
            </ul>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AICoach;
