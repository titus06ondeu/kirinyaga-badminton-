import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ModuleCard from "@/components/ModuleCard";
import { Brain, Calendar, Camera, LineChart, ListChecks, Users, Trophy, Mail } from "lucide-react";

const Dashboard = () => {
  const modules = [
    {
      title: "AI Coach Assistant",
      description: "Get personalized drill recommendations based on your weaknesses and training needs",
      icon: Brain,
      path: "/ai-coach",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Training Planner",
      description: "Auto-generate balanced daily training routines from your workout list",
      icon: ListChecks,
      path: "/training",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "Attendance Tracker",
      description: "Face recognition-powered attendance marking system for training sessions",
      icon: Camera,
      path: "/attendance",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      title: "Match Partner Selector",
      description: "Intelligent pairing system to match players for practice games",
      icon: Users,
      path: "/partners",
      gradient: "from-orange-500 to-red-500",
    },
    {
      title: "Performance Tracker",
      description: "Visualize your progress with detailed charts and analytics",
      icon: LineChart,
      path: "/performance",
      gradient: "from-yellow-500 to-amber-500",
    },
    {
      title: "Training Calendar",
      description: "View attendance history, planned workouts, and upcoming events",
      icon: Calendar,
      path: "/calendar",
      gradient: "from-indigo-500 to-violet-500",
    },
    {
      title: "Leaderboard",
      description: "See top performers and rankings",
      icon: Trophy,
      path: "/leaderboard",
      gradient: "from-pink-500 to-rose-500",
    },
    {
      title: "Messages",
      description: "View contact messages (Admin only)",
      icon: Mail,
      path: "/messages",
      gradient: "from-teal-500 to-cyan-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-dark">
      <Navbar />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary to-glow-secondary bg-clip-text text-transparent">
                Training Dashboard
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Access all your training modules and track your athletic performance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up">
            {modules.map((module, idx) => (
              <ModuleCard key={idx} {...module} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
