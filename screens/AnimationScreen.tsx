import React, { useState, useEffect } from 'react';
import AgoraLayout from '../components/AgoraLayout';
import Button from '../components/ui/Button';
import { GameState, Scenario, ScenarioOption, BlockType } from '../types';
import { SCENARIOS, AVATARS } from '../constants';
import { MessageSquare, ShieldAlert, Zap, TrendingUp, Frown, Rocket, Briefcase, Cpu, ShieldCheck, Users, Clock } from 'lucide-react';

interface AnimationScreenProps {
  state: GameState;
  onUpdateState: (newState: GameState) => void;
  onFinish: () => void;
}

const AnimationScreen: React.FC<AnimationScreenProps> = ({ state, onUpdateState, onFinish }) => {
  const [currentScenario, setCurrentScenario] = useState<Scenario | null>(null);
  const [feedback, setFeedback] = useState<ScenarioOption | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const currentBlock = state.timeline[state.animationState.currentBlockIndex];
  const isLastBlock = state.animationState.currentBlockIndex === state.timeline.length - 1;

  // Effect to load scenario when block changes
  useEffect(() => {
    if (!currentBlock) return;
    
    // Simulate transition time
    setIsTransitioning(true);
    const timer = setTimeout(() => {
      // Find a scenario for this block type
      const scenarios = SCENARIOS[currentBlock.type];
      // Simple random pick for variety if multiple exist
      const scenario = scenarios ? scenarios[Math.floor(Math.random() * scenarios.length)] : null;
      
      setCurrentScenario(scenario);
      setIsTransitioning(false);
      setFeedback(null);
    }, 1500);

    return () => clearTimeout(timer);
  }, [state.animationState.currentBlockIndex]);

  const handleOptionSelect = (option: ScenarioOption) => {
    setFeedback(option);
    
    // Update metrics
    const newMetrics = {
      trust: Math.min(100, Math.max(0, state.animationState.metrics.trust + option.impact.trust)),
      clarity: Math.min(100, Math.max(0, state.animationState.metrics.clarity + option.impact.clarity)),
      caution: Math.min(100, Math.max(0, state.animationState.metrics.caution + option.impact.caution)),
      participation: Math.min(100, Math.max(0, state.animationState.metrics.participation + option.impact.participation)),
    };

    // Add to history
    const historyItem = {
      blockTitle: currentBlock.title,
      question: currentScenario?.triggerText || "",
      answer: option.text,
      feedback: option.feedback
    };

    onUpdateState({
      ...state,
      animationState: {
        ...state.animationState,
        metrics: newMetrics,
        history: [...state.animationState.history, historyItem]
      }
    });
  };

  const nextBlock = () => {
    if (isLastBlock) {
      onFinish();
    } else {
      onUpdateState({
        ...state,
        animationState: {
          ...state.animationState,
          currentBlockIndex: state.animationState.currentBlockIndex + 1
        }
      });
    }
  };

  const getAvatarIcon = (iconName: string) => {
    switch (iconName) {
      case 'frown': return <Frown className="w-full h-full p-2" />;
      case 'shield-alert': return <ShieldAlert className="w-full h-full p-2" />;
      case 'rocket': return <Rocket className="w-full h-full p-2" />;
      case 'briefcase': return <Briefcase className="w-full h-full p-2" />;
      case 'cpu': return <Cpu className="w-full h-full p-2" />;
      default: return <MessageSquare className="w-full h-full p-2" />;
    }
  };

  const currentAvatar = AVATARS.find(a => a.id === currentScenario?.avatarId);

  return (
    <AgoraLayout title="Phase 2 : Animation sur l'Agora">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full min-h-[500px]">
        
        {/* Left: Progress & Metrics */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Context Reminder (New) */}
          <div className="bg-stone-50 p-4 rounded-lg border border-stone-200 shadow-sm">
            <h3 className="font-serif font-bold text-xs text-stone-500 mb-3 uppercase tracking-wider">Votre Configuration</h3>
            <div className="space-y-2 text-sm text-stone-700">
               <div className="flex items-center gap-2">
                 <Users className="w-4 h-4 text-agora-blue" />
                 <span className="font-bold truncate" title={state.context.publicType || ''}>
                   {state.context.publicType || 'Public Inconnu'}
                 </span>
               </div>
               <div className="flex items-center gap-2">
                 <Clock className="w-4 h-4 text-agora-gold" />
                 <span>Objectif : {state.context.duration} min</span>
               </div>
            </div>
          </div>

          {/* Progression */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-stone-200">
            <h3 className="font-serif font-bold text-xs text-stone-500 mb-3 uppercase tracking-wider">Votre Scénario</h3>
            <div className="space-y-2 max-h-[200px] overflow-y-auto">
              {state.timeline.map((block, idx) => {
                const isCurrent = idx === state.animationState.currentBlockIndex;
                const isDone = idx < state.animationState.currentBlockIndex;
                return (
                  <div key={idx} className={`text-xs p-2 rounded flex items-center gap-2 transition-all ${
                    isCurrent ? 'bg-agora-blue text-white font-bold shadow-md scale-105' : 
                    isDone ? 'text-stone-400 line-through bg-stone-50' : 'text-stone-600 bg-white border border-stone-100'
                  }`}>
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${isCurrent ? 'bg-agora-gold' : 'bg-stone-300'}`} />
                    <span className="truncate">{block.title}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Gauges */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-stone-200">
             <h3 className="font-serif font-bold text-xs text-stone-500 mb-4 uppercase tracking-wider">Réaction du Public</h3>
             <div className="space-y-4">
                <MetricGauge label="Confiance" value={state.animationState.metrics.trust} color="bg-blue-500" icon={<ShieldCheck className="w-3 h-3"/>} />
                <MetricGauge label="Clarté" value={state.animationState.metrics.clarity} color="bg-yellow-500" icon={<Zap className="w-3 h-3"/>} />
                <MetricGauge label="Prudence" value={state.animationState.metrics.caution} color="bg-red-400" icon={<ShieldAlert className="w-3 h-3"/>} />
                <MetricGauge label="Participation" value={state.animationState.metrics.participation} color="bg-green-500" icon={<TrendingUp className="w-3 h-3"/>} />
             </div>
          </div>
        </div>

        {/* Center: The Stage (Agora) */}
        <div className="lg:col-span-9 flex flex-col relative bg-white rounded-xl shadow border border-stone-200 overflow-hidden">
           
           {/* Background Decoration */}
           <div className="absolute inset-0 z-0 opacity-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-agora-blue via-transparent to-transparent"></div>

           {/* Scene Content */}
           <div className="flex-grow relative z-10 flex flex-col items-center justify-center p-8">
              
              {isTransitioning ? (
                 <div className="text-center animate-pulse">
                    <h2 className="text-2xl font-serif font-bold text-stone-700 mb-2">{currentBlock?.title}</h2>
                    <p className="text-stone-500 italic">Vous prenez la parole...</p>
                 </div>
              ) : currentScenario ? (
                 <div className="w-full max-w-3xl flex flex-col gap-8">
                    
                    {/* Avatar Bubble */}
                    <div className="flex gap-4 items-start animate-slide-in">
                       <div className="flex-shrink-0 flex flex-col items-center gap-1">
                          <div className="w-16 h-16 bg-stone-100 rounded-full border-2 border-agora-gold text-stone-600 shadow-md">
                            {getAvatarIcon(currentAvatar?.icon || 'message-square')}
                          </div>
                          <span className="text-xs font-bold text-stone-600 bg-stone-100 px-2 py-0.5 rounded-full">{currentAvatar?.name}</span>
                       </div>
                       <div className="bg-stone-100 p-6 rounded-2xl rounded-tl-none shadow-sm border border-stone-200 text-lg text-stone-800 font-sans leading-relaxed relative">
                          <div className="absolute -left-2 top-6 w-4 h-4 bg-stone-100 transform rotate-45 border-l border-b border-stone-200"></div>
                          « {currentScenario.triggerText} »
                       </div>
                    </div>

                    {/* Choices or Feedback */}
                    {!feedback ? (
                       <div className="grid grid-cols-1 gap-3 pl-20 animate-fade-in">
                          {currentScenario.options.map(opt => (
                             <button
                                key={opt.id}
                                onClick={() => handleOptionSelect(opt)}
                                className="text-left p-4 rounded-lg border-2 border-stone-200 hover:border-agora-blue hover:bg-blue-50 transition-all text-stone-700 font-medium"
                             >
                                {opt.text}
                             </button>
                          ))}
                       </div>
                    ) : (
                       <div className="pl-20 animate-fade-in">
                          <div className="bg-agora-blue/5 border border-agora-blue/20 p-6 rounded-xl mb-6">
                             <h4 className="font-bold text-agora-blue mb-2 text-sm uppercase tracking-wide">Votre Réponse</h4>
                             <p className="text-stone-800 italic mb-4">"{feedback.text}"</p>
                             <div className="h-px bg-agora-blue/20 w-full mb-4"></div>
                             <h4 className="font-bold text-stone-500 mb-1 text-xs uppercase tracking-wide">Feedback</h4>
                             <p className="text-stone-700 font-bold">{feedback.feedback}</p>
                          </div>
                          <div className="flex justify-end">
                            <Button onClick={nextBlock}>
                               {isLastBlock ? "Terminer la séance" : "Continuer"}
                            </Button>
                          </div>
                       </div>
                    )}

                 </div>
              ) : (
                <div className="text-center">
                  <p className="text-stone-500">Bloc terminé. Passons à la suite.</p>
                  <Button onClick={nextBlock} className="mt-4">Continuer</Button>
                </div>
              )}
           </div>

        </div>
      </div>
    </AgoraLayout>
  );
};

const MetricGauge: React.FC<{ label: string; value: number; color: string; icon: React.ReactNode }> = ({ label, value, color, icon }) => (
  <div>
    <div className="flex justify-between items-center text-xs mb-1">
      <span className="font-bold text-stone-600 flex items-center gap-1">{icon} {label}</span>
      <span className="font-mono text-stone-400">{Math.round(value)}%</span>
    </div>
    <div className="h-2 w-full bg-stone-100 rounded-full overflow-hidden border border-stone-200">
      <div 
        className={`h-full transition-all duration-500 ${color}`} 
        style={{ width: `${value}%` }}
      />
    </div>
  </div>
);

export default AnimationScreen;