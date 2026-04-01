import React, { useState } from 'react';
import axios from 'axios';

const MembershipForm = () => {
    const [mode, setMode] = useState('add'); // add, update
    const [memberId, setMemberId] = useState('');
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [duration, setDuration] = useState('6');
    const [action, setAction] = useState('extend');
    const [message, setMessage] = useState('');

    const fetchMembership = async () => {
        if (!memberId) return;
        try {
            const { data } = await axios.get(`http://localhost:5001/api/maintenance/memberships/${memberId}`);
            setName(data.name);
            setContact(data.contact);
            setMessage('Details fetched successfully');
        } catch (error) {
            setMessage(error.response?.data?.message || 'Membership not found');
            setName('');
            setContact('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        if (mode === 'add') {
            if (!memberId || !name || !contact || !duration) {
                setMessage('All fields are mandatory');
                return;
            }
            try {
                await axios.post('http://localhost:5001/api/maintenance/memberships', {
                    memberId, name, contact, duration
                });
                setMessage('Membership added successfully');
                setMemberId(''); setName(''); setContact('');
            } catch (error) {
                setMessage(error.response?.data?.message || 'Failed to add');
            }
        } else {
            if (!memberId || !action) {
                setMessage('Membership ID is mandatory');
                return;
            }
            try {
                await axios.put(`http://localhost:5001/api/maintenance/memberships/${memberId}`, {
                    action
                });
                setMessage(`Membership ${action}ed successfully`);
                setMemberId(''); setName(''); setContact('');
            } catch (error) {
                setMessage(error.response?.data?.message || 'Failed to update');
            }
        }
    };

    return (
        <div>
            <h2>{mode === 'add' ? 'Add Membership' : 'Update Membership'}</h2>
            <div style={{ margin: '20px 0' }}>
                <label style={{ marginRight: '15px' }}>
                    <input type="radio" checked={mode === 'add'} onChange={() => { setMode('add'); setMessage(''); }} /> Add
                </label>
                <label>
                    <input type="radio" checked={mode === 'update'} onChange={() => { setMode('update'); setMessage(''); }} /> Update
                </label>
            </div>

            <form onSubmit={handleSubmit} style={{ maxWidth: '400px' }}>
                <div className="form-group">
                    <label>Membership Number</label>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <input type="text" className="form-control" value={memberId} onChange={e => setMemberId(e.target.value)} />
                        {mode === 'update' && (
                            <button type="button" className="btn" onClick={fetchMembership}>Fetch</button>
                        )}
                    </div>
                </div>

                <div className="form-group">
                    <label>Name</label>
                    <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)} disabled={mode === 'update'} />
                </div>

                <div className="form-group">
                    <label>Contact Info</label>
                    <input type="text" className="form-control" value={contact} onChange={e => setContact(e.target.value)} disabled={mode === 'update'} />
                </div>

                {mode === 'add' ? (
                    <div className="form-group">
                        <label>Duration</label>
                        <select className="form-control" value={duration} onChange={e => setDuration(e.target.value)}>
                            <option value="6">6 Months</option>
                            <option value="12">1 Yearr</option>
                            <option value="24">2 Years</option>
                        </select>
                    </div>
                ) : (
                    <div className="form-group">
                        <label>Action</label>
                        <div style={{ marginTop: '10px' }}>
                            <label style={{ marginRight: '15px' }}>
                                <input type="radio" name="action" checked={action === 'extend'} onChange={() => setAction('extend')} /> Extend (6 months)
                            </label>
                            <label>
                                <input type="radio" name="action" checked={action === 'cancel'} onChange={() => setAction('cancel')} /> Cancel
                            </label>
                        </div>
                    </div>
                )}

                {message && <div style={{ color: message.includes('success') ? 'var(--success)' : 'var(--danger)', marginBottom: '15px' }}>{message}</div>}

                <button type="submit" className="btn">Submit</button>
            </form>
        </div>
    );
};

export default MembershipForm;
