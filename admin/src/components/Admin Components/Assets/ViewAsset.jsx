import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import Sidebar from '../Admin/Sidebar';
import useIdleTimeout from '../../useIdleTimeout';

const ViewAsset = () => {
	const [data, setData] = useState([]);
	const { AstId } = useParams();
	const history = useNavigate();

	const getSingleAssetData = async () => {
		const res = await axios.get(`http://localhost:8004/admin/assets/${AstId}`);

		if (res.data.status === 201) {
			console.log(res.data.data);
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
								return (
									<>
										<div className='flex flex-col ml-4' key={i + 1}>
											<label className='p-1 my-1 text-start'>
												Asset Registration No:{' '}
												<span className='ml-2'>{el.AstRegNo}</span>
											</label>
											<label className='p-1 my-1 text-start'>
												Asset Model: <span className='ml-2'>{el.AstName}</span>
											</label>
											<label className='p-1 my-1 text-start'>
												Manufacturing Year:{' '}
												<span className='ml-2'>{el.AstModel}</span>
											</label>
											<label className='p-1 my-1 text-start'>
												Chasis No: <span className='ml-2'>{el.AstChasNo}</span>
											</label>
											<label className='p-1 my-1 text-start'>
												Engine No:<span className='ml-2'>{el.AstEngNo}</span>
											</label>
											<label className='p-1 my-1 text-start'>
												Permit No:<span className='ml-2'>{el.AstPermitNo}</span>
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
