import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import Sidebar from '../Admin/Sidebar';
import useIdleTimeout from '../../../useIdleTimeout';

const ViewEmployee = () => {
	const [data, setData] = useState([]);
	const { EmpId } = useParams();
	const history = useNavigate();

	const getSingleEmployeeData = async () => {
		const res = await axios.get(
			`http://localhost:8004/admin/employees/${EmpId}`
		);

		if (res.data.status === 201) {
			setData(res.data.data);
		} else {
			console.log('error');
		}
	};

	 // Call useIdleTimeout and pass in the time to consider the user as idle
	 const isIdle = useIdleTimeout(60000); // set to 1 minute

	 const verify = async() => {
	   const token = window.localStorage.getItem('Lekpay');
	   const Token = JSON.parse(token);
	   const authorization = `Bearer ${Token}`;
	   const res = await axios.post('http://localhost:8004/admin/verify',{
		 authorization
	   });
	   if(res.data.status === 201){
		 console.log(res.data.data);
	   }else{
		 if(res.data.data === 'Token is not valid'){
		   window.localStorage.removeItem('Lekpay');
		   history('/');
		 }
	   }
	 }
   
	 
	 useEffect(() => {
	   verify();
	   // Run verify() every 1 minute if the user is not idle
	   const intervalId = setInterval(() => {
		 if (!isIdle) {
		   verify();
		 }
	   }, 60000);
   
	   // Clear the interval when the component unmounts
	   return () => clearInterval(intervalId);
	 }, [isIdle]);
   
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
			getSingleEmployeeData();
		}
	}, []);

	return (
		<>
			<div className='flex flex-row gap-4'>
				<Sidebar />
				<div className='container  my-8 h-full w-[40%] p-4 mx-auto pr-6 border'>
					<h1 className='text-center text-4xl text-pink-500  py-6'>
						Employee Detail
					</h1>
					{data.length > 0
						? data.map((el, i) => {
								return (
									<>
										<div className='flex flex-col ml-4' key={i + 1}>
											<label className='p-1 my-1 text-start'>
												Employee Name:{' '}
												<span className='ml-2'>{el.EmpName}</span>
											</label>
											<label className='p-1 my-1 text-start'>
												Employee ID: <span className='ml-2'>{el.EmpIntId}</span>
											</label>
											<label className='p-1 my-1 text-start'>
												Date Of Birth:{' '}
												<span className='ml-2'>
													{moment(el.EmpDOB).format('DD-MM-YYYY')}
												</span>
											</label>
											<label className='p-1 my-1 text-start'>
												Employee Type:{' '}
												<span className='ml-2'>{el.EmpType}</span>
											</label>
											<label className='p-1 my-1 text-start'>
												Mobile No:<span className='ml-2'>{el.EmpMobile}</span>
											</label>
											<label className='p-1 my-1 text-start'>
												Aadhar No:<span className='ml-2'>{el.EmpAadhar}</span>
											</label>
											<label className='p-1 my-1 text-start'>
												Address 1:
												<span className='ml-2'>{el.EmpAddr1}</span>
											</label>
											<label className='p-1 my-1 text-start'>
												Address 2:
												<span className='ml-2'>{el.EmpAddr2}</span>
											</label>
											<label className='p-1 my-1 text-start'>
												City:
												<span className='ml-2'>{el.EmpCity}</span>
											</label>
											<label className='p-1 my-1 text-start'>
												Pincode:
												<span className='ml-2'>{el.EmpPincode}</span>
											</label>
											<label className='p-1 my-1 text-start'>
												Status:
												<span className='ml-2'>{el.EStatus}</span>
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

export default ViewEmployee;
