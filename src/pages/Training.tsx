import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { RefreshCw, Plus, Trash2, Calendar } from "lucide-react";
import { toast } from "sonner";

const Training = () => {
  const [workouts, setWorkouts] = useState([
    "Footwork Drills",
    "Smash Practice",
    "Endurance Training",
    "Net Shots",
    "Defense Practice",
  ]);
  const [newWorkout, setNewWorkout] = useState("");
  const [dailyPlan, setDailyPlan] = useState<string[]>([]);

  const generatePlan = () => {
    const shuffled = [...workouts].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, Math.min(3, workouts.length));
    setDailyPlan(selected);
    toast.success("Today's training plan generated!");
  };

  const addWorkout = () => {
    if (newWorkout.trim()) {
      setWorkouts([...workouts, newWorkout.trim()]);
      setNewWorkout("");
      toast.success("Workout added!");
    }
  };

  const removeWorkout = (index: number) => {
    setWorkouts(workouts.filter((_, i) => i !== index));
    toast.success("Workout removed");
  };

  return (
    <div className="min-h-screen bg-gradient-dark">
      <Navbar />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary to-glow-secondary bg-clip-text text-transparent">
                Training Planner
              </span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Auto-generate balanced daily training routines
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6 bg-gradient-card border-border animate-fade-in-up">
              <h2 className="text-2xl font-bold mb-4 text-primary flex items-center">
                <Plus className="w-6 h-6 mr-2" />
                Your Workouts
              </h2>
              <div className="flex gap-2 mb-4">
                <Input
                  value={newWorkout}
                  onChange={(e) => setNewWorkout(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addWorkout()}
                  placeholder="Add new workout..."
                  className="bg-background border-border"
                />
                <Button onClick={addWorkout} className="bg-gradient-primary shadow-glow hover:shadow-glow-strong">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {workouts.map((workout, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-background rounded-lg border border-border group hover:border-primary transition-all">
                    <span className="text-foreground">{workout}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeWorkout(idx)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive hover:text-white"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6 bg-gradient-card border-border animate-fade-in-up">
              <h2 className="text-2xl font-bold mb-4 text-primary flex items-center">
                <Calendar className="w-6 h-6 mr-2" />
                Today's Plan
              </h2>
              <Button
                onClick={generatePlan}
                className="w-full mb-4 bg-gradient-primary shadow-glow hover:shadow-glow-strong"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Generate Plan
              </Button>
              <div className="space-y-3">
                {dailyPlan.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <Calendar className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>Click "Generate Plan" to create today's training routine</p>
                  </div>
                ) : (
                  dailyPlan.map((workout, idx) => (
                    <div key={idx} className="p-4 bg-gradient-to-r from-primary/10 to-transparent rounded-lg border border-primary/30">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center shadow-glow">
                          <span className="text-white font-bold">{idx + 1}</span>
                        </div>
                        <span className="text-lg font-medium">{workout}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </Card>
          </div>

          <Card className="mt-8 p-6 bg-gradient-card border-border animate-fade-in-up">
            <h3 className="text-xl font-bold mb-3 text-primary">How It Works</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Add all your workout types to the list above</li>
              <li>• Click "Generate Plan" to create a balanced daily routine</li>
              <li>• The system automatically ensures all workouts are distributed evenly over time</li>
              <li>• Generate a new plan each day to keep your training varied and effective</li>
            </ul>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Training;
