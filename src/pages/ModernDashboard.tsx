import { Business } from '../types/business';
import ModernMetricCard from '../components/ModernMetricCard';
import RevenueChart from '../components/RevenueChart';
import OriginCard from '../components/OriginCard';
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
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

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

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('fr-FR').format(value);
  };

  const calculateGrowth = () => {
    const lastMonth = business.monthlyData[business.monthlyData.length - 1];
    const previousMonth = business.monthlyData[business.monthlyData.length - 2];
    
    if (!lastMonth || !previousMonth) return '0%';
    
    const growth = ((lastMonth.revenue - previousMonth.revenue) / previousMonth.revenue) * 100;
    return `${growth > 0 ? '+' : ''}${growth.toFixed(1)}%`;
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
    <div className="min-h-screen bg-slate-50 p-6">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="flex flex-col items-center text-center mb-2">
            {business.logoFull || business.logo?.startsWith('/') ? (
              <img 
                src={business.logoFull || business.logo} 
                alt={business.name}
                className="w-32 h-32 rounded-lg object-cover mb-3"
              />
            ) : (
              <span className="text-6xl mb-3">{business.logo}</span>
            )}
            <h1 className="text-3xl font-bold text-slate-900 mb-2">{business.name}</h1>
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

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <ModernMetricCard
          title="Revenue Total"
          value={formatCurrency(business.metrics.totalRevenue)}
          change={calculateGrowth()}
          changeType={parseFloat(calculateGrowth()) > 0 ? 'increase' : 'decrease'}
          icon={DollarSign}
          iconColor="text-green-600"
          subtitle="Depuis le lancement"
        />
        
        <ModernMetricCard
          title="Dépenses Totales"
          value={formatCurrency(business.metrics.totalExpenses)}
          change="2.4%"
          changeType="decrease"
          icon={TrendingUp}
          iconColor="text-red-600"
          subtitle="Optimisation continue"
        />
        
        <ModernMetricCard
          title="Clients Totaux"
          value={formatNumber(business.metrics.totalCustomers)}
          change="7.8%"
          changeType="increase"
          icon={Users}
          iconColor="text-blue-600"
          subtitle={`CAC: ${formatCurrency(business.metrics.cac)}`}
        />
      </div>

      {/* Lean Metrics */}
      {business.status === 'active' && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <ModernMetricCard
            title="MRR"
            value={formatCurrency(business.metrics.mrr)}
            change="15%"
            changeType="increase"
            icon={Activity}
            iconColor="text-indigo-600"
            subtitle={`ARR: ${formatCurrency(business.metrics.arr)}`}
          />
          
          <ModernMetricCard
            title="LTV / CAC"
            value={(business.metrics.ltv / business.metrics.cac).toFixed(1) + 'x'}
            icon={Target}
            iconColor="text-orange-600"
            subtitle={`LTV: ${formatCurrency(business.metrics.ltv)}`}
          />
          
          <ModernMetricCard
            title="Churn Rate"
            value={business.metrics.churnRate + '%'}
            changeType={business.metrics.churnRate < 5 ? 'increase' : 'decrease'}
            icon={Zap}
            iconColor="text-yellow-600"
            subtitle="Mensuel"
          />
          
          <ModernMetricCard
            title="Runway"
            value={business.metrics.runway + ' mois'}
            icon={Clock}
            iconColor="text-teal-600"
            subtitle={`Burn: ${formatCurrency(business.metrics.burnRate)}/mois`}
          />
        </div>
      )}

      {/* Charts */}
      <div className="mb-6">
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-slate-900 mb-4 uppercase tracking-wider">Évolution Revenue</h3>
          <RevenueChart data={business.monthlyData} />
        </div>
      </div>

      {/* Milestones & Lessons */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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