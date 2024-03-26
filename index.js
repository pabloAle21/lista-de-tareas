const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/tasks', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const Task = mongoose.model('Task', {
    name: String,
    description: String,
    status: String
});

app.post('/tasks', async (req, res) => {
    const { name, description, status } = req.body;
    
    const newTask = new Task({ name, description, status });
    
    await newTask.save();
    
    res.json(newTask);
});

app.get('/tasks', async (req, res) => {
    const tasks = await Task.find();
    
    res.json(tasks);
});

app.delete('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    
    await Task.findByIdAndDelete(id);
    
    res.json({ message: 'Task deleted successfully' });
});

app.put('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const { name, description, status } = req.body;
    
    await Task.findByIdAndUpdate(id, { name, description, status });
    
    res.json({ message: 'Task updated successfully' });
});

app.get('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    
    const task = await Task.findById(id);
    
    res.json(task);
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
