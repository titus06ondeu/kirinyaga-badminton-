import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  message: z.string().trim().min(1, "Message is required").max(1000),
});

const Contacts = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      
      // Validate input
      const validated = contactSchema.parse(formData);
      
      // Insert message into database
      const { error } = await supabase
        .from("messages")
        .insert({
          name: validated.name,
          email: validated.email,
          message: validated.message,
        });
      
      if (error) throw error;
      
      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      } else {
        toast.error("Failed to send message. Please try again.");
        console.error("Error sending message:", error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-dark">
      <Navbar />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary to-glow-secondary bg-clip-text text-transparent">
                Contact Us
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get in touch with Kirinyaga University Sports Department
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card className="p-8 bg-gradient-card border-border animate-fade-in-up">
              <h2 className="text-2xl font-bold mb-6 text-primary">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                    required
                    className="bg-background border-border focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your.email@example.com"
                    required
                    className="bg-background border-border focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Your message..."
                    rows={5}
                    required
                    className="bg-background border-border focus:border-primary transition-colors resize-none"
                  />
                </div>
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-gradient-primary hover:shadow-glow transition-all shadow-glow"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Card>

            <div className="space-y-6 animate-fade-in-up">
              <Card className="p-8 bg-gradient-card border-border">
                <h2 className="text-2xl font-bold mb-6 text-primary">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center flex-shrink-0 shadow-glow">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Address</h3>
                      <p className="text-muted-foreground">Kirinyaga University<br />Kerugoya, Kirinyaga County<br />Kenya</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center flex-shrink-0 shadow-glow">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Phone</h3>
                      <p className="text-muted-foreground">+254 700 000 000</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center flex-shrink-0 shadow-glow">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Email</h3>
                      <p className="text-muted-foreground">sports@kirinyaga.ac.ke</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-8 bg-gradient-card border-border">
                <h2 className="text-2xl font-bold mb-6 text-primary">Follow Us</h2>
                <div className="flex space-x-4">
                  <a href="#" className="w-14 h-14 rounded-lg bg-secondary hover:bg-gradient-primary transition-all flex items-center justify-center group shadow-card hover:shadow-glow">
                    <Facebook className="w-7 h-7 text-muted-foreground group-hover:text-white transition-colors" />
                  </a>
                  <a href="#" className="w-14 h-14 rounded-lg bg-secondary hover:bg-gradient-primary transition-all flex items-center justify-center group shadow-card hover:shadow-glow">
                    <Instagram className="w-7 h-7 text-muted-foreground group-hover:text-white transition-colors" />
                  </a>
                  <a href="#" className="w-14 h-14 rounded-lg bg-secondary hover:bg-gradient-primary transition-all flex items-center justify-center group shadow-card hover:shadow-glow">
                    <Linkedin className="w-7 h-7 text-muted-foreground group-hover:text-white transition-colors" />
                  </a>
                </div>
              </Card>

              <Card className="p-8 bg-gradient-card border-border overflow-hidden">
                <h2 className="text-2xl font-bold mb-4 text-primary">Location Map</h2>
                <div className="aspect-video bg-secondary rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">Map placeholder - Integration coming soon</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contacts;
