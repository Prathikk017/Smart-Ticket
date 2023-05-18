import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useFormik } from 'formik';

import Sidebar from '../Admin/Sidebar';
import { adminRegisterSchema } from '../../../schemas/index';

const initialValues = {
	TTname: '',
	TTshortname: '',
};

const TicketType = () => {
	const history = useNavigate();
	const [ttDuration, setTtDuration] = useState([]);

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

		if (!TTname || !TTshortname || !ttDuration) {
			alert('Fill the details');
			return;
		} else {
			const res = await axios.post('https://lekpay.com/admin/tickettype', {
				TTname,
				TTshortname,
				ttDuration,
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

	const handleCheckboxChange = (e) => {
		const ticketValue = e.target.value;
		const isChecked = e.target.checked;
		if (isChecked) {
			setTtDuration([...ttDuration, ticketValue]);
			// console.log(ticketValue);
		} else {
			setTtDuration(ttDuration.filter((t) => t !== ticketValue));
		}
	};

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
							{errors.TTname && touched.TTname ? (
								<p className='text-red-500 text-xs '>{errors.TTname}</p>
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
						<div className='flex flex-col py-2'>
							<label>TT Duration:</label>
							<div className='grid grid-cols-3 gap-3 m-2'>
								<div className='flex items-center p-1'>
									<input
										type='checkbox'
										value='D2D'
										onChange={handleCheckboxChange}
										className='mr-1'
									/>
									<label>Date-to-Date</label>
								</div>
								<div className='flex items-center p-1'>
									<input
										type='checkbox'
										value='TW'
										onChange={handleCheckboxChange}
										className='mr-1'
									/>
									<label>This Week</label>
								</div>
								<div className='flex items-center p-1'>
									<input
										type='checkbox'
										value='TM'
										onChange={handleCheckboxChange}
										className='mr-1'
									/>
									<label>This Month</label>
								</div>
								<div className='flex items-center p-1'>
									<input
										type='checkbox'
										value='QY'
										onChange={handleCheckboxChange}
										className='mr-1'
									/>
									<label>Quarter Year</label>
								</div>
								<div className='flex items-center p-1'>
									<input
										type='checkbox'
										value='HY'
										onChange={handleCheckboxChange}
										className='mr-1'
									/>
									<label>Half Year</label>
								</div>
								<div className='flex items-center p-1'>
									<input
										type='checkbox'
										value='TY'
										onChange={handleCheckboxChange}
										className='mr-1'
									/>
									<label>This Year</label>
								</div>
							</div>
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
