const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const dataPath = path.join(__dirname, 'data', 'employees.json');

app.use(cors());
app.use(express.json());

// LOGIN (ya existente)
app.post('/api/login', (req, res) => {
  const { user, password } = req.body;
  const data = JSON.parse(fs.readFileSync(dataPath));

  const employee = data.employees.find(
    e => e.user === user && e.password === password
  );

  if (!employee) {
    return res.status(401).json({ message: 'Invalid user or password' });
  }

  res.json({
    token: 'fake-token-abc123',
    userId: employee.id
  });
});

// OBTENER EMPLEADO
app.get('/api/employee/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const data = JSON.parse(fs.readFileSync(dataPath));
  const employee = data.employees.find(e => e.id === id);

  if (!employee) {
    return res.status(404).json({ message: 'Employee not found' });
  }

  res.json(employee);
});

// ✅ SIGNIN (Guardar en archivo)
app.post('/api/signin', (req, res) => {
  const { user, password, name, position, skills } = req.body;

  if (!user || !password || !name || !position || !skills || Object.keys(skills).length < 5) {
    return res.status(400).json({ message: 'All fields are required and at least 5 skills' });
  }

  const data = JSON.parse(fs.readFileSync(dataPath));

  // Crear nuevo usuario con ID único
  const newEmployee = {
    id: Date.now(), // o usa uuid
    user,
    password,
    name,
    position,
    skills
  };

  data.employees.push(newEmployee);

  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2)); // Guardar con formato bonito

  res.status(200).json({
    message: 'User registered successfully',
    userId: newEmployee.id
  });
});

app.listen(3001, () => {
  console.log('✅ Backend server running on http://localhost:3001');
});
