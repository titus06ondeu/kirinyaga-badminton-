import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { X } from "lucide-react";
import badmintonHero from "@/assets/badminton-hero.jpg";
import trainingSession from "@/assets/training-session.jpg";
import aiTechnology from "@/assets/ai-technology.jpg";
import teamCelebration from "@/assets/team-celebration.jpg";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const images = [
    { src: badmintonHero, title: "Championship Action" },
    { src: trainingSession, title: "Training Session" },
    { src: aiTechnology, title: "AI Technology" },
    { src: teamCelebration, title: "Team Victory" },
    { src: badmintonHero, title: "Professional Court" },
    { src: trainingSession, title: "Skill Development" },
  ];

  return (
    <div className="min-h-screen bg-gradient-dark">
      <Navbar />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary to-glow-secondary bg-clip-text text-transparent">
                Gallery
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Moments of excellence and teamwork at Kirinyaga University
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up">
            {images.map((image, idx) => (
              <div
                key={idx}
                className="relative group cursor-pointer overflow-hidden rounded-xl border border-border hover:border-primary transition-all shadow-card hover:shadow-glow"
                onClick={() => setSelectedImage(image.src)}
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-bold text-lg">{image.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-6 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-card hover:bg-primary transition-colors flex items-center justify-center group"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-6 h-6 text-muted-foreground group-hover:text-white transition-colors" />
          </button>
          <img
            src={selectedImage}
            alt="Full size"
            className="max-w-full max-h-full object-contain rounded-xl shadow-glow-strong"
          />
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Gallery;
