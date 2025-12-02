import React from 'react';
import { Landmark } from 'lucide-react';

interface AgoraLayoutProps {
  children: React.ReactNode;
  title?: string;
  showIcon?: boolean;
}

const AgoraLayout: React.FC<AgoraLayoutProps> = ({ children, title, showIcon = true }) => {
  return (
    <div className="min-h-screen bg-stone-100 text-stone-800 font-sans selection:bg-agora-gold selection:text-white flex flex-col">
      {/* Header / Frieze */}
      <header className="bg-stone-50 border-b-4 border-stone-200 py-4 shadow-sm relative overflow-hidden">
        {/* Decorative architectural pattern */}
        <div className="absolute top-0 left-0 w-full h-2 bg-agora-blue opacity-80"></div>
        <div className="container mx-auto px-4 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-3">
             {showIcon && <Landmark className="w-8 h-8 text-agora-blue" />}
             <h1 className="font-serif text-xl md:text-2xl font-bold text-stone-700 tracking-wide">
               {title || "Mission Accultur’Action"}
             </h1>
          </div>
          <div className="hidden md:flex gap-4 text-xs font-bold text-stone-400 uppercase tracking-widest">
            <span>Comprendre</span>
            <span>•</span>
            <span>Transmettre</span>
            <span>•</span>
            <span>Protéger</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow container mx-auto px-4 py-8 relative">
        {/* Pillars background effect (subtle) */}
        <div className="absolute top-0 left-10 h-full w-16 border-x border-stone-200/40 pointer-events-none hidden lg:block"></div>
        <div className="absolute top-0 right-10 h-full w-16 border-x border-stone-200/40 pointer-events-none hidden lg:block"></div>
        
        <div className="relative z-10 h-full">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-stone-200 py-6 text-center text-stone-500 text-sm font-serif border-t border-stone-300">
        <p>République Française • Référent IA • Jeu Sérieux</p>
      </footer>
    </div>
  );
};

export default AgoraLayout;