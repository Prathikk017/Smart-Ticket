import React, { useEffect, useState } from 'react';
import Opersidebar from './Opersidebar';
import OperHeader from './OperLayout/OperHeader';
import { Link, useNavigate } from 'react-router-dom';
import useIdleTimeout from '../../useIdleTimeout';
import axios from 'axios';

const OperAddInfo = () => {
  const [bankName, setBankName] = useState('');
  const [branch, setBranch] = useState('');
  const [accountNo, setAccountNo] = useState('');
  const [accountType, setAccountType] = useState('');
  const [isfcNo, setIsfcNo] = useState('');
  const [micrNo, setMicrNo] = useState('');
  const [upiNo, setUpiNo] = useState('');
  const history = useNavigate();
  const ID = window.localStorage.getItem('OperID');
  var OperId = JSON.parse(ID);
  //function
  const setData = (e) => {
    setBankName(e.target.value);
  };

  const setData1 = (e) => {
    setBranch(e.target.value);
  };
  const setData2 = (e) => {
    setAccountNo(e.target.value);
  };
  const setData3 = (e) => {
    setAccountType(e.target.value);
  };
  const setData4 = (e) => {
    setIsfcNo(e.target.value);
  };
  const setData5 = (e) => {
    setMicrNo(e.target.value);
  };
  const setData6 = (e) => {
    setUpiNo(e.target.value);
  };
   
  //function to submit form
  const handleSubmit = async(e) =>{
    e.preventDefault();
    if(
      !bankName ||
      !branch ||
      !accountNo ||
      !accountType ||
      !isfcNo ||
      !micrNo ||
      !upiNo
    ){
      alert("Fill the details");
    }else{
      const res = await axios.post("https://lekpay.com/operator/addaccount",{
        OperId,
        bankName,
        branch,
        accountNo,
        accountType,
        isfcNo,
        micrNo,
        upiNo
      });
  
      if(res.data.status === 201){
        alert('Account details added successfully.');
        // let form = document.getElementsByName('contact-form');
        // form.reset();
        history('/operator/profileview')
      }else{
        console.log("error")
      }
    }
  } 

  // Call useIdleTimeout and pass in the time to consider the user as idle
  const isIdle = useIdleTimeout(600000); // set to 10 minute

  //  const verify = async() => {
  //    const token = window.localStorage.getItem('Lekpay');
  //    const Token = JSON.parse(token);
  //    const authorization = `Bearer ${Token}`;
  //    const res = await axios.post('https://lekpay.com/admin/verify',{
  //      authorization
  //    });
  //    if(res.data.status === 201){
  //      console.log(res.data.data);
  //    }else{
  //      if(res.data.data === 'Token is not valid'){
  //        window.localStorage.removeItem('Lekpay');
  //        history('/');
  //      }
  //    }
  //  }

  //  useEffect(() => {
  //    verify();
  //    // Run verify() every 10 minute if the user is not idle
  //    const intervalId = setInterval(() => {
  //      if (!isIdle) {
  //        verify();
  //      }
  //    }, 600000);

  //    // Clear the interval when the component unmounts
  //    return () => clearInterval(intervalId);
  //  }, [!isIdle]);

  useEffect(() => {
    // Redirect to sign-in page if the user is idle
    if (isIdle) {
      window.localStorage.removeItem('Lekpay');
      history('/signin');
    }
  }, [isIdle, history]);

  useEffect(() => {
    const token = window.localStorage.getItem('Lekpay');
    const Token = JSON.parse(token);
    if (!Token) {
      history('/signin');
    }
  }, []);
  return (
    <div className='flex gap-4 bg-gray-50'>
      <Opersidebar />
      <div className='flex flex-col flex-1'>
        <OperHeader />
        <div className='flex flex-col gap-4'>
          <div className='container  my-8 h-full w-max p-10 mx-auto  bg-white/50  border rounded-md shadow-md shadow-gray-200/50'>
          <form className='max-w-[500px] w-full mx-auto' name='contact-form'>
            <h2 className='text-5xl text-pink-500 text-center py-1 mb-8'>
              Account Details
            </h2>
            <div className='flex flex-row py-1'>
              <label className='justify-center items-center mr-8 mt-1'>
                Bank Name:{' '}
              </label>
              <input
                type='text'
                onChange={setData}
                value={bankName}
                className='border rounded w-[60%]  ml-3 hover:border-pink-500 duration-200 p-1'
              />
            </div>
            <div className='flex flex-row py-1'>
              <label className='justify-center items-center mr-16 mt-1'>
                Branch:{' '}
              </label>
              <input
                type='text'
                onChange={setData1}
                value={branch}
                className='border rounded w-[60%] ml-3 hover:border-pink-500 duration-200 p-1'
              />
            </div>
            <div className='flex flex-row py-1'>
              <label className='justify-center items-center mr-10 mt-1'>
                Account No:{' '}
              </label>
              <input
                type='number'
                onChange={setData2}
                value={accountNo}
                className='border rounded w-[60%] hover:border-pink-500 duration-200 p-1'
              />
            </div>
            <div className='flex flex-row py-1'>
              <label className='justify-center items-center mr-7 mt-1'>
                Account Type:{' '}
              </label>
              <select
                className='border p-1 rounded w-[60%] hover:border-pink-500 duration-200'
                onChange={setData3}
                value={accountType}
              >
                <option>Select</option>
                <option value='Current'>Current</option>
                <option value='Savings'>Savings</option>
              </select>
              
            </div>
            <div className='flex flex-row py-1'>
              <label className='justify-center items-center mr-14 mt-1'>
                IFSC No:{' '}
              </label>
              <input
                type='text'
                onChange={setData4}
                value={isfcNo}
                className='border rounded w-[60%] ml-3 hover:border-pink-500 duration-200 p-1'
              />
            </div>
            <div className='flex flex-row py-1'>
              <label className='justify-center items-center mr-12 mt-1'>
                MICR No:{' '}
              </label>
              <input
                type='number'
                onChange={setData5}
                value={micrNo}
                className='border rounded w-[60%] ml-3 hover:border-pink-500 duration-200 p-1'
              />
            </div>
            <div className='flex flex-row py-1'>
              <label className='justify-center items-center mr-14  mt-1'>
                UPI ID:{' '}
              </label>
              <input
                type='text'
                onChange={setData6}
                value={upiNo}
                className='border rounded w-[60%] ml-6 hover:border-pink-500 duration-200 p-1'
              />
            </div>
           
            <button
              className='border w-full my-2 py-2 text-white bg-pink-500 rounded text-lg hover:bg-pink-400 duration-200'
              onClick={handleSubmit}
            >
              Submit
            </button>
          </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OperAddInfo;
