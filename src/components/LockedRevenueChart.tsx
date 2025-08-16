import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { MonthlyData } from '../types/business';
import { Lock, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

interface LockedRevenueChartProps {
  data: MonthlyData[];
  height?: number;
}

export default function LockedRevenueChart({ data, height = 300 }: LockedRevenueChartProps) {
  // Normaliser les données pour masquer les valeurs réelles
  const normalizeData = (data: MonthlyData[]) => {
    const maxRevenue = Math.max(...data.map(d => d.revenue));
    const maxExpenses = Math.max(...data.map(d => d.expenses));
    const maxValue = Math.max(maxRevenue, maxExpenses);
    
    return data.map(item => ({
      month: item.month,
      revenue: (item.revenue / maxValue) * 100,
      expenses: (item.expenses / maxValue) * 100,
      // Garder les vraies valeurs pour le calcul de tendance
      realRevenue: item.revenue,
      realExpenses: item.expenses
    }));
  };

  const normalizedData = normalizeData(data);

  // Calculer la tendance globale
  const calculateTrend = () => {
    if (data.length < 2) return 0;
    const firstRevenue = data[0].revenue;
    const lastRevenue = data[data.length - 1].revenue;
    return ((lastRevenue - firstRevenue) / firstRevenue * 100).toFixed(0);
  };

  const trend = calculateTrend();

  // Tooltip personnalisé qui masque les valeurs
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur p-3 rounded-lg shadow-lg border border-gray-100">
          <p className="text-sm font-semibold text-gray-700 mb-2">{label}</p>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 rounded-full bg-orange-400" />
              <span className="text-gray-600">Revenus:</span>
              <span className="font-semibold text-gray-400">€••••</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 rounded-full bg-slate-400" />
              <span className="text-gray-600">Dépenses:</span>
              <span className="font-semibold text-gray-400">€••••</span>
            </div>
          </div>
          <div className="mt-2 pt-2 border-t border-gray-100">
            <p className="text-xs text-gray-500 italic flex items-center gap-1">
              <Lock className="w-3 h-3" />
              Données confidentielles
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 relative">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">
            Évolution sur 12 mois
          </h3>
          <p className="text-xs text-slate-500 mt-1">Tendances masquées</p>
        </div>
        <div className="flex items-center gap-4">
          <motion.div 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className={`flex items-center gap-1 px-2 py-1 rounded-lg ${
              Number(trend) > 0 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
            }`}
          >
            <TrendingUp className="w-3 h-3" />
            <span className="text-sm font-semibold">{trend > 0 ? '+' : ''}{trend}%</span>
          </motion.div>
          <Lock className="w-4 h-4 text-slate-400" />
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart data={normalizedData}>
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FF8A65" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#FF8A65" stopOpacity={0.05}/>
            </linearGradient>
            <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#9CA3AF" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#9CA3AF" stopOpacity={0.05}/>
            </linearGradient>
          </defs>
          
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
          
          <XAxis 
            dataKey="month" 
            tick={{ fontSize: 11, fill: '#9CA3AF' }}
            axisLine={{ stroke: '#E5E7EB' }}
            tickLine={false}
          />
          
          <YAxis 
            tick={false}
            axisLine={{ stroke: '#E5E7EB' }}
            tickLine={false}
            label={{ 
              value: 'Performance relative', 
              angle: -90, 
              position: 'insideLeft',
              style: { fontSize: 10, fill: '#9CA3AF' }
            }}
          />
          
          <Tooltip content={<CustomTooltip />} />
          
          <Area 
            type="monotone" 
            dataKey="revenue" 
            stroke="#FF8A65" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorRevenue)" 
            name="Revenus"
          />
          
          <Area 
            type="monotone" 
            dataKey="expenses" 
            stroke="#9CA3AF" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorExpenses)" 
            name="Dépenses"
          />
        </AreaChart>
      </ResponsiveContainer>

      {/* Légende personnalisée */}
      <div className="flex items-center justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-orange-400" />
          <span className="text-xs text-slate-600">Revenus</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-slate-400" />
          <span className="text-xs text-slate-600">Dépenses</span>
        </div>
      </div>

      {/* Overlay subtil pour l'effet masqué */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent pointer-events-none rounded-xl" />
    </div>
  );
}