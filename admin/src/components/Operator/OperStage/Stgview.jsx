import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';
import Opersidebar from '../Opersidebar';
import useIdleTimeout from '../../../useIdleTimeout';

const Stgview = () => {
    const history = useNavigate();
    const [data, setData] = useState([]);
    const { StageID } = useParams();
    const getAssetData = async () => {
      const res = await axios.get(`https://amsweets.in/operator/stage/${StageID}`);
  
      if (res.data.status === 201) {
        setData(res.data.data);
      } else {
        console.log('error');
      }
    };
  
    const handleSub = async () => {
      const res = await axios.patch(
        `https://amsweets.in/operator/stage/delete/${StageID}`
      );
      if (res.data.status === 201) {
        alert(res.data.data);
        history('/stgview');
        return;
      } else {
        console.log('error');
      }
    };
  
     // Call useIdleTimeout and pass in the time to consider the user as idle
     const isIdle = useIdleTimeout(300000); // set to 5 minute

  // const verify = async() => {
  //   const token = window.localStorage.getItem('Lekpay');
  //   const Token = JSON.parse(token);
  //   const authorization = `Bearer ${Token}`;
  //   const res = await axios.post('https://amsweets.in/admin/verify',{
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
    // Redirect to sign-in page if the user is idle
    if (isIdle) {
      window.localStorage.removeItem('Lekpay');
      history('/');
    }
  }, [isIdle, history]);

    useEffect(() => {
      const token = window.localStorage.getItem('Lekpay');
    const Token = JSON.parse(token);
    if (!Token) {
      history('/');
    }else{
      getAssetData();
    } 
    }, []);
  return (
    <>
      <div className='flex flex-row gap-4'>
        <Opersidebar />
        <div className='container  my-8 h-full w-[40%] p-4 mx-auto pr-6 border'>
          <h1 className='text-center text-4xl text-pink-500  py-6'>
            Stage Detail
          </h1>
          {data.length > 0
            ? data.map((el, i) => {
                return (
                  <>
                    <div className='flex flex-col ml-4' key={i+1}>
                      <label className='p-1 my-1 text-start'>
                        Stage Name: <span className='ml-2'>{el.StageName}</span>
                      </label>
                      <label className='p-1 my-1 text-start'>
                        Status: <span className='ml-2'>{el.StageStatus}</span>
                      </label>
                      <label className='p-1 my-1 text-start'>
                        Created Date: <span className='ml-2'>{moment(el.CreatedDate).format('DD-MM-YYYY')}</span>
                      </label>
                      
                      <div className='flex flex-row justify-evenly m-4'>
                        <Link to={'/astview'}>
                          <button className='hover:bg-pink-300  px-4 py-2 rounded-lg w-max'>
                            Cancel
                          </button>
                        </Link>
                        <Link to={`/stgupdate/${el.StageID}`}>
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
  )
}

export default Stgview;