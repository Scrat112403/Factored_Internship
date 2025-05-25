import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Avatar, CircularProgress, Box } from '@mui/material';
import SkillChart from '../components/SkillChart';

function Profile() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/api/employee/${id}`)
      .then(res => res.json())
      .then(data => {
        setEmployee(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching employee:', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <CircularProgress />;

  if (!employee) return <Typography variant="h6">Employee not found</Typography>;

  return (
    <Container sx={{ mt: 4 }}>
      <Box display="flex" alignItems="center" gap={2} mb={3}>
        <Avatar
          alt={employee.name}
          src={`https://avatars.dicebear.com/api/avataaars/${employee.name}.svg`}
          sx={{ width: 80, height: 80 }}
        />
        <Box>
          <Typography variant="h5">{employee.name}</Typography>
          <Typography variant="subtitle1">{employee.position}</Typography>
        </Box>
      </Box>

      <SkillChart skills={employee.skills} />
    </Container>
  );
}

export default Profile;
