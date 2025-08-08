import { useState } from 'react';
import { motion } from 'framer-motion';
import ModernMetricCard from '../components/ModernMetricCard';
import LockedMetricCard from '../components/LockedMetricCard';
import { 
  TrendingUp, 
  Users, 
  DollarSign,
  Activity,
  Target,
  Zap,
  Lock,
  Unlock,
  Eye
} from 'lucide-react';

export default function LockedDashboardDemo() {
  const [showLocked, setShowLocked] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState<'blur' | 'dark' | 'classified' | 'minimal' | 'premium'>('blur');

  const variants = [
    { id: 'blur', label: 'Blur Effect', description: 'Fond flou avec cadenas' },
    { id: 'dark', label: 'Dark Mode', description: 'Style sombre et mystérieux' },
    { id: 'classified', label: 'Classified', description: 'Style document secret' },
    { id: 'minimal', label: 'Minimal', description: 'Simple et épuré' },
    { id: 'premium', label: 'Premium', description: 'Style premium doré' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-slate-200"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">
                Dashboard avec Données Verrouillées
              </h1>
              <p className="text-slate-600">
                Démonstration du système de verrouillage des données confidentielles
              </p>
            </div>
            <button
              onClick={() => setShowLocked(!showLocked)}
              className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                showLocked 
                  ? 'bg-slate-900 text-white hover:bg-slate-800' 
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              {showLocked ? (
                <>
                  <Lock className="w-4 h-4" />
                  Données verrouillées
                </>
              ) : (
                <>
                  <Unlock className="w-4 h-4" />
                  Données visibles
                </>
              )}
            </button>
          </div>

          {/* Style Selector */}
          <div className="flex gap-2 flex-wrap">
            {variants.map((variant) => (
              <button
                key={variant.id}
                onClick={() => setSelectedVariant(variant.id as any)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  selectedVariant === variant.id
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {variant.label}
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Année 1 - Données Publiques */}
      <div className="max-w-7xl mx-auto mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Eye className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Année 1 - Données Publiques</h2>
              <p className="text-sm text-slate-600">Ces métriques sont visibles pour montrer la traction initiale</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <ModernMetricCard
              title="Revenue Total"
              value="125K€"
              change="+45%"
              changeType="increase"
              icon={DollarSign}
              iconColor="text-green-600"
              subtitle="Sur 12 mois"
            />
            <ModernMetricCard
              title="Clients"
              value="1,250"
              change="+127"
              changeType="increase"
              icon={Users}
              iconColor="text-blue-600"
              subtitle="Clients actifs"
            />
            <ModernMetricCard
              title="MRR"
              value="8,500€"
              change="+22%"
              changeType="increase"
              icon={TrendingUp}
              iconColor="text-purple-600"
              subtitle="Revenus récurrents"
            />
            <ModernMetricCard
              title="Croissance"
              value="3.2x"
              change="Stable"
              changeType="neutral"
              icon={Activity}
              iconColor="text-orange-600"
              subtitle="vs début d'année"
            />
          </div>
        </motion.div>
      </div>

      {/* Années 2-5 - Données Confidentielles */}
      <div className="max-w-7xl mx-auto mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
              <Lock className="w-5 h-5 text-slate-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Années 2-5 - Données Confidentielles</h2>
              <p className="text-sm text-slate-600">Métriques avancées non divulguées publiquement</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {showLocked ? (
              <>
                <LockedMetricCard
                  title="Revenue Total"
                  variant={selectedVariant}
                  hint="Croissance exponentielle"
                  icon={DollarSign}
                  color="text-green-600"
                />
                <LockedMetricCard
                  title="Base Clients"
                  variant={selectedVariant}
                  hint="Expansion internationale"
                  icon={Users}
                  color="text-blue-600"
                />
                <LockedMetricCard
                  title="ARR"
                  variant={selectedVariant}
                  hint="7 chiffres atteint"
                  icon={Target}
                  color="text-purple-600"
                />
                <LockedMetricCard
                  title="Valorisation"
                  variant={selectedVariant}
                  hint="Multiple impressionnant"
                  icon={Zap}
                  color="text-orange-600"
                />
              </>
            ) : (
              <>
                <ModernMetricCard
                  title="Revenue Total"
                  value="2.8M€"
                  change="+2,140%"
                  changeType="increase"
                  icon={DollarSign}
                  iconColor="text-green-600"
                  subtitle="Croissance explosive"
                />
                <ModernMetricCard
                  title="Base Clients"
                  value="25,000+"
                  change="+1,900%"
                  changeType="increase"
                  icon={Users}
                  iconColor="text-blue-600"
                  subtitle="Global"
                />
                <ModernMetricCard
                  title="ARR"
                  value="1.2M€"
                  change="+850%"
                  changeType="increase"
                  icon={Target}
                  iconColor="text-purple-600"
                  subtitle="Récurrent annuel"
                />
                <ModernMetricCard
                  title="Valorisation"
                  value="10M€"
                  change="15x ARR"
                  changeType="neutral"
                  icon={Zap}
                  iconColor="text-orange-600"
                  subtitle="Estimation"
                />
              </>
            )}
          </div>
        </motion.div>
      </div>

      {/* Graphique Exemple */}
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-slate-200"
        >
          <h3 className="text-lg font-bold text-slate-900 mb-4">Évolution des Revenus</h3>
          
          <div className="relative h-64 bg-slate-50 rounded-lg overflow-hidden">
            {/* Fake chart bars */}
            <div className="absolute bottom-0 left-0 right-0 flex items-end justify-around h-full p-4">
              {/* Année 1 - Visible */}
              {[30, 35, 40, 45, 52, 58, 65, 72, 78, 85, 92, 100].map((height, i) => (
                <div
                  key={i}
                  className="flex-1 mx-0.5"
                >
                  <div
                    className="bg-gradient-to-t from-blue-500 to-blue-400 rounded-t"
                    style={{ height: `${height}%` }}
                  />
                  <p className="text-xs text-slate-500 text-center mt-2">M{i + 1}</p>
                </div>
              ))}
              
              {/* Années 2-5 - Verrouillées */}
              <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-slate-900/10 backdrop-blur-sm flex items-center justify-center">
                {showLocked && (
                  <div className="text-center">
                    <Lock className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                    <p className="text-sm text-slate-600 font-medium">Données Années 2-5</p>
                    <p className="text-xs text-slate-500">Confidentielles</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Labels */}
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-white border-t border-slate-200 flex items-center px-4">
              <span className="text-xs text-slate-600 font-medium">Année 1</span>
              <div className="flex-1 border-l border-slate-300 mx-4" />
              <span className="text-xs text-slate-400">Années 2-5 🔒</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Message d'autorité */}
      <div className="max-w-7xl mx-auto mt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl p-6 text-white text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <Lock className="w-5 h-5 text-slate-400" />
            <h3 className="text-lg font-bold">Données Complètes Sur Demande</h3>
            <Lock className="w-5 h-5 text-slate-400" />
          </div>
          <p className="text-slate-300 text-sm max-w-2xl mx-auto">
            Les métriques détaillées au-delà de la première année sont disponibles uniquement pour les partenaires 
            stratégiques et investisseurs qualifiés. Cette approche garantit la confidentialité tout en démontrant 
            la solidité de notre track record.
          </p>
        </motion.div>
      </div>
    </div>
  );
}