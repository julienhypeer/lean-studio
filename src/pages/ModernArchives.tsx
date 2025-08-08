import { useState } from 'react';
import { AlertCircle, CheckCircle, X } from 'lucide-react';
import { Business } from '../types/business';
import { motion, AnimatePresence } from 'framer-motion';

interface ModernArchivesProps {
  business: Business;
}

export default function ModernArchives({ business }: ModernArchivesProps) {
  const [activeTab, setActiveTab] = useState<'gallery' | 'timeline'>('gallery');
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


  return (
    <div className="min-h-screen bg-slate-50 p-6">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="flex flex-col items-center text-center">
            {business.logoFull || business.logo?.startsWith('/') ? (
              <img 
                src={business.logoFull || business.logo} 
                alt={business.name}
                className="w-32 h-32 rounded-lg object-cover mb-3"
              />
            ) : (
              <span className="text-6xl mb-3">{business.logo}</span>
            )}
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Archives - {business.name}</h1>
            <p className="text-base text-slate-600">Documentation et historique du projet</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mt-4 bg-white border border-slate-200 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('gallery')}
            className={`px-4 py-2 text-xs font-medium uppercase tracking-wider rounded-md transition-all ${
              activeTab === 'gallery'
                ? 'bg-slate-900 text-white'
                : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
            }`}
          >
            Galerie
          </button>
          <button
            onClick={() => setActiveTab('timeline')}
            className={`px-4 py-2 text-xs font-medium uppercase tracking-wider rounded-md transition-all ${
              activeTab === 'timeline'
                ? 'bg-slate-900 text-white'
                : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
            }`}
          >
            Chronologie
          </button>
        </div>
      </motion.div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'gallery' && (
          <motion.div
            key="gallery"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {galleryImages.map((image) => (
                <motion.div 
                  key={image.id}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white border border-slate-200 rounded-lg overflow-hidden cursor-pointer group"
                  onClick={() => setSelectedImage(image.url)}
                >
                  <div className="aspect-[4/3] overflow-hidden bg-slate-100">
                    <img 
                      src={image.url} 
                      alt={image.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="text-sm font-medium text-slate-800">{image.title}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">{image.category}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
              {selectedImage && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
                  onClick={() => setSelectedImage(null)}
                >
                  <motion.div 
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.9 }}
                    className="max-w-4xl max-h-[90vh] relative"
                  >
                    <img 
                      src={selectedImage} 
                      alt="Full size" 
                      className="max-w-full max-h-full object-contain rounded-lg"
                    />
                    <button 
                      onClick={() => setSelectedImage(null)}
                      className="absolute top-4 right-4 w-8 h-8 bg-white/10 backdrop-blur rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}


        {activeTab === 'timeline' && (
          <motion.div
            key="timeline"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="relative"
          >
            <div className="absolute left-6 top-0 bottom-0 w-px bg-slate-200"></div>
            <div className="space-y-4">
              {keyEvents.map((event) => (
                <motion.div 
                  key={event.id} 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="relative flex items-start gap-4"
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center z-10 ${
                    event.type === 'success' ? 'bg-green-50 border-2 border-green-200' : 'bg-yellow-50 border-2 border-yellow-200'
                  }`}>
                    {event.type === 'success' ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-yellow-600" />
                    )}
                  </div>
                  <div className="flex-1 bg-white border border-slate-200 rounded-lg p-4">
                    <h3 className="text-sm font-semibold text-slate-900">{event.title}</h3>
                    <p className="text-xs text-slate-500 mt-1">{event.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}