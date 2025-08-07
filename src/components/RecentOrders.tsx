import { Order } from '../types/business';
import { ShoppingCart, User } from 'lucide-react';

interface RecentOrdersProps {
  orders: Order[];
}

export default function RecentOrders({ orders }: RecentOrdersProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Aujourd'hui";
    if (diffDays === 1) return "Hier";
    if (diffDays < 7) return `Il y a ${diffDays} jours`;
    
    return date.toLocaleDateString('fr-FR', { 
      day: 'numeric', 
      month: 'short' 
    });
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: 'En attente', class: 'bg-yellow-100 text-yellow-700' },
      completed: { label: 'Complété', class: 'bg-green-100 text-green-700' },
      cancelled: { label: 'Annulé', class: 'bg-red-100 text-red-700' },
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.class}`}>
        {config.label}
      </span>
    );
  };

  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-card shadow-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <ShoppingCart className="w-5 h-5 text-primary-600" />
          <h3 className="text-lg font-semibold text-text-primary">Commandes Récentes</h3>
        </div>
        <div className="text-center py-8">
          <p className="text-text-secondary">Aucune commande récente</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-card shadow-card">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-primary-600" />
            <h3 className="text-lg font-semibold text-text-primary">Commandes Récentes</h3>
          </div>
          <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
            Voir tout →
          </button>
        </div>
      </div>
      
      <div className="divide-y divide-gray-100">
        {orders.map((order) => (
          <div key={order.id} className="p-6 hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  {order.customerAvatar ? (
                    <img 
                      src={order.customerAvatar} 
                      alt={order.customerName}
                      className="w-10 h-10 rounded-full"
                    />
                  ) : (
                    <User className="w-5 h-5 text-gray-600" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-text-primary">
                    {order.customerName}
                  </p>
                  <p className="text-xs text-text-secondary">
                    {order.productName}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm font-semibold text-text-primary">
                    {formatCurrency(order.amount)}
                  </p>
                  <p className="text-xs text-text-secondary">
                    {formatDate(order.date)}
                  </p>
                </div>
                {getStatusBadge(order.status)}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {orders.length > 0 && (
        <div className="p-4 bg-gray-50 text-center">
          <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium">
            Charger plus
          </button>
        </div>
      )}
    </div>
  );
}