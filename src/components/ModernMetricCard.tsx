import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface ModernMetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'increase' | 'decrease' | 'neutral';
  icon: LucideIcon;
  iconColor?: string;
  subtitle?: string;
}

export default function ModernMetricCard({ 
  title, 
  value, 
  change, 
  changeType = 'neutral',
  icon: Icon,
  iconColor = 'text-slate-600',
  subtitle
}: ModernMetricCardProps) {
  const getChangeColor = () => {
    switch (changeType) {
      case 'increase':
        return 'text-green-600';
      case 'decrease':
        return 'text-red-600';
      default:
        return 'text-slate-500';
    }
  };

  const getChangeSymbol = () => {
    switch (changeType) {
      case 'increase':
        return '↑';
      case 'decrease':
        return '↓';
      default:
        return '•';
    }
  };

  return (
    <motion.div 
      whileHover={{ y: -2 }}
      className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-md transition-all duration-200"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 bg-slate-50 rounded-lg">
              <Icon className={`w-4 h-4 ${iconColor}`} />
            </div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{title}</p>
          </div>
          <div className="mt-2">
            <p className="text-2xl font-semibold text-slate-900">{value}</p>
            {subtitle && (
              <p className="text-xs text-slate-400 mt-1">{subtitle}</p>
            )}
          </div>
          {change && (
            <div className={`flex items-center gap-1 mt-2 text-xs ${getChangeColor()}`}>
              <span className="font-medium">{getChangeSymbol()} {change}</span>
              <span className="text-slate-400">vs mois dernier</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}