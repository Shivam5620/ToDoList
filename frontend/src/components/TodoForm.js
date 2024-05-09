import React, { useState } from 'react';
import axios from 'axios';
import { baseURL } from '../UrlConfig';
import { Link, useNavigate } from 'react-router-dom';

const TodoForm = () => {
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${baseURL}/create`, { description, status })
            .then(res => {
                navigate('/')
            })
            .catch(err => console.error(err));
    };

    return (
        <div className="container">
            <Link to='/'>Back</Link>
            <h2>Add Todo</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description:</label>
                    <input type="text" id="description" className="form-control" value={description} onChange={e => setDescription(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="status" className="form-label">Status:</label>
                    <input type="text" id="status" className="form-control" value={status} onChange={e => setStatus(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Add Todo</button>
            </form>
        </div>
    );
};

export default TodoForm;
