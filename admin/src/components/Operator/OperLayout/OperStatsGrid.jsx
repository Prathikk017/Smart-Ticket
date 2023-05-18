import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdOutlineDirectionsBusFilled } from 'react-icons/md';
import { BiRupee } from 'react-icons/bi';
import { IoPeople, IoPieChart } from 'react-icons/io5';
import { BsFillXDiamondFill } from 'react-icons/bs';
import { TbRoute } from 'react-icons/tb';
import axios from 'axios';

const OperStatsGrid = () => {
	const history = useNavigate();
	// total asset data
	const [data, setData] = useState('');
	//total employee data
	const [data1, setData1] = useState('');
	//total stage data
	const [data2, setData2] = useState('');
	//total route data
	const [data3, setData3] = useState('');
	//total asset active data
	const [data4, setData4] = useState('');
	//total transaction data
	const [data5, setData5] = useState('');
	//total Passengers data
	const [data6, setData6] = useState('');
	//total employee active data
	const [data7, setData7] = useState('');
	//total route active data
	const [data8, setData8] = useState('');

	//get date value
	const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

	const setdata = (e) => {
		const selectedDate = e.target.value;
		setDate(selectedDate);
		getPassengersData(selectedDate);
		getAstActiveData(selectedDate);
		getEmpActiveData(selectedDate);
		getRutActiveData(selectedDate);
	};

	const ID = window.localStorage.getItem('OperID');
	var operId = JSON.parse(ID);

	const getAstData = async () => {
		const res = await axios.post('https://lekpay.com/operator/readast', {
			operId,
		});
		if (res.data.status === 201) {
			setData(res.data.data);
		} else {
			console.log('error');
		}
	};
	const getAstActiveData = async (selectedDate) => {
		const res = await axios.post('https://lekpay.com/operator/readastactive', {
			operId,
			date: selectedDate,
		});
		if (res.data.status === 201) {
			setData4(res.data.data);
		} else {
			console.log('error');
		}
	};

	const getEmpActiveData = async (selectedDate) => {
		const res = await axios.post('https://lekpay.com/employee/readempactive', {
			operId,
			date: selectedDate,
		});
		if (res.data.status === 201) {
			setData7(res.data.data);
		} else {
			console.log('error');
		}
	};

	const getPassengersData = async (selectedDate) => {
		const res = await axios.post('https://lekpay.com/operator/readpassengers', {
			operId,
			date: selectedDate,
		});
		if (res.data.status === 201) {
			setData6(res.data.Passengers);
		} else {
			console.log('error');
		}
	};

	const getRutActiveData = async (selectedDate) => {
		const res = await axios.post('https://lekpay.com/operator/readrutactive', {
			operId,
			date: selectedDate,
		});
		if (res.data.status === 201) {
			setData8(res.data.data);
		} else {
			console.log('error');
		}
	};

	const getEmpData = async () => {
		const res = await axios.post('https://lekpay.com/employee/reademp', {
			operId,
		});
		if (res.data.status === 201) {
			setData1(res.data.data);
		} else {
			console.log('error');
		}
	};

	const getStgData = async () => {
		const res = await axios.post('https://lekpay.com/operator/readstg', {
			operId,
		});
		if (res.data.status === 201) {
			setData2(res.data.data);
		} else {
			console.log('error');
		}
	};

	const getRutData = async () => {
		const res = await axios.post('https://lekpay.com/operator/readrut', {
			operId,
		});
		if (res.data.status === 201) {
			setData3(res.data.data);
		} else {
			console.log('error');
		}
	};

	const getTransactionsData = async () => {
		const res = await axios.post(
			'https://lekpay.com/operator/readtransaction',
			{
				operId,
			}
		);
		if (res.data.status === 201) {
			setData5(res.data.data);
		} else {
			console.log('error');
		}
	};
	//Navigate to particular table
	const handleClick = () => {
		history('/astview');
	};
	const handleClick1 = () => {
		history('/empview');
	};
	const handleClick2 = () => {
		history('/stgview');
	};
	const handleClick3 = () => {
		history('/rutview');
	};
	const handleClick4 = () => {
		history('/transactionasset');
	};

	useEffect(() => {
		getAstActiveData(date);
		getEmpActiveData(date);
		getPassengersData(date);
		getRutActiveData(date);
	}, []);
	// useEffect(() => {
	//   // run function every 1 minute
	//   const intervalId = setInterval(() => {
	//     getTransactionsData();
	//     getAstActiveData();
	//     getEmpActiveData();
	//     getRutActiveData();
	//   }, 10000);

	//   // clear the interval when the component unmounts
	//   return () => clearInterval(intervalId);
	// }, [operId, date]);

	useEffect(() => {
		const token = window.localStorage.getItem('Lekpay');
		const Token = JSON.parse(token);
		if (!Token) {
			history('/');
		} else {
			getAstData();
			getEmpData();
			getStgData();
			getRutData();
			getTransactionsData();
		}
	}, []);

	return (
		<div className='flex flex-col'>
			<div className='flex-row my-4 h-4 w-max  justify-center items-center'>
				<label className='mr-2'>Date:</label>
				<input
					type='date'
					value={date}
					onChange={setdata}
					className='border-gray-200 shadow-md shadow-gray-200 rounded-md p-1 outline-none'
					max={new Date().toISOString().split('T')[0]}
				/>
			</div>
			<div className='grid lg:grid-cols-4 md:grid-cols-3 gap-6 md:w-[98%] w-[20rem] mt-4 ml-0 '>
				<BoxWrapper>
					<div
						className='rounded-full h-10 w-10 flex items-center justify-center bg-sky-400 cursor-pointer'
						onClick={handleClick}
					>
						<MdOutlineDirectionsBusFilled
							className='text-2xl text-white '
							style={{ color: 'white' }}
						/>
					</div>
					<div className='pl-4 cursor-pointer' onClick={handleClick}>
						<span className='text-sm text-gray-500 font-medium'>
							Total Assets
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
						className='rounded-full h-10 w-10 flex items-center justify-center bg-yellow-400 cursor-pointer'
						onClick={handleClick1}
					>
						<IoPeople
							className='text-2xl text-black'
							style={{ color: 'white' }}
						/>
					</div>
					<div className='pl-4 cursor-pointer' onClick={handleClick1}>
						<span className='text-sm text-gray-500 font-medium'>
							Total Employee
						</span>
						<div className='flex items-center'>
							<strong className='text-xl text-gray-700 font-semibold'>
								{data1.length}
							</strong>
						</div>
					</div>
				</BoxWrapper>
				<BoxWrapper>
					<div className='rounded-full h-10 w-10 flex items-center justify-center bg-orange-600 cursor-pointer'>
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
								{data5}
							</strong>
						</div>
					</div>
				</BoxWrapper>
				<BoxWrapper>
					<div
						className='rounded-full h-10 w-10 flex items-center justify-center bg-teal-500 cursor-pointer'
						onClick={handleClick2}
					>
						<BsFillXDiamondFill
							className='text-2xl text-white '
							style={{ color: 'white' }}
						/>
					</div>
					<div className='pl-4 cursor-pointer' onClick={handleClick2}>
						<span className='text-sm text-gray-500 font-medium'>
							Total Stages
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
						className='rounded-full h-10 w-10 flex items-center justify-center bg-blue-600 cursor-pointer'
						onClick={handleClick3}
					>
						<TbRoute
							className='text-2xl text-white '
							style={{ color: 'white' }}
						/>
					</div>
					<div className='pl-4 cursor-pointer' onClick={handleClick3}>
						<span className='text-sm text-gray-500 font-medium'>
							Total Routes
						</span>
						<div className='flex items-center'>
							<strong className='text-xl text-gray-700 font-semibold'>
								{data3.length}
							</strong>
						</div>
					</div>
				</BoxWrapper>
				<BoxWrapper>
					<div className='rounded-full h-10 w-10 flex items-center justify-center bg-indigo-400 cursor-pointer'>
						<IoPeople
							className='text-2xl text-black'
							style={{ color: 'white' }}
						/>
					</div>
					<div className='pl-4 cursor-pointer'>
						<span className='text-sm text-gray-500 font-medium'>
							Total Passengers
						</span>
						<div className='flex items-center'>
							<strong className='text-xl text-gray-700 font-semibold'>
								{data6}
							</strong>
						</div>
					</div>
				</BoxWrapper>
				<BoxWrapper>
					<div className='rounded-full h-10 w-10 flex items-center justify-center bg-green-600 cursor-pointer'>
						<MdOutlineDirectionsBusFilled
							className='text-2xl text-black'
							style={{ color: 'white' }}
						/>
					</div>
					<div className='pl-4 cursor-pointer'>
						<span className='text-sm text-gray-500 font-medium'>
							Active Asset
						</span>
						<div className='flex items-center'>
							<strong className='text-xl text-gray-700 font-semibold'>
								{data4.length}
							</strong>
						</div>
					</div>
				</BoxWrapper>
				<BoxWrapper>
					<div className='rounded-full h-10 w-10 flex items-center justify-center bg-green-600 cursor-pointer'>
						<IoPeople
							className='text-2xl text-black'
							style={{ color: 'white' }}
						/>
					</div>
					<div className='pl-4 cursor-pointer'>
						<span className='text-sm text-gray-500 font-medium'>
							Active Employee
						</span>
						<div className='flex items-center'>
							<strong className='text-xl text-gray-700 font-semibold'>
								{data7.length}
							</strong>
						</div>
					</div>
				</BoxWrapper>
				<BoxWrapper>
					<div className='rounded-full h-10 w-10 flex items-center justify-center bg-green-600 cursor-pointer'>
						<TbRoute
							className='text-2xl text-black'
							style={{ color: 'white' }}
						/>
					</div>
					<div className='pl-4 cursor-pointer'>
						<span className='text-sm text-gray-500 font-medium'>
							Active Route
						</span>
						<div className='flex items-center'>
							<strong className='text-xl text-gray-700 font-semibold'>
								{data8.length}
							</strong>
						</div>
					</div>
				</BoxWrapper>
			</div>
		</div>
	);
};

export default OperStatsGrid;

function BoxWrapper({ children }) {
	return (
		<div className='bg-white rounded-sm py-3 px-2 flex-1 border border-gray-200 flex items-center shadow-md shadow-gray-200'>
			{children}
		</div>
	);
}
