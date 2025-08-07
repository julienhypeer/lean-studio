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
      id: 'nc-launch',
      project: 'NoCodeur',
      icon: '🚀',
      title: 'Lancement',
      description: 'Lancer NoCodeur officellement',
      detail: 'Mars 2021 - Première plateforme française dédiée au no-code',
      rarity: 'bronze',
      category: 'Milestone',
      unlockDate: '15 mars 2021'
    },
    {
      id: 'nc-paying-client',
      project: 'NoCodeur',
      icon: '💰',
      title: 'Client payant',
      description: 'Premier client qui paie pour nos services',
      detail: '25€ pour un template Notion - Le premier euro gagné',
      rarity: 'bronze',
      category: 'Sales',
      unlockDate: '2 avril 2021'
    },
    {
      id: 'nc-first-online-sale',
      project: 'NoCodeur',
      icon: '🛒',
      title: '1ère vente en ligne',
      description: 'Première vente automatisée sur la plateforme',
      detail: 'Vente d\'une formation no-code à 49€ via Stripe',
      rarity: 'silver',
      category: 'Sales',
      unlockDate: '20 avril 2021'
    },
    {
      id: 'nc-logo-design',
      project: 'NoCodeur',
      icon: '🎨',
      title: 'Conception de logo',
      description: 'Design du logo NoCodeur',
      detail: 'Logo minimaliste conçu sur Figma - Identité visuelle créée',
      rarity: 'bronze',
      category: 'Product',
      unlockDate: '10 mars 2021'
    },
    {
      id: 'nc-mvp',
      project: 'NoCodeur',
      icon: '⚡',
      title: 'Création d\'un MVP',
      description: 'Premier MVP de la plateforme',
      detail: 'Site web avec 5 templates et système de paiement',
      rarity: 'silver',
      category: 'Product',
      unlockDate: '28 mars 2021'
    }
  ];

  // Trophées EcoDeliver
  const ecodeliverTrophies: Trophy[] = [
    {
      id: 'ed-launch',
      project: 'EcoDeliver',
      icon: '🚀',
      title: 'Lancement',
      description: 'Lancement d\'EcoDeliver',
      detail: 'Septembre 2020 - Plateforme de livraison éco-responsable',
      rarity: 'bronze',
      category: 'Milestone',
      unlockDate: '15 septembre 2020'
    },
    {
      id: 'ed-paying-client',
      project: 'EcoDeliver',
      icon: '💰',
      title: 'Client payant',
      description: 'Premier client payant',
      detail: 'Premier restaurateur qui adopte notre solution',
      rarity: 'bronze',
      category: 'Sales',
      unlockDate: '2 octobre 2020'
    },
    {
      id: 'ed-phone-sale',
      project: 'EcoDeliver',
      icon: '📞',
      title: '1ère vente au téléphone',
      description: 'Première vente en cold calling',
      detail: 'Contrat B2B signé après démonstration téléphonique',
      rarity: 'silver',
      category: 'Sales',
      unlockDate: '18 novembre 2020'
    },
    {
      id: 'ed-2k-sale',
      project: 'EcoDeliver',
      icon: '🎯',
      title: '1ère vente à 2 000€',
      description: 'Premier contrat à 4 chiffres',
      detail: 'Package premium avec Monoprix - Montée en gamme',
      rarity: 'gold',
      category: 'Sales',
      unlockDate: '5 décembre 2020'
    },
    {
      id: 'ed-lost-contract',
      project: 'EcoDeliver',
      icon: '💔',
      title: 'Contrat perdu',
      description: 'Perdre un gros contrat',
      detail: 'Carrefour nous a préféré un concurrent - Leçon d\'humilité',
      rarity: 'bronze',
      category: 'Learning',
      unlockDate: '20 janvier 2021'
    }
  ];

  // Trophées FitTracker Pro
  const fittrackerTrophies: Trophy[] = [
    {
      id: 'ft-launch',
      project: 'FitTracker Pro',
      icon: '🚀',
      title: 'Lancement',
      description: 'Lancement de FitTracker Pro',
      detail: 'Janvier 2019 - Application de suivi fitness avec IA',
      rarity: 'bronze',
      category: 'Milestone',
      unlockDate: '15 janvier 2019'
    },
    {
      id: 'ft-saas',
      project: 'FitTracker Pro',
      icon: '☁️',
      title: '1er SaaS',
      description: 'Premier modèle SaaS récurrent',
      detail: 'Abonnement mensuel à 9.99€ - Modèle économique validé',
      rarity: 'silver',
      category: 'Product',
      unlockDate: '20 février 2019'
    },
    {
      id: 'ft-10k-sale',
      project: 'FitTracker Pro',
      icon: '💎',
      title: '1ère vente à 10 000€',
      description: 'Contrat entreprise à 5 chiffres',
      detail: 'Licence entreprise pour Basic-Fit - 500 salles de sport',
      rarity: 'gold',
      category: 'Sales',
      unlockDate: '15 mai 2019'
    },
    {
      id: 'ft-international',
      project: 'FitTracker Pro',
      icon: '🌍',
      title: 'Commande à l\'étranger',
      description: 'Premier client international',
      detail: 'FitnessFirst UK adopte notre solution - Expansion européenne',
      rarity: 'gold',
      category: 'Sales',
      unlockDate: '8 juin 2019'
    },
    {
      id: 'ft-exit',
      project: 'FitTracker Pro',
      icon: '🏆',
      title: 'Vente de société',
      description: 'Acquisition réussie',
      detail: 'Vendu 450K€ à FitnessCorp - 18 mois de travail valorisés',
      rarity: 'platinum',
      category: 'Exit',
      unlockDate: '22 juillet 2020'
    }
  ];

  // Trophées LocalChef  
  const localchefTrophies: Trophy[] = [
    {
      id: 'lc-launch',
      project: 'LocalChef',
      icon: '🚀',
      title: 'Lancement',
      description: 'Lancement de LocalChef',
      detail: 'Mai 2020 - Marketplace de chefs à domicile',
      rarity: 'bronze',
      category: 'Milestone',
      unlockDate: '15 mai 2020'
    },
    {
      id: 'lc-paying-client',
      project: 'LocalChef',
      icon: '💰',
      title: 'Client payant',
      description: 'Premier chef qui paie sa commission',
      detail: 'Chef Marie, première à payer les 15% de commission',
      rarity: 'bronze',
      category: 'Sales',
      unlockDate: '25 mai 2020'
    },
    {
      id: 'lc-1k-sale',
      project: 'LocalChef',
      icon: '🍽️',
      title: '1ère vente à 1 000€',
      description: 'Premier dîner premium',
      detail: 'Dîner gastronomique pour 8 personnes - Chef étoilé',
      rarity: 'silver',
      category: 'Sales',
      unlockDate: '12 juin 2020'
    },
    {
      id: 'lc-photo-studio',
      project: 'LocalChef',
      icon: '📸',
      title: 'Photo studio',
      description: 'Shooting photo professionnel',
      detail: 'Séance photo des plats pour le marketing - Investment dans l\'image',
      rarity: 'bronze',
      category: 'Product',
      unlockDate: '1 juillet 2020'
    },
    {
      id: 'lc-client-departure',
      project: 'LocalChef',
      icon: '😢',
      title: 'Client qui part',
      description: 'Perdre un client important',
      detail: 'Chef Thomas quitte la plateforme - Concurrence déloyale',
      rarity: 'bronze',
      category: 'Learning',
      unlockDate: '15 septembre 2020'
    }
  ];

  // Trophées Globaux - Milestones financiers
  const globalTrophies: Trophy[] = [
    {
      id: 'global-3k-sale',
      icon: '🎖️',
      title: '1ère vente à 3 000€',
      description: 'Palier des 3K€',
      detail: 'NoCodeur - Package formation premium entreprise',
      rarity: 'gold',
      category: 'Financial',
      unlockDate: '15 juin 2021'
    },
    {
      id: 'global-4k-sale',
      icon: '🏅',
      title: '1ère vente à 4 000€',
      description: 'Palier des 4K€',
      detail: 'NoCodeur - Consulting + formation personnalisée',
      rarity: 'gold',
      category: 'Financial',
      unlockDate: '20 août 2021'
    },
    {
      id: 'global-100k',
      icon: '💯',
      title: '100k€',
      description: 'Premier palier à 6 chiffres',
      detail: 'Cumul de revenus sur tous les projets - Milestone symbolique',
      rarity: 'gold',
      category: 'Financial',
      unlockDate: '15 décembre 2021'
    },
    {
      id: 'global-negotiation',
      icon: '🤝',
      title: 'Négociation',
      description: 'Maîtriser l\'art de la négociation',
      detail: 'Négocier le contrat FitTracker avec FitnessCorp - +50% du prix initial',
      rarity: 'silver',
      category: 'Skill',
      unlockDate: '10 juillet 2020'
    },
    {
      id: 'global-bulk-order',
      icon: '📦',
      title: 'Commande en gros',
      description: 'Première grosse commande volume',
      detail: '50 licences FitTracker pour une chaîne de salles de sport',
      rarity: 'silver',
      category: 'Sales',
      unlockDate: '25 avril 2019'
    },
    {
      id: 'global-logo-creation',
      icon: '🎨',
      title: 'Création de logo',
      description: 'Développer son identité visuelle',
      detail: 'Création du logo Lean Studio - Cohérence sur tous les projets',
      rarity: 'bronze',
      category: 'Product',
      unlockDate: '5 janvier 2019'
    },
    {
      id: 'global-200k',
      icon: '💎',
      title: '200k€',
      description: 'Palier des 200K€',
      detail: 'Somme cumulée sur tous les projets - Expansion confirmée',
      rarity: 'gold',
      category: 'Financial',
      unlockDate: '15 juin 2022'
    },
    {
      id: 'global-300k',
      icon: '🏆',
      title: '300k€',
      description: 'Palier des 300K€',
      detail: 'Portfolio mature - Diversification réussie',
      rarity: 'gold',
      category: 'Financial',
      unlockDate: '20 septembre 2022'
    },
    {
      id: 'global-500k',
      icon: '👑',
      title: '500k€',
      description: 'Demi-million d\'euros',
      detail: 'Validation du modèle entrepreneurial - Expertise confirmée',
      rarity: 'platinum',
      category: 'Financial',
      unlockDate: '10 février 2023'
    },
    {
      id: 'global-1m',
      icon: '🌟',
      title: '1M€',
      description: 'Premier million d\'euros',
      detail: 'Milestone ultime - Entrepreneur accompli',
      rarity: 'platinum',
      category: 'Financial',
      unlockDate: '25 août 2023'
    }
  ];

  const allTrophies = [
    { category: 'NoCodeur', trophies: nocodeurTrophies, icon: '🚀' },
    { category: 'EcoDeliver', trophies: ecodeliverTrophies, icon: '🌱' },
    { category: 'FitTracker Pro', trophies: fittrackerTrophies, icon: '💪' },
    { category: 'LocalChef', trophies: localchefTrophies, icon: '👨‍🍳' },
    { category: 'Milestones Globaux', trophies: globalTrophies, icon: '🏆' }
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