import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';
import Sidebar from './Sidebar';

const Operview = () => {
	const history = useNavigate();
	const [data, setData] = useState([]);
	const { OperId } = useParams();
	const getUserData = async () => {
		const res = await axios.get(`http://localhost:8004/operator/${OperId}`);

		if (res.data.status === 201) {
			setData(res.data.data);
		} else {
			console.log('error');
		}
	};

	const handleSub = async () => {
		const res = await axios.patch(
			`http://localhost:8004/admin/approve/${OperId}`
		);
		if (res.data.status === 201) {
			alert('Operator Approved');
			setTimeout(() => history('/admin/dashboard'), 500);
			return;
		} else {
			console.log('error');
		}
	};

	useEffect(() => {
		const token = window.localStorage.getItem('Lekpay');
		const Token = JSON.parse(token);
		if (!Token) {
			history('/');
		} else {
			getUserData();
		}
	}, []);

	return (
		<>
			<div className='flex flex-row gap-4'>
				<Sidebar />
				<div className='container  my-8 h-full w-auto p-4 ml-[30%] pr-6 border'>
					<h1 className='text-4xl text-pink-500 ml-4 py-6'>Operator Detail</h1>
					{data.length > 0
						? data.map((el, i) => {
								return (
									<>
										<div className='flex flex-col ml-4' key={el.OperId}>
											<label className='p-1 my-1 text-start'>
												Company Name:{' '}
												<span className='ml-2'>{el.OperName}</span>
											</label>
											<label className='p-1 my-1 text-start'>
												Company Email:{' '}
												<span className='ml-2'>{el.OperEmail}</span>
											</label>
											<label className='p-1 my-1 text-start'>
												GST No: <span className='ml-2'>{el.OperGSTIN}</span>
											</label>
											<label className='p-1 my-1 text-start'>
												Phone No: <span className='ml-2'>{el.OperPhone}</span>
											</label>
											<label className='p-1 my-1 text-start'>
												Contact Name:
												<span className='ml-2'>{el.OperContactName}</span>
											</label>
											<label className='p-1 my-1 text-start'>
												Contact Email:
												<span className='ml-2'>{el.OperContactEmail}</span>
											</label>
											<label className='p-1 my-1 text-start'>
												Created Date:
												<span className='ml-2'>
													{moment(el.OperCreatedDate).format('DD-MM-YYYY')}
												</span>
											</label>
											<div className='flex flex-row justify-center m-4'>
												<Link to={'/admin/approveopersview'}>
													<button className='hover:bg-pink-300  px-4 py-2 rounded-lg w-max'>
														Cancel
													</button>
												</Link>
												<Link to={`/admin/approveoper/${el.OperId}`}>
													<button
														className='hover:bg-pink-300  px-4 py-2 rounded-lg w-max'
														onClick={handleSub}
													>
														Approve
													</button>
												</Link>
											</div>
										</div>
									</>
								);
						  })
						: ' '}
				</div>
			</div>
		</>
	);
};

export default Operview;
