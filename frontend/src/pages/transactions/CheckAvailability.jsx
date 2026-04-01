import React, { useState } from 'react';
import axios from 'axios';

const CheckAvailability = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [selected, setSelected] = useState('');
    const [message, setMessage] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        setMessage('');
        setResults([]);

        if (!query.trim()) {
            setMessage('Please enter a search term');
            return;
        }

        try {
            const { data } = await axios.get(`http://localhost:5001/api/transactions/availability?query=${encodeURIComponent(query)}`);
            if (data.length === 0) {
                setMessage('No available media found matching your query');
            } else {
                setResults(data);
            }
        } catch (error) {
            setMessage(error.response?.data?.message || 'Search failed');
        }
    };

    return (
        <div>
            <h2>Check Availability</h2>
            <form onSubmit={handleSearch} style={{ maxWidth: '500px', margin: '20px 0' }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <input
                        type="text"
                        className="form-control"
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        placeholder="Search by title..."
                    />
                    <button type="submit" className="btn">Search</button>
                </div>
            </form>

            {message && <p style={{ color: 'var(--danger)', marginBottom: '15px' }}>{message}</p>}

            {results.length > 0 && (
                <div style={{ marginTop: '20px' }}>
                    <h3 style={{ marginBottom: '10px' }}>Results:</h3>
                    {results.map(item => (
                        <div key={item._id} style={{ padding: '10px', border: '1px solid var(--border)', borderRadius: '8px', marginBottom: '10px' }}>
                            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                <input
                                    type="radio"
                                    name="selectedMedia"
                                    value={item.serialNo}
                                    checked={selected === item.serialNo}
                                    onChange={() => setSelected(item.serialNo)}
                                    style={{ marginRight: '15px' }}
                                />
                                <div>
                                    <strong>{item.title}</strong> ({item.type})<br />
                                    <small style={{ color: 'var(--text-light)' }}>
                                        Author/Director: {item.authorOrDirector} | Serial No: {item.serialNo}
                                    </small>
                                </div>
                            </label>
                        </div>
                    ))}

                    {selected && (
                        <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#e8f4f8', borderRadius: '8px' }}>
                            <strong>Selected Serial No:</strong> {selected} (Ready for issue)
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CheckAvailability;
