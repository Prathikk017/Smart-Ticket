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
	//total employees data
	const [data1, setData1] = useState('');
	//total users data
	const [data2, setData2] = useState('');
	// total assets data
	const [data3, setData3] = useState('');
	// total transaction data
	const [data4, setData4] = useState('');

	const getOperatorsData = async () => {
		const res = await axios.get('https://lekpay.com/admin/operators');
		if (res.data.status === 201) {
			setData(res.data.data);
		} else {
			console.log('error');
		}
	};

	const getEmployeesData = async () => {
		const res = await axios.get('https://lekpay.com/admin/employees');
		if (res.data.status === 201) {
			setData1(res.data.data);
		} else {
			console.log('error');
		}
	};

	const getAssetsData = async () => {
		const res = await axios.get('https://lekpay.com/admin/assets');
		if (res.data.status === 201) {
			setData2(res.data.data);
		} else {
			console.log('error');
		}
	};

	const getUsersData = async () => {
		const res = await axios.get('https://lekpay.com/admin/users');
		if (res.data.status === 201) {
			setData3(res.data.data);
		} else {
			console.log('error');
		}
	};

	const getTransactionData = async () => {
		const res = await axios.get('https://lekpay.com/admin/readalltransaction');
		if (res.data.status === 201) {
			setData4(res.data.data);
		} else {
			console.log('error');
		}
	};
	const handleClick = () => {
		history('/admin/singleoperstats');
	};
	const handleClick1 = () => {
		history('/admin/singleemployee');
	};
	const handleClick2 = () => {
		history('/admin/singleassets');
	};
	const handleClick3 = () => {
		history('/admin/usersview');
	};
	const handleClick4 = () => {
		history('/admin/singleoperator');
	};
	useEffect(() => {
		const token = window.localStorage.getItem('Lekpay');
		const Token = JSON.parse(token);
		if (!Token) {
			history('/signin');
		} else {
			getOperatorsData();
			getEmployeesData();
			getAssetsData();
			getUsersData();
			getTransactionData();
		}
	}, []);
	return (
		<div className='grid md:grid-cols-3 gap-4 w-[98%] lg:grid-cols-4 gap-4 lg:w-[98%] mt-4 ml-0 '>
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
						Total No. Of Operators
					</span>
					<div className='flex items-center'>
						<strong className='text-xl text-gray-700 font-semibold'>
							{data.length}
						</strong>
					</div>
				</div>
			</BoxWrapper>
			<BoxWrapper>
				<div
					className='rounded-full h-12 w-12 flex items-center justify-center bg-yellow-400 cursor-pointer'
					onClick={handleClick1}
				>
					<IoPeople
						className='text-2xl text-black'
						style={{ color: 'white' }}
					/>
				</div>
				<div className='pl-4 cursor-pointer' onClick={handleClick1}>
					<span className='text-sm text-gray-500 font-medium'>
						Total No. Of Employees
					</span>
					<div className='flex items-center'>
						<strong className='text-xl text-gray-700 font-semibold'>
							{data1.length}
						</strong>
					</div>
				</div>
			</BoxWrapper>
			<BoxWrapper>
				<div
					className='rounded-full h-12 w-12 flex items-center justify-center bg-sky-400 cursor-pointer'
					onClick={handleClick2}
				>
					<MdOutlineDirectionsBusFilled
						className='text-2xl text-white '
						style={{ color: 'white' }}
					/>
				</div>
				<div className='pl-4 cursor-pointer' onClick={handleClick2}>
					<span className='text-sm text-gray-500 font-medium'>
						Total No. Of Assets
					</span>
					<div className='flex items-center'>
						<strong className='text-xl text-gray-700 font-semibold'>
							{data2.length}
						</strong>
					</div>
				</div>
			</BoxWrapper>
			<BoxWrapper>
				<div
					className='rounded-full h-12 w-12 flex items-center justify-center bg-teal-600 cursor-pointer'
					onClick={handleClick3}
				>
					<BsFillXDiamondFill
						className='text-2xl text-white '
						style={{ color: 'white' }}
					/>
				</div>
				<div className='pl-4 cursor-pointer' onClick={handleClick3}>
					<span className='text-sm text-gray-500 font-medium'>
						Total No. Of Users
					</span>
					<div className='flex items-center'>
						<strong className='text-xl text-gray-700 font-semibold'>
							{data3.length}
						</strong>
					</div>
				</div>
			</BoxWrapper>
			<BoxWrapper>
				<div className='rounded-full h-12 w-12 flex items-center justify-center bg-orange-600 cursor-pointer'>
					<IoPieChart
						className='text-2xl text-black'
						style={{ color: 'white' }}
					/>
				</div>
				<div className='pl-4 cursor-pointer' onClick={handleClick4}>
					<span className='text-sm text-gray-500 font-medium'>
						Total Transactions
					</span>
					<div className='flex items-center'>
						<span>
							<BiRupee size={19} className='mt-1' />
						</span>
						<strong className='text-xl text-gray-700 font-semibold'>
							{data4}
						</strong>
					</div>
				</div>
			</BoxWrapper>
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
