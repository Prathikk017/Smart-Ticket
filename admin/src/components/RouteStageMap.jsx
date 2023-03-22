import React from 'react';
import Opersidebar from './Opersidebar';

const RouteStageMap = () => {
  const setData1 = () => {};

  const setData2 = () => {};

  const addStage = () => {
    document.getElementById('add').style.display = 'block';
  };

  const handleSubmit = async () => {};
  return (
    <div className='flex flex-row gap-4 bg-gray-50'>
      <Opersidebar />
      <div className='h-screen w-full py-4'>
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
                <option value='Conductor'>Conductor</option>
                <option value='Checker'>Checker</option>
                <option value='Depo Manager'>Depo Manager</option>
              </select>
            </div>
            <div className='flex flex-col py-1'>
              <label>Route Start Stage</label>
              <select
                className='border p-1 rounded w-full hover:border-pink-500 duration-200'
                onChange={setData1}
              >
                <option>Select</option>
                <option value='Conductor'>Conductor</option>
                <option value='Checker'>Checker</option>
                <option value='Depo Manager'>Depo Manager</option>
              </select>
              <label className='pt-1'>Fare</label>
              <div className='flex-row'>
                <input
                  type='number'
                  className='w-[25%] px-2 py-1 border rounded hover:border-pink-500 duration-200'
                  min={0}
                />
                <label
                  onClick={addStage}
                  className='border w-max  px-2 py-2 ml-10 text-white bg-pink-500 rounded text-sm hover:bg-pink-400 duration-200 justify-between'
                >
                  Add Stage
                </label>
              </div>
            </div>
            <div className=' flex-col py-1 hidden' id='add'>
              <label>Intermediate Stage</label>
              <select
                className='border p-1 rounded w-full hover:border-pink-500 duration-200'
                onChange={setData1}
              >
                <option>Select</option>
                <option value='Conductor'>Conductor</option>
                <option value='Checker'>Checker</option>
                <option value='Depo Manager'>Depo Manager</option>
              </select>
              <div className='flex flex-col'>
              <label className='pt-1'>Fare</label>
              <input
                type='number'
                className='w-[25%] px-2 py-1 border rounded hover:border-pink-500 duration-200'
                min={0}
              />
              </div>
            </div>
            <div className='flex flex-col py-1'>
              <label>Route End Stage</label>
              <select
                className='border p-1 rounded w-full hover:border-pink-500 duration-200'
                onChange={setData2}
              >
                <option>Select</option>
                <option value='Conductor'>Conductor</option>
                <option value='Checker'>Checker</option>
                <option value='Depo Manager'>Depo Manager</option>
              </select>
              <label className='pt-1'>Fare</label>
              <input
                type='number'
                className='w-[20%] px-2 py-1 border rounded hover:border-pink-500 duration-200'
                min={0}
              />
            </div>
            <button
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
