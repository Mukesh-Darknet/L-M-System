import React from 'react';
import { useNavigate, Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Layout = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="app-layout fade-in" style={{ flexDirection: 'column' }}>
            <header className="topbar">
                <div className="topbar-logo">
                    <h2>LMS</h2>
                </div>
                <nav className="top-nav">
                    <Link to="/dashboard" className={`nav-item ${location.pathname === '/dashboard' ? 'active' : ''}`}>
                        Dashboard
                    </Link>
                    {user?.role === 'admin' && (
                        <Link to="/maintenance" className={`nav-item ${location.pathname.startsWith('/maintenance') ? 'active' : ''}`}>
                            Maintenance
                        </Link>
                    )}
                    <Link to="/reports" className={`nav-item ${location.pathname.startsWith('/reports') ? 'active' : ''}`}>
                        Reports
                    </Link>
                    <Link to="/transactions" className={`nav-item ${location.pathname.startsWith('/transactions') ? 'active' : ''}`}>
                        Transactions
                    </Link>
                </nav>
                <div className="topbar-actions">
                    <div className="user-info" style={{ marginRight: '20px' }}>
                        Hi, <strong>{user?.name}</strong> (<span style={{ textTransform: 'capitalize', color: 'var(--primary)' }}>{user?.role}</span>)
                    </div>
                    <button className="btn btn-danger" style={{ padding: '8px 16px', fontSize: '14px' }} onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </header>
            <main className="main-content">
                <div className="page-content" style={{ marginTop: '70px' }}>
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default Layout;
