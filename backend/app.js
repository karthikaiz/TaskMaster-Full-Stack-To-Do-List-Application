require("dotenv").config()
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors());



const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  }
});

const Task = mongoose.model('Task', taskSchema);

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB', err));

  app.post('/tasks', async (req, res) => {
    if (!req.body.title || req.body.title.trim() === '') {
      return res.status(400).send('Title is required');
    }
  
    const { title, completed } = req.body;
    const newTask = new Task({ title, completed });
  
    try {
      const savedTask = await newTask.save();
      const updatedTasks = await Task.find({}); // Fetch all tasks after adding the new one
      res.json(updatedTasks);
    } catch (error) {
      res.status(500).send('Error saving task to database');
    }
  });
  
  
app.get('/', (req, res) => {
  Task.find({})
    .then(tasks => {
      res.json(tasks);
    })
    .catch(error => {
      res.status(500).send('Error fetching tasks from database');
    });
});

// Other routes and error handling code should follow here
// ... (previous code)

// Fetch a single task by ID
app.get('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  Task.findById(taskId)
    .then(task => {
      if (!task) {
        return res.status(404).send('Task not found');
      }
      res.json(task);
    })
    .catch(error => {
      res.status(500).send('Error fetching task from database');
    });
});

// Update a task by ID
app.put('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  Task.findByIdAndUpdate(taskId, req.body, { new: true })
    .then(updatedTask => {
      if (!updatedTask) {
        return res.status(404).send('Task not found');
      }
      res.json(updatedTask);
    })
    .catch(error => {
      res.status(500).send('Error updating task in the database');
    });
});

// Delete a task by ID
app.delete('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  Task.findByIdAndRemove(taskId)
    .then(deletedTask => {
      if (!deletedTask) {
        return res.status(404).send('Task not found');
      }
      res.json(deletedTask);
    })
    .catch(error => {
      res.status(500).send('Error deleting task from database');
    });
});

// Handle undefined routes
app.use((req, res) => {
  res.status(404).send('Not Found');
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// ... (server setup and listening)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
