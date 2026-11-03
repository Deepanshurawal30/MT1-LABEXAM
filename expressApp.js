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

// GET / - Root welcome and API guide route
app.get('/', (req, res) => {
  // If JSON is requested or by default, provide a rich HTML interface for browser visitors
  if (req.headers.accept && req.headers.accept.includes('application/json')) {
    return res.status(200).json({
      message: "Employee Task Management REST API is running on port 4000",
      endpoints: {
        "GET /tasks": "Retrieve all employee tasks",
        "GET /tasks/:id": "Retrieve a task by ID",
        "POST /tasks": "Add a new task",
        "PUT /tasks/:id": "Update task details",
        "DELETE /tasks/:id": "Delete a task"
      }
    });
  }

  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Express Task Management REST API</title>
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
        body { background-color: #f8fafc; color: #1e293b; padding: 40px 20px; display: flex; justify-content: center; }
        .container { max-width: 720px; width: 100%; background: #ffffff; border-radius: 12px; padding: 32px; box-shadow: 0 4px 16px rgba(0,0,0,0.08); }
        .status-badge { display: inline-block; background-color: #dcfce7; color: #15803d; padding: 4px 12px; border-radius: 9999px; font-weight: 600; font-size: 13px; margin-bottom: 16px; }
        h1 { color: #1e40af; font-size: 26px; margin-bottom: 8px; }
        p.subtitle { color: #64748b; font-size: 15px; margin-bottom: 24px; line-height: 1.5; }
        .card { background-color: #f1f5f9; border-radius: 8px; padding: 20px; margin-bottom: 20px; }
        .card h2 { font-size: 16px; color: #334155; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px; }
        ul { list-style: none; }
        li { background: #ffffff; padding: 12px 16px; border-radius: 6px; margin-bottom: 10px; border: 1px solid #e2e8f0; display: flex; align-items: center; justify-content: space-between; gap: 12px; }
        .endpoint-left { display: flex; align-items: center; gap: 10px; }
        .badge { font-weight: bold; font-size: 12px; padding: 3px 8px; border-radius: 4px; min-width: 55px; text-align: center; }
        .get { background: #dbeafe; color: #1e40af; }
        .post { background: #dcfce7; color: #15803d; }
        .put { background: #fef3c7; color: #b45309; }
        .delete { background: #fee2e2; color: #b91c1c; }
        a.btn-link { color: #2563eb; text-decoration: none; font-weight: 600; font-size: 13px; }
        a.btn-link:hover { text-decoration: underline; }
        code { background: #e2e8f0; padding: 2px 6px; border-radius: 4px; font-size: 13px; }
        footer { margin-top: 20px; text-align: center; color: #94a3b8; font-size: 13px; }
      </style>
    </head>
    <body>
      <div class="container">
        <span class="status-badge">&#x25CF; Server Running on Port 4000</span>
        <h1>Employee Task Management REST API</h1>
        <p class="subtitle">Express.js REST API is fully functional and ready for testing with EchoAPI / Postman / Browser.</p>

        <div class="card">
          <h2>Available Endpoints</h2>
          <ul>
            <li>
              <div class="endpoint-left">
                <span class="badge get">GET</span>
                <span><code>/tasks</code> &mdash; View all employee tasks</span>
              </div>
              <a class="btn-link" href="/tasks">View JSON &rarr;</a>
            </li>
            <li>
              <div class="endpoint-left">
                <span class="badge get">GET</span>
                <span><code>/tasks/1</code> &mdash; View task with ID 1</span>
              </div>
              <a class="btn-link" href="/tasks/1">View JSON &rarr;</a>
            </li>
            <li>
              <div class="endpoint-left">
                <span class="badge post">POST</span>
                <span><code>/tasks</code> &mdash; Add a new task record</span>
              </div>
              <span style="font-size: 12px; color: #64748b;">(Use EchoAPI)</span>
            </li>
            <li>
              <div class="endpoint-left">
                <span class="badge put">PUT</span>
                <span><code>/tasks/:id</code> &mdash; Update an existing task</span>
              </div>
              <span style="font-size: 12px; color: #64748b;">(Use EchoAPI)</span>
            </li>
            <li>
              <div class="endpoint-left">
                <span class="badge delete">DELETE</span>
                <span><code>/tasks/:id</code> &mdash; Delete a task by ID</span>
              </div>
              <span style="font-size: 12px; color: #64748b;">(Use EchoAPI)</span>
            </li>
          </ul>
        </div>

        <footer>
          Full Stack Development &bull; Node.js Lab Examination (MT1-LABEXAM)
        </footer>
      </div>
    </body>
    </html>
  `);
});

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
