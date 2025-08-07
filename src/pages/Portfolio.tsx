import { mockBusinesses } from '../data/mockData';
import { TrendingUp, Users, DollarSign, Trophy, ArrowRight, Rocket, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

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
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    { 
      label: 'Revenue Total', 
      value: `€${(totalRevenue / 1000).toFixed(0)}K`, 
      icon: DollarSign, 
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    { 
      label: 'Utilisateurs', 
      value: `${(totalUsers / 1000).toFixed(0)}K+`, 
      icon: Users, 
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    { 
      label: 'Valeur des Exits', 
      value: `€${(exitValue / 1000).toFixed(0)}K`, 
      icon: Trophy, 
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
  ];

  const getStatusBadge = (status: string) => {
    const configs = {
      active: { label: 'Actif', class: 'bg-green-50 text-green-700 border-green-200', icon: '🟢' },
      pivoted: { label: 'Pivoté', class: 'bg-yellow-50 text-yellow-700 border-yellow-200', icon: '🔄' },
      sold: { label: 'Vendu', class: 'bg-blue-50 text-blue-700 border-blue-200', icon: '💰' },
      closed: { label: 'Fermé', class: 'bg-red-50 text-red-700 border-red-200', icon: '🔴' },
    };
    
    const config = configs[status as keyof typeof configs];
    return (
      <span className={`px-2 py-1 rounded-md text-xs font-medium border ${config.class} flex items-center gap-1`}>
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
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white"
      >
        <div className="absolute inset-0 bg-slate-900/20"></div>
        <div className="relative px-6 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold">Timeline Portfolio</h1>
                <p className="text-xl text-slate-300 mt-1">Parcours entrepreneurial • Lean Studio</p>
              </div>
            </div>
            
            <p className="text-lg text-slate-200 mt-6 max-w-3xl leading-relaxed">
              Découvrez mon parcours entrepreneurial à travers {mockBusinesses.length} ventures lancées 
              avec la méthodologie Lean Startup. De l'idéation à l'exit, chaque projet raconte une histoire 
              d'innovation, d'apprentissage et de croissance.
            </p>

            <div className="flex gap-4 mt-8">
              <button 
                onClick={() => navigate('/dashboard')}
                className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold transition-colors flex items-center gap-2"
              >
                Explorer le Dashboard
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="px-6 py-3 bg-white/10 backdrop-blur hover:bg-white/20 text-white rounded-lg font-semibold transition-colors">
                Voir les Trophées
              </button>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-slate-600/20 rounded-full blur-3xl"></div>
      </motion.div>

      {/* Stats Section */}
      <div className="px-6 -mt-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {stats.map((stat, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-slate-900 mt-2">{stat.value}</p>
                  </div>
                  <div className={`${stat.bgColor} p-3 rounded-lg`}>
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3"
          >
            <Clock className="w-8 h-8 text-orange-500" />
            Timeline des Projets
          </motion.h2>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-200"></div>
            
            {/* Timeline items */}
            <div className="space-y-8">
              {mockBusinesses.map((business, index) => (
                <motion.div 
                  key={business.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="relative flex items-start gap-6"
                >
                  {/* Timeline dot */}
                  <div className="relative z-10">
                    <div className={`w-16 h-16 rounded-xl flex items-center justify-center text-2xl border-4 border-white shadow-lg
                      ${business.status === 'active' ? 'bg-green-100' : 
                        business.status === 'sold' ? 'bg-blue-100' : 
                        business.status === 'pivoted' ? 'bg-yellow-100' : 'bg-red-100'}`}>
                      {business.logo}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-slate-900">{business.name}</h3>
                        <p className="text-slate-600 mt-1">{business.tagline}</p>
                        <div className="flex items-center gap-4 mt-3">
                          {getStatusBadge(business.status)}
                          <span className="text-sm text-slate-500">
                            {new Date(business.startDate).toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' })}
                            {business.endDate && ` - ${new Date(business.endDate).toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' })}`}
                          </span>
                          <span className="text-sm text-slate-500 bg-slate-100 px-2 py-1 rounded-md">{business.industry}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-slate-500">Revenue</p>
                        <p className="text-xl font-bold text-slate-900">
                          €{(business.metrics.totalRevenue / 1000).toFixed(0)}K
                        </p>
                      </div>
                    </div>
                    
                    {/* Key metrics */}
                    <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-slate-200">
                      <div className="bg-slate-50 rounded-lg p-3">
                        <p className="text-xs text-slate-500 uppercase tracking-wider">Clients</p>
                        <p className="text-sm font-semibold text-slate-900">{business.metrics.totalCustomers.toLocaleString()}</p>
                      </div>
                      {business.status === 'active' && (
                        <>
                          <div className="bg-slate-50 rounded-lg p-3">
                            <p className="text-xs text-slate-500 uppercase tracking-wider">MRR</p>
                            <p className="text-sm font-semibold text-slate-900">€{business.metrics.mrr.toLocaleString()}</p>
                          </div>
                          <div className="bg-slate-50 rounded-lg p-3">
                            <p className="text-xs text-slate-500 uppercase tracking-wider">Runway</p>
                            <p className="text-sm font-semibold text-slate-900">{business.metrics.runway} mois</p>
                          </div>
                        </>
                      )}
                      {business.status === 'sold' && (
                        <div className="col-span-2 bg-blue-50 rounded-lg p-3">
                          <p className="text-xs text-slate-500 uppercase tracking-wider">Exit Value</p>
                          <p className="text-sm font-semibold text-blue-700">€450K</p>
                        </div>
                      )}
                      {business.status === 'pivoted' && (
                        <div className="col-span-2 bg-yellow-50 rounded-lg p-3">
                          <p className="text-xs text-slate-500 uppercase tracking-wider">Pivot</p>
                          <p className="text-sm font-semibold text-yellow-700">B2C → B2B</p>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Business Grid Section */}
      <div className="px-6 py-16 bg-slate-100">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-between mb-8"
          >
            <h2 className="text-3xl font-bold text-slate-900">Portfolio Détaillé</h2>
            <button 
              onClick={() => navigate('/dashboard')}
              className="text-orange-500 hover:text-orange-600 font-medium flex items-center gap-2 transition-colors"
            >
              Voir tous les détails
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockBusinesses.map((business, index) => (
              <motion.div 
                key={business.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                onClick={() => handleBusinessClick(business.id)}
                className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{business.logo}</span>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 group-hover:text-orange-500 transition-colors">
                        {business.name}
                      </h3>
                      <p className="text-sm text-slate-500">{business.industry}</p>
                    </div>
                  </div>
                  {getStatusBadge(business.status)}
                </div>
                
                <p className="text-slate-600 text-sm mb-4">{business.tagline}</p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-slate-500 mb-1">
                      <TrendingUp className="w-4 h-4" />
                      <p className="text-xs uppercase tracking-wider">Revenue</p>
                    </div>
                    <p className="text-lg font-semibold text-slate-900">
                      €{(business.metrics.totalRevenue / 1000).toFixed(0)}K
                    </p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-slate-500 mb-1">
                      <Users className="w-4 h-4" />
                      <p className="text-xs uppercase tracking-wider">Utilisateurs</p>
                    </div>
                    <p className="text-lg font-semibold text-slate-900">
                      {(business.metrics.totalCustomers / 1000).toFixed(1)}K
                    </p>
                  </div>
                </div>

                {/* Lesson highlight */}
                {business.lessonsLearned.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-slate-200">
                    <p className="text-xs text-slate-500 mb-2 uppercase tracking-wider flex items-center gap-1">
                      💡 Key Learning
                    </p>
                    <p className="text-sm text-slate-700 italic">
                      "{business.lessonsLearned[0]}"
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="px-6 py-16"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Prêt à Explorer le Portfolio ?
          </h2>
          <p className="text-lg text-slate-600 mb-8">
            Découvrez les métriques détaillées, les milestones et les lessons learned de chaque projet.
          </p>
          <div className="flex gap-4 justify-center">
            <button 
              onClick={() => navigate('/dashboard')}
              className="px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-semibold transition-colors inline-flex items-center gap-2"
            >
              Accéder au Dashboard Complet
              <ArrowRight className="w-5 h-5" />
            </button>
            <button 
              onClick={() => navigate('/moments-forts')}
              className="px-8 py-4 bg-white border border-slate-300 hover:bg-slate-50 text-slate-900 rounded-lg font-semibold transition-colors inline-flex items-center gap-2"
            >
              Voir les Trophées
              <Trophy className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}