import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Opersidebar from './Opersidebar';

const Stgedit = () => {
  const [StageName, setStageName] = useState('');
  const [stgstatus, setStgstatus] = useState('');
  const history = useNavigate();

  const { StageID } = useParams();

  // function
  const setData1 = (e) => {
    setStageName(e.target.value);
  };
  
  const setData2 = (e) =>{
    setStgstatus(e.target.value);
  }

  const getData = async () => {
    const res1 = await axios.get(
      `http://localhost:8004/operator/stgread/${StageID}`
    );

    if (res1.data.status === 201) {
      setStageName(res1.data.data[0].StageName);
      setStgstatus(res1.data.data[0].StageStatus);
      return;
    } else {
      console.log('error');
    }
  };

  const handleSub = async (e) => {
    e.preventDefault();

    if (
      !StageName ||
      !stgstatus
    ) {
      alert('Fill the details');
      return;
    } else {
      const res = await axios.patch(
        `http://localhost:8004/operator/stage/update/${StageID}`,
        {
          StageName,
          stgstatus
        }
      );
      if (res.data.status === 201) {
        alert('Stage successfully update');
        history('/stgview');
        return;
      } else {
        alert('Stage unable to update');
        return;
      }
    }
  };

  useEffect(() => {
    const token = window.localStorage.getItem('Lekpay');
    const Token = JSON.parse(token);
    if (!Token) {
      history('/');
    }else{
      getData();
    }
  }, []);
  return (
    <div className='flex flex-row gap-4'>
      <Opersidebar />
      <div className='grid h-screen w-[90%] '>
        <div className=' flex flex-col items-center mt-[10%]'>
          <form className='max-w-[400px] w-full  text-sm flex-row'>
            <h2 className='text-3xl text-pink-500 text-center py-2'>
              Update Stage
            </h2>
            <div className='flex flex-col py-1'>
              <label>Employee Name</label>
              <input
                type='text'
                name='StageName'
                value={StageName}
                className='border p-1 rounded w-full hover:border-pink-500 duration-200'
                onChange={setData1}
              />
            </div>
            <div className='flex flex-col py-1'>
              <label>Status</label>
              <select
                className='border p-1 rounded w-full hover:border-pink-500 duration-200'
                name='stgstatus'
                value={stgstatus}
                onChange={setData2}
              >
                <option value='A'>A</option>
                <option value='I'>I</option>
              </select>
            </div>
            <button
              className='border  w-full my-2 py-2 text-white bg-pink-500 rounded text-lg hover:bg-pink-400 duration-200'
              onClick={handleSub}
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Stgedit;
