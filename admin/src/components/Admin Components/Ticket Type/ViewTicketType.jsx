import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';
import Sidebar from '../Admin/Sidebar';
import useIdleTimeout from '../../../useIdleTimeout';

const ViewTicketType = () => {
	const history = useNavigate();
	const [data, setData] = useState([]);
	const { TTid } = useParams();
	const getUserData = async () => {
		const res = await axios.get(
			`https://lekpay.com/admin/ticket-types/${TTid}`
		);

		if (res.data.status === 201) {
			setData(res.data.data);
		} else {
			console.log('error');
		}
	};

	const handleEnableSub = async () => {
		const res = await axios.patch(
			`https://lekpay.com/admin/ticket-types/enable/${TTid}`
		);
		if (res.data.status === 201) {
			alert('Ticket Type Activated');
			setTimeout(() => history('/admin/ticket-types'), 500);
			return;
		} else {
			console.log('error');
		}
	};

	const handleDisableSub = async () => {
		const res = await axios.patch(
			`https://lekpay.com/admin/ticket-types/disable/${TTid}`
		);
		if (res.data.status === 201) {
			alert('Ticket Type Deactivated');
			setTimeout(() => history('/admin/ticket-types'), 500);
			return;
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
			history('/');
		}
	}, [isIdle, history]);

	useEffect(() => {
		const token = window.localStorage.getItem('Lekpay');
		const Token = JSON.parse(token);
		if (!Token) {
			history('/');
		} else {
			getUserData();
		}
	}, []);

	return (
		<>
			<div className='flex flex-row gap-4'>
				<Sidebar />
				<div className='container  my-8 h-full w-[450px] p-4 mx-auto pr-6 border'>
					<h1 className='text-center text-4xl text-pink-500  py-6'>
						Ticket Type Detail
					</h1>
					{data.length > 0
						? data.map((el, i) => {
								return (
									<>
										<div className='flex flex-col ml-3' key={i + 1}>
											<div className='justify-center ml-[50px]'>
												<table className='w-full'>
													<tbody>
														<tr>
															<td className='p-1 my-1 text-start'>Name</td>
															<td className='p-1 my-1 text-start'>:</td>
															<td className='p-1 my-1 text-start'>
																{el.TTname}
															</td>
														</tr>
														<tr>
															<td className='p-1 my-1 text-start'>
																Short Name
															</td>
															<td className='p-1 my-1 text-start'>:</td>
															<td className='p-1 my-1 text-start'>
																{el.TTshortname}
															</td>
														</tr>
														<tr>
															<td className='p-1 my-1 text-start'>Status</td>
															<td className='p-1 my-1 text-start'>:</td>
															<td className='p-1 my-1 text-start'>
																{el.TTstatus}
															</td>
														</tr>
														<tr>
															<td className='p-1 my-1 text-start'>
																Created Date
															</td>
															<td className='p-1 my-1 text-start'>:</td>
															<td className='p-1 my-1 text-start'>
																{moment(el.TTCreatedDate).format('DD-MM-YYYY')}
															</td>
														</tr>
														<tr>
															<td className='p-1 my-1 text-start'>
																Modified Date
															</td>
															<td className='p-1 my-1 text-start'>:</td>
															<td className='p-1 my-1 text-start'>
																{moment(el.TTModifiedDate).format('DD-MM-YYYY')}
															</td>
														</tr>
													</tbody>
												</table>
											</div>

											<div className='flex flex-row justify-evenly m-4'>
												<button
													className='bg-gray-200 hover:bg-pink-300 px-3 py-1 rounded-lg w-max'
													onClick={handleDisableSub}
												>
													Disable
												</button>
												<button
													className='bg-gray-200 hover:bg-pink-300 px-3 py-1 rounded-lg w-max'
													onClick={handleEnableSub}
												>
													Enable
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

export default ViewTicketType;
