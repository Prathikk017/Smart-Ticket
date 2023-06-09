import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MdOutlineDirectionsBusFilled } from 'react-icons/md';
import { BiRupee } from 'react-icons/bi';
import useIdleTimeout from '../../../../useIdleTimeout';
import { useNavigate } from 'react-router-dom';
import Opersidebar from '../../Opersidebar';
import OperHeader from '../OperHeader';

const IndividualTransAssetData = () => {
  const [data, setData] = useState([]);
  const history = useNavigate();
  const ID = window.localStorage.getItem('OperID');
  var operId = JSON.parse(ID);

  const getTransactionAssetData = async () => {
    const res = await axios.post(
      'https://lekpay.com/operator/readtransactionasset',
      {
        operId,
      }
    );
    if (res.data.status === 201) {
      setData(res.data.data);
    } else {
      console.log('error');
    }
  };

  const handleClick = (totalAsset) => {
    let AstId = totalAsset;
    history(`/transactionassetroute/${AstId}`);
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
      getTransactionAssetData();
    }
  }, []);

  return (
    <div className='flex gap-4 bg-gray-50'>
      <Opersidebar />
      <div className='flex flex-col flex-1'>
        <OperHeader />
        <div className='flex flex-col gap-4'>
          <div className='grid md:grid-cols-3 gap-4 w-[98%] lg:grid-cols-4 gap-4 w-[98%] mt-4 ml-0 '>
            {data.Asset &&
            data.Fare &&
            data.Asset.length > 0 &&
            data.Fare.length > 0
              ? data.Asset.map((asset, i) => {
                  return (
                    <React.Fragment key={i}>
                      <BoxWrapper>
                        <div className='rounded-full h-12 w-12 flex items-center justify-center bg-pink-400 cursor-pointer'>
                          <MdOutlineDirectionsBusFilled
                            className='text-2xl text-black'
                            style={{ color: 'white' }}
                          />
                        </div>
                        <div
                          className='pl-4 cursor-pointer flex flex-col'
                          onClick={() => handleClick(data.totalAsset[i])}
                        >
                          <label className='text-sm text-gray-500 font-medium my-1'>
                            Asset Registration Number
                          </label>
                          <span className='text-md text-gray-700 font-medium text-center my-1'>
                            {asset}
                          </span>
                          <div className='flex items-center my-0 mb-1'>
                            <label className='text-sm text-gray-500 font-medium mr-2 text-center items-center justify-center'>
                              Total Revenue:
                            </label>
                            <strong className='text-md text-gray-700 font-semibold items-center justify-center flex'>
                              <span>
                                <BiRupee />
                              </span>
                              {data.Fare[i]}
                            </strong>
                          </div>
                        </div>
                      </BoxWrapper>
                    </React.Fragment>
                  );
                })
              : ' '}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualTransAssetData;

function BoxWrapper({ children }) {
  return (
    <div className='bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center shadow-md shadow-gray-300/40'>
      {children}
    </div>
  );
}
