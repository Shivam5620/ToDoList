import React from 'react';
import { BrowserRouter , Route, Routes } from 'react-router-dom';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import UploadCSV from './components/UploadCSV';
import DownloadCSV from './components/DownloadCSV';
import TODoUpdate from './components/ToDoUpdate';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/"  element={<TodoList/>} />
          <Route path="/add" element={<TodoForm/>} />
          <Route path="/update/:id" element={<TODoUpdate/>} />
          <Route path="/upload" element={<UploadCSV/>} />
          <Route path="/download" element={<DownloadCSV/>} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
