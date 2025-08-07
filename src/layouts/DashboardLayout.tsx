import { ReactNode } from 'react';
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
  const businessList = businesses.map(b => ({
    id: b.id,
    name: b.name,
    logo: b.logo
  }));

  return (
    <div className="flex h-screen bg-background">
      <Sidebar 
        currentBusiness={currentBusiness}
        onBusinessChange={onBusinessChange}
        businesses={businessList}
      />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}