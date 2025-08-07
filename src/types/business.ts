export interface Business {
  id: string;
  name: string;
  tagline: string;
  logo: string;
  status: 'active' | 'pivoted' | 'sold' | 'closed';
  startDate: string;
  endDate?: string;
  industry: string;
  
  metrics: {
    totalRevenue: number;
    totalExpenses: number;
    totalCustomers: number;
    totalOrders: number;
    mrr: number;
    arr: number;
    cac: number;
    ltv: number;
    churnRate: number;
    runway: number;
    burnRate: number;
    grossMargin: number;
  };
  
  monthlyData: MonthlyData[];
  products: Product[];
  recentOrders: Order[];
  milestones: Milestone[];
  lessonsLearned: string[];
}

export interface MonthlyData {
  month: string;
  revenue: number;
  expenses: number;
  customers: number;
  orders: number;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  sales: number;
  revenue: number;
  status: 'available' | 'out-of-stock' | 'discontinued';
  image?: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerAvatar?: string;
  productName: string;
  amount: number;
  date: string;
  status: 'pending' | 'completed' | 'cancelled';
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'launch' | 'pivot' | 'funding' | 'milestone' | 'exit';
  impact: 'low' | 'medium' | 'high' | 'critical';
}