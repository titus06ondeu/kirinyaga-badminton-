import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Gallery from "./pages/Gallery";
import Contacts from "./pages/Contacts";
import About from "./pages/About";
import Training from "./pages/Training";
import AICoach from "./pages/AICoach";
import Attendance from "./pages/Attendance";
import Partners from "./pages/Partners";
import Performance from "./pages/Performance";
import CalendarView from "./pages/CalendarView";
import Leaderboard from "./pages/Leaderboard";
import Auth from "./pages/Auth";
import Messages from "./pages/Messages";
import MatchPlanner from "./pages/MatchPlanner";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/about" element={<About />} />
          <Route path="/training" element={<Training />} />
          <Route path="/ai-coach" element={<AICoach />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/performance" element={<Performance />} />
          <Route path="/calendar" element={<CalendarView />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/match-planner" element={<MatchPlanner />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
