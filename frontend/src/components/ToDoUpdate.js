import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { baseURL } from '../UrlConfig';

const ToDoUpdate = () => {
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    axios.get(`${baseURL}/${id}`)
      .then(res => {
        const { description, status } = res.data;
        setDescription(description);
        setStatus(status);
      })
      .catch(err => console.error(err));
  }, [id]);

  const handleUpdate = () => {
    axios.put(`${baseURL}/update/${id}`, { description, status })
      .then(res => {
        alert('Todo updated successfully:', res.data);
        navigate('/')
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="container">
            <Link to='/'>Back</Link>
            <h2>Add Todo</h2>
            <form onSubmit={handleUpdate}>
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

export default ToDoUpdate;
