import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';
import Opersidebar from '../Opersidebar';
import useIdleTimeout from '../../../useIdleTimeout';

const Astview = () => {
	const history = useNavigate();
	const [data, setData] = useState([]);
	const [OperShortName, setOperShortName] = useState('');
	const { AstId } = useParams();
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
	const getAssetData = async () => {
		const res = await axios.get(`https://lekpay.com/operator/asset/${AstId}`);

		if (res.data.status === 201) {
			setData(res.data.data);
		} else {
			console.log('error');
		}
	};

	const handleSub = async () => {
		const res = await axios.patch(
			`https://lekpay.com/operator/asset/delete/${AstId}`
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

	// const verify = async() => {
	//   const token = window.localStorage.getItem('Lekpay');
	//   const Token = JSON.parse(token);
	//   const authorization = `Bearer ${Token}`;
	//   const res = await axios.post('https://lekpay.com/admin/verify',{
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
			history('/signin');
		}
	}, [isIdle, history]);

	useEffect(() => {
		getOperator();
	}, [operId]);

	useEffect(() => {
		const token = window.localStorage.getItem('Lekpay');
		const Token = JSON.parse(token);
		if (!Token) {
			history('/signin');
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
											<div className='flex'>
												<table className='w-full'>
													<tbody>
														<tr>
															<td className='p-1 my-1 text-start'>
																Asset Registration No
															</td>
															<td className='p-1 my-1 text-start'>:</td>
															<td className='p-1 my-1 text-start'>
																{el.AstRegNo}
															</td>
														</tr>
														<tr>
															<td className='p-1 my-1 text-start'>
																Asset Model
															</td>
															<td className='p-1 my-1 text-start'>:</td>
															<td className='p-1 my-1 text-start'>
																{el.AstName}
															</td>
														</tr>
														<tr>
															<td className='p-1 my-1 text-start'>
																Manufacturing Year
															</td>
															<td className='p-1 my-1 text-start'>:</td>
															<td className='p-1 my-1 text-start'>
																{el.AstModel}
															</td>
														</tr>
														<tr>
															<td className='p-1 my-1 text-start'>Chasis No</td>
															<td className='p-1 my-1 text-start'>:</td>
															<td className='p-1 my-1 text-start'>
																{el.AstChasNo}
															</td>
														</tr>
														<tr>
															<td className='p-1 my-1 text-start'>Engine No</td>
															<td className='p-1 my-1 text-start'>:</td>
															<td className='p-1 my-1 text-start'>
																{el.AstEngNo}
															</td>
														</tr>
														<tr>
															<td className='p-1 my-1 text-start'>Permit No</td>
															<td className='p-1 my-1 text-start'>:</td>
															<td className='p-1 my-1 text-start'>
																{el.AstPermitNo}
															</td>
														</tr>
														<tr>
															<td className='p-1 my-1 text-start'>
																Insurance Expire Date
															</td>
															<td className='p-1 my-1 text-start'>:</td>
															<td className='p-1 my-1 text-start'>
																{moment(el.AstInsurExp).format('DD-MM-YYYY')}
															</td>
														</tr>
														<tr>
															<td className='p-1 my-1 text-start'>Status</td>
															<td className='p-1 my-1 text-start'>:</td>
															<td className='p-1 my-1 text-start'>
																{el.AStatus}
															</td>
														</tr>
													</tbody>
												</table>
												<div className='flex flex-col justify-center top-0'>
													<img
														src={qr1}
														className='w-[150px] border'
														alt='QR Code'
														id='qr-img'
													/>
													<button
														className='bg-gray-200 hover:bg-pink-300 rounded-lg w-24 h-9 mt-2 ml-3'
														onClick={() => handleDownload(el.AstRegNo)}
													>
														Print QR
													</button>
												</div>
											</div>

											<div className='flex flex-row justify-evenly mt-8'>
												<Link to={'/astview'}>
													<button className='bg-gray-200 hover:bg-pink-300  px-4 py-1 rounded-lg w-max'>
														Cancel
													</button>
												</Link>
												<Link to={`/astupdate/${el.AstId}`}>
													<button className='bg-gray-200 hover:bg-pink-300  px-4 py-1 rounded-lg w-max'>
														Edit
													</button>
												</Link>

												<button
													className='bg-gray-200 hover:bg-pink-300  px-4 py-1 rounded-lg w-max'
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
