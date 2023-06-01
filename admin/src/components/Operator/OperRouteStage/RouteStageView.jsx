import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';
import Opersidebar from '../Opersidebar';
import useIdleTimeout from '../../../useIdleTimeout';

const RouteStageView = () => {
  const history = useNavigate();
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const { RouteID } = useParams();
  const getRouteData = async () => {
    const res = await axios.get(`https://lekpay.com/operator/route/${RouteID}`);

    if (res.data.status === 201) {
      setData(res.data.data);
    } else {
      console.log('error');
    }
  };

  const getStageData = async () => {
    const res = await axios.post(
      `https://lekpay.com/operator/getstagerouteid`,
      {
        RouteID,
      }
    );

    if (res.data.status === 201) {
      setData1(res.data.data);
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
      getStageData();
    }
  }, []);
  return (
    <>
      <div className='flex flex-row gap-2'>
        <Opersidebar />
        <div className='container my-8 h-max w-[550px] p-4 mx-auto pr-6 border  max-h-[80vh] overflow-y-auto'>
          <h1 className='text-center text-4xl text-pink-500 py-6'>
            Route Map Detail
          </h1>
          {data.length > 0 && data1 && data1.Stage && data1.Stage.length > 0
            ? data.map((el, i) => (
                <div className='flex flex-col ml-4' key={i + 1}>
                  <div className='justify-center ml-[40px]'>
                    <table className='w-full'>
                      <tbody>
                        <div className='pb-1'>
                          <tr>
                            <td className='p-1 my-1 text-start pr-4'>
                              Route Name
                            </td>
                            <td className='p-1 my-1 text-start pl-24'>:</td>
                            <td className='p-1 my-1 text-start'>
                              {el.RouteName}
                            </td>
                          </tr>
                          <hr />
                        </div>

                        <div className='pb-1'>
                          <tr>
                            <td className='p-1 my-1 text-start pr-1'>
                              Route Effective Date
                            </td>
                            <td className='p-1 my-1 text-start pl-14 '>:</td>
                            <td className='p-1 my-1 text-start pl-0'>
                              {moment(el.RouteEffDate).format('DD-MM-YYYY')}
                            </td>
                          </tr>
                          <hr />
                        </div>

                        <div className='py-1'>
                          <tr>
                            <td className='p-1 my-1 text-start pr-4'>
                              Route Start Stage
                            </td>
                            <td className='p-1 my-1 text-start pl-16'>:</td>
                            <td className='p-1 my-1 text-start'>
                              {data1.Stage[0]}
                            </td>
                          </tr>
                          {data1.fare.map((fare, index) => (
                            <div
                              className='grid grid-flow-col gap-4'
                              key={index}
                            >
                              {index === 0 && (
                                <>
                                  {Object.keys(fare).map((key) => (
                                    <tr key={key}>
                                      <td className='p-1 my-1 text-start'>
                                        {key}
                                      </td>
                                      <td className='p-1 my-1 text-start'>:</td>
                                      <td className='p-1 my-1 text-start'>
                                        {fare[key]}
                                      </td>
                                    </tr>
                                  ))}
                                </>
                              )}
                            </div>
                          ))}
                        </div>
                        <hr />

                        {data1.Stage.slice(1, -1).map((stage, index) => {
                          const fare = data1.fare.slice(1, -1)[index];
                          return (
                            <div className='py-1' key={index}>
                              <tr>
                                <td className='p-1 my-1 text-start'>
                                  Route Intermediate Stage
                                </td>
                                <td className='p-1 my-1 text-start pl-5'>:</td>
                                <td className='p-1 my-1 text-start '>
                                  {stage}
                                </td>
                              </tr>
                              <div
                                className='grid grid-flow-col gap-4'
                                key={index}
                              >
                                {Object.keys(fare).map((key) => (
                                  <tr key={key}>
                                    <td className='p-1 my-1 text-start'>
                                      {key}
                                    </td>
                                    <td className='p-1 my-1 text-start'>:</td>
                                    <td className='p-1 my-1 text-start'>
                                      {fare[key]}
                                    </td>
                                  </tr>
                                ))}
                              </div>
                              <hr />
                            </div>
                          );
                        })}

                        <div className='py-1'>
                          <tr>
                            <td className='p-1 my-1 text-start pr-2'>
                              Route End Stage
                            </td>
                            <td className='p-1 my-1 text-start pl-20'>:</td>
                            <td className='p-1 my-1 text-start'>
                              {data1.Stage[data1.Stage.length - 1]}
                            </td>
                          </tr>

                          {data1.fare.map((fare, index) => (
                            <div
                              className='grid grid-flow-col gap-4'
                              key={index === data1.fare.length - 1}
                            >
                              {index === data1.fare.length - 1 && (
                                <>
                                  {Object.keys(fare).map((key) => (
                                    <tr key={key}>
                                      <td className='p-1 my-1 text-start'>
                                        {key}
                                      </td>
                                      <td className='p-1 my-1 text-start'>:</td>
                                      <td className='p-1 my-1 text-start'>
                                        {fare[key]}
                                      </td>
                                    </tr>
                                  ))}
                                </>
                              )}
                            </div>
                          ))}
                          <hr />
                        </div>
                        <div className='py-1'>
                          <tr>
                            <td className='p-1 my-1 text-start pr-4'>
                              Created Date
                            </td>
                            <td className='p-1 my-1 text-start pl-24'>:</td>
                            <td className='p-1 my-1 text-start'>
                              {moment(el.CreatedDate).format('DD-MM-YYYY')}
                            </td>
                          </tr>
                          <hr />
                        </div>
                      </tbody>
                    </table>
                  </div>
                  <div className='flex flex-row justify-evenly items-center mt-8'>
                    <Link to={'/rutmapview'}>
                      <button className='bg-gray-200 hover:bg-pink-300  px-4 py-1 rounded-lg w-max'>
                        Cancel
                      </button>
                    </Link>
                    {/* <Link to={`/rutupdate/${el.RouteID}`}>
													<button className='bg-gray-200 hover:bg-pink-300  px-4 py-1 rounded-lg w-max'>
														Edit
													</button>
												</Link>
												<button
													className='bg-gray-200 hover:bg-pink-300  px-4 py-1 rounded-lg w-max'
													onClick={handleSub}
												>
													Delete
												</button> */}
                  </div>
                </div>
              ))
            : ' '}
        </div>
      </div>
    </>
  );
};

export default RouteStageView;
