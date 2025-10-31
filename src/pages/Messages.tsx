import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MailOpen, Trash2, Send, CheckCircle, Clock, AlertCircle, Shield } from "lucide-react";
import { toast } from "sonner";

interface Message {
  id: string;
  fromEmail: string;
  fromName: string;
  toEmail: string;
  subject: string;
  body: string;
  timestamp: Date;
  status: "pending" | "sent" | "failed";
  read: boolean;
  threadId: string;
}

interface AuthorizationRequest {
  id: string;
  userEmail: string;
  userName: string;
  requestType: "messaging" | "editing";
  status: "pending" | "approved" | "denied";
  requestedAt: Date;
  respondedAt?: Date;
}

const ADMIN_EMAIL = "titusondeu06@gmail.com";

const Messages = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      fromEmail: "john@example.com",
      fromName: "John Kamau",
      toEmail: ADMIN_EMAIL,
      subject: "Request for messaging access",
      body: "Hi, I would like to request messaging permissions to communicate with the team.",
      timestamp: new Date(Date.now() - 3600000),
      status: "sent",
      read: false,
      threadId: "thread-1",
    },
    {
      id: "2",
      fromEmail: ADMIN_EMAIL,
      fromName: "Admin",
      toEmail: "john@example.com",
      subject: "Re: Request for messaging access",
      body: "Your messaging access has been approved. You can now send messages to team members.",
      timestamp: new Date(Date.now() - 1800000),
      status: "sent",
      read: true,
      threadId: "thread-1",
    },
  ]);

  const [authRequests, setAuthRequests] = useState<AuthorizationRequest[]>([
    {
      id: "req-1",
      userEmail: "mary@example.com",
      userName: "Mary Wanjiru",
      requestType: "messaging",
      status: "pending",
      requestedAt: new Date(Date.now() - 7200000),
    },
    {
      id: "req-2",
      userEmail: "peter@example.com",
      userName: "Peter Omondi",
      requestType: "editing",
      status: "pending",
      requestedAt: new Date(Date.now() - 3600000),
    },
  ]);

  const [composeOpen, setComposeOpen] = useState(false);
  const [composeTo, setComposeTo] = useState("");
  const [composeSubject, setComposeSubject] = useState("");
  const [composeBody, setComposeBody] = useState("");
  const [currentUser] = useState({ email: ADMIN_EMAIL, name: "Admin" });
  const [selectedThread, setSelectedThread] = useState<string | null>(null);

  // Get messages for a thread
  const getThreadMessages = (threadId: string) => {
    return messages.filter((m) => m.threadId === threadId);
  };

  // Get unique threads
  const getThreads = () => {
    const threads = new Map<string, Message>();
    messages.forEach((msg) => {
      if (!threads.has(msg.threadId)) {
        threads.set(msg.threadId, msg);
      } else {
        const existing = threads.get(msg.threadId)!;
        if (msg.timestamp > existing.timestamp) {
          threads.set(msg.threadId, msg);
        }
      }
    });
    return Array.from(threads.values());
  };

  // Send message
  const sendMessage = () => {
    if (!composeTo.trim() || !composeSubject.trim() || !composeBody.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      fromEmail: currentUser.email,
      fromName: currentUser.name,
      toEmail: composeTo,
      subject: composeSubject,
      body: composeBody,
      timestamp: new Date(),
      status: "sent",
      read: false,
      threadId: `thread-${Date.now()}`,
    };

    setMessages([newMessage, ...messages]);
    setComposeOpen(false);
    setComposeTo("");
    setComposeSubject("");
    setComposeBody("");
    toast.success("Message sent successfully!");
  };

  // Approve authorization request
  const approveRequest = (requestId: string) => {
    setAuthRequests(
      authRequests.map((req) =>
        req.id === requestId
          ? { ...req, status: "approved", respondedAt: new Date() }
          : req
      )
    );
    toast.success("Authorization approved!");
  };

  // Deny authorization request
  const denyRequest = (requestId: string) => {
    setAuthRequests(
      authRequests.map((req) =>
        req.id === requestId
          ? { ...req, status: "denied", respondedAt: new Date() }
          : req
      )
    );
    toast.success("Authorization denied!");
  };

  // Toggle read status
  const toggleRead = (messageId: string) => {
    setMessages(
      messages.map((msg) =>
        msg.id === messageId ? { ...msg, read: !msg.read } : msg
      )
    );
  };

  // Delete message
  const deleteMessage = (messageId: string) => {
    setMessages(messages.filter((msg) => msg.id !== messageId));
    toast.success("Message deleted");
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "sent":
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-400" />;
      case "failed":
        return <AlertCircle className="w-4 h-4 text-red-400" />;
      default:
        return null;
    }
  };

  const threads = getThreads();
  const selectedMessages = selectedThread ? getThreadMessages(selectedThread) : [];
  const unreadCount = messages.filter((m) => !m.read).length;
  const pendingRequests = authRequests.filter((r) => r.status === "pending").length;

  return (
    <div className="min-h-screen bg-gradient-dark">
      <Navbar />

      <main className="pt-24 pb-12">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary to-glow-secondary bg-clip-text text-transparent">
                Messaging & Admin Control
              </span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Manage team communications and authorization requests
            </p>
          </div>

          {/* Admin Info */}
          <Card className="p-6 bg-gradient-card border-border animate-fade-in-up mb-8">
            <div className="flex items-center space-x-3">
              <Shield className="w-6 h-6 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Admin Account</p>
                <p className="font-semibold text-foreground">{currentUser.email}</p>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Statistics */}
            <Card className="p-6 bg-gradient-card border-border">
              <p className="text-sm text-muted-foreground mb-2">Unread Messages</p>
              <p className="text-4xl font-bold text-primary">{unreadCount}</p>
            </Card>
            <Card className="p-6 bg-gradient-card border-border">
              <p className="text-sm text-muted-foreground mb-2">Total Messages</p>
              <p className="text-4xl font-bold text-primary">{messages.length}</p>
            </Card>
            <Card className="p-6 bg-gradient-card border-border">
              <p className="text-sm text-muted-foreground mb-2">Pending Requests</p>
              <p className="text-4xl font-bold text-yellow-400">{pendingRequests}</p>
            </Card>
          </div>

          {/* Authorization Requests */}
          {authRequests.length > 0 && (
            <Card className="p-8 bg-gradient-card border-border animate-fade-in-up mb-8">
              <h2 className="text-2xl font-bold mb-6 text-primary flex items-center">
                <Shield className="w-6 h-6 mr-2" />
                Authorization Requests ({pendingRequests})
              </h2>

              <div className="space-y-4">
                {authRequests.map((request) => (
                  <div
                    key={request.id}
                    className={`p-4 rounded-lg border transition-all ${
                      request.status === "pending"
                        ? "bg-yellow-500/10 border-yellow-500/30"
                        : request.status === "approved"
                        ? "bg-green-500/10 border-green-500/30"
                        : "bg-red-500/10 border-red-500/30"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-semibold text-foreground">{request.userName}</p>
                        <p className="text-sm text-muted-foreground">{request.userEmail}</p>
                      </div>
                      <Badge
                        className={
                          request.status === "pending"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : request.status === "approved"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-red-500/20 text-red-400"
                        }
                      >
                        {request.status}
                      </Badge>
                    </div>

                    <p className="text-sm text-muted-foreground mb-3">
                      Requesting: <span className="font-semibold capitalize">{request.requestType}</span> access
                    </p>

                    <p className="text-xs text-muted-foreground mb-4">
                      Requested: {request.requestedAt.toLocaleString()}
                    </p>

                    {request.status === "pending" && (
                      <div className="flex gap-2">
                        <Button
                          onClick={() => approveRequest(request.id)}
                          className="flex-1 bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Approve
                        </Button>
                        <Button
                          onClick={() => denyRequest(request.id)}
                          variant="outline"
                          className="flex-1 border-red-500/30 hover:bg-red-500/10 text-red-400"
                        >
                          <AlertCircle className="w-4 h-4 mr-2" />
                          Deny
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Main Messaging Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Threads List */}
            <Card className="lg:col-span-1 p-6 bg-gradient-card border-border animate-fade-in-up">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-primary">Conversations</h2>
                <Button
                  onClick={() => setComposeOpen(true)}
                  size="sm"
                  className="bg-gradient-primary shadow-glow hover:shadow-glow-strong"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-2">
                {threads.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">No conversations</p>
                ) : (
                  threads.map((msg) => (
                    <button
                      key={msg.threadId}
                      onClick={() => setSelectedThread(msg.threadId)}
                      className={`w-full text-left p-3 rounded-lg border transition-all ${
                        selectedThread === msg.threadId
                          ? "bg-primary/20 border-primary"
                          : "bg-background border-border hover:border-primary"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-foreground truncate">
                            {msg.fromEmail === currentUser.email ? msg.toEmail : msg.fromEmail}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">{msg.subject}</p>
                        </div>
                        {!msg.read && (
                          <div className="w-2 h-2 bg-primary rounded-full ml-2 flex-shrink-0" />
                        )}
                      </div>
                    </button>
                  ))
                )}
              </div>
            </Card>

            {/* Messages Display */}
            <Card className="lg:col-span-2 p-6 bg-gradient-card border-border animate-fade-in-up">
              {selectedThread ? (
                <div>
                  <h2 className="text-xl font-bold mb-6 text-primary">
                    {selectedMessages[0]?.subject}
                  </h2>

                  <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                    {selectedMessages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`p-4 rounded-lg border ${
                          msg.fromEmail === currentUser.email
                            ? "bg-primary/10 border-primary/30 ml-8"
                            : "bg-background border-border mr-8"
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-semibold text-foreground">{msg.fromName}</p>
                            <p className="text-xs text-muted-foreground">{msg.fromEmail}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(msg.status)}
                            <p className="text-xs text-muted-foreground">
                              {msg.timestamp.toLocaleTimeString()}
                            </p>
                          </div>
                        </div>

                        <p className="text-sm text-foreground mb-3">{msg.body}</p>

                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => toggleRead(msg.id)}
                            className="text-xs"
                          >
                            {msg.read ? (
                              <>
                                <Mail className="w-3 h-3 mr-1" />
                                Mark unread
                              </>
                            ) : (
                              <>
                                <MailOpen className="w-3 h-3 mr-1" />
                                Mark read
                              </>
                            )}
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => deleteMessage(msg.id)}
                            className="text-xs hover:text-red-400"
                          >
                            <Trash2 className="w-3 h-3 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Reply Box */}
                  <div className="pt-6 border-t border-border">
                    <Textarea
                      placeholder="Type your reply..."
                      rows={3}
                      className="bg-background border-border focus:border-primary transition-colors resize-none mb-3"
                    />
                    <Button className="w-full bg-gradient-primary shadow-glow hover:shadow-glow-strong">
                      <Send className="w-4 h-4 mr-2" />
                      Send Reply
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Mail className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <p className="text-muted-foreground">Select a conversation to view messages</p>
                </div>
              )}
            </Card>
          </div>

          {/* Compose Modal */}
          {composeOpen && (
            <Card className="fixed inset-0 m-auto max-w-2xl p-8 bg-gradient-card border-border z-50 max-h-96 overflow-y-auto">
              <h2 className="text-2xl font-bold mb-6 text-primary">New Message</h2>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">To</label>
                  <Input
                    value={composeTo}
                    onChange={(e) => setComposeTo(e.target.value)}
                    placeholder="recipient@example.com"
                    className="bg-background border-border focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Subject</label>
                  <Input
                    value={composeSubject}
                    onChange={(e) => setComposeSubject(e.target.value)}
                    placeholder="Message subject"
                    className="bg-background border-border focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Message</label>
                  <Textarea
                    value={composeBody}
                    onChange={(e) => setComposeBody(e.target.value)}
                    placeholder="Type your message..."
                    rows={5}
                    className="bg-background border-border focus:border-primary resize-none"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={sendMessage}
                  className="flex-1 bg-gradient-primary shadow-glow hover:shadow-glow-strong"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send
                </Button>
                <Button
                  onClick={() => setComposeOpen(false)}
                  variant="outline"
                  className="flex-1 border-primary/30 hover:bg-primary/10"
                >
                  Cancel
                </Button>
              </div>
            </Card>
          )}

          {composeOpen && (
            <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setComposeOpen(false)} />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Messages;
