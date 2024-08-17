import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from '../assets/logo.jpeg';

function DeveloperProfile() {
  const [userName, setUserName] = useState('');
  const [id, setId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [skills, setSkills] = useState([]);
  const [bio, setBio] = useState('');
  const [password, setPassword] = useState('');
  const [availability, setAvailability] = useState('immediate');
  const [profileType, setProfileType] = useState('dev');
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      setId(userId);
      axios
        .get(`http://localhost:3000/dev/${userId}`)
        .then((response) => {
          const user = response.data;
          setUserName(user.userName);
          setFirstName(user.firstName);
          setLastName(user.lastName);
          setHourlyRate(user.hourlyRate);
          setEmail(user.email);
          setPhone(user.phone);
          setSkills(user.skills || []);
          setBio(user.biographie || '');
          setAvailability(user.disponibilite || 'immediate');
          setPassword(user.password);
        })
        .catch((error) => console.error(error));
    }
  }, []);

  const handleProfileUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:3000/dev/${id}`, {
        userName,
        firstName,
        lastName,
        hourlyRate,
        email,
        phone,
        skills,
        bio,
        availability,
        profileType,
        password,
      });
      console.log(response.data);
      alert('Profile updated successfully');
    } catch (error) {
      console.error(error);
    }
  };

  // Styles
  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  };

  const sectionTitleStyle = {
    color: '#012150',
    marginBottom: '10px',
  };

  const separatorStyle = {
    borderBottom: '2px solid #012150',
    marginBottom: '20px',
  };

  const profileSectionStyle = {
    display: 'flex',
    gap: '20px',
    alignItems: 'flex-start',
    marginBottom: '30px',
    maxWidth: '100%',
    margin: '0 auto',
  };

  const skillsBioSectionStyle = {
    maxWidth: '100%',
    margin: '0 auto',
  };

  const inputStyle = {
    width: '50%',
    padding: '10px',
    borderRadius: '5px',
    border: '2px solid #012150',
    marginBottom: '10px',
  };

  const flexContainerStyle = {
    display: 'flex',
    gap: '20px',
    marginBottom: '30px',
  };

  return (
    <div style={containerStyle}>
      {/* Header Section */}
      <h2
        style={{
          backgroundColor: '#012150',
          color: 'white',
          padding: '15px',
          textAlign: 'center',
          margin: 0,
        }}
      ></h2>

      {/* Logo Section */}
      <div style={{ textAlign: 'center', padding: '20px 0' }}>
        <img src={logo} alt="Logo" style={{ maxWidth: '100px' }} />
      </div>

      {/* Navbar Section */}
      <div
        style={{
          display: 'flex',
          backgroundColor: '#012150',
          padding: '10px 0',
        }}
      >
        <div style={{ margin: '0 20px' }}>
          <a
            href="/developer/profile"
            style={{ textDecoration: 'none', color: '#ffff' }}
          >
            Dev Profile
          </a>
        </div>
        <div style={{ margin: '0 20px' }}>
          <a
            href="/dev-orders"
            style={{ textDecoration: 'none', color: '#ffff' }}
          >
            Orders
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ padding: '20px' }}>
        {/* Profile Section */}
        <div style={profileSectionStyle}>
          <div style={{ flex: '3' }}>
            <h3 style={sectionTitleStyle}>PROFILE</h3>
            <div style={separatorStyle}></div>
            <div style={{ display: 'flex', gap: '20px' }}>
              <div style={{ flex: '1' }}>
                <img
                  src=""
                  alt="Profile"
                  style={{ maxWidth: '150px', borderRadius: '50%' }}
                />
              </div>
              <div
                style={{
                  flex: '3',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}
              >
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  style={inputStyle}
                />
                <input
                  type="text"
                  placeholder="User Name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  style={inputStyle}
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  style={inputStyle}
                />
                  <input
                  type="number"
                  placeholder="Hourly rate"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(e.target.value)}
                  style={inputStyle}
                />
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div style={{ flex: '2' }}>
            <h3 style={sectionTitleStyle}>CONTACT</h3>
            <div style={separatorStyle}></div>
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
            >
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={inputStyle}
              />
              <input
                type="text"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={inputStyle}
              />
            </div>
          </div>
        </div>
        {/* Skills Section */}
        <div style={{ ...skillsBioSectionStyle, marginBottom: '30px' }}>
          <h3 style={sectionTitleStyle}>SKILLS</h3>
          <div style={separatorStyle}></div>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px',
              marginTop: '10px',
            }}
          >
            {['HTML', 'CSS', 'JS', 'React'].map((skill) => (
              <label
                key={skill}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  cursor: 'pointer',
                }}
              >
                <input
                  type="radio"
                  name="skills"
                  value={skill}
                  checked={skills.includes(skill)}
                  onChange={(e) => {
                    const selectedSkill = e.target.value;
                    setSkills((prev) =>
                      prev.includes(selectedSkill)
                        ? prev.filter((s) => s !== selectedSkill)
                        : [...prev, selectedSkill]
                    );
                  }}
                  style={{ width: '20px', height: '20px' }}
                />
                {skill}
              </label>
            ))}
          </div>
        </div>
        {/* Biography Section */}
        <div style={flexContainerStyle}>
          <div style={{ flex: '2' }}>
            <h3 style={sectionTitleStyle}>BIOGRAPHIE</h3>
            <div style={separatorStyle}></div>
            <textarea
              placeholder="Biography"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              style={{
                width: '70%',
                padding: '10px',
                borderRadius: '5px',
                border: '2px solid #012150',
                height: '150px',
              }}
            />
          </div>

          {/* Availability Section */}
          <div style={{ flex: '1' }}>
            <h3 style={sectionTitleStyle}>DISPONIBILITE</h3>
            <div style={separatorStyle}></div>
            <select
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
              style={{
                width: '50%',
                padding: '10px',
                borderRadius: '5px',
                border: '2px solid #012150',
                height: '40px',
                fontSize: '16px',
              }}
            >
              <option value="immediate">Immediate</option>
              <option value="2_weeks">2 weeks</option>
              <option value="5_weeks">5 weeks</option>
            </select>
          </div>
        </div>
      </div>

      {/* Update Button */}
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <button
          onClick={handleProfileUpdate}
          style={{
            padding: '15px 30px',
            backgroundColor: '#012150',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          Update Profile
        </button>
      </div>
    </div>
  );
}

export default DeveloperProfile;
