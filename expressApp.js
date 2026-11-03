import express from 'express';

const app = express();
const PORT = 4000;

// Middleware for parsing JSON request bodies
app.use(express.json());

// In-memory array containing sample employee task records
let tasks = [
  {
    id: 1,
    taskName: "Develop Login Page",
    assignedTo: "Rahul Sharma",
    status: "Pending",
    priority: "High"
  },
  {
    id: 2,
    taskName: "Design Database Schema",
    assignedTo: "Priya Patel",
    status: "In Progress",
    priority: "Medium"
  },
  {
    id: 3,
    taskName: "Setup Express Server",
    assignedTo: "Amit Kumar",
    status: "Completed",
    priority: "Low"
  }
];

// GET /tasks - Retrieve all employee tasks
app.get('/tasks', (req, res) => {
  res.status(200).json(tasks);
});

// GET /tasks/:id - Retrieve a task by ID
app.get('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id, 10);

  if (isNaN(taskId)) {
    return res.status(400).json({ error: 'Invalid task ID. ID must be a number.' });
  }

  const task = tasks.find((t) => t.id === taskId);

  if (!task) {
    return res.status(404).json({ error: `Task with ID ${taskId} not found` });
  }

  res.status(200).json(task);
});

// POST /tasks - Add a new task
app.post('/tasks', (req, res) => {
  const { id, taskName, assignedTo, status, priority } = req.body;

  // Validation
  if (!taskName || !assignedTo || !status) {
    return res.status(400).json({
      error: 'Missing required fields: taskName, assignedTo, and status are required.'
    });
  }

  // Determine new ID: use provided id or auto-generate
  let newId;
  if (id !== undefined) {
    newId = Number(id);
    const existing = tasks.find((t) => t.id === newId);
    if (existing) {
      return res.status(400).json({ error: `Task with ID ${newId} already exists.` });
    }
  } else {
    newId = tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
  }

  const newTask = {
    id: newId,
    taskName,
    assignedTo,
    status,
    priority: priority || 'Medium'
  };

  tasks.push(newTask);

  res.status(201).json({
    message: 'Task added successfully',
    task: newTask
  });
});

// PUT /tasks/:id - Update task details
app.put('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id, 10);

  if (isNaN(taskId)) {
    return res.status(400).json({ error: 'Invalid task ID. ID must be a number.' });
  }

  const taskIndex = tasks.findIndex((t) => t.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({ error: `Task with ID ${taskId} not found` });
  }

  const { taskName, assignedTo, status, priority } = req.body;

  // Update fields if provided
  if (taskName !== undefined) tasks[taskIndex].taskName = taskName;
  if (assignedTo !== undefined) tasks[taskIndex].assignedTo = assignedTo;
  if (status !== undefined) tasks[taskIndex].status = status;
  if (priority !== undefined) tasks[taskIndex].priority = priority;

  res.status(200).json({
    message: 'Task updated successfully',
    task: tasks[taskIndex]
  });
});

// DELETE /tasks/:id - Delete a task
app.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id, 10);

  if (isNaN(taskId)) {
    return res.status(400).json({ error: 'Invalid task ID. ID must be a number.' });
  }

  const taskIndex = tasks.findIndex((t) => t.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({ error: `Task with ID ${taskId} not found` });
  }

  const [deletedTask] = tasks.splice(taskIndex, 1);

  res.status(200).json({
    message: `Task with ID ${taskId} deleted successfully`,
    task: deletedTask
  });
});

// 404 handler for invalid routes
app.use((req, res) => {
  res.status(404).json({
    error: '404 Not Found',
    message: `Route ${req.method} ${req.originalUrl} does not exist.`
  });
});

// Configure the application to listen on port 4000
app.listen(PORT, () => {
  console.log(`Express Server running at http://localhost:${PORT}`);
});
