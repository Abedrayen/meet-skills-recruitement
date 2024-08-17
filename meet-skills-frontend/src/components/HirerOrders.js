import React, { useState, useEffect } from'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function HirerOrders() {
  const [developers, setDevelopers] = useState([]);
  const [searchSkills, setSearchSkills] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const navigate = useNavigate();

  useEffect(() => {
    fetchDevelopers();
  }, []);

  const fetchDevelopers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/dev', {
        params: { skills: searchSkills.join(',') },
      });
      setDevelopers(response.data);
    } catch (error) {
      console.error('Error fetching developers:', error);
    }
  };

  const handleSortDevelopers = (order) => {
    const sortedDevelopers = [...developers].sort((a, b) =>
      order === 'asc' ? a.hourlyRate - b.hourlyRate : b.hourlyRate - a.hourlyRate
    );
    setDevelopers(sortedDevelopers);
  };

  const handleSearchSkillsChange = (skill) => {
    setSearchSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const viewDeveloperProfile = (developerId) => {
    navigate(`/developer/${developerId}`);
  };

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>Hirer Orders</h2>
      <div style={searchSectionStyle}>
        <h3 style={sectionTitleStyle}>Search Developers</h3>
        <div style={businessCheckboxContainerStyle}>
          {['Java', 'JSON', 'MySQL', 'React', 'Node.js'].map((skill) => (
            <div key={skill}style={businessCheckboxStyle}><input
                type="checkbox"
                checked={searchSkills.includes(skill)}
                onChange={() => handleSearchSkillsChange(skill)}
              />
              <label>{skill}</label>
        </div>
          ))}
      </div>
      <button onClick={fetchDevelopers} style={buttonStyle}>
          Search
        </button>
      </div>
      <div style={developerListSectionStyle}>
        <h3 style={sectionTitleStyle}>Developer List</h3><button onClick={() => handleSortDevelopers('asc')} style={buttonStyle}>
          Sort by Hourly Rate (Asc)
        </button>
        <button onClick={() => handleSortDevelopers('desc')} style={buttonStyle}>
          Sort by Hourly Rate (Desc)
        </button>
        <ul style={listStyle}>
          {developers.map((developer) => (
            <li key={developer.id} style={developerItemStyle}>
              <p>{developer.userName}</p><p>Hourly Rate: ${developer.hourlyRate}</p>
            <button
                onClick={() => viewDeveloperProfile(developer.id)}
                style={buttonStyle}
              >
                View Profile
              </button>
            </li>
          ))}
        </ul>
        </div>
    </div >
  );
}

// Styles
const containerStyle = {
maxWidth: '1200px',
margin: '0 auto',
padding: '20px',
display: 'flex',
flexDirection: 'column',
alignItems: 'center',
backgroundColor: '#f8f8f8',
};

const headerStyle = {
  fontSize: '32px',
  marginBottom: '20px',
};

const searchSectionStyle = {
  width: '100%',
  backgroundColor: '#fff',
  padding: '20px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  borderRadius: '8px',
  marginBottom: '20px',
};

const sectionTitleStyle = {
  fontSize: '24px',
  marginBottom: '10px',
};

const businessCheckboxContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
};

const businessCheckboxStyle = {
  marginBottom: '10px',
};

const buttonStyle = {
  padding: '10px 20px',
  fontSize: '16px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

const developerListSectionStyle = {
  width: '100%',
  backgroundColor: '#fff',
  padding: '20px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  borderRadius: '8px',
  marginBottom: '20px',
};

const developerItemStyle = {
  backgroundColor: '#f1f1f1',
  padding: '10px',
  borderRadius: '4px',
  marginBottom: '10px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const listStyle = {
  listStyleType: 'none',
  padding: 0,
};

export default HirerOrders;
