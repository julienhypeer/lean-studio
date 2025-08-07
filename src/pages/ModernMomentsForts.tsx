import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trophy, Medal } from 'lucide-react';
import TrophyCard from '../components/TrophyCard';

interface Trophy {
  id: string;
  project?: string;
  icon: string;
  title: string;
  description: string;
  rarity: 'bronze' | 'silver' | 'gold' | 'platinum';
  unlockDate?: string;
  progress?: number;
  category: string;
  detail: string;
}

export default function ModernTrophees() {
  const [selectedTrophy, setSelectedTrophy] = useState<Trophy | null>(null);

  // Trophées NoCodeur
  const nocodeurTrophies: Trophy[] = [
    {
      id: 'nc-first-launch',
      project: 'NoCodeur',
      icon: '🚀',
      title: 'First Launch',
      description: 'Lancer son premier projet no-code',
      detail: 'Mars 2021 - NoCodeur était né d\'une frustration personnelle',
      rarity: 'bronze',
      category: 'Milestone',
      unlockDate: '15 mars 2021'
    },
    {
      id: 'nc-first-client',
      project: 'NoCodeur',
      icon: '💰',
      title: 'First Euro',
      description: 'Premier client payant',
      detail: '25€ de Pierre L. pour un template Notion - Un moment magique',
      rarity: 'silver',
      category: 'Business',
      unlockDate: '2 avril 2021'
    },
    {
      id: 'nc-community',
      project: 'NoCodeur',
      icon: '👥',
      title: 'Community Builder',
      description: 'Atteindre 500+ membres actifs',
      detail: 'La communauté Discord a explosé grâce au contenu de qualité',
      rarity: 'gold',
      category: 'Growth',
      unlockDate: '12 octobre 2021'
    }
  ];

  // Trophées EcoDeliver
  const ecodeliverTrophies: Trophy[] = [
    {
      id: 'ed-pivot',
      project: 'EcoDeliver',
      icon: '🔄',
      title: 'The Pivot',
      description: 'Pivoter au bon moment',
      detail: 'De C2C à B2B : +300% de traction en 2 mois',
      rarity: 'gold',
      category: 'Strategy',
      unlockDate: '18 novembre 2020'
    },
    {
      id: 'ed-b2b-success',
      project: 'EcoDeliver',
      icon: '📈',
      title: 'B2B Breakthrough',
      description: 'Première grande entreprise cliente',
      detail: 'Contrat 15K€ avec Monoprix - Validation du modèle B2B',
      rarity: 'silver',
      category: 'Business',
      unlockDate: '5 décembre 2020'
    }
  ];

  // Trophées FitTracker
  const fittrackerTrophies: Trophy[] = [
    {
      id: 'ft-pmf',
      project: 'FitTracker Pro',
      icon: '🎯',
      title: 'Product-Market Fit',
      description: 'Atteindre le PMF',
      detail: 'Croissance organique : les clients recommandent sans qu\'on demande',
      rarity: 'gold',
      category: 'Milestone',
      unlockDate: '8 juin 2019'
    },
    {
      id: 'ft-exit',
      project: 'FitTracker Pro',
      icon: '💎',
      title: 'The Exit',
      description: 'Première acquisition réussie',
      detail: 'Vendu 450K€ à FitnessCorp - 18 mois de travail valorisés',
      rarity: 'platinum',
      category: 'Exit',
      unlockDate: '22 juillet 2020'
    }
  ];

  // Trophées LocalChef  
  const localchefTrophies: Trophy[] = [
    {
      id: 'lc-lesson',
      project: 'LocalChef',
      icon: '📚',
      title: 'Expensive Lesson',
      description: 'Apprendre de ses erreurs',
      detail: 'Unit economics défaillantes - 50K€ de leçon sur l\'importance des marges',
      rarity: 'bronze',
      category: 'Learning',
      unlockDate: '15 septembre 2020'
    }
  ];

  // Trophées Globaux
  const globalTrophies: Trophy[] = [
    {
      id: 'global-persistence',
      icon: '💪',
      title: 'Never Give Up',
      description: 'Persistance face aux obstacles',
      detail: 'Compte en banque : 127€. Loyer dans 5 jours. J\'ai persisté et NoCodeur a décollé',
      rarity: 'gold',
      category: 'Mindset',
      unlockDate: '3 février 2021'
    },
    {
      id: 'global-mentor',
      icon: '🤝',
      title: 'Right Mentor',
      description: 'Trouver le bon mentor',
      detail: 'Rencontre avec Marc Z., serial entrepreneur - Il m\'a ouvert son réseau',
      rarity: 'silver',
      category: 'Network',
      unlockDate: '20 janvier 2020'
    },
    {
      id: 'global-metrics',
      icon: '📊',
      title: 'Metrics Master',
      description: 'Maîtriser les bonnes métriques',
      detail: 'J\'ai arrêté de suivre les vanity metrics pour me concentrer sur CAC/LTV',
      rarity: 'bronze',
      category: 'Learning',
      unlockDate: '10 mai 2019'
    }
  ];

  const allTrophies = [
    { category: 'NoCodeur', trophies: nocodeurTrophies, icon: '🚀' },
    { category: 'EcoDeliver', trophies: ecodeliverTrophies, icon: '🌱' },
    { category: 'FitTracker Pro', trophies: fittrackerTrophies, icon: '💪' },
    { category: 'LocalChef', trophies: localchefTrophies, icon: '👨‍🍳' },
    { category: 'Trophées Globaux', trophies: globalTrophies, icon: '🌟' }
  ];

  const totalTrophies = allTrophies.reduce((acc, section) => acc + section.trophies.length, 0);
  const rarityCount = {
    bronze: 0,
    silver: 0,
    gold: 0,
    platinum: 0
  };
  
  allTrophies.forEach(section => {
    section.trophies.forEach(trophy => {
      rarityCount[trophy.rarity]++;
    });
  });

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl p-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-400/20 to-transparent rounded-full blur-2xl" />
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">🏆 Collection de Trophées</h1>
                <p className="text-slate-300">Victoires et apprentissages du parcours entrepreneurial</p>
              </div>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
              <div className="bg-white/10 backdrop-blur rounded-lg p-3 text-center">
                <div className="text-2xl font-bold">{totalTrophies}</div>
                <div className="text-xs text-slate-300 uppercase tracking-wider">Total</div>
              </div>
              <div className="bg-gradient-to-br from-amber-500/20 to-amber-600/20 backdrop-blur rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-amber-300">{rarityCount.bronze}</div>
                <div className="text-xs text-amber-200 uppercase tracking-wider">Bronze</div>
              </div>
              <div className="bg-gradient-to-br from-gray-400/20 to-gray-500/20 backdrop-blur rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-gray-300">{rarityCount.silver}</div>
                <div className="text-xs text-gray-200 uppercase tracking-wider">Argent</div>
              </div>
              <div className="bg-gradient-to-br from-yellow-400/20 to-yellow-500/20 backdrop-blur rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-yellow-300">{rarityCount.gold}</div>
                <div className="text-xs text-yellow-200 uppercase tracking-wider">Or</div>
              </div>
              <div className="bg-gradient-to-br from-purple-400/20 to-blue-500/20 backdrop-blur rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-purple-300">{rarityCount.platinum}</div>
                <div className="text-xs text-purple-200 uppercase tracking-wider">Platine</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Trophies Grid */}
      {allTrophies.map((section, sectionIndex) => (
        <div key={section.category} className="mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: sectionIndex * 0.1 }}
            className="flex items-center gap-3 mb-4 px-2"
          >
            <span className="text-2xl">{section.icon}</span>
            <h2 className="text-lg font-semibold text-slate-900">{section.category}</h2>
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-sm text-slate-500">{section.trophies.length} trophée{section.trophies.length > 1 ? 's' : ''}</span>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {section.trophies.map((trophy, index) => (
              <motion.div
                key={trophy.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: sectionIndex * 0.1 + index * 0.05 }}
              >
                <TrophyCard
                  trophy={trophy}
                  onClick={() => setSelectedTrophy(trophy)}
                />
              </motion.div>
            ))}
          </div>
        </div>
      ))}

      {/* Trophy Modal */}
      <AnimatePresence>
        {selectedTrophy && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedTrophy(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, rotateY: -15 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              exit={{ scale: 0.9, opacity: 0, rotateY: 15 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {selectedTrophy.rarity === 'platinum' && (
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-blue-500/10 animate-pulse" />
              )}
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${
                      selectedTrophy.rarity === 'bronze' ? 'from-amber-600 to-amber-800' :
                      selectedTrophy.rarity === 'silver' ? 'from-gray-400 to-gray-600' :
                      selectedTrophy.rarity === 'gold' ? 'from-yellow-400 to-yellow-600' :
                      'from-blue-400 to-purple-600'
                    } flex items-center justify-center relative overflow-hidden`}>
                      {selectedTrophy.rarity === 'platinum' && (
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 animate-pulse" />
                      )}
                      <span className="text-3xl relative z-10">{selectedTrophy.icon}</span>
                    </div>
                    <div>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium mb-1 ${
                        selectedTrophy.rarity === 'bronze' ? 'bg-amber-100 text-amber-700' :
                        selectedTrophy.rarity === 'silver' ? 'bg-gray-100 text-gray-700' :
                        selectedTrophy.rarity === 'gold' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-purple-100 text-purple-700'
                      }`}>
                        Trophée {selectedTrophy.rarity === 'bronze' ? 'Bronze' : 
                                selectedTrophy.rarity === 'silver' ? 'Argent' : 
                                selectedTrophy.rarity === 'gold' ? 'Or' : 'Platine'}
                      </div>
                      {selectedTrophy.project && (
                        <div className="text-xs text-slate-500">{selectedTrophy.project}</div>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedTrophy(null)}
                    className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
                  >
                    <X className="w-4 h-4 text-slate-600" />
                  </button>
                </div>
                
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  {selectedTrophy.title}
                </h3>
                
                <p className="text-sm text-slate-600 mb-4">
                  {selectedTrophy.description}
                </p>
                
                <div className="p-4 bg-slate-50 rounded-lg mb-4">
                  <p className="text-sm text-slate-700">
                    {selectedTrophy.detail}
                  </p>
                </div>

                {selectedTrophy.unlockDate && (
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Medal className="w-3 h-3" />
                    <span>Débloqué le {selectedTrophy.unlockDate}</span>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}