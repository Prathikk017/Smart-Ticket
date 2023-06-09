import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';
import Opersidebar from '../Opersidebar';
import useIdleTimeout from '../../../useIdleTimeout';

const Rutview = () => {
  const history = useNavigate();
  const [data, setData] = useState([]);
  const { RouteID } = useParams();
  const getRouteData = async () => {
    const res = await axios.get(`https://lekpay.com/operator/route/${RouteID}`);

    if (res.data.status === 201) {
      setData(res.data.data);
    } else {
      console.log('error');
    }
  };

  const handleSub = async () => {
    const res = await axios.patch(
      `https://lekpay.com/operator/route/delete/${RouteID}`
    );
    if (res.data.status === 201) {
      alert(res.data.data);
      history('/rutview');
      return;
    } else {
      console.log('error');
    }
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
      getRouteData();
    }
  }, []);
  return (
    <>
      <div className='flex flex-row gap-4'>
        <Opersidebar />
        <div className='container  my-8 h-full w-[450px] p-4 mx-auto pr-6 border'>
          <h1 className='text-center text-4xl text-pink-500  py-6'>
            Route Detail
          </h1>
          {data.length > 0
            ? data.map((el, i) => {
                return (
                  <>
                    <div className='flex flex-col ml-4' key={i + 1}>
                      <div className='justify-center ml-[40px]'>
                        <table className='w-full'>
                          <tbody>
                            <tr>
                              <td className='p-1 my-1 text-start'>
                                Route Name
                              </td>
                              <td className='p-1 my-1 text-start'>:</td>
                              <td className='p-1 my-1 text-start'>
                                {el.RouteName}
                              </td>
                            </tr>
                            <tr>
                              <td className='p-1 my-1 text-start'>
                                Route Effective Date
                              </td>
                              <td className='p-1 my-1 text-start'>:</td>
                              <td className='p-1 my-1 text-start'>
                                {moment(el.RouteEffDate).format('DD-MM-YYYY')}
                              </td>
                            </tr>
                            <tr>
                              <td className='p-1 my-1 text-start'>
                                Route Start Stage
                              </td>
                              <td className='p-1 my-1 text-start'>:</td>
                              <td className='p-1 my-1 text-start'>
                                {el.RouteSStage}
                              </td>
                            </tr>
                            <tr>
                              <td className='p-1 my-1 text-start'>
                                Route End Stage
                              </td>
                              <td className='p-1 my-1 text-start'>:</td>
                              <td className='p-1 my-1 text-start'>
                                {el.RouteEStage}
                              </td>
                            </tr>
                            <tr>
                              <td className='p-1 my-1 text-start'>
                                Created Date
                              </td>
                              <td className='p-1 my-1 text-start'>:</td>
                              <td className='p-1 my-1 text-start'>
                                {moment(el.CreatedDate).format('DD-MM-YYYY')}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className='flex flex-row justify-evenly items-center mt-8'>
                        <Link to={'/rutview'}>
                          <button className='bg-gray-200 hover:bg-pink-300  px-4 py-1 rounded-lg w-max'>
                            Cancel
                          </button>
                        </Link>
                        <Link to={`/rutupdate/${el.RouteID}`}>
                          <button className='bg-gray-200 hover:bg-pink-300  px-4 py-1 rounded-lg w-max'>
                            Edit
                          </button>
                        </Link>
                        <button
                          className='bg-gray-200 hover:bg-pink-300  px-4 py-1 rounded-lg w-max'
                          onClick={handleSub}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </>
                );
              })
            : ' '}
        </div>
      </div>
    </>
  );
};

export default Rutview;
