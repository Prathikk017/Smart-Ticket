import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Opersidebar from './Opersidebar';

const Astregister = () => {
  const [astRegNo, setAstRegNo] = useState('');
  const [astName, setAstName] = useState('');
  const [astModel, setAstModel] = useState('');
  const [astChasNo, setAstChasNo] = useState('');
  const [astEngNo, setAstEngNo] = useState('');
  const [astPermitNo, setAstPermitNo] = useState('');
  const [astInsurExp, setAstInsurExp] = useState('');
  const [astPermitExp, setAstPermitExp] = useState('');
  const [qrcode, setQrcode] = useState('');
  // const history = useNavigate();

  const ID = window.localStorage.getItem('OperID');
  var operId = JSON.parse(ID);

  const setData = (e) => {
    setAstRegNo(e.target.value);
  };

  const setData1 = (e) => {
    setAstName(e.target.value);
  };
  const setData2 = (e) => {
    setAstModel(e.target.value);
  };
  const setData3 = (e) => {
    setAstChasNo(e.target.value);
  };
  const setData4 = (e) => {
    setAstEngNo(e.target.value);
  };
  const setData5 = (e) => {
    setAstPermitNo(e.target.value);
  };
  const setData6 = (e) => {
    setAstInsurExp(e.target.value);
  };
  const setData7 = (e) => {
    setAstPermitExp(e.target.value);
  };

  const data = astRegNo;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !astRegNo ||
      !astName ||
      !astModel ||
      !astChasNo ||
      !astEngNo ||
      !astPermitNo ||
      !astInsurExp ||
      !astPermitExp
    ) {
      alert('Fill the details');
    } else {
      const res = await axios.post('http://localhost:8004/operator/astcreate', {
        astRegNo,
        astName,
        astModel,
        astChasNo,
        astEngNo,
        astPermitNo,
        astInsurExp,
        astPermitExp,
        operId,
      });
      if (res.data.status === 201) {
        alert('Asset created successfully');
        await axios
          .post('http://localhost:8004/operator/createqrcode', {
            data: data,
          })
          .then(response => {
            const qrCodeImg = document.createElement('img');
            qrCodeImg.src = 'data:image/png;base64,' + response.data;
            setQrcode(qrCodeImg.src);
        })
        .catch(error => {
            console.error(error);
        });
      //   const res1= await axios.post('http://localhost:8004/operator/generate-qr-code', {
      //     data: data
      // })
      // if(res1.data.status === 201){
      //   setQrcode(res1.data.data.imageUrl);
        
      // }
        return;
      } else {
        alert('Asset unable to register');
        return;
      }
    }
  };

  return (
    <div className='flex flex-row gap-4'>
      <Opersidebar />
      <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
        <div className='py-4 flex flex-col justify-center items-center'>
          <form className='max-w-[400px] w-full mx-auto'>
            <h2 className='text-4xl text-pink-500 text-center py-1'>
              Asset Register
            </h2>
            <div className='flex flex-col py-1'>
              <label>Asset Registration Number</label>
              <input
                type='text'
                onChange={setData}
                className='border rounded w-full hover:border-pink-500 duration-200 p-1'
              />
            </div>
            <div className='flex flex-col py-1'>
              <label>Asset Model</label>
              <input
                type='text'
                onChange={setData1}
                className='border rounded w-full hover:border-pink-500 duration-200 p-1'
              />
            </div>
            <div className='flex flex-col py-1'>
              <label>Manufacture Year</label>
              <input
                type='number'
                onChange={setData2}
                className='border rounded w-full hover:border-pink-500 duration-200 p-1'
              />
            </div>
            <div className='flex flex-col py-1'>
              <label>Chasis Number</label>
              <input
                type='text'
                onChange={setData3}
                className='border rounded w-full hover:border-pink-500 duration-200 p-1'
              />
            </div>
            <div className='flex flex-col py-1'>
              <label>Engine Number</label>
              <input
                type='text'
                onChange={setData4}
                className='border rounded w-full hover:border-pink-500 duration-200 p-1'
              />
            </div>
            <div className='flex flex-col py-1'>
              <label>Permit Number</label>
              <input
                type='text'
                onChange={setData5}
                className='border rounded w-full hover:border-pink-500 duration-200 p-1'
              />
            </div>
            <div className='flex flex-col py-1'>
              <label>Insurance Exp</label>
              <input
                type='date'
                onChange={setData6}
                className='border rounded w-full hover:border-pink-500 duration-200 p-1'
              />
            </div>
            <div className='flex flex-col py-1'>
              <label>Permit Exp</label>
              <input
                type='date'
                onChange={setData7}
                className='border rounded w-full hover:border-pink-500 duration-200 p-1'
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

        {qrcode && (
          <div className=' justify-center items-center m-auto'>
            <a href={qrcode} download={`${astRegNo}.png`}>
              <img src={qrcode} className='w-[200px] border' alt='QR Code' />
              <span className='text-md justify-center items-center ml-6'>
              Reg No: {astRegNo}
              </span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Astregister;
