import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';
import moment from 'moment';
import Sidebar from '../Admin/Sidebar';
import '../../pagination.css';
import useIdleTimeout from '../../../useIdleTimeout';

const Opertable = () => {
	const [data, setData] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const history = useNavigate();

	const getApproOpersData = async () => {
		const res = await axios.get('https://amsweets.in/admin/inactiveopers');
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
	//    const res = await axios.post('https://amsweets.in/admin/verify',{
	// 	 authorization
	//    });
	//    if(res.data.status === 201){
	// 	 console.log(res.data.data);
	//    }else{
	// 	 if(res.data.data === 'Token is not valid'){
	// 	   window.localStorage.removeItem('Lekpay');
	// 	   history('/');
	// 	 }
	//    }
	//  }
   
	 
	//  useEffect(() => {
	//    verify();
	//    // Run verify() every 10 minute if the user is not idle
	//    const intervalId = setInterval(() => {
	// 	 if (!isIdle) {
	// 	   verify();
	// 	 }
	//    }, 600000);
   
	//    // Clear the interval when the component unmounts
	//    return () => clearInterval(intervalId);
	//  }, [!isIdle]);
   
	 useEffect(() => {
	   // Redirect to sign-in page if the user is idle
	   if (isIdle) {
		 window.localStorage.removeItem('Lekpay');
		 history('/');
	   }
	 }, [isIdle, history]);

	useEffect(() => {
		const token = window.localStorage.getItem('Lekpay');
		const Token = JSON.parse(token);
		if (!Token) {
			history('/');
		} else {
			getApproOpersData();
		}
	}, []);

	return (
		<>
			<div>
				<div className='flex flex-row gap-10'>
					<Sidebar />
					<div className='flex-col mr-8'>
						<div className='bg-white pl-10 pt-1 mt-10 mr-10 ml-8 items-center rounded-md w-[160%] flex-1'>
							<h1 className='text-pink-500 text-3xl text-center font-semibold pb-1'>
								Inactive Operators
							</h1>
							<div className=' rounded-sm mt-2'>
								<table className='w-full text-gray-700 justify-between mx-1 border border-gray-800 h-auto'>
									<thead>
										<tr className='border border-gray-800'>
											<th>Sl No</th>
											<th>Name</th>
											<th>Mobile</th>
											<th>Email</th>
											<th>City</th>
											<th>Status</th>
											<th>View</th>
										</tr>
									</thead>
									<tbody className='justify-between  text-center'>
										{currentItems.length > 0
											? currentItems.map((el, i) => {
													return (
														<>
															<tr>
																<td>{indexOfFirstItem + i + 1}</td>
																<td>{el.OperShortName}</td>
																<td>{el.OperPhone}</td>
																<td>{el.OperEmail}</td>
																<td>{el.OperCity}</td>
																<td>{el.OperStatus}</td>
																<td>
																	<Link to={`/admin/approveoper/${el.OperId}`}>
																		<button className='hover:bg-pink-300  px-2 py-2 rounded-lg w-max'>
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
													className='page-link rounded-r-md focus:outline-none rounded-l-md mr-6 mt-1'
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
													className='page-link rounded-r-md focus:outline-none rounded-l-md ml-6 mt-1'
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

export default Opertable;
