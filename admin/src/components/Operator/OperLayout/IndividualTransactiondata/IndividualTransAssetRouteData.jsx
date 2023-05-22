import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BiRupee } from 'react-icons/bi';
import { useNavigate, useParams } from 'react-router-dom';
import OperHeader from '../OperHeader';
import Opersidebar from '../../Opersidebar';
import { TbRoute } from 'react-icons/tb';
import useIdleTimeout from '../../../../useIdleTimeout';

const IndividualTransAssetRouteData = () => {
	const { AstId } = useParams();
	const history = useNavigate();
	// get route assign to asset
	const [data, setData] = useState('');

	const getRouteByAssetID = async () => {
		const res = await axios.post('https://lekpay.com/operator/readrouteasset', {
			AstId,
		});

		if (res.data.status === 201) {
			setData(res.data.data);
		} else {
			console.log('error');
		}
	};

	// Call useIdleTimeout and pass in the time to consider the user as idle
	const isIdle = useIdleTimeout(300000); // set to 5 minute

	// const verify = async() => {
	//   const token = window.localStorage.getItem('Lekpay');
	//   const Token = JSON.parse(token);
	//   const authorization = `Bearer ${Token}`;
	//   const res = await axios.post('https://lekpay.com/admin/verify',{
	//     authorization
	//   });
	//   if(res.data.status === 201){
	//     console.log(res.data.data);
	//   }else{
	//     if(res.data.data === 'Token is not valid'){
	//       window.localStorage.removeItem('Lekpay');
	//       history('/');
	//     }
	//   }
	// }

	// useEffect(() => {
	//   verify();
	//   // Run verify() every 10 minute if the user is not idle
	//   const intervalId = setInterval(() => {
	//     if (!isIdle) {
	//       verify();
	//     }
	//   }, 600000);

	//   // Clear the interval when the component unmounts
	//   return () => clearInterval(intervalId);
	// }, [!isIdle]);

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
			getRouteByAssetID();
		}
	}, []);

	return (
		<div className='flex gap-4 bg-gray-50'>
			<Opersidebar />
			<div className='flex flex-col flex-1'>
				<OperHeader />
				<div className='flex flex-col gap-4'>
					<div className='grid md:grid-cols-3 gap-4 w-[98%] lg:grid-cols-4 gap-4 w-[98%] mt-4 ml-0 '>
						{data.Route &&
						data.Fare &&
						data.Route.length > 0 &&
						data.Fare.length > 0
							? data.Route.map((Route, i) => {
									return (
										<React.Fragment key={i}>
											<BoxWrapper>
												<div className='rounded-full h-12 w-12 flex items-center justify-center bg-teal-500 cursor-pointer'>
													<TbRoute
														className='text-2xl text-black'
														style={{ color: 'white' }}
													/>
												</div>
												<div className='pl-4 cursor-pointer flex flex-col'>
													<label className='text-sm text-gray-500 font-medium my-1 text-center'>
														Route Name:
													</label>
													<span className='text-md text-gray-700 font-medium text-center my-1'>
														{Route}
													</span>
													<div className='flex items-center my-0 mb-1'>
														<label className='text-sm text-gray-500 font-medium mr-2 text-center items-center justify-center'>
															Total Revenue:
														</label>
														<strong className='text-md text-gray-700 font-semibold items-center justify-center flex'>
															<span>
																<BiRupee />
															</span>
															{data.Fare[i]}
														</strong>
													</div>
												</div>
											</BoxWrapper>
										</React.Fragment>
									);
							  })
							: ' '}
					</div>
				</div>
			</div>
		</div>
	);
};

export default IndividualTransAssetRouteData;

function BoxWrapper({ children }) {
	return (
		<div className='bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center shadow-md shadow-gray-300/40'>
			{children}
		</div>
	);
}
