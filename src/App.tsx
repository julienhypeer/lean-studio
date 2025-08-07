import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useSearchParams } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import ModernDashboard from './pages/ModernDashboard';
import Portfolio from './pages/Portfolio';
import HeroTerminal from './pages/HeroTerminal';
import ModernMomentsForts from './pages/ModernMomentsForts';
import ModernArchives from './pages/ModernArchives';
import { mockBusinesses } from './data/mockData';

function AppContent() {
  const [currentBusinessId, setCurrentBusinessId] = useState(mockBusinesses[0].id);
  const currentBusiness = mockBusinesses.find(b => b.id === currentBusinessId) || mockBusinesses[0];
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // Handle business query parameter from Portfolio page navigation
  useEffect(() => {
    const businessParam = searchParams.get('business');
    if (businessParam && mockBusinesses.find(b => b.id === businessParam)) {
      setCurrentBusinessId(businessParam);
    }
  }, [searchParams]);

  // Routes without layout (full screen)
  if (location.pathname === '/') {
    return <HeroTerminal />;
  }

  // Routes with sidebar layout
  return (
    <DashboardLayout 
      currentBusiness={currentBusinessId}
      onBusinessChange={setCurrentBusinessId}
      businesses={mockBusinesses}
    >
      <Routes>
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/dashboard" element={<ModernDashboard business={currentBusiness} />} />
        <Route path="/archives" element={<ModernArchives business={currentBusiness} />} />
        <Route path="/moments-forts" element={<ModernMomentsForts />} />
        <Route path="/journal" element={<ModernMomentsForts />} />
      </Routes>
      </DashboardLayout>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;