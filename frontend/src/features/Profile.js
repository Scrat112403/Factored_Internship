//Import hooks, components and styles
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Avatar, CircularProgress } from '@mui/material';
import SkillChart from './SkillChart';
import styles from '../index.css';
import { useNavigate } from 'react-router-dom';

function Profile() {
  //Extracts user ID from URL parameters
  const { id } = useParams();

  //State to store employee data and loading state
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  //Hook for navigation
  const navigate = useNavigate();

  //Fetches employee data from backend 
  useEffect(() => {
    fetch(`http://localhost:3001/api/employee/${id}`)
      .then(res => res.json())
      .then(data => {
        setEmployee(data);     //Stores fetched employee data
        setLoading(false);     //Sets loading to false when data is ready
      })
      .catch(err => {
        console.error('Error fetching employee:', err);
        setLoading(false);     
      });
  }, [id]);

  //Shows a loading spinner while fetching data
  if (loading) return <CircularProgress />;

  //Shows a message if no employee is found
  if (!employee) return <p>Employee not found</p>;

  return (
    <div className="userinfo">
      {/* Header section: avatar, name, position, and logout button */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', padding: '1rem' }}>
        
        {/* Avatar with employee name */}
        <Avatar
          alt={employee.name}
          src={`https://ui-avatars.com/api/${encodeURIComponent(employee.name)}`}
          sx={{ width: 120, height: 120 }}
        />

        {/* Employee's name and position */}
        <div>
          <h2 style={{ margin: 0 }}>{employee.name}</h2>
          <p style={{ margin: 0 }}>{employee.position}</p>
        </div>

        {/* Logout button */}
        <div>
          <button
            onClick={() => navigate('/main')}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              padding: '10px 20px'
            }}
          >
            Log Out
          </button>
        </div>
      </div>

      {/* Section for skill levels' chart  */}
      <div className={styles.userchart}>
        <SkillChart skills={employee.skills} />
      </div>

      {/* Background animation */}
      <div className="background-overlay">
        <div className="background-container">
          {[...Array(10)].map((_, i) => (
            <div key={i} className={`column col-${i + 1}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;
