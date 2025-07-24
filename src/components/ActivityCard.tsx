import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Volume2, ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";

interface ActivityStep {
  id: string;
  image: string;
  instruction: string;
  audioText?: string;
}

interface ActivityCardProps {
  title: string;
  steps: ActivityStep[];
  onComplete?: () => void;
  onPlayAudio?: (text: string) => void;
}

export const ActivityCard = ({ 
  title, 
  steps, 
  onComplete, 
  onPlayAudio 
}: ActivityCardProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState(false);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setCompleted(true);
      onComplete?.();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setCompleted(false);
  };

  const handlePlayAudio = () => {
    const step = steps[currentStep];
    const text = step?.audioText || step?.instruction || title;
    onPlayAudio?.(text);
  };

  if (completed) {
    return (
      <div className="bg-card rounded-3xl p-8 shadow-xl border-2 border-success max-w-md mx-auto">
        <div className="text-center">
          <div className="text-6xl mb-4">🌟</div>
          <h3 className="text-2xl font-bold text-success mb-4">
            Great Job!
          </h3>
          <p className="text-muted-foreground mb-6">
            You completed the "{title}" activity!
          </p>
          
          <Button
            variant="secondary"
            size="lg"
            onClick={handleRestart}
            className="gap-3"
          >
            <RotateCcw className="h-6 w-6" />
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  const step = steps[currentStep];
  
  return (
    <div className="bg-card rounded-3xl p-8 shadow-xl border-2 border-border max-w-md mx-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">{title}</h2>
        <div className="flex justify-center gap-2 mb-4">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentStep 
                  ? 'bg-primary' 
                  : index < currentStep 
                    ? 'bg-success' 
                    : 'bg-muted'
              }`}
            />
          ))}
        </div>
        <p className="text-sm text-muted-foreground">
          Step {currentStep + 1} of {steps.length}
        </p>
      </div>

      {/* Step Content */}
      <div className="text-center mb-8">
        {/* Step Image */}
        <div className="relative w-48 h-48 mx-auto mb-6 bg-muted rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10" />
          {step?.image && (
            <img
              src={step.image}
              alt={step.instruction}
              className="w-full h-full object-cover"
            />
          )}
          {!step?.image && (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-6xl">📋</span>
            </div>
          )}
        </div>

        {/* Step Instruction */}
        <h3 className="text-xl font-bold text-foreground mb-4">
          {step?.instruction || "Follow the steps"}
        </h3>

        {/* Audio Button */}
        <Button
          variant="warning"
          size="lg"
          onClick={handlePlayAudio}
          className="gap-3 mb-6"
        >
          <Volume2 className="h-6 w-6" />
          Read to Me
        </Button>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          size="icon-lg"
          onClick={handlePrev}
          disabled={currentStep === 0}
          className="disabled:opacity-30"
        >
          <ChevronLeft className="h-8 w-8" />
        </Button>

        <Button
          variant={currentStep === steps.length - 1 ? "success" : "default"}
          size="lg"
          onClick={handleNext}
          className="px-8"
        >
          {currentStep === steps.length - 1 ? "Finish! 🎉" : "Next Step"}
          {currentStep < steps.length - 1 && <ChevronRight className="h-6 w-6 ml-2" />}
        </Button>
      </div>
    </div>
  );
};