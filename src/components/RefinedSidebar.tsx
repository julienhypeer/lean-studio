import { 
  LayoutDashboard, 
  Archive,
  Clock,
  Trophy,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Briefcase,
  Search
} from 'lucide-react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface RefinedSidebarProps {
  currentBusiness: string;
  onBusinessChange: (businessId: string) => void;
  businesses: Array<{ id: string; name: string; logo: string; }>;
}

export default function RefinedSidebar({ currentBusiness, onBusinessChange, businesses }: RefinedSidebarProps) {
  const [isBusinessDropdownOpen, setIsBusinessDropdownOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const currentBusinessData = businesses.find(b => b.id === currentBusiness);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Filter businesses based on search query
  const filteredBusinesses = searchQuery 
    ? businesses.filter(b => b.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : businesses;

  // Section 1 - Menus spécifiques au projet
  const projectMenuItems = [
    { 
      icon: LayoutDashboard, 
      label: 'Dashboard', 
      path: '/dashboard'
    },
    { 
      icon: Archive, 
      label: 'Archives', 
      path: '/archives'
    },
  ];

  // Section 2 - Menus globaux/transversaux
  const globalMenuItems = [
    { 
      icon: Clock, 
      label: 'Timeline', 
      path: '/portfolio'
    },
    { 
      icon: Trophy, 
      label: 'Trophées', 
      path: '/moments-forts'
    },
  ];

  return (
    <div className={`
      h-screen bg-slate-900 flex flex-col transition-all duration-300 ease-in-out
      ${isCollapsed ? 'w-16' : 'w-64'}
    `}>
      {/* Header with collapse button */}
      <div className="flex items-center justify-between px-4 py-5 border-b border-slate-800">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-accent rounded-lg flex items-center justify-center">
              <Briefcase className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-sm font-semibold text-white">Lean Studio</h1>
              <p className="text-xs text-slate-400">Track Record</p>
            </div>
          </div>
        )}

        {isCollapsed && (
          <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-accent rounded-lg flex items-center justify-center mx-auto">
            <Briefcase className="w-4 h-4 text-white" />
          </div>
        )}

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-md hover:bg-slate-800 transition-colors group"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-white" />
          ) : (
            <ChevronLeft className="h-4 w-4 text-slate-400 group-hover:text-white" />
          )}
        </button>
      </div>

      {/* Business Selector */}
      <div className={`${isCollapsed ? 'px-3' : 'px-4'} py-3`}>
        {!isCollapsed && (
          <p className="text-xs text-slate-500 font-medium uppercase tracking-wider px-1 mb-2">
            Projets
          </p>
        )}
        <div className="relative">
          <button
            onClick={() => setIsBusinessDropdownOpen(!isBusinessDropdownOpen)}
            className={`
              w-full flex items-center justify-between p-2.5 bg-slate-800/50 rounded-lg 
              hover:bg-slate-800 transition-colors group border border-slate-700/50
              ${isCollapsed ? 'justify-center' : ''}
            `}
            title={isCollapsed ? currentBusinessData?.name : undefined}
          >
            <div className={`flex items-center ${isCollapsed ? '' : 'gap-2.5'}`}>
              {currentBusinessData?.logo?.startsWith('/') ? (
                <img 
                  src={currentBusinessData.logo} 
                  alt={currentBusinessData.name}
                  className="w-6 h-6 rounded object-cover"
                />
              ) : (
                <span className="text-lg">{currentBusinessData?.logo}</span>
              )}
              {!isCollapsed && (
                <div className="text-left">
                  <div className="text-sm font-medium text-white">
                    {currentBusinessData?.name}
                  </div>
                </div>
              )}
            </div>
            {!isCollapsed && (
              <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${
                isBusinessDropdownOpen ? 'rotate-180' : ''
              }`} />
            )}
          </button>
          
          {/* Tooltip for collapsed state */}
          {isCollapsed && (
            <div className="absolute left-full ml-2 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 pointer-events-none">
              {currentBusinessData?.name}
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-1.5 h-1.5 bg-slate-800 rotate-45" />
            </div>
          )}
          
          <AnimatePresence>
            {isBusinessDropdownOpen && (
              <motion.div 
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="absolute top-full left-0 right-0 mt-1.5 bg-slate-800 rounded-lg shadow-xl z-50 border border-slate-700"
              >
                {/* Search Input */}
                <div className="p-2 border-b border-slate-700">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Rechercher un projet..."
                      className="w-full pl-8 pr-3 py-1.5 bg-slate-900 border border-slate-600 rounded-md text-sm text-white placeholder-slate-400 focus:outline-none focus:border-accent"
                      autoFocus
                    />
                  </div>
                </div>
                
                {/* Projects List */}
                <div className="max-h-64 overflow-y-auto">
                  {filteredBusinesses.length > 0 ? (
                    filteredBusinesses.map((business) => (
                      <button
                        key={business.id}
                        onClick={() => {
                          onBusinessChange(business.id);
                          setIsBusinessDropdownOpen(false);
                          setSearchQuery(''); // Reset search on selection
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2.5 hover:bg-slate-700 transition-colors"
                      >
                        {business.logo?.startsWith('/') ? (
                          <img 
                            src={business.logo} 
                            alt={business.name}
                            className="w-5 h-5 rounded object-cover"
                          />
                        ) : (
                          <span className="text-base">{business.logo}</span>
                        )}
                        <span className="text-sm text-slate-200">{business.name}</span>
                        {business.id === currentBusiness && (
                          <div className="ml-auto w-1.5 h-1.5 bg-accent rounded-full"></div>
                        )}
                      </button>
                    ))
                  ) : (
                    <div className="px-3 py-4 text-center text-sm text-slate-400">
                      Aucun projet trouvé
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-3 py-2 overflow-y-auto">
        {/* Section 1 - Menus spécifiques au projet */}
        <div className="mb-1">
          {!isCollapsed && (
            <p className="text-xs text-slate-500 font-medium uppercase tracking-wider px-3 mb-2">
              Infos
            </p>
          )}
          {projectMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <button
                key={item.label}
                onClick={() => navigate(item.path)}
                className={`
                  w-full flex items-center rounded-lg mb-1 transition-all duration-200 group relative
                  ${isActive 
                    ? 'bg-slate-800 text-white' 
                    : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
                  }
                  ${isCollapsed ? 'justify-center p-2.5' : 'px-3 py-2'}
                `}
                title={isCollapsed ? item.label : undefined}
              >
                {/* Active indicator */}
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-accent rounded-r-full" />
                )}
                
                <Icon className={`
                  flex-shrink-0 
                  ${isCollapsed ? 'w-4.5 h-4.5' : 'w-4 h-4 mr-3'}
                  ${isActive ? 'text-accent' : 'text-slate-400 group-hover:text-white'}
                `} />
                
                {!isCollapsed && (
                  <span className={`text-sm ${isActive ? 'font-medium' : ''}`}>
                    {item.label}
                  </span>
                )}
                
                {/* Tooltip for collapsed state */}
                {isCollapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 pointer-events-none">
                    {item.label}
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-1.5 h-1.5 bg-slate-800 rotate-45" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
        
        {/* Séparateur visuel */}
        <div className="mx-3 my-3 border-t border-slate-800"></div>
        
        {/* Section 2 - Menus globaux/transversaux */}
        <div>
          {!isCollapsed && (
            <p className="text-xs text-slate-500 font-medium uppercase tracking-wider px-3 mb-2">
              Global
            </p>
          )}
          {globalMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <button
                key={item.label}
                onClick={() => navigate(item.path)}
                className={`
                  w-full flex items-center rounded-lg mb-1 transition-all duration-200 group relative
                  ${isActive 
                    ? 'bg-slate-800 text-white' 
                    : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
                  }
                  ${isCollapsed ? 'justify-center p-2.5' : 'px-3 py-2'}
                `}
                title={isCollapsed ? item.label : undefined}
              >
                {/* Active indicator */}
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-accent rounded-r-full" />
                )}
                
                <Icon className={`
                  flex-shrink-0 
                  ${isCollapsed ? 'w-4.5 h-4.5' : 'w-4 h-4 mr-3'}
                  ${isActive ? 'text-accent' : 'text-slate-400 group-hover:text-white'}
                `} />
                
                {!isCollapsed && (
                  <span className={`text-sm ${isActive ? 'font-medium' : ''}`}>
                    {item.label}
                  </span>
                )}
                
                {/* Tooltip for collapsed state */}
                {isCollapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 pointer-events-none">
                    {item.label}
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-1.5 h-1.5 bg-slate-800 rotate-45" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Bottom Section */}
      <div className="mt-auto border-t border-slate-800">
        {/* Profile Section */}
        <div className={`${isCollapsed ? 'py-3 px-2' : 'p-3'}`}>
          {!isCollapsed ? (
            <div className="flex items-center px-3 py-2 rounded-lg bg-slate-800/30">
              <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center">
                <span className="text-slate-300 font-medium text-xs">JH</span>
              </div>
              <div className="flex-1 min-w-0 ml-2.5">
                <p className="text-sm font-medium text-slate-200 truncate">Julien H.</p>
                <p className="text-xs text-slate-400 truncate">Entrepreneur</p>
              </div>
              <div className="w-2 h-2 bg-green-500 rounded-full ml-2" title="Online" />
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="relative group">
                <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center">
                  <span className="text-slate-300 font-medium text-xs">JH</span>
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-slate-900" />
                
                {/* Tooltip */}
                <div className="absolute left-full ml-2 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 pointer-events-none">
                  Julien H. - Entrepreneur
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-1.5 h-1.5 bg-slate-800 rotate-45" />
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Portfolio Value */}
        <div className={`border-t border-slate-800 ${isCollapsed ? 'p-2' : 'p-3'}`}>
          {!isCollapsed ? (
            <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-lg px-3 py-2.5">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-accent" />
                  <span className="text-xs text-slate-300">Portfolio</span>
                </div>
                <span className="text-sm font-semibold text-white">€450K</span>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>4 business</span>
                <span className="text-green-400">+127% ROI</span>
              </div>
            </div>
          ) : (
            <div className="flex justify-center group relative">
              <div className="w-8 h-8 bg-gradient-to-br from-slate-800 to-slate-700 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-accent" />
              </div>
              
              {/* Tooltip */}
              <div className="absolute left-full ml-2 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 pointer-events-none">
                Portfolio: €450K | +127% ROI
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-1.5 h-1.5 bg-slate-800 rotate-45" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}