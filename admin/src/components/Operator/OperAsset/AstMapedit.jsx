import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Opersidebar from '../Opersidebar';
import useIdleTimeout from '../../../useIdleTimeout';

const AstMapedit = () => {
  const [astRegNo, setAstRegNo] = useState('');
  const [astInsurExp, setAstInsurExp] = useState('');
  const [astPermitExp, setAstPermitExp] = useState('');

  const history = useNavigate();

  const { AstId } = useParams();

  // function
  const setData7 = (e) => {
    const selectedDate = new Date(e.target.value);
    const currentDate = new Date();

    if (selectedDate > currentDate) {
      setAstInsurExp(e.target.value);
    } else {
      const currentDateISO = currentDate.toISOString().split('T')[0];
      setAstInsurExp(currentDateISO);
    }
  };
  const setData8 = (e) => {
    const selectedDate = new Date(e.target.value);
    const currentDate = new Date();

    if (selectedDate > currentDate) {
      setAstPermitExp(e.target.value);
    } else {
      const currentDateISO = currentDate.toISOString().split('T')[0];
      setAstPermitExp(currentDateISO);
    }
  };

  const getData = async () => {
    const res1 = await axios.get(
      `https://lekpay.com/operator/astread/${AstId}`
    );

    if (res1.data.status === 201) {
      setAstRegNo(res1.data.data[0].AstRegNo);
      setAstInsurExp(res1.data.data[0].AstInsurExp);
      setAstPermitExp(res1.data.data[0].AstPermitExp);
      return;
    } else {
      console.log('error');
    }
  };

  const handleSub = async (e) => {
    e.preventDefault();

    if (!astInsurExp || !astPermitExp) {
      alert('Fill the details');
      return;
    } else {
      const res = await axios.patch(
        `https://lekpay.com/operator/asset/updatemap/${AstId}`,
        {
          astInsurExp,
          astPermitExp,
        }
      );
      if (res.data.status === 201) {
        alert('Asset successfully update');
        history('/operdashboard');
        return;
      } else {
        alert('Asset unable to update');
        return;
      }
    }
  };

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
        const ID = window.localStorage.getItem('OperID');
        let OperId = JSON.parse(ID);
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
  }, [isIdle, history]);

  useEffect(() => {
    const token = window.localStorage.getItem('Lekpay');
    const Token = JSON.parse(token);
    if (!Token) {
      history('/signin');
    } else {
      getData();
    }
  }, []);
  return (
    <div className='flex flex-row gap-4'>
      <Opersidebar />
      <div className='h-screen w-full justify-start items-start'>
        <div className='my-20 flex flex-col justify-center items-center'>
          <form className='max-w-[500px] w-full mx-auto'>
            <h2 className='text-4xl text-pink-500 text-center pb-6'>
              Update Asset
            </h2>

            <h2 className='pb-4 text-xl text-center'>
              Asset Reg No: <span>{astRegNo}</span>
            </h2>
            <div className='flex flex-row py-2'>
              <label className='justify-center items-center mr-20 mt-1'>
                Insurance Exp:{' '}
              </label>
              <input
                name='astInsurExp'
                type='date'
                onChange={setData7}
                value={astInsurExp}
                min={new Date().toISOString().split('T')[0]}
                className='border rounded w-[58%] ml-2 hover:border-pink-500 duration-200 p-1'
              />
            </div>
            <div className='flex flex-row py-2'>
              <label className='justify-center items-center mr-28 mt-1'>
                Permit Exp:{' '}
              </label>
              <input
                name='astPermitExp'
                type='date'
                onChange={setData8}
                value={astPermitExp}
                min={new Date().toISOString().split('T')[0]}
                className='border rounded w-[58%] hover:border-pink-500 duration-200 p-1'
              />
            </div>
            <button
              className='border w-full my-2 py-2 mt-4 text-white bg-pink-500 rounded text-lg hover:bg-pink-400 duration-200'
              onClick={handleSub}
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AstMapedit;
