import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import Sidebar from '../Admin/Sidebar';
import useIdleTimeout from '../../../useIdleTimeout';

const ViewUser = () => {
	const [data, setData] = useState([]);
	const { UserId } = useParams();
	const history = useNavigate();

	const getSingleUserData = async () => {
		const res = await axios.get(`https://amsweets.in/admin/users/${UserId}`);

		if (res.data.status === 201) {
			console.log(res.data.data);
			setData(res.data.data);
		} else {
			console.log('error');
		}
	};

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
			getSingleUserData();
		}
	}, []);

	return (
		<>
			<div className='flex flex-row gap-4'>
				<Sidebar />
				<div className='container  my-8 h-full w-auto p-4 ml-[30%] pr-6 border'>
					<h1 className='text-4xl text-pink-500 ml-4 py-6'>User Detail</h1>
					{data.length > 0
						? data.map((el, i) => {
								return (
									<>
										<div className='flex flex-col ml-4' key={el.UserId}>
											<label className='p-1 my-1 text-start'>
												ID: <span className='ml-2'>{el.UserId}</span>
											</label>
											<label className='p-1 my-1 text-start'>
												Name: <span className='ml-2'>{el.Uname}</span>
											</label>
											<label className='p-1 my-1 text-start'>
												Gender: <span className='ml-2'>{el.Ugender}</span>
											</label>
											<label className='p-1 my-1 text-start'>
												Mobile No: <span className='ml-2'>{el.Umobile}</span>
											</label>
											<label className='p-1 my-1 text-start'>
												Email: <span className='ml-2'>{el.Uemail}</span>
											</label>
											<label className='p-1 my-1 text-start'>
												Date of Birth:
												<span className='ml-2'>{el.UDoB}</span>
											</label>
											<label className='p-1 my-1 text-start'>
												Address 1:
												<span className='ml-2'>{el.UAddr1}</span>
											</label>
											<label className='p-1 my-1 text-start'>
												Address 2:
												<span className='ml-2'>{el.UAddr2}</span>
											</label>
											<label className='p-1 my-1 text-start'>
												City:
												<span className='ml-2'>{el.Ucity}</span>
											</label>
											<label className='p-1 my-1 text-start'>
												PinCode:
												<span className='ml-2'>{el.UPinCode}</span>
											</label>
											<label className='p-1 my-1 text-start'>
												Aadhar:
												<span className='ml-2'>{el.Uaadhar}</span>
											</label>
											<label className='p-1 my-1 text-start'>
												Status:
												<span className='ml-2'>{el.UStatus}</span>
											</label>
											<label className='p-1 my-1 text-start'>
												Flag:
												<span className='ml-2'>{el.Flag}</span>
											</label>
											<label className='p-1 my-1 text-start'>
												Created Date:
												<span className='ml-2'>
													{moment(el.UCreatedDate).format('DD-MM-YYYY')}
												</span>
											</label>
											<label className='p-1 my-1 text-start'>
												Modified Date:
												<span className='ml-2'>
													{moment(el.UModifiedDate).format('DD-MM-YYYY')}
												</span>
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

export default ViewUser;
