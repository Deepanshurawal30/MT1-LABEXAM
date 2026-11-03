// testServers.js - Verification test script for Part A & Part B
async function testAll() {
  console.log('--- Testing Part A: Native HTTP Server (Port 3000) ---');
  try {
    // 1. GET /
    const resRoot = await fetch('http://localhost:3000/');
    const textRoot = await resRoot.text();
    console.log(`GET / : Status ${resRoot.status}, HTML contains 'Welcome': ${textRoot.includes('Welcome')}`);

    // 2. GET /about
    const resAbout = await fetch('http://localhost:3000/about');
    const textAbout = await resAbout.text();
    console.log(`GET /about : Status ${resAbout.status}, HTML contains 'About Application': ${textAbout.includes('About Application')}`);

    // 3. GET /home (FS Module)
    const resHome = await fetch('http://localhost:3000/home');
    const textHome = await resHome.text();
    console.log(`GET /home (FS module) : Status ${resHome.status}, Content-Type: ${resHome.headers.get('content-type')}, HTML contains 'Employee Task Management': ${textHome.includes('Employee Task Management')}`);

    // 4. GET /tasks
    const resTasksA = await fetch('http://localhost:3000/tasks');
    const dataTasksA = await resTasksA.json();
    console.log(`GET /tasks : Status ${resTasksA.status}, Task count: ${dataTasksA.length}`);

    // 5. POST /add-task
    const resPostA = await fetch('http://localhost:3000/add-task', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: 4,
        taskName: 'Implement Unit Testing',
        assignedTo: 'Vikram Singh',
        status: 'In Progress',
        priority: 'Medium'
      })
    });
    const dataPostA = await resPostA.json();
    console.log(`POST /add-task : Status ${resPostA.status}, Response:`, dataPostA);

    // 6. GET /invalid
    const res404A = await fetch('http://localhost:3000/unknown-route');
    console.log(`GET /unknown-route : Status ${res404A.status}`);
  } catch (err) {
    console.error('Part A Error:', err.message);
  }

  console.log('\n--- Testing Part B: Express.js REST API (Port 4000) ---');
  try {
    // 1. GET /tasks
    const resTasksB = await fetch('http://localhost:4000/tasks');
    const dataTasksB = await resTasksB.json();
    console.log(`GET /tasks : Status ${resTasksB.status}, Task count: ${dataTasksB.length}`);

    // 2. GET /tasks/1
    const resTask1 = await fetch('http://localhost:4000/tasks/1');
    const dataTask1 = await resTask1.json();
    console.log(`GET /tasks/1 : Status ${resTask1.status}, Task 1:`, dataTask1);

    // 3. POST /tasks (Page 5 sample)
    const resPostB = await fetch('http://localhost:4000/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: 4,
        taskName: 'Develop REST API',
        assignedTo: 'Amit Kumar',
        status: 'Pending',
        priority: 'Medium'
      })
    });
    const dataPostB = await resPostB.json();
    console.log(`POST /tasks : Status ${resPostB.status}, Response:`, dataPostB);

    // 4. PUT /tasks/1 (Page 5 sample)
    const resPut = await fetch('http://localhost:4000/tasks/1', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        taskName: 'Develop Login Page',
        assignedTo: 'Rahul Sharma',
        status: 'Completed',
        priority: 'High'
      })
    });
    const dataPut = await resPut.json();
    console.log(`PUT /tasks/1 : Status ${resPut.status}, Response:`, dataPut);

    // 5. DELETE /tasks/1 (Page 5 sample)
    const resDelete = await fetch('http://localhost:4000/tasks/1', {
      method: 'DELETE'
    });
    const dataDelete = await resDelete.json();
    console.log(`DELETE /tasks/1 : Status ${resDelete.status}, Response:`, dataDelete);

    // 6. Verify task 1 deleted
    const resVerify404 = await fetch('http://localhost:4000/tasks/1');
    console.log(`GET /tasks/1 after delete : Status ${resVerify404.status}`);

    // 7. GET /tasks after operations
    const resFinalTasks = await fetch('http://localhost:4000/tasks');
    const dataFinalTasks = await resFinalTasks.json();
    console.log(`Final tasks list count: ${dataFinalTasks.length}`);
  } catch (err) {
    console.error('Part B Error:', err.message);
  }
}

testAll();
