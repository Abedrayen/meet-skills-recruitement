import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.jpeg';

function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const [devResponse, hirerResponse] = await Promise.all([
        axios.get('http://localhost:3000/dev', {
          params: { username, password },
        }),
        axios.get('http://localhost:3000/hirer', {
          params: { username, password },
        }),
      ]);

      const devUser = devResponse.data.find(
        (user) => user.username === username && user.password === password
      );
      const hirerUser = hirerResponse.data.find(
        (user) => user.username === username && user.password === password
      );

      if (devUser) {
        if (devUser.profileType === 'dev') {
          localStorage.setItem('userId', devUser.id);
          navigate('/developer/profile');
        } else {
          console.error('Invalid profile type for developer');
        }
      } else if (hirerUser) {
        if (hirerUser.profileType === 'hirer') {
          localStorage.setItem('userId', hirerUser.id);
          navigate('/hirer/profile');
        } else {
          console.error('Invalid profile type for hirer');
        }
      } else {
        console.error('Invalid credentials');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        maxWidth: '1200px',
        margin: '0 auto',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        padding: '20px',
        boxSizing: 'border-box',
        maxWidth: '1200px',
        margin: '0 auto',
        marginTop: '-100px',
      }}
    >
      {/* Header Section */}
      <h2
        style={{
          backgroundColor: '#012150',
          color: 'white',
          padding: '15px',
          textAlign: 'center',
          margin: '0 0 20px 0',
          width: '100%',
          maxWidth: '600px',
          fontSize: '24px',
          borderRadius: '5px',
        }}
      >
        Login
      </h2>

      {/* Logo Section */}
      <div
        style={{
          textAlign: 'center',
          padding: '80px 0',
        }}
      >
        <img src={logo} alt="Logo" style={{ maxWidth: '120px' }} />
      </div>

      {/* Input Fields */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '15px',
          maxWidth: '600px',
          width: '100%',
        }}
      >
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            width: '100%',
            maxWidth: '400px',
            padding: '15px',
            borderRadius: '5px',
            border: '3px solid #2C415F',
            fontSize: '16px',
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: '100%',
            maxWidth: '400px',
            padding: '15px',
            borderRadius: '5px',
            border: '3px solid #2C415F',
            fontSize: '16px',
          }}
        />
      </div>

      {/* Sign In Button */}
      <div
        style={{
          textAlign: 'center',
          padding: '20px',
          maxWidth: '600px',
          width: '100%',
        }}
      >
        <button
          onClick={handleSignIn}
          style={{
            width: '150px',
            padding: '15px',
            backgroundColor: '#012150',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          Valider
        </button>
      </div>
    </div>
  );
}

export default SignIn;
