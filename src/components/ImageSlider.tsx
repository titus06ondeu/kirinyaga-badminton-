import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import badmintonHero from "@/assets/badminton-hero.jpg";
import trainingSession from "@/assets/training-session.jpg";
import aiTechnology from "@/assets/ai-technology.jpg";

const slides = [
  {
    image: badmintonHero,
    title: "Train Smarter. Play Harder.",
    description: "AI-powered training optimization for champions",
  },
  {
    image: trainingSession,
    title: "AI-Driven Performance for Athletes",
    description: "Personalized coaching based on your unique strengths",
  },
  {
    image: aiTechnology,
    title: "Kirinyaga University – Where Champions are Made",
    description: "Advanced analytics and performance tracking",
  },
];

const ImageSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((current - 1 + slides.length) % slides.length);
  const next = () => setCurrent((current + 1) % slides.length);

  return (
    <div className="relative w-full h-[600px] overflow-hidden rounded-2xl shadow-card group">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70 z-10" />
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6">
            <h2 className="text-5xl md:text-6xl font-bold mb-4 text-white animate-fade-in-up">
              {slide.title}
            </h2>
            <p className="text-xl md:text-2xl text-gray-200 animate-fade-in-up max-w-2xl">
              {slide.description}
            </p>
          </div>
        </div>
      ))}

      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-black/30 hover:bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={prev}
      >
        <ChevronLeft className="w-6 h-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-black/30 hover:bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={next}
      >
        <ChevronRight className="w-6 h-6" />
      </Button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === current
                ? "bg-primary shadow-glow w-8"
                : "bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
