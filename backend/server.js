const express = require('express');
const cors = require('cors');
const app = express();
const data = require('./data/employees.json');

app.use(cors());
app.use(express.json());

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  const employee = data.employees.find(
    e => e.email === email && e.password === password
  );

  if (!employee) {
    return res.status(401).json({ message: 'Invalid user or password' });
  }

  res.json({
    token: 'fake-token-abc123',
    userId: employee.id
  });
});

// Ruta para obtener el perfil
app.get('/api/employee/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const employee = data.employees.find(e => e.id === id);

  if (!employee) {
    return res.status(404).json({ message: 'Employee not found' });
  }

  res.json(employee);
});

app.listen(3001, () => {
  console.log('Backend server running on http://localhost:3001');
});
