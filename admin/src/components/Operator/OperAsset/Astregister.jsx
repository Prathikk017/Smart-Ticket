import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Opersidebar from '../Opersidebar';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
import AssetDetail from '../../../assets/template/Asset_Detail.xlsx';
import useIdleTimeout from '../../../useIdleTimeout';

const Astregister = () => {
  const [astRegNo, setAstRegNo] = useState('');
  const [astName, setAstName] = useState('');
  const [astModel, setAstModel] = useState('');
  const [astChasNo, setAstChasNo] = useState('');
  const [astEngNo, setAstEngNo] = useState('');
  const [astPermitNo, setAstPermitNo] = useState('');
  const [astInsurExp, setAstInsurExp] = useState('');
  const [astPermitExp, setAstPermitExp] = useState('');
  const [OperShortName, setOperShortName] = useState('');
  const [items, setItems] = useState([]);
  const [recordsAdded, setRecordsAdded] = useState(0);
  const [recordsNotAdded, setRecordsNotAdded] = useState(0);
  const [skippedRecords, setSkippedRecords] = useState([]);
  const [fileSelected, setFileSelected] = useState(false);

  const [qrcode, setQrcode] = useState('');
  const history = useNavigate();
  // const history = useNavigate();

  const ID = window.localStorage.getItem('OperID');
  var operId = JSON.parse(ID);

  const getOperator = async () => {
    const res = await axios.post(
      'https://lekpay.com/operator/readoperatorshortname',
      { operId }
    );

    if (res.data.status === 201) {
      setOperShortName(res.data.data[0].OperShortName);
    } else {
      console.log('error');
    }
  };

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
    const selectedDate = new Date(e.target.value);
    const currentDate = new Date();

    if (selectedDate > currentDate) {
      setAstInsurExp(e.target.value);
    } else {
      const currentDateISO = currentDate.toISOString().split('T')[0];
      setAstInsurExp(currentDateISO);
    }
  };
  const setData7 = (e) => {
    const selectedDate = new Date(e.target.value);
    const currentDate = new Date();

    if (selectedDate > currentDate) {
      setAstPermitExp(e.target.value);
    } else {
      const currentDateISO = currentDate.toISOString().split('T')[0];
      setAstPermitExp(currentDateISO);
    }
  };

  //function to download template
  const handleDownloadTemplate = () => {
    const link = document.createElement('a');
    link.href = AssetDetail; // Replace with the actual path to your template file
    link.download = 'Asset Detail.xlsx'; // Specify the desired filename
    link.click();
  };

  //function to read excel file
  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);
      setFileSelected(true);
      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: 'buffer' });

        const wsname = wb.SheetNames[0];

        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws);

        if (data.length === 0) {
          alert('Excel file is empty.');
          reject('Empty file');
        } else {
          resolve(data);
        }
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((d) => {
      setItems(d);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let skippedRecords = [];
    let notAddedRecords = [];
    let skippedRecords1 = [];

    if (items.length > 0) {
      let addedCount = 0;
      let notAddedCount = 0;
      let notAddedCount1 = 0;
      let notAddedCount2 = 0;

      for (let i = 0; i < items.length; i++) {
        const item = items[i];

        const {
          'Asset Registration Number': astRegNo,
          'Asset Model': astName,
          'Manufacture Year': astModel,
          'Chasis Number': astChasNo,
          'Engine Number': astEngNo,
          'Permit Number': astPermitNo,
          'Insurance Exp': astInsurExp,
          'Permit Exp': astPermitExp,
        } = item;

        // Check if any field is empty
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
          notAddedCount1++;
          notAddedRecords.push(astRegNo);
          continue;
        }

        const selectedInsurExp = new Date(astInsurExp);
        const selectedPermitExp = new Date(astPermitExp);
        const currentDate = new Date();

        // Check if the insurance expire date and permit date are not past dates
        if (selectedInsurExp < currentDate || selectedPermitExp < currentDate) {
          notAddedCount2++;
          skippedRecords1.push(astRegNo);
          continue;
        }

        try {
          // Check if the EmployeeIntId already exists in the database
          const checkResult = await axios.get(
            `https://lekpay.com/operator/check/${astRegNo}`
          );

          if (checkResult.data.status === 201 && checkResult.data.data !== 0) {
            notAddedCount++;
            skippedRecords.push(` ${astRegNo}`);
            continue;
          }

          // Register the item
          const res = await axios.post(
            'https://lekpay.com/operator/astcreate',
            {
              astRegNo,
              astName,
              astModel,
              astChasNo,
              astEngNo,
              astPermitNo,
              astInsurExp,
              astPermitExp,
              operId,
            }
          );

          if (res.data.status === 201) {
            const data = astRegNo; // Define data here
            await axios
              .post('https://lekpay.com/operator/createqrcode', {
                data: data,
              })
              .then((response) => {
                const qrCodeImg = document.createElement('img');
                qrCodeImg.src = 'data:image/png;base64,' + response.data;
                setQrcode(qrCodeImg.src);
              })
              .catch((error) => {
                console.error(error);
              });
            addedCount++;
          }
        } catch (error) {
          console.log(
            `Error occurred while registering item with Registration Number ${astRegNo}`
          );
          notAddedCount++;
        }
      }

      setRecordsAdded(addedCount);
      setRecordsNotAdded(notAddedCount);
      setSkippedRecords(skippedRecords);
      setItems([]);
      if (addedCount === 0) {
        alert(
          `${notAddedCount} records and asset with Registration Number ${skippedRecords} already existed, skipped registration.`
        );
      } else {
        alert(`${addedCount} records of asset data have been added.`);
      }
      if (notAddedCount2 > 0) {
        alert(
          `${notAddedCount2} records and asset with Registration Number ${skippedRecords1} insurance expire date and permit date are past dates. `
        );
      }
      if (notAddedCount1 > 0) {
        alert(
          `${notAddedCount1} records and asset with Registration Number ${notAddedRecords} have empty fields, skipped registration.`
        );
      }
      let form = document.getElementsByName('contact-form')[0];
      form.reset();
      setTimeout(() => history('/Operdashboard'), 300);
    } else {
      try {
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
          return;
        }

        const checkResult = await axios.get(
          `https://lekpay.com/operator/check/${astRegNo}`
        );

        if (checkResult.data.status === 201 && checkResult.data.data !== 0) {
          alert(`${astRegNo} already existed.`);
          let form = document.getElementsByName('contact-form')[0];
          form.reset();
          window.location.reload();
          return;
        } else {
          const res = await axios.post(
            'https://lekpay.com/operator/astcreate',
            {
              astRegNo,
              astName,
              astModel,
              astChasNo,
              astEngNo,
              astPermitNo,
              astInsurExp,
              astPermitExp,
              operId,
            }
          );
          if (res.data.status === 201) {
            alert('Asset created successfully');
            await axios
              .post('https://lekpay.com/operator/createqrcode', {
                data: astRegNo,
              })
              .then((response) => {
                const qrCodeImg = document.createElement('img');
                qrCodeImg.src = 'data:image/png;base64,' + response.data;
                setQrcode(qrCodeImg.src);
              })
              .catch((error) => {
                console.error(error);
              });
            let form = document.getElementsByName('contact-form')[0];
            form.reset();
            setTimeout(() => history('/Operdashboard'), 300);
            return;
          } else {
            alert('Asset unable to register');
            return;
          }
        }
      } catch (error) {
        console.log(error);
        alert('Error occurred while registering asset');
      }
    }
  };

  // const handleDownload = (e) => {
  //   const qrImage = document.getElementById('qr-img');
  //   const printWindow = window.open(
  //     '',
  //     '_blank',
  //     'left=0,top=0,width=800,height=600,toolbar=0,scrollbars=0,status=0'
  //   );
  //   printWindow.document.write(`
  //       <html>
  //         <head>
  //           <title>${OperShortName}-${e}</title>
  //           <style>
  //             @media print {
  //               /* Set page size to A4 */
  //               @page {
  //                 size: A4;
  //                 margin: 0;
  //               }
  //               /* Center the QR code and label */
  //               body {
  //                 display: flex;
  //                 justify-content: center;
  //                 align-items: center;
                
  //               }
  //               #qr-img-container {
  //                 display: flex;
  //                 flex-direction: column;
  //                 justify-content: center;
  //                 align-items: center;
  //                 margin-top: 0;
  //                 padding-top:0;
  //                 margin-bottom: 0;
  //                 padding-bottom: 0;
  //               }
  //                #assetReg{
  //                 text-align: center;
  //                 font-size: 100px;
  //                 font-weight: bold;
  //                 margin-top:0;
  //                 padding-top:0;
  //                 margin-bottom: 0;
  //                 padding-bottom: 0;
  //               }
  //               #opershortname{
  //                 text-align: center;
  //                 font-size: 100px;
  //                 font-weight: bold;
  //                 margin-top:20;
  //                 padding-top:0;
  //                 margin-bottom: 0;
  //                 padding-bottom: 0;
  //               }
  //               #qr-img {
  //                 display: block;
  //                 margin: 0 auto;
  //                 margin-top: 0;
  //                 padding-top:0;
  //                 margin-bottom: 0;
  //                 padding-bottom: 0;
  //                 width:850px;
  //                 heigth:750px;
  //               }
  //             }
  //           </style>
  //         </head>
  //         <body>
          
  //           <div id="qr-img-container">
  //             <h1 id="opershortname">${OperShortName}</h1>
  //             <img src="${qrImage.src}" alt="QR Code" id="qr-img" />
  //             <h4 id="assetReg">${e}<h4>
  //           </div>
  //         </body>
  //       </html>
  //     `);
  //   printWindow.document.close();
  //   printWindow.focus();
  //   printWindow.print();
  //   printWindow.close();
  // };

  // Call useIdleTimeout and pass in the time to consider the user as idle
  const isIdle = useIdleTimeout(600000); // set to 10 minute

  //   const verify = async() => {
  //     const token = window.localStorage.getItem('Lekpay');
  //     const Token = JSON.parse(token);
  //     const authorization = `Bearer ${Token}`;
  //     const res = await axios.post('https://lekpay.com/admin/verify',{
  //       authorization
  //     });
  //     if(res.data.status === 201){
  //       console.log(res.data.data);
  //     }else{
  //       if(res.data.data === 'Token is not valid'){
  //         window.localStorage.removeItem('Lekpay');
  //         history('/');
  //       }
  //     }
  //   }

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

  // useEffect(() => {
  //   if (items.length > 0) {
  //     const data = items[0];
  //     const {
  //       'Asset Registration Number': astRegNo,
  //       'Asset Model': astName,
  //       'Manufacture Year': astModel,
  //       'Chasis Number': astChasNo,
  //       'Engine Number': astEngNo,
  //       'Permit Number': astPermitNo,
  //       'Insurance Exp': astInsurExp,
  //       'Permit Exp': astPermitExp,
  //     } = data;

  //     // Set form values
  //     setAstRegNo(astRegNo || '');
  //     setAstName(astName || '');
  //     setAstModel(astModel || '');
  //     setAstChasNo(astChasNo || '');
  //     setAstEngNo(astEngNo || '');
  //     setAstPermitNo(astPermitNo || '');
  //     setAstInsurExp(astInsurExp || '');
  //     setAstPermitExp(astPermitExp || '');
  //   }
  // }, [items]);

  useEffect(() => {
    getOperator();
  }, [operId]);

  useEffect(() => {
    const token = window.localStorage.getItem('Lekpay');
    const Token = JSON.parse(token);
    if (!Token) {
      history('/signin');
    }
  }, []);

  return (
    <div className='flex flex-row gap-4'>
      <Opersidebar />
      <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
        <div className='py-4 flex flex-col justify-center items-center'>
          <form className='max-w-[500px] w-full mx-auto' name='contact-form'>
            <h2 className='text-5xl text-pink-500 text-center py-1 mb-8'>
              Asset Register
            </h2>
            <div className='flex flex-row py-1'>
              <label className='justify-center items-center mr-4 mt-1'>
                Asset Registration Number:{' '}
              </label>
              <input
                type='text'
                onChange={setData}
                value={astRegNo}
                className='border rounded w-[58%] hover:border-pink-500 duration-200 p-1'
              />
            </div>
            <div className='flex flex-row py-1'>
              <label className='justify-center items-center mr-28 mt-1'>
                Asset Model:{' '}
              </label>
              <input
                type='text'
                onChange={setData1}
                value={astName}
                className='border rounded w-[58%] ml-1 hover:border-pink-500 duration-200 p-1'
              />
            </div>
            <div className='flex flex-row py-1'>
              <label className='justify-center items-center mr-20 mt-1'>
                Manufacture Year:{' '}
              </label>
              <input
                type='number'
                onChange={setData2}
                value={astModel}
                className='border rounded w-[58%] hover:border-pink-500 duration-200 p-1'
              />
            </div>
            <div className='flex flex-row py-1'>
              <label className='justify-center items-center mr-24 mt-1'>
                Chasis Number:{' '}
              </label>
              <input
                type='text'
                onChange={setData3}
                value={astChasNo}
                className='border rounded w-[58%] hover:border-pink-500 duration-200 p-1'
              />
            </div>
            <div className='flex flex-row py-1'>
              <label className='justify-center items-center mr-20 mt-1'>
                Engine Number:{' '}
              </label>
              <input
                type='text'
                onChange={setData4}
                value={astEngNo}
                className='border rounded w-[58%] ml-3 hover:border-pink-500 duration-200 p-1'
              />
            </div>
            <div className='flex flex-row py-1'>
              <label className='justify-center items-center mr-20 mt-1'>
                Permit Number:{' '}
              </label>
              <input
                type='text'
                onChange={setData5}
                value={astPermitNo}
                className='border rounded w-[58%] ml-3 hover:border-pink-500 duration-200 p-1'
              />
            </div>
            <div className='flex flex-row py-1'>
              <label className='justify-center items-center mr-20 mt-1'>
                Insurance Exp:{' '}
              </label>
              <input
                type='date'
                onChange={setData6}
                value={astInsurExp}
                min={new Date().toISOString().split('T')[0]}
                className='border rounded w-[58%] ml-6 hover:border-pink-500 duration-200 p-1'
              />
            </div>
            <div className='flex flex-row py-1'>
              <label className='justify-center items-center mr-24 mt-1'>
                Permit Exp:{' '}
              </label>
              <input
                type='date'
                onChange={setData7}
                value={astPermitExp}
                min={new Date().toISOString().split('T')[0]}
                className='border rounded w-[58%] ml-8 hover:border-pink-500 duration-200 p-1'
              />
            </div>
            <button
              className='border w-full my-2 py-2 text-white bg-pink-500 rounded text-lg hover:bg-pink-400 duration-200'
              onClick={handleSubmit}
            >
              {fileSelected ? 'Submit' : 'Register'}
            </button>
          </form>
        </div>
        <div className='m-auto grid grid-flow-row gap-4'>
          {/* {qrcode && (
            <div className=' hidden justify-center items-center m-auto'>
              <img
                src={qrcode}
                className='w-[200px] border hidden'
                alt='QR Code'
                id='qr-img'
              />
              <span className='text-md justify-center hidden items-center ml-6'>
                Reg No: {astRegNo}
              </span>
              <button
                className='hover:bg-pink-300 rounded-lg w-28 h-10 mt-4 '
                onClick={() => handleDownload(astRegNo)}
              >
                Print QR
              </button>
            </div>
          )} */}
          <button
            className='bg-gray-200 hover:bg-pink-300  px-2 py-2 rounded-lg w-max'
            onClick={handleDownloadTemplate}
          >
            Download Template
          </button>
          <input
            type='file'
            onChange={(e) => {
              const file = e.target.files[0];
              readExcel(file);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Astregister;
