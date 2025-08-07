import { useState } from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { Business } from '../types/business';

interface ArchivesProps {
  business: Business;
}

export default function Archives({ business }: ArchivesProps) {
  const [activeTab, setActiveTab] = useState<'gallery' | 'metrics' | 'timeline'>('gallery');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Example screenshots/photos - replace with actual business images
  const galleryImages = [
    { id: 1, url: 'https://via.placeholder.com/400x300/FF6B35/FFFFFF?text=Landing+Page', title: 'Landing Page', category: 'Design' },
    { id: 2, url: 'https://via.placeholder.com/400x300/4A5568/FFFFFF?text=Dashboard+V1', title: 'Dashboard V1', category: 'Product' },
    { id: 3, url: 'https://via.placeholder.com/400x300/10B981/FFFFFF?text=Team+Photo', title: 'Team Photo', category: 'Équipe' },
    { id: 4, url: 'https://via.placeholder.com/400x300/3B82F6/FFFFFF?text=Mobile+App', title: 'Mobile App', category: 'Product' },
    { id: 5, url: 'https://via.placeholder.com/400x300/8B5CF6/FFFFFF?text=Pitch+Deck', title: 'Pitch Deck', category: 'Présentation' },
    { id: 6, url: 'https://via.placeholder.com/400x300/EF4444/FFFFFF?text=Marketing', title: 'Campaign Banner', category: 'Marketing' },
    { id: 7, url: 'https://via.placeholder.com/400x300/F59E0B/FFFFFF?text=Analytics', title: 'Analytics View', category: 'Product' },
    { id: 8, url: 'https://via.placeholder.com/400x300/14B8A6/FFFFFF?text=Event', title: 'Launch Event', category: 'Événement' },
    { id: 9, url: 'https://via.placeholder.com/400x300/EC4899/FFFFFF?text=Features', title: 'Features Page', category: 'Design' },
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
            onClick={() => setActiveTab('gallery')}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === 'gallery'
                ? 'text-accent border-b-2 border-accent'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            🖼️ Galerie
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
      {activeTab === 'gallery' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image) => (
              <div 
                key={image.id} 
                className="bg-white rounded-card shadow-card overflow-hidden hover:shadow-hover transition-all cursor-pointer group"
                onClick={() => setSelectedImage(image.url)}
              >
                <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                  <img 
                    src={image.url} 
                    alt={image.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-text-primary mb-1">{image.title}</h3>
                  <p className="text-sm text-text-secondary">{image.category}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Lightbox Modal */}
          {selectedImage && (
            <div 
              className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
              onClick={() => setSelectedImage(null)}
            >
              <div className="max-w-4xl max-h-[90vh] relative">
                <img 
                  src={selectedImage} 
                  alt="Full size" 
                  className="max-w-full max-h-full object-contain rounded-lg"
                />
                <button 
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/10 backdrop-blur rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>
          )}
        </>
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