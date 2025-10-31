import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RefreshCw, Plus, Trash2, Calendar, Zap, CheckCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface Drill {
  id: string;
  name: string;
  duration: number;
  intensity: "low" | "medium" | "high";
  type: "skill" | "fitness" | "tactical";
}

interface TrainingPlan {
  id: string;
  date: string;
  userGoal: string;
  drills: Drill[];
  warmup: string;
  cooldown: string;
  notes: string;
  status: "pending" | "in-progress" | "completed";
}

const Training = () => {
  const [availableDrills] = useState<Drill[]>([
    { id: "1", name: "Footwork Ladder Drills", duration: 15, intensity: "high", type: "skill" },
    { id: "2", name: "Smash Practice", duration: 20, intensity: "high", type: "skill" },
    { id: "3", name: "Endurance Running", duration: 30, intensity: "high", type: "fitness" },
    { id: "4", name: "Net Shot Practice", duration: 15, intensity: "medium", type: "skill" },
    { id: "5", name: "Defense Drills", duration: 20, intensity: "medium", type: "skill" },
    { id: "6", name: "Tactical Positioning", duration: 25, intensity: "medium", type: "tactical" },
    { id: "7", name: "Interval Training", duration: 20, intensity: "high", type: "fitness" },
    { id: "8", name: "Shadow Badminton", duration: 15, intensity: "medium", type: "skill" },
    { id: "9", name: "Core Strengthening", duration: 15, intensity: "medium", type: "fitness" },
    { id: "10", name: "Flexibility & Stretching", duration: 15, intensity: "low", type: "fitness" },
  ]);

  const [userGoal, setUserGoal] = useState("");
  const [selectedDrills, setSelectedDrills] = useState<string[]>([]);
  const [generatedPlan, setGeneratedPlan] = useState<TrainingPlan | null>(null);
  const [savedPlans, setSavedPlans] = useState<TrainingPlan[]>([]);
  const [loading, setLoading] = useState(false);

  // Generate AI-driven training plan
  const generateAIPlan = () => {
    if (!userGoal.trim()) {
      toast.error("Please enter your training goal");
      return;
    }

    setLoading(true);

    // Simulate AI processing
    setTimeout(() => {
      const goalLower = userGoal.toLowerCase();
      let recommendedDrills: Drill[] = [];
      let warmupNote = "Dynamic warm-up: 10 minutes of light cardio and dynamic stretching";
      let cooldownNote = "Cool-down: 10 minutes of static stretching and breathing exercises";

      // AI logic to select drills based on goal
      if (goalLower.includes("endurance") || goalLower.includes("stamina")) {
        recommendedDrills = [
          availableDrills[2], // Endurance Running
          availableDrills[6], // Interval Training
          availableDrills[0], // Footwork Ladder
          availableDrills[8], // Core Strengthening
        ];
        warmupNote = "Extended warm-up: 15 minutes - light jog, dynamic stretches, gradual intensity increase";
      } else if (goalLower.includes("smash") || goalLower.includes("power") || goalLower.includes("attack")) {
        recommendedDrills = [
          availableDrills[1], // Smash Practice
          availableDrills[8], // Core Strengthening
          availableDrills[0], // Footwork Ladder
          availableDrills[4], // Defense Drills
        ];
        warmupNote = "Shoulder-focused warm-up: 12 minutes with emphasis on rotational movements";
      } else if (goalLower.includes("footwork") || goalLower.includes("agility") || goalLower.includes("movement")) {
        recommendedDrills = [
          availableDrills[0], // Footwork Ladder
          availableDrills[7], // Shadow Badminton
          availableDrills[5], // Tactical Positioning
          availableDrills[6], // Interval Training
        ];
        warmupNote = "Agility warm-up: 10 minutes with focus on quick directional changes";
      } else if (goalLower.includes("net") || goalLower.includes("front court")) {
        recommendedDrills = [
          availableDrills[3], // Net Shot Practice
          availableDrills[0], // Footwork Ladder
          availableDrills[5], // Tactical Positioning
          availableDrills[4], // Defense Drills
        ];
        warmupNote = "Net-focused warm-up: 10 minutes with emphasis on quick reflexes";
      } else if (goalLower.includes("defense") || goalLower.includes("defensive")) {
        recommendedDrills = [
          availableDrills[4], // Defense Drills
          availableDrills[0], // Footwork Ladder
          availableDrills[7], // Shadow Badminton
          availableDrills[2], // Endurance Running
        ];
        warmupNote = "Defensive positioning warm-up: 10 minutes focusing on court coverage";
      } else if (goalLower.includes("balanced") || goalLower.includes("all-around")) {
        recommendedDrills = [
          availableDrills[0], // Footwork Ladder
          availableDrills[1], // Smash Practice
          availableDrills[3], // Net Shot Practice
          availableDrills[4], // Defense Drills
          availableDrills[6], // Interval Training
        ];
        warmupNote = "Comprehensive warm-up: 15 minutes covering all movement patterns";
      } else {
        // Default balanced plan
        recommendedDrills = [
          availableDrills[0], // Footwork Ladder
          availableDrills[1], // Smash Practice
          availableDrills[3], // Net Shot Practice
          availableDrills[4], // Defense Drills
        ];
      }

      const plan: TrainingPlan = {
        id: Date.now().toString(),
        date: new Date().toISOString().split("T")[0],
        userGoal,
        drills: recommendedDrills,
        warmup: warmupNote,
        cooldown: cooldownNote,
        notes: `AI-generated plan based on your goal: "${userGoal}". Total duration: ${recommendedDrills.reduce((sum, d) => sum + d.duration, 0) + 20} minutes. Adjust intensity as needed.`,
        status: "pending",
      };

      setGeneratedPlan(plan);
      toast.success("Training plan generated successfully!");
      setLoading(false);
    }, 1000);
  };

  const savePlan = () => {
    if (!generatedPlan) {
      toast.error("No plan to save");
      return;
    }

    setSavedPlans([...savedPlans, generatedPlan]);
    toast.success("Training plan saved!");
  };

  const regeneratePlan = () => {
    setGeneratedPlan(null);
    setUserGoal("");
    setSelectedDrills([]);
  };

  const toggleDrill = (drillId: string) => {
    setSelectedDrills((prev) =>
      prev.includes(drillId) ? prev.filter((id) => id !== drillId) : [...prev, drillId]
    );
  };

  const calculateTotalDuration = () => {
    if (!generatedPlan) return 0;
    return generatedPlan.drills.reduce((sum, d) => sum + d.duration, 0) + 20; // +20 for warmup and cooldown
  };

  const getIntensityColor = (intensity: string) => {
    switch (intensity) {
      case "low":
        return "text-green-400";
      case "medium":
        return "text-yellow-400";
      case "high":
        return "text-red-400";
      default:
        return "text-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-dark">
      <Navbar />

      <main className="pt-24 pb-12">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary to-glow-secondary bg-clip-text text-transparent">
                Training Planner
              </span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Create personalized, AI-driven training plans based on your goals
            </p>
          </div>

          {!generatedPlan ? (
            <Card className="p-8 bg-gradient-card border-border animate-fade-in-up mb-8">
              <h2 className="text-2xl font-bold mb-6 text-primary flex items-center">
                <Zap className="w-6 h-6 mr-2" />
                Create Your Training Plan
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    What's your training goal?
                  </label>
                  <Textarea
                    value={userGoal}
                    onChange={(e) => setUserGoal(e.target.value)}
                    placeholder="Example: I want to improve my endurance this week... or Focus on net play and tactical positioning... or Build overall fitness and power..."
                    rows={4}
                    className="bg-background border-border focus:border-primary transition-colors resize-none"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    Be specific about what you want to work on. The AI will create a customized plan for you.
                  </p>
                </div>

                <Button
                  onClick={generateAIPlan}
                  disabled={loading}
                  className="w-full bg-gradient-primary shadow-glow hover:shadow-glow-strong py-6 text-lg"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  {loading ? "Generating Plan..." : "Generate AI Training Plan"}
                </Button>
              </div>

              <div className="mt-8 p-6 bg-secondary rounded-lg border border-border">
                <h3 className="text-lg font-bold mb-3 text-primary flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  Available Drills
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {availableDrills.map((drill) => (
                    <div key={drill.id} className="flex items-center justify-between p-3 bg-background rounded-lg border border-border">
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{drill.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {drill.duration} min • {drill.type} • <span className={getIntensityColor(drill.intensity)}>{drill.intensity}</span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ) : (
            <>
              <Card className="p-8 bg-gradient-card border-border animate-fade-in-up mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-primary flex items-center">
                    <CheckCircle className="w-6 h-6 mr-2 text-green-400" />
                    Your Training Plan
                  </h2>
                  <div className="flex gap-2">
                    <Button
                      onClick={savePlan}
                      className="bg-gradient-primary shadow-glow hover:shadow-glow-strong"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Save Plan
                    </Button>
                    <Button
                      onClick={regeneratePlan}
                      variant="outline"
                      className="border-primary/30 hover:bg-primary/10"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      New Plan
                    </Button>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Goal Summary */}
                  <div className="p-4 bg-primary/10 rounded-lg border border-primary/30">
                    <p className="text-sm text-muted-foreground">Your Goal:</p>
                    <p className="text-lg font-semibold text-foreground">{generatedPlan.userGoal}</p>
                  </div>

                  {/* Warm-up */}
                  <div>
                    <h3 className="text-lg font-bold text-primary mb-2">Warm-up</h3>
                    <p className="text-foreground p-3 bg-background rounded-lg border border-border">
                      {generatedPlan.warmup}
                    </p>
                  </div>

                  {/* Main Drills */}
                  <div>
                    <h3 className="text-lg font-bold text-primary mb-3">Main Training Drills</h3>
                    <div className="space-y-3">
                      {generatedPlan.drills.map((drill, idx) => (
                        <div key={drill.id} className="p-4 bg-gradient-to-r from-primary/10 to-transparent rounded-lg border border-primary/30">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center shadow-glow flex-shrink-0">
                                  <span className="text-white font-bold text-sm">{idx + 1}</span>
                                </div>
                                <div>
                                  <p className="font-semibold text-foreground">{drill.name}</p>
                                  <p className="text-sm text-muted-foreground">
                                    Duration: {drill.duration} minutes • Type: {drill.type} • Intensity: <span className={getIntensityColor(drill.intensity)}>{drill.intensity}</span>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Cool-down */}
                  <div>
                    <h3 className="text-lg font-bold text-primary mb-2">Cool-down</h3>
                    <p className="text-foreground p-3 bg-background rounded-lg border border-border">
                      {generatedPlan.cooldown}
                    </p>
                  </div>

                  {/* Summary */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 bg-secondary rounded-lg border border-border text-center">
                      <p className="text-sm text-muted-foreground">Total Duration</p>
                      <p className="text-2xl font-bold text-primary">{calculateTotalDuration()} min</p>
                    </div>
                    <div className="p-4 bg-secondary rounded-lg border border-border text-center">
                      <p className="text-sm text-muted-foreground">Number of Drills</p>
                      <p className="text-2xl font-bold text-primary">{generatedPlan.drills.length}</p>
                    </div>
                    <div className="p-4 bg-secondary rounded-lg border border-border text-center">
                      <p className="text-sm text-muted-foreground">Status</p>
                      <p className="text-2xl font-bold text-yellow-400 capitalize">{generatedPlan.status}</p>
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="p-4 bg-background rounded-lg border border-border">
                    <p className="text-sm text-muted-foreground mb-1">AI Coach Notes:</p>
                    <p className="text-foreground">{generatedPlan.notes}</p>
                  </div>
                </div>
              </Card>

              {/* Saved Plans */}
              {savedPlans.length > 0 && (
                <Card className="p-8 bg-gradient-card border-border animate-fade-in-up">
                  <h2 className="text-2xl font-bold mb-6 text-primary flex items-center">
                    <Calendar className="w-6 h-6 mr-2" />
                    Saved Training Plans ({savedPlans.length})
                  </h2>
                  <div className="space-y-4">
                    {savedPlans.map((plan) => (
                      <div key={plan.id} className="p-4 bg-background rounded-lg border border-border hover:border-primary transition-all">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-foreground">{plan.userGoal}</p>
                            <p className="text-sm text-muted-foreground">
                              {plan.drills.length} drills • {plan.drills.reduce((sum, d) => sum + d.duration, 0) + 20} minutes • {plan.date}
                            </p>
                          </div>
                          <Button variant="outline" size="sm" className="border-primary/30">
                            View
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Training;
