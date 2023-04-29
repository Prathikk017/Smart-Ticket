import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdOutlineDirectionsBusFilled } from 'react-icons/md';
import { BiRupee } from 'react-icons/bi';
import { IoPeople, IoPieChart } from 'react-icons/io5';
import { BsFillXDiamondFill } from 'react-icons/bs';
import axios from 'axios';
const StatsGrid = () => {
	const history = useNavigate();

	// total operators data
	const [data, setData] = useState('');

	const getOperatorsData = async () => {
		const res = await axios.get('http://localhost:8004/admin/operators');
		if (res.data.status === 201) {
			console.log(res.data.data);
			setData(res.data.data);
		} else {
			console.log('error');
		}
	};

	const handleClick = () => {
		history('/admin/operatorsview');
	};

	useEffect(() => {
		const token = window.localStorage.getItem('Lekpay');
		const Token = JSON.parse(token);
		if (!Token) {
			history('/');
		} else {
			getOperatorsData();
		}
	}, []);
	return (
		<div className='grid md:grid-cols-3 gap-4 w-[98%] lg:grid-cols-4 gap-4 w-[98%] mt-4 ml-0 '>
			{data.length > 0
				? data.map((el, i) => {
						return (
							<>
								<BoxWrapper>
									<div
										className='rounded-full h-12 w-12 flex items-center justify-center bg-pink-400 cursor-pointer'
										onClick={handleClick}
									>
										<IoPeople
											className='text-2xl text-black'
											style={{ color: 'white' }}
										/>
									</div>
									<div className='pl-4 cursor-pointer' onClick={handleClick}>
										<span className='text-sm text-gray-500 font-medium'>
											OP {el.Num}
										</span>
										<div className='flex items-center'>
											<strong className='text-xl text-gray-700 font-semibold'>
												{el.OperShortName}
											</strong>
										</div>
									</div>
								</BoxWrapper>
							</>
						);
				  })
				: ' '}
		</div>
	);
};

export default StatsGrid;

function BoxWrapper({ children }) {
	return (
		<div className='bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center shadow-md shadow-gray-200'>
			{children}
		</div>
	);
}
