import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useFormik } from 'formik';

import Sidebar from './Sidebar';
import { adminRegisterSchema } from '../schemas';

const initialValues = {
	Aname: '',
	Amobile: '',
	Aemail: '',
	Apassword: '',
};

const AdmiCreate = () => {
	const [Agender, setAgender] = useState('');
	const [ADoB, setADoB] = useState('');
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

	const Aname = values.Aname;
	const Amobile = values.Amobile;
	const Aemail = values.Aemail;
	const Apassword = values.Apassword;

	// function
	const setADoBData = (e) => {
		setADoB(e.target.value);
	};
	const setAgenderData = (e) => {
		setAgender(e.target.value);
	};

	const handleSub = async (e) => {
		e.preventDefault();

		if (!Aname || !Amobile || !ADoB || !Agender || !Aemail || !Apassword) {
			alert('Fill the details');
			return;
		} else {
			const res = await axios.post('http://localhost:8004/admin/create', {
				Aname,
				Amobile,
				ADoB,
				Agender,
				Aemail,
				Apassword,
			});
			if (res.data.status === 201) {
				alert('Admin successfully created');
				setTimeout(() => history('/admin/dashboard'), 500);
				return;
			} else {
				alert('Admin unable to register');
				return;
			}
		}
	};

	return (
		<div className='flex flex-row gap-4'>
			<Sidebar />
			<div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-[90%] max-h-[100vh] overflow-y-auto mx-auto'>
				<div className='py-2 flex flex-col justify-center items-center'>
					<form
						className='max-w-[400px] w-full mx-auto text-sm flex-row'
						onSubmit={handleSubmit}
					>
						<h2 className='text-3xl text-pink-500 text-center py-2'>
							Admin Register
						</h2>
						<div className='flex flex-col py-1'>
							<label>Admin Name</label>
							<input
								type='text'
								name='Aname'
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.Aname}
								className='border p-1 rounded w-full hover:border-pink-500 duration-200'
							/>
							{errors.Aname && touched.Aname ? (
								<p className='text-red-500 text-xs '>{errors.Aname}</p>
							) : null}
						</div>
						<div className='flex flex-col py-1'>
							<label>Phone no</label>
							<input
								type='number'
								name='Amobile'
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.Amobile}
								className='border p-1 rounded w-full hover:border-pink-500 duration-200'
							/>
							{errors.Amobile && touched.Amobile ? (
								<p className='text-red-500 text-xs '>{errors.Amobile}</p>
							) : null}
						</div>
						<div className='flex flex-col py-1'>
							<label>Gender</label>
							<select
								className='border p-1 rounded w-full hover:border-pink-500 duration-200'
								onChange={setAgenderData}
							>
								<option>Select Type</option>
								<option value='Male'>Male</option>
								<option value='Female'>Female</option>
								<option value='Others'>Others</option>
							</select>
						</div>
						<div className='flex flex-col py-1'>
							<label>Date of birth</label>
							<input
								type='date'
								onChange={setADoBData}
								className='border p-1 rounded w-full hover:border-pink-500 duration-200'
							/>
						</div>
						<div className='flex flex-col py-1'>
							<label>Email</label>
							<input
								type='email'
								name='Aemail'
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.Aemail}
								className='border rounded w-full hover:border-pink-500 duration-200 p-1'
							/>
							{errors.Aemail && touched.Aemail ? (
								<p className='text-red-500 text-xs '>{errors.Aemail}</p>
							) : null}
						</div>
						<div className='flex flex-col py-1'>
							<label>Password</label>
							<input
								type='password'
								name='Apassword'
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.Apassword}
								className='border rounded w-full hover:border-pink-500 duration-200 p-1'
							/>
							{errors.Apassword && touched.Apassword ? (
								<p className='text-red-500 text-xs '>{errors.Apassword}</p>
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

export default AdmiCreate;
