import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface Moment {
  icon: string;
  title: string;
  description: string;
  detail: string;
  color: string;
}

export default function ModernMomentsForts() {
  const [selectedMoment, setSelectedMoment] = useState<Moment | null>(null);

  const etapesFondatrices: Moment[] = [
    {
      icon: '🚀',
      title: 'Premier lancement',
      description: 'Le moment où tu passes de l\'idée à l\'action',
      detail: 'Janvier 2019 - FitTracker était né après 6 mois de développement nocturne',
      color: 'from-blue-400 to-blue-600'
    },
    {
      icon: '💡',
      title: 'Le déclic',
      description: 'Cette conversation qui a tout changé',
      detail: 'Un client m\'a dit : "Je paierais 10x plus pour une version entreprise"',
      color: 'from-purple-400 to-purple-600'
    },
    {
      icon: '🎯',
      title: 'Premier client payant',
      description: 'La validation ultime de ton idée',
      detail: '15€ de Marie D. - J\'ai encadré ce premier paiement Stripe',
      color: 'from-green-400 to-green-600'
    },
    {
      icon: '🏆',
      title: 'Product-Market Fit',
      description: 'Quand la croissance devient organique',
      detail: 'Les clients recommandaient sans qu\'on le demande',
      color: 'from-yellow-400 to-yellow-600'
    }
  ];

  const momentsCharnieres: Moment[] = [
    {
      icon: '🔄',
      title: 'Le pivot salvateur',
      description: 'Abandonner le B2C pour le B2B',
      detail: 'EcoMarket : de 0 à 50K€ en 3 mois après le pivot',
      color: 'from-orange-400 to-orange-600'
    },
    {
      icon: '😰',
      title: 'La nuit du doute',
      description: 'Envie de tout arrêter à 3h du matin',
      detail: 'Compte en banque : 127€. Loyer dans 5 jours. J\'ai persisté.',
      color: 'from-gray-400 to-gray-600'
    },
    {
      icon: '🤝',
      title: 'Le mentor providentiel',
      description: 'Cette rencontre qui accélère tout',
      detail: 'Marc Z., serial entrepreneur, m\'a ouvert son réseau',
      color: 'from-indigo-400 to-indigo-600'
    },
    {
      icon: '💰',
      title: 'L\'exit',
      description: 'Vendre au bon moment',
      detail: 'FitTracker vendu 450K€ - 18 mois de travail valorisés',
      color: 'from-pink-400 to-pink-600'
    }
  ];

  const apprentissagesCles: Moment[] = [
    {
      icon: '📊',
      title: 'Les metrics qui comptent',
      description: 'CAC, LTV, Churn > Vanity metrics',
      detail: 'J\'ai perdu 6 mois à optimiser des métriques inutiles',
      color: 'from-red-400 to-red-600'
    },
    {
      icon: '🎨',
      title: 'Design > Features',
      description: 'Une belle UI fait vendre',
      detail: 'Refonte UI = +40% de conversion, sans nouvelle feature',
      color: 'from-teal-400 to-teal-600'
    },
    {
      icon: '⚡',
      title: 'La vitesse prime',
      description: 'Ship fast, iterate faster',
      detail: 'MVP en 2 semaines > Produit parfait en 6 mois',
      color: 'from-cyan-400 to-cyan-600'
    },
    {
      icon: '🧠',
      title: 'L\'état d\'esprit',
      description: 'Resilience + Patience = Success',
      detail: 'Chaque "non" te rapproche du "oui" qui change tout',
      color: 'from-emerald-400 to-emerald-600'
    }
  ];

  const allMoments = [
    { category: 'Étapes fondatrices', moments: etapesFondatrices },
    { category: 'Moments charnières', moments: momentsCharnieres },
    { category: 'Apprentissages clés', moments: apprentissagesCles }
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-semibold text-slate-900 mb-2">✨ Moments Forts</h1>
        <p className="text-sm text-slate-500">Les instants qui ont façonné mon parcours entrepreneurial</p>
      </motion.div>

      {/* Moments Grid */}
      {allMoments.map((section, sectionIndex) => (
        <div key={section.category} className="mb-8">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: sectionIndex * 0.1 }}
            className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-2"
          >
            {section.category}
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {section.moments.map((moment, index) => (
              <motion.div
                key={moment.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: sectionIndex * 0.1 + index * 0.05 }}
                whileHover={{ y: -4 }}
                onClick={() => setSelectedMoment(moment)}
                className="cursor-pointer"
              >
                <div className="bg-white border border-slate-200 rounded-xl p-4 h-full hover:shadow-lg transition-all duration-200">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${moment.color} flex items-center justify-center mb-3`}>
                    <span className="text-2xl">{moment.icon}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-slate-900 mb-1">
                    {moment.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {moment.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ))}

      {/* Modal */}
      <AnimatePresence>
        {selectedMoment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedMoment(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${selectedMoment.color} flex items-center justify-center`}>
                  <span className="text-3xl">{selectedMoment.icon}</span>
                </div>
                <button
                  onClick={() => setSelectedMoment(null)}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4 text-slate-600" />
                </button>
              </div>
              
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                {selectedMoment.title}
              </h3>
              
              <p className="text-sm text-slate-600 mb-4">
                {selectedMoment.description}
              </p>
              
              <div className="p-4 bg-slate-50 rounded-lg">
                <p className="text-sm text-slate-700 italic">
                  "{selectedMoment.detail}"
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}