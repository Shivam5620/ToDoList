const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

router.get('/', todoController.getAllTodos);
router.get('/:id', todoController.getTodoById);
router.post('/create', todoController.createTodo);
router.put('/update/:id', todoController.updateTodo);
router.delete('/:id', todoController.deleteTodo);
router.post('/upload', todoController.uploadCSV);
router.get('/download', todoController.downloadCSV);
router.get('/filter', todoController.filterTodosByStatus);

module.exports = router;
