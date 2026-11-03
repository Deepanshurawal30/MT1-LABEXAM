import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;

// In-memory array for employee tasks
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

// Create HTTP server
const server = http.createServer((req, res) => {
  const { method, url } = req;
  const parsedUrl = new URL(url, `http://${req.headers.host || 'localhost'}`);
  const pathname = parsedUrl.pathname;

  // Route: GET /
  if (method === 'GET' && pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Employee Task Management</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 40px; background-color: #f9fafb; color: #111827; }
            h1 { color: #1e40af; }
            p { font-size: 16px; line-height: 1.6; }
            a { color: #2563eb; text-decoration: none; font-weight: bold; }
            a:hover { text-decoration: underline; }
            ul { margin-top: 15px; }
            li { margin-bottom: 8px; }
          </style>
        </head>
        <body>
          <h1>Welcome to Employee Task Management System</h1>
          <p>This server is implemented using Node.js built-in HTTP and FS modules.</p>
          <p>Available Routes:</p>
          <ul>
            <li><a href="/home">/home</a> - Static Home Page (served using FS module)</li>
            <li><a href="/tasks">/tasks</a> - Task List (JSON format)</li>
            <li><a href="/about">/about</a> - About Application</li>
          </ul>
        </body>
      </html>
    `);
    return;
  }

  // Route: GET /about
  if (method === 'GET' && pathname === '/about') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>About - Employee Task Management</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 40px; background-color: #f9fafb; color: #111827; }
            h1 { color: #1e40af; }
            .info-box { background: white; padding: 20px; border-radius: 8px; border: 1px solid #e5e7eb; max-width: 600px; }
            a { color: #2563eb; text-decoration: none; }
          </style>
        </head>
        <body>
          <div class="info-box">
            <h1>About Application</h1>
            <p><strong>Application Name:</strong> Employee Task Management System</p>
            <p><strong>Description:</strong> A backend system designed to track, assign, and manage employee tasks efficiently.</p>
            <p><strong>Built With:</strong> Node.js HTTP Module & FS Module</p>
            <p><a href="/">&larr; Back to Home</a></p>
          </div>
        </body>
      </html>
    `);
    return;
  }

  // Route: GET /home (Static file serving using FS module)
  if (method === 'GET' && pathname === '/home') {
    const filePath = path.join(__dirname, 'public', 'index.html');
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 Internal Server Error: Could not load static page.');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });
    return;
  }

  // Route: GET /tasks
  if (method === 'GET' && pathname === '/tasks') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(tasks, null, 2));
    return;
  }

  // Route: POST /add-task
  if (method === 'POST' && pathname === '/add-task') {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        const parsedBody = JSON.parse(body);
        const { id, taskName, assignedTo, status, priority } = parsedBody;

        // Validation of required fields
        if (id === undefined || !taskName || !assignedTo || !status) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(
            JSON.stringify({
              error: 'Missing required fields. id, taskName, assignedTo, and status are required.'
            })
          );
          return;
        }

        const newTask = {
          id: Number(id),
          taskName,
          assignedTo,
          status,
          priority: priority || 'Medium'
        };

        tasks.push(newTask);

        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(
          JSON.stringify(
            {
              message: 'Task added successfully',
              task: newTask
            },
            null,
            2
          )
        );
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(
          JSON.stringify({
            error: 'Invalid JSON payload'
          })
        );
      }
    });
    return;
  }

  // Route: 404 Not Found for any other routes
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(
    JSON.stringify({
      error: '404 Not Found',
      message: `The requested endpoint ${method} ${pathname} does not exist.`
    })
  );
});

// Configure server to listen on port 3000
server.listen(PORT, () => {
  console.log(`HTTP Server running at http://localhost:${PORT}`);
});
