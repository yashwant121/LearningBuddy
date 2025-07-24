import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Volume2, ChevronLeft, ChevronRight } from "lucide-react";

interface FlashCardData {
  id: string;
  image: string;
  text: string;
  audioText?: string;
}

interface FlashCardProps {
  card: FlashCardData;
  onNext: () => void;
  onPrev: () => void;
  hasNext: boolean;
  hasPrev: boolean;
  onPlayAudio: (text: string) => void;
}

export const FlashCard = ({ 
  card, 
  onNext, 
  onPrev, 
  hasNext, 
  hasPrev, 
  onPlayAudio 
}: FlashCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handlePlayAudio = () => {
    onPlayAudio(card.audioText || card.text);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-6">
      {/* Navigation buttons */}
      <div className="flex justify-between w-full max-w-md mb-6">
        <Button
          variant="outline"
          size="icon-lg"
          onClick={onPrev}
          disabled={!hasPrev}
          className="disabled:opacity-30"
        >
          <ChevronLeft className="h-8 w-8" />
        </Button>
        
        <Button
          variant="outline"
          size="icon-lg"
          onClick={onNext}
          disabled={!hasNext}
          className="disabled:opacity-30"
        >
          <ChevronRight className="h-8 w-8" />
        </Button>
      </div>

      {/* Flashcard */}
      <div className="bg-card rounded-3xl shadow-xl p-8 max-w-sm w-full border-2 border-border">
        <div className="flex flex-col items-center space-y-6">
          {/* Image */}
          <div className="relative w-48 h-48 flex items-center justify-center">
            {!imageLoaded && (
              <div className="absolute inset-0 bg-muted animate-pulse rounded-2xl" />
            )}
            <img
              src={card.image}
              alt={card.text}
              className={`w-full h-full object-contain rounded-2xl transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageLoaded(true)}
            />
          </div>

          {/* Text */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {card.text}
            </h2>
            
            {/* Audio button */}
            <Button
              variant="warning"
              size="lg"
              onClick={handlePlayAudio}
              className="gap-3"
            >
              <Volume2 className="h-6 w-6" />
              Say It
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};