import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginSelection = () => {
    const navigate = useNavigate();

    return (
        <div className="centered-page">
            <div className="login-card fade-in" style={{ textAlign: 'center', padding: '50px 40px' }}>
                <h1 style={{ marginBottom: '40px', color: 'var(--primary)' }}>Select Portal</h1>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <button
                        className="btn"
                        style={{ padding: '15px', fontSize: '18px' }}
                        onClick={() => navigate('/admin-login')}
                    >
                        Admin Login
                    </button>
                    <button
                        className="btn"
                        style={{ padding: '15px', fontSize: '18px', backgroundColor: 'var(--secondary)', color: '#2c3e50' }}
                        onClick={() => navigate('/user-login')}
                    >
                        User Login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginSelection;
