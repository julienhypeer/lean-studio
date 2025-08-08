import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trophy, Medal } from 'lucide-react';

interface Trophy {
  id: string;
  icon: string;
  title: string;
  description: string;
  rarity: 'bronze' | 'silver' | 'gold' | 'platinum';
  category: string;
  detail: string;
}

export default function ModernTrophees() {
  const [selectedTrophy, setSelectedTrophy] = useState<Trophy | null>(null);

  // Tous les trophées regroupés par rareté
  const bronzeTrophies: Trophy[] = [
    {
      id: 'launch-1',
      icon: '🚀',
      title: 'Lancement',
      description: 'Lancer un projet officiellement',
      detail: 'Premier lancement d\'un projet - L\'aventure commence',
      rarity: 'bronze',
      category: 'Milestone'
    },
    {
      id: 'paying-client-1',
      icon: '💰',
      title: 'Client payant',
      description: 'Premier client qui paie pour nos services',
      detail: '25€ pour un template - Le premier euro gagné',
      rarity: 'bronze',
      category: 'Sales'
    },
    {
      id: 'logo-design',
      icon: '🎨',
      title: 'Conception de logo',
      description: 'Design d\'un logo professionnel',
      detail: 'Logo minimaliste conçu sur Figma - Identité visuelle créée',
      rarity: 'bronze',
      category: 'Product'
    },
    {
      id: 'photo-studio',
      icon: '📸',
      title: 'Photo studio',
      description: 'Shooting photo professionnel',
      detail: 'Séance photo des produits pour le marketing',
      rarity: 'bronze',
      category: 'Product'
    },
    {
      id: 'client-departure',
      icon: '😢',
      title: 'Client qui part',
      description: 'Perdre un client important',
      detail: 'Premier client perdu - Leçon importante apprise',
      rarity: 'bronze',
      category: 'Learning'
    },
    {
      id: 'logo-creation',
      icon: '🎨',
      title: 'Création de logo',
      description: 'Développer son identité visuelle',
      detail: 'Création du logo principal - Cohérence visuelle établie',
      rarity: 'bronze',
      category: 'Product'
    }
  ];

  const silverTrophies: Trophy[] = [
    {
      id: 'first-online-sale',
      icon: '🛒',
      title: '1ère vente en ligne',
      description: 'Première vente automatisée sur la plateforme',
      detail: 'Vente d\'une formation à 49€ via Stripe',
      rarity: 'silver',
      category: 'Sales'
    },
    {
      id: 'mvp',
      icon: '⚡',
      title: 'Création d\'un MVP',
      description: 'Premier MVP fonctionnel',
      detail: 'Site web avec système de paiement intégré',
      rarity: 'silver',
      category: 'Product'
    },
    {
      id: 'mobile-app',
      icon: '📱',
      title: 'Application mobile',
      description: 'Lancement de l\'app mobile',
      detail: 'Application disponible sur iOS et Android',
      rarity: 'silver',
      category: 'Product'
    },
    {
      id: '1k-sale',
      icon: '💎',
      title: '1ère vente à 1 000€',
      description: 'Premier contrat à 4 chiffres',
      detail: 'Service premium vendu à un client entreprise',
      rarity: 'silver',
      category: 'Sales'
    },
    {
      id: 'negotiation',
      icon: '🤝',
      title: 'Négociation',
      description: 'Maîtriser l\'art de la négociation',
      detail: 'Négocier un contrat avec +50% du prix initial',
      rarity: 'silver',
      category: 'Skill'
    },
    {
      id: 'bulk-sale',
      icon: '📦',
      title: 'Vente en lot',
      description: 'Première vente groupée',
      detail: '50 licences vendues à une chaîne',
      rarity: 'silver',
      category: 'Sales'
    }
  ];

  const goldTrophies: Trophy[] = [
    {
      id: '3k-sale',
      icon: '🎖️',
      title: '1ère vente à 3 000€',
      description: 'Palier des 3K€',
      detail: 'Package formation premium entreprise',
      rarity: 'gold',
      category: 'Financial'
    },
    {
      id: '4k-sale',
      icon: '🏅',
      title: '1ère vente à 4 000€',
      description: 'Palier des 4K€',
      detail: 'Consulting + formation personnalisée',
      rarity: 'gold',
      category: 'Financial'
    },
    {
      id: '100k',
      icon: '💯',
      title: '100k€',
      description: 'Premier palier à 6 chiffres',
      detail: 'Cumul de revenus - Milestone symbolique',
      rarity: 'gold',
      category: 'Financial'
    },
    {
      id: '200k',
      icon: '💎',
      title: '200k€',
      description: 'Palier des 200K€',
      detail: 'Expansion confirmée du portfolio',
      rarity: 'gold',
      category: 'Financial'
    },
    {
      id: '300k',
      icon: '🏆',
      title: '300k€',
      description: 'Palier des 300K€',
      detail: 'Portfolio mature - Diversification réussie',
      rarity: 'gold',
      category: 'Financial'
    }
  ];

  const platinumTrophies: Trophy[] = [
    {
      id: '500k',
      icon: '👑',
      title: '500k€',
      description: 'Demi-million d\'euros',
      detail: 'Validation du modèle entrepreneurial',
      rarity: 'platinum',
      category: 'Financial'
    },
    {
      id: '1m',
      icon: '🌟',
      title: '1M€',
      description: 'Premier million d\'euros',
      detail: 'Milestone ultime - Entrepreneur accompli',
      rarity: 'platinum',
      category: 'Financial'
    }
  ];

  // Regroupement par matériaux
  const trophyGroups = [
    { 
      title: 'Bronze', 
      trophies: bronzeTrophies, 
      color: 'from-orange-600 to-orange-800',
      bgColor: 'bg-gradient-to-br from-orange-50 to-orange-100',
      borderColor: 'border-orange-300'
    },
    { 
      title: 'Argent', 
      trophies: silverTrophies, 
      color: 'from-gray-400 to-gray-600',
      bgColor: 'bg-gradient-to-br from-gray-50 to-gray-100',
      borderColor: 'border-gray-300'
    },
    { 
      title: 'Or', 
      trophies: goldTrophies, 
      color: 'from-yellow-400 to-yellow-600',
      bgColor: 'bg-gradient-to-br from-yellow-50 to-yellow-100',
      borderColor: 'border-yellow-300'
    },
    { 
      title: 'Platine', 
      trophies: platinumTrophies, 
      color: 'from-purple-400 to-purple-600',
      bgColor: 'bg-gradient-to-br from-purple-50 to-purple-100',
      borderColor: 'border-purple-300'
    }
  ];

  const totalTrophies = bronzeTrophies.length + silverTrophies.length + goldTrophies.length + platinumTrophies.length;

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 sm:mb-8"
      >
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl p-4 sm:p-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-400/20 to-transparent rounded-full blur-2xl" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 sm:gap-4 mb-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center">
                <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">🏆 Collection de Trophées</h1>
                <p className="text-sm sm:text-base text-slate-300">Victoires et apprentissages du parcours entrepreneurial</p>
              </div>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4">
              <div className="bg-white/10 backdrop-blur rounded-lg p-3">
                <p className="text-2xl sm:text-3xl font-bold">{totalTrophies}</p>
                <p className="text-xs sm:text-sm text-slate-300">Total</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-3">
                <p className="text-2xl sm:text-3xl font-bold text-orange-400">{bronzeTrophies.length}</p>
                <p className="text-xs sm:text-sm text-slate-300">Bronze</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-3">
                <p className="text-2xl sm:text-3xl font-bold text-gray-400">{silverTrophies.length}</p>
                <p className="text-xs sm:text-sm text-slate-300">Argent</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-3">
                <p className="text-2xl sm:text-3xl font-bold text-yellow-400">{goldTrophies.length}</p>
                <p className="text-xs sm:text-sm text-slate-300">Or</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-3">
                <p className="text-2xl sm:text-3xl font-bold text-purple-400">{platinumTrophies.length}</p>
                <p className="text-xs sm:text-sm text-slate-300">Platine</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Trophy Groups by Material */}
      {trophyGroups.map((group, groupIndex) => (
        <motion.section 
          key={group.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 * (groupIndex + 1) }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${group.color} rounded-xl flex items-center justify-center`}>
              <Medal className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Trophées {group.title}
            </h2>
            <span className="ml-auto text-sm sm:text-base text-slate-500">
              {group.trophies.length} trophée{group.trophies.length > 1 ? 's' : ''}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
            {group.trophies.map((trophy, index) => (
              <motion.div
                key={trophy.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.05 * index }}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedTrophy(trophy)}
                className={`${group.bgColor} border-2 ${group.borderColor} rounded-xl p-4 cursor-pointer hover:shadow-lg transition-all duration-300`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-12 h-12 bg-gradient-to-br ${group.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <span className="text-2xl">{trophy.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-slate-900 mb-1">{trophy.title}</h3>
                    <p className="text-xs text-slate-600">{trophy.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      ))}

      {/* Modal de détail */}
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
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedTrophy(null)}
                className="absolute top-4 right-4 p-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5 text-slate-600" />
              </button>

              <div className="flex flex-col items-center text-center">
                <div className={`w-20 h-20 bg-gradient-to-br ${
                  selectedTrophy.rarity === 'bronze' ? 'from-orange-600 to-orange-800' :
                  selectedTrophy.rarity === 'silver' ? 'from-gray-400 to-gray-600' :
                  selectedTrophy.rarity === 'gold' ? 'from-yellow-400 to-yellow-600' :
                  'from-purple-400 to-purple-600'
                } rounded-2xl flex items-center justify-center mb-4`}>
                  <span className="text-4xl">{selectedTrophy.icon}</span>
                </div>

                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  {selectedTrophy.title}
                </h3>

                <span className={`px-3 py-1 rounded-full text-xs font-medium mb-4 ${
                  selectedTrophy.rarity === 'bronze' ? 'bg-orange-100 text-orange-700' :
                  selectedTrophy.rarity === 'silver' ? 'bg-gray-100 text-gray-700' :
                  selectedTrophy.rarity === 'gold' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-purple-100 text-purple-700'
                }`}>
                  {selectedTrophy.rarity.toUpperCase()}
                </span>

                <p className="text-slate-600 mb-4">
                  {selectedTrophy.description}
                </p>

                <div className="w-full p-4 bg-slate-50 rounded-lg">
                  <p className="text-sm text-slate-700">
                    {selectedTrophy.detail}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedTrophy(null)}
                  className="mt-6 w-full px-4 py-2 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors"
                >
                  Fermer
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}