const express = require('express');
const router = express.Router();

const {
    createTask,
    getTask,
    updateTask,
    deleteTask,
    getAllTasks
} = require('../controllers/taskController'); // Import the task controller methods

const { requireSignin } = require('../controllers/authController'); // Import the authentication middleware
const { validateTask } = require('../utils/validator'); // Import the task validation middleware

// Routes for task management
router.post('/task', requireSignin, validateTask, createTask); // Create a new task
router.get('/task/:taskId', requireSignin, getTask); // Get a specific task
router.put('/task/:taskId', requireSignin, validateTask, updateTask); // Update a specific task
router.delete('/task/:taskId', requireSignin, deleteTask); // Delete a specific task 
router.get('/alltask',requireSignin,getAllTasks); // Get a  all task

module.exports = router;
