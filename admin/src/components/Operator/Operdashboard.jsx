import React, { useEffect } from 'react';
import axios from 'axios';
import Opersidebar from '../Operator/Opersidebar';
import { useNavigate } from 'react-router-dom';
import OperHeader from '../Operator/OperLayout/OperHeader';
import OperStatsGrid from '../Operator/OperLayout/OperStatsGrid';
// import OperTransactionChart from '../Operator/OperLayout/OperTransactionChart';
import useIdleTimeout from '../../useIdleTimeout';

const Operdashboard = () => {
	const history = useNavigate();

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
		}
	});

	return (
		<div className='flex gap-4 bg-gray-50'>
			<Opersidebar />
			<div className='flex flex-col flex-1'>
				<OperHeader />
				<div className='flex flex-col gap-4'>
					<OperStatsGrid />
					{/* <OperTransactionChart/> */}
				</div>
			</div>
		</div>
	);
};

export default Operdashboard;
