import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MdOutlineDirectionsBusFilled } from 'react-icons/md';
import { IoPeople } from 'react-icons/io5';
import axios from 'axios';
import Header from '../../Header';
import Sidebar from '../../../Admin/Sidebar';
import useIdleTimeout from '../../../../../useIdleTimeout';

const IndiviualOperAsset = () => {
  const { OperId } = useParams();
  const ID = window.localStorage.getItem('AdminID');
  let operId = JSON.parse(ID);
  //total asset for operator
  const [data1, setData1] = useState('');
  const history = useNavigate();

  const getAssetByOperatorId = async () => {
    const res = await axios.post('https://lekpay.com/admin/operator/assets', {
      OperId,
    });
    if (res.data.status === 201) {
      setData1(res.data.data);
    } else {
      console.log('error');
    }
  };

  const handleClick = () => {
    history(`/admin/asset/${OperId}`);
  };
  // Call useIdleTimeout and pass in the time to consider the user as idle
  const isIdle = useIdleTimeout(600000); // set to 10 minute

  //  const verify = async() => {
  //    const token = window.localStorage.getItem('Lekpay');
  //    const Token = JSON.parse(token);
  //    const authorization = `Bearer ${Token}`;
  //    const res = await axios.post('https://lekpay.com/admin/verify',{
  // 	 authorization
  //    });
  //    if(res.data.status === 201){
  // 	 console.log(res.data.data);
  //    }else{
  // 	 if(res.data.data === 'Token is not valid'){
  // 	   window.localStorage.removeItem('Lekpay');
  // 	   history('/');
  // 	 }
  //    }
  //  }

  //  useEffect(() => {
  //    verify();
  //    // Run verify() every 10 minute if the user is not idle
  //    const intervalId = setInterval(() => {
  // 	 if (!isIdle) {
  // 	   verify();
  // 	 }
  //    }, 600000);

  //    // Clear the interval when the component unmounts
  //    return () => clearInterval(intervalId);
  //  }, [!isIdle]);

  useEffect(() => {
    const logout = async () => {
      if (isIdle) {
        window.localStorage.removeItem('Lekpay');
  
        try {
          const res = await axios.patch('https://lekpay.com/admin/logout', {
            OperId:operId,
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
  }, [isIdle, operId, history]);

  useEffect(() => {
    const token = window.localStorage.getItem('Lekpay');
    const Token = JSON.parse(token);
    if (!Token) {
      history('/signin');
    } else {
      getAssetByOperatorId();
    }
  }, []);
  return (
    <div className='flex gap-4 bg-gray-50'>
      <Sidebar />
      <div className='flex flex-col flex-1'>
        <Header />
        <div className='flex flex-row gap-4  m-auto'>
          <div className='flex flex-col m-auto h-[450px] w-[400px] p-4 bg-pink-100/30 rounded-3xl z-2'>
            <span className='text-4xl text-pink-500 font-bold text-center py-4'>
              Total Assets
            </span>
            <div
              className='w-[200px] h-[200px] bg-white/50 shadow-xl  shadow-gray-200/50  mx-auto my-6 items-center justify-center p-20 rounded-full text-pink-500 text-6xl font-bold pb-10 z-2 hover:scale-105 duration-200 ease-out cursor-pointer'
              onClick={() => handleClick()}
            >
              {data1.length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndiviualOperAsset;
