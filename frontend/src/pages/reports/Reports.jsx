import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Reports = () => {
    const [activeTab, setActiveTab] = useState('active-issues');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchData = async (tab) => {
        setLoading(true);
        setError('');
        try {
            let endpoint = '';
            if (tab === 'active-issues') endpoint = '/api/reports/active-issues';
            else if (tab === 'memberships') endpoint = '/api/reports/memberships';
            else if (tab === 'books') endpoint = '/api/reports/media?type=book';
            else if (tab === 'movies') endpoint = '/api/reports/media?type=movie';
            else if (tab === 'overdue') endpoint = '/api/reports/overdue-returns';

            const res = await axios.get(`http://localhost:5001${endpoint}`);
            setData(res.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch report');
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchData(activeTab);
    }, [activeTab]);

    const renderTable = () => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p className="error-text">{error}</p>;
        if (data.length === 0) return <p>No records found.</p>;

        if (activeTab === 'memberships') {
            return (
                <div className="table-responsive">
                    <table>
                        <thead>
                            <tr>
                                <th>Member ID</th>
                                <th>Name</th>
                                <th>Contact</th>
                                <th>End Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(item => (
                                <tr key={item._id}>
                                    <td>{item.memberId}</td>
                                    <td>{item.name}</td>
                                    <td>{item.contact}</td>
                                    <td>{new Date(item.endDate).toLocaleDateString()}</td>
                                    <td>{item.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
        }

        if (activeTab === 'books' || activeTab === 'movies') {
            return (
                <div className="table-responsive">
                    <table>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>{activeTab === 'books' ? 'Author' : 'Director'}</th>
                                <th>Serial No</th>
                                <th>Available</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(item => (
                                <tr key={item._id}>
                                    <td>{item.title}</td>
                                    <td>{item.authorOrDirector}</td>
                                    <td>{item.serialNo}</td>
                                    <td>{item.isAvailable ? 'Yes' : 'No'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
        }

        // Active issues and overdue returns share similar transaction structure
        return (
            <div className="table-responsive">
                <table>
                    <thead>
                        <tr>
                            <th>Media Title</th>
                            <th>Serial No</th>
                            <th>Issued To</th>
                            <th>Issue Date</th>
                            <th>Expected Return</th>
                            {activeTab === 'overdue' && <th>Fine</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item._id}>
                                <td>{item.mediaId?.title}</td>
                                <td>{item.mediaId?.serialNo}</td>
                                <td>{item.memberId}</td>
                                <td>{new Date(item.issueDate).toLocaleDateString()}</td>
                                <td>{new Date(item.returnDate).toLocaleDateString()}</td>
                                {activeTab === 'overdue' && <td style={{ color: 'var(--danger)' }}>Overdue</td>}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    return (
        <div className="fade-in">
            <h1 style={{ marginBottom: '20px' }}>Reports</h1>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '30px' }}>
                {['active-issues', 'memberships', 'books', 'movies', 'overdue'].map(tab => (
                    <button
                        key={tab}
                        className={`btn ${activeTab === tab ? '' : 'btn-danger'}`}
                        style={{ backgroundColor: activeTab === tab ? 'var(--primary)' : 'var(--text-light)', padding: '8px 16px', fontSize: '14px' }}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab.replace('-', ' ').toUpperCase()}
                    </button>
                ))}
            </div>

            <div className="card">
                <h3 style={{ marginBottom: '20px', textTransform: 'capitalize' }}>{activeTab.replace('-', ' ')}</h3>
                {renderTable()}
            </div>
        </div>
    );
};

export default Reports;
