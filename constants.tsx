import { BlockType, Objective, PedagogicalBlock, PublicType, Scenario, Avatar, FamiliarityLevel } from './types';

export const OBJECTIVES: Objective[] = [
  { id: 'obj_understand', text: "Comprendre ce qu'est (et n'est pas) l'IA" },
  { id: 'obj_usecase', text: "Identifier des cas d'usage concrets métier" },
  { id: 'obj_risks', text: "Prendre conscience des risques (RGPD, biais)" },
  { id: 'obj_role', text: "Connaître le rôle du référent IA et les ressources" },
  { id: 'obj_myths', text: "Démystifier les fantasmes (remplacement, magie)" },
  { id: 'obj_prompt', text: "S'initier à l'art du prompt (rédaction de commandes)" },
  { id: 'obj_sobriety', text: "Intégrer la sobriété numérique dans les usages IA" },
  { id: 'obj_rules', text: "Définir une charte d'équipe pour l'usage de l'IA" },
];

export const BLOCKS: PedagogicalBlock[] = [
  { 
    id: 'blk_icebreaker', 
    title: "Brise-glace : 'Pour vous, l'IA c'est...'", 
    type: BlockType.ICEBREAKER, 
    duration: 10, 
    energy: 'Participatif',
    description: "Un tour de table rapide pour recueillir les représentations initiales."
  },
  { 
    id: 'blk_quiz', 
    title: "Quiz : Info ou Intox ?", 
    type: BlockType.QUIZ, 
    duration: 15, 
    energy: 'Participatif',
    description: "5 questions ludiques pour casser les idées reçues."
  },
  { 
    id: 'blk_def', 
    title: "Exposé : L'IA expliquée simplement", 
    type: BlockType.CONTENT, 
    duration: 15, 
    energy: 'Informatif',
    description: "Définitions clés : Machine Learning, IA générative, Algorithme."
  },
  { 
    id: 'blk_demo_albert', 
    title: "Démonstration : L'IA de l'État (Albert)", 
    type: BlockType.DEMO, 
    duration: 20, 
    energy: 'Informatif',
    description: "Présentation de l'outil souverain développé par la DINUM."
  },
  { 
    id: 'blk_workshop_prompt', 
    title: "Atelier : Mon premier prompt", 
    type: BlockType.WORKSHOP, 
    duration: 30, 
    energy: 'Participatif',
    description: "Exercice pratique : rédiger une demande claire à l'IA."
  },
  { 
    id: 'blk_brainstorm', 
    title: "Brainstorming : Où l'IA peut-elle nous aider ?", 
    type: BlockType.BRAINSTORM, 
    duration: 25, 
    energy: 'Participatif',
    description: "Idéation collective sur les tâches répétitives du service."
  },
  { 
    id: 'blk_usecase_front', 
    title: "Cas d'usage : Relations Usagers", 
    type: BlockType.USE_CASE, 
    duration: 20, 
    energy: 'Réflexif',
    description: "Analyse d'un chatbot ou d'un outil de tri automatique de mails."
  },
  { 
    id: 'blk_usecase_back', 
    title: "Cas d'usage : Automatisation de tâches", 
    type: BlockType.USE_CASE, 
    duration: 20, 
    energy: 'Réflexif',
    description: "Démonstration d'aide à la rédaction ou synthèse de documents."
  },
  { 
    id: 'blk_video', 
    title: "Vidéo : Témoignage d'un autre service", 
    type: BlockType.VIDEO, 
    duration: 10, 
    energy: 'Informatif',
    description: "Retour d'expérience concret d'une administration pionnière."
  },
  { 
    id: 'blk_debate', 
    title: "Débat : L'IA remplace-t-elle l'humain ?", 
    type: BlockType.DEBATE, 
    duration: 25, 
    energy: 'Participatif',
    description: "Discussion ouverte sur la complémentarité agent/IA."
  },
  { 
    id: 'blk_risks', 
    title: "Focus : Éthique & Vigilance", 
    type: BlockType.RISKS, 
    duration: 15, 
    energy: 'Informatif',
    description: "RGPD, Biais, Hallucinations, Confidentialité des données."
  },
  { 
    id: 'blk_synth', 
    title: "Synthèse & Feuille de route", 
    type: BlockType.SYNTHESIS, 
    duration: 10, 
    energy: 'Informatif',
    description: "Récapitulatif des points clés et prochaines étapes."
  }
];

