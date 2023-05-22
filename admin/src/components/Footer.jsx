import React from 'react';
import { BsFacebook } from 'react-icons/bs';
import { FaLinkedinIn } from 'react-icons/fa';
import { FiInstagram } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Footer = () => {
	return (
		<div className='fixed bottom-0 z-25 shadow-lg px-8 pt-2 pb-1 h-auto w-full flex justify-center items-center text-white bg-black'>
			<div className='flex flex-col items-center'>
				<div className='flex gap-8'>
					<a href='' target='_blank'>
						<BsFacebook size={18} />
					</a>
					<a href='' target='_blank'>
						<FaLinkedinIn size={18} />
					</a>
					<a href='' target='_blank'>
						<FiInstagram size={18} />
					</a>
				</div>
				<p className='text-md'>
					&#169; 2023 LEKPAY. All Rights Reserved | Designed by Powaha Infotech
					Pvt Ltd
				</p>
				<div className='flex gap-4 text-md'>
					<Link to='/privacypolicy'>Privacy Policy</Link>
					<p>|</p>
					<Link to='/termsandconditions'>Terms & Conditions</Link>
					<p>|</p>
					<Link to='/refundandcancellations'>Refund & Cancellation</Link>
				</div>
			</div>
		</div>
	);
};

export default Footer;
