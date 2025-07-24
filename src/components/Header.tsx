import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";

interface HeaderProps {
  title: string;
  onBack?: () => void;
  onHome?: () => void;
  showHome?: boolean;
}

export const Header = ({ title, onBack, onHome, showHome = false }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full bg-card border-b border-border shadow-sm">
      <div className="container flex h-20 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          {onBack && (
            <Button 
              variant="ghost" 
              size="icon"
              onClick={onBack}
              className="hover:bg-accent"
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
          )}
          <h1 className="text-2xl font-bold text-foreground truncate">
            {title}
          </h1>
        </div>
        
        {showHome && onHome && (
          <Button 
            variant="outline" 
            size="sm"
            onClick={onHome}
            className="gap-2"
          >
            <Home className="h-4 w-4" />
            Home
          </Button>
        )}
      </div>
    </header>
  );
};