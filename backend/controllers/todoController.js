const Todo = require('../models/todo');
const csvParser = require('csv-parser');
const fs = require('fs');

exports.getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.json(todo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createTodo = async (req, res) => {
  try {
    const { description, status } = req.body;
    const todo = new Todo({ description, status });
    await todo.save();
    res.status(201).json(todo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const { description, status } = req.body;
    await Todo.findByIdAndUpdate(req.params.id, { description, status });
    res.json({ message: 'Todo updated successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: 'Todo deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.uploadCSV = async (req, res) => {
  try {
    if (!req.files || !req.files.csv) {
      return res.status(400).json({ message: 'CSV file is required' });
    }

    const todos = [];
    fs.createReadStream(req.files.csv.tempFilePath)
      .pipe(csvParser())
      .on('data', (row) => {
        todos.push(row);
      })
      .on('end', async () => {
        await Todo.insertMany(todos);
        res.json({ message: 'CSV file uploaded successfully' });
      });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.downloadCSV = async (req, res) => {
  try {
    const todos = await Todo.find();
    const csvData = todos.map(todo => `${todo.description},${todo.status}`).join('\n');
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=todo_list.csv');
    res.send(csvData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.filterTodosByStatus = async (req, res) => {
  try {
    const status = req.query.status;
    const todos = await Todo.find({ status });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
