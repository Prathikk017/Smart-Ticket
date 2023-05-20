import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Banner from '../assets/Banner.png';

const Home = () => {
	return (
		<div>
			<Navbar />
			<div className='w-full'>
				<img className='w-full pt-12 h-screen' src={Banner} alt='/' />
			</div>
			<Footer />
		</div>
	);
};

export default Home;
