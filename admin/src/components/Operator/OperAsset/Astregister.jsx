import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Opersidebar from '../Opersidebar';
import { useNavigate } from 'react-router-dom';
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
			const res = await axios.post('https://lekpay.com/operator/astcreate', {
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
				var form = document.getElementsByName('contact-form')[0];
				form.reset();
				//   const res1= await axios.post('https://lekpay.com/operator/generate-qr-code', {
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
            <title>${OperShortName}-${e}</title>
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

	// Call useIdleTimeout and pass in the time to consider the user as idle
	const isIdle = useIdleTimeout(300000); // set to 5 minute

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
		// Redirect to sign-in page if the user is idle
		if (isIdle) {
			window.localStorage.removeItem('Lekpay');
			history('/');
		}
	}, [isIdle, history]);

	useEffect(() => {
		getOperator();
	}, [operId]);

	useEffect(() => {
		const token = window.localStorage.getItem('Lekpay');
		const Token = JSON.parse(token);
		if (!Token) {
			history('/');
		}
	}, []);

	return (
		<div className='flex flex-row gap-4'>
			<Opersidebar />
			<div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
				<div className='py-4 flex flex-col justify-center items-center'>
					<form className='max-w-[400px] w-full mx-auto' name='contact-form'>
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
					<div className='flex flex-col justify-center items-center m-auto'>
						<img
							src={qrcode}
							className='w-[200px] border'
							alt='QR Code'
							id='qr-img'
						/>
						<span className='text-md justify-center items-center ml-6'>
							Reg No: {astRegNo}
						</span>
						<button
							className='hover:bg-pink-300 rounded-lg w-28 h-10 mt-4 '
							onClick={() => handleDownload(astRegNo)}
						>
							Print QR
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default Astregister;
