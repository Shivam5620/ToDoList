// index.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const todoRoutes = require('./routes/todoRoutes');
const cors = require('cors');
const db = "todo-list"
const app = express();
app.use(cors());

app.use(bodyParser.json());

mongoose.connect(`mongodb+srv://Cvambirla:EjKQwRByPGvblx5T@cluster0.3wxz5ja.mongodb.net/${db}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log(`Connected to ${db} database`);
}).catch(err => {
  console.error(`Error connecting to ${err.message}:`);
  process.exit(1);
});

app.use('/todos', todoRoutes);

const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
