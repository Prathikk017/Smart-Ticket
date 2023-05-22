import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Opersidebar from '../Opersidebar';
import useIdleTimeout from '../../../useIdleTimeout';

const Empedit = () => {
	const [EmpName, setEmpName] = useState('');
	const [EmpIntId, setEmpIntId] = useState('');
	const [EmpMobile, setEmpMobile] = useState('');
	const [EmpAadhar, setEmpAadhar] = useState('');
	const [EmpAddr1, setEmpAddr1] = useState('');
	const [EmpAddr2, setEmpAddr2] = useState('');
	const [EmpCity, setEmpCity] = useState('');
	const [EmpPincode, setEmpPincode] = useState('');
	const [EmpDOB, setEmpDOB] = useState('');
	const [EmpType, setEmpType] = useState('');
	const [estatus, setEstatus] = useState('');
	const history = useNavigate();

	const { EmpId } = useParams();

	// function
	const setData1 = (e) => {
		setEmpName(e.target.value);
	};
	const setData2 = (e) => {
		setEmpIntId(e.target.value);
	};
	const setData3 = (e) => {
		setEmpDOB(e.target.value);
	};
	const setData4 = (e) => {
		setEmpType(e.target.value);
	};
	const setData5 = (e) => {
		setEmpMobile(e.target.value);
	};
	const setData6 = (e) => {
		setEmpAadhar(e.target.value);
	};
	const setData7 = (e) => {
		setEmpAddr1(e.target.value);
	};
	const setData8 = (e) => {
		setEmpAddr2(e.target.value);
	};
	const setData9 = (e) => {
		setEmpCity(e.target.value);
	};
	const setData10 = (e) => {
		setEmpPincode(e.target.value);
	};
	const setData11 = (e) => {
		setEstatus(e.target.value);
	};

	const getData = async () => {
		const res1 = await axios.get(
			`https://lekpay.com/employee/empread/${EmpId}`
		);

		if (res1.data.status === 201) {
			setEmpName(res1.data.data[0].EmpName);
			setEmpIntId(res1.data.data[0].EmpIntId);
			setEmpDOB(res1.data.data[0].EmpDOB);
			setEmpType(res1.data.data[0].EmpType);
			setEmpMobile(res1.data.data[0].EmpMobile);
			setEmpAadhar(res1.data.data[0].EmpAadhar);
			setEmpAddr1(res1.data.data[0].EmpAddr1);
			setEmpAddr2(res1.data.data[0].EmpAddr2);
			setEmpCity(res1.data.data[0].EmpCity);
			setEmpPincode(res1.data.data[0].EmpPincode);
			setEstatus(res1.data.data[0].EStatus);
			return;
		} else {
			console.log('error');
		}
	};

	const handleSub = async (e) => {
		e.preventDefault();

		if (
			!EmpName ||
			!EmpIntId ||
			!EmpDOB ||
			!EmpType ||
			!EmpMobile ||
			!EmpAadhar ||
			!EmpAddr1 ||
			!EmpAddr2 ||
			!EmpCity ||
			!EmpPincode ||
			!estatus
		) {
			alert('Fill the details');
			return;
		} else {
			const res = await axios.patch(
				`https://lekpay.com/employee/update/${EmpId}`,
				{
					EmpName,
					EmpIntId,
					EmpDOB,
					EmpType,
					EmpMobile,
					EmpAadhar,
					EmpAddr1,
					EmpAddr2,
					EmpCity,
					EmpPincode,
					estatus,
				}
			);
			if (res.data.status === 201) {
				alert('Employee successfully update');
				history('/empview');
				return;
			} else {
				alert('Employee unable to update');
				return;
			}
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
			getData();
		}
	}, []);
	return (
		<div className='flex flex-row gap-4'>
			<Opersidebar />
			<div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-[90%] max-h-[100vh] overflow-y-auto mx-auto'>
				<div className='py-2 flex flex-col justify-center items-center'>
					<form className='max-w-[400px] w-full mx-auto text-sm flex-row'>
						<h2 className='text-3xl text-pink-500 text-center py-2'>
							Update Employee
						</h2>
						<div className='flex flex-row py-2'>
							<label className='justify-center items-center mr-4 mt-1'>
								Employee Name:{' '}
							</label>
							<input
								type='text'
								name='EmpName'
								value={EmpName}
								className='border p-1 rounded w-[69%] hover:border-pink-500 duration-200'
								onChange={setData1}
							/>
						</div>
						<div className='flex flex-row py-2'>
							<label className='justify-center items-center mr-10 mt-1'>
								Employee Id:{' '}
							</label>
							<input
								type='text'
								name='EmpIntId'
								value={EmpIntId}
								className='border p-1 rounded w-[69%] hover:border-pink-500 duration-200'
								onChange={setData2}
							/>
						</div>
						<div className='flex flex-row py-2'>
							<label className='justify-center items-center mr-9 mt-1'>
								Date of birth:{' '}
							</label>
							<input
								type='date'
								name='EmpDOB'
								onChange={setData3}
								value={EmpDOB}
								className='border p-1 rounded w-[69%] hover:border-pink-500 duration-200'
							/>
						</div>
						<div className='flex flex-row py-2'>
							<label className='justify-center items-center mr-6 mt-1'>
								Employee Type:{' '}
							</label>
							<select
								className='border p-1 rounded w-[69%] hover:border-pink-500 duration-200'
								value={EmpType}
								onChange={setData4}
							>
								<option>Select Type</option>
								<option value='Conductor'>Conductor</option>
								<option value='Checker'>Checker</option>
								<option value='Depo Manager'>Depo Manager</option>
							</select>
						</div>
						<div className='flex flex-row py-2'>
							<label className='justify-center items-center mr-14 mt-1'>
								Phone no:{' '}
							</label>
							<input
								type='number'
								name='EmpMobile'
								value={EmpMobile}
								className='border p-1 rounded w-[69%] hover:border-pink-500 duration-200'
								onChange={setData5}
							/>
						</div>
						<div className='flex flex-row py-2'>
							<label className='justify-center items-center mr-4 mt-1'>
								Aadhar Number:{' '}
							</label>
							<input
								type='number'
								name='EmpAadhar'
								value={EmpAadhar}
								className='border p-1 rounded w-[69%] hover:border-pink-500 duration-200'
								onChange={setData6}
							/>
						</div>

						<div className='flex flex-row py-2'>
							<label className='justify-center items-center mr-14 mt-1'>
								Address 1:{' '}
							</label>
							<input
								type='text'
								name='EmpAddr1'
								value={EmpAddr1}
								className='border p-1 rounded w-[69%] hover:border-pink-500 duration-200'
								onChange={setData7}
							/>
						</div>
						<div className='flex flex-row py-2'>
							<label className='justify-center items-center mr-14 mt-1'>
								Address 2:{' '}
							</label>
							<input
								type='text'
								name='EmpAddr2'
								value={EmpAddr2}
								className='border p-1 rounded w-[69%] hover:border-pink-500 duration-200'
								onChange={setData8}
							/>
						</div>
						<div className='flex flex-row py-2'>
							<label className='justify-center items-center mr-20 mt-1'>
								City:{' '}
							</label>
							<input
								type='text'
								name='EmpCity'
								value={EmpCity}
								className='border p-1 rounded w-[69%] ml-3 hover:border-pink-500 duration-200'
								onChange={setData9}
							/>
						</div>
						<div className='flex flex-row py-2'>
							<label className='justify-center items-center mr-16 mt-1'>
								Pincode:{' '}
							</label>
							<input
								type='number'
								name='EmpPincode'
								value={EmpPincode}
								className='border p-1 rounded w-[69%] hover:border-pink-500 duration-200'
								onChange={setData10}
							/>
						</div>
						<div className='flex flex-row py-2'>
							<label className='justify-center items-center mr-16 mt-1'>
								Status:{' '}
							</label>
							<select
								className='border p-1 rounded w-[69%] ml-3 hover:border-pink-500 duration-200'
								name='estatus'
								value={estatus}
								onChange={setData11}
							>
								<option value='A'>Active</option>
								<option value='I'>Inactive</option>
							</select>
						</div>
						<button
							className='border  w-full my-2 py-2 text-white bg-pink-500 rounded text-lg hover:bg-pink-400 duration-200'
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

export default Empedit;
