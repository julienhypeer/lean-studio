import { Lock, Eye, Crown } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface LockedMetricCardProps {
  title: string;
  variant?: 'blur' | 'dark' | 'classified' | 'minimal' | 'premium';
  hint?: string;
  icon?: React.ElementType;
  color?: string;
}

export default function LockedMetricCard({ 
  title, 
  variant = 'blur',
  hint,
  icon: Icon,
  color = 'text-slate-600'
}: LockedMetricCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const renderContent = () => {
    switch (variant) {
      case 'blur':
        return (
          <div className="relative overflow-hidden">
            {/* Fond flou avec fausses données */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-slate-100" />
            <div className="absolute inset-0 backdrop-blur-sm" />
            <div className="blur-sm select-none pointer-events-none opacity-30">
              <p className="text-2xl font-semibold text-slate-400">€•••K</p>
              <p className="text-xs text-slate-400 mt-1">+••%</p>
            </div>
            {/* Cadenas central */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ scale: isHovered ? 1.1 : 1 }}
                className="bg-white/90 rounded-full p-3 shadow-lg"
              >
                <Lock className="w-5 h-5 text-slate-500" />
              </motion.div>
            </div>
          </div>
        );

      case 'dark':
        return (
          <div className="relative">
            <div className="bg-slate-900/90 rounded-lg p-4">
              <Lock className="w-6 h-6 text-slate-400 mx-auto mb-2" />
              <p className="text-xs text-slate-400 text-center">Données confidentielles</p>
              {hint && (
                <p className="text-xs text-slate-500 text-center mt-1 italic">{hint}</p>
              )}
            </div>
          </div>
        );

      case 'classified':
        return (
          <div className="relative">
            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
              <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 py-1 rounded transform rotate-12">
                CLASSIFIED
              </div>
              <Lock className="w-6 h-6 text-red-400 mx-auto mb-2" />
              <p className="text-xs text-red-600 text-center font-bold">TOP SECRET</p>
              {hint && (
                <p className="text-xs text-red-400 text-center mt-1">{hint}</p>
              )}
            </div>
          </div>
        );

      case 'premium':
        return (
          <div className="relative">
            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-200 rounded-lg p-4">
              <Crown className="w-6 h-6 text-amber-500 mx-auto mb-2" />
              <p className="text-xs text-amber-700 text-center font-medium">Données Premium</p>
              {hint && (
                <p className="text-xs text-amber-600 text-center mt-1 italic">{hint}</p>
              )}
              <motion.div
                animate={{ opacity: isHovered ? 1 : 0.7 }}
                className="absolute inset-0 bg-gradient-to-t from-amber-100/20 to-transparent pointer-events-none"
              />
            </div>
          </div>
        );

      case 'minimal':
      default:
        return (
          <div className="relative">
            <div className="flex items-center justify-center h-16">
              <div className="text-center">
                <Lock className="w-4 h-4 text-slate-400 mx-auto mb-1" />
                <p className="text-xs text-slate-500">Confidentiel</p>
                {hint && (
                  <p className="text-xs text-slate-400 mt-1">{hint}</p>
                )}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-md transition-all duration-200 cursor-not-allowed"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          {Icon && (
            <div className="p-1.5 bg-slate-50 rounded-lg">
              <Icon className={`w-4 h-4 ${color}`} />
            </div>
          )}
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{title}</p>
        </div>
        {isHovered && variant === 'blur' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-1"
          >
            <Eye className="w-3 h-3 text-slate-400" />
            <span className="text-xs text-slate-400">Privé</span>
          </motion.div>
        )}
      </div>
      
      {renderContent()}
    </motion.div>
  );
}