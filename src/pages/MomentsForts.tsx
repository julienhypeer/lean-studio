import { useState } from 'react';
import { motion } from 'framer-motion';

interface Moment {
  icon: string;
  title: string;
  description: string;
  detail?: string;
  color: string;
}

const etapesFondatrices: Moment[] = [
  {
    icon: '🚀',
    title: 'Premier lancement',
    description: 'Le moment où tu passes de l\'idée à l\'action',
    detail: 'Janvier 2019 - FitTracker était né après 6 mois de développement nocturne',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: '💰',
    title: 'Première vente',
    description: 'Le déclic qui prouve que ça marche',
    detail: '23€ - Mon premier client a validé des mois d\'efforts',
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: '📈',
    title: 'Première croissance',
    description: 'Quand les chiffres décollent vraiment',
    detail: '10K MRR atteint après 8 mois d\'itérations',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: '💔',
    title: 'Premier échec',
    description: 'L\'apprentissage le plus dur mais le plus formateur',
    detail: 'TaskMaster - 30K€ perdus, mais des leçons inestimables',
    color: 'from-red-500 to-orange-500'
  }
];

const momentsCharnieres: Moment[] = [
  {
    icon: '🎯',
    title: 'Premier pivot',
    description: 'Quand tu changes de direction stratégique',
    detail: 'B2C vers B2B - La décision qui a sauvé EcoMarket',
    color: 'from-indigo-500 to-purple-500'
  },
  {
    icon: '👥',
    title: 'Première embauche',
    description: 'Passer du solo à l\'équipe',
    detail: 'Sarah, développeuse senior - Le début de l\'aventure collective',
    color: 'from-teal-500 to-green-500'
  },
  {
    icon: '🏆',
    title: 'Premier gros client',
    description: 'Le deal qui change la donne',
    detail: 'Contrat 50K€ avec Carrefour - La validation ultime',
    color: 'from-yellow-500 to-orange-500'
  },
  {
    icon: '⚡',
    title: 'Moment "aha"',
    description: 'L\'insight qui révolutionne ton approche',
    detail: 'Les utilisateurs veulent simple, pas parfait',
    color: 'from-pink-500 to-rose-500'
  }
];

const apprentissagesCles: Moment[] = [
  {
    icon: '🛑',
    title: 'Plus grosse erreur',
    description: 'Et ce que ça t\'a appris',
    detail: 'Ignorer les feedbacks clients pendant 3 mois',
    color: 'from-red-600 to-red-400'
  },
  {
    icon: '🎓',
    title: 'Leçon la plus coûteuse',
    description: 'L\'erreur qui t\'a coûté cher mais t\'a rendu plus fort',
    detail: 'Recruter vite sans vérifier le fit culturel',
    color: 'from-indigo-600 to-blue-500'
  },
  {
    icon: '🔄',
    title: 'Meilleur comeback',
    description: 'Comment tu t\'es relevé d\'un échec',
    detail: 'De la fermeture de TaskMaster au succès d\'EcoMarket',
    color: 'from-green-600 to-teal-500'
  },
  {
    icon: '💡',
    title: 'Innovation breakthrough',
    description: 'Ton moment d\'eureka',
    detail: 'L\'IA pour prédire les tendances de consommation',
    color: 'from-yellow-600 to-yellow-400'
  }
];

export default function MomentsForts() {
  const [selectedMoment, setSelectedMoment] = useState<Moment | null>(null);

  const MomentCard = ({ moment, index }: { moment: Moment; index: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.05 }}
      onClick={() => setSelectedMoment(moment)}
      className="relative group cursor-pointer"
    >
      <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-xl"
           style={{ backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))` }}></div>
      <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
        <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${moment.color} flex items-center justify-center mb-4`}>
          <span className="text-3xl">{moment.icon}</span>
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">{moment.title}</h3>
        <p className="text-sm text-gray-600">{moment.description}</p>
        {moment.detail && (
          <p className="text-xs text-gray-500 mt-3 italic">{moment.detail}</p>
        )}
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50 p-8">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto mb-12"
      >
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          ✨ Moments Forts
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl">
          Chaque entrepreneur a ses moments décisifs. Voici ceux qui ont forgé mon parcours, 
          entre victoires éclatantes et échecs formateurs.
        </p>
      </motion.div>

      {/* Étapes Fondatrices */}
      <section className="max-w-7xl mx-auto mb-16">
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3"
        >
          <span className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
            🏁
          </span>
          Étapes Fondatrices
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {etapesFondatrices.map((moment, index) => (
            <MomentCard key={index} moment={moment} index={index} />
          ))}
        </div>
      </section>

      {/* Moments Charnières */}
      <section className="max-w-7xl mx-auto mb-16">
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3"
        >
          <span className="w-12 h-12 bg-black/10 rounded-full flex items-center justify-center">
            🔀
          </span>
          Moments Charnières
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {momentsCharnieres.map((moment, index) => (
            <MomentCard key={index} moment={moment} index={index + 4} />
          ))}
        </div>
      </section>

      {/* Apprentissages Clés */}
      <section className="max-w-7xl mx-auto mb-16">
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3"
        >
          <span className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
            📚
          </span>
          Apprentissages Clés
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {apprentissagesCles.map((moment, index) => (
            <MomentCard key={index} moment={moment} index={index + 8} />
          ))}
        </div>
      </section>

      {/* Modal Detail */}
      {selectedMoment && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-8 z-50"
          onClick={() => setSelectedMoment(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${selectedMoment.color} flex items-center justify-center mb-6 mx-auto`}>
              <span className="text-4xl">{selectedMoment.icon}</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center">{selectedMoment.title}</h3>
            <p className="text-lg text-gray-600 mb-4 text-center">{selectedMoment.description}</p>
            {selectedMoment.detail && (
              <p className="text-gray-500 italic text-center">{selectedMoment.detail}</p>
            )}
            <button
              onClick={() => setSelectedMoment(null)}
              className="mt-6 w-full px-6 py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-900 transition-colors"
            >
              Fermer
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}