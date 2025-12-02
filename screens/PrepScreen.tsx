import React, { useState, useEffect } from 'react';
import AgoraLayout from '../components/AgoraLayout';
import Button from '../components/ui/Button';
import { PublicType, FamiliarityLevel, PedagogicalBlock, GameState, BlockType } from '../types';
import { BLOCKS, OBJECTIVES } from '../constants';
import { Clock, CheckCircle, Plus, Trash2, ArrowRight, AlertTriangle, Info } from 'lucide-react';

interface PrepScreenProps {
  onComplete: (context: GameState['context'], timeline: PedagogicalBlock[]) => void;
}

const PrepScreen: React.FC<PrepScreenProps> = ({ onComplete }) => {
  // Local State
  const [publicType, setPublicType] = useState<PublicType>(PublicType.FRONT_OFFICE);
  const [level, setLevel] = useState<FamiliarityLevel>(FamiliarityLevel.NOVICE);
  const [duration, setDuration] = useState<number>(60);
  const [selectedObjectives, setSelectedObjectives] = useState<string[]>([]);
  const [timeline, setTimeline] = useState<PedagogicalBlock[]>([]);

  // Derived State
  const currentDuration = timeline.reduce((acc, block) => acc + block.duration, 0);
  const durationStatus = currentDuration > duration + 10 ? 'over' : currentDuration < duration - 10 ? 'under' : 'ok';
  
  const toggleObjective = (id: string) => {
    if (selectedObjectives.includes(id)) {
      setSelectedObjectives(prev => prev.filter(o => o !== id));
    } else {
      if (selectedObjectives.length < 3) {
        setSelectedObjectives(prev => [...prev, id]);
      }
    }
  };

  const addToTimeline = (block: PedagogicalBlock) => {
    setTimeline(prev => [...prev, { ...block, id: `${block.id}_${Date.now()}` }]); // Unique ID for key
  };

  const removeFromTimeline = (index: number) => {
    setTimeline(prev => prev.filter((_, i) => i !== index));
  };

  const validate = () => {
    if (timeline.length === 0) return;
    onComplete(
      { publicType, level, duration, selectedObjectives },
      timeline
    );
  };

  return (
    <AgoraLayout title="Phase 1 : Conception de la séance">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
        
        {/* Left Panel: Context & Library */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Context Card */}
          <div className="bg-white p-5 rounded-lg shadow-sm border border-stone-200">
            <h3 className="font-serif font-bold text-lg text-agora-blue mb-4 flex items-center gap-2">
              <Info className="w-5 h-5" /> Contexte
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-stone-600 mb-1">Public Cible</label>
                <select 
                  className="w-full p-2 border border-stone-300 rounded bg-stone-50"
                  value={publicType}
                  onChange={(e) => setPublicType(e.target.value as PublicType)}
                >
                  {Object.values(PublicType).map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-bold text-stone-600 mb-1">Niveau</label>
                  <select 
                    className="w-full p-2 border border-stone-300 rounded bg-stone-50"
                    value={level}
                    onChange={(e) => setLevel(e.target.value as FamiliarityLevel)}
                  >
                    {Object.values(FamiliarityLevel).map(l => <option key={l} value={l}>{l}</option>)}
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-bold text-stone-600 mb-1">Durée cible</label>
                  <select 
                    className="w-full p-2 border border-stone-300 rounded bg-stone-50"
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                  >
                    <option value={30}>30 min</option>
                    <option value={45}>45 min</option>
                    <option value={60}>1h 00</option>
                    <option value={90}>1h 30</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-stone-600 mb-2">Objectifs (max 3)</label>
                <div className="space-y-2">
                  {OBJECTIVES.map(obj => (
                    <div 
                      key={obj.id}
                      onClick={() => toggleObjective(obj.id)}
                      className={`cursor-pointer p-2 rounded border text-sm flex items-center gap-2 transition-colors ${
                        selectedObjectives.includes(obj.id) 
                          ? 'bg-agora-blue/10 border-agora-blue text-agora-blue' 
                          : 'bg-white border-stone-200 hover:bg-stone-50'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        selectedObjectives.includes(obj.id) ? 'bg-agora-blue border-agora-blue' : 'border-stone-300'
                      }`}>
                        {selectedObjectives.includes(obj.id) && <CheckCircle className="w-3 h-3 text-white" />}
                      </div>
                      {obj.text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Library of Blocks */}
          <div className="bg-white p-5 rounded-lg shadow-sm border border-stone-200">
            <h3 className="font-serif font-bold text-lg text-agora-blue mb-4">Bibliothèque</h3>
            <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
              {BLOCKS.map(block => (
                <div 
                  key={block.id} 
                  className="p-3 border border-stone-200 rounded hover:border-agora-gold hover:shadow-md cursor-pointer bg-stone-50 group transition-all"
                  onClick={() => addToTimeline(block)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-bold text-stone-800 text-sm block">{block.title}</span>
                      <span className="text-xs text-stone-500">{block.description}</span>
                    </div>
                    <button className="text-agora-blue opacity-0 group-hover:opacity-100 transition-opacity">
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="mt-2 flex gap-2 text-xs">
                    <span className="bg-stone-200 px-2 py-0.5 rounded flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {block.duration} min
                    </span>
                    <span className={`px-2 py-0.5 rounded ${
                      block.energy === 'Participatif' ? 'bg-green-100 text-green-800' :
                      block.energy === 'Réflexif' ? 'bg-purple-100 text-purple-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {block.energy}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Panel: Timeline Builder */}
        <div className="lg:col-span-7 flex flex-col h-full">
          <div className="bg-stone-50 border-2 border-dashed border-stone-300 rounded-xl p-6 flex-grow flex flex-col relative">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-serif font-bold text-stone-700">Votre Déroulé</h2>
              <div className={`text-sm font-bold px-3 py-1 rounded-full flex items-center gap-2 ${
                durationStatus === 'ok' ? 'bg-green-100 text-green-700' : 
                durationStatus === 'over' ? 'bg-red-100 text-red-700' : 
                'bg-yellow-100 text-yellow-700'
              }`}>
                <Clock className="w-4 h-4" />
                {currentDuration} / {duration} min
                {durationStatus === 'over' && <AlertTriangle className="w-4 h-4" />}
              </div>
            </div>

            {timeline.length === 0 ? (
              <div className="flex-grow flex flex-col items-center justify-center text-stone-400">
                <p className="mb-2">Votre frise temporelle est vide.</p>
                <p className="text-sm">Cliquez sur les blocs à gauche pour les ajouter.</p>
              </div>
            ) : (
              <div className="space-y-3 overflow-y-auto flex-grow pr-2">
                {timeline.map((block, idx) => (
                  <div key={idx} className="bg-white p-4 rounded shadow-sm border-l-4 border-l-agora-blue flex items-center justify-between animate-slide-in">
                    <div className="flex items-center gap-4">
                      <div className="bg-stone-100 w-8 h-8 rounded-full flex items-center justify-center font-bold text-stone-500">
                        {idx + 1}
                      </div>
                      <div>
                        <div className="font-bold text-stone-800">{block.title}</div>
                        <div className="text-xs text-stone-500 flex gap-2">
                          <span>{block.duration} min</span> • <span>{block.energy}</span>
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => removeFromTimeline(idx)}
                      className="text-stone-400 hover:text-red-500 p-2"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            
            <div className="mt-6 pt-4 border-t border-stone-200">
              <Button 
                fullWidth 
                disabled={timeline.length === 0} 
                onClick={validate}
              >
                Lancer la Séance <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AgoraLayout>
  );
};

export default PrepScreen;