import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdOutlineDirectionsBusFilled } from 'react-icons/md';
import { BiRupee } from 'react-icons/bi';
import { IoPeople, IoPieChart } from 'react-icons/io5';
import { BsFillXDiamondFill } from 'react-icons/bs';
import { TbRoute } from 'react-icons/tb';
import axios from 'axios';

const OperStatsGrid = () => {
  const history = useNavigate();
  // total asset data
  const [data, setData] = useState('');
  //total employee data
  const [data1, setData1] = useState('');
  //total stage data
  const [data2, setData2] = useState('');
  //total route data
  const [data3, setData3] = useState('');
  //total asset active data
  const[data4, setData4] = useState('');
  //total transaction data
  const [data5, setData5] = useState('');
  //total Passengers data
  const [data6, setData6] = useState('');

  const ID = window.localStorage.getItem('OperID');
  var operId = JSON.parse(ID);

  const getAstData = async () => {
    const res = await axios.post('http://localhost:8004/operator/readast', {
      operId,
    });
    if (res.data.status === 201) {
      setData(res.data.data);
    } else {
      console.log('error');
    }
  };
  const getAstActiveData = async () => {
    const res = await axios.post('http://localhost:8004/operator/readastactive', {
      operId,
    });
    if (res.data.status === 201) {
      setData4(res.data.data);
    } else {
      console.log('error');
    }
  };

  const getEmpData = async () => {
    const res = await axios.post('http://localhost:8004/employee/reademp', {
      operId,
    });
    if (res.data.status === 201) {
      setData1(res.data.data);
    } else {
      console.log('error');
    }
  };

  const getStgData = async () => {
    const res = await axios.post('http://localhost:8004/operator/readstg', {
      operId,
    });
    if (res.data.status === 201) {
      setData2(res.data.data);
    } else {
      console.log('error');
    }
  };

  const getRutData = async () => {
    const res = await axios.post('http://localhost:8004/operator/readrut', {
      operId,
    });
    if (res.data.status === 201) {
      setData3(res.data.data);
    } else {
      console.log('error');
    }
  };

  const getTransactionsData = async () =>{
      const res = await axios.post('http://localhost:8004/operator/readtransaction', {
        operId,
      });
     if(res.data.status === 201){
      setData5(res.data.data);
      setData6(res.data.Passengers);
     }else{
      console.log('error')
     }
  }
  //Navigate to particular table
  const handleClick = () => {
    history('/astview');
  };
  const handleClick1 = () => {
    history('/empview');
  };
  const handleClick2 = () => {
    history('/stgview');
  };
  const handleClick3 = () => {
    history('/rutview');
  };

  useEffect(() => {
    getTransactionsData();
    getAstActiveData();
  })

  useEffect(() => {
    const token = window.localStorage.getItem('Lekpay');
    const Token = JSON.parse(token);
    if (!Token) {
      history('/');
    }else{
        getAstData();
        getEmpData();
        getStgData();
        getRutData();
      }
  }, []);
  return (
    <div className='grid lg:grid-cols-4 md:grid-cols-3 gap-6 md:w-[98%] w-[20rem] mt-4 ml-0 '>
      <BoxWrapper>
        <div
          className='rounded-full h-10 w-10 flex items-center justify-center bg-sky-400 cursor-pointer'
          onClick={handleClick}
        >
          <MdOutlineDirectionsBusFilled
            className='text-2xl text-white '
            style={{ color: 'white' }}
          />
        </div>
        <div className='pl-4 cursor-pointer' onClick={handleClick}>
          <span className='text-sm text-gray-500 font-medium'>
            Total Assets
          </span>
          <div className='flex items-center'>
            <strong className='text-xl text-gray-700 font-semibold'>{data.length}</strong>
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div
          className='rounded-full h-10 w-10 flex items-center justify-center bg-yellow-400 cursor-pointer'
          onClick={handleClick1}
        >
          <IoPeople
            className='text-2xl text-black'
            style={{ color: 'white' }}
          />
        </div>
        <div className='pl-4 cursor-pointer' onClick={handleClick1}>
          <span className='text-sm text-gray-500 font-medium'>
            Total Employee
          </span>
          <div className='flex items-center'>
            <strong className='text-xl text-gray-700 font-semibold'>{data1.length}</strong>
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className='rounded-full h-10 w-10 flex items-center justify-center bg-orange-600 cursor-pointer'>
          <IoPieChart
            className='text-2xl text-black'
            style={{ color: 'white' }}
          />
        </div>
        <div className='pl-4 cursor-pointer'>
          <span className='text-sm text-gray-500 font-medium'>
            Total Transactions
          </span>
          <div className='flex items-center'>
            <span>
              <BiRupee size={19} className='mt-1' />
            </span>
            <strong className='text-xl text-gray-700 font-semibold'>
              {data5}
            </strong>
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className='rounded-full h-10 w-10 flex items-center justify-center bg-green-600 cursor-pointer'>
          <MdOutlineDirectionsBusFilled
            className='text-2xl text-black'
            style={{ color: 'white' }}
          />
        </div>
        <div className='pl-4 cursor-pointer'>
          <span className='text-sm text-gray-500 font-medium'>
            Active Asset
          </span>
          <div className='flex items-center'>
            <strong className='text-xl text-gray-700 font-semibold'>{data4.length}</strong>
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div
          className='rounded-full h-10 w-10 flex items-center justify-center bg-teal-500 cursor-pointer'
          onClick={handleClick2}
        >
          <BsFillXDiamondFill
            className='text-2xl text-white '
            style={{ color: 'white' }}
          />
        </div>
        <div className='pl-4 cursor-pointer' onClick={handleClick2}>
          <span className='text-sm text-gray-500 font-medium'>
            Total Stages
          </span>
          <div className='flex items-center'>
            <strong className='text-xl text-gray-700 font-semibold'>{data2.length}</strong>
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div
          className='rounded-full h-10 w-10 flex items-center justify-center bg-blue-600 cursor-pointer'
          onClick={handleClick3}
        >
          <TbRoute
            className='text-2xl text-white '
            style={{ color: 'white' }}
          />
        </div>
        <div className='pl-4 cursor-pointer' onClick={handleClick3}>
          <span className='text-sm text-gray-500 font-medium'>
            Total Routes
          </span>
          <div className='flex items-center'>
            <strong className='text-xl text-gray-700 font-semibold'>{data3.length}</strong>
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className='rounded-full h-10 w-10 flex items-center justify-center bg-indigo-400 cursor-pointer'>
          <IoPeople
            className='text-2xl text-black'
            style={{ color: 'white' }}
          />
        </div>
        <div className='pl-4 cursor-pointer'>
          <span className='text-sm text-gray-500 font-medium'>
            Total Passengers
          </span>
          <div className='flex items-center'>
            
            <strong className='text-xl text-gray-700 font-semibold'>
              {data6}
            </strong>
          </div>
        </div>
      </BoxWrapper>
    </div>
  );
};

export default OperStatsGrid;

function BoxWrapper({ children }) {
  return (
    <div className='bg-white rounded-sm py-3 px-2 flex-1 border border-gray-200 flex items-center shadow-md shadow-gray-200'>
      {children}
    </div>
  );
}
