import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import Opersidebar from './Opersidebar';

let arr = [];
let arr1 = [];
let num;
let nums;
const RouteStageMap = () => {
  // if(num !=null){
  //   arr1.push(num);
  // }
  //states
  const [val, setVal] = useState([]);
  const [routeData, setRouteData] = useState([]);
  const [stageData, setStageData] = useState([]);
  const [route, setRoute] = useState('');
  const [effDate, setEffDate] = useState('');
  const [stage, setStage] = useState([]);
  const [fare, setFare] = useState([]);

  //functions for getting values
  const setData1 = (e) => {
    setRoute(e.target.value);
  };

  const setData2 = (e) => {
    arr.push(e.target.value);
    setStage(arr);
  };

  const setData3 = (e) => {
    num = e.target.value;
    setFare(arr1);
  };

  const setData4 = (e) => {
    nums = e.target.value;
  };

  const setData5 = (e) => {
    setEffDate(e.target.value);
  };

  const ID = window.localStorage.getItem('OperID');
  var operId = JSON.parse(ID);

  const getRoute = async () => {
    const res = await axios.post('http://localhost:8004/operator/readroute', {
      operId,
    });
    if (res.data.status === 201) {
      setRouteData(res.data.data);
      return;
    } else {
      console.log('error');
    }
  };

  const getStage = async () => {
    const res1 = await axios.post('http://localhost:8004/operator/readstage', {
      operId,
    });
    if (res1.data.status === 201) {
      setStageData(res1.data.data);
      return;
    } else {
      console.log('error');
    }
  };

  const addStage = () => {
    arr1.push(num);
    num = '';
    const addstage = [...val, []];
    setVal(addstage);
  };

  const handleDelete = (i) => {
    const deleteVal = [...val];
    deleteVal.splice(i, 1);
    setVal(deleteVal);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (num !== '' && nums !== '') {
      arr1.push(num);
      arr1.push(nums);
    }

    if (!route || !stage || !fare) {
      alert('Fill the details');
      setRoute('');
      setStage('');
      setFare('');
      return;
    } else {
      const res1 = await axios.post(
        'http://localhost:8004/operator/createroutemap',
        {
          route,
          stage,
          fare,
          effDate
        }
      );

      if (res1.data.status === 201) {
        alert('Route Mapped Successfully');
        setRoute('');
        setStage('');
        setFare('');
        var form = document.getElementsByName('contact-form')[0];
        form.reset();
        return;
      } else {
        alert('Route unable to Map');
        setRoute('');
        setStage('');
        setFare('');
        return;
      }
    }
  };

  useEffect(() => {
    getRoute();
    getStage();
  }, [operId]);

  return (
    <div className='flex flex-row gap-4 bg-gray-50'>
      <Opersidebar />
      <div className='h-screen w-full py-4  max-h-[100vh] overflow-y-auto'>
        <div className='py-4 flex flex-col justify-center items-center'>
          <form className='max-w-[400px] w-full mx-auto' name='contact-form'>
            <h2 className='text-4xl text-pink-500 text-center py-1'>
              Route Map
            </h2>
            <div className='flex flex-col py-1'>
              <label>Route Name</label>
              <select
                className='border p-1 rounded w-full hover:border-pink-500 duration-200'
                onChange={setData1}
              >
                <option>Select</option>
                {routeData.map((el, i) => {
                  return (
                    <option key={i} value={`${el.RouteID}`}>
                      {el.RouteName}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className='flex flex-col py-1'>
              <label>Route Effective date</label>
              <input
                type='date'
                onChange={setData5}
                className='border rounded w-full hover:border-pink-500 duration-200 p-1'
              />
            </div>
            <div className='flex flex-col py-1'>
              <label>Route Start Stage</label>
              <select
                className='border p-1 rounded w-full hover:border-pink-500 duration-200'
                onChange={setData2}
              >
                <option>Select</option>
                {stageData.map((el, i) => {
                  return (
                    <option key={i} value={`${el.StageID}`}>
                      {el.StageName}
                    </option>
                  );
                })}
              </select>
              <label className='pt-1'>Fare</label>
              <div className='flex-row'>
                <input
                  type='number'
                  className='w-[25%] px-2 py-1 border rounded hover:border-pink-500 duration-200'
                  min={0}
                  onChange={setData3}
                />
                <label
                  onClick={addStage}
                  className='border w-max  px-2 py-2 ml-10 text-white bg-pink-500 rounded text-sm hover:bg-pink-400 duration-200 justify-between'
                >
                  Add Stage
                </label>
              </div>
            </div>
            {val.map((data, i) => {
              return (
                <div className=' flex-col py-1 ' key={i}>
                  <label>Intermediate Stage</label>
                  <div>
                    <select
                      className='border p-1 rounded w-[70%] hover:border-pink-500 duration-200'
                      onChange={setData2}
                    >
                      <option>Select</option>
                      {stageData.map((el, i) => {
                        return (
                          <option key={i} value={`${el.StageID}`}>
                            {el.StageName}
                          </option>
                        );
                      })}
                    </select>
                    <label
                  onClick={()=>handleDelete(i)}
                  className='border w-max  px-2 py-2 ml-10 text-white bg-pink-500 rounded text-sm hover:bg-pink-400 duration-200 justify-between'
                >
                  x
                </label>
                  </div>
                  <div className='flex flex-col'>
                    <label className='pt-1'>Fare</label>
                    <input
                      type='number'
                      className='w-[25%] px-2 py-1 border rounded hover:border-pink-500 duration-200'
                      min={0}
                      onChange={setData3}
                    />
                  </div>
                </div>
              );
            })}

            <div className='flex flex-col py-1'>
              <label>Route End Stage</label>
              <select
                className='border p-1 rounded w-full hover:border-pink-500 duration-200'
                onChange={setData2}
              >
                <option>Select</option>
                {stageData.map((el, i) => {
                  return (
                    <option key={i} value={`${el.StageID}`}>
                      {el.StageName}
                    </option>
                  );
                })}
              </select>
              <label className='pt-1'>Fare</label>
              <input
                type='number'
                className='w-[20%] px-2 py-1 border rounded hover:border-pink-500 duration-200'
                min={0}
                onChange={setData4}
              />
            </div>
            <button
              type='submit'
              className='border w-full my-2 py-2 text-white bg-pink-500 rounded text-lg hover:bg-pink-400 duration-200'
              onClick={handleSubmit}
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RouteStageMap;
