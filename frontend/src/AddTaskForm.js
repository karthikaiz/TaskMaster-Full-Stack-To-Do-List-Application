// AddTaskForm.js
import React, { useState } from 'react';
import './AddTaskForm.css'; // Import the CSS file for styling

const AddTaskForm = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [completed, setCompleted] = useState(false); // Default value

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === '') {
      return;
    }

    onAddTask(title, completed); // Pass the title and completed status to the parent component
    setTitle('');
    setCompleted(false); // Reset the completed status after submission
  };

  return (
    <div className="add-task-form">
      <h2>Add New Task</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input-field"
        />
        <label className="completed-label">
          Completed:
          <select value={completed} onChange={(e) => setCompleted(e.target.value === "true")} className="select-field">
            <option value={true}>True</option>
            <option value={false}>False</option>
          </select>
        </label>
        <button type="submit" className="submit-button">Add Task</button>
      </form>
    </div>
  );
};

export default AddTaskForm;
