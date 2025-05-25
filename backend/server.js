const express = require('express');
const cors = require('cors');
const app = express();
const data = require('./data/employees.json');

app.use(cors());

app.get('/api/employee/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const employee = data.employees.find(e => e.id === id);

  if (!employee) {
    return res.status(404).json({ message: 'Employee not found' });
  }

  res.json(employee);
});

app.listen(3000, () => {
  console.log('Backend server running on http://localhost:3000');
});

