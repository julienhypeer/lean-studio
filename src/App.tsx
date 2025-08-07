import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import { mockBusinesses } from './data/mockData';

function App() {
  const [currentBusinessId, setCurrentBusinessId] = useState(mockBusinesses[0].id);
  const currentBusiness = mockBusinesses.find(b => b.id === currentBusinessId) || mockBusinesses[0];

  return (
    <Router>
      <DashboardLayout 
        currentBusiness={currentBusinessId}
        onBusinessChange={setCurrentBusinessId}
        businesses={mockBusinesses}
      >
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
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
    </Router>
  );
}

export default App;