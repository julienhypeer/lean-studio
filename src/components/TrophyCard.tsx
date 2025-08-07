import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';

interface TrophyCardProps {
  trophy: {
    id: string;
    project?: string;
    icon: string;
    title: string;
    description: string;
    rarity: 'bronze' | 'silver' | 'gold' | 'platinum';
    unlockDate?: string;
    progress?: number;
    category: string;
    detail: string;
  };
  onClick: () => void;
}

export default function TrophyCard({ trophy, onClick }: TrophyCardProps) {
  const getRarityConfig = () => {
    const configs = {
      bronze: { 
        color: 'from-amber-600 to-amber-800',
        bgColor: 'from-amber-50 to-amber-100',
        textColor: 'text-amber-700',
        borderColor: 'border-amber-200',
        name: 'Bronze'
      },
      silver: { 
        color: 'from-gray-400 to-gray-600',
        bgColor: 'from-gray-50 to-gray-100',
        textColor: 'text-gray-700',
        borderColor: 'border-gray-200',
        name: 'Argent'
      },
      gold: { 
        color: 'from-yellow-400 to-yellow-600',
        bgColor: 'from-yellow-50 to-yellow-100',
        textColor: 'text-yellow-700',
        borderColor: 'border-yellow-200',
        name: 'Or'
      },
      platinum: { 
        color: 'from-blue-400 to-purple-600',
        bgColor: 'from-blue-50 to-purple-100',
        textColor: 'text-purple-700',
        borderColor: 'border-purple-200',
        name: 'Platine'
      }
    };
    
    return configs[trophy.rarity];
  };

  const config = getRarityConfig();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ 
        scale: 1.02, 
        boxShadow: trophy.rarity === 'platinum' 
          ? '0 20px 40px rgba(59, 130, 246, 0.3)' 
          : '0 10px 30px rgba(0, 0, 0, 0.1)' 
      }}
      onClick={onClick}
      className={`
        relative cursor-pointer bg-white rounded-xl p-4 h-full
        border-2 ${config.borderColor} hover:shadow-xl transition-all duration-300
        ${trophy.rarity === 'platinum' ? 'animate-pulse' : ''}
      `}
    >
      {/* Rarity badge */}
      <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${config.bgColor} ${config.textColor}`}>
        {config.name}
      </div>

      {/* Trophy Icon */}
      <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${config.color} flex items-center justify-center mb-3 relative overflow-hidden`}>
        {trophy.rarity === 'platinum' && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 animate-pulse" />
        )}
        <div className="relative z-10">
          <span className="text-3xl">{trophy.icon}</span>
        </div>
      </div>

      {/* Trophy Info */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-slate-900 line-clamp-2">
          {trophy.title}
        </h3>
        
        <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
          {trophy.description}
        </p>

        {/* Project badge if applicable */}
        {trophy.project && (
          <div className="flex items-center gap-1.5 mt-2">
            <div className="w-4 h-4 bg-slate-100 rounded-full flex items-center justify-center">
              <Trophy className="w-2.5 h-2.5 text-slate-500" />
            </div>
            <span className="text-xs text-slate-400">{trophy.project}</span>
          </div>
        )}

        {/* Progress bar for progressive trophies */}
        {trophy.progress !== undefined && (
          <div className="mt-3">
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full bg-gradient-to-r ${config.color}`}
                style={{ width: `${trophy.progress}%` }}
              />
            </div>
            <p className="text-xs text-slate-400 mt-1">{trophy.progress}%</p>
          </div>
        )}

        {/* Unlock date */}
        {trophy.unlockDate && (
          <div className="text-xs text-slate-400 mt-2">
            Débloqué le {trophy.unlockDate}
          </div>
        )}
      </div>

      {/* Shine effect for gold and platinum */}
      {(trophy.rarity === 'gold' || trophy.rarity === 'platinum') && (
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-xl pointer-events-none" />
      )}
    </motion.div>
  );
}