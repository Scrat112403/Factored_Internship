import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Avatar, CircularProgress } from '@mui/material';
import SkillChart from './SkillChart';
import '../index.css';

function Profile() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3001/api/employee/${id}`)
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
  if (!employee) return <p>Employee not found</p>;

  return (
    <div className="userinfo">
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', padding: '1rem' }}>
        <Avatar
          alt={employee.name}
          src={`https://ui-avatars.com/api/${encodeURIComponent(employee.name)}`}
          sx={{ width: 120, height: 120 }}
        />
        <div>
          <h2 style={{ margin: 0 }}>{employee.name}</h2>
          <p style={{ margin: 0 }}>{employee.position}</p>
        </div>
      </div>

      <div className="userchart">
        <SkillChart skills={employee.skills} />
      </div>
      <div className="background-container"></div>
    </div>
  );
}

export default Profile;

