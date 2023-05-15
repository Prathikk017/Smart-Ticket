import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import Sidebar from '../Admin/Sidebar';
import useIdleTimeout from '../../../useIdleTimeout';

const ViewAsset = () => {
	const [data, setData] = useState([]);
	const [OperShortName, setOperShortName] = useState('');
	const { AstId } = useParams();
	let operId = AstId.slice(0, 3);
	const history = useNavigate();

	const getOperator = async () => {
		const res = await axios.post(
			'https://amsweets.in/operator/readoperatorshortname',
			{ operId }
		);

		if (res.data.status === 201) {
			setOperShortName(res.data.data[0].OperShortName);
		} else {
			console.log('error');
		}
	};

	const getSingleAssetData = async () => {
		const res = await axios.get(`https://amsweets.in/admin/assets/${AstId}`);

		if (res.data.status === 201) {
			setData(res.data.data);
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

	//  const verify = async() => {
	//    const token = window.localStorage.getItem('Lekpay');
	//    const Token = JSON.parse(token);
	//    const authorization = `Bearer ${Token}`;
	//    const res = await axios.post('http://localhost:8004/admin/verify',{
	// 	 authorization
	//    });
	//    if(res.data.status === 201){
	// 	 console.log(res.data.data);
	//    }else{
	// 	 if(res.data.data === 'Token is not valid'){
	// 	   window.localStorage.removeItem('Lekpay');
	// 	   history('/');
	// 	 }
	//    }
	//  }

	//  useEffect(() => {
	//    verify();
	//    // Run verify() every 10 minute if the user is not idle
	//    const intervalId = setInterval(() => {
	// 	 if (!isIdle) {
	// 	   verify();
	// 	 }
	//    }, 600000);

	//    // Clear the interval when the component unmounts
	//    return () => clearInterval(intervalId);
	//  }, [!isIdle]);

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
		} else {
			getOperator();
			getSingleAssetData();
		}
	}, []);

	return (
		<>
			<div className='flex flex-row gap-4'>
				<Sidebar />
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

export default ViewAsset;
