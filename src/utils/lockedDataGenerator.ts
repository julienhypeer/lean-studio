import { Business } from '../types/business';

// Configuration des fourchettes selon le statut et l'industrie
interface ProjectProfile {
  revenueRange: [number, number];
  customerRange: [number, number];
  growthPattern: 'explosive' | 'steady' | 'declining' | 'pivoted';
  timeActive: number; // en mois
  industryMultiplier: number;
}

// Profils par industrie
const industryProfiles: Record<string, { multiplier: number; typical: string }> = {
  'IA & Automatisation': { multiplier: 2.5, typical: 'explosive' },
  'Santé & Médecine': { multiplier: 2.0, typical: 'steady' },
  'E-commerce': { multiplier: 1.5, typical: 'steady' },
  'Marketing Digital': { multiplier: 1.8, typical: 'steady' },
  'Sport & Fitness': { multiplier: 1.2, typical: 'steady' },
  'Mode & Lifestyle': { multiplier: 1.3, typical: 'steady' },
  'Jeux & Entertainment': { multiplier: 1.6, typical: 'explosive' },
  'Education': { multiplier: 1.4, typical: 'steady' },
  'Immobilier': { multiplier: 2.2, typical: 'steady' },
  'Voyage & Tourisme': { multiplier: 1.1, typical: 'declining' },
  'Services B2B': { multiplier: 1.7, typical: 'steady' }
};

// Génération des fourchettes basées sur les réponses collectées
export function generateProjectProfile(business: Business): ProjectProfile {
  const industry = industryProfiles[business.industry] || { multiplier: 1.0, typical: 'steady' };
  const monthsActive = calculateMonthsActive(business.startDate, business.endDate);
  
  // Pattern de croissance basé sur le statut
  let growthPattern: ProjectProfile['growthPattern'] = 'steady';
  if (business.status === 'active') {
    growthPattern = industry.typical as ProjectProfile['growthPattern'];
  } else if (business.status === 'pivoted') {
    growthPattern = 'pivoted';
  } else if (business.status === 'closed') {
    growthPattern = 'declining';
  } else if (business.status === 'sold') {
    growthPattern = 'explosive';
  }
  
  // Calcul des fourchettes basé sur les patterns observés
  const baseRevenue = getBaseRevenue(business, monthsActive);
  const revenueRange = calculateRevenueRange(baseRevenue, industry.multiplier, growthPattern);
  const customerRange = calculateCustomerRange(revenueRange, business.industry);
  
  return {
    revenueRange,
    customerRange,
    growthPattern,
    timeActive: monthsActive,
    industryMultiplier: industry.multiplier
  };
}

function calculateMonthsActive(startDate: string, endDate?: string): number {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));
  return diffMonths;
}

function getBaseRevenue(business: Business, monthsActive: number): number {
  // Logique basée sur l'âge du projet et le statut
  const ageMultiplier = Math.min(monthsActive / 12, 2); // Max 2x après 2 ans
  
  switch (business.status) {
    case 'active':
      // Projets actifs : 10K-500K selon l'âge
      return 10000 + (ageMultiplier * 240000);
    case 'sold':
      // Projets vendus : généralement plus de valeur
      return 50000 + (ageMultiplier * 450000);
    case 'pivoted':
      // Projets pivotés : valeur moyenne
      return 5000 + (ageMultiplier * 95000);
    case 'closed':
      // Projets fermés : valeur plus faible
      return 1000 + (ageMultiplier * 49000);
    default:
      return 10000;
  }
}

function calculateRevenueRange(base: number, industryMultiplier: number, pattern: string): [number, number] {
  const adjustedBase = base * industryMultiplier;
  
  switch (pattern) {
    case 'explosive':
      // Grande variation : 0.5x - 3x
      return [Math.round(adjustedBase * 0.5), Math.round(adjustedBase * 3)];
    case 'steady':
      // Variation normale : 0.7x - 1.5x
      return [Math.round(adjustedBase * 0.7), Math.round(adjustedBase * 1.5)];
    case 'declining':
      // Déclin : 0.3x - 0.8x
      return [Math.round(adjustedBase * 0.3), Math.round(adjustedBase * 0.8)];
    case 'pivoted':
      // Pivot : grande incertitude 0.2x - 2x
      return [Math.round(adjustedBase * 0.2), Math.round(adjustedBase * 2)];
    default:
      return [Math.round(adjustedBase * 0.5), Math.round(adjustedBase * 1.5)];
  }
}

function calculateCustomerRange(revenueRange: [number, number], industry: string): [number, number] {
  // Calcul basé sur le panier moyen par industrie
  const avgTicketByIndustry: Record<string, number> = {
    'IA & Automatisation': 2000,
    'Santé & Médecine': 150,
    'E-commerce': 50,
    'Marketing Digital': 500,
    'Sport & Fitness': 30,
    'Mode & Lifestyle': 80,
    'Jeux & Entertainment': 20,
    'Education': 100,
    'Immobilier': 5000,
    'Voyage & Tourisme': 200,
    'Services B2B': 1000
  };
  
  const avgTicket = avgTicketByIndustry[industry] || 100;
  
  return [
    Math.round(revenueRange[0] / avgTicket),
    Math.round(revenueRange[1] / avgTicket)
  ];
}

