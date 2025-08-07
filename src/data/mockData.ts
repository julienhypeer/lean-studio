import { Business } from '../types/business';

export const mockBusinesses: Business[] = [
  {
    id: '1',
    name: 'NoCodeur',
    tagline: 'La plateforme SaaS pour créer sans coder',
    logo: '🚀',
    status: 'active',
    startDate: '2023-01-15',
    industry: 'SaaS',
    
    metrics: {
      totalRevenue: 85457.00,
      totalExpenses: 34457.00,
      totalCustomers: 521,
      totalOrders: 1248,
      mrr: 8500,
      arr: 102000,
      cac: 50,
      ltv: 850,
      churnRate: 2.4,
      runway: 18,
      burnRate: 2800,
      grossMargin: 78
    },
    
    monthlyData: [
      { month: 'Jan', revenue: 4500, expenses: 3200, customers: 25, orders: 45 },
      { month: 'Feb', revenue: 5200, expenses: 3100, customers: 35, orders: 62 },
      { month: 'Mar', revenue: 4800, expenses: 2900, customers: 42, orders: 58 },
      { month: 'Apr', revenue: 5800, expenses: 3000, customers: 48, orders: 71 },
      { month: 'May', revenue: 6200, expenses: 2800, customers: 55, orders: 83 },
      { month: 'Jun', revenue: 7100, expenses: 2900, customers: 61, orders: 92 },
      { month: 'Jul', revenue: 6800, expenses: 3100, customers: 58, orders: 88 },
      { month: 'Aug', revenue: 7500, expenses: 2700, customers: 64, orders: 105 },
      { month: 'Sep', revenue: 8200, expenses: 2800, customers: 71, orders: 118 },
      { month: 'Oct', revenue: 8900, expenses: 2900, customers: 78, orders: 132 },
      { month: 'Nov', revenue: 9500, expenses: 3000, customers: 85, orders: 145 },
      { month: 'Dec', revenue: 10957, expenses: 3057, customers: 99, orders: 249 }
    ],
    
    products: [
      { id: 'p1', name: 'Plan Starter', category: 'Subscription', price: 49, sales: 145, revenue: 7105, status: 'available' },
      { id: 'p2', name: 'Plan Pro', category: 'Subscription', price: 99, sales: 89, revenue: 8811, status: 'available' },
      { id: 'p3', name: 'Plan Enterprise', category: 'Subscription', price: 299, sales: 23, revenue: 6877, status: 'available' },
      { id: 'p4', name: 'Formation', category: 'Service', price: 497, sales: 12, revenue: 5964, status: 'available' },
      { id: 'p5', name: 'Consulting', category: 'Service', price: 1500, sales: 8, revenue: 12000, status: 'available' }
    ],
    
    recentOrders: [
      { id: 'o1', customerName: 'Sophie Martin', productName: 'Plan Pro', amount: 99, date: '2024-01-15', status: 'completed' },
      { id: 'o2', customerName: 'Pierre Dubois', productName: 'Plan Starter', amount: 49, date: '2024-01-14', status: 'completed' },
      { id: 'o3', customerName: 'Marie Laurent', productName: 'Formation', amount: 497, date: '2024-01-13', status: 'pending' },
      { id: 'o4', customerName: 'Jean Moreau', productName: 'Plan Enterprise', amount: 299, date: '2024-01-12', status: 'completed' },
      { id: 'o5', customerName: 'Lucie Bernard', productName: 'Plan Pro', amount: 99, date: '2024-01-11', status: 'completed' }
    ],
    
    milestones: [
      { id: 'm1', title: 'Lancement MVP', description: 'Première version avec 3 features clés', date: '2023-01-15', type: 'launch', impact: 'high' },
      { id: 'm2', title: '100 premiers clients', description: 'Cap symbolique franchi', date: '2023-06-10', type: 'milestone', impact: 'medium' },
      { id: 'm3', title: 'Break-even', description: 'Rentabilité atteinte', date: '2023-09-01', type: 'milestone', impact: 'critical' },
      { id: 'm4', title: '10K MRR', description: 'Objectif annuel dépassé', date: '2023-12-20', type: 'milestone', impact: 'high' }
    ],
    
    lessonsLearned: [
      'Le support client est crucial pour la rétention',
      'Automatiser tôt permet de scaler plus vite',
      'Le pricing value-based fonctionne mieux que le cost-plus',
      'Les webinaires convertissent 3x mieux que les ads'
    ]
  },
  
  {
    id: '2',
    name: 'EcoDeliver',
    tagline: 'Livraison écologique en ville',
    logo: '🌱',
    status: 'pivoted',
    startDate: '2022-03-01',
    endDate: '2023-09-01',
    industry: 'Marketplace',
    
    metrics: {
      totalRevenue: 125000,
      totalExpenses: 148000,
      totalCustomers: 1850,
      totalOrders: 4200,
      mrr: 0,
      arr: 0,
      cac: 25,
      ltv: 67,
      churnRate: 8.5,
      runway: 0,
      burnRate: 0,
      grossMargin: 22
    },
    
    monthlyData: [
      { month: 'Mar', revenue: 2500, expenses: 8000, customers: 50, orders: 120 },
      { month: 'Apr', revenue: 4200, expenses: 7500, customers: 95, orders: 210 },
      { month: 'May', revenue: 6800, expenses: 7200, customers: 145, orders: 340 },
      { month: 'Jun', revenue: 8500, expenses: 7800, customers: 200, orders: 425 },
      { month: 'Jul', revenue: 11200, expenses: 8200, customers: 280, orders: 560 },
      { month: 'Aug', revenue: 13500, expenses: 8500, customers: 350, orders: 675 },
      { month: 'Sep', revenue: 12800, expenses: 8900, customers: 320, orders: 640 },
      { month: 'Oct', revenue: 14200, expenses: 9200, customers: 355, orders: 710 },
      { month: 'Nov', revenue: 15800, expenses: 9500, customers: 395, orders: 790 },
      { month: 'Dec', revenue: 18200, expenses: 10200, customers: 455, orders: 910 },
      { month: 'Jan', revenue: 11300, expenses: 11000, customers: 226, orders: 565 },
      { month: 'Feb', revenue: 6000, expenses: 12000, customers: 120, orders: 255 }
    ],
    
    products: [
      { id: 'p1', name: 'Livraison Express', category: 'Service', price: 8.99, sales: 2100, revenue: 18879, status: 'discontinued' },
      { id: 'p2', name: 'Livraison Standard', category: 'Service', price: 5.99, sales: 3200, revenue: 19168, status: 'discontinued' },
      { id: 'p3', name: 'Abonnement Mensuel', category: 'Subscription', price: 19.99, sales: 450, revenue: 8995, status: 'discontinued' }
    ],
    
    recentOrders: [],
    
    milestones: [
      { id: 'm1', title: 'Lancement B2C', description: 'Ouverture au grand public', date: '2022-03-01', type: 'launch', impact: 'high' },
      { id: 'm2', title: 'Pivot B2B', description: 'Changement de modèle vers les entreprises', date: '2023-01-15', type: 'pivot', impact: 'critical' },
      { id: 'm3', title: 'Arrêt des opérations', description: 'Unit economics non viables', date: '2023-09-01', type: 'exit', impact: 'critical' }
    ],
    
    lessonsLearned: [
      'Le B2B a un meilleur product-market fit que le B2C',
      'Les coûts de livraison du dernier km sont difficiles à rentabiliser',
      'La densité géographique est cruciale pour la viabilité',
      'Pivoter trop tard coûte cher'
    ]
  },
  
  {
    id: '3',
    name: 'FitTracker Pro',
    tagline: 'Application fitness avec IA',
    logo: '💪',
    status: 'sold',
    startDate: '2021-06-01',
    endDate: '2023-06-01',
    industry: 'Mobile App',
    
    metrics: {
      totalRevenue: 320000,
      totalExpenses: 180000,
      totalCustomers: 52000,
      totalOrders: 52000,
      mrr: 0,
      arr: 0,
      cac: 2.5,
      ltv: 6.15,
      churnRate: 12,
      runway: 0,
      burnRate: 0,
      grossMargin: 85
    },
    
    monthlyData: [
      { month: 'Jun', revenue: 5000, expenses: 12000, customers: 1000, orders: 1000 },
      { month: 'Jul', revenue: 8000, expenses: 10000, customers: 1600, orders: 1600 },
      { month: 'Aug', revenue: 12000, expenses: 9000, customers: 2400, orders: 2400 },
      { month: 'Sep', revenue: 15000, expenses: 8500, customers: 3000, orders: 3000 },
      { month: 'Oct', revenue: 18000, expenses: 8000, customers: 3600, orders: 3600 },
      { month: 'Nov', revenue: 22000, expenses: 7500, customers: 4400, orders: 4400 },
      { month: 'Dec', revenue: 28000, expenses: 7000, customers: 5600, orders: 5600 },
      { month: 'Jan', revenue: 32000, expenses: 7200, customers: 6400, orders: 6400 },
      { month: 'Feb', revenue: 35000, expenses: 7500, customers: 7000, orders: 7000 },
      { month: 'Mar', revenue: 38000, expenses: 7800, customers: 7600, orders: 7600 },
      { month: 'Apr', revenue: 42000, expenses: 8200, customers: 8400, orders: 8400 },
      { month: 'May', revenue: 45000, expenses: 8500, customers: 9000, orders: 9000 }
    ],
    
    products: [
      { id: 'p1', name: 'App Premium', category: 'App', price: 4.99, sales: 45000, revenue: 224550, status: 'discontinued' },
      { id: 'p2', name: 'Coaching IA', category: 'Feature', price: 9.99, sales: 8000, revenue: 79920, status: 'discontinued' }
    ],
    
    recentOrders: [],
    
    milestones: [
      { id: 'm1', title: 'Launch App Store', description: 'Disponible sur iOS', date: '2021-06-01', type: 'launch', impact: 'high' },
      { id: 'm2', title: '10K utilisateurs', description: 'Premier palier franchi', date: '2021-10-15', type: 'milestone', impact: 'medium' },
      { id: 'm3', title: 'Feature IA', description: 'Lancement du coaching personnalisé', date: '2022-02-01', type: 'milestone', impact: 'high' },
      { id: 'm4', title: 'Acquisition', description: 'Rachat par FitnessCorp pour 450K€', date: '2023-06-01', type: 'exit', impact: 'critical' }
    ],
    
    lessonsLearned: [
      'L\'IA est un différenciateur clé sur le marché fitness',
      'La rétention est le KPI le plus important en mobile',
      'Les partenariats avec des influenceurs boostent l\'acquisition',
      'Vendre au bon moment maximise la valeur'
    ]
  },
  
  {
    id: '4',
    name: 'LocalChef',
    tagline: 'Plats faits maison livrés',
    logo: '👨‍🍳',
    status: 'closed',
    startDate: '2022-09-01',
    endDate: '2023-05-01',
    industry: 'Food Delivery',
    
    metrics: {
      totalRevenue: 42000,
      totalExpenses: 78000,
      totalCustomers: 450,
      totalOrders: 1200,
      mrr: 0,
      arr: 0,
      cac: 45,
      ltv: 93,
      churnRate: 25,
      runway: 0,
      burnRate: 0,
      grossMargin: 15
    },
    
    monthlyData: [
      { month: 'Sep', revenue: 2000, expenses: 10000, customers: 40, orders: 80 },
      { month: 'Oct', revenue: 3500, expenses: 9500, customers: 70, orders: 140 },
      { month: 'Nov', revenue: 4200, expenses: 9000, customers: 84, orders: 168 },
      { month: 'Dec', revenue: 5800, expenses: 8800, customers: 116, orders: 232 },
      { month: 'Jan', revenue: 6500, expenses: 9200, customers: 130, orders: 260 },
      { month: 'Feb', revenue: 7200, expenses: 9500, customers: 144, orders: 288 },
      { month: 'Mar', revenue: 6800, expenses: 10000, customers: 136, orders: 272 },
      { month: 'Apr', revenue: 5000, expenses: 10500, customers: 100, orders: 200 },
      { month: 'May', revenue: 1000, expenses: 11500, customers: 20, orders: 40 }
    ],
    
    products: [
      { id: 'p1', name: 'Menu du jour', category: 'Food', price: 12, sales: 800, revenue: 9600, status: 'discontinued' },
      { id: 'p2', name: 'Plat signature', category: 'Food', price: 18, sales: 400, revenue: 7200, status: 'discontinued' }
    ],
    
    recentOrders: [],
    
    milestones: [
      { id: 'm1', title: 'MVP Launch', description: 'Premier service de livraison', date: '2022-09-01', type: 'launch', impact: 'high' },
      { id: 'm2', title: 'Problèmes logistiques', description: 'Coûts de livraison explosent', date: '2023-02-01', type: 'milestone', impact: 'critical' },
      { id: 'm3', title: 'Fermeture', description: 'Unit economics non viables', date: '2023-05-01', type: 'exit', impact: 'critical' }
    ],
    
    lessonsLearned: [
      'Les marges en food delivery sont très faibles',
      'La logistique est le facteur critique de succès',
      'Le CAC est trop élevé sans économies d\'échelle',
      'Valider les unit economics avant de scaler'
    ]
  }
];