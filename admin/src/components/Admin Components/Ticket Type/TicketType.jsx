import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useFormik } from 'formik';
import useIdleTimeout from '../../../useIdleTimeout';
import Sidebar from '../Admin/Sidebar';
import { adminRegisterSchema } from '../../../schemas/index';

const initialValues = {
	TTname: '',
	TTshortname: '',
};

const TicketType = () => {
	const history = useNavigate();

	const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
		useFormik({
			initialValues: initialValues,
			validationSchema: adminRegisterSchema,
			onSubmit: (values, action) => {
				console.log(values);
				action.resetForm();
			},
		});

	const TTname = values.TTname;
	const TTshortname = values.TTshortname;

	const handleSub = async (e) => {
		e.preventDefault();

		if (!TTname || !TTshortname) {
			alert('Fill the details');
			return;
		} else {
			const res = await axios.post('http://localhost:8004/admin/tickettype', {
				TTname,
				TTshortname,
			});
			if (res.data.status === 201) {
				alert('Ticket Type added successfully');
				setTimeout(() => history('/admin/dashboard'), 500);
				return;
			} else {
				alert('Please Try Again');
				return;
			}
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
    }
});
	return (
		<div className='flex flex-row gap-4'>
			<Sidebar />
			<div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-[90%] max-h-[100vh] overflow-y-auto mx-auto'>
				<div className='py-2 flex flex-col mt-[50px]'>
					<form
						className='max-w-[400px] w-full mx-auto text-sm flex-row'
						onSubmit={handleSubmit}
					>
						<h2 className='text-3xl text-pink-500 text-center py-2'>
							Ticket Type
						</h2>
						<div className='flex flex-col py-1'>
							<label>Name</label>
							<input
								type='text'
								name='TTname'
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.TTname}
								className='border p-1 rounded w-full hover:border-pink-500 duration-200'
							/>
							{errors.Aname && touched.Aname ? (
								<p className='text-red-500 text-xs '>{errors.Aname}</p>
							) : null}
						</div>
						<div className='flex flex-col py-1'>
							<label>Short Name</label>
							<input
								type='text'
								name='TTshortname'
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.TTshortname}
								className='border p-1 rounded w-full hover:border-pink-500 duration-200'
							/>
							{errors.TTshortname && touched.TTshortname ? (
								<p className='text-red-500 text-xs '>{errors.TTshortname}</p>
							) : null}
						</div>
						<button
							className='border  w-full my-2 py-2 text-white bg-pink-500 rounded text-lg hover:bg-pink-400 duration-200'
							onClick={handleSub}
						>
							Add Ticket Type
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default TicketType;
