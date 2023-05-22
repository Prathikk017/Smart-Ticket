import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import Opersidebar from '../Opersidebar';
import useIdleTimeout from '../../../useIdleTimeout';

const Rutedit = () => {
	const [RouteName, setRouteName] = useState('');
	const [RouteEffDate, setRouteEffDate] = useState('');
	const [RouteSStage, setRouteSStage] = useState('');
	const [RouteEStage, setRouteEStage] = useState('');
	const [RouteStatus, setRouteStatus] = useState('');
	const [stageData, setStageData] = useState([]);
	const history = useNavigate();
	const ID = window.localStorage.getItem('OperID');
	var operId = JSON.parse(ID);
	const { RouteID } = useParams();

	// function
	const setData = (e) => {
		setRouteName(e.target.value);
	};

	const setData1 = (e) => {
		setRouteEffDate(e.target.value);
	};

	const startStage = (e) => {
		if (e.target.value !== 'Select') {
			setRouteSStage(e.target.value);
		} else {
			setRouteSStage('');
		}
	};

	const endStage = (e) => {
		if (e.target.value !== 'Select') {
			setRouteEStage(e.target.value);
		} else {
			setRouteEStage('');
		}
	};

	const setData2 = (e) => {
		setRouteStatus(e.target.value);
	};
	const getData = async () => {
		const res1 = await axios.get(
			`https://lekpay.com/operator/rutread/${RouteID}`
		);

		if (res1.data.status === 201) {
			setRouteName(res1.data.data[0].RouteName);
			setRouteEffDate(
				moment(res1.data.data[0].RouteEffDate).format('YYYY-MM-DD')
			);
			setRouteSStage(res1.data.data[0].RouteSStage);
			setRouteEStage(res1.data.data[0].RouteEStage);
			setRouteStatus(res1.data.data[0].RouteStatus);
			return;
		} else {
			console.log('error');
		}
	};

	const getStage = async () => {
		const res1 = await axios.post('https://lekpay.com/operator/readstage', {
			operId,
		});
		if (res1.data.status === 201) {
			setStageData(res1.data.data);
			return;
		} else {
			console.log('error');
		}
	};

	const handleSub = async (e) => {
		e.preventDefault();

		if (
			!RouteName ||
			!RouteEffDate ||
			!RouteSStage ||
			!RouteEStage ||
			!RouteStatus
		) {
			alert('Fill the details');
			return;
		} else {
			const res = await axios.patch(
				`https://lekpay.com/operator/route/update/${RouteID}`,
				{
					RouteName,
					RouteEffDate,
					RouteSStage,
					RouteEStage,
					RouteStatus,
				}
			);
			if (res.data.status === 201) {
				alert('Route successfully update');
				history('/rutview');
				return;
			} else {
				alert('Route unable to update');
				return;
			}
		}
	};

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
			getData();
			getStage();
		}
	}, []);
	return (
		<div className='flex flex-row gap-4'>
			<Opersidebar />
			<div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
				<div className='py-2 flex flex-col justify-center items-center'>
					<form className='max-w-[400px] w-full'>
						<h2 className='text-4xl text-pink-500 text-center py-1'>
							Update Route
						</h2>
						<div className='flex flex-row py-2'>
							<label className='justify-center items-center mr-16 mt-1'>
								Route Name:{' '}
							</label>
							<input
								type='text'
								name='RouteName'
								value={RouteName}
								onChange={setData}
								className='border rounded w-[58%] hover:border-pink-500 duration-200 p-1'
							/>
						</div>
						<div className='flex flex-row py-2'>
							<label className='justify-center items-center mr-3 mt-1'>
								Route Effective date:{' '}
							</label>
							<input
								type='date'
								name='RouteEffDate'
								value={RouteEffDate}
								onChange={setData1}
								className='border rounded w-[58%] hover:border-pink-500 duration-200 p-1'
							/>
						</div>
						<div className='flex flex-row py-2'>
							<label className='justify-center items-center mr-8 mt-1'>
								Route Start Stage:{' '}
							</label>
							<select
								className='border p-1 rounded w-[58%] hover:border-pink-500 duration-200'
								onChange={startStage}
								name='RouteSStage'
								value={RouteSStage}
							>
								<option>Select</option>
								{stageData.map((el, i) => {
									return (
										<option key={i} value={`${el.StageName}`}>
											{el.StageName}
										</option>
									);
								})}
							</select>
						</div>
						<div className='flex flex-row py-2'>
							<label className='justify-center items-center mr-10 mt-1'>
								Route End Stage:{' '}
							</label>
							<select
								className='border p-1 rounded w-[58%] hover:border-pink-500 duration-200'
								onChange={endStage}
								name='RouteEStage'
								value={RouteEStage}
							>
								<option>Select</option>
								{stageData.map((el, i) => {
									return (
										<option key={i} value={`${el.StageName}`}>
											{el.StageName}
										</option>
									);
								})}
							</select>
						</div>
						<div className='flex flex-row py-1'>
							<label className='justify-center items-center mr-28 mt-1'>
								Status:{' '}
							</label>
							<select
								className='border p-1 rounded w-[58%] hover:border-pink-500 duration-200'
								name='RouteStatus'
								value={RouteStatus}
								onChange={setData2}
							>
								<option value='A'>Active</option>
								<option value='I'>Inactive</option>
							</select>
						</div>
						<button
							className='border w-full my-2 py-2 text-white bg-pink-500 rounded text-lg hover:bg-pink-400 duration-200'
							onClick={handleSub}
						>
							Update
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Rutedit;
