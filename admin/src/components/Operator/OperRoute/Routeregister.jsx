import React, { useEffect, useState } from 'react';
import Opersidebar from '../Opersidebar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useIdleTimeout from '../../../useIdleTimeout';

const Routeregister = () => {
	const [RouteName, setRouteName] = useState('');
	const [RouteEffDate, setRouteEffDate] = useState('');
	const [RouteSStage, setRouteSStage] = useState('');
	const [RouteEStage, setRouteEStage] = useState('');
	const [ApplicableTickets, setApplicableTickets] = useState([]);
	const [checkboxOptions, setCheckBoxOptions] = useState([]);
	const [stageData, setStageData] = useState([]);
	const [ticketDurations, setTicketDurations] = useState([]);
	const [ticketDuration, setTicketDuration] = useState([]);

	const history = useNavigate();
	const ID = window.localStorage.getItem('OperID');
	var operId = JSON.parse(ID);

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

	//function
	const setData = (e) => {
		setRouteName(e.target.value);
	};

	const setData1 = (e) => {
		const selectedDate = new Date(e.target.value);
		const currentDate = new Date();

		if (selectedDate > currentDate) {
			setRouteEffDate(e.target.value);
		} else {
			const currentDateISO = currentDate.toISOString().split('T')[0];
			setRouteEffDate(currentDateISO);
		}
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

	const handleCheckboxChange = (e) => {
		const ticketValue = e.target.value;
		const isChecked = e.target.checked;
		if (isChecked) {
			setApplicableTickets([...ApplicableTickets, ticketValue]);
		} else {
			setApplicableTickets(ApplicableTickets.filter((t) => t !== ticketValue));
			setTicketDurations(
				ticketDurations.filter((duration) => !duration.includes(ticketValue))
			);
		}
	};

	const handleCheckboxChange1 = (e) => {
		const ticketDurationValue = e.target.value;
		const isChecked = e.target.checked;
		if (isChecked) {
			setTicketDuration([...ticketDuration, ticketDurationValue]);
		} else {
			setTicketDuration(
				ticketDuration.filter((t) => t !== ticketDurationValue)
			);
		}
	};
	var TTID = [];
	const handleClick = async (TTid, e) => {
		const isChecked = e.target.checked;

		if (isChecked) {
			if (TTid !== 'TT1' && TTid !== 'TT2' && TTid !== 'TT3') {
				TTID.push(TTid);
				const res = await axios.post(
					'https://lekpay.com/operator/readticketduration',
					{
						TTID,
					}
				);

				if (res.data.status === 201) {
					const newDurations = res.data.data.TTduration.map((duration) => ({
						TTid,
						duration,
					}));

					setTicketDurations((prevDurations) => [
						...prevDurations,
						...newDurations,
					]);
				} else {
					console.log('error');
				}
			}
		} else {
			const updatedDurations = ticketDurations.filter(
				(duration) =>
					!(
						duration.TTid === TTid && duration.duration === ticketDuration[TTid]
					)
			);

			setTicketDurations(updatedDurations);
		}
	};

	const getTicketData = async () => {
		let ttstatus = 'A';
		const res1 = await axios.post('https://lekpay.com/operator/readticket', {
			ttstatus,
		});

		if (res1.data.status === 201) {
			setCheckBoxOptions(res1.data.data);
		} else {
			console.log('err');
		}
	};
	// console.log(ApplicableTickets)
	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!RouteName || !RouteEffDate || !RouteSStage || !RouteEStage) {
			alert('Fill the details');
		} else {
			const res = await axios.post('https://lekpay.com/operator/routecreate', {
				RouteName,
				RouteEffDate,
				RouteSStage,
				RouteEStage,
				operId,
			});
			if (res.data.status === 201) {
				const RouteID = res.data.routeId;
				const res2 = await axios.post(
					'https://lekpay.com/operator/routettypecreate',
					{
						RouteID,
						ApplicableTickets,
						ticketDuration,
					}
				);
				if (res2.data.status === 201) {
					alert('Route created successfully');
					alert('Route Ticket Type added');
					setTicketDuration([]);
					setTicketDurations([]);
				} else {
					console.log('error');
				}
				var form = document.getElementsByName('contact-form')[0];
				form.reset();
				return;
			} else {
				alert('Route unable to register');
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
			history('/');
		}
	}, [isIdle, history]);

	useEffect(() => {
		const token = window.localStorage.getItem('Lekpay');
		const Token = JSON.parse(token);
		if (!Token) {
			history('/');
		} else {
			getTicketData();
			getStage();
		}
	}, []);

	return (
		<div className='flex flex-row gap-4 bg-gray-50'>
			<Opersidebar />
			<div className='h-screen w-full py-4 max-h-[100vh] overflow-y-auto'>
				<div className='py-4 flex flex-col justify-center items-center'>
					<form className='max-w-[400px] w-full mx-auto' name='contact-form'>
						<h2 className='text-4xl text-pink-500 text-center py-1'>
							Route Register
						</h2>
						<div className='flex flex-col py-2'>
							<label>Route Name</label>
							<input
								type='text'
								onChange={setData}
								className='border rounded w-full hover:border-pink-500 duration-200 p-1'
							/>
						</div>
						<div className='flex flex-col py-2'>
							<label>Route Effective date</label>
							<input
								type='date'
								onChange={setData1}
								value={RouteEffDate}
								className='border rounded w-full hover:border-pink-500 duration-200 p-1'
								min={new Date().toISOString().split('T')[0]}
							/>
						</div>
						<div className='flex flex-col py-2'>
							<label>Route Start Stage</label>
							<select
								className='border p-1 rounded w-full hover:border-pink-500 duration-200'
								onChange={startStage}
							>
								<option>Select</option>
								{stageData.length > 0
									? stageData.map((el, i) => {
											return (
												<option key={i} value={`${el.StageName}`}>
													{el.StageName}
												</option>
											);
									  })
									: ' '}
							</select>
						</div>
						<div className='flex flex-col py-2'>
							<label>Route End Stage</label>
							<select
								className='border p-1 rounded w-full hover:border-pink-500 duration-200'
								onChange={endStage}
							>
								<option>Select</option>
								{stageData.length > 0
									? stageData.map((el, i) => {
											return (
												<option key={i} value={`${el.StageName}`}>
													{el.StageName}
												</option>
											);
									  })
									: ' '}
							</select>
						</div>
						<div className='flex flex-col py-2'>
							<label>Applicable Ticket:</label>
							<div className='grid grid-cols-3 gap-3 m-2'>
								{checkboxOptions.map((el, i) => {
									return (
										<div className='flex items-center p-1' key={i}>
											<input
												type='checkbox'
												value={el.TTid}
												onChange={handleCheckboxChange}
												className='mr-1'
												onClick={(e) => handleClick(el.TTid, e)}
											/>
											<label>{el.TTname}</label>
										</div>
									);
								})}
							</div>
						</div>
						{/* <div className='flex flex-col py-2'>
              <label>Ticket Duration: </label>
              {ticketDurations.map((duration, i) => (
                <div key={i}>
                  <input
                    type='checkbox'
                    value={duration.duration}
                    onChange={handleCheckboxChange1}
                    className='mr-1'
                  />
                  <label>{duration.duration}</label>
                </div>
              ))}
            </div> */}
						<button
							className='border w-full my-2 py-2 text-white bg-pink-500 rounded text-lg hover:bg-pink-400 duration-200'
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

export default Routeregister;
