import { useState, useRef, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Camera, CheckCircle, Clock, AlertCircle, Shield, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface AttendanceRecord {
  id: string;
  name: string;
  email: string;
  time: string;
  timestamp: Date;
  status: "present" | "absent";
  verified: boolean;
  photoUrl?: string;
}

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  faceImages: string[];
  firstLoginComplete: boolean;
}

const Attendance = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [records, setRecords] = useState<AttendanceRecord[]>([
    {
      id: "1",
      name: "John Kamau",
      email: "john@example.com",
      time: "09:15 AM",
      timestamp: new Date(Date.now() - 3600000),
      status: "present",
      verified: true,
    },
    {
      id: "2",
      name: "Mary Wanjiru",
      email: "mary@example.com",
      time: "09:18 AM",
      timestamp: new Date(Date.now() - 3000000),
      status: "present",
      verified: true,
    },
    {
      id: "3",
      name: "Peter Omondi",
      email: "peter@example.com",
      time: "09:22 AM",
      timestamp: new Date(Date.now() - 2400000),
      status: "present",
      verified: true,
    },
  ]);

  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [showFirstLoginSetup, setShowFirstLoginSetup] = useState(false);
  const [capturedFaces, setCapturedFaces] = useState<string[]>([]);
  const [setupStep, setSetupStep] = useState(1);

  // Simulated user database
  const [registeredUsers] = useState<UserProfile[]>([
    {
      id: "u1",
      name: "Alice Muthoni",
      email: "alice@example.com",
      phone: "+254712345678",
      faceImages: ["face1", "face2", "face3"],
      firstLoginComplete: true,
    },
    {
      id: "u2",
      name: "David Kiprop",
      email: "david@example.com",
      phone: "+254712345679",
      faceImages: ["face1", "face2", "face3"],
      firstLoginComplete: true,
    },
    {
      id: "u3",
      name: "Sarah Achieng",
      email: "sarah@example.com",
      phone: "+254712345680",
      faceImages: ["face1", "face2", "face3"],
      firstLoginComplete: true,
    },
  ]);

  // Initialize camera
  const initializeCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: { ideal: 640 }, height: { ideal: 480 } },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
        toast.success("Camera activated successfully");
      }
    } catch (error) {
      toast.error("Unable to access camera. Please check permissions.");
      console.error("Camera error:", error);
    }
  };

  // Stop camera
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach((track) => track.stop());
      setCameraActive(false);
    }
  };

  // Capture face image
  const captureFace = () => {
    if (canvasRef.current && videoRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
        const imageData = canvasRef.current.toDataURL("image/jpeg");
        setCapturedFaces([...capturedFaces, imageData]);
        toast.success(`Face ${capturedFaces.length + 1} captured`);

        if (capturedFaces.length + 1 === 3) {
          toast.success("All 3 face images captured! Proceeding to next step...");
          setTimeout(() => setSetupStep(2), 1000);
        }
      }
    }
  };

  // Complete first login setup
  const completeFirstLoginSetup = () => {
    if (!currentUser) {
      toast.error("No user profile selected");
      return;
    }

    const updatedUser = {
      ...currentUser,
      faceImages: capturedFaces,
      firstLoginComplete: true,
    };

    setCurrentUser(updatedUser);
    setShowFirstLoginSetup(false);
    setCapturedFaces([]);
    setSetupStep(1);
    toast.success("First login setup completed! You can now use face recognition for attendance.");
  };

  // Simulate face matching and attendance marking
  const startScanning = () => {
    setIsScanning(true);
    toast.info("Scanning for face match...");

    // Simulate face detection and matching
    setTimeout(() => {
      const randomUser = registeredUsers[Math.floor(Math.random() * registeredUsers.length)];
      const now = new Date();
      const timeString = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

      // Check if already marked present today
      const alreadyMarked = records.some(
        (r) =>
          r.email === randomUser.email &&
          r.timestamp.toDateString() === now.toDateString()
      );

      if (alreadyMarked) {
        toast.warning(`${randomUser.name} is already marked present today`);
      } else {
        const newRecord: AttendanceRecord = {
          id: Date.now().toString(),
          name: randomUser.name,
          email: randomUser.email,
          time: timeString,
          timestamp: now,
          status: "present",
          verified: true,
        };

        setRecords([newRecord, ...records]);
        toast.success(`✓ ${randomUser.name} marked present (Face verified)`);
      }

      setIsScanning(false);
    }, 2000);
  };

  // Simulate first login
  const simulateFirstLogin = () => {
    const newUser = registeredUsers[0];
    setCurrentUser(newUser);
    setShowFirstLoginSetup(true);
    toast.info("First login detected. Please complete setup.");
  };

  // Get today's attendance count
  const getTodayCount = () => {
    const today = new Date().toDateString();
    return records.filter((r) => r.timestamp.toDateString() === today).length;
  };

  // Get unique attendees today
  const getTodayAttendees = () => {
    const today = new Date().toDateString();
    const uniqueEmails = new Set(
      records
        .filter((r) => r.timestamp.toDateString() === today)
        .map((r) => r.email)
    );
    return uniqueEmails.size;
  };

  const deletRecord = (id: string) => {
    setRecords(records.filter((r) => r.id !== id));
    toast.success("Record deleted");
  };

  return (
    <div className="min-h-screen bg-gradient-dark">
      <Navbar />

      <main className="pt-24 pb-12">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary to-glow-secondary bg-clip-text text-transparent">
                Attendance Tracker
              </span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Face recognition-powered attendance marking with secure verification
            </p>
          </div>

          {/* First Login Setup Modal */}
          {showFirstLoginSetup && (
            <Card className="p-8 bg-gradient-card border-border animate-fade-in-up mb-8 border-2 border-primary">
              <h2 className="text-2xl font-bold mb-6 text-primary flex items-center">
                <Shield className="w-6 h-6 mr-2" />
                First Login Setup
              </h2>

              {setupStep === 1 ? (
                <div className="space-y-6">
                  <div className="p-4 bg-primary/10 rounded-lg border border-primary/30">
                    <p className="text-sm text-muted-foreground mb-1">Welcome,</p>
                    <p className="text-lg font-bold text-foreground">{currentUser?.name}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold mb-4 text-foreground">
                      Step 1: Capture Your Face (3 angles)
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      We need to capture 3 images of your face from different angles for accurate face recognition during attendance marking.
                    </p>

                    <div className="bg-background rounded-lg overflow-hidden border border-border mb-4">
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        className="w-full h-96 object-cover"
                      />
                      <canvas
                        ref={canvasRef}
                        width={640}
                        height={480}
                        className="hidden"
                      />
                    </div>

                    <div className="flex gap-2 mb-6">
                      {!cameraActive ? (
                        <Button
                          onClick={initializeCamera}
                          className="flex-1 bg-gradient-primary shadow-glow hover:shadow-glow-strong py-6"
                        >
                          <Camera className="w-5 h-5 mr-2" />
                          Start Camera
                        </Button>
                      ) : (
                        <>
                          <Button
                            onClick={captureFace}
                            disabled={capturedFaces.length >= 3}
                            className="flex-1 bg-green-600 hover:bg-green-700 py-6"
                          >
                            <Camera className="w-5 h-5 mr-2" />
                            Capture Face ({capturedFaces.length}/3)
                          </Button>
                          <Button
                            onClick={stopCamera}
                            variant="outline"
                            className="border-primary/30 hover:bg-primary/10 py-6"
                          >
                            Stop Camera
                          </Button>
                        </>
                      )}
                    </div>

                    {capturedFaces.length > 0 && (
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        {capturedFaces.map((face, idx) => (
                          <div key={idx} className="relative rounded-lg overflow-hidden border-2 border-primary">
                            <img src={face} alt={`Captured face ${idx + 1}`} className="w-full h-32 object-cover" />
                            <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                              ✓ {idx + 1}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-foreground">Step 2: Confirm Your Information</h3>

                  <div className="space-y-4">
                    <div className="p-4 bg-background rounded-lg border border-border">
                      <p className="text-sm text-muted-foreground mb-1">Official Name</p>
                      <p className="text-lg font-semibold text-foreground">{currentUser?.name}</p>
                    </div>

                    <div className="p-4 bg-background rounded-lg border border-border">
                      <p className="text-sm text-muted-foreground mb-1">Email</p>
                      <p className="text-lg font-semibold text-foreground">{currentUser?.email}</p>
                    </div>

                    <div className="p-4 bg-background rounded-lg border border-border">
                      <p className="text-sm text-muted-foreground mb-1">Phone Number</p>
                      <p className="text-lg font-semibold text-foreground">{currentUser?.phone}</p>
                    </div>

                    <div className="p-4 bg-primary/10 rounded-lg border border-primary/30">
                      <p className="text-sm text-muted-foreground mb-2">Face Images Captured</p>
                      <p className="text-lg font-semibold text-green-400">✓ 3 images successfully captured</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => {
                        setSetupStep(1);
                        setCapturedFaces([]);
                      }}
                      variant="outline"
                      className="flex-1 border-primary/30 hover:bg-primary/10 py-6"
                    >
                      Back
                    </Button>
                    <Button
                      onClick={completeFirstLoginSetup}
                      className="flex-1 bg-gradient-primary shadow-glow hover:shadow-glow-strong py-6"
                    >
                      Complete Setup
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          )}

          {/* Camera Scanning Section */}
          <Card className="p-8 bg-gradient-card border-border animate-fade-in-up mb-8">
            <div className="text-center">
              <div className="w-full max-w-md mx-auto mb-6">
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-secondary to-background border-2 border-primary/30 flex items-center justify-center relative overflow-hidden">
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
              </div>

              <div className="flex flex-col gap-3">
                <Button
                  onClick={startScanning}
                  disabled={isScanning}
                  className="bg-gradient-primary shadow-glow hover:shadow-glow-strong px-8 py-6 text-lg"
                >
                  <Camera className="w-5 h-5 mr-2" />
                  {isScanning ? "Scanning..." : "Start Face Scan"}
                </Button>

                <Button
                  onClick={simulateFirstLogin}
                  variant="outline"
                  className="border-primary/30 hover:bg-primary/10 py-6"
                >
                  <Shield className="w-5 h-5 mr-2" />
                  Simulate First Login
                </Button>
              </div>
            </div>
          </Card>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6 bg-gradient-card border-border">
              <p className="text-sm text-muted-foreground mb-2">Today's Attendance</p>
              <p className="text-4xl font-bold text-primary">{getTodayCount()}</p>
              <p className="text-xs text-muted-foreground mt-2">people marked present</p>
            </Card>
            <Card className="p-6 bg-gradient-card border-border">
              <p className="text-sm text-muted-foreground mb-2">Unique Attendees</p>
              <p className="text-4xl font-bold text-primary">{getTodayAttendees()}</p>
              <p className="text-xs text-muted-foreground mt-2">today</p>
            </Card>
            <Card className="p-6 bg-gradient-card border-border">
              <p className="text-sm text-muted-foreground mb-2">Verified Records</p>
              <p className="text-4xl font-bold text-green-400">{records.filter((r) => r.verified).length}</p>
              <p className="text-xs text-muted-foreground mt-2">face verified</p>
            </Card>
          </div>

          {/* Attendance Records */}
          <Card className="p-6 bg-gradient-card border-border animate-fade-in-up">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-primary flex items-center">
                <Clock className="w-6 h-6 mr-2" />
                Attendance Records
              </h2>
              <span className="text-muted-foreground">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {records.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <AlertCircle className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>No attendance records yet</p>
                </div>
              ) : (
                records.map((record) => (
                  <div key={record.id} className="flex items-center justify-between p-4 bg-background rounded-lg border border-border hover:border-primary transition-all group">
                    <div className="flex items-center space-x-3 flex-1">
                      <div className="relative">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        {record.verified && (
                          <Shield className="w-3 h-3 text-primary absolute -bottom-1 -right-1" />
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{record.name}</p>
                        <p className="text-sm text-muted-foreground">{record.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="text-sm font-medium text-foreground">{record.time}</p>
                        <p className="text-xs text-muted-foreground">
                          {record.verified ? "Face Verified" : "Manual"}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deletRecord(record.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive hover:text-white"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>

          <Card className="mt-8 p-6 bg-gradient-card border-border animate-fade-in-up">
            <h3 className="text-xl font-bold mb-3 text-primary">How Face Recognition Works</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>• First login: Capture 3 face images from different angles</li>
              <li>• System generates secure face embeddings for matching</li>
              <li>• Click "Start Face Scan" to activate camera for attendance</li>
              <li>• Live face detection matches against stored embeddings</li>
              <li>• Attendance marked with verified badge when match succeeds</li>
              <li>• Prevents duplicate marking on same day</li>
            </ul>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Attendance;
