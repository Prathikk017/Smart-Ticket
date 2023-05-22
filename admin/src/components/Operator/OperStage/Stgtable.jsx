import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';
import moment from 'moment';
import Opersidebar from '../Opersidebar';
import '../../pagination.css';
import useIdleTimeout from '../../../useIdleTimeout';

const Stgtable = () => {
	const [data, setData] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const history = useNavigate();
	const ID = window.localStorage.getItem('OperID');
	var operId = JSON.parse(ID);

	const getStgData = async () => {
		const res = await axios.post('https://lekpay.com/operator/readstg', {
			operId,
		});
		if (res.data.status === 201) {
			setData(res.data.data);
		} else {
			console.log('error');
		}
	};

	// Get current items based on currentPage and itemsPerPage
	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
	// Change page
	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	// Render page numbers
	const pageNumber = [];
	for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
		pageNumber.push(i);
	}

	const renderPageNumbers = pageNumber.map((number) => {
		return (
			<li
				key={number}
				className={`${currentPage === number ? 'active' : ''}page-item`}
			>
				<button className='page-link' onClick={() => paginate(number)}>
					{number}
				</button>
			</li>
		);
	});

	// Call useIdleTimeout and pass in the time to consider the user as idle
	const isIdle = useIdleTimeout(300000); // set to 5 minute

	//  const verify = async() => {
	//    const token = window.localStorage.getItem('Lekpay');
	//    const Token = JSON.parse(token);
	//    const authorization = `Bearer ${Token}`;
	//    const res = await axios.post('https://lekpay.com/admin/verify',{
	//      authorization
	//    });
	//    if(res.data.status === 201){
	//      console.log(res.data.data);
	//    }else{
	//      if(res.data.data === 'Token is not valid'){
	//        window.localStorage.removeItem('Lekpay');
	//        history('/');
	//      }
	//    }
	//  }

	//  useEffect(() => {
	//    verify();
	//    // Run verify() every 10 minute if the user is not idle
	//    const intervalId = setInterval(() => {
	//      if (!isIdle) {
	//        verify();
	//      }
	//    }, 600000);

	//    // Clear the interval when the component unmounts
	//    return () => clearInterval(intervalId);
	//  }, [!isIdle]);

	useEffect(() => {
		// Redirect to sign-in page if the user is idle
		if (isIdle) {
			window.localStorage.removeItem('Lekpay');
			history('/signin');
		}
	}, [isIdle, history]);

	useEffect(() => {
		const token = window.localStorage.getItem('Lekpay');
		const Token = JSON.parse(token);
		if (!Token) {
			history('/signin');
		} else {
			getStgData();
		}
	});

	return (
		<>
			<div>
				<div className='flex flex-row gap-6'>
					<Opersidebar />
					<div className='flex-col justify-center items-center ml-6'>
						<div className='bg-white p-4 mt-4 max-h-96 items-center rounded-md sm:w-[100%] lg:w-[130%] xl:w-[200%] 2xl:w-[220%] flex-1'>
							<h1 className='text-gray-700 text-3xl text-center font-semibold pb-1'>
								Stage Table
							</h1>
							<div className=' rounded-sm mt-2'>
								<table className='w-full text-gray-700 justify-between mx-1 border border-gray-800'>
									<thead>
										<tr className='border border-gray-800'>
											<th className='p-1 ml-1 w-[10%] text-center'>Sl No</th>
											<th className='p-1 ml-1 text-start'>Stage Name</th>
											<th className='p-1 ml-1 w-[5%] text-center'>Status</th>
											<th className='p-1 ml-1 w-[15%] text-end'>
												Created Date
											</th>
											<th className='p-2 ml-1 w-[15%]'>View</th>
										</tr>
									</thead>
									<tbody className='justify-between '>
										{currentItems.length > 0
											? currentItems.map((el, i) => {
													return (
														<>
															<tr>
																<td className='p-1 ml-1 text-center'>
																	{indexOfFirstItem + i + 1}
																</td>
																<td className='p-1 ml-1 text-start w-[15%]'>
																	{el.StageName}
																</td>
																<td className='p-1 ml-1 w-[5%] text-center'>
																	{el.StageStatus}
																</td>
																<td className='p-1 ml-1 text-end w-[15%]'>
																	{moment(el.CreatedDate).format('DD-MM-YYYY')}
																</td>
																<td className='p-2 ml-1 text-center'>
																	<Link to={`/operator/stage/${el.StageID}`}>
																		<button className='bg-gray-200 hover:bg-pink-300 px-3 py-1 rounded-lg w-max'>
																			View
																		</button>
																	</Link>
																</td>
															</tr>
														</>
													);
											  })
											: ' '}
									</tbody>
								</table>
								{/* Pagination */}
								<div className='flex justify-center items-center'>
									<nav>
										<ul className='flex' id='pagination'>
											<li
												className={`${
													currentPage === 1 ? 'disabled' : ''
												} page-item`}
											>
												<button
													className='page-link  rounded-r-md focus:outline-none rounded-l-md mr-1 mt-1'
													onClick={() =>
														setCurrentPage((prev) =>
															prev === 1 ? prev : prev - 1
														)
													}
												>
													<FaAngleDoubleLeft />
												</button>
											</li>
											{renderPageNumbers}
											<li
												className={`${
													currentPage === pageNumber.length ? 'disabled' : ''
												} page-item`}
											>
												<button
													className='page-link  rounded-r-md focus:outline-none rounded-l-md ml-2 mt-1'
													onClick={() =>
														setCurrentPage((prev) =>
															prev === pageNumber.length ? prev : prev + 1
														)
													}
												>
													<FaAngleDoubleRight />
												</button>
											</li>
										</ul>
									</nav>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Stgtable;
