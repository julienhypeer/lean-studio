// Données réelles collectées pour tous les projets
export interface ProjectRealData {
  id: string;
  name: string;
  realStartDate: string;
  realStatus: 'active' | 'pivoted' | 'sold' | 'closed';
  revenueCategory: 'none' | 'starter' | 'traction' | 'growth' | 'success';
  revenueRange: [number, number];
  customerCategory: 'none' | 'few' | 'some' | 'many' | 'lots';
  customerRange: [number, number];
  ticketSize: 'free' | 'small' | 'medium' | 'large' | 'enterprise';
  ticketRange: [number, number];
  evolution: 'not-launched' | 'slow-growth' | 'fast-growth' | 'stagnation' | 'decline' | 'ongoing';
  closeReason?: string;
}

export const projectsRealData: ProjectRealData[] = [
  {
    id: '1',
    name: 'Infrastructure IA',
    realStartDate: '2025-07-01',
    realStatus: 'active',
    revenueCategory: 'starter',
    revenueRange: [1000, 10000],
    customerCategory: 'none',
    customerRange: [0, 5],
    ticketSize: 'large',
    ticketRange: [1000, 5000],
    evolution: 'not-launched'
  },
  {
    id: '2',
    name: 'Dermassist',
    realStartDate: '2025-04-01',
    realStatus: 'active',
    revenueCategory: 'none',
    revenueRange: [0, 0],
    customerCategory: 'none',
    customerRange: [0, 5],
    ticketSize: 'free',
    ticketRange: [0, 0],
    evolution: 'not-launched'
  },
  {
    id: '3',
    name: 'Nocodeur',
    realStartDate: '2025-08-01',
    realStatus: 'active',
    revenueCategory: 'none',
    revenueRange: [0, 0],
    customerCategory: 'none',
    customerRange: [0, 5],
    ticketSize: 'small',
    ticketRange: [10, 100],
    evolution: 'not-launched'
  },
  {
    id: '4',
    name: 'Maskimize',
    realStartDate: '2025-08-01',
    realStatus: 'active',
    revenueCategory: 'none',
    revenueRange: [0, 0],
    customerCategory: 'none',
    customerRange: [0, 5],
    ticketSize: 'small',
    ticketRange: [10, 100],
    evolution: 'not-launched'
  },
  {
    id: '5',
    name: 'Digital Mind',
    realStartDate: '2015-01-01',
    realStatus: 'active',
    revenueCategory: 'traction',
    revenueRange: [10000, 50000],
    customerCategory: 'some',
    customerRange: [20, 100],
    ticketSize: 'medium',
    ticketRange: [100, 1000],
    evolution: 'slow-growth'
  },
  {
    id: '6',
    name: 'Trophy cosmetics',
    realStartDate: '2020-03-01',
    realStatus: 'pivoted',
    revenueCategory: 'none',
    revenueRange: [0, 0],
    customerCategory: 'none',
    customerRange: [0, 5],
    ticketSize: 'small',
    ticketRange: [10, 100],
    evolution: 'stagnation'
  },
  {
    id: '7',
    name: 'Par ou commencer ?',
    realStartDate: '2024-01-01',
    realStatus: 'pivoted',
    revenueCategory: 'traction',
    revenueRange: [10000, 50000],
    customerCategory: 'some',
    customerRange: [20, 100],
    ticketSize: 'medium',
    ticketRange: [100, 1000],
    evolution: 'slow-growth'
  },
  {
    id: '8',
    name: 'esportlogo',
    realStartDate: '2018-06-01',
    realStatus: 'closed', // Corrigé : pas vendu mais fermé
    revenueCategory: 'traction',
    revenueRange: [10000, 50000],
    customerCategory: 'some',
    customerRange: [20, 100],
    ticketSize: 'medium',
    ticketRange: [100, 1000],
    evolution: 'decline',
    closeReason: 'Projet arrêté'
  },
  {
    id: '9',
    name: 'hipstermystyle',
    realStartDate: '2017-01-01',
    realStatus: 'closed',
    revenueCategory: 'none',
    revenueRange: [0, 0],
    customerCategory: 'none',
    customerRange: [0, 5],
    ticketSize: 'small',
    ticketRange: [10, 100],
    evolution: 'decline',
    closeReason: 'Pas de product-market fit'
  },
  {
    id: '10',
    name: '11LEVEN',
    realStartDate: '2016-01-01',
    realStatus: 'closed',
    revenueCategory: 'starter',
    revenueRange: [1000, 10000],
    customerCategory: 'some',
    customerRange: [20, 100],
    ticketSize: 'small',
    ticketRange: [10, 100],
    evolution: 'decline',
    closeReason: 'Autre'
  },
  {
    id: '11',
    name: 'Agence marketing digital',
    realStartDate: '2015-01-01',
    realStatus: 'closed',
    revenueCategory: 'growth',
    revenueRange: [50000, 200000],
    customerCategory: 'some',
    customerRange: [20, 100],
    ticketSize: 'large',
    ticketRange: [1000, 5000],
    evolution: 'decline',
    closeReason: 'Marché trop difficile'
  },
  {
    id: '12',
    name: 'Anita Conti',
    realStartDate: '2019-09-01',
    realStatus: 'closed',
    revenueCategory: 'starter',
    revenueRange: [1000, 10000],
    customerCategory: 'none',
    customerRange: [0, 5],
    ticketSize: 'small',
    ticketRange: [10, 100],
    evolution: 'decline',
    closeReason: 'Pas de product-market fit'
  },
  {
    id: '13',
    name: 'Check That Curves',
    realStartDate: '2020-06-01',
    realStatus: 'closed',
    revenueCategory: 'traction',
    revenueRange: [10000, 50000],
    customerCategory: 'many',
    customerRange: [100, 500],
    ticketSize: 'small',
    ticketRange: [10, 100],
    evolution: 'decline',
    closeReason: 'Fin de collaboration avec associé'
  },
  {
    id: '14',
    name: 'EBusiness Maker',
    realStartDate: '2021-01-01',
    realStatus: 'closed',
    revenueCategory: 'growth',
    revenueRange: [50000, 200000],
    customerCategory: 'some',
    customerRange: [20, 100],
    ticketSize: 'large',
    ticketRange: [1000, 5000],
    evolution: 'decline',
    closeReason: 'Pivot vers autre projet'
  },
  {
    id: '15',
    name: 'MyPad',
    realStartDate: '2022-03-01',
    realStatus: 'closed',
    revenueCategory: 'starter',
    revenueRange: [1000, 10000],
    customerCategory: 'few',
    customerRange: [5, 20],
    ticketSize: 'medium',
    ticketRange: [100, 1000],
    evolution: 'decline',
    closeReason: 'Pas de product-market fit'
  },
  {
    id: '16',
    name: 'Goldify',
    realStartDate: '2015-01-01', // Corrigé : 2015 au lieu de 2023
    realStatus: 'closed',
    revenueCategory: 'starter',
    revenueRange: [1000, 10000],
    customerCategory: 'few',
    customerRange: [5, 20],
    ticketSize: 'medium',
    ticketRange: [100, 1000],
    evolution: 'decline',
    closeReason: 'Pas de product-market fit'
  },
  {
    id: '17',
    name: 'Cloud Development',
    realStartDate: '2015-06-01',
    realStatus: 'closed',
    revenueCategory: 'starter',
    revenueRange: [1000, 10000],
    customerCategory: 'some',
    customerRange: [20, 100],
    ticketSize: 'large',
    ticketRange: [1000, 5000],
    evolution: 'decline',
    closeReason: 'Pivot vers autre projet'
  },
  {
    id: '18',
    name: 'Battle Ropes',
    realStartDate: '2013-01-01', // Corrigé : 2013
    realStatus: 'closed',
    revenueCategory: 'success',
    revenueRange: [200000, 500000],
    customerCategory: 'many',
    customerRange: [100, 500],
    ticketSize: 'medium',
    ticketRange: [100, 1000],
    evolution: 'decline',
    closeReason: 'Autre'
  },
  {
    id: '19',
    name: 'FireCloud',
    realStartDate: '2023-01-01', // Corrigé : 2023
    realStatus: 'closed',
    revenueCategory: 'none',
    revenueRange: [0, 0],
    customerCategory: 'lots',
    customerRange: [500, 2000],
    ticketSize: 'free',
    ticketRange: [0, 0],
    evolution: 'decline',
    closeReason: 'Marché trop difficile'
  },
  {
    id: '20',
    name: 'Lead Generation',
    realStartDate: '2024-01-01', // Corrigé : 2024
    realStatus: 'closed',
    revenueCategory: 'traction',
    revenueRange: [10000, 50000],
    customerCategory: 'few',
    customerRange: [5, 20],
    ticketSize: 'large',
    ticketRange: [1000, 5000],
    evolution: 'decline',
    closeReason: 'Pivot vers autre projet'
  },
  {
    id: '21',
    name: 'OQTF',
    realStartDate: '2022-01-01', // Corrigé : 2022
    realStatus: 'closed',
    revenueCategory: 'starter',
    revenueRange: [1000, 10000],
    customerCategory: 'few',
    customerRange: [5, 20],
    ticketSize: 'medium',
    ticketRange: [100, 1000],
    evolution: 'decline',
    closeReason: 'Pas de product-market fit'
  },
  {
    id: '22',
    name: 'PushTheButton',
    realStartDate: '2015-01-01', // Corrigé : 2015
    realStatus: 'closed',
    revenueCategory: 'traction',
    revenueRange: [10000, 50000],
    customerCategory: 'some',
    customerRange: [20, 100],
    ticketSize: 'medium',
    ticketRange: [100, 1000],
    evolution: 'decline',
    closeReason: 'Pas de product-market fit'
  },
  {
    id: '23',
    name: 'Rachat-Squat',
    realStartDate: '2024-01-01', // Corrigé : 2024
    realStatus: 'active', // Corrigé : actif pas fermé !
    revenueCategory: 'success',
    revenueRange: [200000, 500000],
    customerCategory: 'few',
    customerRange: [5, 20],
    ticketSize: 'enterprise',
    ticketRange: [5000, 20000],
    evolution: 'ongoing'
  },
  {
    id: '24',
    name: 'SitAndGo',
    realStartDate: '2014-01-01', // Corrigé : 2014
    realStatus: 'closed',
    revenueCategory: 'none',
    revenueRange: [0, 0],
    customerCategory: 'none',
    customerRange: [0, 5],
    ticketSize: 'small',
    ticketRange: [10, 100],
    evolution: 'decline',
    closeReason: 'Pas de product-market fit'
  },
  {
    id: '25',
    name: 'SixthSense',
    realStartDate: '2012-01-01', // Corrigé : 2012
    realStatus: 'closed',
    revenueCategory: 'growth',
    revenueRange: [50000, 200000],
    customerCategory: 'many',
    customerRange: [100, 500],
    ticketSize: 'medium',
    ticketRange: [100, 1000],
    evolution: 'decline',
    closeReason: 'Marché trop difficile'
  },
  {
    id: '26',
    name: 'TimeTwoBe',
    realStartDate: '2015-09-01',
    realStatus: 'closed',
    revenueCategory: 'none',
    revenueRange: [0, 0],
    customerCategory: 'none',
    customerRange: [0, 5],
    ticketSize: 'free',
    ticketRange: [0, 0],
    evolution: 'decline',
    closeReason: 'Pas de product-market fit'
  },
  {
    id: '27',
    name: 'WaterBags',
    realStartDate: '2016-06-01',
    realStatus: 'closed',
    revenueCategory: 'starter',
    revenueRange: [1000, 10000],
    customerCategory: 'none',
    customerRange: [0, 5],
    ticketSize: 'small',
    ticketRange: [10, 100],
    evolution: 'decline',
    closeReason: 'Pas de product-market fit'
  },
  {
    id: '28',
    name: 'Jumpbox',
    realStartDate: '2014-01-01', // Corrigé : 2014
    realStatus: 'closed',
    revenueCategory: 'none',
    revenueRange: [0, 0],
    customerCategory: 'none',
    customerRange: [0, 5],
    ticketSize: 'medium',
    ticketRange: [100, 1000],
    evolution: 'decline',
    closeReason: 'Pas de product-market fit'
  },
  {
    id: '29',
    name: 'Relight',
    realStartDate: '2023-01-01', // Corrigé : 2023
    realStatus: 'active', // Corrigé : actif pas fermé !
    revenueCategory: 'success',
    revenueRange: [200000, 500000],
    customerCategory: 'many',
    customerRange: [100, 500],
    ticketSize: 'small',
    ticketRange: [10, 100],
    evolution: 'ongoing'
  },
  {
    id: '30',
    name: 'Hematokey',
    realStartDate: '2025-07-01', // Corrigé : juillet 2025
    realStatus: 'active', // Corrigé : devrait être active
    revenueCategory: 'none',
    revenueRange: [0, 0],
    customerCategory: 'none',
    customerRange: [0, 5],
    ticketSize: 'small',
    ticketRange: [10, 100],
    evolution: 'not-launched'
  }
];