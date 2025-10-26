import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Users, Shuffle } from "lucide-react";
import { toast } from "sonner";

interface Player {
  name: string;
  present: boolean;
}

interface Pairing {
  team: string[];
}

const Partners = () => {
  const [players] = useState<Player[]>([
    { name: "John Kamau", present: true },
    { name: "Mary Wanjiru", present: true },
    { name: "Peter Omondi", present: true },
    { name: "Sarah Achieng", present: true },
    { name: "David Kiprop", present: true },
    { name: "Alice Muthoni", present: true },
    { name: "James Otieno", present: false },
    { name: "Grace Njeri", present: false },
  ]);
  
  const [pairings, setPairings] = useState<Pairing[]>([]);

  const generatePairings = () => {
    const presentPlayers = players.filter(p => p.present);
    
    if (presentPlayers.length < 2) {
      toast.error("Need at least 2 players present to create pairings");
      return;
    }

    const shuffled = [...presentPlayers].sort(() => Math.random() - 0.5);
    const newPairings: Pairing[] = [];

    for (let i = 0; i < shuffled.length; i += 2) {
      if (i + 1 < shuffled.length) {
        newPairings.push({ team: [shuffled[i].name, shuffled[i + 1].name] });
      } else {
        // Odd number of players - last one gets a bye
        newPairings.push({ team: [shuffled[i].name, "** BYE **"] });
      }
    }

    setPairings(newPairings);
    toast.success(`Generated ${newPairings.length} team pairings!`);
  };

  const presentCount = players.filter(p => p.present).length;

  return (
    <div className="min-h-screen bg-gradient-dark">
      <Navbar />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary to-glow-secondary bg-clip-text text-transparent">
                Match Partner Selector
              </span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Intelligent pairing system for practice games
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card className="p-6 bg-gradient-card border-border animate-fade-in-up">
              <h2 className="text-2xl font-bold mb-4 text-primary flex items-center">
                <Users className="w-6 h-6 mr-2" />
                Players ({presentCount} Present)
              </h2>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {players.map((player, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-lg border flex items-center justify-between transition-all ${
                      player.present
                        ? "bg-green-500/10 border-green-500/30 text-foreground"
                        : "bg-background border-border text-muted-foreground opacity-50"
                    }`}
                  >
                    <span>{player.name}</span>
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-background">
                      {player.present ? "Present" : "Absent"}
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6 bg-gradient-card border-border animate-fade-in-up">
              <h2 className="text-2xl font-bold mb-4 text-primary">Team Pairings</h2>
              <Button
                onClick={generatePairings}
                className="w-full mb-4 bg-gradient-primary shadow-glow hover:shadow-glow-strong"
              >
                <Shuffle className="w-4 h-4 mr-2" />
                Generate Pairings
              </Button>
              
              <div className="space-y-3">
                {pairings.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <Users className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>Click "Generate Pairings" to match players</p>
                  </div>
                ) : (
                  pairings.map((pairing, idx) => (
                    <div key={idx} className="p-4 bg-gradient-to-r from-primary/10 to-transparent rounded-lg border border-primary/30">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center shadow-glow flex-shrink-0">
                          <span className="text-white font-bold">{idx + 1}</span>
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-foreground">{pairing.team[0]}</p>
                          <p className="text-sm text-muted-foreground">vs</p>
                          <p className="font-semibold text-foreground">{pairing.team[1]}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </Card>
          </div>

          <Card className="p-6 bg-gradient-card border-border animate-fade-in-up">
            <h3 className="text-xl font-bold mb-3 text-primary">How It Works</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>• System automatically detects players marked present today</li>
              <li>• Click "Generate Pairings" to create random doubles teams</li>
              <li>• Players are matched fairly for competitive practice</li>
              <li>• Click "Reshuffle" anytime to create new pairings</li>
              <li>• If odd number of players, last player gets a bye round</li>
            </ul>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Partners;
