import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RiDeleteBin6Line, RiEdit2Line, RiFileDownloadLine } from 'react-icons/ri';
import { baseURL } from '../UrlConfig';
import { useNavigate } from 'react-router-dom';
import { saveAs } from 'file-saver';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(baseURL)
      .then(res => {
        setTodos(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`${baseURL}/${id}`)
      .then(res => {
        console.log('Todo deleted:', res.data);
        setTodos(todos.filter(todo => todo._id !== id));
      })
      .catch(err => console.error(err));
  };

  const handleEdit = (id) => {
    navigate(`/update/${id}`);
  };

  const handleAdd = () => {
    navigate('/add');
  };

  const downloadCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," + todos.map(todo => `${todo.description},${todo.status}`).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "todo_list.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div>
      <h2 class="text-center pt-4">Todo List</h2>
      <div class="container table-responsive py-5">
        <button className="add-btn float-end" onClick={handleAdd}>ADD</button>
        <table class="table table-bordered table-hover">
          <thead className="thead-dark text-center">
            <tr>
              <th scope="col">SN.</th>
              <th scope="col">Description</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo, index) => (
              <tr key={todo._id}>
                <th className='text-center' scope="row">{index + 1}</th>
                <td className='text-center'>{todo.description}</td>
                <td className='text-center'>{todo.status}</td>
                <td className='text-center'>
                  <button className="delete-btn" onClick={() => handleDelete(todo._id)}>
                    <RiDeleteBin6Line />
                  </button>
                  <button className="edit-btn" onClick={() => handleEdit(todo._id)}>
                    <RiEdit2Line />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="download-btn float-end" onClick={downloadCSV}>
          <RiFileDownloadLine /> Download
        </button>
      </div>
    </div>
  );
};

export default TodoList;
