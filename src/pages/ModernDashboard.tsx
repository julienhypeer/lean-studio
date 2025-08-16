import { Business } from '../types/business';
import { useMemo } from 'react';
import LockedMetricCard from '../components/LockedMetricCard';
import LockedRevenueChart from '../components/LockedRevenueChart';
import OriginCard from '../components/OriginCard';
import { generateLockedMetrics, generateMaskedMonthlyData } from '../utils/lockedDataGenerator';
import { 
  TrendingUp, 
  Users, 
  DollarSign,
  Activity,
  Target,
  Zap,
  Clock
} from 'lucide-react';
import { motion } from 'framer-motion';

interface ModernDashboardProps {
  business: Business;
}

export default function ModernDashboard({ business }: ModernDashboardProps) {
  // Générer les métriques masquées pour ce business
  const lockedMetrics = useMemo(() => {
    return generateLockedMetrics(business);
  }, [business]);

  // Générer 12 mois de données basées sur la date de lancement
  const monthlyData = useMemo(() => {
    return generateMaskedMonthlyData(business, 12);
  }, [business]);


  const getOriginStory = () => {
    // Utiliser les vraies données du business
    return {
      problem: business.idea || "Projet en développement",
      trigger: business.anecdote || "Histoire à venir",
      vision: business.vision || "Vision en construction",
      location: business.industry,
      date: new Date(business.startDate).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }),
      moment: business.status
    };
  };


  const getStatusBadge = () => {
    const statusConfig = {
      active: { label: 'Actif', class: 'bg-green-50 text-green-700 border-green-200' },
      pivoted: { label: 'Pivoté', class: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
      sold: { label: 'Vendu', class: 'bg-blue-50 text-blue-700 border-blue-200' },
      closed: { label: 'Fermé', class: 'bg-red-50 text-red-700 border-red-200' },
    };
    
    const config = statusConfig[business.status];
    
    return (
      <span className={`px-2 py-1 rounded-md text-xs font-medium border ${config.class}`}>
        {config.label}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6">
      {/* Header - Mobile optimized */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4 sm:mb-6"
      >
        <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5">
          <div className="flex flex-col items-center text-center mb-2">
            {business.logoFull || business.logo?.startsWith('/') ? (
              <img 
                src={business.logoFull || business.logo} 
                alt={business.name}
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-lg object-cover mb-3"
              />
            ) : (
              <span className="text-5xl sm:text-6xl mb-3">{business.logo}</span>
            )}
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">{business.name}</h1>
            <div className="flex items-center gap-3 mb-2">
              {getStatusBadge()}
              <span className="text-sm text-slate-400 uppercase tracking-wider">
                {business.industry}
              </span>
            </div>
            <p className="text-base text-slate-600">{business.tagline}</p>
          </div>
        </div>
      </motion.div>

      {/* Origin Story */}
      <OriginCard projectName={business.name} origin={getOriginStory()} />

      {/* Histoire du Projet */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white border border-slate-200 rounded-xl p-5 mb-6"
      >
        <h2 className="text-base font-semibold text-slate-900 mb-3 flex items-center gap-2">
          <span className="text-lg">📖</span>
          L'Histoire
        </h2>
        <div className="space-y-2">
          <p className="text-sm text-slate-600 leading-relaxed">
            {business.story}
          </p>
          {business.lessonsLearned && business.lessonsLearned.length > 0 && (
            <p className="text-xs italic text-slate-400 pt-2 border-t border-slate-100">
              💡 {business.lessonsLearned[0]}
            </p>
          )}
        </div>
      </motion.div>

      {/* Anecdote */}
      {business.anecdote && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-xl p-5 mb-6"
        >
          <h2 className="text-base font-semibold text-slate-900 mb-3 flex items-center gap-2">
            <span className="text-lg">🎭</span>
            Anecdote Mémorable
          </h2>
          <p className="text-sm text-slate-700 leading-relaxed">
            {business.anecdote}
          </p>
        </motion.div>
      )}

      {/* Metrics Grid - Mobile optimized */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
        <LockedMetricCard
          title="Revenue Première Année"
          valueRange={lockedMetrics.revenueRange}
          trend={lockedMetrics.growthTrend.value}
          trendType={lockedMetrics.growthTrend.type}
          hint="Sur 12 mois"
          icon={DollarSign}
          color="text-green-600"
        />
        
        <LockedMetricCard
          title="Dépenses Première Année"
          valueRange={lockedMetrics.revenueRange}
          trend={lockedMetrics.expenseRatio}
          trendType="increase"
          hint="Optimisées"
          icon={TrendingUp}
          color="text-red-600"
        />
        
        <LockedMetricCard
          title="Clients Première Année"
          valueRange={lockedMetrics.customerRange}
          trend={lockedMetrics.growthTrend.value}
          trendType={lockedMetrics.growthTrend.type}
          hint="Base croissante"
          icon={Users}
          color="text-blue-600"
        />
      </div>

      {/* Lean Metrics */}
      {business.status === 'active' && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
          <LockedMetricCard
            title="MRR"
            valueRange={lockedMetrics.mrrRange}
            trend="+22%"
            trendType="increase"
            icon={Activity}
            color="text-indigo-600"
          />
          
          <LockedMetricCard
            title="LTV / CAC"
            valueRange={lockedMetrics.ltvcacRange}
            trend="+0.8x"
            trendType="increase"
            icon={Target}
            color="text-orange-600"
          />
          
          <LockedMetricCard
            title="Churn Rate"
            valueRange={lockedMetrics.churnRange}
            trend="-0.5%"
            trendType="decrease"
            icon={Zap}
            color="text-yellow-600"
          />
          
          <LockedMetricCard
            title="Runway"
            valueRange={lockedMetrics.runwayRange}
            hint="Trésorerie stable"
            icon={Clock}
            color="text-teal-600"
          />
        </div>
      )}

      {/* Charts */}
      <div className="mb-6">
        <LockedRevenueChart data={monthlyData} />
      </div>

      {/* Milestones & Lessons - Stack on mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white border border-slate-200 rounded-xl p-5"
        >
          <h3 className="text-sm font-semibold text-slate-900 mb-4 uppercase tracking-wider">Milestones Clés</h3>
          <div className="space-y-2">
            {business.milestones.map((milestone) => (
              <div key={milestone.id} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${
                  milestone.impact === 'critical' ? 'bg-red-500' :
                  milestone.impact === 'high' ? 'bg-orange-500' :
                  milestone.impact === 'medium' ? 'bg-yellow-500' :
                  'bg-slate-400'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800">{milestone.title}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white border border-slate-200 rounded-xl p-5"
        >
          <h3 className="text-sm font-semibold text-slate-900 mb-4 uppercase tracking-wider">Lessons Learned</h3>
          <div className="space-y-2">
            {business.lessonsLearned.map((lesson, index) => (
              <div key={index} className="flex items-start gap-2.5 p-3 bg-blue-50 rounded-lg">
                <span className="text-blue-600 text-sm">💡</span>
                <p className="text-xs text-slate-700">{lesson}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}