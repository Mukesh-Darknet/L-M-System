import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import Login from './pages/Login';
import LoginSelection from './pages/LoginSelection';
import CategorySelection from './pages/CategorySelection';
import Dashboard from './pages/Dashboard';
import Maintenance from './pages/maintenance/Maintenance';
import Reports from './pages/reports/Reports';
import Transactions from './pages/transactions/Transactions';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginSelection />} />
          <Route path="/admin-login" element={<Login expectedRole="admin" />} />
          <Route path="/user-login" element={<Login expectedRole="user" />} />

          <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route index element={<Navigate to="/category-selection" replace />} />
            <Route path="category-selection" element={<CategorySelection />} />
            <Route path="dashboard" element={<Dashboard />} />

            <Route path="maintenance/*" element={
              <ProtectedRoute requireAdmin={true}>
                <Maintenance />
              </ProtectedRoute>
            } />

            <Route path="reports/*" element={<Reports />} />
            <Route path="transactions/*" element={<Transactions />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
