import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import Sidebar from '../Admin/Sidebar';
import useIdleTimeout from '../../../useIdleTimeout';

const ViewOperator = () => {
	const [data, setData] = useState([]);
	const { OperId } = useParams();
	const history = useNavigate();

	const getSingleOperatorData = async () => {
		const res = await axios.get(`https://lekpay.com/admin/operators/${OperId}`);

		if (res.data.status === 201) {
			setData(res.data.data);
		} else {
			console.log('error');
		}
	};

	// Call useIdleTimeout and pass in the time to consider the user as idle
	const isIdle = useIdleTimeout(300000); // set to 5 minute

	//  const verify = async() => {
	//    const token = window.localStorage.getItem('Lekpay');
	//    const Token = JSON.parse(token);
	//    const authorization = `Bearer ${Token}`;
	//    const res = await axios.post('https://lekpay.com/admin/verify',{
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
			history('/signin');
		}
	}, [isIdle, history]);

	useEffect(() => {
		const token = window.localStorage.getItem('Lekpay');
		const Token = JSON.parse(token);
		if (!Token) {
			history('/signin');
		} else {
			getSingleOperatorData();
		}
	}, []);

	return (
		<>
			<div className='flex flex-row gap-4'>
				<Sidebar />
				<div className='container  my-8 h-full w-[500px] p-4 mx-auto pr-6 border'>
					<h1 className='text-center text-4xl text-pink-500  py-6'>
						Operator Detail
					</h1>
					{data.length > 0
						? data.map((el, i) => {
								return (
									<>
										<div className='justify-center ml-[80px]' key={el.OperId}>
											<table className='w-full'>
												<tbody>
													<tr>
														<td className='p-1 my-1 text-start'>
															Company Name
														</td>
														<td className='p-1 my-1 text-start'>:</td>
														<td className='p-1 my-1 text-start'>
															{el.OperShortName}
														</td>
													</tr>
													<tr>
														<td className='p-1 my-1 text-start'>
															Company Email
														</td>
														<td className='p-1 my-1 text-start'>:</td>
														<td className='p-1 my-1 text-start'>
															{el.OperEmail}
														</td>
													</tr>
													<tr>
														<td className='p-1 my-1 text-start'>GST No</td>
														<td className='p-1 my-1 text-start'>:</td>
														<td className='p-1 my-1 text-start'>
															{el.OperGSTIN}
														</td>
													</tr>
													<tr>
														<td className='p-1 my-1 text-start'>Phone No</td>
														<td className='p-1 my-1 text-start'>:</td>
														<td className='p-1 my-1 text-start'>
															{el.OperPhone}
														</td>
													</tr>
													<tr>
														<td className='p-1 my-1 text-start'>
															Contact Name
														</td>
														<td className='p-1 my-1 text-start'>:</td>
														<td className='p-1 my-1 text-start'>
															{el.OperContactName}
														</td>
													</tr>
													<tr>
														<td className='p-1 my-1 text-start'>
															Contact Email
														</td>
														<td className='p-1 my-1 text-start'>:</td>
														<td className='p-1 my-1 text-start'>
															{el.OperContactEmail}
														</td>
													</tr>
													<tr>
														<td className='p-1 my-1 text-start'>
															Created Date
														</td>
														<td className='p-1 my-1 text-start'>:</td>
														<td className='p-1 my-1 text-start'>
															{moment(el.OperCreatedDate).format('DD-MM-YYYY')}
														</td>
													</tr>
													<tr>
														<td className='p-1 my-1 text-start'>Status</td>
														<td className='p-1 my-1 text-start'>:</td>
														<td className='p-1 my-1 text-start'>
															{el.OperStatus}
														</td>
													</tr>
												</tbody>
											</table>
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

export default ViewOperator;
