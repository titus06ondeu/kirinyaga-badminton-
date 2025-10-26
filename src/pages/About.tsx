import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Target, Users, Zap, Award } from "lucide-react";

const About = () => {
  const team = [
    { 
      name: "Venah", 
      role: "Female Badminton Captain", 
      initial: "V",
      description: "Leading the women's team with passion and dedication"
    },
    { 
      name: "Emmanuel", 
      role: "Male Badminton Captain", 
      initial: "E",
      description: "Guiding the men's team to excellence"
    },
    { 
      name: "Titus", 
      role: "PA to the Captains", 
      initial: "T",
      description: "Supporting team operations and coordination"
    },
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
                <Card
                  key={idx}
                  className="p-6 bg-gradient-card border-border text-center hover:shadow-glow transition-all animate-fade-in-up group"
                >
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-4xl font-bold text-white shadow-glow group-hover:shadow-glow-strong transition-all">
                    {member.initial}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-primary">{member.name}</h3>
                  <p className="text-sm font-semibold text-foreground mb-2">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.description}</p>
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
