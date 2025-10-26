import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";

interface Event {
  date: number;
  type: "training" | "attendance" | "match";
  description: string;
}

const CalendarView = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<number | null>(null);

  const events: Event[] = [
    { date: 5, type: "training", description: "Footwork and agility drills" },
    { date: 5, type: "attendance", description: "Present - 9:15 AM" },
    { date: 8, type: "match", description: "Practice match vs Team B" },
    { date: 12, type: "training", description: "Smash technique practice" },
    { date: 12, type: "attendance", description: "Present - 9:20 AM" },
    { date: 15, type: "training", description: "Endurance and stamina building" },
    { date: 19, type: "attendance", description: "Present - 9:10 AM" },
    { date: 22, type: "match", description: "Inter-university tournament" },
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDay = getFirstDayOfMonth(currentMonth);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDay }, (_, i) => i);

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
    setSelectedDate(null);
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
    setSelectedDate(null);
  };

  const getEventsForDate = (day: number) => {
    return events.filter(e => e.date === day);
  };

  const selectedEvents = selectedDate ? getEventsForDate(selectedDate) : [];

  const getEventColor = (type: Event["type"]) => {
    switch (type) {
      case "training": return "bg-blue-500";
      case "attendance": return "bg-green-500";
      case "match": return "bg-purple-500";
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
                Training Calendar
              </span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Track your attendance, workouts, and upcoming events
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 p-6 bg-gradient-card border-border animate-fade-in-up">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-primary">
                  {currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                </h2>
                <div className="flex space-x-2">
                  <Button variant="secondary" size="icon" onClick={prevMonth}>
                    <ChevronLeft className="w-5 h-5" />
                  </Button>
                  <Button variant="secondary" size="icon" onClick={nextMonth}>
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-2 mb-2">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
                  <div key={day} className="text-center text-sm font-semibold text-muted-foreground py-2">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-2">
                {emptyDays.map(i => (
                  <div key={`empty-${i}`} className="aspect-square" />
                ))}
                {days.map(day => {
                  const dayEvents = getEventsForDate(day);
                  const isSelected = selectedDate === day;
                  const hasEvents = dayEvents.length > 0;
                  
                  return (
                    <button
                      key={day}
                      onClick={() => setSelectedDate(day)}
                      className={`aspect-square rounded-lg flex flex-col items-center justify-center relative transition-all group ${
                        isSelected
                          ? "bg-gradient-primary shadow-glow text-white"
                          : hasEvents
                          ? "bg-primary/20 hover:bg-primary/30 border border-primary/40"
                          : "bg-secondary hover:bg-secondary/80"
                      }`}
                    >
                      <span className={`text-sm font-medium ${isSelected ? "text-white" : "text-foreground"}`}>
                        {day}
                      </span>
                      {hasEvents && (
                        <div className="flex space-x-1 mt-1">
                          {dayEvents.slice(0, 3).map((event, idx) => (
                            <div key={idx} className={`w-1.5 h-1.5 rounded-full ${getEventColor(event.type)}`} />
                          ))}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </Card>

            <Card className="p-6 bg-gradient-card border-border animate-fade-in-up">
              <h2 className="text-2xl font-bold mb-4 text-primary flex items-center">
                <CalendarIcon className="w-6 h-6 mr-2" />
                Event Details
              </h2>
              
              {selectedDate ? (
                <div>
                  <p className="text-muted-foreground mb-4">
                    {currentMonth.toLocaleDateString("en-US", { month: "long" })} {selectedDate}, {currentMonth.getFullYear()}
                  </p>
                  
                  {selectedEvents.length > 0 ? (
                    <div className="space-y-3">
                      {selectedEvents.map((event, idx) => (
                        <div key={idx} className="p-3 bg-background rounded-lg border border-border">
                          <div className="flex items-center space-x-2 mb-2">
                            <div className={`w-3 h-3 rounded-full ${getEventColor(event.type)}`} />
                            <span className="text-sm font-semibold capitalize text-foreground">{event.type}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{event.description}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-sm">No events scheduled for this day</p>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <CalendarIcon className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <p className="text-muted-foreground">Select a date to view events</p>
                </div>
              )}

              <div className="mt-8 pt-6 border-t border-border">
                <h3 className="text-sm font-bold mb-3 text-primary">Legend</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500" />
                    <span className="text-sm text-muted-foreground">Training</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="text-sm text-muted-foreground">Attendance</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-purple-500" />
                    <span className="text-sm text-muted-foreground">Match/Event</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CalendarView;
