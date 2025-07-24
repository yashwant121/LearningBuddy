import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

interface CalmingModeScreenProps {
  onBack: () => void;
  onHome: () => void;
}

export const CalmingModeScreen = ({ onBack, onHome }: CalmingModeScreenProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [breathePhase, setBreathePhase] = useState<'in' | 'out'>('in');

  // Breathing animation cycle
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setBreathePhase(prev => prev === 'in' ? 'out' : 'in');
    }, 4000); // 4 seconds in, 4 seconds out

    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleToggleMute = () => {
    setIsMuted(!isMuted);
  };

  const playBreathingSound = () => {
    if (isMuted || !isPlaying) return;
    
    // Simple breathing sound using Web Audio API
    if ('AudioContext' in window) {
      const audioContext = new AudioContext();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      // Create a gentle wave sound
      oscillator.frequency.setValueAtTime(220, audioContext.currentTime);
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 1);
      gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 3);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 3);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      playBreathingSound();
    }
  }, [breathePhase, isPlaying, isMuted]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      <Header title="Calming Mode" onBack={onBack} onHome={onHome} showHome />
      
      <main className="container px-6 py-8 flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
        {/* Ocean Animation Background */}
        <div className="relative w-full max-w-md mb-8">
          <div className="absolute inset-0 bg-gradient-to-b from-sky-200 via-blue-200 to-blue-400 rounded-3xl overflow-hidden">
            {/* Animated clouds */}
            <div className="absolute top-4 left-8 w-16 h-8 bg-white rounded-full opacity-80 animate-pulse" />
            <div className="absolute top-6 right-12 w-12 h-6 bg-white rounded-full opacity-60 animate-pulse" style={{ animationDelay: '1s' }} />
            
            {/* Sun */}
            <div className="absolute top-8 right-8 w-12 h-12 bg-yellow-300 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
            
            {/* Ocean waves */}
            <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-blue-500 to-blue-400">
              <div className="w-full h-4 bg-white opacity-40 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
              <div className="w-full h-3 bg-white opacity-30 rounded-full mt-2 animate-pulse" style={{ animationDelay: '1.5s' }} />
            </div>
          </div>
          
          {/* Breathing Circle */}
          <div className="relative z-10 flex items-center justify-center h-64">
            <div 
              className={`w-32 h-32 rounded-full bg-gradient-to-br from-accent/40 to-primary/40 border-4 border-white shadow-xl transition-all duration-4000 ease-in-out ${
                isPlaying 
                  ? breathePhase === 'in' 
                    ? 'scale-125' 
                    : 'scale-100'
                  : 'scale-110'
              }`}
            >
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-4xl">💙</span>
              </div>
            </div>
          </div>
        </div>

        {/* Breathing Instructions */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Take Deep Breaths
          </h2>
          
          {isPlaying && (
            <div className="bg-card rounded-2xl p-6 shadow-lg border-2 border-border">
              <p className="text-xl font-semibold text-muted-foreground">
                {breathePhase === 'in' ? '🌬️ Breathe In...' : '😌 Breathe Out...'}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Follow the circle and breathe slowly
              </p>
            </div>
          )}
          
          {!isPlaying && (
            <p className="text-lg text-muted-foreground">
              Press play to start your calming session
            </p>
          )}
        </div>

        {/* Control Buttons */}
        <div className="flex gap-4 mb-8">
          <Button
            variant={isPlaying ? "warning" : "success"}
            size="xl"
            onClick={handleTogglePlay}
            className="gap-3"
          >
            {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
            {isPlaying ? 'Pause' : 'Start'}
          </Button>
          
          <Button
            variant="outline"
            size="icon-lg"
            onClick={handleToggleMute}
            className={isMuted ? 'opacity-50' : ''}
          >
            {isMuted ? <VolumeX className="h-8 w-8" /> : <Volume2 className="h-8 w-8" />}
          </Button>
        </div>

        {/* Positive Affirmations */}
        <div className="bg-card rounded-3xl p-6 shadow-lg border-2 border-border max-w-md">
          <div className="text-center">
            <div className="text-4xl mb-4">🌟</div>
            <h3 className="text-lg font-bold text-foreground mb-2">
              You are doing great!
            </h3>
            <p className="text-muted-foreground">
              Take your time and breathe slowly. 
              You are safe and loved.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};