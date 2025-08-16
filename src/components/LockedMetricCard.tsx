import { Lock, Eye, TrendingUp, TrendingDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface LockedMetricCardProps {
  title: string;
  valueRange?: string; // Ex: "€10K-50K"
  trend?: string; // Ex: "+15%"
  trendType?: 'increase' | 'decrease' | 'neutral';
  hint?: string;
  icon?: React.ElementType;
  color?: string;
}

export default function LockedMetricCard({ 
  title, 
  valueRange,
  trend,
  trendType = 'neutral',
  hint,
  icon: Icon,
  color = 'text-slate-600'
}: LockedMetricCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -2 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-md transition-all duration-200"
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
        {isHovered && (
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
      
      <div className="relative overflow-hidden">
        {/* Fond avec données floues */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-slate-100 opacity-50" />
        
        {/* Fourchette de valeurs visible */}
        <div className="relative z-10">
          <div className="flex items-baseline gap-2">
            <p className="text-xl font-semibold text-slate-700">
              {valueRange || "€•••K"}
            </p>
            {trend && (
              <div className={`flex items-center gap-0.5 text-sm font-medium ${
                trendType === 'increase' ? 'text-green-600' : 
                trendType === 'decrease' ? 'text-red-600' : 
                'text-slate-500'
              }`}>
                {trendType === 'increase' ? (
                  <TrendingUp className="w-3 h-3" />
                ) : trendType === 'decrease' ? (
                  <TrendingDown className="w-3 h-3" />
                ) : null}
                <span>{trend}</span>
              </div>
            )}
          </div>
          {hint && (
            <p className="text-xs text-slate-500 mt-1 italic">{hint}</p>
          )}
        </div>
        
        {/* Effet de flou subtil */}
        <div className="absolute inset-0 backdrop-blur-[1px]" />
        
        {/* Petit cadenas discret */}
        <motion.div
          animate={{ 
            scale: isHovered ? 1.1 : 1,
            opacity: isHovered ? 0.9 : 0.7
          }}
          className="absolute bottom-2 right-2"
        >
          <Lock className="w-3 h-3 text-slate-400" />
        </motion.div>
      </div>
    </motion.div>
  );
}