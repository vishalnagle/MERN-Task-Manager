import React, { createContext, useContext, useState, useEffect } from 'react';
const BASE_URL = "http://localhost:8000/api";
const TaskContext = createContext();

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};
export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editTask, setEditTask] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [error, setError] = useState(null);
  const [loginToken, setLoginToken] = useState('')
  useEffect(() => {
    const fetchToken = async () => {
      const token = await localStorage.getItem('token');
      setLoginToken(token);
      fetchAllTasks();
    };
    fetchToken();
  }, []);
  const handleTaskInput = (e) => {
    setTaskInput(e.target.value);
  };
  const addTask = async () => {
    const payload = {
      title: editTitle,
      description: editDescription,
      completed: false,
    };
    try {
      const response = await fetch(`${BASE_URL}/task`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${loginToken}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Task creation failed');
      }

      const responseData = await response.json();
      const { task } = responseData;

      setTasks([...tasks, task]);
      setEditTitle('');
      setEditDescription('');
      setEditTask('');
    } catch (error) {
      console.error('Error creating task:', error);
      setError('Failed to create task. Please try again.');
    }
  };


  const fetchTasks = async () => {
    try {
      const response = await fetch(`${BASE_URL}/task`, {
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${loginToken}`
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      const { tasks } = await response.json();
      setTasks(tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setError('Failed to fetch tasks. Please try again.');
    }
  };
  const fetchAllTasks = async () => {
    const token = await localStorage.getItem('token');
    const userId = await localStorage.getItem('uqUserId');
    console.log('userId', userId)
    try {
      const response = await fetch(`${BASE_URL}/alltask`, {
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      const { tasks } = await response.json();

      // setTasks(tasks);
      const itemsCreatedByUser = tasks.filter(item => item.createdBy === userId);  
      setTasks(itemsCreatedByUser);
      console.log('AAAAAAAA', itemsCreatedByUser)
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setError('Failed to fetch tasks. Please try again.');
    }
  };
  const toggleEdit = (index) => {
    if (editIndex === null) {
      setEditIndex(index);
      setEditTask(tasks[index].content);
      setEditTitle(tasks[index].title);
      setEditDescription(tasks[index].description);
    } else {
      updateTask(editIndex, { title: editTitle, description: editDescription, content: editTask });
    }
  };
  const updateTask = async (index, updatedTask) => {
    try {
      const response = await fetch(`${BASE_URL}/task/${tasks[index]._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${loginToken}`

        },
        body: JSON.stringify(updatedTask),
      });

      if (!response.ok) {
        throw new Error('Task update failed');
      }

      const { task } = await response.json();
      const updatedTasks = [...tasks];
      updatedTasks[index] = task;
      setTasks(updatedTasks);
      setEditIndex(null);
      setEditTitle('');
      setEditDescription('');
      setEditTask('');
    } catch (error) {
      console.error('Error updating task:', error);
      setError('Failed to update task. Please try again.');
    }
  };
  const deleteTask = async (index) => {
    try {
      const response = await fetch(`${BASE_URL}/task/${tasks[index]._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${loginToken}`
        },
      });

      if (!response.ok) {
        throw new Error('Task deletion failed');
      }

      const updatedTasks = tasks.filter((_, i) => i !== index);
      setTasks(updatedTasks);
      setEditIndex(null);
      setEditTitle('');
      setEditDescription('');
      setEditTask('');
    } catch (error) {
      console.error('Error deleting task:', error);
      setError('Failed to delete task. Please try again.');
    }
  };
  const logout = async () => {
    try {
      const response = await fetch(`${BASE_URL}/signout`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        localStorage.clear()
        window.location.replace('/')
      }

    } catch (error) {
      console.error('Error during logout:', error);
    }
  };
  const contextValue = {
    tasks,
    taskInput,
    editIndex,
    editTask,
    editTitle,
    editDescription,
    handleTaskInput,
    addTask,
    toggleEdit,
    deleteTask,
    setEditTask,
    setEditTitle,
    setEditDescription,
    error,
    logout,

  };
  return (
    <TaskContext.Provider value={contextValue}>
      {children}
    </TaskContext.Provider>
  );
};