import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Camera, CheckCircle, Clock } from "lucide-react";
import { toast } from "sonner";

interface AttendanceRecord {
  name: string;
  time: string;
  status: "present" | "absent";
}

const Attendance = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [records, setRecords] = useState<AttendanceRecord[]>([
    { name: "John Kamau", time: "09:15 AM", status: "present" },
    { name: "Mary Wanjiru", time: "09:18 AM", status: "present" },
    { name: "Peter Omondi", time: "09:22 AM", status: "present" },
  ]);

  const startScanning = () => {
    setIsScanning(true);
    toast.success("Face recognition activated");
    
    // Simulate face detection after 2 seconds
    setTimeout(() => {
      const names = ["Alice Muthoni", "David Kiprop", "Sarah Achieng"];
      const randomName = names[Math.floor(Math.random() * names.length)];
      const now = new Date();
      const timeString = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
      
      setRecords([
        { name: randomName, time: timeString, status: "present" },
        ...records,
      ]);
      setIsScanning(false);
      toast.success(`${randomName} marked present!`);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-dark">
      <Navbar />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary to-glow-secondary bg-clip-text text-transparent">
                Attendance Tracker
              </span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Face recognition-powered attendance marking
            </p>
          </div>

          <Card className="p-8 bg-gradient-card border-border animate-fade-in-up mb-8">
            <div className="text-center">
              <div className="w-64 h-64 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-secondary to-background border-2 border-primary/30 flex items-center justify-center relative overflow-hidden">
                {isScanning ? (
                  <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-primary opacity-20 animate-pulse" />
                    <div className="absolute top-1/2 left-0 right-0 h-1 bg-primary shadow-glow animate-slide-down" />
                  </div>
                ) : (
                  <Camera className="w-32 h-32 text-primary opacity-50" />
                )}
                {isScanning && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-primary text-lg font-bold animate-pulse">Scanning...</div>
                  </div>
                )}
              </div>
              
              <Button
                onClick={startScanning}
                disabled={isScanning}
                className="bg-gradient-primary shadow-glow hover:shadow-glow-strong px-8 py-6 text-lg"
              >
                <Camera className="w-5 h-5 mr-2" />
                {isScanning ? "Scanning..." : "Start Face Scan"}
              </Button>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-card border-border animate-fade-in-up">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-primary flex items-center">
                <Clock className="w-6 h-6 mr-2" />
                Today's Attendance
              </h2>
              <span className="text-muted-foreground">
                {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
              </span>
            </div>
            
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {records.map((record, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-background rounded-lg border border-border hover:border-primary transition-all group">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="font-semibold text-foreground">{record.name}</p>
                      <p className="text-sm text-muted-foreground">{record.time}</p>
                    </div>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-sm font-medium">
                    Present
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="mt-8 p-6 bg-gradient-card border-border animate-fade-in-up">
            <h3 className="text-xl font-bold mb-3 text-primary">How It Works</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Click "Start Face Scan" to activate the camera</li>
              <li>• Position your face in front of the camera</li>
              <li>• The system will automatically detect and recognize your face</li>
              <li>• Attendance is marked with timestamp when face is verified</li>
              <li>• All records are saved to the database for reporting</li>
            </ul>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Attendance;
