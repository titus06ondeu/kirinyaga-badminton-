import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Target, Users, Zap, Award } from "lucide-react";

const About = () => {
  const team = [
    { name: "Dr. James Mwangi", role: "Sports Director", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400" },
    { name: "Coach Sarah Wanjiku", role: "Head Badminton Coach", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400" },
    { name: "Tech Team Lead", role: "AI Systems Developer", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400" },
  ];

  const values = [
    { icon: Target, title: "Excellence", description: "Striving for peak performance in every training session" },
    { icon: Users, title: "Teamwork", description: "Building strong bonds through collaborative training" },
    { icon: Zap, title: "Innovation", description: "Leveraging AI and technology for athletic advancement" },
    { icon: Award, title: "Achievement", description: "Celebrating progress and reaching new milestones" },
  ];

  return (
    <div className="min-h-screen bg-gradient-dark">
      <Navbar />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary to-glow-secondary bg-clip-text text-transparent">
                About Us
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Pioneering AI-driven sports training at Kirinyaga University
            </p>
          </div>

          <Card className="p-8 md:p-12 mb-16 bg-gradient-card border-border animate-fade-in-up">
            <h2 className="text-3xl font-bold mb-6 text-primary">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              The Kirinyaga University Sports AI Coach & Planner represents our commitment to merging cutting-edge 
              artificial intelligence with athletic development. We believe that every athlete deserves personalized, 
              data-driven coaching that adapts to their unique strengths and weaknesses.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our platform is designed to revolutionize how athletes train, track their progress, and achieve their goals. 
              By combining smart attendance tracking, AI-powered coaching recommendations, and comprehensive performance 
              analytics, we're creating champions who are not just physically skilled, but also technologically empowered.
            </p>
          </Card>

          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center text-primary">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, idx) => {
                const Icon = value.icon;
                return (
                  <Card key={idx} className="p-6 bg-gradient-card border-border hover:border-primary transition-all group animate-fade-in-up">
                    <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4 shadow-glow group-hover:shadow-glow-strong transition-all">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{value.title}</h3>
                    <p className="text-muted-foreground text-sm">{value.description}</p>
                  </Card>
                );
              })}
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-8 text-center text-primary">Meet Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member, idx) => (
                <Card key={idx} className="overflow-hidden bg-gradient-card border-border hover:border-primary transition-all group animate-fade-in-up">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{member.name}</h3>
                    <p className="text-muted-foreground">{member.role}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
