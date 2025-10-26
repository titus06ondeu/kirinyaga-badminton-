import { Link, useLocation } from "react-router-dom";
import { Home, Image, Phone, Info, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const location = useLocation();

  const links = [
    { name: "Home", path: "/", icon: Home },
    { name: "Gallery", path: "/gallery", icon: Image },
    { name: "Contacts", path: "/contacts", icon: Phone },
    { name: "About Us", path: "/about", icon: Info },
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border shadow-card">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center shadow-glow group-hover:shadow-glow-strong transition-all">
              <span className="text-white font-bold text-xl">KU</span>
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-primary to-glow-secondary bg-clip-text text-transparent">
              Sports AI
            </span>
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

          {/* Mobile menu - simplified for now */}
          <div className="md:hidden flex items-center space-x-2">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "p-2 rounded-lg transition-all",
                    isActive ? "text-primary shadow-glow" : "text-muted-foreground"
                  )}
                >
                  <Icon className="w-5 h-5" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