// Formatage des fourchettes pour l'affichage
export function formatValueRange(min: number, max: number, type: 'currency' | 'number' = 'currency'): string {
  if (type === 'number') {
    if (max >= 1000000) {
      return `${(min / 1000000).toFixed(1)}M-${(max / 1000000).toFixed(1)}M`;
    }
    if (max >= 1000) {
      return `${Math.round(min / 1000)}K-${Math.round(max / 1000)}K`;
    }
    return `${min}-${max}`;
  }
  
  // Pour les montants
  const formatValue = (val: number) => {
    if (val >= 1000000) return `${(val / 1000000).toFixed(0)}M`;
    if (val >= 1000) return `${Math.round(val / 1000)}K`;
    return val.toString();
  };
  
  return `€${formatValue(min)}-${formatValue(max)}`;
}

// Génération de métriques masquées mais cohérentes
export function generateLockedMetrics(business: Business) {
  const profile = generateProjectProfile(business);
  
  // MRR basé sur le revenue range
  const mrrMin = Math.round(profile.revenueRange[0] / 12);
  const mrrMax = Math.round(profile.revenueRange[1] / 12);
  
  // LTV/CAC ratio selon le pattern
  let ltvcacRange: [number, number];
  switch (profile.growthPattern) {
    case 'explosive':
      ltvcacRange = [3.5, 6.0];
      break;
    case 'steady':
      ltvcacRange = [2.0, 4.0];
      break;
    case 'declining':
      ltvcacRange = [0.8, 1.5];
      break;
    case 'pivoted':
      ltvcacRange = [1.0, 3.0];
      break;
    default:
      ltvcacRange = [2.0, 3.5];
  }
  
  // Churn rate selon le statut
  let churnRange: [number, number];
  switch (business.status) {
    case 'active':
      churnRange = [2, 5];
      break;
    case 'sold':
      churnRange = [1, 3];
      break;
    case 'pivoted':
      churnRange = [5, 12];
      break;
    case 'closed':
      churnRange = [10, 25];
      break;
    default:
      churnRange = [3, 8];
  }
  
  // Runway selon le statut
  let runwayRange: [number, number];
  switch (business.status) {
    case 'active':
      runwayRange = [12, 36];
      break;
    case 'sold':
      runwayRange = [6, 18]; // Moins pertinent
      break;
    case 'pivoted':
      runwayRange = [3, 12];
      break;
    case 'closed':
      runwayRange = [0, 3];
      break;
    default:
      runwayRange = [6, 24];
  }
  
  return {
    revenueRange: formatValueRange(profile.revenueRange[0], profile.revenueRange[1]),
    customerRange: formatValueRange(profile.customerRange[0], profile.customerRange[1], 'number'),
    mrrRange: formatValueRange(mrrMin, mrrMax),
    ltvcacRange: `${ltvcacRange[0]}x-${ltvcacRange[1]}x`,
    churnRange: `${churnRange[0]}%-${churnRange[1]}%`,
    runwayRange: `${runwayRange[0]}-${runwayRange[1]} mois`,
    growthTrend: getGrowthTrend(profile.growthPattern),
    expenseRatio: getExpenseRatio(business.status)
  };
}

function getGrowthTrend(pattern: string): { value: string; type: 'increase' | 'decrease' | 'neutral' } {
  switch (pattern) {
    case 'explosive':
      return { value: '+85%', type: 'increase' };
    case 'steady':
      return { value: '+25%', type: 'increase' };
    case 'declining':
      return { value: '-15%', type: 'decrease' };
    case 'pivoted':
      return { value: '+5%', type: 'neutral' };
    default:
      return { value: '+15%', type: 'increase' };
  }
}

function getExpenseRatio(status: string): string {
  switch (status) {
    case 'active':
      return '+35%'; // Croissance contrôlée
    case 'sold':
      return '+20%'; // Optimisé avant vente
    case 'pivoted':
      return '+65%'; // Investissement pour pivot
    case 'closed':
      return '-25%'; // Réduction avant fermeture
    default:
      return '+40%';
  }
}

// Génération de données mensuelles masquées
export function generateMaskedMonthlyData(business: Business, months: number = 12) {
  const profile = generateProjectProfile(business);
  const data = [];
  
  const startDate = new Date(business.startDate);
  const baseRevenue = profile.revenueRange[0] / months;
  const baseExpenses = baseRevenue * 0.6; // 40% de marge moyenne
  
  for (let i = 0; i < months; i++) {
    const monthDate = new Date(startDate);
    monthDate.setMonth(startDate.getMonth() + i);
    
    // Variation selon le pattern
    let growthFactor = 1;
    switch (profile.growthPattern) {
      case 'explosive':
        growthFactor = Math.pow(1.15, i); // 15% par mois
        break;
      case 'steady':
        growthFactor = Math.pow(1.05, i); // 5% par mois
        break;
      case 'declining':
        growthFactor = Math.pow(0.95, i); // -5% par mois
        break;
      case 'pivoted':
        // Baisse puis remontée
        growthFactor = i < 6 ? Math.pow(0.9, i) : Math.pow(1.1, i - 6);
        break;
    }
    
    // Ajout de variation aléatoire réaliste
    const randomVariation = 0.85 + Math.random() * 0.3; // ±15%
    
    data.push({
      month: monthDate.toLocaleDateString('fr-FR', { month: 'short' }),
      revenue: Math.round(baseRevenue * growthFactor * randomVariation),
      expenses: Math.round(baseExpenses * (1 + i * 0.02) * randomVariation),
      customers: Math.round((profile.customerRange[0] / months) * growthFactor * randomVariation),
      orders: Math.round((profile.customerRange[0] * 1.5 / months) * growthFactor * randomVariation)
    });
  }
  
  return data;
}