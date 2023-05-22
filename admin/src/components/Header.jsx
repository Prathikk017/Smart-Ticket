import React from 'react';
import logo from '../assets/logo.jpg';
const Header = () => {
	return (
		<nav className='flex items-center justify-between py-4 h-[55px] w-full fixed bg-white'>
			<a href='/'>
				<div className='flex items-center justify-between'>
					<img
						className='w-[50px] ml-2 rounded-r-full rounded-l-full'
						src={logo}
						alt='LOGO'
					/>
					<h1 className='text-2xl ml-2'>LEKPAY</h1>
				</div>
			</a>
		</nav>
	);
};

export default Header;
