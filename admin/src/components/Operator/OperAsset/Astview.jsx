import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';
import Opersidebar from '../Opersidebar';

const Astview = () => {
  const history = useNavigate();
  const [data, setData] = useState([]);
  const [OperShortName, setOperShortName] = useState('');
  const { AstId } = useParams();
  const ID = window.localStorage.getItem('OperID');
  var operId = JSON.parse(ID);

  const getOperator = async () => {
    const res = await axios.post(
      'http://localhost:8004/operator/readoperatorshortname',
      { operId }
    );

    if (res.data.status === 201) {
      setOperShortName(res.data.data[0].OperShortName);
    } else {
      console.log('error');
    }
  };
  const getAssetData = async () => {
    const res = await axios.get(
      `http://localhost:8004/operator/asset/${AstId}`
    );

    if (res.data.status === 201) {
      setData(res.data.data);
    } else {
      console.log('error');
    }
  };

  const handleSub = async () => {
    const res = await axios.patch(
      `http://localhost:8004/operator/asset/delete/${AstId}`
    );
    if (res.data.status === 201) {
      alert(res.data.data);
      history('/astview');
      return;
    } else {
      console.log('error');
    }
  };
 
  const handleDownload = (e) => {
    const qrImage = document.getElementById('qr-img');
    const printWindow = window.open(
      '',
      '_blank',
      'left=0,top=0,width=800,height=600,toolbar=0,scrollbars=0,status=0'
    );
    printWindow.document.write(`
        <html>
          <head>
            <title>Print QR Code</title>
            <style>
              @media print {
                /* Set page size to A4 */
                @page {
                  size: A4;
                  margin: 0;
                }
                /* Center the QR code and label */
                body {
                  display: flex;
                  justify-content: center;
                  align-items: center;
                
                }
                #qr-img-container {
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                  margin-top: 0;
                  padding-top:0;
                  margin-bottom: 0;
                  padding-bottom: 0;
                }
                 #assetReg{
                  text-align: center;
                  font-size: 100px;
                  font-weight: bold;
                  margin-top:0;
                  padding-top:0;
                  margin-bottom: 0;
                  padding-bottom: 0;
                }
                #opershortname{
                  text-align: center;
                  font-size: 100px;
                  font-weight: bold;
                  margin-top:20;
                  padding-top:0;
                  margin-bottom: 0;
                  padding-bottom: 0;
                }
                #qr-img {
                  display: block;
                  margin: 0 auto;
                  margin-top: 0;
                  padding-top:0;
                  margin-bottom: 0;
                  padding-bottom: 0;
                  width:850px;
                  heigth:750px;
                }
              }
            </style>
          </head>
          <body>
          
            <div id="qr-img-container">
              <h1 id="opershortname">${OperShortName}</h1>
              <img src="${qrImage.src}" alt="QR Code" id="qr-img" />
              <h4 id="assetReg">${e}<h4>
            </div>
          </body>
        </html>
      `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  useEffect(() => {
    getOperator();
  }, [operId]);

  useEffect(() => {
    const token = window.localStorage.getItem('Lekpay');
    const Token = JSON.parse(token);
    if (!Token) {
      history('/');
    } else {
      getAssetData();
    }
  }, []);
  return (
    <>
      <div className='flex flex-row gap-4'>
        <Opersidebar />
        <div className='container  my-8 h-full w-[40%] p-4 mx-auto pr-6 border'>
          <h1 className='text-center text-4xl text-pink-500  py-6'>
            Asset Detail
          </h1>

          {data.length > 0
            ? data.map((el, i) => {
                var qr1 = 'data:image/png;base64,' + el.QR;
                return (
                  <>
                    <div className='flex flex-col ml-4' key={i + 1}>
                      <div className='grid grid-cols-2 justify-end'>
                        <div className='flex flex-col mt-5'>
                          <label className='p-1 my-1  text-start'>
                            Asset Registration No:{' '}
                            <span className='ml-2'>{el.AstRegNo}</span>
                          </label>

                          <label className='p-1 my-1 text-start'>
                            Asset Model:{' '}
                            <span className='ml-2'>{el.AstName}</span>
                          </label>
                        </div>
                        <img
                          src={qr1}
                          className='w-[100px] border ml-[50%] '
                          alt='QR Code'
                          id='qr-img'
                        />
                      </div>

                      <div className='grid grid-cols-2 justify-end'>
                        <div className='flex flex-col'>
                          <label className='p-1 my-1 text-start'>
                            Manufacturing Year:{' '}
                            <span className='ml-2'>{el.AstModel}</span>
                          </label>
                          <label className='p-1 my-1 text-start'>
                            Chasis No:{' '}
                            <span className='ml-2'>{el.AstChasNo}</span>
                          </label>
                        </div>
                        <button
                          className='hover:bg-pink-300 rounded-lg w-28 h-10 mt-4 ml-[48%]'
                          onClick={() => handleDownload(el.AstRegNo)}
                        >
                          Print QR
                        </button>
                      </div>

                      <label className='p-1 my-1 text-start'>
                        Engine No:<span className='ml-2'>{el.AstEngNo}</span>
                      </label>
                      <label className='p-1 my-1 text-start'>
                        Permit No:
                        <span className='ml-2'>{el.AstPermitNo}</span>
                      </label>
                      <label className='p-1 my-1 text-start'>
                        Insurance Expire Date:
                        <span className='ml-2'>
                          {moment(el.AstInsurExp).format('DD-MM-YYYY')}
                        </span>
                      </label>
                      <label className='p-1 my-1 text-start'>
                        Status:<span className='ml-2'>{el.AStatus}</span>
                      </label>
                      <div className='flex flex-row justify-evenly m-4'>
                        <Link to={'/astview'}>
                          <button className='hover:bg-pink-300  px-4 py-2 rounded-lg w-max'>
                            Cancel
                          </button>
                        </Link>
                        <Link to={`/astupdate/${el.AstId}`}>
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

export default Astview;