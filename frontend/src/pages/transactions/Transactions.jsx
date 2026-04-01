import React, { useState } from 'react';
import CheckAvailability from './CheckAvailability';
import IssueMedia from './IssueMedia';
import ReturnMedia from './ReturnMedia';
import PayFine from './PayFine';

const Transactions = () => {
    const [activeTab, setActiveTab] = useState('check'); // check, issue, return, pay
    const [fineData, setFineData] = useState(null);

    const handleRedirectToFine = (data) => {
        setFineData(data);
        setActiveTab('pay');
    };

    return (
        <div className="fade-in">
            <h1 style={{ marginBottom: '20px' }}>Transactions</h1>
            <div style={{ display: 'flex', gap: '15px', marginBottom: '30px', flexWrap: 'wrap' }}>
                <button
                    className={`btn ${activeTab === 'check' ? '' : 'btn-danger'}`}
                    style={{ backgroundColor: activeTab === 'check' ? 'var(--primary)' : 'var(--text-light)' }}
                    onClick={() => setActiveTab('check')}
                >
                    Check Availability
                </button>
                <button
                    className={`btn ${activeTab === 'issue' ? '' : 'btn-danger'}`}
                    style={{ backgroundColor: activeTab === 'issue' ? 'var(--primary)' : 'var(--text-light)' }}
                    onClick={() => setActiveTab('issue')}
                >
                    Issue Book/Movie
                </button>
                <button
                    className={`btn ${activeTab === 'return' ? '' : 'btn-danger'}`}
                    style={{ backgroundColor: activeTab === 'return' ? 'var(--primary)' : 'var(--text-light)' }}
                    onClick={() => setActiveTab('return')}
                >
                    Return Book/Movie
                </button>
                <button
                    className={`btn ${activeTab === 'pay' ? '' : 'btn-danger'}`}
                    style={{ backgroundColor: activeTab === 'pay' ? 'var(--primary)' : 'var(--text-light)' }}
                    onClick={() => { setActiveTab('pay'); setFineData(null); }}
                >
                    Pay Fine
                </button>
            </div>

            <div className="card">
                {activeTab === 'check' && <CheckAvailability />}
                {activeTab === 'issue' && <IssueMedia />}
                {activeTab === 'return' && <ReturnMedia onRedirectToFine={handleRedirectToFine} />}
                {activeTab === 'pay' && <PayFine prefillData={fineData} />}
            </div>
        </div>
    );
};

export default Transactions;
