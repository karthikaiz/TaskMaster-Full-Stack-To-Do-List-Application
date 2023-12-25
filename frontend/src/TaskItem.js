// TaskItem.js
import React from 'react';
import axios from 'axios';

const TaskItem = ({ task, onUpdate }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/tasks/${task._id.$oid}`);
      onUpdate(); // Call the onUpdate function to update the task list after deletion
    } catch (error) {
      console.error('Error deleting task', error);
    }
  };

  const handleComplete = async () => {
    try {
      await axios.put(`http://localhost:3001/tasks/${task._id.$oid}`, { title: task.title, completed: !task.completed });
      onUpdate(); // Call the onUpdate function to update the task list after completion status update
    } catch (error) {
      console.error('Error updating task', error);
    }
  };

  return (
    <div>
      <p style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>{task.title}</p>
      <button onClick={handleComplete}>{task.completed ? 'Undo' : 'Complete'}</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default TaskItem;
