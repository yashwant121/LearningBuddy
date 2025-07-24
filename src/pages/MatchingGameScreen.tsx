import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import appleImg from "@/assets/apple.png";
import catImg from "@/assets/cat.png";
import sunImg from "@/assets/sun.png";

interface GameCard {
  id: string;
  image: string;
  name: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const gameImages = [
  { id: "apple", image: appleImg, name: "Apple" },
  { id: "cat", image: catImg, name: "Cat" },
  { id: "sun", image: sunImg, name: "Sun" }
];

interface MatchingGameScreenProps {
  onBack: () => void;
  onHome: () => void;
}

export const MatchingGameScreen = ({ onBack, onHome }: MatchingGameScreenProps) => {
  const [cards, setCards] = useState<GameCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<string[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);

  // Initialize game
  const initializeGame = () => {
    const gameCards: GameCard[] = [];
    
    // Create pairs of cards
    gameImages.forEach((img, index) => {
      // First card of the pair
      gameCards.push({
        id: `${img.id}-1`,
        image: img.image,
        name: img.name,
        isFlipped: false,
        isMatched: false
      });
      
      // Second card of the pair  
      gameCards.push({
        id: `${img.id}-2`,
        image: img.image,
        name: img.name,
        isFlipped: false,
        isMatched: false
      });
    });

    // Shuffle cards
    const shuffledCards = gameCards.sort(() => Math.random() - 0.5);
    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedPairs([]);
    setScore(0);
    setAttempts(0);
  };

  // Handle card click
  const handleCardClick = (cardId: string) => {
    if (flippedCards.length >= 2) return;
    
    const card = cards.find(c => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched) return;

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    // Update card state
    setCards(prev => prev.map(c => 
      c.id === cardId ? { ...c, isFlipped: true } : c
    ));

    // Check for match when two cards are flipped
    if (newFlippedCards.length === 2) {
      const [firstCardId, secondCardId] = newFlippedCards;
      const firstCard = cards.find(c => c.id === firstCardId);
      const secondCard = cards.find(c => c.id === secondCardId);

      setAttempts(prev => prev + 1);

      if (firstCard && secondCard && firstCard.name === secondCard.name) {
        // Match found!
        setTimeout(() => {
          setMatchedPairs(prev => [...prev, firstCard.name]);
          setCards(prev => prev.map(c => 
            c.name === firstCard.name ? { ...c, isMatched: true } : c
          ));
          setFlippedCards([]);
          setScore(prev => prev + 10);
          
          // Play success sound (if available)
          playMatchSound();
        }, 1000);
      } else {
        // No match - flip cards back
        setTimeout(() => {
          setCards(prev => prev.map(c => 
            newFlippedCards.includes(c.id) ? { ...c, isFlipped: false } : c
          ));
          setFlippedCards([]);
        }, 1500);
      }
    }
  };

  const playMatchSound = () => {
    // Simple audio feedback using Web Audio API
    if ('AudioContext' in window) {
      const audioContext = new AudioContext();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
      oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
      oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // G5

      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    }
  };

  // Initialize game on component mount
  useEffect(() => {
    initializeGame();
  }, []);

  const isGameComplete = matchedPairs.length === gameImages.length;
  const accuracy = attempts > 0 ? Math.round((matchedPairs.length / attempts) * 100) : 0;

  return (
    <div className="min-h-screen bg-background">
      <Header title="Matching Game" onBack={onBack} onHome={onHome} showHome />
      
      <main className="container px-6 py-8">
        {/* Score Section */}
        <div className="bg-card rounded-3xl p-6 mb-8 shadow-lg border-2 border-border">
          <div className="flex justify-between items-center text-center">
            <div>
              <p className="text-sm text-muted-foreground">Score</p>
              <p className="text-2xl font-bold text-success">{score}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Pairs Found</p>
              <p className="text-2xl font-bold text-primary">
                {matchedPairs.length}/{gameImages.length}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Attempts</p>
              <p className="text-2xl font-bold text-foreground">{attempts}</p>
            </div>
          </div>
        </div>

        {/* Game Complete Message */}
        {isGameComplete && (
          <div className="text-center mb-8 p-6 bg-success/10 rounded-3xl border-2 border-success">
            <div className="text-6xl mb-4">🏆</div>
            <h3 className="text-2xl font-bold text-success mb-2">
              Congratulations!
            </h3>
            <p className="text-muted-foreground">
              You found all the pairs! Accuracy: {accuracy}%
            </p>
          </div>
        )}

        {/* Game Grid */}
        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-8">
          {cards.map((card) => (
            <div
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className={`aspect-square bg-card rounded-2xl border-2 shadow-lg cursor-pointer transition-all duration-300 hover:scale-105 ${
                card.isFlipped || card.isMatched
                  ? 'border-primary'
                  : 'border-border hover:border-primary/50'
              } ${
                card.isMatched ? 'animate-pulse-glow' : ''
              }`}
            >
              <div className="w-full h-full flex items-center justify-center p-4">
                {card.isFlipped || card.isMatched ? (
                  <img
                    src={card.image}
                    alt={card.name}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-game/20 rounded-xl flex items-center justify-center">
                    <span className="text-4xl">❓</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Restart Button */}
        <div className="flex justify-center">
          <Button
            variant="warning"
            size="lg"
            onClick={initializeGame}
            className="gap-3"
          >
            <RefreshCw className="h-6 w-6" />
            New Game
          </Button>
        </div>

        {/* Instructions */}
        <div className="text-center mt-8 text-muted-foreground">
          <p>Tap cards to flip them and find matching pairs!</p>
        </div>
      </main>
    </div>
  );
};