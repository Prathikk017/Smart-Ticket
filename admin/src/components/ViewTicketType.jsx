import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';
import Sidebar from './Sidebar';

const ViewTicketType = () => {
	const history = useNavigate();
	const [data, setData] = useState([]);
	const { TTid } = useParams();
	const getUserData = async () => {
		const res = await axios.get(
			`http://localhost:8004/admin/ticket-types/${TTid}`
		);

		if (res.data.status === 201) {
			setData(res.data.data);
		} else {
			console.log('error');
		}
	};

	const handleEnableSub = async () => {
		const res = await axios.patch(
			`http://localhost:8004/admin/ticket-types/enable/${TTid}`
		);
		if (res.data.status === 201) {
			alert('Ticket Type Activated');
			setTimeout(() => history('/admin/ticket-types'), 500);
			return;
		} else {
			console.log('error');
		}
	};

	const handleDisableSub = async () => {
		const res = await axios.patch(
			`http://localhost:8004/admin/ticket-types/disable/${TTid}`
		);
		if (res.data.status === 201) {
			alert('Ticket Type Deactivated');
			setTimeout(() => history('/admin/ticket-types'), 500);
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
					<h1 className='text-4xl text-pink-500 ml-4 py-6'>
						Ticket Type Detail
					</h1>
					{data.length > 0
						? data.map((el, i) => {
								return (
									<>
										<div className='flex flex-col ml-4' key={el.OperId}>
											<label className='p-1 my-1 text-start'>
												Name: <span className='ml-2'>{el.TTname}</span>
											</label>
											<label className='p-1 my-1 text-start'>
												Short Name:{' '}
												<span className='ml-2'>{el.TTshortname}</span>
											</label>
											<label className='p-1 my-1 text-start'>
												Status: <span className='ml-2'>{el.TTstatus}</span>
											</label>
											<label className='p-1 my-1 text-start'>
												Created Date:
												<span className='ml-2'>
													{moment(el.TTCreatedDate).format('DD-MM-YYYY')}
												</span>
											</label>
											<label className='p-1 my-1 text-start'>
												Created Date:
												<span className='ml-2'>
													{moment(el.TTModifiedDate).format('DD-MM-YYYY')}
												</span>
											</label>
											<div className='flex flex-row justify-between m-4'>
												<button
													className='hover:bg-pink-300 px-4 py-2 rounded-lg w-max'
													onClick={handleDisableSub}
												>
													Disable
												</button>
												<button
													className='hover:bg-pink-300 px-4 py-2 rounded-lg w-max'
													onClick={handleEnableSub}
												>
													Enable
												</button>
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

export default ViewTicketType;
