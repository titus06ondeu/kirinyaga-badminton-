import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Trophy, Medal, Award } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

interface LeaderboardEntry {
  user_id: string;
  points: number;
  attendance_rate: number;
  training_consistency: number;
  full_name: string;
}

const Leaderboard = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      fetchLeaderboard();
    }
  }, [user]);

  const fetchLeaderboard = async () => {
    try {
      const { data, error } = await supabase
        .from("performance_metrics")
        .select(`
          user_id,
          points,
          attendance_rate,
          training_consistency,
          profiles!inner(full_name)
        `)
        .order("points", { ascending: false })
        .limit(10);

      if (error) throw error;

      const formattedData = data.map((entry: any) => ({
        user_id: entry.user_id,
        points: entry.points,
        attendance_rate: entry.attendance_rate,
        training_consistency: entry.training_consistency,
        full_name: entry.profiles.full_name,
      }));

      setLeaderboard(formattedData);
    } catch (error: any) {
      console.error("Error fetching leaderboard:", error);
      toast.error("Failed to load leaderboard");
    } finally {
      setDataLoading(false);
    }
  };

  const getMedalIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-8 h-8 text-yellow-400" />;
      case 2:
        return <Medal className="w-8 h-8 text-gray-400" />;
      case 3:
        return <Award className="w-8 h-8 text-amber-600" />;
      default:
        return <span className="text-2xl font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  if (loading || dataLoading) {
    return (
      <div className="min-h-screen bg-gradient-dark flex items-center justify-center">
        <div className="text-primary text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-dark">
      <Navbar />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary to-glow-secondary bg-clip-text text-transparent">
                Leaderboard
              </span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Top performers this month
            </p>
          </div>

          <Card className="p-6 bg-gradient-card border-border animate-fade-in-up">
            {leaderboard.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                No performance data available yet. Start training to appear on the leaderboard!
              </div>
            ) : (
              <div className="space-y-4">
                {leaderboard.map((entry, idx) => (
                  <div
                    key={entry.user_id}
                    className={`flex items-center justify-between p-4 rounded-lg border transition-all ${
                      idx < 3
                        ? "bg-gradient-primary/10 border-primary shadow-glow"
                        : "bg-background border-border hover:border-primary"
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 flex items-center justify-center">
                        {getMedalIcon(idx + 1)}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground text-lg">
                          {entry.full_name}
                        </p>
                        <div className="flex space-x-4 text-sm text-muted-foreground">
                          <span>Attendance: {entry.attendance_rate?.toFixed(0) || 0}%</span>
                          <span>Consistency: {entry.training_consistency?.toFixed(0) || 0}%</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">{entry.points}</p>
                      <p className="text-sm text-muted-foreground">points</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Leaderboard;
