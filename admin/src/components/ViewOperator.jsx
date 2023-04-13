import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import Sidebar from './Sidebar';

const ViewOperator = () => {
	const [data, setData] = useState([]);
	const { OperId } = useParams();
	const getUserData = async () => {
		const res = await axios.get(
			`http://localhost:8004/admin/operators/${OperId}`
		);

		if (res.data.status === 201) {
			setData(res.data.data);
		} else {
			console.log('error');
		}
	};

	useEffect(() => {
		getUserData();
	}, []);

	return (
		<>
			<div className='flex flex-row gap-4'>
				<Sidebar />
				<div className='container  my-8 h-full w-[40%] p-4 mx-auto pr-6 border'>
					<h1 className='text-center text-4xl text-pink-500  py-6'>
						Operator Detail
					</h1>
					{data.length > 0
						? data.map((el, i) => {
								return (
									<>
										<div className='flex flex-col ml-4' key={i + 1}>
											<label className='p-1 my-1 text-start'>
												Company Name:{' '}
												<span className='ml-2'>{el.OperShortName}</span>
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
											<label className='p-1 my-1 text-start'>
												Status:<span className='ml-2'>{el.OperStatus}</span>
											</label>
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

export default ViewOperator;