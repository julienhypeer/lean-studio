import { mockBusinesses } from '../data/mockData';
import { TrendingUp, Users, DollarSign, Trophy, ArrowRight, Rocket } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Portfolio() {
  const navigate = useNavigate();
  
  // Calcul des stats globales
  const totalRevenue = mockBusinesses.reduce((acc, b) => acc + b.metrics.totalRevenue, 0);
  const totalUsers = mockBusinesses.reduce((acc, b) => acc + b.metrics.totalCustomers, 0);
  const exitValue = mockBusinesses.filter(b => b.status === 'sold').reduce((acc) => acc + 450000, 0); // Valeur de sortie FitTracker

  const stats = [
    { 
      label: 'Business Lancés', 
      value: mockBusinesses.length, 
      icon: Rocket, 
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    { 
      label: 'Revenue Total', 
      value: `€${(totalRevenue / 1000).toFixed(0)}K`, 
      icon: DollarSign, 
      color: 'text-black',
      bgColor: 'bg-gray-100'
    },
    { 
      label: 'Utilisateurs', 
      value: `${(totalUsers / 1000).toFixed(0)}K+`, 
      icon: Users, 
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    { 
      label: 'Valeur des Exits', 
      value: `€${(exitValue / 1000).toFixed(0)}K`, 
      icon: Trophy, 
      color: 'text-black',
      bgColor: 'bg-gray-100'
    },
  ];

  const getStatusBadge = (status: string) => {
    const configs = {
      active: { label: 'Actif', class: 'bg-green-100 text-green-700', icon: '🟢' },
      pivoted: { label: 'Pivoté', class: 'bg-yellow-100 text-yellow-700', icon: '🔄' },
      sold: { label: 'Vendu', class: 'bg-accent/10 text-accent', icon: '💰' },
      closed: { label: 'Fermé', class: 'bg-red-100 text-red-700', icon: '🔴' },
    };
    
    const config = configs[status as keyof typeof configs];
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.class} flex items-center gap-1`}>
        <span className="text-sm">{config.icon}</span>
        {config.label}
      </span>
    );
  };

  const handleBusinessClick = (businessId: string) => {
    // Naviguer vers le dashboard avec le business sélectionné
    navigate(`/dashboard?business=${businessId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative px-8 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center">
                <Rocket className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-5xl font-bold">Lean Studio</h1>
                <p className="text-xl text-white/80 mt-1">Portfolio Entrepreneurial • Track Record</p>
              </div>
            </div>
            
            <p className="text-lg text-white/90 mt-6 max-w-3xl leading-relaxed">
              Découvrez mon parcours entrepreneurial à travers {mockBusinesses.length} ventures lancées 
              avec la méthodologie Lean Startup. De l'idéation à l'exit, chaque projet raconte une histoire 
              d'innovation, d'apprentissage et de croissance.
            </p>

            <div className="flex gap-4 mt-8">
              <button 
                onClick={() => navigate('/dashboard')}
                className="px-6 py-3 bg-accent text-white rounded-lg font-semibold hover:bg-primary-600 transition-colors flex items-center gap-2"
              >
                Explorer le Dashboard
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="px-6 py-3 bg-white/20 backdrop-blur text-white rounded-lg font-semibold hover:bg-white/30 transition-colors">
                Voir la Timeline
              </button>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-accent/20 rounded-full blur-3xl"></div>
      </div>

      {/* Stats Section */}
      <div className="px-8 -mt-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-card shadow-card p-6 hover:shadow-hover transition-shadow">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-text-secondary">{stat.label}</p>
                    <p className="text-3xl font-bold text-text-primary mt-2">{stat.value}</p>
                  </div>
                  <div className={`${stat.bgColor} p-3 rounded-lg`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="px-8 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-text-primary mb-8">Timeline des Projets</h2>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300"></div>
            
            {/* Timeline items */}
            <div className="space-y-8">
              {mockBusinesses.map((business) => (
                <div key={business.id} className="relative flex items-start gap-6">
                  {/* Timeline dot */}
                  <div className="relative z-10">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl
                      ${business.status === 'active' ? 'bg-green-100' : 
                        business.status === 'sold' ? 'bg-accent/20' : 
                        business.status === 'pivoted' ? 'bg-yellow-100' : 'bg-red-100'}`}>
                      {business.logo}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 bg-white rounded-card shadow-card p-6 hover:shadow-hover transition-shadow">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-text-primary">{business.name}</h3>
                        <p className="text-text-secondary mt-1">{business.tagline}</p>
                        <div className="flex items-center gap-4 mt-3">
                          {getStatusBadge(business.status)}
                          <span className="text-sm text-text-secondary">
                            {new Date(business.startDate).toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' })}
                            {business.endDate && ` - ${new Date(business.endDate).toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' })}`}
                          </span>
                          <span className="text-sm text-text-secondary">{business.industry}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-text-secondary">Revenue</p>
                        <p className="text-xl font-bold text-text-primary">
                          €{(business.metrics.totalRevenue / 1000).toFixed(0)}K
                        </p>
                      </div>
                    </div>
                    
                    {/* Key metrics */}
                    <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t">
                      <div>
                        <p className="text-xs text-text-secondary">Clients</p>
                        <p className="text-sm font-semibold">{business.metrics.totalCustomers.toLocaleString()}</p>
                      </div>
                      {business.status === 'active' && (
                        <>
                          <div>
                            <p className="text-xs text-text-secondary">MRR</p>
                            <p className="text-sm font-semibold">€{business.metrics.mrr.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-xs text-text-secondary">Runway</p>
                            <p className="text-sm font-semibold">{business.metrics.runway} mois</p>
                          </div>
                        </>
                      )}
                      {business.status === 'sold' && (
                        <div className="col-span-2">
                          <p className="text-xs text-text-secondary">Exit Value</p>
                          <p className="text-sm font-semibold text-accent">€450K</p>
                        </div>
                      )}
                      {business.status === 'pivoted' && (
                        <div className="col-span-2">
                          <p className="text-xs text-text-secondary">Pivot</p>
                          <p className="text-sm font-semibold">B2C → B2B</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Business Grid Section */}
      <div className="px-8 py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-text-primary">Portfolio Détaillé</h2>
            <button 
              onClick={() => navigate('/dashboard')}
              className="text-accent hover:text-primary-600 font-medium flex items-center gap-2"
            >
              Voir tous les détails
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockBusinesses.map((business) => (
              <div 
                key={business.id}
                onClick={() => handleBusinessClick(business.id)}
                className="bg-white rounded-card shadow-card p-6 hover:shadow-hover transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{business.logo}</span>
                    <div>
                      <h3 className="text-lg font-semibold text-text-primary group-hover:text-accent transition-colors">
                        {business.name}
                      </h3>
                      <p className="text-sm text-text-secondary">{business.industry}</p>
                    </div>
                  </div>
                  {getStatusBadge(business.status)}
                </div>
                
                <p className="text-text-secondary text-sm mb-4">{business.tagline}</p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-text-secondary mb-1">
                      <TrendingUp className="w-4 h-4" />
                      <p className="text-xs">Revenue</p>
                    </div>
                    <p className="text-lg font-semibold text-text-primary">
                      €{(business.metrics.totalRevenue / 1000).toFixed(0)}K
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-text-secondary mb-1">
                      <Users className="w-4 h-4" />
                      <p className="text-xs">Utilisateurs</p>
                    </div>
                    <p className="text-lg font-semibold text-text-primary">
                      {(business.metrics.totalCustomers / 1000).toFixed(1)}K
                    </p>
                  </div>
                </div>

                {/* Lesson highlight */}
                {business.lessonsLearned.length > 0 && (
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-xs text-text-secondary mb-2">💡 Key Learning</p>
                    <p className="text-sm text-text-primary italic">
                      "{business.lessonsLearned[0]}"
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="px-8 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-text-primary mb-4">
            Prêt à Explorer le Portfolio ?
          </h2>
          <p className="text-lg text-text-secondary mb-8">
            Découvrez les métriques détaillées, les milestones et les lessons learned de chaque projet.
          </p>
          <button 
            onClick={() => navigate('/dashboard')}
            className="px-8 py-4 bg-black text-white rounded-lg font-semibold hover:bg-gray-900 transition-colors inline-flex items-center gap-2"
          >
            Accéder au Dashboard Complet
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}