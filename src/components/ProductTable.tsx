import { Product } from '../types/business';
import { TrendingUp, Package } from 'lucide-react';

interface ProductTableProps {
  products: Product[];
  title?: string;
}

export default function ProductTable({ products, title = 'Produits Populaires' }: ProductTableProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      available: { label: 'Disponible', class: 'bg-green-100 text-green-700' },
      'out-of-stock': { label: 'Rupture', class: 'bg-orange-100 text-orange-700' },
      discontinued: { label: 'Arrêté', class: 'bg-gray-100 text-gray-700' },
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.available;
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.class}`}>
        {config.label}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-card shadow-card">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-primary-600" />
            <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
          </div>
          <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
            Voir tout →
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left py-3 px-6 text-xs font-medium text-text-secondary uppercase tracking-wider">
                Produit
              </th>
              <th className="text-left py-3 px-6 text-xs font-medium text-text-secondary uppercase tracking-wider">
                Catégorie
              </th>
              <th className="text-left py-3 px-6 text-xs font-medium text-text-secondary uppercase tracking-wider">
                Prix
              </th>
              <th className="text-left py-3 px-6 text-xs font-medium text-text-secondary uppercase tracking-wider">
                Ventes
              </th>
              <th className="text-left py-3 px-6 text-xs font-medium text-text-secondary uppercase tracking-wider">
                Revenue
              </th>
              <th className="text-left py-3 px-6 text-xs font-medium text-text-secondary uppercase tracking-wider">
                Statut
              </th>
            </tr>
          </thead>
          <tbody>
            {products.slice(0, 5).map((product, index) => (
              <tr 
                key={product.id} 
                className={`hover:bg-gray-50 transition-colors ${
                  index !== products.length - 1 ? 'border-b border-gray-100' : ''
                }`}
              >
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                      <Package className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text-primary">{product.name}</p>
                      <p className="text-xs text-text-secondary">#{product.id}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className="text-sm text-text-primary">{product.category}</span>
                </td>
                <td className="py-4 px-6">
                  <span className="text-sm font-medium text-text-primary">
                    {formatCurrency(product.price)}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-1">
                    <span className="text-sm text-text-primary">{product.sales}</span>
                    <TrendingUp className="w-3 h-3 text-green-500" />
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className="text-sm font-semibold text-text-primary">
                    {formatCurrency(product.revenue)}
                  </span>
                </td>
                <td className="py-4 px-6">
                  {getStatusBadge(product.status)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}