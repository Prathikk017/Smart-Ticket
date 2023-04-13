import React, { useEffect } from 'react';
// import Opertable from './Opertable';
// import Dheader from './Dheader';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {

  const history = useNavigate();
  
  useEffect(() => {
    const token = window.localStorage.getItem('Lekpay');
    const Token = JSON.parse(token);
    if (!Token) {
      history('/');
    }
  }, []);

  return (
    <div className='flex flex-row gap-4 bg-gray-50'>
      <Sidebar />
      <div className='justify-center text-center m-auto'>Dashboard</div>
    </div>
  );
};

export default Dashboard;
