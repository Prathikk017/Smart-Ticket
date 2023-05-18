import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useFormik } from 'formik';
import Opersidebar from '../Opersidebar';
import { empRegisterSchema } from '../../../schemas/index';
import useIdleTimeout from '../../../useIdleTimeout';

const initialValues = {
	EmpName: '',
	EmpIntId: '',
	EmpPhone: '',
	EmpAadhar: '',
	EmpAddr1: '',
	EmpAddr2: '',
	EmpCity: '',
	EmpPincode: '',
};

const Empregister = () => {
	const [EmpDOB, setEmpDOB] = useState('');
	const [EmpType, setEmpType] = useState('');
	const history = useNavigate();

	const ID = window.localStorage.getItem('OperID');
	var operId = JSON.parse(ID);

	const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
		useFormik({
			initialValues: initialValues,
			validationSchema: empRegisterSchema,
			onSubmit: (values, action) => {
				console.log(values);
				action.resetForm();
			},
		});

	const EmpName = values.EmpName;
	const EmpIntId = values.EmpIntId;
	const EmpMobile = values.EmpPhone;
	const EmpAadhar = values.EmpAadhar;
	const EmpAddr1 = values.EmpAddr1;
	const EmpAddr2 = values.EmpAddr2;
	const EmpCity = values.EmpCity;
	const EmpPincode = values.EmpPincode;

	// function
	const setData = (e) => {
		setEmpDOB(e.target.value);
	};
	const setData1 = (e) => {
		setEmpType(e.target.value);
	};

	const handleSub = async (e) => {
		e.preventDefault();

		if (
			!EmpName ||
			!EmpIntId ||
			!EmpDOB ||
			!EmpType ||
			!EmpMobile ||
			!EmpAadhar ||
			!EmpAddr1 ||
			!EmpAddr2 ||
			!EmpCity ||
			!EmpPincode
		) {
			alert('Fill the details');
			return;
		} else {
			const res = await axios.post('https://lekpay.com/employee/create', {
				EmpName,
				EmpIntId,
				EmpDOB,
				EmpType,
				EmpMobile,
				EmpAadhar,
				EmpAddr1,
				EmpAddr2,
				EmpCity,
				EmpPincode,
				operId,
			});
			if (res.data.status === 201) {
				alert('Employee successfully created');
				setTimeout(() => history('/Operdashboard'), 500);
				return;
			} else {
				alert('Employee unable to register');
				return;
			}
		}
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
			history('/');
		}
	}, [isIdle, history]);

	useEffect(() => {
		const token = window.localStorage.getItem('Lekpay');
		const Token = JSON.parse(token);
		if (!Token) {
			history('/');
		}
	}, []);

	return (
		<div className='flex flex-row gap-4'>
			<Opersidebar />
			<div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-[90%] max-h-[100vh] overflow-y-auto mx-auto'>
				<div className='py-2 flex flex-col justify-center items-center'>
					<form
						className='max-w-[400px] w-full mx-auto text-sm flex-row'
						onSubmit={handleSubmit}
					>
						<h2 className='text-3xl text-pink-500 text-center py-2'>
							Employee Register
						</h2>
						<div className='flex flex-col py-1'>
							<label>Employee Name</label>
							<input
								type='text'
								name='EmpName'
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.EmpName}
								className='border p-1 rounded w-full hover:border-pink-500 duration-200'
							/>
							{errors.EmpName && touched.EmpName ? (
								<p className='text-red-500 text-xs '>{errors.EmpName}</p>
							) : null}
						</div>
						<div className='flex flex-col py-1'>
							<label>Employee Id</label>
							<input
								type='text'
								name='EmpIntId'
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.EmpIntId}
								className='border p-1 rounded w-full hover:border-pink-500 duration-200'
							/>
							{errors.EmpIntId && touched.EmpIntId ? (
								<p className='text-red-500 text-xs '>{errors.EmpIntId}</p>
							) : null}
						</div>
						<div className='flex flex-col py-1'>
							<label>Date of birth</label>
							<input
								type='date'
								onChange={setData}
								className='border p-1 rounded w-full hover:border-pink-500 duration-200'
							/>
						</div>
						<div className='flex flex-col py-1'>
							<label>Employee Type</label>
							<select
								className='border p-1 rounded w-full hover:border-pink-500 duration-200'
								onChange={setData1}
							>
								<option>Select Type</option>
								<option value='Conductor'>Conductor</option>
								<option value='Checker'>Checker</option>
								<option value='Depo Manager'>Depo Manager</option>
							</select>
						</div>
						<div className='flex flex-col py-1'>
							<label>Phone no</label>
							<input
								type='number'
								name='EmpPhone'
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.EmpPhone}
								className='border p-1 rounded w-full hover:border-pink-500 duration-200'
							/>
							{errors.EmpPhone && touched.EmpPhone ? (
								<p className='text-red-500 text-xs '>{errors.EmpPhone}</p>
							) : null}
						</div>
						<div className='flex flex-col py-1'>
							<label>Aadhar Number</label>
							<input
								type='number'
								name='EmpAadhar'
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.EmpAadhar}
								className='border p-1 rounded w-full hover:border-pink-500 duration-200'
							/>
							{errors.EmpAadhar && touched.EmpAadhar ? (
								<p className='text-red-500 text-xs '>{errors.EmpAadhar}</p>
							) : null}
						</div>
						<div className='flex flex-col py-1'>
							<label>Address 1</label>
							<input
								type='text'
								name='EmpAddr1'
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.EmpAddr1}
								className='border p-1 rounded w-full hover:border-pink-500 duration-200'
							/>
							{errors.EmpAddr1 && touched.EmpAddr1 ? (
								<p className='text-red-500 text-xs '>{errors.EmpAddr1}</p>
							) : null}
						</div>
						<div className='flex flex-col py-1'>
							<label>Address 2</label>
							<input
								type='text'
								name='EmpAddr2'
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.EmpAddr2}
								className='border p-1 rounded w-full hover:border-pink-500 duration-200'
							/>
							{errors.EmpAddr2 && touched.EmpAddr2 ? (
								<p className='text-red-500 text-xs '>{errors.EmpAddr2}</p>
							) : null}
						</div>
						<div className='flex flex-col py-1'>
							<label>City</label>
							<input
								type='text'
								name='EmpCity'
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.EmpCity}
								className='border p-1 rounded w-full hover:border-pink-500 duration-200'
							/>
							{errors.EmpCity && touched.EmpCity ? (
								<p className='text-red-500 text-xs '>{errors.EmpCity}</p>
							) : null}
						</div>
						<div className='flex flex-col py-1'>
							<label>Pincode</label>
							<input
								type='number'
								name='EmpPincode'
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.EmpPincode}
								className='border p-1 rounded w-full hover:border-pink-500 duration-200'
							/>
							{errors.EmpPincode && touched.EmpPincode ? (
								<p className='text-red-500 text-xs '>{errors.EmpPincode}</p>
							) : null}
						</div>
						<button
							className='border  w-full my-2 py-2 text-white bg-pink-500 rounded text-lg hover:bg-pink-400 duration-200'
							onClick={handleSub}
						>
							Register
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Empregister;
