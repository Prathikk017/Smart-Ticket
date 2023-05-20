import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import Sidebar from './Sidebar';
import useIdleTimeout from '../../../useIdleTimeout';
import Footer from '../../Footer';

const ViewAdmin = () => {
	const [data, setData] = useState([]);
	const { AdminId } = useParams();
	const history = useNavigate();

	const getSingleAdminData = async () => {
		const res = await axios.get(`https://lekpay.com/admin/${AdminId}`);

		if (res.data.status === 201) {
			console.log(res.data.data);
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
			history('/');
		}
	}, [isIdle, history]);

	useEffect(() => {
		const token = window.localStorage.getItem('Lekpay');
		const Token = JSON.parse(token);
		if (!Token) {
			history('/');
		} else {
			getSingleAdminData();
		}
	}, []);

	return (
		<>
			<div className='flex flex-row gap-4'>
				<Sidebar />
				<div className='container  my-8 h-full w-[450px] p-4 mx-auto pr-6 border'>
					<h1 className='text-center text-4xl text-pink-500  py-6'>
						Admin Detail
					</h1>
					{data.length > 0
						? data.map((el, i) => {
								return (
									<>
										<div className='justify-center ml-[80px]'>
											<table className='w-full'>
												<tbody>
													<tr>
														<td className='p-1 my-1 text-start'>Name</td>
														<td className='p-1 my-1 text-start'>:</td>
														<td className='p-1 my-1 text-start'>{el.Aname}</td>
													</tr>
													<tr>
														<td className='p-1 my-1 text-start'>Email</td>
														<td className='p-1 my-1 text-start'>:</td>
														<td className='p-1 my-1 text-start'>{el.Aemail}</td>
													</tr>
													<tr>
														<td className='p-1 my-1 text-start'>Mobile No</td>
														<td className='p-1 my-1 text-start'>:</td>
														<td className='p-1 my-1 text-start'>
															{el.Amobile}
														</td>
													</tr>
													<tr>
														<td className='p-1 my-1 text-start'>
															Date of Birth
														</td>
														<td className='p-1 my-1 text-start'>:</td>
														<td className='p-1 my-1 text-start'>
															{moment(el.ADoB).format('DD-MM-YYYY')}
														</td>
													</tr>
													<tr>
														<td className='p-1 my-1 text-start'>Gender</td>
														<td className='p-1 my-1 text-start'>:</td>
														<td className='p-1 my-1 text-start'>
															{el.Agender}
														</td>
													</tr>
													<tr>
														<td className='p-1 my-1 text-start'>
															Created Date
														</td>
														<td className='p-1 my-1 text-start'>:</td>
														<td className='p-1 my-1 text-start'>
															{moment(el.ACreatedDate).format('DD-MM-YYYY')}
														</td>
													</tr>
													<tr>
														<td className='p-1 my-1 text-start'>
															Modified Date
														</td>
														<td className='p-1 my-1 text-start'>:</td>
														<td className='p-1 my-1 text-start'>
															{moment(el.AModifiedDate).format('DD-MM-YYYY')}
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
				<Footer />
			</div>
		</>
	);
};

export default ViewAdmin;
