import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from '../assets/logo.jpeg';

function HirerProfile() {
  const [id, setId] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [businesses, setBusinesses] = useState([]);
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [profileType, setProfileType] = useState('hirer');
  const businessOptions = [
    'Automobile',
    'Electronic',
    'Finance',
    'Marketing',
    'Insurance',
    'Information Technology',
  ];

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      setId(userId);
      axios
        .get(`http://localhost:3000/hirer/${userId}`)
        .then((response) => {
          const user = response.data;
          setUserName(user.username);
          setCompanyName(user.companyName);
          setEmail(user.email);
          setPhone(user.phone);
          setBusinesses(user.businesses || []);
          setPassword(user.password);
        })
        .catch((error) => {
          console.error('Error fetching hirer profile:', error);
          if (error.response && error.response.status === 404) {
            console.error('Profile not found');
          }
        });
    } else {
      console.error('User ID not found in localStorage');
    }
  }, []);

  const handleCheckboxChange = (business) => {
    setBusinesses((prev) =>
      prev.includes(business)
        ? prev.filter((b) => b !== business)
        : [...prev, business]
    );
  };

  const handleProfileUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:3000/hirer/${id}`, {
        username,
        companyName,
        email,
        phone,
        businesses,
        password,
        profileType,
      });
      console.log('Profile updated:', response.data);
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      if (error.response && error.response.status === 404) {
        console.error('Profile not found');
      }
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

  const headerStyle = {
    backgroundColor: '#012150',
    color: 'white',
    padding: '15px',
    textAlign: 'center',
    margin: '0',
  };

  const logoStyle = {
    textAlign: 'center',
    padding: '20px 0',
  };

  const navbarStyle = {
    display: 'flex',
    backgroundColor: '#012150',
    padding: '10px 0',
  };

  const navLinkStyle = {
    margin: '0 20px',
    color: '#fff',
    textDecoration: 'none',
  };

  const profileContactContainerStyle = {
    display: 'flex',
    gap: '20px',
    marginBottom: '30px',
  };

  const profileSectionStyle = {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  };

  const contactSectionStyle = {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  };

  const businessSectionStyle = {
    marginBottom: '30px',
  };

  const sectionTitleStyle = {
    color: '#012150',
    marginBottom: '10px',
  };

  const separatorStyle = {
    borderBottom: '2px solid #012150',
    marginBottom: '20px',
  };

  const inputStyle = {
    width: '50%',
    padding: '10px',
    borderRadius: '5px',
    border: '2px solid #012150',
    marginBottom: '10px',
  };

  const businessCheckboxContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '20px',
  };

  const businessCheckboxStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  };

  return (
    <div style={containerStyle}>
      {/* Header Section */}
      <h2 style={headerStyle}></h2>

      {/* Logo Section */}
      <div style={logoStyle}>
        <img src={logo} alt="Logo" style={{ maxWidth: '100px' }} />
      </div>

      {/* Navbar Section */}
      <div style={navbarStyle}>
        <a href="/hirer/profile" style={navLinkStyle}>
          Hirer Profile
        </a>
        <a href="/hirer-orders" style={navLinkStyle}>
          Place Orders
        </a>
      </div>

      {/* Profile and Contact Sections */}
      <div style={profileContactContainerStyle}>
        {/* Profile Section */}
        <div style={profileSectionStyle}>
          <h3 style={sectionTitleStyle}>PROFILE</h3>
          <div style={separatorStyle}></div>
          <input
            type="text"
            placeholder="Company Name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            style={inputStyle}
          />
        </div>

        {/* Contact Section */}
        <div style={contactSectionStyle}>
          <h3 style={sectionTitleStyle}>CONTACT</h3>
          <div style={separatorStyle}></div>
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

      {/* Business Section */}
      <div style={businessSectionStyle}>
        <h3 style={sectionTitleStyle}>BUSINESSES</h3>
        <div style={separatorStyle}></div>
        <div style={businessCheckboxContainerStyle}>
          {businessOptions.map((business) => (
            <div key={business} style={businessCheckboxStyle}>
              <input
                type="checkbox"
                checked={businesses.includes(business)}
                onChange={() => handleCheckboxChange(business)}
              />
              <label>{business}</label>
            </div>
          ))}
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

export default HirerProfile;
