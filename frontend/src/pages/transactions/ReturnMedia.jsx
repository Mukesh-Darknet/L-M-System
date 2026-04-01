import React, { useState } from 'react';
import axios from 'axios';

const ReturnMedia = ({ onRedirectToFine }) => {
    const [serialNo, setSerialNo] = useState('');
    const [transaction, setTransaction] = useState(null);
    const [actualReturnDate, setActualReturnDate] = useState(new Date().toISOString().split('T')[0]);
    const [message, setMessage] = useState('');

    const fetchIssue = async () => {
        if (!serialNo) return;
        try {
            const { data } = await axios.get(`http://localhost:5001/api/transactions/issued/${serialNo}`);
            setTransaction(data);
            setMessage('Issue record found');
        } catch (error) {
            setMessage(error.response?.data?.message || 'No active issue found for this serial number');
            setTransaction(null);
        }
    };

    const handleConfirm = async () => {
        setMessage('');
        try {
            const { data } = await axios.post('http://localhost:5001/api/transactions/return', {
                transactionId: transaction._id,
                actualReturnDate
            });
            setMessage('Returned successfully! Redirecting to Fine Payment...');
            setTimeout(() => {
                onRedirectToFine(data);
            }, 1000);
        } catch (error) {
            setMessage(error.response?.data?.message || 'Failed to return');
        }
    };

    return (
        <div>
            <h2>Return Book/Movie</h2>

            <div className="form-group" style={{ maxWidth: '500px', margin: '20px 0' }}>
                <label>Serial Number (Mandatory)</label>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <input type="text" className="form-control" value={serialNo} onChange={e => setSerialNo(e.target.value)} />
                    <button type="button" className="btn" onClick={fetchIssue}>Fetch Details</button>
                </div>
            </div>

            {message && <p style={{ color: message.includes('Redir') ? 'var(--success)' : 'var(--danger)', marginBottom: '15px' }}>{message}</p>}

            {transaction && (
                <div style={{ maxWidth: '500px', background: '#f8f9fa', padding: '20px', borderRadius: '8px' }}>
                    <div className="form-group">
                        <label>Book/Movie Name</label>
                        <input type="text" className="form-control" value={transaction.mediaId.title} readOnly disabled />
                    </div>
                    <div className="form-group">
                        <label>Author/Director</label>
                        <input type="text" className="form-control" value={transaction.mediaId.authorOrDirector} readOnly disabled />
                    </div>
                    <div className="form-group">
                        <label>Issue Date (Auto-filled, non-editable)</label>
                        <input type="text" className="form-control" value={new Date(transaction.issueDate).toLocaleDateString()} readOnly disabled />
                    </div>
                    <div className="form-group">
                        <label>Expected Return Date</label>
                        <input type="text" className="form-control" value={new Date(transaction.returnDate).toLocaleDateString()} readOnly disabled />
                    </div>

                    <div className="form-group">
                        <label>Actual Return Date (Editable)</label>
                        <input type="date" className="form-control" value={actualReturnDate} onChange={e => setActualReturnDate(e.target.value)} />
                    </div>

                    <button className="btn" onClick={handleConfirm} style={{ width: '100%' }}>Confirm Return</button>
                </div>
            )}
        </div>
    );
};

export default ReturnMedia;
