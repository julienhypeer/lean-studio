import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useSearchParams } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import { mockBusinesses } from './data/mockData';

function AppContent() {
  const [currentBusinessId, setCurrentBusinessId] = useState(mockBusinesses[0].id);
  const currentBusiness = mockBusinesses.find(b => b.id === currentBusinessId) || mockBusinesses[0];
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // Handle business query parameter from Home page navigation
  useEffect(() => {
    const businessParam = searchParams.get('business');
    if (businessParam && mockBusinesses.find(b => b.id === businessParam)) {
      setCurrentBusinessId(businessParam);
    }
  }, [searchParams]);

  return (
    <DashboardLayout 
      currentBusiness={currentBusinessId}
      onBusinessChange={setCurrentBusinessId}
      businesses={mockBusinesses}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard business={currentBusiness} />} />
          <Route path="/analytics" element={
            <div className="p-8">
              <h1 className="text-3xl font-bold">Analytics - En construction</h1>
            </div>
          } />
          <Route path="/metrics" element={
            <div className="p-8">
              <h1 className="text-3xl font-bold">Métriques - En construction</h1>
            </div>
          } />
          <Route path="/products" element={
            <div className="p-8">
              <h1 className="text-3xl font-bold">Produits - En construction</h1>
            </div>
          } />
          <Route path="/messages" element={
            <div className="p-8">
              <h1 className="text-3xl font-bold">Messages - En construction</h1>
            </div>
          } />
          <Route path="/timeline" element={
            <div className="p-8">
              <h1 className="text-3xl font-bold">Timeline - En construction</h1>
            </div>
          } />
          <Route path="/settings" element={
            <div className="p-8">
              <h1 className="text-3xl font-bold">Paramètres - En construction</h1>
            </div>
          } />
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