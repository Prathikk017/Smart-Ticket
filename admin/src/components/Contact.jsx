import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import Navbar from './Navbar';
import Footer from './Footer';

const Contact = () => {
	const form = useRef();

	const sendEmail = (e) => {
		e.preventDefault();

		emailjs
			.sendForm(
				'service_nj9qsw7',
				'template_n0akcpl',
				form.current,
				'LwmB9E8-ec1ORmYfU'
			)
			.then(
				(result) => {
					console.log(result.text);
					console.log('Message Sent');
					var form = document.getElementsByName('contact-form')[0];
					form.reset();
				},
				(error) => {
					console.log(error.text);
				}
			);
	};
	return (
		<div>
			<Navbar />
			<div className='flex items-center justify-center h-screen'>
				<form
					ref={form}
					name='contact-form'
					onSubmit={sendEmail}
					className='flex flex-col '
				>
					<label className='justify-center items-center mr-16 mt-1'>
						Name:
					</label>
					<input
						type='text'
						name='user_name'
						className='border rounded w-[300px] hover:border-pink-500 duration-200 p-1'
					/>
					<label className='justify-center items-center mr-16 mt-1'>
						Email:
					</label>
					<input
						type='email'
						name='user_email'
						className='border rounded w-[300px] hover:border-pink-500 duration-200 p-1'
					/>
					<label className='justify-center items-center mr-16 mt-1'>
						Phone:
					</label>
					<input
						type='number'
						name='user_phone'
						className='border rounded w-[300px] hover:border-pink-500 duration-200 p-1'
					/>
					<label className='justify-center items-center mr-16 mt-1'>
						Message:
					</label>
					<textarea
						name='message'
						className='border rounded w-[300px] hover:border-pink-500 duration-200 p-1'
					/>
					<input
						type='submit'
						value='Send'
						className='border w-full my-2 py-2 text-white bg-pink-500 rounded text-lg hover:bg-pink-400 duration-200 cursor-pointer'
					/>
				</form>
			</div>
			<div>
				<Footer />
			</div>
		</div>
	);
};

export default Contact;
