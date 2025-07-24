import { useState, useEffect } from "react";
import { FlashCard } from "@/components/FlashCard";
import { Header } from "@/components/Header";
import appleImg from "@/assets/apple.png";
import catImg from "@/assets/cat.png";
import sunImg from "@/assets/sun.png";

interface FlashCardData {
  id: string;
  image: string;
  text: string;
  audioText?: string;
}

const defaultCards: FlashCardData[] = [
  {
    id: "1",
    image: appleImg,
    text: "Apple",
    audioText: "Apple - A-P-P-L-E"
  },
  {
    id: "2", 
    image: catImg,
    text: "Cat",
    audioText: "Cat - C-A-T"
  },
  {
    id: "3",
    image: sunImg,
    text: "Sun", 
    audioText: "Sun - S-U-N"
  }
];

interface FlashcardsScreenProps {
  onBack: () => void;
  onHome: () => void;
}

export const FlashcardsScreen = ({ onBack, onHome }: FlashcardsScreenProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cards] = useState<FlashCardData[]>(defaultCards);

  const handleNext = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handlePlayAudio = (text: string) => {
    // Use Web Speech API for text-to-speech
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8; // Slower speech for better comprehension
      utterance.pitch = 1.2; // Higher pitch for kid-friendly voice
      utterance.volume = 1;
      
      // Try to use a child-friendly voice if available
      const voices = speechSynthesis.getVoices();
      const kidVoice = voices.find(voice => 
        voice.name.includes('Google UK English Female') || 
        voice.name.includes('Female') ||
        voice.lang.includes('en')
      );
      
      if (kidVoice) {
        utterance.voice = kidVoice;
      }
      
      speechSynthesis.speak(utterance);
    }
  };

  // Load voices on component mount
  useEffect(() => {
    if ('speechSynthesis' in window) {
      speechSynthesis.getVoices();
    }
  }, []);

  if (cards.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header title="Flashcards" onBack={onBack} onHome={onHome} showHome />
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-xl text-muted-foreground">No flashcards available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header title="Flashcards" onBack={onBack} onHome={onHome} showHome />
      
      <main className="container px-6 py-8">
        <div className="text-center mb-6">
          <p className="text-lg text-muted-foreground">
            Card {currentIndex + 1} of {cards.length}
          </p>
        </div>

        <FlashCard
          card={cards[currentIndex]}
          onNext={handleNext}
          onPrev={handlePrev}
          hasNext={currentIndex < cards.length - 1}
          hasPrev={currentIndex > 0}
          onPlayAudio={handlePlayAudio}
        />

        <div className="flex justify-center mt-8">
          <div className="flex gap-2">
            {cards.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex 
                    ? 'bg-primary' 
                    : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};