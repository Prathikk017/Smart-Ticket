import React, { useEffect, useState } from 'react';
import Header from './Header';
import login from '../assets/login.jpg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
	const [mobile, setMobile] = useState('');
	const [otp, setOtp] = useState('');
	const [passowrd, SetPassword] = useState('');
	const [ID, setID] = useState('');
	const [Flag, setFlag] = useState('');

	const history = useNavigate();
	//function
	const setData = (e) => {
		setMobile(e.target.value);
	};
	const setData1 = (e) => {
		setOtp(e.target.value);
	};

	const setData2 = (e) => {
		SetPassword(e.target.value);
	};

	const handleClick = async (e) => {
		e.preventDefault();
		const res = await axios.post('https://lekpay.com/operator/verifyuser', {
			mobile,
		});
		if (res.data.status === 201) {
			setID(res.data.data.ID);
			setFlag(res.data.data.Flag);
			alert(`Otp send to phone number ${mobile}`);
		}
		if (res.data.status === 400) {
			alert("User doesn't exist");
			var form = document.getElementsByName('contact-form')[0];
			form.reset();
		}
	};

	//function to submit
	const handleSub = async (e) => {
		e.preventDefault();
		if (otp === '1100') {
			const res1 = await axios.patch(
				'https://lekpay.com/operator/changepassword',
				{
					passowrd,
					ID,
					Flag,
				}
			);
			if (res1.data.status === 201) {
				alert('Password changed successfully');
				history('/sigin');
				return;
			} else {
				console.log('error');
			}
		}
	};

	return (
		<>
			<Header />
			<div className='grid grid-cols-1 sm:grid-cols-2 h-full w-full'>
				<div className='flex flex-col justify-center'>
					<form
						className='max-w-[400px] w-full mx-auto p-4  rounded-md'
						name='contact-form'
					>
						<h2 className='text-4xl text-pink-500 text-center py-6'>
							Reset Password
						</h2>
						<div className='flex flex-col py-2'>
							<label>Phone Number</label>
							<input
								type='text'
								name='phoneNumber'
								value={mobile}
								className='border rounded p-2 hover:border-pink-400 duration-200'
								onChange={setData}
							/>
							<button
								className='py-2 px-3 bg-gray-200 w-min m-2 rounded-md hover:bg-pink-200 duration-200'
								onClick={handleClick}
							>
								Verify
							</button>
						</div>
						<div className='flex flex-col py-2'>
							<label>Enter OTP</label>
							<input
								type='number'
								name='otp'
								value={otp}
								onChange={setData1}
								className='border rounded p-2 hover:border-pink-400 duration-200'
							/>
						</div>
						<div className='flex flex-col py-2'>
							<label>Enter New Password</label>
							<input
								type='password'
								id='password'
								value={passowrd}
								onChange={setData2}
								className='border  rounded p-2 hover:border-pink-400 duration-200'
							/>
						</div>
						<button
							className='border w-full my-5 py-2 text-white bg-pink-500 rounded text-lg hover:bg-pink-400 duration-200'
							onClick={handleSub}
						>
							Submit
						</button>
					</form>
				</div>
				<div className='hidden sm:block  mt-16'>
					<img src={login} alt='logo' className='w-[500px] h-[500px]' />
				</div>
			</div>
		</>
	);
};

export default ForgotPassword;
