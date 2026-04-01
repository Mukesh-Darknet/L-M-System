import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = ({ expectedRole }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login, logout } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!username || !password) {
            setError('Both fields are required');
            return;
        }

        const res = await login(username, password);
        if (res.success) {
            if (res.user.role !== expectedRole) {
                logout(); // remove wrong role session
                setError(`Access denied. You do not have ${expectedRole} privileges.`);
            } else {
                navigate('/category-selection');
            }
        } else {
            setError(res.message);
        }
    };

    return (
        <div className="centered-page">
            <div className="login-card fade-in">
                <h1 style={{ textTransform: 'capitalize' }}>{expectedRole} Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            className="form-control"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter username"
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                        />
                    </div>
                    {error && <div className="error-text" style={{ marginBottom: '15px', fontWeight: 'bold' }}>{error}</div>}

                    <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
                        <button type="button" className="btn btn-danger" style={{ flex: 1 }} onClick={() => navigate('/login')}>
                            Cancel
                        </button>
                        <button type="submit" className="btn" style={{ flex: 1 }}>
                            Log In
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
