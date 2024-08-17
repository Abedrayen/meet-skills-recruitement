import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import DeveloperProfile from './components/DeveloperProfile';
import HirerProfile from './components/HirerProfile';
import Offers from './components/Offers';
import DeveloperOrders from './components/DeveloperOrders';
import HirerOrders from './components/HirerOrders';
import DevProfile from './components/DevProfile';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/developer/profile" element={<DeveloperProfile />} />
        <Route path="/hirer/profile" element={<HirerProfile />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/dev-orders" element={<DeveloperOrders />} />
        <Route path="/hirer-orders" element={<HirerOrders />} />
        <Route path="/developer/:developerId" component={DevProfile} />
      </Routes>
    </Router>
  );
}

export default App;
