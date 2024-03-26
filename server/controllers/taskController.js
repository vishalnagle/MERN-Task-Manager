const Task = require('../models/taskModel');
const { validationResult } = require('express-validator');

// Create a new task
exports.createTask = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { title, description, completed } = req.body;
    const createdBy = req.auth._id; // Assuming authenticated user's ID is available in req.auth._id

    const task = new Task({
        title,
        description,
        completed,
        createdBy
    });

    task.save()
        .then(savedTask => {
            res.json({ task: savedTask });
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        });
};

// Get a specific task
exports.getTask = (req, res) => {
    const taskId = req.params.taskId;
    Task.findById(taskId)
        .then(task => {
            if (!task) {
                return res.status(404).json({ error: 'Task not found' });
            }
            res.json({ task });
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        });
};

// Update a specific task
exports.updateTask = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const taskId = req.params.taskId;
    const { title, description, completed } = req.body;

    Task.findByIdAndUpdate(taskId, { title, description, completed }, { new: true })
        .then(updatedTask => {
            if (!updatedTask) {
                return res.status(404).json({ error: 'Task not found' });
            }
            res.json({ task: updatedTask });
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        });
};

// Delete a specific task
exports.deleteTask = (req, res) => {
    const taskId = req.params.taskId;
    Task.findByIdAndDelete(taskId)
        .then(deletedTask => {
            if (!deletedTask) {
                return res.status(404).json({ error: 'Task not found' });
            }
            res.json({ message: 'Task deleted successfully' });
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        });
};

//Fetch all task
exports.getAllTasks = (req, res) => {
    Task.find()
        .then(tasks => {
            res.json({ tasks });
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        });
};
