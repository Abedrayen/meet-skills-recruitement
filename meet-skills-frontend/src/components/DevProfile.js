import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function DevProfile() {
  const { developerId } = useParams();
  const [developer, setDeveloper] = useState(null);

  useEffect(() => {
    fetchDeveloper();
  }, []);

  const fetchDeveloper = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/dev/${developerId}`);
      setDeveloper(response.data);
    } catch (error) {
      console.error('Error fetching developer:', error);
    }
  };

  if (!developer) {
    return <div>Loading...</div>;
  }

  return (
    <div style={profileContainerStyle}>
      <h2 style={profileHeaderStyle}>{developer.userName}'s Profile</h2>
      <p>Hourly Rate: ${developer.hourlyRate}</p>
      <p>Skills: {developer.skills.join(', ')}</p>
      <p>Bio: {developer.bio}</p>
    </div>
  );
}

// Styles
const profileContainerStyle = {
  maxWidth: '800px',
  margin: '0 auto',
  padding: '20px',
  backgroundColor: '#fff',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  borderRadius: '8px',
};

const profileHeaderStyle = {
  fontSize: '28px',
  marginBottom: '20px',
};

export default DevProfile;
