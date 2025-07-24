import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LearningButtonProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  onClick: () => void;
  variant?: "default" | "secondary" | "success" | "warning" | "game";
  className?: string;
}

export const LearningButton = ({ 
  icon, 
  title, 
  subtitle, 
  onClick, 
  variant = "default",
  className 
}: LearningButtonProps) => {
  return (
    <Button
      variant={variant}
      size="xl"
      onClick={onClick}
      className={cn(
        "flex-col h-32 w-full max-w-xs gap-2 p-6 hover:scale-105 transition-transform duration-300",
        className
      )}
    >
      <div className="text-4xl mb-2">
        {icon}
      </div>
      <div className="text-center">
        <div className="text-xl font-bold leading-tight">{title}</div>
        {subtitle && (
          <div className="text-sm opacity-90 mt-1">{subtitle}</div>
        )}
      </div>
    </Button>
  );
};