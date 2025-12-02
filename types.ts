export enum GamePhase {
  HOME = 'HOME',
  PREPARATION = 'PREPARATION',
  ANIMATION = 'ANIMATION',
  SUMMARY = 'SUMMARY'
}

export enum PublicType {
  FRONT_OFFICE = 'Agents de Front Office',
  BACK_OFFICE = 'Agents de Back Office',
  MANAGERS = 'Encadrants / Chefs de service',
  TECH = 'Agents Techniques / DSI',
  HR = 'RH / Formation',
  DIRECTION = 'Direction Générale'
}

export enum FamiliarityLevel {
  NOVICE = 'Novice / Méfiant',
  CURIOUS = 'Curieux / Peu informé',
  ACCULTURATED = 'Acculturé / Exigeant'
}

export enum BlockType {
  ICEBREAKER = 'Brise-glace',
  QUIZ = 'Quiz Interactif',
  CONTENT = 'Exposé / Contenu',
  USE_CASE = 'Cas d’usage',
  DEBATE = 'Débat / Échange',
  RISKS = 'Risques & Vigilance',
  SYNTHESIS = 'Synthèse & Engagement',
  WORKSHOP = 'Atelier Pratique (Prompt)',
  DEMO = 'Démonstration (Outil Souverain)',
  BRAINSTORM = 'Brainstorming / Idéation',
  VIDEO = 'Vidéo / Témoignage'
}

export interface Objective {
  id: string;
  text: string;
}

export interface PedagogicalBlock {
  id: string;
  title: string;
  type: BlockType;
  duration: number; // minutes
  energy: 'Participatif' | 'Réflexif' | 'Informatif';
  description: string;
}

export interface ScenarioOption {
  id: string;
  text: string;
  feedback: string;
  impact: {
    trust: number;
    clarity: number;
    caution: number;
    participation: number;
  };
}

export interface Scenario {
  id: string;
  blockType: BlockType;
  avatarId: string; // References an Avatar
  triggerText: string; // What the avatar says/does
  options: ScenarioOption[];
}

export interface Avatar {
  id: string;
  name: string;
  archetype: 'Sceptique' | 'Enthousiaste' | 'Inquiet' | 'Pragmatique' | 'Technicien';
  icon: string; // Just a key for rendering
}

export interface GameState {
  phase: GamePhase;
  context: {
    publicType: PublicType | null;
    level: FamiliarityLevel | null;
    duration: number; // minutes target
    selectedObjectives: string[]; // ids
  };
  timeline: PedagogicalBlock[];
  animationState: {
    currentBlockIndex: number;
    metrics: {
      trust: number;
      clarity: number;
      caution: number;
      participation: number;
    };
    history: {
      blockTitle: string;
      question: string;
      answer: string;
      feedback: string;
    }[];
  };
  totalSessionsPlayed: number;
}