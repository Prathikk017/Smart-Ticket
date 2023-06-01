import React, { useEffect, useState } from 'react';
import useIdleTimeout from '../../useIdleTimeout';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';

const OperProfileView = () => {
  const [data, setData] = useState('');
  const [data1, setData1] = useState('');
  const [showAccount, setShowAccount] = useState(false);
  const ID = window.localStorage.getItem('OperID');
  const history = useNavigate();
  var OperId = JSON.parse(ID);

  const getOperatorData = async () => {
    const res = await axios.get(`https://lekpay.com/operator/${OperId}`);
    if (res.data.status === 201) {
      setData(res.data.data);
    } else {
      console.log('error');
    }
  };

  const getOperatorAccountDetail = async () => {
    const res = await axios.get(
      `https://lekpay.com/operator/getaccount/${OperId}`
    );
    if (res.data.status === 201) {
      setData1(res.data.data);
    } else {
      console.log('error');
    }
  };

  const handleViewAccount = () => {
    setShowAccount(!showAccount); // Set showAccount state to true when "View Account" button is clicked
  };

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
      getOperatorData();
      getOperatorAccountDetail();
    }
  }, []);
  return (
    <div className='grid grid-flow-col gap-2'>
      <div className='container my-8 h-full w-max p-4 mx-10 pr-10 bg-white/50 border rounded-md shadow-md shadow-gray-200/50 max-h-[70vh] overflow-y-auto'>
        <h1 className='text-center text-4xl text-pink-500 py-6'>
          Profile Information
        </h1>
        {data.length > 0
          ? data.map((el, i) => (
              <div className='flex flex-col' key={i + 1}>
                <div className='justify-center ml-[30px]'>
                  <table className='w-full'>
                    <tbody>
                      <tr>
                        <td className='p-1 my-1 text-start'>Operator</td>
                        <td className='p-1 my-1 text-start'>:</td>
                        <td className='p-1 my-1 text-start'>{el.OperName}</td>
                      </tr>
                      <tr>
                        <td className='p-1 my-1 text-start'>
                          Operator ShortName
                        </td>
                        <td className='p-1 my-1 text-start'>:</td>
                        <td className='p-1 my-1 text-start'>
                          {el.OperShortName}
                        </td>
                      </tr>
                      <tr>
                        <td className='p-1 my-1 text-start'>Company Email</td>
                        <td className='p-1 my-1 text-start'>:</td>
                        <td className='p-1 my-1 text-start'>{el.OperEmail}</td>
                      </tr>
                      <tr>
                        <td className='p-1 my-1 text-start'>
                          Operator Phone Number
                        </td>
                        <td className='p-1 my-1 text-start'>:</td>
                        <td className='p-1 my-1 text-start'>{el.OperPhone}</td>
                      </tr>
                      <tr>
                        <td className='p-1 my-1 text-start'>GSTIN</td>
                        <td className='p-1 my-1 text-start'>:</td>
                        <td className='p-1 my-1 text-start'>{el.OperGSTIN}</td>
                      </tr>
                      <tr>
                        <td className='p-1 my-1 text-start'>Contact Name</td>
                        <td className='p-1 my-1 text-start'>:</td>
                        <td className='p-1 my-1 text-start'>
                          {el.OperContactName}
                        </td>
                      </tr>
                      <tr>
                        <td className='p-1 my-1 text-start'>Contact Number</td>
                        <td className='p-1 my-1 text-start'>:</td>
                        <td className='p-1 my-1 text-start'>
                          {el.OperContactMobile}
                        </td>
                      </tr>
                      <tr>
                        <td className='p-1 my-1 text-start'>Contact Email</td>
                        <td className='p-1 my-1 text-start'>:</td>
                        <td className='p-1 my-1 text-start'>
                          {el.OperContactEmail}
                        </td>
                      </tr>
                      <tr>
                        <td className='p-1 my-1 text-start'>City</td>
                        <td className='p-1 my-1 text-start'>:</td>
                        <td className='p-1 my-1 text-start'>{el.OperCity}</td>
                      </tr>
                      <tr>
                        <td className='p-1 my-1 text-start'>Pincode</td>
                        <td className='p-1 my-1 text-start'>:</td>
                        <td className='p-1 my-1 text-start'>
                          {el.OperPincode}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  {data1 && data1.length > 0 ? (
                    <button
                      className='p-2 my-2 bg-gray-200 hover:bg-pink-300 rounded-md'
                      onClick={handleViewAccount}
                    >
                      View Account
                    </button>
                  ) : (
                    <Link to={'/operator/addinfo'}>
                      <button className='p-2 my-2 bg-gray-200 hover:bg-pink-300 rounded-md'>
                        Add Account Detail
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            ))
          : ' '}
      </div>
      {/* Account information */}
      {showAccount && (
        <div className='container my-8 h-full w-[450px] p-10 mx-10 bg-white/50 border rounded-md shadow-md shadow-gray-200/50 max-h-[70vh] overflow-y-auto'>
          <h1 className='text-center text-4xl text-pink-500 py-6'>
            Account Information
          </h1>
          {data1.length > 0
            ? data1.map((el, i) => (
                <div className='flex flex-col' key={i + 1}>
                  <div className='justify-center'>
                    <table className='w-full'>
                      <tbody>
                        <tr>
                          <td className='p-1 my-1 text-start'>Bank Name</td>
                          <td className='p-1 my-1 text-start'>:</td>
                          <td className='p-1 my-1 text-start'>{el.BankName}</td>
                        </tr>
                        <tr>
                          <td className='p-1 my-1 text-start'>Branch</td>
                          <td className='p-1 my-1 text-start'>:</td>
                          <td className='p-1 my-1 text-start'>{el.Branch}</td>
                        </tr>
                        <tr>
                          <td className='p-1 my-1 text-start'>Account No</td>
                          <td className='p-1 my-1 text-start'>:</td>
                          <td className='p-1 my-1 text-start'>
                            {el.AccountNo}
                          </td>
                        </tr>
                        <tr>
                          <td className='p-1 my-1 text-start'>Account Type</td>
                          <td className='p-1 my-1 text-start'>:</td>
                          <td className='p-1 my-1 text-start'>
                            {el.AccountType}
                          </td>
                        </tr>
                        <tr>
                          <td className='p-1 my-1 text-start'>ISFC No</td>
                          <td className='p-1 my-1 text-start'>:</td>
                          <td className='p-1 my-1 text-start'>{el.IsfcNo}</td>
                        </tr>
                        <tr>
                          <td className='p-1 my-1 text-start'>MICR No</td>
                          <td className='p-1 my-1 text-start'>:</td>
                          <td className='p-1 my-1 text-start'>{el.MicrNo}</td>
                        </tr>
                        <tr>
                          <td className='p-1 my-1 text-start'>UPI No</td>
                          <td className='p-1 my-1 text-start'>:</td>
                          <td className='p-1 my-1 text-start'>{el.UpiNo}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              ))
            : ' '}
        </div>
      )}
    </div>
  );
};

export default OperProfileView;
