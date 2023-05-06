import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { IoPeople} from 'react-icons/io5';
import axios from 'axios';

const EmployeeCard = () => {
    const history = useNavigate();

	// total operators data
	const [data, setData] = useState('');

	//total assets for operator
	const [data1, setData1] = useState('');

	const getOperatorsData = async () => {
		const res = await axios.get('http://localhost:8004/admin/operators');
		if (res.data.status === 201) {
			setData(res.data.data);
		} else {
			console.log('error');
		}
	};

	const handleClick = async(OperId) => {

		history(`/admin/operator/employee/${OperId}`);
	//    const res = await axios.post('http://localhost:8004/admin/operator/assets',{
	// 	OperId
	//    })
	//    if(res.data.status === 201){
	// 	setData1(res.data.data);
	//    }
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
										key={i}
									>
										<IoPeople
											className='text-2xl text-black'
											style={{ color: 'white' }}
										/>
									</div>
									<div className='pl-4 cursor-pointer' onClick={() =>handleClick(el.OperId)}>
										<span className='text-sm text-gray-500 font-medium'>
											{el.OperId}
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

export default EmployeeCard

function BoxWrapper({ children }) {
	return (
		<div className='bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center shadow-md shadow-gray-200'>
			{children}
		</div>
	);
}