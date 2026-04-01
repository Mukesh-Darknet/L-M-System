import React from 'react';
import { useNavigate } from 'react-router-dom';

const CategorySelection = () => {
    const navigate = useNavigate();

    const handleSelect = (category) => {
        // We could store it in context, but purely navigational 
        // to Dashboard right now based on requirements
        localStorage.setItem('selectedCategory', category);
        navigate('/dashboard');
    };

    return (
        <div className="card fade-in" style={{ textAlign: 'center', padding: '60px 20px' }}>
            <h2 style={{ marginBottom: '40px', fontSize: '28px' }}>Select Category</h2>
            <div className="dashboard-grid" style={{ justifyContent: 'center' }}>
                <div
                    className="dashboard-card"
                    style={{ border: '2px solid var(--primary)', borderRadius: '12px' }}
                    onClick={() => handleSelect('books')}
                >
                    <h3>📚 Books</h3>
                    <p style={{ marginTop: '10px', color: 'var(--text-light)' }}>Manage Library Books</p>
                </div>
                <div
                    className="dashboard-card"
                    style={{ border: '2px solid var(--secondary)', borderRadius: '12px' }}
                    onClick={() => handleSelect('movies')}
                >
                    <h3>🎬 Movies</h3>
                    <p style={{ marginTop: '10px', color: 'var(--text-light)' }}>Manage Library Movies</p>
                </div>
            </div>
        </div>
    );
};

export default CategorySelection;
