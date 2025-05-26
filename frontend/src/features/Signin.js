import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styles from '../index.css';

export default function Signin() {
  const [user, setUser] = useState('');
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
        user,
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

    // Validar campos básicos
    if (!user || !password || !name || !position) {
      setError('Please complete all required fields');
      return;
    }

    // Validar cantidad mínima de skills
    const filledSkills = skills.filter(skill => skill.name && skill.value !== '');
    if (filledSkills.length < 5) {
      setError('Please enter at least 5 skills');
      return;
    }

    // Validar que todos los valores de score sean entre 0 y 100
    const invalidScores = filledSkills.some(skill => {
      const score = parseInt(skill.value);
      return isNaN(score) || score < 0 || score > 100;
    });

    if (invalidScores) {
      setError('All scores must be numbers between 0 and 100');
      return;
    }

    const { userId } = await signUser(); // Si pasa validación
    navigate(`/login`);

  } catch (error) {
    setError(error instanceof Error ? error.message : 'Unknown error');
  }
};


  return (
    <div className={styles.signheader}>
      <h1>Factored AI</h1>
      <h2>Create your account</h2>

      <div className={styles.input}>
        <input
          type="text"
          placeholder="Enter your user"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
      </div>

      <div className={styles.input}>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className={styles.input}>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className={styles.input}>
        <input
          type="text"
          placeholder="Enter your position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />
      </div>
      <div className={styles.input}>
        <h3>Number of skills</h3>
        <input
          type="number"
          placeholder="How many skills?"
          value={skillCount}
          onChange={handleSkillCountChange}
        />
      </div>

      {skills.map((skill, index) => (
        <div className="skill-row" key={index}>
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

      <button onClick={handleSignin}>
        Sign In
      </button>
      <div className="background-container">
            {[...Array(10)].map((_, i) => (
                <div key={i} className={`column col-${i + 1}`} />
            ))}
    </div>
    </div>
  );
}
