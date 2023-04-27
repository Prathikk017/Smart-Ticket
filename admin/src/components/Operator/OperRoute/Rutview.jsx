import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';
import Opersidebar from '../Opersidebar';

const Rutview = () => {
  const history = useNavigate();
  const [data, setData] = useState([]);
  const { RouteID } = useParams();
  const getRouteData = async () => {
    const res = await axios.get(`http://localhost:8004/operator/route/${RouteID}`);

    if (res.data.status === 201) {
      setData(res.data.data);
    } else {
      console.log('error');
    }
  };

  const handleSub = async () => {
    const res = await axios.patch(
      `http://localhost:8004/operator/route/delete/${RouteID}`
    );
    if (res.data.status === 201) {
      alert(res.data.data);
      history('/rutview');
      return;
    } else {
      console.log('error');
    }
  };

  useEffect(() => {
    const token = window.localStorage.getItem('Lekpay');
    const Token = JSON.parse(token);
    if (!Token) {
      history('/');
    } else {
      getRouteData();
    }
  }, []);
  return (
    <>
      <div className='flex flex-row gap-4'>
        <Opersidebar />
        <div className='container  my-8 h-full w-[40%] p-4 mx-auto pr-6 border'>
          <h1 className='text-center text-4xl text-pink-500  py-6'>
            Route Detail
          </h1>
          {data.length > 0
            ? data.map((el, i) => {
                return (
                  <>
                    <div className='flex flex-col ml-4' key={i + 1}>
                      <label className='p-1 my-1 text-start'>
                        Route Name:{' '}
                        <span className='ml-2'>{el.RouteName}</span>
                      </label>
                      <label className='p-1 my-1 text-start'>
                        Route Effective Date: <span className='ml-2'>{moment(el.RouteEffDate).format('DD-MM-YYYY')}</span>
                      </label>
                      <label className='p-1 my-1 text-start'>
                        Route Start Stage:{' '}
                        <span className='ml-2'>
                          {el.RouteSStage}
                        </span>
                      </label>
                      <label className='p-1 my-1 text-start'>
                        Route End Stage:{' '}
                        <span className='ml-2'>{el.RouteEStage}</span>
                      </label>
                      <label className='p-1 my-1 text-start'>
                       Created Date:<span className='ml-2'>{moment(el.CreatedDate).format('DD-MM-YYYY')}</span>
                      </label>
                      <label className='p-1 my-1 text-start'>
                        Status:<span className='ml-2'>{el.RouteStatus}</span>
                      </label>
                      <div className='flex flex-row justify-evenly items-center m-4'>
                        <Link to={'/rutview'}>
                          <button className='hover:bg-pink-300  px-4 py-2 rounded-lg w-max'>
                            Cancel
                          </button>
                        </Link>
                        <Link to={`/rutupdate/${el.RouteID}`}>
                          <button className='hover:bg-pink-300  px-4 py-2 rounded-lg w-max'>
                            Edit
                          </button>
                        </Link>
                        <button
                          className='hover:bg-pink-300  px-4 py-2 rounded-lg w-max'
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
