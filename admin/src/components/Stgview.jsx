import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';
import Opersidebar from './Opersidebar';

const Stgview = () => {
    const history = useNavigate();
    const [data, setData] = useState([]);
    const { StageID } = useParams();
    const getAssetData = async () => {
      const res = await axios.get(`http://localhost:8004/operator/stage/${StageID}`);
  
      if (res.data.status === 201) {
        setData(res.data.data);
      } else {
        console.log('error');
      }
    };
  
    const handleSub = async () => {
      const res = await axios.patch(
        `http://localhost:8004/operator/stage/delete/${StageID}`
      );
      if (res.data.status === 201) {
        alert(res.data.data);
        history('/stgview');
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