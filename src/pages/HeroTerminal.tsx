import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { AuroraBackground } from '../components/AuroraBackground';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HeroTerminal() {
  const navigate = useNavigate();
  
  const logos = [
    { emoji: '🚀', name: 'NoCodeur' },
    { emoji: '🌱', name: 'EcoDeliver' },
    { emoji: '💪', name: 'FitTracker' },
    { emoji: '👨‍🍳', name: 'LocalChef' },
    { emoji: '📊', name: 'DataBoost' },
    { emoji: '🎯', name: 'TargetAI' },
  ];

  const [visibleLogos, setVisibleLogos] = useState<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Ajouter des logos aléatoirement
      const randomIndex = Math.floor(Math.random() * logos.length);
      setVisibleLogos(prev => {
        const newVisible = [...prev];
        if (!newVisible.includes(randomIndex)) {
          newVisible.push(randomIndex);
        }
        
        // Limiter à 3-4 logos visibles maximum
        if (newVisible.length > 3) {
          newVisible.shift(); // Supprimer le plus ancien
        }
        
        return newVisible;
      });
    }, 2000); // Nouveau logo toutes les 2 secondes

    const removeInterval = setInterval(() => {
      // Retirer des logos aléatoirement
      setVisibleLogos(prev => {
        if (prev.length > 0) {
          const randomRemove = Math.floor(Math.random() * prev.length);
          return prev.filter((_, index) => index !== randomRemove);
        }
        return prev;
      });
    }, 3000); // Retirer un logo toutes les 3 secondes

    return () => {
      clearInterval(interval);
      clearInterval(removeInterval);
    };
  }, []);

  const handleExplore = () => {
    navigate('/portfolio', { state: { animate: true } });
  };

  return (
    <AuroraBackground>
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <div className="text-center animate-fadeIn">
          <h1 className="text-6xl md:text-7xl font-bold text-black mb-6">
            Lean Studio
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-10 max-w-2xl mx-auto">
            4 startups lancées, 1 exit réussi, des leçons invaluables
          </p>
          <button
            onClick={handleExplore}
            className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-white font-semibold rounded-lg hover:bg-primary-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Explorer le Portfolio
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Logo Carousel with Fade Effect */}
        <div className="mt-20 w-full max-w-6xl mx-auto">
          <div className="relative h-20 flex items-center justify-center">
            <div className="grid grid-cols-6 gap-8 w-full max-w-4xl mx-auto">
              {logos.map((logo, index) => (
                <div key={index} className="flex items-center justify-center h-16 relative">
                  <AnimatePresence mode="wait">
                    {visibleLogos.includes(index) && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.9 }}
                        transition={{ 
                          duration: 0.6,
                          ease: "easeInOut"
                        }}
                        className="flex items-center justify-center absolute inset-0"
                      >
                        <div className="flex flex-col items-center">
                          <span className="text-3xl mb-1 grayscale hover:grayscale-0 transition-all duration-300">
                            {logo.emoji}
                          </span>
                          <span className="text-xs text-gray-600 font-medium opacity-70">
                            {logo.name}
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
          <div className="text-center mt-8">
            <p className="text-sm text-gray-500">
              Portfolio de startups • Méthodologie Lean
            </p>
          </div>
        </div>
      </div>
    </AuroraBackground>
  );
}