import { useState, useRef, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Brain, Send, Lightbulb, MessageCircle, Plus } from "lucide-react";
import { toast } from "sonner";

interface ChatMessage {
  id: string;
  type: "user" | "ai";
  content: string;
  timestamp: Date;
  suggestedDrills?: string[];
}

const AICoach = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      type: "ai",
      content: "Hello! I'm your AI Coach. I can help you with training advice, answer questions about badminton techniques, suggest drills for your weaknesses, and create personalized training plans. What would you like to work on today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // AI response generator with contextual understanding
  const generateAIResponse = (userMessage: string): { response: string; drills?: string[] } => {
    const lowerInput = userMessage.toLowerCase();
    let response = "";
    let suggestedDrills: string[] = [];

    // Endurance/Stamina
    if (lowerInput.includes("tire") || lowerInput.includes("endurance") || lowerInput.includes("stamina") || lowerInput.includes("fatigue")) {
      response = "I see you're working on building endurance. This is crucial for competitive badminton. Here are my recommendations:\n\n1. Increase your aerobic capacity with 30-minute running sessions 3x per week\n2. Practice interval training to simulate match conditions\n3. Do longer rally drills (10+ minute sessions) to build match stamina\n4. Focus on consistent footwork even when tired\n\nWould you like me to create a specific endurance training plan?";
      suggestedDrills = [
        "30-minute steady cardio (3x/week)",
        "Interval training: 30s sprint, 30s recovery (5 rounds)",
        "Long rally drills: 10-15 minutes continuous",
        "Court sprints: baseline to net, 20 repetitions"
      ];
    }
    // Footwork/Movement
    else if (lowerInput.includes("footwork") || lowerInput.includes("movement") || lowerInput.includes("agility") || lowerInput.includes("slow")) {
      response = "Footwork is the foundation of badminton! Improving your movement will enhance all aspects of your game. Here's what I recommend:\n\n1. Daily ladder drills (15 minutes) for agility and coordination\n2. Shadow badminton practice to improve court coverage\n3. Multi-shuttle feeding drills for quick directional changes\n4. Practice explosive first-step movements\n\nConsistency is key - practice these drills daily for best results.";
      suggestedDrills = [
        "Ladder drills: 15 minutes daily",
        "Shadow badminton: 10 minutes",
        "Multi-shuttle feeding: 20 shuttles per direction",
        "Court corners drill: touch all 4 corners quickly"
      ];
    }
    // Net Play
    else if (lowerInput.includes("net") || lowerInput.includes("front court") || lowerInput.includes("drop shot")) {
      response = "Net play is essential for winning rallies! Here's how to improve your net game:\n\n1. Practice net shots: 100 repetitions daily with proper technique\n2. Work on tumbling and net recovery techniques\n3. Develop net kill variations and deception\n4. Practice soft drops and tight net shots\n5. Improve your reaction time at the net\n\nFocus on touch and control rather than power at the net.";
      suggestedDrills = [
        "Net shot practice: 100 reps daily",
        "Net recovery drills: 50 reps",
        "Deceptive net shots: 30 reps",
        "Net kill practice: 40 reps"
      ];
    }
    // Smash/Power
    else if (lowerInput.includes("smash") || lowerInput.includes("power") || lowerInput.includes("attack") || lowerInput.includes("overhead")) {
      response = "Developing a powerful smash is crucial for attacking play. Here's my training plan:\n\n1. Overhead smash drills focusing on arm rotation and timing\n2. Strengthen your shoulder and core muscles with targeted exercises\n3. Practice jump smash technique for more powerful attacks\n4. Work on smash placement and angles\n5. Develop consistency with multiple smash variations\n\nRemember: power comes from technique first, strength second.";
      suggestedDrills = [
        "Overhead smash drills: 50 reps",
        "Jump smash practice: 30 reps",
        "Smash placement drill: 40 reps",
        "Shoulder strengthening: 15 minutes"
      ];
    }
    // Defense
    else if (lowerInput.includes("defense") || lowerInput.includes("defensive") || lowerInput.includes("block") || lowerInput.includes("clear")) {
      response = "Strong defensive skills are vital for competitive play. Here's how to improve:\n\n1. Practice defensive clears to recover from attacking positions\n2. Work on block shots to neutralize opponent attacks\n3. Develop quick reflexes for smash defense\n4. Practice footwork to get into optimal defensive positions\n5. Build consistency with defensive strokes\n\nDefense wins matches - invest time in these fundamentals!";
      suggestedDrills = [
        "Defensive clear practice: 50 reps",
        "Block shot drills: 40 reps",
        "Smash defense: 30 reps",
        "Defensive footwork: 20 minutes"
      ];
    }
    // General improvement
    else if (lowerInput.includes("improve") || lowerInput.includes("better") || lowerInput.includes("progress")) {
      response = "Great! You're committed to improvement. Here's a comprehensive approach:\n\n1. Identify your specific weaknesses through match analysis\n2. Create a balanced training plan covering all aspects: footwork, shots, fitness, tactics\n3. Practice consistently - quality over quantity\n4. Track your progress and adjust your training accordingly\n5. Get feedback from experienced players or coaches\n\nWhat specific area would you like to focus on first?";
      suggestedDrills = [
        "Full-body warm-up: 10 minutes",
        "Footwork drills: 15 minutes",
        "Shot practice: 20 minutes",
        "Fitness training: 15 minutes"
      ];
    }
    // Injuries/Recovery
    else if (lowerInput.includes("injury") || lowerInput.includes("pain") || lowerInput.includes("recover") || lowerInput.includes("rest")) {
      response = "Recovery and injury prevention are crucial for long-term success. Here's my advice:\n\n1. Always warm up properly before training (10-15 minutes)\n2. Cool down and stretch after each session\n3. Include rest days in your training schedule\n4. Listen to your body and avoid training through pain\n5. Consider cross-training to prevent overuse injuries\n\nIf you have persistent pain, consult with a medical professional. Your health comes first!";
      suggestedDrills = [
        "Dynamic warm-up: 10 minutes",
        "Cool-down stretching: 10 minutes",
        "Recovery day activities: light cardio",
        "Injury prevention exercises: 15 minutes"
      ];
    }
    // Tactics/Strategy
    else if (lowerInput.includes("tactic") || lowerInput.includes("strategy") || lowerInput.includes("opponent") || lowerInput.includes("match")) {
      response = "Tactical awareness is what separates good players from great ones. Here's my strategic advice:\n\n1. Analyze your opponent's strengths and weaknesses\n2. Develop a game plan based on their playing style\n3. Mix up your shots to keep opponents guessing\n4. Use court positioning strategically\n5. Practice match scenarios during training\n\nRemember: adapt your tactics based on how the match unfolds.";
      suggestedDrills = [
        "Match simulation: 30 minutes",
        "Tactical drills: 20 minutes",
        "Pressure situation practice: 15 minutes",
        "Video analysis: study opponent patterns"
      ];
    }
    // Default response
    else {
      response = `I understand you're interested in: "${userMessage}"\n\nBased on your input, here are some general recommendations:\n\n1. Focus on the fundamentals: footwork, timing, and consistency\n2. Practice with purpose - identify what you want to improve\n3. Get feedback from experienced players or coaches\n4. Train regularly and track your progress\n5. Stay motivated and enjoy the process!\n\nFeel free to ask me about specific techniques, training plans, or any badminton-related questions!`;
      suggestedDrills = [
        "General footwork drills: 15 minutes",
        "Shot practice: 20 minutes",
        "Fitness training: 15 minutes",
        "Cool-down and recovery: 10 minutes"
      ];
    }

    return { response, drills: suggestedDrills };
  };

  const handleSendMessage = async () => {
    if (!input.trim()) {
      toast.error("Please enter a message");
      return;
    }

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    // Simulate AI response delay
    setTimeout(() => {
      const { response, drills } = generateAIResponse(input);
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: response,
        timestamp: new Date(),
        suggestedDrills: drills,
      };
      setMessages((prev) => [...prev, aiMessage]);
      setLoading(false);
    }, 800);
  };

  const handleApplyDrill = (drill: string) => {
    toast.success(`"${drill}" added to your training plan!`);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
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
              Chat with your personal AI coach for training advice and personalized recommendations
            </p>
          </div>

          <Card className="p-6 bg-gradient-card border-border animate-fade-in-up mb-8 h-[600px] flex flex-col">
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto mb-6 space-y-4 pr-2">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-xs lg:max-w-md xl:max-w-lg rounded-lg p-4 ${
                      message.type === "user"
                        ? "bg-gradient-primary text-white rounded-br-none"
                        : "bg-secondary text-foreground rounded-bl-none border border-border"
                    }`}
                  >
                    <p className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</p>

                    {/* Suggested Drills */}
                    {message.suggestedDrills && message.suggestedDrills.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-current border-opacity-20">
                        <p className="text-xs font-semibold mb-2 opacity-90">Suggested Drills:</p>
                        <div className="space-y-1">
                          {message.suggestedDrills.map((drill, idx) => (
                            <div key={idx} className="flex items-center justify-between text-xs">
                              <span className="opacity-90">{drill}</span>
                              <Button
                                size="sm"
                                variant="ghost"
                                className={`h-6 px-2 text-xs ${
                                  message.type === "ai"
                                    ? "hover:bg-primary hover:text-white"
                                    : "hover:bg-white hover:bg-opacity-20"
                                }`}
                                onClick={() => handleApplyDrill(drill)}
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <p className={`text-xs mt-2 opacity-70`}>
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="bg-secondary text-foreground rounded-lg rounded-bl-none p-4 border border-border">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="flex gap-2 border-t border-border pt-4">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about training, techniques, or weaknesses..."
                className="bg-background border-border focus:border-primary transition-colors"
                disabled={loading}
              />
              <Button
                onClick={handleSendMessage}
                disabled={loading}
                className="bg-gradient-primary shadow-glow hover:shadow-glow-strong"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-card border-border animate-fade-in-up">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center shadow-glow">
                <Lightbulb className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-primary">How to Get the Best Advice</h3>
            </div>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Be specific about your weaknesses or questions</li>
              <li>• Mention specific techniques (footwork, net play, smash, etc.)</li>
              <li>• Ask about training plans, tactics, or recovery</li>
              <li>• Click the + button to add suggested drills to your training plan</li>
              <li>• Your chat history is saved for future reference</li>
            </ul>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AICoach;
