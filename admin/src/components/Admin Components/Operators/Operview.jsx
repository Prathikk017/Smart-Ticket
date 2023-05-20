import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';
import Sidebar from '../Admin/Sidebar';
import useIdleTimeout from '../../../useIdleTimeout';
import Footer from '../../Footer';

const Operview = () => {
	const history = useNavigate();
	const [data, setData] = useState([]);
	const { OperId } = useParams();
	const getUserData = async () => {
		const res = await axios.get(`https://lekpay.com/operator/${OperId}`);

		if (res.data.status === 201) {
			setData(res.data.data);
		} else {
			console.log('error');
		}
	};

	const handleSub = async () => {
		const res = await axios.patch(`https://lekpay.com/admin/approve/${OperId}`);
		if (res.data.status === 201) {
			alert('Operator Approved');
			setTimeout(() => history('/admin/dashboard'), 500);
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
				<div className='container  my-8 h-full w-[500px] p-4 mx-auto pr-6 border'>
					<h1 className='text-center text-4xl text-pink-500  py-6'>
						Operator Detail
					</h1>
					{data.length > 0
						? data.map((el, i) => {
								return (
									<>
										<div className='flex flex-col ml-4' key={el.OperId}>
											<table className='w-full'>
												<tbody>
													<tr>
														<td className='p-1 my-1 text-start'>
															Company Name
														</td>
														<td className='p-1 my-1 text-start'>:</td>
														<td className='p-1 my-1 text-start'>
															{el.OperName}
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
												</tbody>
											</table>
										</div>
										<div className='flex flex-row justify-center m-4'>
											<Link to={'/admin/approveopersview'}>
												<button className='hover:bg-pink-300  px-4 py-2 rounded-lg w-max'>
													Cancel
												</button>
											</Link>
											<Link to={`/admin/approveoper/${el.OperId}`}>
												<button
													className='hover:bg-pink-300  px-4 py-2 rounded-lg w-max'
													onClick={handleSub}
												>
													Approve
												</button>
											</Link>
										</div>
									</>
								);
						  })
						: ' '}
				</div>
				<Footer />
			</div>
		</>
	);
};

export default Operview;
