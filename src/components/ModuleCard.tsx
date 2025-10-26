import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface ModuleCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  path: string;
  gradient?: string;
}

const ModuleCard = ({ title, description, icon: Icon, path, gradient = "from-primary to-glow-secondary" }: ModuleCardProps) => {
  return (
    <Link to={path}>
      <Card className="relative overflow-hidden group cursor-pointer bg-gradient-card border-border hover:border-primary transition-all duration-300 hover:shadow-glow">
        <div className="p-6 space-y-4">
          <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-glow group-hover:shadow-glow-strong transition-all group-hover:scale-110`}>
            <Icon className="w-7 h-7 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
              {title}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {description}
            </p>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </Card>
    </Link>
  );
};

export default ModuleCard;
