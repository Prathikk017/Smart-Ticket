import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';
import Opersidebar from '../Opersidebar';
import useIdleTimeout from '../../../useIdleTimeout';

const Empview = () => {
	const history = useNavigate();
	const [data, setData] = useState([]);
	const { EmpId } = useParams();
	const getEmployeeData = async () => {
		const res = await axios.get(`https://lekpay.com/employee/${EmpId}`);

		if (res.data.status === 201) {
			setData(res.data.data);
		} else {
			console.log('error');
		}
	};

	const handleSub = async () => {
		const res = await axios.patch(
			`https://lekpay.com/employee/delete/${EmpId}`
		);
		if (res.data.status === 201) {
			alert(res.data.data);
			history('/empview');
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
	//      authorization
	//    });
	//    if(res.data.status === 201){
	//      console.log(res.data.data);
	//    }else{
	//      if(res.data.data === 'Token is not valid'){
	//        window.localStorage.removeItem('Lekpay');
	//        history('/');
	//      }
	//    }
	//  }

	//  useEffect(() => {
	//    verify();
	//    // Run verify() every 10 minute if the user is not idle
	//    const intervalId = setInterval(() => {
	//      if (!isIdle) {
	//        verify();
	//      }
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
			getEmployeeData();
		}
	}, []);
	return (
		<>
			<div className='flex flex-row gap-4'>
				<Opersidebar />
				<div className='container  my-8 h-full w-[450px] p-4 mx-auto pr-6 border'>
					<h1 className='text-center text-4xl text-pink-500  py-6'>
						Employee Detail
					</h1>
					{data.length > 0
						? data.map((el, i) => {
								return (
									<>
										<div className='flex flex-col ml-4' key={i + 1}>
											<div className='justify-center ml-[50px]'>
												<table className='w-full'>
													<tbody>
														<tr>
															<td className='p-1 my-1 text-start'>
																Employee Name
															</td>
															<td className='p-1 my-1 text-start'>:</td>
															<td className='p-1 my-1 text-start'>
																{el.EmpName}
															</td>
														</tr>
														<tr>
															<td className='p-1 my-1 text-start'>
																Employee ID
															</td>
															<td className='p-1 my-1 text-start'>:</td>
															<td className='p-1 my-1 text-start'>
																{el.EmpIntId}
															</td>
														</tr>
														<tr>
															<td className='p-1 my-1 text-start'>
																Date Of Birth
															</td>
															<td className='p-1 my-1 text-start'>:</td>
															<td className='p-1 my-1 text-start'>
																{moment(el.EmpDOB).format('DD-MM-YYYY')}
															</td>
														</tr>
														<tr>
															<td className='p-1 my-1 text-start'>
																Employee Type
															</td>
															<td className='p-1 my-1 text-start'>:</td>
															<td className='p-1 my-1 text-start'>
																{el.EmpType}
															</td>
														</tr>
														<tr>
															<td className='p-1 my-1 text-start'>Mobile No</td>
															<td className='p-1 my-1 text-start'>:</td>
															<td className='p-1 my-1 text-start'>
																{el.EmpMobile}
															</td>
														</tr>
														<tr>
															<td className='p-1 my-1 text-start'>Aadhar No</td>
															<td className='p-1 my-1 text-start'>:</td>
															<td className='p-1 my-1 text-start'>
																{el.EmpAadhar}
															</td>
														</tr>
														<tr>
															<td className='p-1 my-1 text-start'>Address 1</td>
															<td className='p-1 my-1 text-start'>:</td>
															<td className='p-1 my-1 text-start'>
																{el.EmpAddr1}
															</td>
														</tr>
														<tr>
															<td className='p-1 my-1 text-start'>Address 2</td>
															<td className='p-1 my-1 text-start'>:</td>
															<td className='p-1 my-1 text-start'>
																{el.EmpAddr2}
															</td>
														</tr>
														<tr>
															<td className='p-1 my-1 text-start'>City</td>
															<td className='p-1 my-1 text-start'>:</td>
															<td className='p-1 my-1 text-start'>
																{el.EmpCity}
															</td>
														</tr>
														<tr>
															<td className='p-1 my-1 text-start'>Pincode</td>
															<td className='p-1 my-1 text-start'>:</td>
															<td className='p-1 my-1 text-start'>
																{el.EmpPincode}
															</td>
														</tr>
														<tr>
															<td className='p-1 my-1 text-start'>Status</td>
															<td className='p-1 my-1 text-start'>:</td>
															<td className='p-1 my-1 text-start'>
																{el.EStatus}
															</td>
														</tr>
													</tbody>
												</table>
											</div>
											<div className='flex flex-row justify-evenly items-center mt-8'>
												<Link to={'/empview'}>
													<button className='bg-gray-200 hover:bg-pink-300  px-4 py-1 rounded-lg w-max'>
														Cancel
													</button>
												</Link>
												<Link to={`/empupdate/${el.EmpId}`}>
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

export default Empview;
