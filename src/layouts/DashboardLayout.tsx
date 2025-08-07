import { ReactNode, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { Business } from '../types/business';

interface DashboardLayoutProps {
  children: ReactNode;
  currentBusiness: string;
  onBusinessChange: (businessId: string) => void;
  businesses: Business[];
}

export default function DashboardLayout({ 
  children, 
  currentBusiness, 
  onBusinessChange,
  businesses 
}: DashboardLayoutProps) {
  const location = useLocation();
  const [showSidebar, setShowSidebar] = useState(false);
  const [contentReady, setContentReady] = useState(false);
  
  const businessList = businesses.map(b => ({
    id: b.id,
    name: b.name,
    logo: b.logo
  }));

  // Handle animation on navigation from HeroTerminal
  useEffect(() => {
    const shouldAnimate = location.state?.animate === true;
    
    if (shouldAnimate) {
      // Start animation sequence
      setTimeout(() => setShowSidebar(true), 100);
      setTimeout(() => setContentReady(true), 300);
      
      // Clear the animation state to prevent re-animation on refresh
      window.history.replaceState({}, document.title);
    } else {
      // No animation, show immediately
      setShowSidebar(true);
      setContentReady(true);
    }
  }, [location]);

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar with slide-in animation */}
      <div 
        className={`transition-transform duration-500 ease-out ${
          showSidebar ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar 
          currentBusiness={currentBusiness}
          onBusinessChange={onBusinessChange}
          businesses={businessList}
        />
      </div>
      
      {/* Main content with fade-in */}
      <main 
        className={`flex-1 overflow-y-auto transition-opacity duration-700 ${
          contentReady ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {children}
      </main>
    </div>
  );
}