import { Link, useLocation } from "react-router-dom";
import { Home, Image, Phone, Info, LayoutDashboard, Calendar, LogOut, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Navbar = () => {
  const location = useLocation();
  const { user, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const links = [
    { name: "Home", path: "/", icon: Home },
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Calendar", path: "/calendar", icon: Calendar },
    { name: "Gallery", path: "/gallery", icon: Image },
    { name: "Contacts", path: "/contacts", icon: Phone },
    { name: "About Us", path: "/about", icon: Info },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border shadow-card">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-primary to-glow-secondary bg-clip-text text-transparent group-hover:scale-110 transition-transform" 
                 style={{ fontFamily: 'Orbitron, sans-serif' }}>
              KyU
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 relative group",
                    isActive
                      ? "text-primary shadow-glow"
                      : "text-muted-foreground hover:text-primary hover:bg-secondary"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{link.name}</span>
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-primary rounded-full shadow-glow" />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="hidden md:flex items-center space-x-3">
            <Link to="/about" className="text-xs text-muted-foreground hover:text-primary transition-colors duration-300 hover:shadow-glow px-2 py-1 rounded" title="About the creator">
              Built with ❤️ by Titus
            </Link>
            {user ? (
              <Button
                onClick={signOut}
                variant="outline"
                size="sm"
                className="border-primary/30 hover:bg-primary/10"
              >
                <LogOut className="mr-2" size={16} />
                Logout
              </Button>
            ) : (
              <Link to="/auth">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-primary/30 hover:bg-primary/10"
                >
                  Login
                </Button>
              </Link>
            )}
          </div>

          <button
            className="md:hidden text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2 animate-fade-in">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center space-x-3 px-4 py-3 rounded-lg transition-all",
                    isActive
                      ? "text-primary bg-primary/10 shadow-glow"
                      : "text-muted-foreground hover:text-primary hover:bg-secondary"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{link.name}</span>
                </Link>
              );
            })}
            
            <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="text-xs text-muted-foreground hover:text-primary transition-colors duration-300 px-4 py-2">
              Built with ❤️ by Titus
            </Link>
            
            {user ? (
              <Button
                onClick={() => {
                  signOut();
                  setMobileMenuOpen(false);
                }}
                variant="outline"
                className="w-full border-primary/30 hover:bg-primary/10"
              >
                <LogOut className="mr-2" size={16} />
                Logout
              </Button>
            ) : (
              <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>
                <Button
                  variant="outline"
                  className="w-full border-primary/30 hover:bg-primary/10"
                >
                  Login
                </Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
