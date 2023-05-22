import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import Header from '../Header';
import login from '../../assets/login.jpg';
import { useFormik } from 'formik';
import axios from 'axios';
import { operRegisterSchema } from '../../schemas';

const initialValues = {
	OperName: '',
	OperShortName: '',
	OperEmail: '',
	OperPhone: '',
	OperGSTIN: '',
	OperAddr1: '',
	OperAddr2: '',
	OperPassword: '',
	OperCity: '',
	OperPincode: '',
	OperContactName: '',
	OperContactEmail: '',
};
const Register = () => {
	const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
		useFormik({
			initialValues: initialValues,
			validationSchema: operRegisterSchema,
			onSubmit: (values, action) => {
				console.log(values);
				action.resetForm();
			},
		});

	const [verfied, setVerifed] = useState(false);
	const [operid, setOperid] = useState('');
	const OperName = values.OperName;
	const OperShortName = values.OperShortName;
	const OperEmail = values.OperEmail;
	const OperPhone = values.OperPhone;
	const OperGSTIN = values.OperGSTIN;
	const OperAddr1 = values.OperAddr1;
	const OperAddr2 = values.OperAddr2;
	const OperPassword = values.OperPassword;
	const OperCity = values.OperCity;
	const OperPincode = values.OperPincode;
	const OperContactName = values.OperContactName;
	const OperContactEmail = values.OperContactEmail;
	const history = useNavigate();

	function onChanges(value) {
		setVerifed(true);
	}

	const getOperator = async () => {
		const res = await axios.get('https://lekpay.com/operator/readid');
		if (res.data.status === 201) {
			if (res.data.data === 0) {
				setOperid('0');
			}
			setOperid(res.data.data);
			return;
		} else {
			console.log('error');
		}
	};

	const handleSub = async (e) => {
		e.preventDefault();

		var OperId = operid;

		if (
			!OperName ||
			!OperShortName ||
			!OperEmail ||
			!OperPhone ||
			!OperGSTIN ||
			!OperAddr1 ||
			!OperAddr2 ||
			!OperPassword ||
			!OperCity ||
			!OperPincode ||
			!OperContactName ||
			!OperContactEmail
		) {
			alert('Fill the details');
			return;
		} else {
			const res = await axios.post(
				'https://lekpay.com/operator/operatorvalidate',
				{
					OperEmail,
					OperContactEmail,
				}
			);

			if (res.data.status === 201) {
				alert('User already Exist');
				return;
			} else {
				const res1 = await axios.post('https://lekpay.com/operator/create', {
					OperId,
					OperName,
					OperShortName,
					OperEmail,
					OperPhone,
					OperGSTIN,
					OperAddr1,
					OperAddr2,
					OperPassword,
					OperCity,
					OperPincode,
					OperContactName,
					OperContactEmail,
				});

				if (res1.data.status === 201) {
					alert('User Successfully Created');
					setTimeout(() => history('/signin'), 500);
				} else {
					alert('User unable to Register');
					return;
				}
			}
		}
	};

	useEffect(() => {
		getOperator();
	}, []);

	return (
		<div>
			<Header />
			<div className='grid grid-cols-1 sm:grid-cols-2 h-full w-full max-h-[100vh] overflow-y-auto'>
				<div className='py-4 flex flex-col justify-center items-center'>
					<form
						className='max-w-[500px] w-full mx-auto p-4'
						onSubmit={handleSubmit}
					>
						<h2 className='text-4xl text-pink-500 text-center py-6'>
							Register
						</h2>
						<div className='flex flex-row py-1'>
							<label className='justify-center items-center mr-4 mt-1'>
								Company Name:{' '}
							</label>
							<input
								type='text'
								name='OperName'
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.OperName}
								className='border rounded w-[70%] hover:border-pink-500 duration-200 p-1'
							/>
							{errors.OperName && touched.OperName ? (
								<p className='text-red-500 text-xs '>{errors.OperName}</p>
							) : null}
						</div>
						<div className='flex flex-row py-1'>
							<label className='justify-center items-center mr-11 mt-1'>
								Short Name:{' '}
							</label>
							<input
								type='text'
								name='OperShortName'
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.OperShortName}
								className='border rounded w-[70%] hover:border-pink-500 duration-200 p-1'
							/>
							{errors.OperShortName && touched.OperShortName ? (
								<p className='text-red-500 text-xs '>{errors.OperShortName}</p>
							) : null}
						</div>
						<div className='flex flex-row py-1'>
							<label className='justify-center items-center mr-5 mt-1'>
								Company Email:{' '}
							</label>
							<input
								type='email'
								name='OperEmail'
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.OperEmail}
								className='border rounded w-[70%] hover:border-pink-500 duration-200 p-1'
							/>
							{errors.OperEmail && touched.OperEmail ? (
								<p className='text-red-500 text-xs '>{errors.OperEmail}</p>
							) : null}
						</div>
						<div className='flex flex-row py-1'>
							<label className='justify-center items-center mr-14 mt-1'>
								Phone no:{' '}
							</label>
							<input
								type='number'
								name='OperPhone'
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.OperPhone}
								className='border rounded w-[70%] ml-1 hover:border-pink-500 duration-200 p-1'
							/>
							{errors.OperPhone && touched.OperPhone ? (
								<p className='text-red-500 text-xs '>{errors.OperPhone}</p>
							) : null}
						</div>
						<div className='flex flex-row py-1'>
							<label className=' justify-center items-center mr-7 mt-1'>
								Contact Name:{' '}
							</label>
							<input
								type='text'
								name='OperContactName'
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.OperContactName}
								className='border rounded w-[70%] hover:border-pink-500 duration-200 p-1'
							/>
							{errors.OperContactName && touched.OperContactName ? (
								<p className='text-red-500 text-xs '>
									{errors.OperContactName}
								</p>
							) : null}
						</div>
						<div className='flex flex-row py-1'>
							<label className='justify-center items-center mr-8 mt-1'>
								Contact Email:{' '}
							</label>
							<input
								type='email'
								name='OperContactEmail'
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.OperContactEmail}
								className='border rounded w-[70%] hover:border-pink-500 duration-200 p-1'
							/>
							{errors.OperContactEmail && touched.OperContactEmail ? (
								<p className='text-red-500 text-xs '>
									{errors.OperContactEmail}
								</p>
							) : null}
						</div>
						<div className='flex flex-row py-1'>
							<label className='justify-center items-center mr-20 mt-1'>
								GSTIN:{' '}
							</label>
							<input
								type='text'
								name='OperGSTIN'
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.OperGSTIN}
								className='border rounded w-[70%] ml-1 hover:border-pink-500 duration-200 p-1'
							/>
							{errors.OperGSTIN && touched.OperGSTIN ? (
								<p className='text-red-500 text-xs '>{errors.OperGSTIN}</p>
							) : null}
						</div>
						<div className='flex flex-row py-1'>
							<label className='justify-center items-center mr-16 mt-1'>
								Address1:{' '}
							</label>
							<input
								type='text'
								name='OperAddr1'
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.OperAddr1}
								className='border rounded w-[70%] hover:border-pink-500 duration-200 p-1'
							/>
							{errors.OperAddr1 && touched.OperAddr1 ? (
								<p className='text-red-500 text-xs '>{errors.OperAddr1}</p>
							) : null}
						</div>
						<div className='flex flex-row py-1'>
							<label className='justify-center items-center mr-16 mt-1'>
								Address2:{' '}
							</label>
							<input
								type='text'
								name='OperAddr2'
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.OperAddr2}
								className='border rounded w-[70%] hover:border-pink-500 duration-200 p-1'
							/>
							{errors.OperAddr2 && touched.OperAddr2 ? (
								<p className='text-red-500 text-xs '>{errors.OperAddr2}</p>
							) : null}
						</div>
						<div className='flex flex-row py-1'>
							<label className='justify-center items-center mr-16 mt-1'>
								Password:{' '}
							</label>
							<input
								type='password'
								name='OperPassword'
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.OperPassword}
								className='border rounded w-[70%] hover:border-pink-500 duration-200 p-1'
							/>
							{errors.OperPassword && touched.OperPassword ? (
								<p className='text-red-500 text-xs '>{errors.OperPassword}</p>
							) : null}
						</div>
						<div className='flex flex-row py-1'>
							<label className='justify-center items-center mr-24 mt-1'>
								City:{' '}
							</label>
							<input
								type='text'
								name='OperCity'
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.OperCity}
								className='border rounded w-[70%] ml-2 hover:border-pink-500 duration-200 p-1'
							/>
							{errors.OperCity && touched.OperCity ? (
								<p className='text-red-500 text-xs '>{errors.OperCity}</p>
							) : null}
						</div>
						<div className='flex flex-row py-1'>
							<label className='justify-center items-center mr-16 mt-1'>
								Pincode:{' '}
							</label>
							<input
								type='number'
								name='OperPincode'
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.OperPincode}
								className='border rounded w-[70%] ml-3 hover:border-pink-500 duration-200 p-1'
							/>
							{errors.OperPincode && touched.OperPincode ? (
								<p className='text-red-500 text-xs '>{errors.OperPincode}</p>
							) : null}
						</div>
						<div className='py-2 mx-auto'>
							<ReCAPTCHA
								sitekey='6Lfk3RsmAAAAABDeJtGUOUruyAp0o76ZI3IP8CrV'
								onChange={onChanges}
							/>
						</div>
						<button
							type='submit'
							className='border w-full my-2 py-2 mb-20 text-white bg-pink-500 rounded text-lg hover:bg-pink-400 duration-200'
							disabled={!verfied}
							onClick={handleSub}
						>
							Register
						</button>
					</form>
				</div>
				<div className='hidden sm:block mt-20'>
					<img src={login} alt='logo' className='w-[500px] h-[600px]' />
				</div>
			</div>
		</div>
	);
};

export default Register;
