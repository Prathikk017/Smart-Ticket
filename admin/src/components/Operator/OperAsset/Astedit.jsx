import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Opersidebar from '../Opersidebar';
import useIdleTimeout from '../../../useIdleTimeout';

const Astedit = () => {
	const [astName, setAstName] = useState('');
	const [astModel, setAstModel] = useState('');
	const [astChasNo, setAstChasNo] = useState('');
	const [astEngNo, setAstEngNo] = useState('');
	const [astPermitNo, setAstPermitNo] = useState('');
	const [astInsurExp, setAstInsurExp] = useState('');
	const [astPermitExp, setAstPermitExp] = useState('');
	const [astatus, setAstatus] = useState('');
	const history = useNavigate();

	const { AstId } = useParams();

	// function

	const setData2 = (e) => {
		setAstName(e.target.value);
	};
	const setData3 = (e) => {
		setAstModel(e.target.value);
	};
	const setData4 = (e) => {
		setAstChasNo(e.target.value);
	};
	const setData5 = (e) => {
		setAstEngNo(e.target.value);
	};
	const setData6 = (e) => {
		setAstPermitNo(e.target.value);
	};
	const setData7 = (e) => {
		setAstInsurExp(e.target.value);
	};
	const setData8 = (e) => {
		setAstPermitExp(e.target.value);
	};
	const setData9 = (e) => {
		setAstatus(e.target.value);
	};
	const getData = async () => {
		const res1 = await axios.get(
			`https://lekpay.com/operator/astread/${AstId}`
		);

		if (res1.data.status === 201) {
			setAstName(res1.data.data[0].AstName);
			setAstModel(res1.data.data[0].AstModel);
			setAstChasNo(res1.data.data[0].AstChasNo);
			setAstEngNo(res1.data.data[0].AstEngNo);
			setAstPermitNo(res1.data.data[0].AstPermitNo);
			setAstInsurExp(res1.data.data[0].AstInsurExp);
			setAstPermitExp(res1.data.data[0].AstPermitExp);
			setAstatus(res1.data.data[0].AStatus);
			return;
		} else {
			console.log('error');
		}
	};

	const handleSub = async (e) => {
		e.preventDefault();

		if (
			!astName ||
			!astModel ||
			!astChasNo ||
			!astEngNo ||
			!astPermitNo ||
			!astInsurExp ||
			!astPermitExp ||
			!astatus
		) {
			alert('Fill the details');
			return;
		} else {
			const res = await axios.patch(
				`https://lekpay.com/operator/asset/update/${AstId}`,
				{
					astName,
					astModel,
					astChasNo,
					astEngNo,
					astPermitNo,
					astInsurExp,
					astPermitExp,
					astatus,
				}
			);
			if (res.data.status === 201) {
				alert('Asset successfully update');
				history('/astview');
				return;
			} else {
				alert('Asset unable to update');
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
			<div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
				<div className='py-4 flex flex-col justify-center items-center'>
					<form className='max-w-[500px] w-full mx-auto'>
						<h2 className='text-4xl text-pink-500 text-center py-1'>
							Update Asset
						</h2>

						<div className='flex flex-row py-2'>
							<label className='justify-center items-center mr-24 mt-1'>
								Asset Model:{' '}
							</label>
							<input
								name='astName'
								type='text'
								onChange={setData2}
								value={astName}
								className='border rounded w-[58%] hover:border-pink-500 duration-200 p-1'
							/>
						</div>
						<div className='flex flex-row py-2'>
							<label className='justify-center items-center mr-14 mt-1'>
								Manufacture Year:{' '}
							</label>
							<input
								name='astModel'
								type='number'
								onChange={setData3}
								value={astModel}
								className='border rounded w-[58%] ml-1 hover:border-pink-500 duration-200 p-1'
							/>
						</div>
						<div className='flex flex-row py-2'>
							<label className='justify-center items-center mr-16 mt-1'>
								Chasis Number:{' '}
							</label>
							<input
								name='astChasNo'
								type='text'
								onChange={setData4}
								value={astChasNo}
								className='border rounded w-[58%] ml-3 hover:border-pink-500 duration-200 p-1'
							/>
						</div>
						<div className='flex flex-row py-2'>
							<label className='justify-center items-center mr-16 mt-1'>
								Engine Number:{' '}
							</label>
							<input
								name='astEngNo'
								type='text'
								onChange={setData5}
								value={astEngNo}
								className='border rounded w-[58%] ml-2 hover:border-pink-500 duration-200 p-1'
							/>
						</div>
						<div className='flex flex-row py-2'>
							<label className='justify-center items-center mr-16 mt-1'>
								Permit Number:{' '}
							</label>
							<input
								name='astPermitNo'
								type='text'
								onChange={setData6}
								value={astPermitNo}
								className='border rounded w-[58%] ml-3 hover:border-pink-500 duration-200 p-1'
							/>
						</div>
						<div className='flex flex-row py-2'>
							<label className='justify-center items-center mr-20 mt-1'>
								Insurance Exp:{' '}
							</label>
							<input
								name='astInsurExp'
								type='date'
								onChange={setData7}
								value={astInsurExp}
								className='border rounded w-[58%] ml-2 hover:border-pink-500 duration-200 p-1'
							/>
						</div>
						<div className='flex flex-row py-2'>
							<label className='justify-center items-center mr-28 mt-1'>
								Permit Exp:{' '}
							</label>
							<input
								name='astPermitExp'
								type='date'
								onChange={setData8}
								value={astPermitExp}
								className='border rounded w-[58%] hover:border-pink-500 duration-200 p-1'
							/>
						</div>
						<div className='flex flex-row py-2'>
							<label className='justify-center items-center mr-28 mt-1'>
								Status:{' '}
							</label>
							<select
								className='border p-1 rounded w-[58%] ml-8 hover:border-pink-500 duration-200'
								name='astatus'
								value={astatus}
								onChange={setData9}
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

export default Astedit;
