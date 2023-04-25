import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdOutlineDirectionsBusFilled } from 'react-icons/md';
import { BiRupee } from 'react-icons/bi';
import { IoPeople, IoPieChart } from 'react-icons/io5';
import { BsFillXDiamondFill } from 'react-icons/bs';
import axios from 'axios';
const StatsGrid = () => {
  const history = useNavigate();
  // total asset data
  const [data, setData] = useState('');
  //total employee data
  const [data1, setData1] = useState('');
  //total stage data
  const [data2, setData2] = useState('');
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

  const handleClick = () => {
    history('/astview');
  };
  const handleClick1 = () => {
    history('/empview');
  };
  const handleClick2 = () => {
    history('/stgview');
  };
  useEffect(() => {
    const token = window.localStorage.getItem('Lekpay');
    const Token = JSON.parse(token);
    if (!Token) {
      history('/');
    }else{
        getAstData();
        getEmpData();
        getStgData();
      }
  }, []);
  return (
    <div className='grid md:grid-cols-5 gap-4 md:w-[98%] w-[20rem] mt-4 ml-0 '>
      <BoxWrapper>
        <div
          className='rounded-full h-12 w-12 flex items-center justify-center bg-sky-400 cursor-pointer'
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
          className='rounded-full h-12 w-12 flex items-center justify-center bg-yellow-400 cursor-pointer'
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
        <div className='rounded-full h-12 w-12 flex items-center justify-center bg-orange-600 cursor-pointer'>
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
              10000
            </strong>
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className='rounded-full h-12 w-12 flex items-center justify-center bg-green-600 cursor-pointer'>
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
            <strong className='text-xl text-gray-700 font-semibold'>2</strong>
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div
          className='rounded-full h-12 w-12 flex items-center justify-center bg-teal-600 cursor-pointer'
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
    </div>
  );
};

export default StatsGrid;

function BoxWrapper({ children }) {
  return (
    <div className='bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center shadow-md shadow-gray-200'>
      {children}
    </div>
  );
}
