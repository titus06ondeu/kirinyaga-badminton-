import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shuffle, Download, Plus, Trash2, Users } from "lucide-react";
import { toast } from "sonner";

interface Player {
  id: string;
  name: string;
  email: string;
  attendanceTime: string;
}

interface Match {
  id: string;
  player1: Player;
  player2: Player;
  court: number;
  serves: "player1" | "player2";
  status: "scheduled" | "in-progress" | "completed";
}

const MatchPlanner = () => {
  // Simulated attendance data - in real app, this would come from Attendance component
  const [attendedPlayers] = useState<Player[]>([
    { id: "1", name: "John Kamau", email: "john@example.com", attendanceTime: "09:15 AM" },
    { id: "2", name: "Mary Wanjiru", email: "mary@example.com", attendanceTime: "09:18 AM" },
    { id: "3", name: "Peter Omondi", email: "peter@example.com", attendanceTime: "09:22 AM" },
    { id: "4", name: "Alice Muthoni", email: "alice@example.com", attendanceTime: "09:25 AM" },
    { id: "5", name: "David Kiprop", email: "david@example.com", attendanceTime: "09:28 AM" },
    { id: "6", name: "Sarah Achieng", email: "sarah@example.com", attendanceTime: "09:31 AM" },
  ]);

  const [matches, setMatches] = useState<Match[]>([]);
  const [queuedPlayers, setQueuedPlayers] = useState<Player[]>([]);
  const [showDetails, setShowDetails] = useState(false);

  // Create matches from attended players
  const createMatches = () => {
    if (attendedPlayers.length < 2) {
      toast.error("Need at least 2 players to create matches");
      return;
    }

    const shuffled = [...attendedPlayers].sort(() => Math.random() - 0.5);
    const newMatches: Match[] = [];
    let court = 1;

    for (let i = 0; i < shuffled.length - 1; i += 2) {
      newMatches.push({
        id: `match-${Date.now()}-${i}`,
        player1: shuffled[i],
        player2: shuffled[i + 1],
        court,
        serves: Math.random() > 0.5 ? "player1" : "player2",
        status: "scheduled",
      });
      court++;
    }

    // If odd number, queue the last player
    if (shuffled.length % 2 === 1) {
      setQueuedPlayers([shuffled[shuffled.length - 1]]);
    } else {
      setQueuedPlayers([]);
    }

    setMatches(newMatches);
    toast.success(`Created ${newMatches.length} matches! ${shuffled.length % 2 === 1 ? "1 player queued." : ""}`);
  };

  // Reshuffle matches
  const reshuffle = () => {
    setMatches([]);
    setQueuedPlayers([]);
    createMatches();
    toast.success("Matches reshuffled!");
  };

  // Update serve assignment
  const updateServe = (matchId: string, serves: "player1" | "player2") => {
    setMatches(
      matches.map((m) =>
        m.id === matchId ? { ...m, serves } : m
      )
    );
    toast.success("Serve assignment updated");
  };

  // Update match status
  const updateMatchStatus = (matchId: string, status: "scheduled" | "in-progress" | "completed") => {
    setMatches(
      matches.map((m) =>
        m.id === matchId ? { ...m, status } : m
      )
    );
    toast.success(`Match status updated to ${status}`);
  };

  // Export fixtures
  const exportFixtures = () => {
    let csv = "Court,Player 1,Player 2,Serves,Status\n";

    matches.forEach((match) => {
      const serves = match.serves === "player1" ? match.player1.name : match.player2.name;
      csv += `${match.court},${match.player1.name},${match.player2.name},${serves},${match.status}\n`;
    });

    if (queuedPlayers.length > 0) {
      csv += `\nQueue\n`;
      queuedPlayers.forEach((player) => {
        csv += `${player.name},${player.email}\n`;
      });
    }

    const element = document.createElement("a");
    element.setAttribute("href", `data:text/csv;charset=utf-8,${encodeURIComponent(csv)}`);
    element.setAttribute("download", `match-fixtures-${new Date().toISOString().split("T")[0]}.csv`);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    toast.success("Fixtures exported as CSV");
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-500/10 text-blue-400 border-blue-500/30";
      case "in-progress":
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/30";
      case "completed":
        return "bg-green-500/10 text-green-400 border-green-500/30";
      default:
        return "bg-gray-500/10 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-dark">
      <Navbar />

      <main className="pt-24 pb-12">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary to-glow-secondary bg-clip-text text-transparent">
                Match Planner
              </span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Create and manage matches from today's attended players
            </p>
          </div>

          {/* Player Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6 bg-gradient-card border-border">
              <p className="text-sm text-muted-foreground mb-2">Total Attended</p>
              <p className="text-4xl font-bold text-primary">{attendedPlayers.length}</p>
              <p className="text-xs text-muted-foreground mt-2">players present today</p>
            </Card>
            <Card className="p-6 bg-gradient-card border-border">
              <p className="text-sm text-muted-foreground mb-2">Matches Created</p>
              <p className="text-4xl font-bold text-primary">{matches.length}</p>
              <p className="text-xs text-muted-foreground mt-2">scheduled</p>
            </Card>
            <Card className="p-6 bg-gradient-card border-border">
              <p className="text-sm text-muted-foreground mb-2">In Queue</p>
              <p className="text-4xl font-bold text-yellow-400">{queuedPlayers.length}</p>
              <p className="text-xs text-muted-foreground mt-2">waiting for rotation</p>
            </Card>
          </div>

          {/* Control Panel */}
          <Card className="p-8 bg-gradient-card border-border animate-fade-in-up mb-8">
            <h2 className="text-2xl font-bold mb-6 text-primary flex items-center">
              <Users className="w-6 h-6 mr-2" />
              Match Creation
            </h2>

            <div className="flex flex-wrap gap-3">
              <Button
                onClick={createMatches}
                disabled={matches.length > 0}
                className="bg-gradient-primary shadow-glow hover:shadow-glow-strong px-6 py-6"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create Matches
              </Button>

              <Button
                onClick={reshuffle}
                disabled={matches.length === 0}
                variant="outline"
                className="border-primary/30 hover:bg-primary/10 px-6 py-6"
              >
                <Shuffle className="w-5 h-5 mr-2" />
                Reshuffle
              </Button>

              <Button
                onClick={exportFixtures}
                disabled={matches.length === 0}
                variant="outline"
                className="border-primary/30 hover:bg-primary/10 px-6 py-6"
              >
                <Download className="w-5 h-5 mr-2" />
                Export Fixtures
              </Button>

              <Button
                onClick={() => setShowDetails(!showDetails)}
                variant="outline"
                className="border-primary/30 hover:bg-primary/10 px-6 py-6 ml-auto"
              >
                {showDetails ? "Hide" : "Show"} Details
              </Button>
            </div>
          </Card>

          {/* Matches Grid */}
          {matches.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {matches.map((match, idx) => (
                <Card key={match.id} className="p-6 bg-gradient-card border-border hover:border-primary transition-all animate-fade-in-up">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-primary">Court {match.court}</h3>
                    <div className={`px-3 py-1 rounded-full border text-sm font-medium ${getStatusColor(match.status)}`}>
                      {match.status}
                    </div>
                  </div>

                  {/* Players */}
                  <div className="space-y-3 mb-4">
                    {/* Player 1 */}
                    <div className="p-3 bg-background rounded-lg border border-border">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-foreground">{match.player1.name}</p>
                          <p className="text-xs text-muted-foreground">{match.player1.email}</p>
                        </div>
                        {match.serves === "player1" && (
                          <div className="px-2 py-1 bg-primary/20 text-primary text-xs font-bold rounded">
                            SERVES
                          </div>
                        )}
                      </div>
                    </div>

                    {/* VS */}
                    <div className="text-center">
                      <p className="text-sm font-bold text-muted-foreground">VS</p>
                    </div>

                    {/* Player 2 */}
                    <div className="p-3 bg-background rounded-lg border border-border">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-foreground">{match.player2.name}</p>
                          <p className="text-xs text-muted-foreground">{match.player2.email}</p>
                        </div>
                        {match.serves === "player2" && (
                          <div className="px-2 py-1 bg-primary/20 text-primary text-xs font-bold rounded">
                            SERVES
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Controls */}
                  {showDetails && (
                    <div className="space-y-3 pt-4 border-t border-border">
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => updateServe(match.id, match.serves === "player1" ? "player2" : "player1")}
                          variant="outline"
                          className="flex-1 border-primary/30 hover:bg-primary/10 text-xs"
                        >
                          Swap Serve
                        </Button>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => updateMatchStatus(match.id, "in-progress")}
                          disabled={match.status === "in-progress"}
                          variant="outline"
                          className="flex-1 border-yellow-500/30 hover:bg-yellow-500/10 text-xs"
                        >
                          Start
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => updateMatchStatus(match.id, "completed")}
                          disabled={match.status === "completed"}
                          variant="outline"
                          className="flex-1 border-green-500/30 hover:bg-green-500/10 text-xs"
                        >
                          Complete
                        </Button>
                      </div>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-12 bg-gradient-card border-border text-center mb-8">
              <Users className="w-16 h-16 mx-auto mb-4 opacity-50 text-muted-foreground" />
              <p className="text-lg text-muted-foreground mb-4">No matches created yet</p>
              <p className="text-sm text-muted-foreground mb-6">
                Click "Create Matches" to automatically pair attended players
              </p>
              <Button onClick={createMatches} className="bg-gradient-primary shadow-glow hover:shadow-glow-strong">
                <Plus className="w-4 h-4 mr-2" />
                Create Matches Now
              </Button>
            </Card>
          )}

          {/* Queued Players */}
          {queuedPlayers.length > 0 && (
            <Card className="p-6 bg-gradient-card border-border animate-fade-in-up mb-8">
              <h2 className="text-xl font-bold mb-4 text-primary flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Rotation Queue ({queuedPlayers.length})
              </h2>
              <div className="space-y-2">
                {queuedPlayers.map((player) => (
                  <div key={player.id} className="flex items-center justify-between p-3 bg-background rounded-lg border border-border">
                    <div>
                      <p className="font-semibold text-foreground">{player.name}</p>
                      <p className="text-sm text-muted-foreground">{player.email}</p>
                    </div>
                    <div className="px-3 py-1 bg-yellow-500/10 text-yellow-400 text-xs font-medium rounded">
                      Waiting
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                These players will rotate in after current matches complete
              </p>
            </Card>
          )}

          {/* Attended Players List */}
          <Card className="p-6 bg-gradient-card border-border animate-fade-in-up">
            <h2 className="text-xl font-bold mb-4 text-primary flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Today's Attendees ({attendedPlayers.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {attendedPlayers.map((player) => (
                <div key={player.id} className="flex items-center justify-between p-3 bg-background rounded-lg border border-border">
                  <div>
                    <p className="font-medium text-foreground">{player.name}</p>
                    <p className="text-xs text-muted-foreground">{player.attendanceTime}</p>
                  </div>
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                </div>
              ))}
            </div>
          </Card>

          <Card className="mt-8 p-6 bg-gradient-card border-border animate-fade-in-up">
            <h3 className="text-xl font-bold mb-3 text-primary">How Match Planner Works</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Automatically pulls list of players marked present in Attendance Tracker</li>
              <li>• Click "Create Matches" to pair players into matches</li>
              <li>• Odd player is automatically queued for rotation</li>
              <li>• Assign who serves first for each match</li>
              <li>• Track match status: Scheduled → In Progress → Completed</li>
              <li>• Export fixtures as CSV for printing or sharing</li>
              <li>• Reshuffle to create new pairings</li>
            </ul>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MatchPlanner;
