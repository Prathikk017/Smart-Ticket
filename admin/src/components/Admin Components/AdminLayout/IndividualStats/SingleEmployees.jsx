import React, { useEffect } from 'react';
// import Opertable from './Opertable';
// import Dheader from './Dheader';
import axios from 'axios';
import useIdleTimeout from '../../../../useIdleTimeout';
import Sidebar from '../../Admin/Sidebar';
import { useNavigate } from 'react-router-dom';
import Header from '../../AdminLayout/Header';
import EmployeeCard from './SingleOperEmployee/EmployeeCard';

const SingleEmployeeDashboard = () => {
  const history = useNavigate();
  const ID = window.localStorage.getItem('AdminID');
      let OperId = JSON.parse(ID);
  // Call useIdleTimeout and pass in the time to consider the user as idle
  const isIdle = useIdleTimeout(600000); // set to 10 minute

  // const verify = async() => {
  //   const token = window.localStorage.getItem('Lekpay');
  //   const Token = JSON.parse(token);
  //   const authorization = `Bearer ${Token}`;
  //   const res = await axios.post('https://lekpay.com/admin/verify',{
  //     authorization
  //   });
  //   if(res.data.status === 201){
  //     console.log(res.data.data);
  //   }else{
  //     if(res.data.data === 'Token is not valid'){
  //       window.localStorage.removeItem('Lekpay');
  //       history('/');
  //     }
  //   }
  // }

  // useEffect(() => {
  //   verify();
  //   // Run verify() every 10 minute if the user is not idle
  //   const intervalId = setInterval(() => {
  //     if (!isIdle) {
  //       verify();
  //     }
  //   }, 600000);

  //   // Clear the interval when the component unmounts
  //   return () => clearInterval(intervalId);
  // }, [!isIdle]);

  useEffect(() => {
    const logout = async () => {
      if (isIdle) {
        window.localStorage.removeItem('Lekpay');
  
        try {
          const res = await axios.patch('https://lekpay.com/admin/logout', {
            OperId,
          });
  
          if (res.data.status === 201) {
            console.log('logout');
          } else {
            console.log('error');
          }
  
          history('/signin');
        } catch (error) {
          console.error(error);
        }
      }
    };
  
    logout();
  }, [isIdle, OperId, history]);

  useEffect(() => {
    const token = window.localStorage.getItem('Lekpay');
    const Token = JSON.parse(token);
    if (!Token) {
      history('/signin');
    }
  }, []);

  return (
    <div className='flex gap-4 bg-gray-50'>
      <Sidebar />
      <div className='flex flex-col flex-1'>
        <Header />
        <div className='flex flex-col gap-4'>
          <EmployeeCard />
          {/* <TransactionChart /> */}
        </div>
      </div>
    </div>
  );
};

export default SingleEmployeeDashboard;
