import React, { useState, useEffect } from 'react';
import TaskList from './TaskList';
import AddTaskForm from './AddTaskForm';
import axios from 'axios';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:3001/');
      console.log('Fetched tasks:', response.data); // Add a log to check if tasks are being fetched properly
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async (title, completed) => {
    try {
      await axios.post('http://localhost:3001/tasks', { title, completed });
      fetchTasks(); // Fetch tasks again to update the task list after adding a new task
    } catch (error) {
      console.error('Error adding task', error);
    }
  };

  return (
    <div className="app-container">
      <h1 className="header">My To-Do List</h1>
      <AddTaskForm onAddTask={handleAddTask} />
      <TaskList tasks={tasks} onUpdate={fetchTasks} />
    </div>
  );
}

export default App;
