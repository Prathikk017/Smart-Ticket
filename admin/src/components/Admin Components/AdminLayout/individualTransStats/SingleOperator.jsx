import React, { useEffect } from 'react';
import Sidebar from '../../Admin/Sidebar';
import Header from '../Header';
import OperAssetCard from './OperAssetCard';
import useIdleTimeout from '../../../../useIdleTimeout';
import { useNavigate } from 'react-router-dom';

const SingleOperator = () => {
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
			history('/');
		}
	}, [isIdle, history]);

	useEffect(() => {
		const token = window.localStorage.getItem('Lekpay');
		const Token = JSON.parse(token);
		if (!Token) {
			history('/');
		}
	}, []);

	return (
		<div className='flex gap-4 bg-gray-50'>
			<Sidebar />
			<div className='flex flex-col flex-1'>
				<Header />
				<div className='flex flex-col gap-4'>
					<OperAssetCard />
					{/* <TransactionChart /> */}
				</div>
			</div>
		</div>
	);
};

export default SingleOperator;
