import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'increase' | 'decrease' | 'neutral';
  icon: LucideIcon;
  iconColor?: string;
  subtitle?: string;
}

export default function MetricCard({ 
  title, 
  value, 
  change, 
  changeType = 'neutral',
  icon: Icon,
  iconColor = 'text-primary-600',
  subtitle
}: MetricCardProps) {
  const getChangeColor = () => {
    switch (changeType) {
      case 'increase':
        return 'text-green-600';
      case 'decrease':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getChangeSymbol = () => {
    switch (changeType) {
      case 'increase':
        return '↑';
      case 'decrease':
        return '↓';
      default:
        return '';
    }
  };

  return (
    <div className="bg-white rounded-card shadow-card p-6 hover:shadow-hover transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Icon className={`w-5 h-5 ${iconColor}`} />
            <p className="text-sm font-medium text-text-secondary">{title}</p>
          </div>
          <div className="mt-2">
            <p className="text-3xl font-bold text-text-primary">{value}</p>
            {subtitle && (
              <p className="text-xs text-text-secondary mt-1">{subtitle}</p>
            )}
          </div>
          {change && (
            <div className={`flex items-center gap-1 mt-2 text-sm ${getChangeColor()}`}>
              <span>{getChangeSymbol()}</span>
              <span className="font-medium">{change}</span>
              <span className="text-text-secondary">vs mois dernier</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}