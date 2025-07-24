import { useState } from "react";
import { ActivityCard } from "./ActivityCard";

// Example step-by-step activities inspired by your reference images
const shoesActivity = {
  title: "Putting On Shoes",
  steps: [
    {
      id: "1",
      image: "", // We'll use placeholder for now
      instruction: "Sit down on a chair",
      audioText: "First, find a comfortable chair and sit down"
    },
    {
      id: "2", 
      image: "",
      instruction: "Choose your shoes from the rack",
      audioText: "Look at the shoe rack and pick the shoes you want to wear"
    },
    {
      id: "3",
      image: "",
      instruction: "Put your foot in the shoe",
      audioText: "Gently put your foot inside the shoe"
    },
    {
      id: "4",
      image: "",
      instruction: "Tie the laces",
      audioText: "Now tie your shoelaces. Make a loop and pull it through"
    }
  ]
};

const toothBrushingActivity = {
  title: "Brushing Teeth",
  steps: [
    {
      id: "1",
      image: "",
      instruction: "Get your toothbrush and toothpaste",
      audioText: "Find your toothbrush and squeeze a small amount of toothpaste on it"
    },
    {
      id: "2",
      image: "",
      instruction: "Wet the toothbrush",
      audioText: "Turn on the water and wet your toothbrush"
    },
    {
      id: "3",
      image: "",
      instruction: "Brush your teeth gently",
      audioText: "Move the toothbrush in small circles on your teeth"
    },
    {
      id: "4",
      image: "",
      instruction: "Rinse your mouth",
      audioText: "Spit out the toothpaste and rinse your mouth with water"
    }
  ]
};

interface StepByStepActivityProps {
  activityType: 'shoes' | 'brushing' | 'eating';
  onComplete?: () => void;
}

export const StepByStepActivity = ({ 
  activityType, 
  onComplete 
}: StepByStepActivityProps) => {
  const [showActivity, setShowActivity] = useState(false);

  const handlePlayAudio = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1.1;
      utterance.volume = 1;
      
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

  const handleActivityComplete = () => {
    setShowActivity(false);
    onComplete?.();
  };

  const getActivity = () => {
    switch (activityType) {
      case 'shoes':
        return shoesActivity;
      case 'brushing':
        return toothBrushingActivity;
      default:
        return shoesActivity;
    }
  };

  if (!showActivity) {
    return (
      <div className="text-center">
        <div className="bg-card rounded-2xl p-6 shadow-lg border-2 border-border">
          <div className="text-4xl mb-4">
            {activityType === 'shoes' ? '👟' : activityType === 'brushing' ? '🦷' : '🍽️'}
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">
            {getActivity().title}
          </h3>
          <p className="text-muted-foreground mb-4">
            Learn step by step with pictures and sounds
          </p>
          <button
            onClick={() => setShowActivity(true)}
            className="bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold hover:bg-primary/90 transition-colors"
          >
            Start Activity
          </button>
        </div>
      </div>
    );
  }

  return (
    <ActivityCard
      title={getActivity().title}
      steps={getActivity().steps}
      onComplete={handleActivityComplete}
      onPlayAudio={handlePlayAudio}
    />
  );
};