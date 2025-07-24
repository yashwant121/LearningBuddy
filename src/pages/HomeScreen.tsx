import { Calendar, BookOpen, Gamepad2, Heart, Settings } from "lucide-react";
import { LearningButton } from "@/components/LearningButton";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";

interface HomeScreenProps {
  onNavigate: (screen: 'schedule' | 'flashcards' | 'game' | 'calming' | 'settings') => void;
}

export const HomeScreen = ({ onNavigate }: HomeScreenProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Header title="My Learning Buddy" />
      
      <main className="container px-6 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            What would you like to do today?
          </h2>
          <p className="text-muted-foreground text-lg">
            Choose an activity to start learning!
          </p>
        </div>

        <div className="flex flex-col items-center gap-6 max-w-md mx-auto">
          <LearningButton
            icon={<Calendar />}
            title="My Schedule"
            subtitle="See daily tasks"
            onClick={() => onNavigate('schedule')}
            variant="default"
          />

          <LearningButton
            icon={<BookOpen />}
            title="Flashcards"
            subtitle="Learn new words"
            onClick={() => onNavigate('flashcards')}
            variant="secondary"
          />

          <LearningButton
            icon={<Gamepad2 />}
            title="Matching Game"
            subtitle="Play and learn"
            onClick={() => onNavigate('game')}
            variant="game"
          />

          <LearningButton
            icon={<Heart />}
            title="Calming Mode"
            subtitle="Relax and breathe"
            onClick={() => onNavigate('calming')}
            variant="success"
          />
        </div>

        {/* Settings Button */}
        <div className="text-center mt-8">
          <Button
            variant="outline"
            size="lg"
            onClick={() => onNavigate('settings')}
            className="gap-3"
          >
            <Settings className="h-6 w-6" />
            Settings
          </Button>
        </div>

        <div className="text-center mt-12">
          <div className="text-6xl mb-4">🌟</div>
          <p className="text-muted-foreground">
            You're doing great! Keep learning!
          </p>
        </div>
      </main>
    </div>
  );
};