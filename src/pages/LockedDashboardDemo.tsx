import { useState } from 'react';
import { motion } from 'framer-motion';
import ModernMetricCard from '../components/ModernMetricCard';
import LockedMetricCard from '../components/LockedMetricCard';
import OriginCard from '../components/OriginCard';
import RevenueChart from '../components/RevenueChart';
import { 
  TrendingUp, 
  Users, 
  DollarSign,
  Activity,
  Target,
  Zap,
  Clock,
  Lock,
  Unlock,
  Eye
} from 'lucide-react';
import { mockBusinesses } from '../data/mockData';

export default function LockedDashboardDemo() {
  const [showLocked, setShowLocked] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState<'blur' | 'dark' | 'classified' | 'minimal' | 'premium'>('blur');
  
  // Utiliser un vrai business de démo (Infrastructure IA)
  const demoBusiness = mockBusinesses[0];

  const variants = [
    { id: 'blur', label: 'Blur Effect', description: 'Fond flou avec cadenas' },
    { id: 'dark', label: 'Dark Mode', description: 'Style sombre et mystérieux' },
    { id: 'classified', label: 'Classified', description: 'Style document secret' },
    { id: 'minimal', label: 'Minimal', description: 'Simple et épuré' },
    { id: 'premium', label: 'Premium', description: 'Style premium doré' }
  ];
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('fr-FR').format(value);
  };
  
  const getOriginStory = () => {
    return {
      problem: demoBusiness.idea || "Projet en développement",
      trigger: demoBusiness.anecdote || "Histoire à venir",
      vision: demoBusiness.vision || "Vision en construction",
      location: demoBusiness.industry,
      date: new Date(demoBusiness.startDate).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }),
      moment: demoBusiness.status
    };
  };
  
  const getStatusBadge = () => {
    const statusConfig = {
      active: { label: 'Actif', class: 'bg-green-50 text-green-700 border-green-200' },
      pivoted: { label: 'Pivoté', class: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
      sold: { label: 'Vendu', class: 'bg-blue-50 text-blue-700 border-blue-200' },
      closed: { label: 'Fermé', class: 'bg-red-50 text-red-700 border-red-200' },
    };
    
    const config = statusConfig[demoBusiness.status];
    
    return (
      <span className={`px-2 py-1 rounded-md text-xs font-medium border ${config.class}`}>
        {config.label}
      </span>
    );
  };
  
  // Fausses données pour l'année 1 (publiques)
  const year1Data = [
    { month: 'Jan', revenue: 5000, expenses: 3000, customers: 10, orders: 15 },
    { month: 'Fév', revenue: 7500, expenses: 4000, customers: 18, orders: 25 },
    { month: 'Mar', revenue: 10000, expenses: 5000, customers: 28, orders: 38 },
    { month: 'Avr', revenue: 12500, expenses: 5500, customers: 38, orders: 52 },
    { month: 'Mai', revenue: 15000, expenses: 6000, customers: 50, orders: 68 },
    { month: 'Juin', revenue: 18000, expenses: 6500, customers: 65, orders: 85 },
    { month: 'Juil', revenue: 21000, expenses: 7000, customers: 82, orders: 103 },
    { month: 'Août', revenue: 23500, expenses: 7500, customers: 95, orders: 120 },
    { month: 'Sep', revenue: 26000, expenses: 8000, customers: 110, orders: 138 },
    { month: 'Oct', revenue: 29000, expenses: 8500, customers: 128, orders: 158 },
    { month: 'Nov', revenue: 32000, expenses: 9000, customers: 145, orders: 178 },
    { month: 'Déc', revenue: 35000, expenses: 9500, customers: 165, orders: 200 }
  ];
  
  // Fausses données pour les années 2-5 (confidentielles)
  const futureYearsData = [
    { month: 'Année 2', revenue: 420000, expenses: 120000, customers: 2000, orders: 2400 },
    { month: 'Année 3', revenue: 840000, expenses: 200000, customers: 5000, orders: 6000 },
    { month: 'Année 4', revenue: 1680000, expenses: 350000, customers: 12000, orders: 14400 },
    { month: 'Année 5', revenue: 2800000, expenses: 500000, customers: 25000, orders: 30000 }
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6">
      {/* Control Panel */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl p-4 text-white"
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold mb-1">Mode Démonstration - Données Verrouillées</h1>
            <p className="text-sm text-slate-300">Année 1 publique • Années 2-5 confidentielles</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex gap-1">
              {variants.map((variant) => (
                <button
                  key={variant.id}
                  onClick={() => setSelectedVariant(variant.id as any)}
                  title={variant.description}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    selectedVariant === variant.id
                      ? 'bg-white text-slate-900'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  {variant.label}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowLocked(!showLocked)}
              className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                showLocked 
                  ? 'bg-red-600 hover:bg-red-700' 
                  : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              {showLocked ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
              {showLocked ? 'Verrouillé' : 'Déverrouillé'}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Business Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6"
      >
        <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5">
          <div className="flex flex-col items-center text-center mb-2">
            {demoBusiness.logoFull || demoBusiness.logo?.startsWith('/') ? (
              <img 
                src={demoBusiness.logoFull || demoBusiness.logo} 
                alt={demoBusiness.name}
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-lg object-cover mb-3"
              />
            ) : (
              <span className="text-5xl sm:text-6xl mb-3">{demoBusiness.logo}</span>
            )}
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">{demoBusiness.name}</h1>
            <div className="flex items-center gap-3 mb-2">
              {getStatusBadge()}
              <span className="text-sm text-slate-400 uppercase tracking-wider">
                {demoBusiness.industry}
              </span>
            </div>
            <p className="text-base text-slate-600">{demoBusiness.tagline}</p>
          </div>
        </div>
      </motion.div>

      {/* Origin Story */}
      <OriginCard projectName={demoBusiness.name} origin={getOriginStory()} />

      {/* Histoire & Anecdote - Année 1 Publique */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white border border-slate-200 rounded-xl p-5"
        >
          <h2 className="text-base font-semibold text-slate-900 mb-3 flex items-center gap-2">
            <span className="text-lg">📖</span>
            L'Histoire - Année 1
          </h2>
          <div className="space-y-2">
            <p className="text-sm text-slate-600 leading-relaxed">
              {demoBusiness.story}
            </p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-xl p-5"
        >
          <h2 className="text-base font-semibold text-slate-900 mb-3 flex items-center gap-2">
            <span className="text-lg">🎭</span>
            Anecdote Mémorable
          </h2>
          <p className="text-sm text-slate-700 leading-relaxed">
            {demoBusiness.anecdote}
          </p>
        </motion.div>
      </div>

      {/* Métriques Année 1 - Publiques */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <Eye className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Année 1 - Données Publiques</h2>
            <p className="text-sm text-slate-600">Métriques visibles pour démontrer la traction initiale</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <ModernMetricCard
            title="Revenue Total"
            value={formatCurrency(35000)}
            change="+600%"
            changeType="increase"
            icon={DollarSign}
            iconColor="text-green-600"
            subtitle="Croissance sur 12 mois"
          />
          <ModernMetricCard
            title="Clients Totaux"
            value={formatNumber(165)}
            change="+1550%"
            changeType="increase"
            icon={Users}
            iconColor="text-blue-600"
            subtitle="Base clients active"
          />
          <ModernMetricCard
            title="Commandes"
            value={formatNumber(200)}
            change="+1233%"
            changeType="increase"
            icon={Activity}
            iconColor="text-purple-600"
            subtitle="Volume total"
          />
        </div>
      </div>

      {/* Lean Metrics - Année 1 */}
      <div className="mb-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <ModernMetricCard
            title="MRR"
            value={formatCurrency(2917)}
            change="+15%"
            changeType="increase"
            icon={Activity}
            iconColor="text-indigo-600"
            subtitle="Revenus mensuels"
          />
          <ModernMetricCard
            title="CAC"
            value={formatCurrency(150)}
            icon={Target}
            iconColor="text-orange-600"
            subtitle="Coût acquisition"
          />
          <ModernMetricCard
            title="LTV"
            value={formatCurrency(600)}
            icon={Zap}
            iconColor="text-purple-600"
            subtitle="Valeur client"
          />
          <ModernMetricCard
            title="Marge"
            value="74%"
            changeType="increase"
            icon={TrendingUp}
            iconColor="text-green-600"
            subtitle="Marge brute"
          />
        </div>
      </div>

      {/* Revenue Chart - Année 1 */}
      <div className="mb-6">
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">Évolution Revenue - Année 1</h3>
            <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded">Données publiques</span>
          </div>
          <RevenueChart data={year1Data} />
        </div>
      </div>

      {/* Années 2-5 - Section Verrouillée */}
      <div className="mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
              <Lock className="w-5 h-5 text-slate-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Années 2-5 - Données Confidentielles</h2>
              <p className="text-sm text-slate-600">Métriques avancées disponibles sur demande</p>
            </div>
          </div>

          {/* Métriques principales verrouillées */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6">
            {showLocked ? (
              <>
                <LockedMetricCard
                  title="Revenue Cumulé"
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
                  title="Volume Commandes"
                  variant={selectedVariant}
                  hint="Scale impressionnante"
                  icon={Activity}
                  color="text-purple-600"
                />
              </>
            ) : (
              <>
                <ModernMetricCard
                  title="Revenue Cumulé"
                  value={formatCurrency(2800000)}
                  change="+7900%"
                  changeType="increase"
                  icon={DollarSign}
                  iconColor="text-green-600"
                  subtitle="Sur 5 ans"
                />
                <ModernMetricCard
                  title="Base Clients"
                  value={formatNumber(25000)}
                  change="+15050%"
                  changeType="increase"
                  icon={Users}
                  iconColor="text-blue-600"
                  subtitle="International"
                />
                <ModernMetricCard
                  title="Volume Commandes"
                  value={formatNumber(30000)}
                  change="+14900%"
                  changeType="increase"
                  icon={Activity}
                  iconColor="text-purple-600"
                  subtitle="Total cumulé"
                />
              </>
            )}
          </div>

          {/* Lean Metrics verrouillées */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {showLocked ? (
              <>
                <LockedMetricCard
                  title="ARR"
                  variant={selectedVariant}
                  hint="7 chiffres atteint"
                  icon={Target}
                  color="text-indigo-600"
                />
                <LockedMetricCard
                  title="LTV/CAC"
                  variant={selectedVariant}
                  hint="Ratio optimal"
                  icon={Zap}
                  color="text-orange-600"
                />
                <LockedMetricCard
                  title="Churn Rate"
                  variant={selectedVariant}
                  hint="Best in class"
                  icon={TrendingUp}
                  color="text-yellow-600"
                />
                <LockedMetricCard
                  title="Valorisation"
                  variant={selectedVariant}
                  hint="Multiple de marché"
                  icon={Clock}
                  color="text-teal-600"
                />
              </>
            ) : (
              <>
                <ModernMetricCard
                  title="ARR"
                  value={formatCurrency(1200000)}
                  change="+41x"
                  changeType="increase"
                  icon={Target}
                  iconColor="text-indigo-600"
                  subtitle="Annuel récurrent"
                />
                <ModernMetricCard
                  title="LTV/CAC"
                  value="8.5x"
                  changeType="increase"
                  icon={Zap}
                  iconColor="text-orange-600"
                  subtitle="Ratio excellent"
                />
                <ModernMetricCard
                  title="Churn Rate"
                  value="2.1%"
                  changeType="increase"
                  icon={TrendingUp}
                  iconColor="text-yellow-600"
                  subtitle="Mensuel"
                />
                <ModernMetricCard
                  title="Valorisation"
                  value={formatCurrency(10000000)}
                  change="8.3x ARR"
                  changeType="neutral"
                  icon={Clock}
                  iconColor="text-teal-600"
                  subtitle="Estimation"
                />
              </>
            )}
          </div>
        </motion.div>
      </div>

      {/* Revenue Chart Années 2-5 verrouillé */}
      <div className="mb-6">
        <div className="bg-white border border-slate-200 rounded-xl p-5 relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">Évolution Revenue - Années 2-5</h3>
            <span className="text-xs text-red-600 font-medium bg-red-50 px-2 py-1 rounded flex items-center gap-1">
              <Lock className="w-3 h-3" />
              Confidentiel
            </span>
          </div>
          
          {showLocked ? (
            <div className="h-64 bg-slate-50 rounded-lg flex items-center justify-center relative">
              <div className="absolute inset-0 backdrop-blur-sm bg-slate-900/5" />
              <div className="text-center z-10">
                <Lock className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                <p className="text-sm text-slate-600 font-medium">Données confidentielles</p>
                <p className="text-xs text-slate-500 mt-1">Années 2-5 non divulguées</p>
                <p className="text-xs text-slate-400 mt-3 italic">Croissance: +7900% sur 5 ans</p>
              </div>
            </div>
          ) : (
            <RevenueChart data={futureYearsData} />
          )}
        </div>
      </div>

      {/* Milestones & Lessons Learned */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {/* Milestones Année 1 */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white border border-slate-200 rounded-xl p-5"
        >
          <h3 className="text-sm font-semibold text-slate-900 mb-4 uppercase tracking-wider flex items-center justify-between">
            <span>Milestones Clés - Année 1</span>
            <Eye className="w-4 h-4 text-green-600" />
          </h3>
          <div className="space-y-2">
            <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
              <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 bg-green-500" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-800">Lancement MVP</p>
                <p className="text-xs text-slate-500 mt-0.5">Premier client payant en 2 semaines</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
              <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 bg-yellow-500" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-800">100 premiers clients</p>
                <p className="text-xs text-slate-500 mt-0.5">Validation product-market fit</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
              <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 bg-orange-500" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-800">Break-even opérationnel</p>
                <p className="text-xs text-slate-500 mt-0.5">Rentabilité atteinte au mois 8</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Lessons Learned */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white border border-slate-200 rounded-xl p-5"
        >
          <h3 className="text-sm font-semibold text-slate-900 mb-4 uppercase tracking-wider">Lessons Learned</h3>
          <div className="space-y-2">
            {demoBusiness.lessonsLearned.map((lesson, index) => (
              <div key={index} className="flex items-start gap-2.5 p-3 bg-blue-50 rounded-lg">
                <span className="text-blue-600 text-sm">💡</span>
                <p className="text-xs text-slate-700">{lesson}</p>
              </div>
            ))}
            <div className="p-3 bg-slate-100 rounded-lg relative overflow-hidden">
              {showLocked && <div className="absolute inset-0 backdrop-blur-sm bg-slate-900/10" />}
              <div className="flex items-center justify-center gap-2">
                <Lock className="w-4 h-4 text-slate-400" />
                <p className="text-xs text-slate-500">+8 lessons des années 2-5</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Message d'autorité */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
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
        <div className="mt-4 flex items-center justify-center gap-4 text-xs text-slate-400">
          <span>📊 32 projets documentés</span>
          <span>•</span>
          <span>💰 €2.8M+ générés</span>
          <span>•</span>
          <span>🌍 25K+ clients</span>
          <span>•</span>
          <span>🚀 5 exits réussis</span>
        </div>
      </motion.div>
    </div>
  );
}