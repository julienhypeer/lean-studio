import { Business } from '../types/business';
import { projectsRealData } from '../data/projectsRealData';

// Configuration des fourchettes selon le statut et l'industrie
interface ProjectProfile {
  revenueRange: [number, number];
  customerRange: [number, number];
  growthPattern: 'explosive' | 'steady' | 'declining' | 'pivoted' | 'not-launched';
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

// Génération des fourchettes basées sur les vraies données collectées
export function generateProjectProfile(business: Business): ProjectProfile {
  // Chercher les vraies données pour ce projet
  const realData = projectsRealData.find(p => p.name === business.name);
  
  if (realData) {
    // Utiliser les vraies données collectées
    const monthsActive = calculateMonthsActive(realData.realStartDate, business.endDate);
    
    // Mapper l'évolution réelle au pattern de croissance
    let growthPattern: ProjectProfile['growthPattern'];
    switch (realData.evolution) {
      case 'not-launched':
        growthPattern = 'not-launched';
        break;
      case 'fast-growth':
        growthPattern = 'explosive';
        break;
      case 'slow-growth':
      case 'ongoing':
        growthPattern = 'steady';
        break;
      case 'stagnation':
        growthPattern = 'pivoted';
        break;
      case 'decline':
      default:
        growthPattern = 'declining';
    }
    
    return {
      revenueRange: realData.revenueRange,
      customerRange: realData.customerRange,
      growthPattern,
      timeActive: monthsActive,
      industryMultiplier: industryProfiles[business.industry]?.multiplier || 1.0
    };
  }
  
  // Fallback sur l'ancienne méthode si pas de données réelles
  const industry = industryProfiles[business.industry] || { multiplier: 1.0, typical: 'steady' };
  const monthsActive = calculateMonthsActive(business.startDate, business.endDate);
  
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

// Paliers standardisés pour les revenus (première année) - ratio 1:2 maximum
const REVENUE_TIERS = {
  none: { label: 'Non lancé', range: [0, 0] },
  starter: { label: '€8K-12K', range: [8000, 12000] },  // ratio 1:1.5
  traction: { label: '€25K-35K', range: [25000, 35000] },  // ratio 1:1.4
  growth: { label: '€80K-120K', range: [80000, 120000] },  // ratio 1:1.5
  scale: { label: '€180K-250K', range: [180000, 250000] },  // ratio 1:1.4
  success: { label: '€350K-450K', range: [350000, 450000] }  // ratio 1:1.3
};

// Paliers pour les clients - ratios serrés
const CUSTOMER_TIERS = {
  none: { label: 'En préparation', range: [0, 0] },
  few: { label: '15-25', range: [15, 25] },  // ratio 1:1.7
  some: { label: '50-80', range: [50, 80] },  // ratio 1:1.6
  many: { label: '200-350', range: [200, 350] },  // ratio 1:1.75
  lots: { label: '800-1200', range: [800, 1200] }  // ratio 1:1.5
};

// Formatage des fourchettes pour l'affichage
export function formatValueRange(min: number, max: number, type: 'currency' | 'number' = 'currency'): string {
  // Pour les projets non lancés
  if (min === 0 && max === 0) {
    return type === 'currency' ? 'Non lancé' : 'En préparation';
  }
  
  if (type === 'number') {
    // Formater les nombres de manière propre
    if (min === max) {
      return min.toLocaleString('fr-FR');
    }
    
    if (max >= 1000) {
      // Utiliser K pour les milliers
      const minFormatted = min >= 1000 
        ? `${(min / 1000).toFixed(min % 1000 === 0 ? 0 : 1)}K`
        : min.toString();
      const maxFormatted = `${(max / 1000).toFixed(max % 1000 === 0 ? 0 : 1)}K`;
      return `${minFormatted}-${maxFormatted}`;
    }
    
    return `${min}-${max}`;
  }
  
  // Pour les montants - formatage propre et cohérent
  const formatValue = (val: number) => {
    if (val >= 1000000) {
      // Millions avec 1 décimale si nécessaire
      const millions = val / 1000000;
      return millions % 1 === 0 ? `${millions}M` : `${millions.toFixed(1)}M`;
    }
    if (val >= 1000) {
      // Milliers - toujours en K
      const thousands = val / 1000;
      return thousands % 1 === 0 ? `${thousands}K` : `${thousands.toFixed(0)}K`;
    }
    return val.toString();
  };
  
  return `€${formatValue(min)}-${formatValue(max)}`;
}

// Génération de métriques masquées mais cohérentes
export function generateLockedMetrics(business: Business) {
  const profile = generateProjectProfile(business);
  const realData = projectsRealData.find(p => p.name === business.name);
  
  // Pour les projets non lancés, affichage simplifié
  if (profile.growthPattern === 'not-launched') {
    return {
      revenueRange: 'Non lancé',
      customerRange: 'En préparation',
      mrrRange: '-',
      ltvcacRange: '-',
      churnRange: '-',
      runwayRange: 'Budget initial',
      growthTrend: { value: 'Lancement prévu', type: 'neutral' as const },
      expenseRatio: 'Budget alloué'
    };
  }
  
  // Utiliser les vraies données ou les paliers standardisés
  let revenueRange = profile.revenueRange;
  let customerRange = profile.customerRange;
  
  // Appliquer les paliers standardisés selon la catégorie
  if (realData) {
    // Utiliser directement les paliers définis
    switch(realData.revenueCategory) {
      case 'none':
        revenueRange = REVENUE_TIERS.none.range as [number, number];
        break;
      case 'starter':
        revenueRange = REVENUE_TIERS.starter.range as [number, number];
        break;
      case 'traction':
        revenueRange = REVENUE_TIERS.traction.range as [number, number];
        break;
      case 'growth':
        revenueRange = REVENUE_TIERS.growth.range as [number, number];
        break;
      case 'success':
        revenueRange = REVENUE_TIERS.success.range as [number, number];
        break;
      default:
        revenueRange = REVENUE_TIERS.starter.range as [number, number];
    }
    
    // Appliquer des paliers pour les clients
    switch(realData.customerCategory) {
      case 'none':
        customerRange = CUSTOMER_TIERS.none.range as [number, number];
        break;
      case 'few':
        customerRange = CUSTOMER_TIERS.few.range as [number, number];
        break;
      case 'some':
        customerRange = CUSTOMER_TIERS.some.range as [number, number];
        break;
      case 'many':
        customerRange = CUSTOMER_TIERS.many.range as [number, number];
        break;
      case 'lots':
        customerRange = CUSTOMER_TIERS.lots.range as [number, number];
        break;
      default:
        customerRange = CUSTOMER_TIERS.few.range as [number, number];
    }
  }
  
  // MRR basé sur le revenue range
  const mrrMin = Math.round(revenueRange[0] / 12);
  const mrrMax = Math.round(revenueRange[1] / 12);
  
  // LTV/CAC ratio harmonisé avec fourchettes serrées
  let ltvcacRange: [number, number];
  if (business.status === 'active') {
    ltvcacRange = [2.5, 3.5]; // Ratio serré pour tous les actifs
  } else if (business.status === 'closed') {
    ltvcacRange = [0.8, 1.2];
  } else if (business.status === 'sold') {
    ltvcacRange = [3.0, 4.0]; // Bon ratio avant vente
  } else {
    ltvcacRange = [1.8, 2.5]; // Pivoted
  }
  
  // Churn rate harmonisé avec fourchettes serrées
  let churnRange: [number, number];
  if (business.status === 'active') {
    churnRange = [4, 6]; // 4-6% pour tous les actifs
  } else if (business.status === 'closed') {
    churnRange = [18, 22]; // Fort churn avant fermeture
  } else if (business.status === 'sold') {
    churnRange = [2, 4]; // Faible churn avant vente
  } else {
    churnRange = [7, 9]; // Pivoted
  }
  
  // Runway harmonisé avec fourchettes serrées
  let runwayRange: [number, number];
  if (business.status === 'active') {
    runwayRange = [16, 20]; // 16-20 mois pour tous les actifs
  } else if (business.status === 'closed') {
    runwayRange = [1, 2];
  } else if (business.status === 'sold') {
    runwayRange = [22, 28]; // Bonne trésorerie avant vente
  } else {
    runwayRange = [8, 11]; // Pivoted
  }
  
  return {
    revenueRange: formatValueRange(revenueRange[0], revenueRange[1]),
    customerRange: formatValueRange(customerRange[0], customerRange[1], 'number'),
    mrrRange: formatValueRange(mrrMin, mrrMax),
    ltvcacRange: `${ltvcacRange[0].toFixed(1)}x-${ltvcacRange[1].toFixed(1)}x`,
    churnRange: `${churnRange[0]}%-${churnRange[1]}%`,
    runwayRange: `${runwayRange[0]}-${runwayRange[1]} mois`,
    growthTrend: getGrowthTrend(profile.growthPattern, business.status),
    expenseRatio: getExpenseRatio(business.status)
  };
}

function getGrowthTrend(pattern: string, status?: string): { value: string; type: 'increase' | 'decrease' | 'neutral' } {
  // Pour les projets non lancés
  if (pattern === 'not-launched') {
    return { value: 'En préparation', type: 'neutral' };
  }
  
  // Harmoniser les tendances selon le statut
  if (status === 'active') {
    // Tendance positive standardisée pour tous les actifs
    return { value: '+25%', type: 'increase' };
  } else if (status === 'closed') {
    // Tendance négative pour les fermés
    return { value: '-15%', type: 'decrease' };
  } else if (status === 'pivoted') {
    // Tendance neutre pour les pivotés
    return { value: '+5%', type: 'neutral' };
  } else if (status === 'sold') {
    // Forte croissance avant vente
    return { value: '+45%', type: 'increase' };
  }
  
  // Fallback sur le pattern si statut non reconnu
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
  const realData = projectsRealData.find(p => p.name === business.name);
  const data = [];
  
  // Utiliser la vraie date de début si disponible
  const startDate = new Date(realData?.realStartDate || business.startDate);
  
  // Pour les projets non lancés, générer des projections
  if (profile.growthPattern === 'not-launched') {
    for (let i = 0; i < months; i++) {
      const monthDate = new Date(startDate);
      monthDate.setMonth(startDate.getMonth() + i);
      
      data.push({
        month: monthDate.toLocaleDateString('fr-FR', { month: 'short' }),
        revenue: 0,
        expenses: Math.round(1000 + i * 100), // Frais de développement
        customers: 0,
        orders: 0
      });
    }
    return data;
  }
  
  const baseRevenue = profile.revenueRange[0] / months;
  const baseExpenses = baseRevenue * 0.6; // 40% de marge moyenne
  
  for (let i = 0; i < months; i++) {
    const monthDate = new Date(startDate);
    monthDate.setMonth(startDate.getMonth() + i);
    
    // Variation selon le pattern
    let growthFactor = 1;
    if (profile.growthPattern === 'explosive') {
      growthFactor = Math.pow(1.15, i); // 15% par mois
    } else if (profile.growthPattern === 'steady') {
      growthFactor = Math.pow(1.05, i); // 5% par mois
    } else if (profile.growthPattern === 'declining') {
      growthFactor = Math.pow(0.95, i); // -5% par mois
    } else if (profile.growthPattern === 'pivoted') {
      // Baisse puis remontée
      growthFactor = i < 6 ? Math.pow(0.9, i) : Math.pow(1.1, i - 6);
    } else if (profile.growthPattern === 'not-launched') {
      growthFactor = 0;
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