import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [skillCount, setSkillCount] = useState(0);
  const [skills, setSkills] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSkillChange = (index, field, value) => {
    const updatedSkills = [...skills];
    updatedSkills[index] = { ...updatedSkills[index], [field]: value };
    setSkills(updatedSkills);
  };

  const handleSkillCountChange = (e) => {
    const count = parseInt(e.target.value) || 0;
    setSkillCount(count);
    setSkills(Array.from({ length: count }, () => ({ name: '', value: '' })));
  };

  const signUser = async () => {
    const skillsObj = {};
    skills.forEach(skill => {
      if (skill.name && skill.value) {
        skillsObj[skill.name] = parseInt(skill.value);
      }
    });

    const response = await fetch('http://localhost:3001/api/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password,
        name,
        position,
        skills: skillsObj
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Signin error');
    }

    return data;
  };

  const handleSignin = async () => {
    try {
      setError('');
      navigate(`/login`);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Unknown error');
    }
  };

  return (
    <div className="header">
      <h1>Factored AI</h1>
      <h2>Sign In</h2>

      <div className="input">
        <input
          type="text"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="input">
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="input">
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="input">
        <input
          type="text"
          placeholder="Enter your position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />
      </div>
      <label>How many skills?</label>
      <div className="input">
        
        <input
          type="number"
          placeholder="How many skills?"
          value={skillCount}
          onChange={handleSkillCountChange}
        />
      </div>

      {skills.map((skill, index) => (
        <div key={index} style={{ marginBottom: '10px' }}>
          <input
            type="text"
            placeholder={`Skill ${index + 1} name`}
            value={skill.name}
            onChange={(e) => handleSkillChange(index, 'name', e.target.value)}
          />
          <input
            type="number"
            placeholder="Score (0-100)"
            value={skill.value}
            onChange={(e) => handleSkillChange(index, 'value', e.target.value)}
            style={{ marginLeft: '10px' }}
          />
        </div>
      ))}

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <Button variant="contained" onClick={handleSignin}>
        Signin
      </Button>
    </div>
  );
}
