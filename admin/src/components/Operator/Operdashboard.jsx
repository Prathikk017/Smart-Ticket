import React, { useEffect } from 'react';
import Opersidebar from '../Operator/Opersidebar';
import { useNavigate } from 'react-router-dom';
import OperHeader from '../Operator/OperLayout/OperHeader';
import OperStatsGrid from '../Operator/OperLayout/OperStatsGrid';
// import OperTransactionChart from '../Operator/OperLayout/OperTransactionChart';


const Operdashboard = () => {
  const history = useNavigate();
  
  useEffect(() => {
    const token = window.localStorage.getItem('Lekpay');
    const Token = JSON.parse(token);
    if (!Token) {
      history('/');
    }
  }, []);
  return (
    <div className='flex gap-4 bg-gray-50'>
      <Opersidebar />
      <div className='flex flex-col flex-1'>
        <OperHeader/>
        <div className="flex flex-col gap-4">
        <OperStatsGrid/>
        {/* <OperTransactionChart/> */}
        </div>
      </div>
    </div>
  );
};

export default Operdashboard;
