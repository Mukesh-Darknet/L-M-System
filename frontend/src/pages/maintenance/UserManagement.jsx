import React, { useState } from 'react';
import axios from 'axios';

const UserManagement = () => {
    const [mode, setMode] = useState('new'); // new or existing
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    const [message, setMessage] = useState('');

    const fetchUser = async () => {
        if (!username) return;
        try {
            const { data } = await axios.get(`http://localhost:5001/api/maintenance/users/${username}`);
            setName(data.name);
            setRole(data.role);
            setMessage('Details fetched successfully');
        } catch (error) {
            setMessage(error.response?.data?.message || 'User not found');
            setName('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        if (!name) {
            setMessage('Name is mandatory');
            return;
        }

        try {
            if (mode === 'new') {
                if (!username || !password) {
                    setMessage('Username and Password required for new user');
                    return;
                }
                await axios.post('http://localhost:5001/api/maintenance/users', {
                    name, username, password, role
                });
                setMessage('User added successfully');
                setName(''); setUsername(''); setPassword('');
            } else {
                await axios.put(`http://localhost:5001/api/maintenance/users/${username}`, {
                    name, role
                });
                setMessage('User updated successfully');
                setName(''); setUsername(''); setPassword('');
            }
        } catch (error) {
            setMessage(error.response?.data?.message || 'Operation failed');
        }
    };

    return (
        <div>
            <h2>User Management</h2>
            <div style={{ margin: '20px 0' }}>
                <label style={{ marginRight: '15px' }}>
                    <input type="radio" checked={mode === 'new'} onChange={() => { setMode('new'); setMessage(''); }} /> New User
                </label>
                <label>
                    <input type="radio" checked={mode === 'existing'} onChange={() => { setMode('existing'); setMessage(''); }} /> Existing User
                </label>
            </div>

            <form onSubmit={handleSubmit} style={{ maxWidth: '400px' }}>
                <div className="form-group">
                    <label>Username</label>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <input type="text" className="form-control" value={username} onChange={e => setUsername(e.target.value)} />
                        {mode === 'existing' && (
                            <button type="button" className="btn" onClick={fetchUser}>Fetch</button>
                        )}
                    </div>
                </div>

                <div className="form-group">
                    <label>Name (Mandatory)</label>
                    <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)} />
                </div>

                {mode === 'new' && (
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} />
                    </div>
                )}

                <div className="form-group">
                    <label>Role</label>
                    <select className="form-control" value={role} onChange={e => setRole(e.target.value)}>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>

                {message && <div style={{ color: message.includes('success') ? 'var(--success)' : 'var(--danger)', marginBottom: '15px' }}>{message}</div>}

                <button type="submit" className="btn">Submit</button>
            </form>
        </div>
    );
};

export default UserManagement;
