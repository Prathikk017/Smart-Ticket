import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { AiOutlineClose } from 'react-icons/ai';
import Opersidebar from '../Opersidebar';
import { useNavigate } from 'react-router-dom';
import useIdleTimeout from '../../../useIdleTimeout';

let arr = [];
let arr1 = [];

const RouteStageMap = () => {
	//states
	const [intermediateStages, setIntermediateStages] = useState([]);
	const [intermediateStageValues, setIntermediateStageValues] = useState([]);
	const [routeData, setRouteData] = useState([]);
	const [routeSStage, setRouteSStage] = useState('');
	const [routeEStage, setRouteEStage] = useState('');
	const [stageData, setStageData] = useState([]);
	const [TicketData, setTicketData] = useState([]);
	const [TicketShortData, setTicketShortData] = useState([]);
	const [route, setRoute] = useState('');
	const [StartStage, setStartStage] = useState('');
	const [EndStage, setEndStage] = useState('');
	const [effDate, setEffDate] = useState('');
	const [RouteTicket, setRouteTicket] = useState('');
	const [startFareData, setStartFareData] = useState(
		TicketShortData.reduce((obj, key, index) => ({ ...obj, [key]: 0 }), {})
	);
	const [endFareData, setEndFareData] = useState(
		TicketShortData.reduce((obj, key, index) => ({ ...obj, [key]: 0 }), {})
	);

	const history = useNavigate();
	//functions for getting values
	const setData1 = (e) => {
		setRoute(e.target.value);
		setRouteTicket(e.target.value);
	};

	const handleClick = (RouteName) => {
		let stages = RouteName.split('-');

		// Assigning the start and end stages to respective variables
		setRouteSStage(stages[0].trim());
		setRouteEStage(stages[1].trim());
	};
	const startStage = (e) => {
		const selectedStageName = e.target.selectedOptions[0].text;
		if (e.target.value !== 'Select') {
			if (selectedStageName === routeSStage) {
				setStartStage(e.target.value);
			} else {
				alert(`Please enter ${routeSStage} has route Start stage`);
			}
		} else {
			setStartStage('');
		}
	};

	const endStage = (e) => {
		const selectedStageName = e.target.selectedOptions[0].text;

		if (e.target.value !== 'Select') {
			if (selectedStageName === routeEStage) {
				setEndStage(e.target.value);
			} else {
				alert(`Please enter ${routeEStage} has route End stage`);
				return;
			}
		} else {
			setEndStage('');
		}
	};

	const setData3 = (event, key) => {
		const newFareData = { ...startFareData };
		newFareData[key] = parseInt(event.target.value);
		setStartFareData(newFareData);
	};

	const setData4 = (event, key) => {
		const newFareData = { ...endFareData };
		newFareData[key] = parseInt(event.target.value);
		setEndFareData(newFareData);
	};

	const setData5 = (e) => {
		const selectedDate = new Date(e.target.value);
		const currentDate = new Date();

		if (selectedDate > currentDate) {
			setEffDate(e.target.value);
		} else {
			const currentDateISO = currentDate.toISOString().split('T')[0];
			setEffDate(currentDateISO);
		}
	};

	const ID = window.localStorage.getItem('OperID');
	var operId = JSON.parse(ID);

	const getRoute = async () => {
		const res = await axios.post('https://lekpay.com/operator/readroute', {
			operId,
		});
		if (res.data.status === 201) {
			setRouteData(res.data.data);
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

	// function to handle adding a new intermediate stage
	const addIntermediateStage = () => {
		setIntermediateStages([...intermediateStages, {}]);
		setIntermediateStageValues([...intermediateStageValues, '']);
	};

	// function to handle deleting an intermediate stage
	const deleteIntermediateStage = (index) => {
		const updatedStages = [...intermediateStages];
		updatedStages.splice(index, 1);
		setIntermediateStages(updatedStages);

		const updatedValues = [...intermediateStageValues];
		updatedValues.splice(index, 1);
		setIntermediateStageValues(updatedValues);
	};

	// function to handle updating the fare for an intermediate stage
	const updateIntermediateFare = (event, stageIndex, fareShortName) => {
		const updatedStages = [...intermediateStages];
		updatedStages[stageIndex][fareShortName] = parseInt(event.target.value);
		setIntermediateStages(updatedStages);
	};

	// function to handle updating the value for an intermediate stage
	const updateIntermediateStageValue = (event, index) => {
		const updatedValues = [...intermediateStageValues];
		updatedValues[index] = event.target.value;
		setIntermediateStageValues(updatedValues);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (StartStage !== '') {
			arr.push(StartStage);
		}

		if (intermediateStageValues !== '') {
			for (let i = 0; i < intermediateStageValues.length; i++) {
				arr.push(intermediateStageValues[i]);
			}
			setIntermediateStageValues([]);
		}
		if (EndStage !== '') {
			arr.push(EndStage);
		}
		if (startFareData !== '') {
			arr1.push(startFareData);
			setStartFareData([]);
		}
		if (intermediateStages !== '') {
			for (let i = 0; i < intermediateStages.length; i++) {
				arr1.push(intermediateStages[i]);
			}
			setIntermediateStages([]);
		}
		if (endFareData !== '') {
			arr1.push(endFareData);
			setEndFareData([]);
		}

		if (arr === [] || arr1 === [] || route === ' ') {
			alert('Fill the details');
		} else {
			const res1 = await axios.post(
				'https://lekpay.com/operator/createroutemap',
				{
					route,
					arr,
					arr1,
					effDate,
				}
			);

			if (res1.data.status === 201) {
				alert('Route successfully mapped');
				const form = document.getElementsByName('contact-form')[0];
				form.reset();
				setTicketData([]);
				setTicketShortData([]);
				window.location.reload();
			} else {
				alert('Route unable to Map');
				const form = document.getElementsByName('contact-form')[0];
				form.reset();
			}
		}
	};

	const getTicketType = async () => {
		if (RouteTicket) {
			const res = await axios.post(
				'https://lekpay.com/operator/readroutetictype',
				{
					RouteTicket,
				}
			);
			if (res.data.status === 201) {
				setTicketShortData(res.data.data1);
				setTicketData(res.data.data);
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
		getTicketType();
	}, [RouteTicket, TicketData]);

	useEffect(() => {
		const token = window.localStorage.getItem('Lekpay');
		const Token = JSON.parse(token);
		if (!Token) {
			history('/signin');
		} else {
			getRoute();
			getStage();
		}
	}, [operId]);

	return (
		<div className='flex flex-row gap-4 bg-gray-50'>
			<Opersidebar />
			<div className='h-screen w-full py-4  max-h-[100vh] overflow-y-auto'>
				<div className='py-4 flex flex-col justify-center items-center'>
					<form className='max-w-[400px] w-full mx-auto' name='contact-form'>
						<h2 className='text-4xl text-pink-500 text-center py-1'>
							Route Map
						</h2>
						<div className='flex flex-row py-2'>
							<label className='justify-center items-center mr-14 mt-1'>
								Route Name:{' '}
							</label>
							<select
								className='border p-1 rounded w-[58%] ml-3 hover:border-pink-500 duration-200'
								onChange={setData1}
								onClick={(e) => {
									if (e.target.value !== 'Select') {
										handleClick(e.target.selectedOptions[0].text);
									}
								}}
							>
								<option>Select</option>
								{routeData.length > 0
									? routeData.map((el, i) => {
											return (
												<option key={i} value={`${el.RouteID}`}>
													{el.RouteName}
												</option>
											);
									  })
									: ' '}
							</select>
						</div>
						<div className='flex flex-row py-2'>
							<label className='justify-center items-center mr-4 mt-1'>
								Route Effective date:{' '}
							</label>
							<input
								type='date'
								onChange={setData5}
								value={effDate}
								className='border rounded w-[58%] hover:border-pink-500 duration-200 p-1'
								min={new Date().toISOString().split('T')[0]}
							/>
						</div>
						<div className='flex flex-row py-1'>
							<label className='justify-center items-center mr-9 mt-1'>
								Route Start Stage:{' '}
							</label>
							<select
								className='border p-1 rounded w-[58%] hover:border-pink-500 duration-200'
								onChange={startStage}
							>
								<option>Select</option>
								{stageData.length > 0
									? stageData.map((el, i) => {
											return (
												<option key={i} value={`${el.StageID}`}>
													{el.StageName}
												</option>
											);
									  })
									: ' '}
							</select>
						</div>
						<label className='pt-2'>Fare:</label>
						<div className='grid grid-cols-3 gap-2'>
							{TicketShortData.map((key, index) => {
								return (
									<div className='flex flex-col' key={index}>
										<label className='mr-2 justify-center items-center'>
											{TicketData[index]}:
										</label>
										<input
											type='number'
											className='w-[70%] px-3 py-1 border rounded hover:border-pink-500 duration-200'
											min={0}
											onChange={(event) => setData3(event, key)}
											value={startFareData[key]}
										/>
									</div>
								);
							})}

							<div className='col-span-3'>
								<button
									type='button'
									onClick={addIntermediateStage}
									className='justify-end items-end border w-max p-2 m-4  text-white bg-pink-500 rounded text-sm hover:bg-pink-400 duration-200'
								>
									Add Stage
								</button>
							</div>
						</div>
						{intermediateStages.map((stage, stageIndex) => {
							return (
								<div className='flex flex-col py-2 ' key={stageIndex}>
									<label className='justify-center items-center mr-4 mt-1'>
										Intermediate Stage:{' '}
									</label>
									<div className='flex flex-row'>
										<select
											className='border p-1 rounded w-[60%] hover:border-pink-500 duration-200'
											value={intermediateStageValues[stageIndex]}
											onChange={(event) =>
												updateIntermediateStageValue(event, stageIndex)
											}
										>
											<option>Select</option>
											{stageData.length > 0
												? stageData.map((el, k) => {
														return (
															<option key={k} value={`${el.StageID}`}>
																{el.StageName}
															</option>
														);
												  })
												: ' '}
										</select>
										<button
											type='button'
											onClick={() => deleteIntermediateStage(stageIndex)}
											className='border w-max p-3 ml-20  text-white bg-pink-500 rounded text-sm hover:bg-pink-400 duration-200 justify-between'
										>
											<AiOutlineClose />
										</button>
									</div>

									<div className='flex flex-col'>
										<label className='pt-2'>Fare:</label>

										<div className='grid grid-cols-3 gap-2'>
											{TicketShortData.map((shortName, fareIndex) => {
												return (
													<div className='flex flex-col' key={fareIndex}>
														<label className='mr-2  justify-center items-center'>
															{TicketData[fareIndex]}:
														</label>
														<input
															type='number'
															className='w-[70%]  px-3 py-1 border rounded hover:border-pink-500 duration-200'
															min={0}
															value={
																intermediateStages[stageIndex][shortName] || ''
															}
															onChange={(event) =>
																updateIntermediateFare(
																	event,
																	stageIndex,
																	shortName
																)
															}
														/>
													</div>
												);
											})}
										</div>
									</div>
								</div>
							);
						})}

						<div className='flex flex-row py-1'>
							<label className='justify-center items-center mr-10 mt-1'>
								Route End Stage:{' '}
							</label>
							<select
								className='border p-1 rounded w-[59%] hover:border-pink-500 duration-200'
								onChange={endStage}
							>
								<option>Select</option>
								{stageData.length > 0
									? stageData.map((el, i) => {
											return (
												<option key={i} value={`${el.StageID}`}>
													{el.StageName}
												</option>
											);
									  })
									: ' '}
							</select>
						</div>
						<label className='pt-2'>Fare:</label>
						<div className='grid grid-cols-3 gap-2'>
							{TicketShortData.map((key, index) => {
								return (
									<div className='flex flex-col' key={index}>
										<label className='mr-2 justify-center items-center'>
											{TicketData[index]}:
										</label>
										<input
											type='number'
											className='w-[70%] px-3 py-1 border rounded hover:border-pink-500 duration-200'
											min={0}
											onChange={(event) => setData4(event, key)}
											value={endFareData[key]}
										/>
									</div>
								);
							})}
						</div>
						<button
							type='submit'
							className='border w-full my-3 py-2 mb-20 text-white bg-pink-500 rounded text-lg hover:bg-pink-400 duration-200'
							onClick={handleSubmit}
						>
							Register
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default RouteStageMap;
