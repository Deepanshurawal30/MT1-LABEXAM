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

## ⚙️ Running the Applications

### Part A: Start Built-in HTTP Server (Port 3000)
Open a terminal in the project directory:
```bash
node httpServer.js
```
Expected output:
```text
HTTP Server running at http://localhost:3000
```
Open in browser:
- `http://localhost:3000/` (Welcome Page)
- `http://localhost:3000/home` (Static file served via FS module)
- `http://localhost:3000/tasks` (Tasks JSON)
- `http://localhost:3000/about` (Application Info)

---

### Part B: Start Express.js Server (Port 4000)
Open a second terminal in the project directory:
```bash
node expressApp.js
```
Expected output:
```text
Express Server running at http://localhost:4000
```

Open in browser / EchoAPI:
- `http://localhost:4000/` (Interactive API Dashboard)
- `http://localhost:4000/tasks` (All Tasks JSON)
- `http://localhost:4000/tasks/1` (Single Task by ID)
- `POST http://localhost:4000/tasks` (Add new task via EchoAPI)
- `PUT http://localhost:4000/tasks/1` (Update task via EchoAPI)
- `DELETE http://localhost:4000/tasks/1` (Delete task via EchoAPI)
