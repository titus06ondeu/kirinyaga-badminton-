import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ImageSlider from "@/components/ImageSlider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Zap, Target, TrendingUp } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-dark">
      <Navbar />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12 animate-fade-in">
            <div className="glassy-header inline-block">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 relative">
                <span className="bg-gradient-to-r from-primary via-glow-secondary to-primary bg-clip-text text-transparent animate-glow-pulse">
                  Kirinyaga University
                </span>
                <br />
                <span className="text-3xl md:text-5xl text-white mt-2 block">
                  Smart Sports AI Coach & Planner
                </span>
              </h1>
            </div>
          </div>

          <ImageSlider />

          <div className="mt-16 flex flex-wrap justify-center gap-4 animate-fade-in-up">
            <Link to="/dashboard">
              <Button className="px-8 py-6 text-lg bg-gradient-primary hover:shadow-glow-strong transition-all shadow-glow">
                <Zap className="w-5 h-5 mr-2" />
                Get Started
              </Button>
            </Link>
            <Link to="/training">
              <Button variant="secondary" className="px-8 py-6 text-lg border border-primary hover:bg-primary/10 transition-all">
                <Target className="w-5 h-5 mr-2" />
                View Training Plans
              </Button>
            </Link>
            <Link to="/gallery">
              <Button variant="secondary" className="px-8 py-6 text-lg border border-primary hover:bg-primary/10 transition-all">
                <TrendingUp className="w-5 h-5 mr-2" />
                Meet Our Team
              </Button>
            </Link>
          </div>

          <div className="mt-20 bg-gradient-card rounded-2xl p-8 md:p-12 shadow-card border border-border">
            <h2 className="text-3xl font-bold mb-6 text-center text-primary">About Our Platform</h2>
            <p className="text-lg text-muted-foreground leading-relaxed text-center max-w-4xl mx-auto">
              This platform combines <span className="text-primary font-semibold">artificial intelligence</span> and{" "}
              <span className="text-primary font-semibold">sports analytics</span> to help Kirinyaga University athletes 
              optimize their training, attendance, and performance. Plan your drills, track progress, and train efficiently 
              with personalized AI-driven recommendations tailored to your unique needs.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: "AI-Powered", description: "Get intelligent drill recommendations based on your weaknesses" },
              { icon: Target, title: "Smart Planning", description: "Automated training schedules that balance all workout types" },
              { icon: TrendingUp, title: "Track Progress", description: "Visualize your improvement with detailed performance analytics" },
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div key={idx} className="bg-gradient-card rounded-xl p-6 border border-border hover:border-primary transition-all group animate-fade-in-up">
                  <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4 shadow-glow group-hover:shadow-glow-strong transition-all">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
