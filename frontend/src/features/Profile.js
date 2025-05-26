import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Avatar, CircularProgress } from '@mui/material';
import SkillChart from './SkillChart';
import styles from '../index.css';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
        <div>
          <button onClick={() => navigate('/main')} style={{ position: 'absolute', top: '20px', right: '20px', padding: '10px 20px'}}>Log Out</button>
        </div>
      </div>

      <div className={styles.userchart}>
        <SkillChart skills={employee.skills} />
      </div>
      <div className="background-overlay">
        <div className="background-container">
            {[...Array(10)].map((_, i) => (
                <div key={i} className={`column col-${i + 1}`} />
            ))}
    </div>
    </div></div>
  );
}

export default Profile;

