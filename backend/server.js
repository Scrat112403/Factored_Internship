//Import frameworks and modules required
const express = require('express');         
const cors = require('cors');              
const fs = require('fs');                   
const path = require('path');       
//Initialize the app        
const app = express();                      

//Path to the JSON file that stores employee data
const dataPath = path.join(__dirname, 'data', 'employees.json');

//Middleware to handle requests and parse JSON request bodies
app.use(cors());
app.use(express.json());

//POST to Authenticate an user by comparing provided credentials with the data in employees.json
app.post('/api/login', (req, res) => {
  const { user, password } = req.body;

  //Loads employee data from file
  const data = JSON.parse(fs.readFileSync(dataPath));

  //Finds matching employee by user and password
  const employee = data.employees.find(
    e => e.user === user && e.password === password
  );

  //If there's no match, returns error
  if (!employee) {
    return res.status(401).json({ message: 'Invalid user or password' });
  }

  //If it is valid, returns fake token and user ID
  res.json({
    token: 'fake-token-abc123',
    userId: employee.id
  });
});

//GET to return the profile information of an employee by ID
app.get('/api/employee/:id', (req, res) => {
  const id = parseInt(req.params.id);

  //Loads employee data from file
  const data = JSON.parse(fs.readFileSync(dataPath));

  //Finds the employee with the given ID
  const employee = data.employees.find(e => e.id === id);

  //If it is not found, returns error
  if (!employee) {
    return res.status(404).json({ message: 'Employee not found' });
  }

  //Returns the employee data
  res.json(employee);
});

//POST to register a new employee and save their data in employees.json
app.post('/api/signin', (req, res) => {
  const { user, password, name, position, skills } = req.body;

  //Validates input
  if (!user || !password || !name || !position || !skills || Object.keys(skills).length < 5) {
    return res.status(400).json({ message: 'All fields are required and at least 5 skills' });
  }

  //Loads current data
  const data = JSON.parse(fs.readFileSync(dataPath));

  //Creates a new employee object with a unique ID
  const newEmployee = {
    id: Date.now(), //Uses timestamp as unique ID
    user,
    password,
    name,
    position,
    skills
  };

  //Adds the new employee to the data array
  data.employees.push(newEmployee);

  //Saves the updated data back to the file
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

  //Returns confirmation
  res.status(200).json({
    message: 'User registered successfully',
    userId: newEmployee.id
  });
});

//Starts the server on port 3001
app.listen(3001, () => {
  console.log('Backend server running on http://localhost:3001');
});
