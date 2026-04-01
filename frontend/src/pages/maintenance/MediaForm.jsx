import React, { useState } from 'react';
import axios from 'axios';

const MediaForm = () => {
    const [mode, setMode] = useState('add');
    const [type, setType] = useState('book'); // book or movie
    const [title, setTitle] = useState('');
    const [authorOrDirector, setAuthorOrDirector] = useState('');
    const [serialNo, setSerialNo] = useState('');
    const [message, setMessage] = useState('');

    const fetchMedia = async () => {
        if (!serialNo) return;
        try {
            const { data } = await axios.get(`http://localhost:5001/api/maintenance/media/${serialNo}`);
            setTitle(data.title);
            setAuthorOrDirector(data.authorOrDirector);
            setType(data.type);
            setMessage('Details fetched successfully');
        } catch (error) {
            setMessage(error.response?.data?.message || 'Media not found');
            setTitle(''); setAuthorOrDirector('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        if (!title || !authorOrDirector || !serialNo) {
            setMessage('All fields are mandatory');
            return;
        }

        try {
            if (mode === 'add') {
                await axios.post('http://localhost:5001/api/maintenance/media', {
                    type, title, authorOrDirector, serialNo
                });
                setMessage(`${type} added successfully`);
                setTitle(''); setAuthorOrDirector(''); setSerialNo('');
            } else {
                await axios.put(`http://localhost:5001/api/maintenance/media/${serialNo}`, {
                    type, title, authorOrDirector
                });
                setMessage(`${type} updated successfully`);
                setTitle(''); setAuthorOrDirector(''); setSerialNo('');
            }
        } catch (error) {
            setMessage(error.response?.data?.message || 'Operation failed');
        }
    };

    return (
        <div>
            <h2>{mode === 'add' ? 'Add Book/Movie' : 'Update Book/Movie'}</h2>
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
                    <label>Media Type</label>
                    <select className="form-control" value={type} onChange={e => setType(e.target.value)}>
                        <option value="book">Book</option>
                        <option value="movie">Movie</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Serial Number</label>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <input type="text" className="form-control" value={serialNo} onChange={e => setSerialNo(e.target.value)} />
                        {mode === 'update' && (
                            <button type="button" className="btn" onClick={fetchMedia}>Fetch</button>
                        )}
                    </div>
                </div>

                <div className="form-group">
                    <label>Title</label>
                    <input type="text" className="form-control" value={title} onChange={e => setTitle(e.target.value)} />
                </div>

                <div className="form-group">
                    <label>Author / Director</label>
                    <input type="text" className="form-control" value={authorOrDirector} onChange={e => setAuthorOrDirector(e.target.value)} />
                </div>

                {message && <div style={{ color: message.includes('success') ? 'var(--success)' : 'var(--danger)', marginBottom: '15px' }}>{message}</div>}

                <button type="submit" className="btn">Submit</button>
            </form>
        </div>
    );
};

export default MediaForm;
