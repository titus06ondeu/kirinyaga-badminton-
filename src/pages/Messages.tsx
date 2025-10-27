import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, MailOpen, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
  read: boolean;
}

const Messages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const { userRole, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && userRole !== "admin") {
      toast.error("Access denied. Admins only.");
      navigate("/dashboard");
    }
  }, [userRole, authLoading, navigate]);

  useEffect(() => {
    fetchMessages();
    
    // Subscribe to realtime updates
    const channel = supabase
      .channel("messages-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "messages",
        },
        () => {
          fetchMessages();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error("Error fetching messages:", error);
      toast.error("Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  const toggleRead = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from("messages")
        .update({ read: !currentStatus })
        .eq("id", id);

      if (error) throw error;
      toast.success(currentStatus ? "Marked as unread" : "Marked as read");
    } catch (error) {
      console.error("Error updating message:", error);
      toast.error("Failed to update message");
    }
  };

  const deleteMessage = async (id: string) => {
    try {
      const { error } = await supabase
        .from("messages")
        .delete()
        .eq("id", id);

      if (error) throw error;
      toast.success("Message deleted");
    } catch (error) {
      console.error("Error deleting message:", error);
      toast.error("Failed to delete message");
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gradient-dark flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (userRole !== "admin") return null;

  return (
    <div className="min-h-screen bg-gradient-dark">
      <Navbar />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary to-glow-secondary bg-clip-text text-transparent">
                Messages
              </span>
            </h1>
            <p className="text-xl text-muted-foreground">
              {messages.filter(m => !m.read).length} unread messages
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {messages.length === 0 ? (
              <Card className="p-12 bg-gradient-card border-border text-center">
                <Mail className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-xl text-muted-foreground">No messages yet</p>
              </Card>
            ) : (
              messages.map((msg) => (
                <Card
                  key={msg.id}
                  className={`p-6 bg-gradient-card border-border transition-all hover:shadow-glow ${
                    !msg.read ? "border-l-4 border-l-primary" : ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold">{msg.name}</h3>
                        {!msg.read && (
                          <Badge className="bg-primary text-white">New</Badge>
                        )}
                      </div>
                      <p className="text-sm text-primary mb-2">{msg.email}</p>
                      <p className="text-muted-foreground mb-3">{msg.message}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(msg.created_at).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => toggleRead(msg.id, msg.read)}
                        className="hover:bg-secondary"
                      >
                        {msg.read ? (
                          <Mail className="w-4 h-4" />
                        ) : (
                          <MailOpen className="w-4 h-4" />
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => deleteMessage(msg.id)}
                        className="hover:bg-destructive hover:text-white"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Messages;
