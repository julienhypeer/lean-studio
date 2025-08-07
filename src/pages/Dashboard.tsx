import { Business } from '../types/business';
import MetricCard from '../components/MetricCard';
import RevenueChart from '../components/RevenueChart';
import { 
  TrendingUp, 
  Users, 
  DollarSign,
  Activity,
  Target,
  Zap,
  Clock
} from 'lucide-react';

interface DashboardProps {
  business: Business;
}

export default function Dashboard({ business }: DashboardProps) {
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

  const calculateGrowth = () => {
    const lastMonth = business.monthlyData[business.monthlyData.length - 1];
    const previousMonth = business.monthlyData[business.monthlyData.length - 2];
    
    if (!lastMonth || !previousMonth) return '0%';
    
    const growth = ((lastMonth.revenue - previousMonth.revenue) / previousMonth.revenue) * 100;
    return `${growth > 0 ? '+' : ''}${growth.toFixed(1)}%`;
  };

  const getStatusBadge = () => {
    const statusConfig = {
      active: { label: 'Actif', class: 'bg-green-100 text-green-700', icon: '🟢' },
      pivoted: { label: 'Pivoté', class: 'bg-yellow-100 text-yellow-700', icon: '🔄' },
      sold: { label: 'Vendu', class: 'bg-accent/10 text-accent', icon: '💰' },
      closed: { label: 'Fermé', class: 'bg-red-100 text-red-700', icon: '🔴' },
    };
    
    const config = statusConfig[business.status];
    
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${config.class} flex items-center gap-2`}>
        <span>{config.icon}</span>
        {config.label}
      </span>
    );
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl">{business.logo}</span>
            <div>
              <h1 className="text-3xl font-bold text-text-primary">{business.name}</h1>
              <p className="text-text-secondary">{business.tagline}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 mt-4">
            {getStatusBadge()}
            <span className="text-sm text-text-secondary">
              {business.industry}
            </span>
          </div>
        </div>
      </div>

      {/* Histoire du Projet */}
      <div className="bg-gradient-to-r from-gray-50 to-white rounded-card shadow-card p-6 mb-8 border-l-4 border-accent">
        <h2 className="text-xl font-bold text-text-primary mb-3 flex items-center gap-2">
          <span className="text-2xl">📖</span>
          L'Histoire
        </h2>
        <div className="space-y-3 text-text-secondary leading-relaxed">
          <p>
            {business.name === 'FitTracker' && 
              "FitTracker est né d'une frustration personnelle : impossible de trouver une app de fitness simple et motivante. Après 6 mois de développement nocturne, j'ai lancé la première version en janvier 2019. Le pivot B2B est arrivé quand des salles de sport ont commencé à me contacter pour une version white-label."
            }
            {business.name === 'EcoMarket' && 
              "EcoMarket a démarré comme une marketplace C2C pour produits éco-responsables. Après 3 mois sans traction, j'ai pivoté vers le B2B en proposant aux marques éthiques une solution e-commerce clé en main. Ce pivot a tout changé : 50K€ de contrat avec Carrefour Bio en 6 mois."
            }
            {business.name === 'TaskMaster' && 
              "TaskMaster était mon projet le plus ambitieux : révolutionner la gestion de projet avec l'IA. Malgré 30K€ investis et une équipe de 3 personnes, nous n'avons jamais trouvé le product-market fit. L'échec m'a appris l'importance de valider avant de construire."
            }
            {business.name === 'NoCodeur' && 
              "NoCodeur est ma réponse au mouvement no-code. Lancé en 2021, j'aide les entrepreneurs non-techniques à créer leurs MVPs sans coder. La communauté compte aujourd'hui 500+ membres actifs et génère 3K€ MRR en formations et templates."
            }
          </p>
          <p className="italic text-sm">
            {business.name === 'FitTracker' && 
              "💡 Leçon clé : Écouter ses utilisateurs peut transformer complètement la trajectoire d'un produit."
            }
            {business.name === 'EcoMarket' && 
              "💡 Leçon clé : Un pivot rapide basé sur des signaux marché peut sauver une startup."
            }
            {business.name === 'TaskMaster' && 
              "💡 Leçon clé : Fail fast, learn faster. Chaque échec est une masterclass déguisée."
            }
            {business.name === 'NoCodeur' && 
              "💡 Leçon clé : Construire une communauté avant le produit crée une demande organique."
            }
          </p>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <MetricCard
          title="Revenue Total"
          value={formatCurrency(business.metrics.totalRevenue)}
          change={calculateGrowth()}
          changeType={parseFloat(calculateGrowth()) > 0 ? 'increase' : 'decrease'}
          icon={DollarSign}
          iconColor="text-accent"
          subtitle="Depuis le lancement"
        />
        
        <MetricCard
          title="Dépenses Totales"
          value={formatCurrency(business.metrics.totalExpenses)}
          change="2.4%"
          changeType="decrease"
          icon={TrendingUp}
          iconColor="text-red-600"
          subtitle="Optimisation continue"
        />
        
        <MetricCard
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="MRR"
            value={formatCurrency(business.metrics.mrr)}
            change="15%"
            changeType="increase"
            icon={Activity}
            iconColor="text-indigo-600"
            subtitle={`ARR: ${formatCurrency(business.metrics.arr)}`}
          />
          
          <MetricCard
            title="LTV / CAC"
            value={(business.metrics.ltv / business.metrics.cac).toFixed(1) + 'x'}
            icon={Target}
            iconColor="text-orange-600"
            subtitle={`LTV: ${formatCurrency(business.metrics.ltv)}`}
          />
          
          <MetricCard
            title="Churn Rate"
            value={business.metrics.churnRate + '%'}
            changeType={business.metrics.churnRate < 5 ? 'increase' : 'decrease'}
            icon={Zap}
            iconColor="text-yellow-600"
            subtitle="Mensuel"
          />
          
          <MetricCard
            title="Runway"
            value={business.metrics.runway + ' mois'}
            icon={Clock}
            iconColor="text-teal-600"
            subtitle={`Burn: ${formatCurrency(business.metrics.burnRate)}/mois`}
          />
        </div>
      )}

      {/* Charts */}
      <div className="mb-8">
        <RevenueChart data={business.monthlyData} />
      </div>

      {/* Milestones & Lessons */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-card shadow-card p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Milestones Clés</h3>
          <div className="space-y-3">
            {business.milestones.map((milestone) => (
              <div key={milestone.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  milestone.impact === 'critical' ? 'bg-red-500' :
                  milestone.impact === 'high' ? 'bg-orange-500' :
                  milestone.impact === 'medium' ? 'bg-yellow-500' :
                  'bg-gray-500'
                }`} />
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-text-primary">{milestone.title}</p>
                      <p className="text-sm text-text-secondary mt-1">{milestone.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-card shadow-card p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Lessons Learned</h3>
          <div className="space-y-3">
            {business.lessonsLearned.map((lesson, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                <span className="text-blue-600 font-bold">💡</span>
                <p className="text-sm text-text-primary">{lesson}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}