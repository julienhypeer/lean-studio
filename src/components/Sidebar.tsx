import { 
  Home,
  LayoutDashboard, 
  BarChart3, 
  MessageSquare, 
  Calendar,
  Settings,
  TrendingUp,
  Briefcase,
  LogOut,
  ChevronDown
} from 'lucide-react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface SidebarProps {
  currentBusiness: string;
  onBusinessChange: (businessId: string) => void;
  businesses: Array<{ id: string; name: string; logo: string; }>;
}

export default function Sidebar({ currentBusiness, onBusinessChange, businesses }: SidebarProps) {
  const [isBusinessDropdownOpen, setIsBusinessDropdownOpen] = useState(false);
  const currentBusinessData = businesses.find(b => b.id === currentBusiness);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { icon: Home, label: 'Portfolio', path: '/portfolio' },
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: BarChart3, label: 'Analytics', path: '/analytics' },
    { icon: TrendingUp, label: 'Métriques', path: '/metrics' },
    { icon: Briefcase, label: 'Produits', path: '/products' },
    { icon: MessageSquare, label: 'Messages', path: '/messages' },
    { icon: Calendar, label: 'Timeline', path: '/timeline' },
    { icon: Settings, label: 'Paramètres', path: '/settings' },
  ];

  return (
    <div className="w-64 h-screen bg-primary-600 flex flex-col">
      {/* Business Selector */}
      <div className="p-4 border-b border-white/20">
        <div className="relative">
          <button
            onClick={() => setIsBusinessDropdownOpen(!isBusinessDropdownOpen)}
            className="w-full flex items-center justify-between p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{currentBusinessData?.logo}</span>
              <div className="text-left">
                <div className="text-white font-semibold text-sm">
                  {currentBusinessData?.name}
                </div>
                <div className="text-white/60 text-xs">Portfolio</div>
              </div>
            </div>
            <ChevronDown className={`w-4 h-4 text-white/60 transition-transform ${isBusinessDropdownOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {isBusinessDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg overflow-hidden z-50">
              {businesses.map((business) => (
                <button
                  key={business.id}
                  onClick={() => {
                    onBusinessChange(business.id);
                    setIsBusinessDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors"
                >
                  <span className="text-xl">{business.logo}</span>
                  <span className="text-gray-700 text-sm font-medium">{business.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Logo/Brand */}
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold text-white">Lean Studio</h1>
        <p className="text-white/60 text-sm mt-1">Track Record</p>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4">
        {menuItems.map((item) => (
          <button
            key={item.label}
            onClick={() => navigate(item.path)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition-all mb-1 ${
              location.pathname === item.path ? 'bg-white/20 text-white' : ''
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-white/20">
        <div className="bg-white/10 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white/80 text-sm">Portfolio Value</span>
            <span className="text-white font-bold">€450K</span>
          </div>
          <div className="text-xs text-white/60">
            4 business • 2 actifs
          </div>
        </div>
        
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition-all">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Déconnexion</span>
        </button>
      </div>
    </div>
  );
}