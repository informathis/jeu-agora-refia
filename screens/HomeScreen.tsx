import React, { useState } from 'react';
import AgoraLayout from '../components/AgoraLayout';
import Button from '../components/ui/Button';
import { Scroll, Sparkles, Users, HelpCircle, X } from 'lucide-react';

interface HomeScreenProps {
  onStart: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onStart }) => {
  const [showRules, setShowRules] = useState(false);

  return (
    <AgoraLayout>
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center max-w-2xl mx-auto space-y-8 animate-fade-in">
        
        {/* Hero Symbol */}
        <div className="w-24 h-24 bg-stone-200 rounded-full flex items-center justify-center border-4 border-stone-300 shadow-inner">
          <Sparkles className="w-12 h-12 text-agora-gold" />
        </div>

        <div className="space-y-4">
          <h2 className="text-4xl md:text-5xl font-serif text-stone-800 font-bold leading-tight">
            L'Agora du Référent IA
          </h2>
          <p className="text-lg md:text-xl text-stone-600 font-sans leading-relaxed">
            Incarnez un référent IA dans l'administration. Votre mission : concevoir et animer des sessions de sensibilisation pour acculturer vos collègues, répondre à leurs doutes et construire une vision commune.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Button onClick={onStart} className="text-lg px-10 py-4">
            Entrer sur l'Agora
          </Button>
          <Button variant="outline" onClick={() => setShowRules(true)}>
            <HelpCircle className="w-5 h-5" /> Comment jouer ?
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 w-full text-left">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-200">
            <Scroll className="w-8 h-8 text-agora-blue mb-4" />
            <h3 className="font-serif font-bold text-lg mb-2">Concevoir</h3>
            <p className="text-stone-600 text-sm">Préparez votre déroulé pédagogique adapté à votre public (Débutants, Experts, Direction...).</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-200">
            <Users className="w-8 h-8 text-agora-gold mb-4" />
            <h3 className="font-serif font-bold text-lg mb-2">Animer</h3>
            <p className="text-stone-600 text-sm">Répondez aux questions et objections des agents dans un simulateur de dialogue.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-200">
            <Sparkles className="w-8 h-8 text-agora-clay mb-4" />
            <h3 className="font-serif font-bold text-lg mb-2">Convaincre</h3>
            <p className="text-stone-600 text-sm">Gagnez la confiance de votre auditoire en tenant un discours nuancé et responsable.</p>
          </div>
        </div>

        {/* Modal Rules */}
        {showRules && (
          <div className="fixed inset-0 bg-stone-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white max-w-lg w-full rounded-xl shadow-2xl p-8 relative">
              <button 
                onClick={() => setShowRules(false)}
                className="absolute top-4 right-4 text-stone-400 hover:text-stone-600"
              >
                <X className="w-6 h-6" />
              </button>
              <h3 className="text-2xl font-serif font-bold mb-4 text-agora-blue">Règles du jeu</h3>
              <div className="space-y-4 text-stone-700 font-sans text-left">
                <p><strong>1. Préparation :</strong> Vous choisissez un public et des objectifs. Assemblez les briques pédagogiques (Quiz, Débat, Exposé...) pour créer une séance cohérente.</p>
                <p><strong>2. Animation :</strong> La séance commence. Des avatars vous interpellent. À chaque étape, choisissez la meilleure réponse pour rassurer, expliquer et engager.</p>
                <p><strong>3. Score :</strong> Votre performance est évaluée sur 4 axes : Confiance, Clarté, Prudence et Participation.</p>
                <div className="bg-stone-100 p-4 rounded border border-stone-200 mt-4 text-sm italic text-stone-600">
                  "Le but n'est pas de vendre l'IA à tout prix, mais d'éclairer la cité sur ses usages et ses limites."
                </div>
              </div>
              <div className="mt-8 text-center">
                <Button onClick={() => setShowRules(false)} fullWidth>Compris</Button>
              </div>
            </div>
          </div>
        )}

      </div>
    </AgoraLayout>
  );
};

export default HomeScreen;