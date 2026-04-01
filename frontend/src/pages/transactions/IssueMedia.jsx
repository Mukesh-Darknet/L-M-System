import React, { useState, useEffect } from 'react';
import axios from 'axios';

const IssueMedia = () => {
    const [serialNo, setSerialNo] = useState('');
    const [mediaId, setMediaId] = useState('');
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [memberId, setMemberId] = useState('');
    const [issueDate, setIssueDate] = useState(new Date().toISOString().split('T')[0]);
    const [returnDate, setReturnDate] = useState('');
    const [remarks, setRemarks] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Auto calculate return date (today + 15 days) when issueDate changes
        if (issueDate) {
            const d = new Date(issueDate);
            d.setDate(d.getDate() + 15);
            setReturnDate(d.toISOString().split('T')[0]);
        }
    }, [issueDate]);

    const fetchMedia = async () => {
        if (!serialNo) return;
        try {
            const { data } = await axios.get(`http://localhost:5001/api/maintenance/media/${serialNo}`);
            setMediaId(data._id);
            setTitle(data.title);
            setAuthor(data.authorOrDirector);
            setMessage('Book/Movie found');
        } catch (error) {
            setMessage('Media not found');
            setTitle(''); setAuthor(''); setMediaId('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        if (!title || !memberId) {
            setMessage('Book Name and Member ID are required');
            return;
        }

        const iDate = new Date(issueDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (iDate < today) {
            setMessage('Issue date cannot be in the past');
            return;
        }

        const rDate = new Date(returnDate);
        const diffDays = Math.ceil((rDate - iDate) / (1000 * 60 * 60 * 24));
        if (diffDays > 15 || diffDays < 0) {
            setMessage('Return date must be between issue date and +15 days');
            return;
        }

        try {
            await axios.post('http://localhost:5001/api/transactions/issue', {
                mediaId, memberId, issueDate, returnDate, remarks
            });
            setMessage('Media issued successfully');
            setSerialNo(''); setMediaId(''); setTitle(''); setAuthor(''); setMemberId(''); setRemarks('');
        } catch (error) {
            setMessage(error.response?.data?.message || 'Failed to issue');
        }
    };

    return (
        <div>
            <h2>Issue Book/Movie</h2>
            <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '20px 0' }}>
                <div className="form-group">
                    <label>Enter Serial Number to Fetch</label>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <input type="text" className="form-control" value={serialNo} onChange={e => setSerialNo(e.target.value)} />
                        <button type="button" className="btn" onClick={fetchMedia}>Fetch</button>
                    </div>
                </div>

                <div className="form-group">
                    <label>Book/Movie Name (Required)</label>
                    <input type="text" className="form-control" value={title} readOnly disabled />
                </div>
                <div className="form-group">
                    <label>Author / Director (Auto-filled, non-editable)</label>
                    <input type="text" className="form-control" value={author} readOnly disabled />
                </div>

                <div className="form-group">
                    <label>Member ID (Required)</label>
                    <input type="text" className="form-control" value={memberId} onChange={e => setMemberId(e.target.value)} />
                </div>

                <div className="form-group">
                    <label>Issue Date ( {'>'}= Today)</label>
                    <input type="date" className="form-control" value={issueDate} onChange={e => setIssueDate(e.target.value)} />
                </div>

                <div className="form-group">
                    <label>Return Date (Max +15 days)</label>
                    <input type="date" className="form-control" value={returnDate} onChange={e => setReturnDate(e.target.value)} />
                </div>

                <div className="form-group">
                    <label>Remarks (Optional)</label>
                    <textarea className="form-control" value={remarks} onChange={e => setRemarks(e.target.value)} rows="3"></textarea>
                </div>

                {message && <p style={{ color: message.includes('success') ? 'var(--success)' : 'var(--danger)', marginBottom: '15px' }}>{message}</p>}

                <button type="submit" className="btn">Issue Media</button>
            </form>
        </div>
    );
};

export default IssueMedia;
