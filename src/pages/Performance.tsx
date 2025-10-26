import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, Award, Target, Calendar } from "lucide-react";

const Performance = () => {
  const attendanceData = [
    { week: "Week 1", days: 5 },
    { week: "Week 2", days: 4 },
    { week: "Week 3", days: 6 },
    { week: "Week 4", days: 5 },
  ];

  const skillData = [
    { skill: "Footwork", level: 75 },
    { skill: "Smash", level: 85 },
    { skill: "Defense", level: 70 },
    { skill: "Net Play", level: 80 },
    { skill: "Endurance", level: 65 },
  ];

  const progressData = [
    { month: "Jan", score: 60 },
    { month: "Feb", score: 68 },
    { month: "Mar", score: 75 },
    { month: "Apr", score: 82 },
  ];

  const trainingTypes = [
    { name: "Technical", value: 40, color: "#3b82f6" },
    { name: "Physical", value: 30, color: "#8b5cf6" },
    { name: "Strategy", value: 20, color: "#06b6d4" },
    { name: "Recovery", value: 10, color: "#10b981" },
  ];

  const stats = [
    { label: "Training Days", value: "20", icon: Calendar, color: "from-blue-500 to-cyan-500" },
    { label: "Avg Attendance", value: "83%", icon: TrendingUp, color: "from-purple-500 to-pink-500" },
    { label: "Skills Improved", value: "5", icon: Target, color: "from-green-500 to-emerald-500" },
    { label: "Achievements", value: "12", icon: Award, color: "from-orange-500 to-red-500" },
  ];

  return (
    <div className="min-h-screen bg-gradient-dark">
      <Navbar />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary to-glow-secondary bg-clip-text text-transparent">
                Performance Tracker
              </span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Visualize your progress and training analytics
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <Card key={idx} className="p-6 bg-gradient-card border-border hover:border-primary transition-all group animate-fade-in-up">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-glow group-hover:shadow-glow-strong transition-all`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-3xl font-bold text-primary">{stat.value}</span>
                  </div>
                  <p className="text-muted-foreground font-medium">{stat.label}</p>
                </Card>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card className="p-6 bg-gradient-card border-border animate-fade-in-up">
              <h2 className="text-2xl font-bold mb-6 text-primary">Weekly Attendance</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={attendanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="week" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155" }}
                    labelStyle={{ color: "#f1f5f9" }}
                  />
                  <Bar dataKey="days" fill="url(#colorGradient)" radius={[8, 8, 0, 0]} />
                  <defs>
                    <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-6 bg-gradient-card border-border animate-fade-in-up">
              <h2 className="text-2xl font-bold mb-6 text-primary">Overall Progress</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="month" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155" }}
                    labelStyle={{ color: "#f1f5f9" }}
                  />
                  <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={3} dot={{ fill: "#3b82f6", r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6 bg-gradient-card border-border animate-fade-in-up">
              <h2 className="text-2xl font-bold mb-6 text-primary">Skill Levels</h2>
              <div className="space-y-4">
                {skillData.map((skill, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between mb-2">
                      <span className="text-foreground font-medium">{skill.skill}</span>
                      <span className="text-primary font-bold">{skill.level}%</span>
                    </div>
                    <div className="w-full h-3 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-primary rounded-full transition-all shadow-glow"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6 bg-gradient-card border-border animate-fade-in-up">
              <h2 className="text-2xl font-bold mb-6 text-primary">Training Distribution</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={trainingTypes}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {trainingTypes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155" }}
                    labelStyle={{ color: "#f1f5f9" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Performance;
