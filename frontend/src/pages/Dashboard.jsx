import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const category = localStorage.getItem('selectedCategory') || 'books';

    return (
        <div className="fade-in">
            <h1 style={{ marginBottom: '30px' }}>
                Dashboard <span style={{ fontSize: '18px', fontWeight: 'normal', color: 'var(--text-light)' }}>(Category: <span style={{ textTransform: 'capitalize' }}>{category}</span>)</span>
            </h1>

            <div className="dashboard-grid">
                {user?.role === 'admin' && (
                    <div className="card dashboard-card" onClick={() => navigate('/maintenance')}>
                        <h3>⚙️ Maintenance</h3>
                        <p style={{ marginTop: '10px', color: 'var(--text-light)' }}>Manage books, movies, users and memberships</p>
                    </div>
                )}
                <div className="card dashboard-card" onClick={() => navigate('/reports')}>
                    <h3>📊 Reports</h3>
                    <p style={{ marginTop: '10px', color: 'var(--text-light)' }}>View active issues, overdue returns and master lists</p>
                </div>
                <div className="card dashboard-card" onClick={() => navigate('/transactions')}>
                    <h3>🔄 Transactions</h3>
                    <p style={{ marginTop: '10px', color: 'var(--text-light)' }}>Issue, return media and pay fines</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
