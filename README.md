# Employee Task Management Web Application
**Subject:** Full Stack Development – Node.js Lab Examination (MT1-LABEXAM)  
**Technology:** Node.js, HTTP Module, FS Module, Express.js  
**Database:** In-memory JavaScript Array  

---

## 📁 Project Structure

```text
MT1-LABEXAM/
│
├── package.json          # Node.js project configuration (ES Modules)
├── httpServer.js         # Part A: Built-in Node.js HTTP & FS server (Port 3000)
├── expressApp.js         # Part B: Express.js REST API server (Port 4000)
├── testServers.js        # Automated API test suite
├── public/
│   └── index.html        # Static HTML file served via FS module
└── screenshots/          # Folder containing output screenshots for submission
    └── README.md         # Guide for submission screenshots
```

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v18.x or later installed)
- npm (v9.x or later)
- Git

### 2. Installation
Clone the repository and install dependencies:
```bash
git clone <your-repository-url> MT1-LABEXAM
cd MT1-LABEXAM
npm install
```

---

## ⚙️ Running the Applications

### Part A: Start Built-in HTTP Server (Port 3000)
Open a terminal and run:
```bash
node httpServer.js
# Or: npm run start:http
```
**Expected Terminal Output:**
```text
HTTP Server running at http://localhost:3000
```

### Part B: Start Express.js Application (Port 4000)
Open a second terminal window and run:
```bash
node expressApp.js
# Or: npm run start:express
```
**Expected Terminal Output:**
```text
Express Server running at http://localhost:4000
```

---

## 📡 API Documentation & Endpoints

### Part A: Node.js Native HTTP Server (`httpServer.js` - Port 3000)

| Method | Endpoint | Description | Expected Response |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | Home Welcome Route | Welcome HTML message |
| `GET` | `/home` | Static File Serving via `fs` module | Serves `public/index.html` with `text/html` |
| `GET` | `/about` | Application Information | Application overview HTML |
| `GET` | `/tasks` | List all tasks | JSON array of tasks |
| `POST` | `/add-task` | Add a new task | Accepts JSON body `{ id, taskName, assignedTo, status, priority }` and returns `201 Created` |

#### Sample POST Body (`/add-task`):
```json
{
  "id": 4,
  "taskName": "Implement Unit Testing",
  "assignedTo": "Vikram Singh",
  "status": "In Progress",
  "priority": "Medium"
}
```

---

### Part B: Express.js REST API (`expressApp.js` - Port 4000)

| Method | Endpoint | Description | Status Code |
| :--- | :--- | :--- | :--- |
| `GET` | `/tasks` | Retrieve all employee tasks | `200 OK` |
| `GET` | `/tasks/:id` | Retrieve single task by ID | `200 OK` / `404 Not Found` |
| `POST` | `/tasks` | Create a new task | `201 Created` |
| `PUT` | `/tasks/:id` | Update task details | `200 OK` / `404 Not Found` |
| `DELETE` | `/tasks/:id` | Remove a task | `200 OK` / `404 Not Found` |

#### 1. POST `/tasks` (Create Task)
**Request Body:**
```json
{
  "id": 4,
  "taskName": "Develop REST API",
  "assignedTo": "Amit Kumar",
  "status": "Pending",
  "priority": "Medium"
}
```
**Expected Response (`201 Created`):**
```json
{
  "message": "Task added successfully",
  "task": {
    "id": 4,
    "taskName": "Develop REST API",
    "assignedTo": "Amit Kumar",
    "status": "Pending",
    "priority": "Medium"
  }
}
```

#### 2. PUT `/tasks/:id` (Update Task)
**URL:** `http://localhost:4000/tasks/1`  
**Request Body:**
```json
{
  "taskName": "Develop Login Page",
  "assignedTo": "Rahul Sharma",
  "status": "Completed",
  "priority": "High"
}
```
**Expected Response (`200 OK`):**
```json
{
  "message": "Task updated successfully",
  "task": {
    "id": 1,
    "taskName": "Develop Login Page",
    "assignedTo": "Rahul Sharma",
    "status": "Completed",
    "priority": "High"
  }
}
```

#### 3. DELETE `/tasks/:id` (Delete Task)
**URL:** `http://localhost:4000/tasks/1`  
**Expected Response (`200 OK`):**
```json
{
  "message": "Task with ID 1 deleted successfully",
  "task": {
    "id": 1,
    "taskName": "Develop Login Page",
    "assignedTo": "Rahul Sharma",
    "status": "Completed",
    "priority": "High"
  }
}
```

---

## 🧪 Automated Testing

While both servers are running, you can verify all endpoints automatically:
```bash
npm test
```

---

## 📸 Lab Submission Checklist

- [x] Initialized Git repository named `MT1-LABEXAM`
- [x] ES Modules enabled in `package.json`
- [x] Part A: Native HTTP server & FS module (`httpServer.js`)
- [x] Part B: Express.js REST API with full CRUD (`expressApp.js`)
- [x] Meaningful Git commit history
- [x] Screenshots added to `screenshots/` directory
