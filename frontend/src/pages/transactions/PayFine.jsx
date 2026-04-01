import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PayFine = ({ prefillData }) => {
    const [transaction, setTransaction] = useState(prefillData);
    const [finePaid, setFinePaid] = useState(false);
    const [remarks, setRemarks] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (prefillData) {
            setTransaction(prefillData);
            setFinePaid(prefillData.finePaid);
        }
    }, [prefillData]);

    const handleConfirm = async () => {
        setMessage('');

        if (transaction.fineAmount > 0 && !finePaid) {
            setMessage('Error: Fine Paid checkbox must be selected to proceed.');
            return;
        }

        try {
            await axios.post('http://localhost:5001/api/transactions/pay-fine', {
                transactionId: transaction._id,
                remarks
            });
            setMessage('Transaction completed successfully.');
            setTransaction(null); // Clear form after completion
        } catch (error) {
            setMessage(error.response?.data?.message || 'Failed to complete transaction');
        }
    };

    if (!transaction) {
        return (
            <div>
                <h2>Fine Payment</h2>
                <p>No active return session detected. Please return a book</p>
                {message && <p style={{ color: 'var(--success)', marginTop: '15px' }}>{message}</p>}
            </div>
        );
    }

    const hasFine = transaction.fineAmount > 0;

    return (
        <div>
            <h2>Fine Payment</h2>

            <div style={{ maxWidth: '500px', background: '#f8f9fa', padding: '20px', borderRadius: '8px', marginTop: '20px' }}>
                <div className="form-group">
                    <label>Books Name</label>
                    <input type="text" className="form-control" value={transaction.mediaId?.title || 'Unknown'} readOnly disabled />
                </div>
                <div className="form-group">
                    <label>Expected Return Date</label>
                    <input type="text" className="form-control" value={new Date(transaction.returnDate).toLocaleDateString()} readOnly disabled />
                </div>
                <div className="form-group">
                    <label>Actual Return Date</label>
                    <input type="text" className="form-control" value={new Date(transaction.actualReturnDate).toLocaleDateString()} readOnly disabled />
                </div>

                <div className="form-group">
                    <label>Calculated Fine</label>
                    <input
                        type="text"
                        className="form-control"
                        value={hasFine ? `Rs. ${transaction.fineAmount}` : 'No Fine'}
                        readOnly disabled
                        style={{ color: hasFine ? 'var(--danger)' : 'var(--success)', fontWeight: 'bold' }}
                    />
                </div>

                {hasFine && (
                    <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <input
                            type="checkbox"
                            id="finePaidCheck"
                            checked={finePaid}
                            onChange={e => setFinePaid(e.target.checked)}
                            style={{ transform: 'scale(1.5)', cursor: 'pointer' }}
                        />
                        <label htmlFor="finePaidCheck" style={{ margin: 0, cursor: 'pointer' }}>Fine Paid</label>
                    </div>
                )}

                <div className="form-group">
                    <label>Remarks (Optional)</label>
                    <textarea className="form-control" value={remarks} onChange={e => setRemarks(e.target.value)} rows="3"></textarea>
                </div>

                {message && <p style={{ color: message.includes('Error') ? 'var(--danger)' : 'var(--success)', marginBottom: '15px' }}>{message}</p>}

                <button className="btn" onClick={handleConfirm} style={{ width: '100%' }}>Confirm Completion</button>
            </div>
        </div>
    );
};

export default PayFine;
