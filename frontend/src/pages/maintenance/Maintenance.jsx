import React, { useState } from 'react';
import MembershipForm from './MembershipForm';
import MediaForm from './MediaForm';
import UserManagement from './UserManagement';

const Maintenance = () => {
    const [activeTab, setActiveTab] = useState('membership'); // membership, media, users

    return (
        <div className="fade-in">
            <h1 style={{ marginBottom: '20px' }}>Maintenance</h1>
            <div style={{ display: 'flex', gap: '15px', marginBottom: '30px' }}>
                <button
                    className={`btn ${activeTab === 'membership' ? '' : 'btn-danger'}`}
                    style={{ backgroundColor: activeTab === 'membership' ? 'var(--primary)' : 'var(--text-light)' }}
                    onClick={() => setActiveTab('membership')}
                >
                    Memberships
                </button>
                <button
                    className={`btn ${activeTab === 'media' ? '' : 'btn-danger'}`}
                    style={{ backgroundColor: activeTab === 'media' ? 'var(--primary)' : 'var(--text-light)' }}
                    onClick={() => setActiveTab('media')}
                >
                    Books / Movies
                </button>
                <button
                    className={`btn ${activeTab === 'users' ? '' : 'btn-danger'}`}
                    style={{ backgroundColor: activeTab === 'users' ? 'var(--primary)' : 'var(--text-light)' }}
                    onClick={() => setActiveTab('users')}
                >
                    User Management
                </button>
            </div>

            <div className="card">
                {activeTab === 'membership' && <MembershipForm />}
                {activeTab === 'media' && <MediaForm />}
                {activeTab === 'users' && <UserManagement />}
            </div>
        </div>
    );
};

export default Maintenance;
