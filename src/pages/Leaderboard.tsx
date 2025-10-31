import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, Medal, Award, TrendingUp, Users, Target } from "lucide-react";

interface Player {
  id: string;
  name: string;
  email: string;
  attendance: number;
  performanceScore: number;
  activityScore: number;
  totalScore: number;
  rank: number;
  medal?: "gold" | "silver" | "bronze";
  improvement: number;
}

const Leaderboard = () => {
  const navigate = useNavigate();

  // Mock leaderboard data with calculated scores
  const [players] = useState<Player[]>([
    {
      id: "1",
      name: "John Kamau",
      email: "john@example.com",
      attendance: 95,
      performanceScore: 92,
      activityScore: 88,
      totalScore: 91.4,
      rank: 1,
      medal: "gold",
      improvement: 12,
    },
    {
      id: "2",
      name: "Mary Wanjiru",
      email: "mary@example.com",
      attendance: 90,
      performanceScore: 88,
      activityScore: 85,
      totalScore: 88.2,
      rank: 2,
      medal: "silver",
      improvement: 8,
    },
    {
      id: "3",
      name: "Peter Omondi",
      email: "peter@example.com",
      attendance: 88,
      performanceScore: 85,
      activityScore: 82,
      totalScore: 85.6,
      rank: 3,
      medal: "bronze",
      improvement: 5,
    },
    {
      id: "4",
      name: "Alice Muthoni",
      email: "alice@example.com",
      attendance: 85,
      performanceScore: 80,
      activityScore: 78,
      totalScore: 81.0,
      rank: 4,
      improvement: 3,
    },
    {
      id: "5",
      name: "David Kiprop",
      email: "david@example.com",
      attendance: 82,
      performanceScore: 78,
      activityScore: 75,
      totalScore: 78.4,
      rank: 5,
      improvement: 2,
    },
    {
      id: "6",
      name: "Sarah Achieng",
      email: "sarah@example.com",
      attendance: 80,
      performanceScore: 75,
      activityScore: 72,
      totalScore: 75.8,
      rank: 6,
      improvement: 1,
    },
  ]);

  const getMedalIcon = (medal?: string) => {
    switch (medal) {
      case "gold":
        return <Trophy className="w-8 h-8 text-yellow-400 drop-shadow-lg" />;
      case "silver":
        return <Medal className="w-8 h-8 text-gray-300 drop-shadow-lg" />;
      case "bronze":
        return <Award className="w-8 h-8 text-amber-600 drop-shadow-lg" />;
      default:
        return null;
    }
  };

  const getRankBadgeColor = (rank: number) => {
    if (rank === 1) return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    if (rank === 2) return "bg-gray-500/20 text-gray-300 border-gray-500/30";
    if (rank === 3) return "bg-amber-600/20 text-amber-500 border-amber-600/30";
    return "bg-primary/10 text-primary border-primary/30";
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-400";
    if (score >= 80) return "text-blue-400";
    if (score >= 70) return "text-yellow-400";
    return "text-orange-400";
  };

  const getSparkline = (improvement: number) => {
    const bars = [];
    for (let i = 0; i < 5; i++) {
      const height = Math.random() * (improvement / 5) + 20;
      bars.push(height);
    }
    return bars;
  };

  return (
    <div className="min-h-screen bg-gradient-dark">
      <Navbar />

      <main className="pt-24 pb-12">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary to-glow-secondary bg-clip-text text-transparent">
                Leaderboard
              </span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Top performers ranked by attendance, performance, and activity
            </p>
          </div>

          {/* Scoring Explanation */}
          <Card className="p-6 bg-gradient-card border-border animate-fade-in-up mb-8">
            <h2 className="text-lg font-bold mb-4 text-primary">Ranking Formula</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-3 bg-background rounded-lg border border-border">
                <p className="text-sm text-muted-foreground mb-1">Attendance Score (40%)</p>
                <p className="text-lg font-bold text-primary">Attendance Rate × 0.40</p>
              </div>
              <div className="p-3 bg-background rounded-lg border border-border">
                <p className="text-sm text-muted-foreground mb-1">Performance Score (50%)</p>
                <p className="text-lg font-bold text-primary">Performance Metrics × 0.50</p>
              </div>
              <div className="p-3 bg-background rounded-lg border border-border">
                <p className="text-sm text-muted-foreground mb-1">Activity Score (10%)</p>
                <p className="text-lg font-bold text-primary">Drills Completed × 0.10</p>
              </div>
            </div>
          </Card>

          {/* Top 3 Highlight */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {players.slice(0, 3).map((player) => (
              <Card
                key={player.id}
                className={`p-6 bg-gradient-card border-2 animate-fade-in-up ${
                  player.rank === 1
                    ? "border-yellow-500/50 shadow-lg shadow-yellow-500/20"
                    : player.rank === 2
                    ? "border-gray-400/50 shadow-lg shadow-gray-400/20"
                    : "border-amber-600/50 shadow-lg shadow-amber-600/20"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 flex items-center justify-center">
                      {getMedalIcon(player.medal)}
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Rank #{player.rank}</p>
                      <p className="text-xl font-bold text-foreground">{player.name}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="p-3 bg-background rounded-lg border border-border">
                    <p className="text-sm text-muted-foreground mb-1">Total Score</p>
                    <p className={`text-3xl font-bold ${getScoreColor(player.totalScore)}`}>
                      {player.totalScore.toFixed(1)}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2 bg-background rounded border border-border text-center">
                      <p className="text-xs text-muted-foreground">Attendance</p>
                      <p className="text-lg font-bold text-primary">{player.attendance}%</p>
                    </div>
                    <div className="p-2 bg-background rounded border border-border text-center">
                      <p className="text-xs text-muted-foreground">Performance</p>
                      <p className="text-lg font-bold text-primary">{player.performanceScore}%</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 text-sm text-green-400">
                    <TrendingUp className="w-4 h-4" />
                    <span>+{player.improvement}% improvement</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Full Leaderboard */}
          <Card className="p-6 bg-gradient-card border-border animate-fade-in-up">
            <h2 className="text-2xl font-bold mb-6 text-primary flex items-center">
              <Users className="w-6 h-6 mr-2" />
              Full Rankings
            </h2>

            <div className="space-y-3">
              {players.map((player) => (
                <div
                  key={player.id}
                  className={`flex items-center justify-between p-4 rounded-lg border transition-all hover:border-primary group cursor-pointer ${
                    player.rank <= 3
                      ? "bg-gradient-primary/10 border-primary/50 shadow-glow"
                      : "bg-background border-border"
                  }`}
                  onClick={() => navigate(`/performance`)}
                >
                  {/* Rank and Medal */}
                  <div className="flex items-center space-x-4 flex-1">
                    <div className={`w-12 h-12 flex items-center justify-center rounded-lg border ${getRankBadgeColor(player.rank)}`}>
                      {getMedalIcon(player.medal) || (
                        <span className="text-lg font-bold">#{player.rank}</span>
                      )}
                    </div>

                    {/* Player Info */}
                    <div className="flex-1">
                      <p className="font-semibold text-foreground text-lg">{player.name}</p>
                      <p className="text-sm text-muted-foreground">{player.email}</p>
                    </div>
                  </div>

                  {/* Scores */}
                  <div className="hidden md:flex items-center space-x-6 mr-6">
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground mb-1">Attendance</p>
                      <p className="text-lg font-bold text-primary">{player.attendance}%</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground mb-1">Performance</p>
                      <p className="text-lg font-bold text-primary">{player.performanceScore}%</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground mb-1">Activity</p>
                      <p className="text-lg font-bold text-primary">{player.activityScore}%</p>
                    </div>
                  </div>

                  {/* Total Score and Improvement */}
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className={`text-3xl font-bold ${getScoreColor(player.totalScore)}`}>
                        {player.totalScore.toFixed(1)}
                      </p>
                      <div className="flex items-center space-x-1 text-xs text-green-400 mt-1">
                        <TrendingUp className="w-3 h-3" />
                        <span>+{player.improvement}%</span>
                      </div>
                    </div>

                    {/* Sparkline */}
                    <div className="flex items-end space-x-1 h-12">
                      {getSparkline(player.improvement).map((height, idx) => (
                        <div
                          key={idx}
                          className="w-1 bg-gradient-primary rounded-sm opacity-70"
                          style={{ height: `${height}px` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Medal Information */}
          <Card className="mt-8 p-6 bg-gradient-card border-border animate-fade-in-up">
            <h3 className="text-xl font-bold mb-4 text-primary flex items-center">
              <Trophy className="w-6 h-6 mr-2" />
              Medal System
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-background rounded-lg border border-border">
                <div className="flex items-center space-x-3 mb-2">
                  <Trophy className="w-6 h-6 text-yellow-400" />
                  <p className="font-bold text-foreground">Gold Medal</p>
                </div>
                <p className="text-sm text-muted-foreground">Awarded to the #1 ranked player</p>
              </div>
              <div className="p-4 bg-background rounded-lg border border-border">
                <div className="flex items-center space-x-3 mb-2">
                  <Medal className="w-6 h-6 text-gray-300" />
                  <p className="font-bold text-foreground">Silver Medal</p>
                </div>
                <p className="text-sm text-muted-foreground">Awarded to the #2 ranked player</p>
              </div>
              <div className="p-4 bg-background rounded-lg border border-border">
                <div className="flex items-center space-x-3 mb-2">
                  <Award className="w-6 h-6 text-amber-600" />
                  <p className="font-bold text-foreground">Bronze Medal</p>
                </div>
                <p className="text-sm text-muted-foreground">Awarded to the #3 ranked player</p>
              </div>
            </div>
          </Card>

          <Card className="mt-8 p-6 bg-gradient-card border-border animate-fade-in-up">
            <h3 className="text-xl font-bold mb-3 text-primary">How Rankings Work</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Attendance Score (40%): Based on your attendance percentage</li>
              <li>• Performance Score (50%): Based on your skill improvements and drills completed</li>
              <li>• Activity Score (10%): Based on number of drills completed and participation</li>
              <li>• Total Score: Weighted sum of all three components</li>
              <li>• Rankings update daily based on your performance metrics</li>
              <li>• Click on any player to view their detailed profile and progress</li>
            </ul>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Leaderboard;
