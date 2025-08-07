import { useState } from 'react';
import { Calendar, FileText, Trophy, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { Business } from '../types/business';

interface ArchivesProps {
  business: Business;
}

export default function Archives({ business }: ArchivesProps) {
  const [activeTab, setActiveTab] = useState<'documents' | 'metrics' | 'timeline'>('documents');

  const documents = [
    { id: 1, name: 'Business Plan Initial', type: 'PDF', size: '2.4 MB', icon: FileText, category: 'Stratégie' },
    { id: 2, name: 'Étude de Marché', type: 'XLSX', size: '1.8 MB', icon: TrendingUp, category: 'Analyse' },
    { id: 3, name: 'Contrats Clients', type: 'ZIP', size: '15.2 MB', icon: Trophy, category: 'Commercial' },
    { id: 4, name: 'Bilans Financiers', type: 'PDF', size: '3.1 MB', icon: FileText, category: 'Finance' },
    { id: 5, name: 'Présentations Investisseurs', type: 'PPT', size: '8.7 MB', icon: Trophy, category: 'Levée de fonds' },
  ];

  const keyEvents = [
    { id: 1, title: 'Lancement officiel', type: 'success', description: 'Première version publique mise en ligne' },
    { id: 2, title: 'Pivot stratégique', type: 'warning', description: 'Passage de B2C à B2B après analyse du marché' },
    { id: 3, title: '1000 premiers clients', type: 'success', description: 'Milestone symbolique atteint en 6 mois' },
    { id: 4, title: 'Levée de fonds Seed', type: 'success', description: '250K€ levés auprès de business angels' },
    { id: 5, title: 'Crise de croissance', type: 'warning', description: 'Problèmes de scalabilité technique résolus' },
    { id: 6, title: 'Exit réussi', type: 'success', description: 'Acquisition par un groupe leader du secteur' },
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-4xl">{business.logo}</span>
          <div>
            <h1 className="text-3xl font-bold text-text-primary">Archives - {business.name}</h1>
            <p className="text-text-secondary">Documentation et historique du projet</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mt-6 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('documents')}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === 'documents'
                ? 'text-accent border-b-2 border-accent'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            📄 Documents
          </button>
          <button
            onClick={() => setActiveTab('metrics')}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === 'metrics'
                ? 'text-accent border-b-2 border-accent'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            📊 Métriques Historiques
          </button>
          <button
            onClick={() => setActiveTab('timeline')}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === 'timeline'
                ? 'text-accent border-b-2 border-accent'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            🗓️ Chronologie
          </button>
        </div>
      </div>

      {/* Content */}
      {activeTab === 'documents' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documents.map((doc) => (
            <div key={doc.id} className="bg-white rounded-card shadow-card p-6 hover:shadow-hover transition-shadow cursor-pointer">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <doc.icon className="w-6 h-6 text-accent" />
                </div>
                <span className="text-xs text-text-secondary bg-gray-100 px-2 py-1 rounded">
                  {doc.type}
                </span>
              </div>
              <h3 className="font-semibold text-text-primary mb-1">{doc.name}</h3>
              <p className="text-sm text-text-secondary mb-3">{doc.category}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-text-secondary">{doc.size}</span>
                <button className="text-accent hover:text-primary-600 text-sm font-medium">
                  Télécharger
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'metrics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-card shadow-card p-6">
              <h4 className="text-sm font-medium text-text-secondary mb-2">Durée de vie</h4>
              <p className="text-2xl font-bold text-text-primary">
                {business.endDate 
                  ? `${Math.round((new Date(business.endDate).getTime() - new Date(business.startDate).getTime()) / (1000 * 60 * 60 * 24 * 30))} mois`
                  : 'En cours'}
              </p>
            </div>
            <div className="bg-white rounded-card shadow-card p-6">
              <h4 className="text-sm font-medium text-text-secondary mb-2">ROI Total</h4>
              <p className="text-2xl font-bold text-green-600">
                {((business.metrics.totalRevenue - business.metrics.totalExpenses) / business.metrics.totalExpenses * 100).toFixed(0)}%
              </p>
            </div>
            <div className="bg-white rounded-card shadow-card p-6">
              <h4 className="text-sm font-medium text-text-secondary mb-2">Marge Nette</h4>
              <p className="text-2xl font-bold text-text-primary">
                {formatCurrency(business.metrics.totalRevenue - business.metrics.totalExpenses)}
              </p>
            </div>
            <div className="bg-white rounded-card shadow-card p-6">
              <h4 className="text-sm font-medium text-text-secondary mb-2">Efficacité CAC</h4>
              <p className="text-2xl font-bold text-accent">
                {(business.metrics.ltv / business.metrics.cac).toFixed(1)}x
              </p>
            </div>
          </div>

          <div className="bg-white rounded-card shadow-card p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Évolution des métriques clés</h3>
            <div className="space-y-4">
              {business.monthlyData.slice(-6).map((month, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-text-secondary">{month.month}</span>
                  <div className="flex gap-8">
                    <div>
                      <span className="text-xs text-text-secondary">Revenue</span>
                      <p className="font-semibold text-text-primary">{formatCurrency(month.revenue)}</p>
                    </div>
                    <div>
                      <span className="text-xs text-text-secondary">Dépenses</span>
                      <p className="font-semibold text-text-primary">{formatCurrency(month.expenses)}</p>
                    </div>
                    <div>
                      <span className="text-xs text-text-secondary">Clients</span>
                      <p className="font-semibold text-text-primary">{month.customers}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'timeline' && (
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300"></div>
          <div className="space-y-6">
            {keyEvents.map((event) => (
              <div key={event.id} className="relative flex items-start gap-6">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl z-10 ${
                  event.type === 'success' ? 'bg-green-100' : 'bg-yellow-100'
                }`}>
                  {event.type === 'success' ? (
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  ) : (
                    <AlertCircle className="w-8 h-8 text-yellow-600" />
                  )}
                </div>
                <div className="flex-1 bg-white rounded-card shadow-card p-6">
                  <h3 className="text-lg font-semibold text-text-primary mb-2">{event.title}</h3>
                  <p className="text-text-secondary">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}