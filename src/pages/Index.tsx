import { useState } from "react";
import { HomeScreen } from "./HomeScreen";
import { ScheduleScreen } from "./ScheduleScreen";
import { FlashcardsScreen } from "./FlashcardsScreen";
import { MatchingGameScreen } from "./MatchingGameScreen";
import { CalmingModeScreen } from "./CalmingModeScreen";

type Screen = 'home' | 'schedule' | 'flashcards' | 'game' | 'calming' | 'settings';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');

  const navigateToScreen = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const navigateHome = () => {
    setCurrentScreen('home');
  };

  const navigateBack = () => {
    setCurrentScreen('home');
  };

  switch (currentScreen) {
    case 'schedule':
      return <ScheduleScreen onBack={navigateBack} onHome={navigateHome} />;
    
    case 'flashcards':
      return <FlashcardsScreen onBack={navigateBack} onHome={navigateHome} />;
    
    case 'game':
      return <MatchingGameScreen onBack={navigateBack} onHome={navigateHome} />;
    
    case 'calming':
      return <CalmingModeScreen onBack={navigateBack} onHome={navigateHome} />;
    
    case 'settings':
      // For now, redirect to home - we can add a settings screen later
      return <HomeScreen onNavigate={navigateToScreen} />;
    
    default:
      return <HomeScreen onNavigate={navigateToScreen} />;
  }
};

export default Index;
