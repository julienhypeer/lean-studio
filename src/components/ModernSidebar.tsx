import { 
  LayoutDashboard, 
  Archive,
  Clock,
  Sparkles,
  ChevronDown,
  TrendingUp,
  Briefcase,
  ChevronRight
} from 'lucide-react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface ModernSidebarProps {
  currentBusiness: string;
  onBusinessChange: (businessId: string) => void;
  businesses: Array<{ id: string; name: string; logo: string; }>;
}

export default function ModernSidebar({ currentBusiness, onBusinessChange, businesses }: ModernSidebarProps) {
  const [isBusinessDropdownOpen, setIsBusinessDropdownOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const currentBusinessData = businesses.find(b => b.id === currentBusiness);
  const location = useLocation();
  const navigate = useNavigate();

  // Section 1 - Menus spécifiques au projet
  const projectMenuItems = [
    { 
      icon: LayoutDashboard, 
      label: 'Dashboard', 
      emoji: '📊',
      path: '/dashboard',
      description: 'Vue d\'ensemble du projet'
    },
    { 
      icon: Archive, 
      label: 'Archives', 
      emoji: '📚',
      path: '/archives',
      description: 'Historique et documents'
    },
  ];

  // Section 2 - Menus globaux/transversaux
  const globalMenuItems = [
    { 
      icon: Clock, 
      label: 'Timeline', 
      emoji: '⏱️',
      path: '/portfolio',
      description: 'Chronologie des projets'
    },
    { 
      icon: Sparkles, 
      label: 'Moments forts', 
      emoji: '✨',
      path: '/moments-forts',
      description: 'Étapes clés du parcours'
    },
  ];

  return (
    <div className="w-72 h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black flex flex-col relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full filter blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
      </div>

      {/* Content with higher z-index */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Logo/Brand */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 border-b border-white/10"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-accent to-orange-600 rounded-xl flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Lean Studio</h1>
              <p className="text-gray-400 text-xs">Track Record</p>
            </div>
          </div>
        </motion.div>

        {/* Business Selector */}
        <div className="px-4 py-3">
          <motion.div className="relative">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsBusinessDropdownOpen(!isBusinessDropdownOpen)}
              className="w-full flex items-center justify-between p-3 bg-white/5 backdrop-blur-sm rounded-xl hover:bg-white/10 transition-all duration-300 border border-white/10"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-white/20 to-white/5 rounded-lg flex items-center justify-center text-2xl backdrop-blur-sm">
                  {currentBusinessData?.logo}
                </div>
                <div className="text-left">
                  <div className="text-white font-semibold text-sm">
                    {currentBusinessData?.name}
                  </div>
                  <div className="text-gray-400 text-xs">Projet actif</div>
                </div>
              </div>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${isBusinessDropdownOpen ? 'rotate-180' : ''}`} />
            </motion.button>
            
            <AnimatePresence>
              {isBusinessDropdownOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-gray-800 backdrop-blur-xl rounded-xl shadow-2xl overflow-hidden z-50 border border-white/10"
                >
                  {businesses.map((business) => (
                    <motion.button
                      key={business.id}
                      whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                      onClick={() => {
                        onBusinessChange(business.id);
                        setIsBusinessDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-3 p-3 transition-colors"
                    >
                      <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-xl">
                        {business.logo}
                      </div>
                      <span className="text-gray-200 text-sm font-medium">{business.name}</span>
                      {business.id === currentBusiness && (
                        <div className="ml-auto w-2 h-2 bg-accent rounded-full"></div>
                      )}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-4 py-2 overflow-y-auto">
          {/* Section 1 - Menus spécifiques au projet */}
          <div className="mb-2">
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider px-3 mb-3">
              Projet
            </p>
            {projectMenuItems.map((item, index) => {
              const isActive = location.pathname === item.path;
              
              return (
                <motion.button
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => navigate(item.path)}
                  onMouseEnter={() => setHoveredItem(item.label)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={`w-full relative group mb-2`}
                >
                  <div className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 ${
                    isActive 
                      ? 'bg-gradient-to-r from-accent/20 to-orange-600/20 border border-accent/30' 
                      : 'hover:bg-white/5 border border-transparent'
                  }`}>
                    {/* Active indicator */}
                    {isActive && (
                      <motion.div 
                        layoutId="activeIndicator"
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-accent to-orange-600 rounded-r-full"
                      />
                    )}
                    
                    {/* Icon container */}
                    <div className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300 ${
                      isActive 
                        ? 'bg-gradient-to-br from-accent/30 to-orange-600/30' 
                        : 'bg-white/5 group-hover:bg-white/10'
                    }`}>
                      <span className="text-xl">{item.emoji}</span>
                    </div>
                    
                    {/* Label and description */}
                    <div className="flex-1 text-left">
                      <div className={`font-medium text-sm transition-colors ${
                        isActive ? 'text-white' : 'text-gray-300 group-hover:text-white'
                      }`}>
                        {item.label}
                      </div>
                      {hoveredItem === item.label && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="text-xs text-gray-500 mt-0.5"
                        >
                          {item.description}
                        </motion.div>
                      )}
                    </div>
                    
                    {/* Hover arrow */}
                    <ChevronRight className={`w-4 h-4 transition-all duration-300 ${
                      isActive 
                        ? 'text-accent opacity-100' 
                        : 'text-gray-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-1'
                    }`} />
                  </div>
                </motion.button>
              );
            })}
          </div>
          
          {/* Séparateur visuel */}
          <div className="mx-3 my-4 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-2 bg-gradient-to-r from-gray-900 via-gray-900 to-black">
                <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
              </span>
            </div>
          </div>
          
          {/* Section 2 - Menus globaux/transversaux */}
          <div>
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider px-3 mb-3">
              Global
            </p>
            {globalMenuItems.map((item, index) => {
              const isActive = location.pathname === item.path;
              
              return (
                <motion.button
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (index + 2) * 0.1 }}
                  onClick={() => navigate(item.path)}
                  onMouseEnter={() => setHoveredItem(item.label)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={`w-full relative group mb-2`}
                >
                  <div className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 ${
                    isActive 
                      ? 'bg-gradient-to-r from-accent/20 to-orange-600/20 border border-accent/30' 
                      : 'hover:bg-white/5 border border-transparent'
                  }`}>
                    {/* Active indicator */}
                    {isActive && (
                      <motion.div 
                        layoutId="activeIndicator"
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-accent to-orange-600 rounded-r-full"
                      />
                    )}
                    
                    {/* Icon container */}
                    <div className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300 ${
                      isActive 
                        ? 'bg-gradient-to-br from-accent/30 to-orange-600/30' 
                        : 'bg-white/5 group-hover:bg-white/10'
                    }`}>
                      <span className="text-xl">{item.emoji}</span>
                    </div>
                    
                    {/* Label and description */}
                    <div className="flex-1 text-left">
                      <div className={`font-medium text-sm transition-colors ${
                        isActive ? 'text-white' : 'text-gray-300 group-hover:text-white'
                      }`}>
                        {item.label}
                      </div>
                      {hoveredItem === item.label && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="text-xs text-gray-500 mt-0.5"
                        >
                          {item.description}
                        </motion.div>
                      )}
                    </div>
                    
                    {/* Hover arrow */}
                    <ChevronRight className={`w-4 h-4 transition-all duration-300 ${
                      isActive 
                        ? 'text-accent opacity-100' 
                        : 'text-gray-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-1'
                    }`} />
                  </div>
                </motion.button>
              );
            })}
          </div>
        </nav>

        {/* Bottom Section */}
        <div className="p-4 border-t border-white/10">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-r from-accent/10 to-orange-600/10 backdrop-blur-sm rounded-xl p-4 border border-accent/20"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-accent" />
                <span className="text-gray-300 text-sm font-medium">Portfolio Value</span>
              </div>
              <span className="text-white font-bold text-lg">€450K</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-gray-400">2 actifs</span>
              </div>
              <span className="text-gray-400">4 business</span>
            </div>
            <div className="mt-3 pt-3 border-t border-white/10">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">ROI Global</span>
                <span className="text-xs font-semibold text-green-400">+127%</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}