export const AVATARS: Avatar[] = [
  { id: 'avt_sceptic', name: 'M. Sceptique', archetype: 'Sceptique', icon: 'frown' },
  { id: 'avt_worry', name: 'Mme Inquiète', archetype: 'Inquiet', icon: 'shield-alert' },
  { id: 'avt_fan', name: 'M. Enthousiaste', archetype: 'Enthousiaste', icon: 'rocket' },
  { id: 'avt_prag', name: 'Mme Pragmatique', archetype: 'Pragmatique', icon: 'briefcase' },
  { id: 'avt_tech', name: 'Le Technicien', archetype: 'Technicien', icon: 'cpu' },
];

export const SCENARIOS: Record<BlockType, Scenario[]> = {
  [BlockType.ICEBREAKER]: [
    {
      id: 'scn_ice_1',
      blockType: BlockType.ICEBREAKER,
      avatarId: 'avt_sceptic',
      triggerText: "Pour moi, l'IA, c'est surtout un effet de mode. Dans 6 mois, on n'en parle plus, comme le Métavers.",
      options: [
        {
          id: 'opt_ice_1_a',
          text: "C'est possible, mais en attendant, il faut bien qu'on s'y forme car la direction le demande.",
          feedback: "Réponse un peu fataliste. Vous manquez l'occasion de montrer l'utilité réelle.",
          impact: { trust: -10, clarity: 0, caution: 0, participation: -10 }
        },
        {
          id: 'opt_ice_1_b',
          text: "Détrompez-vous, les modèles mathématiques derrière existent depuis 50 ans. Ce qui change, c'est la puissance de calcul accessible.",
          feedback: "Bonne réponse factuelle. Cela pose les bases sans être agressif.",
          impact: { trust: 10, clarity: 15, caution: 0, participation: 5 }
        },
        {
          id: 'opt_ice_1_c',
          text: "Vous avez tort, c'est une révolution industrielle majeure, il ne faut pas rater le train !",
          feedback: "Trop péremptoire. Vous risquez de braquer les sceptiques.",
          impact: { trust: -5, clarity: 5, caution: -5, participation: 10 }
        }
      ]
    }
  ],
  [BlockType.QUIZ]: [
    {
      id: 'scn_quiz_1',
      blockType: BlockType.QUIZ,
      avatarId: 'avt_fan',
      triggerText: "Moi j'utilise ChatGPT pour rédiger tous les comptes-rendus de réunion avec des données sensibles, c'est génial non ?",
      options: [
        {
          id: 'opt_quiz_1_a',
          text: "Super initiative ! C'est exactement ce qu'il faut faire pour gagner du temps.",
          feedback: "Attention ! Vous validez une fuite de données potentielle. C'est dangereux.",
          impact: { trust: 5, clarity: -10, caution: -30, participation: 10 }
        },
        {
          id: 'opt_quiz_1_b',
          text: "Attention ! Les outils publics gratuits réutilisent vos données. Pour des données sensibles, c'est interdit.",
          feedback: "Réponse responsable et claire. Essentielle pour un référent IA.",
          impact: { trust: 10, clarity: 10, caution: 20, participation: 0 }
        },
        {
          id: 'opt_quiz_1_c',
          text: "L'IA générative hallucine souvent, relisez bien vos textes.",
          feedback: "Vrai, mais hors sujet par rapport au risque de confidentialité soulevé.",
          impact: { trust: 0, clarity: 5, caution: 5, participation: 0 }
        }
      ]
    }
  ],
  [BlockType.CONTENT]: [
    {
      id: 'scn_cont_1',
      blockType: BlockType.CONTENT,
      avatarId: 'avt_worry',
      triggerText: "Je ne comprends rien à 'Machine Learning' vs 'IA Générative'. C'est du jargon d'ingénieur.",
      options: [
        {
          id: 'opt_cont_1_a',
          text: "Le Machine Learning c'est des stats, l'IA générative c'est des Transformers.",
          feedback: "Trop technique. Vous avez perdu une partie de l'auditoire.",
          impact: { trust: -5, clarity: -15, caution: 0, participation: -5 }
        },
        {
          id: 'opt_cont_1_b',
          text: "Imaginez : le Machine Learning classe des infos (comme trier le courrier), l'IA Générative crée du contenu (comme écrire une réponse).",
          feedback: "Excellente métaphore, simple et liée au métier.",
          impact: { trust: 10, clarity: 20, caution: 0, participation: 10 }
        },
        {
          id: 'opt_cont_1_c',
          text: "Ce n'est pas grave si vous ne comprenez pas tout, l'important c'est de savoir utiliser l'outil.",
          feedback: "Un peu infantilisant. L'acculturation demande un minimum de compréhension.",
          impact: { trust: -5, clarity: -5, caution: 0, participation: -5 }
        }
      ]
    }
  ],
  [BlockType.DEMO]: [
    {
      id: 'scn_demo_1',
      blockType: BlockType.DEMO,
      avatarId: 'avt_prag',
      triggerText: "C'est bien gentil votre Albert, mais est-ce que c'est aussi puissant que le ChatGPT américain ?",
      options: [
        {
          id: 'opt_demo_1_a',
          text: "Honnêtement non, c'est moins bien, mais on est obligés de l'utiliser.",
          feedback: "Défaitiste. Vous dévalorisez l'outil avant même qu'ils ne l'aient testé.",
          impact: { trust: -10, clarity: 0, caution: 0, participation: -5 }
        },
        {
          id: 'opt_demo_1_b',
          text: "Pour les tâches administratives (résumés, traductions), il est très performant et surtout, vos données restent en France.",
          feedback: "Excellent argumentaire : on valorise l'usage spécifique et la souveraineté.",
          impact: { trust: 15, clarity: 10, caution: 15, participation: 5 }
        },
        {
          id: 'opt_demo_1_c',
          text: "On s'en fiche de la puissance, c'est la sécurité qui compte avant tout.",
          feedback: "Un peu dogmatique. L'agent cherche de l'efficacité.",
          impact: { trust: -5, clarity: 0, caution: 10, participation: -5 }
        }
      ]
    }
  ],
  [BlockType.WORKSHOP]: [
    {
      id: 'scn_work_1',
      blockType: BlockType.WORKSHOP,
      avatarId: 'avt_worry',
      triggerText: "J'ai essayé de lui demander un résumé, mais il m'a sorti n'importe quoi. C'est nul cet outil, ça ne marche pas.",
      options: [
        {
          id: 'opt_work_1_a',
          text: "C'est parce que vous ne savez pas lui parler. Il faut être précis dans la demande.",
          feedback: "Vrai sur le fond, mais culpabilisant sur la forme. L'agent risque de se braquer.",
          impact: { trust: -10, clarity: 5, caution: 0, participation: -10 }
        },
        {
          id: 'opt_work_1_b',
          text: "C'est normal au début ! L'IA a besoin de contexte, de rôle et de format. Essayons d'améliorer votre 'prompt' ensemble.",
          feedback: "Pédagogique et encourageant. Vous transformez un échec en opportunité d'apprentissage.",
          impact: { trust: 15, clarity: 15, caution: 0, participation: 15 }
        },
        {
          id: 'opt_work_1_c',
          text: "Utilisez plutôt le modèle payant, il est beaucoup plus intelligent.",
          feedback: "Mauvais conseil : problème de coût, d'accès et de sécurité potentielle.",
          impact: { trust: 0, clarity: 0, caution: -10, participation: 0 }
        }
      ]
    }
  ],
  [BlockType.BRAINSTORM]: [
    {
      id: 'scn_brain_1',
      blockType: BlockType.BRAINSTORM,
      avatarId: 'avt_fan',
      triggerText: "On pourrait l'utiliser pour surveiller les horaires d'arrivée des collègues via les logs ! Ça serait super efficace.",
      options: [
        {
          id: 'opt_brain_1_a',
          text: "Techniquement c'est faisable, on peut regarder.",
          feedback: "Alerte ! Vous ne mettez aucune barrière éthique. C'est inacceptable.",
          impact: { trust: -20, clarity: 0, caution: -30, participation: 5 }
        },
        {
          id: 'opt_brain_1_b',
          text: "Stop ! L'IA ne doit jamais servir à la surveillance des agents. C'est interdit par notre charte et contraire à nos valeurs.",
          feedback: "Rappel à l'ordre ferme et nécessaire. Le rôle du référent est aussi de poser des limites.",
          impact: { trust: 10, clarity: 10, caution: 25, participation: -5 }
        },
        {
          id: 'opt_brain_1_c',
          text: "Pourquoi pas, mais attention à ce que diront les syndicats.",
          feedback: "Cynique. On ne rejette pas l'idée pour des raisons éthiques mais politiques.",
          impact: { trust: -10, clarity: 0, caution: -5, participation: 0 }
        }
      ]
    }
  ],
  [BlockType.USE_CASE]: [
    {
      id: 'scn_use_1',
      blockType: BlockType.USE_CASE,
      avatarId: 'avt_prag',
      triggerText: "Concrètement, dans mon service où on traite des dossiers d'allocations, ça sert à quoi ?",
      options: [
        {
          id: 'opt_use_1_a',
          text: "Ça pourrait pré-analyser les pièces jointes pour vérifier si elles sont complètes, vous gagnerez un temps précieux.",
          feedback: "Exemple pertinent et valorisant pour l'agent (gain de temps, pas remplacement).",
          impact: { trust: 15, clarity: 10, caution: 0, participation: 15 }
        },
        {
          id: 'opt_use_1_b',
          text: "L'IA pourrait décider automatiquement de l'octroi de l'allocation.",
          feedback: "Dangereux ! La décision automatisée sans humain est très encadrée et souvent mal perçue.",
          impact: { trust: -10, clarity: 5, caution: -15, participation: 10 }
        },
        {
          id: 'opt_use_1_c',
          text: "Il y a plein d'outils, on verra au cas par cas.",
          feedback: "Trop vague. Le public attend du concret.",
          impact: { trust: -5, clarity: -10, caution: 0, participation: -5 }
        }
      ]
    }
  ],
  [BlockType.VIDEO]: [
    {
      id: 'scn_vid_1',
      blockType: BlockType.VIDEO,
      avatarId: 'avt_worry',
      triggerText: "Dans la vidéo, ils ont l'air tous d'accord. Mais chez nous, les vieux PC rament déjà pour ouvrir Outlook, alors l'IA...",
      options: [
        {
          id: 'opt_vid_1_a',
          text: "La plupart des outils IA tournent dans le cloud, donc la puissance de votre PC importe peu.",
          feedback: "Information technique rassurante qui lève un frein matériel.",
          impact: { trust: 10, clarity: 15, caution: 0, participation: 5 }
        },
        {
          id: 'opt_vid_1_b',
          text: "Il faudra demander du budget à la DSI pour changer le parc.",
          feedback: "Vous bottez en touche. L'agent se sent impuissant.",
          impact: { trust: 0, clarity: 0, caution: 0, participation: -10 }
        },
        {
          id: 'opt_vid_1_c',
          text: "C'est sûr, on n'a pas les mêmes moyens qu'eux, il faudra faire avec.",
          feedback: "Vous validez la négativité ambiante. Pas très motivant.",
          impact: { trust: -5, clarity: 0, caution: 0, participation: -5 }
        }
      ]
    }
  ],
  [BlockType.DEBATE]: [
    {
      id: 'scn_deb_1',
      blockType: BlockType.DEBATE,
      avatarId: 'avt_worry',
      triggerText: "À terme, on va tous être remplacés par des machines, c'est évident. L'administration veut réduire les effectifs.",
      options: [
        {
          id: 'opt_deb_1_a',
          text: "C'est une peur légitime. Mais l'IA ne remplace pas l'empathie, le jugement complexe et la responsabilité. Elle vous 'augmente'.",
          feedback: "Réponse empathique et rassurante qui recentre sur la valeur ajoutée humaine.",
          impact: { trust: 20, clarity: 10, caution: 0, participation: 10 }
        },
        {
          id: 'opt_deb_1_b',
          text: "Non, c'est faux. Suivant !",
          feedback: "Brutal. Vous fermez le débat sans traiter l'angoisse.",
          impact: { trust: -20, clarity: 0, caution: 0, participation: -20 }
        },
        {
          id: 'opt_deb_1_c',
          text: "L'histoire montre que la technologie crée plus d'emplois qu'elle n'en détruit.",
          feedback: "Argument intellectuel valide mais qui peut sembler froid et distant sur le terrain.",
          impact: { trust: 0, clarity: 5, caution: 0, participation: 5 }
        }
      ]
    }
  ],
  [BlockType.RISKS]: [
    {
      id: 'scn_risk_1',
      blockType: BlockType.RISKS,
      avatarId: 'avt_tech',
      triggerText: "Les modèles 'open weights' qu'on peut héberger nous-mêmes, c'est quand même mieux pour la souveraineté, non ?",
      options: [
        {
          id: 'opt_risk_1_a',
          text: "Tout à fait. Pour des données sensibles, on privilégiera des solutions souveraines comme Albert ou des modèles locaux.",
          feedback: "Excellente réponse technique et conforme à la doctrine de l'État.",
          impact: { trust: 15, clarity: 10, caution: 20, participation: 5 }
        },
        {
          id: 'opt_risk_1_b',
          text: "C'est trop compliqué à mettre en place, autant utiliser les API américaines.",
          feedback: "Mauvaise réponse stratégique pour un référent IA public.",
          impact: { trust: -10, clarity: 0, caution: -20, participation: 0 }
        },
        {
          id: 'opt_risk_1_c',
          text: "Je ne sais pas, je ne suis pas technicien.",
          feedback: "Honnête, mais un référent doit avoir quelques notions sur la souveraineté.",
          impact: { trust: -5, clarity: 0, caution: 0, participation: 0 }
        }
      ]
    }
  ],
  [BlockType.SYNTHESIS]: [
    {
      id: 'scn_syn_1',
      blockType: BlockType.SYNTHESIS,
      avatarId: 'avt_prag',
      triggerText: "Ok, c'était intéressant. Mais demain matin, je fais quoi ?",
      options: [
        {
          id: 'opt_syn_1_a',
          text: "Attendez que la direction vous envoie une note de service.",
          feedback: "Passif. L'objectif est d'acculturer et d'engager.",
          impact: { trust: -5, clarity: 0, caution: 0, participation: -10 }
        },
        {
          id: 'opt_syn_1_b',
          text: "Je vous envoie le support. N'hésitez pas à tester l'outil souverain 'Albert' si vous avez un accès, et contactez-moi pour toute idée.",
          feedback: "Actionnable, ouvert et proactif. Une bonne conclusion.",
          impact: { trust: 15, clarity: 10, caution: 0, participation: 20 }
        },
        {
          id: 'opt_syn_1_c',
          text: "Formez-vous sur Internet le soir.",
          feedback: "Peu réaliste et renvoie la charge sur l'agent.",
          impact: { trust: -10, clarity: 0, caution: 0, participation: -5 }
        }
      ]
    }
  ]
};

export const INITIAL_METRICS = {
  trust: 50,
  clarity: 50,
  caution: 50,
  participation: 50
};