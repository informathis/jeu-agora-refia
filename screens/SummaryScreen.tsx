import React from 'react';
import AgoraLayout from '../components/AgoraLayout';
import Button from '../components/ui/Button';
import { GameState } from '../types';
import { Award, RefreshCcw, BookOpen } from 'lucide-react';

interface SummaryScreenProps {
  state: GameState;
  onRestart: () => void;
}

const SummaryScreen: React.FC<SummaryScreenProps> = ({ state, onRestart }) => {
  const metrics = state.animationState.metrics;
  const averageScore = Math.round((metrics.trust + metrics.clarity + metrics.caution + metrics.participation) / 4);

  let title = "Débutant de l'Agora";
  let description = "Une première tentative honorable. L'acculturation demande du temps.";
  if (averageScore > 60) {
    title = "Pédagogue Averti";
    description = "Vous savez tenir une audience et transmettre des messages clés.";
  }
  if (averageScore > 80) {
    title = "Philosophe Éclairé";
    description = "Excellente maîtrise ! La cité est plus sage grâce à vous.";
  }

  // Generate actionable advice based on lowest metric
  const getAdvice = () => {
    const entries = Object.entries(metrics);
    const lowest = entries.reduce((prev, curr) => prev[1] < curr[1] ? prev : curr);
    
    switch(lowest[0]) {
      case 'trust': return "Travaillez votre empathie face aux peurs. Ne balayez pas les craintes d'un revers de main.";
      case 'clarity': return "Attention au jargon technique. Utilisez plus de métaphores et d'exemples concrets.";
      case 'caution': return "N'oubliez pas le cadre légal et éthique (RGPD, biais). L'IA n'est pas magique.";
      case 'participation': return "Posez plus de questions ouvertes. L'acculturation se fait par le dialogue, pas le monologue.";
      default: return "Continuez à pratiquer !";
    }
  };

  return (
    <AgoraLayout title="Bilan de la séance">
      <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
        
        {/* Header Score */}
        <div className="bg-white rounded-xl shadow-lg border-t-4 border-agora-gold p-8 text-center">
          <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-stone-200">
            <Award className="w-10 h-10 text-agora-gold" />
          </div>
          <h2 className="text-3xl font-serif font-bold text-stone-800 mb-2">{title}</h2>
          <p className="text-stone-600 mb-6">{description}</p>
          
          <div className="text-6xl font-serif font-bold text-agora-blue mb-2">{averageScore}/100</div>
          <p className="text-xs text-stone-400 uppercase tracking-widest">Score Global</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Detailed Metrics */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-200">
            <h3 className="font-serif font-bold text-lg mb-4 text-stone-700">Vos Piliers</h3>
            <div className="space-y-4">
              <ResultBar label="Confiance du public" value={metrics.trust} />
              <ResultBar label="Clarté du discours" value={metrics.clarity} />
              <ResultBar label="Prudence / Éthique" value={metrics.caution} />
              <ResultBar label="Engagement" value={metrics.participation} />
            </div>
          </div>

          {/* Qualitative Feedback */}
          <div className="bg-stone-50 p-6 rounded-lg shadow-inner border border-stone-200">
            <h3 className="font-serif font-bold text-lg mb-4 text-stone-700 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-agora-blue" /> Le Conseil du Sage
            </h3>
            <p className="text-stone-700 italic leading-relaxed mb-4">
              "{getAdvice()}"
            </p>
            <div className="bg-white p-4 rounded border border-stone-200 text-sm">
              <strong className="block mb-2 text-stone-800">Points à retenir pour ce public ({state.context.publicType}) :</strong>
              <ul className="list-disc list-inside space-y-1 text-stone-600">
                 <li>Ne pas survendre la technologie.</li>
                 <li>Toujours lier l'IA aux tâches quotidiennes réelles.</li>
                 <li>Rappeler que l'humain garde la décision finale.</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center pt-8">
          <Button onClick={onRestart} size="lg" className="px-12">
            <RefreshCcw className="w-5 h-5" /> Animer une nouvelle séance
          </Button>
        </div>

      </div>
    </AgoraLayout>
  );
};

const ResultBar: React.FC<{ label: string; value: number }> = ({ label, value }) => (
  <div>
    <div className="flex justify-between text-sm mb-1">
      <span className="font-bold text-stone-600">{label}</span>
      <span className="font-mono text-stone-500">{Math.round(value)}%</span>
    </div>
    <div className="h-3 w-full bg-stone-200 rounded-full overflow-hidden">
      <div 
        className={`h-full ${value < 40 ? 'bg-red-400' : value < 70 ? 'bg-yellow-400' : 'bg-green-500'}`} 
        style={{ width: `${value}%` }}
      />
    </div>
  </div>
);

export default SummaryScreen;