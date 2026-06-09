import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TravellerDashboard from '../components/TravellerDashboard';
import GuideDashboard from '../components/GuideDashboard';
import VendorDashboard from '../components/VendorDashboard';
import AdminDashboard from '../components/AdminDashboard';

const Dashboard = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState('Traveller');
  const [stats, setStats] = useState({ trips: 0, ecoScore: 0, revenue: 0 });

  useEffect(() => {
    // Get role from localStorage (set in login)
    const role = localStorage.getItem('userRole') || 'Traveller';
    console.log(role);
    setUserRole(role);

    // Mock stats - replace with real API later
    if (role === 'Vendor') setStats({ trips: 12, ecoScore: 8.7, revenue: 24500 });
    if (role === 'Guide') setStats({ trips: 28, ecoScore: 9.2, revenue: 15600 });
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate('/');
  };

  // const handleAddPOI = () => {
  //   window.location.href = '/guide-dashboard';
  // }

  const RoleDashboard = () => {
    switch (userRole) {
      case 'Traveller':
        return (
          <TravellerDashboard/>
        );

      case 'Vendor':
        return (
          <VendorDashboard/>
        );

      case 'Guide':
        return (
          <GuideDashboard/>
            
        );

      case 'Admin':
        return (
          <AdminDashboard/>
        );

      default:
        return null;
    }
  };

  return (
    <RoleDashboard />
  );
};

export default Dashboard;
