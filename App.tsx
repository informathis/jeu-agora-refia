import React, { useState } from 'react';
import { GameState, GamePhase } from './types';
import { INITIAL_METRICS } from './constants';
import HomeScreen from './screens/HomeScreen';
import PrepScreen from './screens/PrepScreen';
import AnimationScreen from './screens/AnimationScreen';
import SummaryScreen from './screens/SummaryScreen';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    phase: GamePhase.HOME,
    context: {
      publicType: null,
      level: null,
      duration: 60,
      selectedObjectives: []
    },
    timeline: [],
    animationState: {
      currentBlockIndex: 0,
      metrics: { ...INITIAL_METRICS },
      history: []
    },
    totalSessionsPlayed: 0
  });

  const startGame = () => {
    setGameState(prev => ({
      ...prev,
      phase: GamePhase.PREPARATION
    }));
  };

  const finishPrep = (context: GameState['context'], timeline: any[]) => {
    setGameState(prev => ({
      ...prev,
      context,
      timeline,
      phase: GamePhase.ANIMATION,
      animationState: {
        currentBlockIndex: 0,
        metrics: { ...INITIAL_METRICS },
        history: []
      }
    }));
  };

  const updateAnimationState = (newState: GameState) => {
    setGameState(newState);
  };

  const finishAnimation = () => {
    setGameState(prev => ({
      ...prev,
      phase: GamePhase.SUMMARY,
      totalSessionsPlayed: prev.totalSessionsPlayed + 1
    }));
  };

  const restartGame = () => {
    setGameState(prev => ({
      ...prev,
      phase: GamePhase.PREPARATION, // Skip Home on replay
      context: {
        publicType: null,
        level: null,
        duration: 60,
        selectedObjectives: []
      },
      timeline: []
    }));
  };

  return (
    <>
      {gameState.phase === GamePhase.HOME && (
        <HomeScreen onStart={startGame} />
      )}
      {gameState.phase === GamePhase.PREPARATION && (
        <PrepScreen onComplete={finishPrep} />
      )}
      {gameState.phase === GamePhase.ANIMATION && (
        <AnimationScreen 
          state={gameState} 
          onUpdateState={updateAnimationState}
          onFinish={finishAnimation}
        />
      )}
      {gameState.phase === GamePhase.SUMMARY && (
        <SummaryScreen state={gameState} onRestart={restartGame} />
      )}
    </>
  );
};

export default App;