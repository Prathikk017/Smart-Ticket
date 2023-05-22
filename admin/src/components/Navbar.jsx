import React from 'react';
import logo from '../assets/logo.jpg';

const Navbar = () => {
	return (
		<div className='fixed px-8 py-4 z-25 shadow-lg text-xl bg-white flex flex-row justify-between items-center h-[47px] w-full'>
			<a href='/'>
				<div className='flex items-center justify-between gap-4'>
					<img
						className='w-[40px] ml-2 rounded-r-full rounded-l-full'
						src={logo}
						alt='LOGO'
					/>
					<div>LEKPAY</div>
				</div>
			</a>
			<div>
				<ul className='flex flex-row gap-6'>
					<li className='text-lg p-2 hover:cursor-pointer hover:underline duration-200'>
						<a href='/signin'>Login</a>
					</li>
					<li className='text-lg p-2 hover:cursor-pointer hover:underline duration-200'>
						FAQ's
					</li>
					<li className='text-lg p-2 hover:cursor-pointer hover:underline duration-200'>
						Contact Us
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Navbar;
