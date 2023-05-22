import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useFormik } from 'formik';
import EmployeeDetail from '../../../assets/template/Employee_Detail.xlsx';
import Opersidebar from '../Opersidebar';
import { empRegisterSchema } from '../../../schemas/index';
import useIdleTimeout from '../../../useIdleTimeout';
import * as XLSX from 'xlsx';

const initialValues = {
	EmpName: '',
	EmpIntId: '',
	EmpPhone: '',
	EmpAadhar: '',
	EmpAddr1: '',
	EmpAddr2: '',
	EmpCity: '',
	EmpPincode: '',
};

const Empregister = () => {
	const [EmpDOB, setEmpDOB] = useState('');
	const [EmpType, setEmpType] = useState('');
	// const [currentItemIndex, setCurrentItemIndex] = useState(0);
	const [recordsAdded, setRecordsAdded] = useState(0);
	const [recordsNotAdded, setRecordsNotAdded] = useState(0);
	const [skippedRecords, setSkippedRecords] = useState([]);
	const [fileSelected, setFileSelected] = useState(false);

	const history = useNavigate();

	const ID = window.localStorage.getItem('OperID');
	var operId = JSON.parse(ID);
	const [items, setItems] = useState([]);

	const {
		values,
		errors,
		touched,
		handleBlur,
		handleChange,
		handleSubmit,
		resetForm,
	} = useFormik({
		initialValues: initialValues,
		validationSchema: empRegisterSchema,
		onSubmit: (values) => {
			console.log(values);
			resetForm();
		},
	});

	const EmpName = values.EmpName;
	const EmpIntId = values.EmpIntId;
	const EmpMobile = values.EmpPhone;
	const EmpAadhar = values.EmpAadhar;
	const EmpAddr1 = values.EmpAddr1;
	const EmpAddr2 = values.EmpAddr2;
	const EmpCity = values.EmpCity;
	const EmpPincode = values.EmpPincode;

	// function
	const setData = (e) => {
		const dob = e.target.value;
		setEmpDOB(dob);
	};
	const setData1 = (e) => {
		setEmpType(e.target.value);
	};

	//function to read excel file
	const readExcel = (file) => {
		const promise = new Promise((resolve, reject) => {
			const fileReader = new FileReader();
			setFileSelected(true);
			fileReader.readAsArrayBuffer(file);

			fileReader.onload = (e) => {
				const bufferArray = e.target.result;

				const wb = XLSX.read(bufferArray, { type: 'buffer' });

				const wsname = wb.SheetNames[0];

				const ws = wb.Sheets[wsname];

				const data = XLSX.utils.sheet_to_json(ws);

				if (data.length === 0) {
					alert('Excel file is empty.');
					reject('Empty file');
				} else {
					resolve(data);
				}
			};

			fileReader.onerror = (error) => {
				reject(error);
			};
		});

		promise.then((d) => {
			setItems(d);
		});
	};

	//function to download template
	const handleDownload = () => {
		const link = document.createElement('a');
		link.href = EmployeeDetail; // Replace with the actual path to your template file
		link.download = 'Employee Detail.xlsx'; // Specify the desired filename
		link.click();
	};

	const handleSub = async (e) => {
		e.preventDefault();
		let skippedRecords = [];
		let notAddedRecords = [];
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
			!EmpPincode
		) {
			alert('Fill the details');
			return;
		}

		if (items.length > 0) {
			let addedCount = 0;
			let notAddedCount = 0;
			let notAddedCount1 = 0;

			for (let i = 0; i < items.length; i++) {
				const item = items[i];

				const {
					'Employee Name': EmpName,
					'Employee Id': EmpIntId,
					'Date of birth': EmpDOB,
					'Employee Type': EmpType,
					'Phone no': EmpMobile,
					'Aadhar Number': EmpAadhar,
					'Address 1': EmpAddr1,
					'Address 2': EmpAddr2,
					City: EmpCity,
					Pincode: EmpPincode,
				} = item;

				// Check if any field is empty
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
					!EmpPincode
				) {
					notAddedCount1++;
					notAddedRecords.push(EmpIntId);
					continue;
				}

				try {
					// Check if the EmployeeIntId already exists in the database
					const checkResult = await axios.get(
						`https://lekpay.com/employee/check/${EmpIntId}`
					);

					if (checkResult.data.status === 201 && checkResult.data.data !== 0) {
						notAddedCount++;
						skippedRecords.push(` ${EmpIntId}`);
						continue;
					}

					// Register the item
					await axios.post('https://lekpay.com/employee/create', {
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
						operId,
					});

					addedCount++;
				} catch (error) {
					console.log(
						`Error occurred while registering item with EmployeeID ${EmpIntId}`
					);
					notAddedCount++;
				}
			}

			setRecordsAdded(addedCount);
			setRecordsNotAdded(notAddedCount);
			setSkippedRecords(skippedRecords);
			resetForm();
			setItems([]);
			if (addedCount === 0) {
				alert(
					`${notAddedCount} and employee with EmployeeID ${skippedRecords} records already existed skipped registration .`
				);
			} else {
				alert(`${addedCount} records of employee data have been added.`);
			}
			if (notAddedCount1 > 0) {
				alert(
					`${notAddedCount1} records and employee with EmployeeID ${notAddedRecords} have empty fields skipped registartion.`
				);
			}
			// Reset the form values
			setTimeout(() => window.location.reload(), 200);
		} else {
			try {
				const checkResult = await axios.get(
					`https://lekpay.com/employee/check/${EmpIntId}`
				);

				if (checkResult.data.status === 201 && checkResult.data.data !== 0) {
					alert(`${EmpIntId} already existed.`);
					resetForm();
					return;
				} else {
					const res = await axios.post('https://lekpay.com/employee/create', {
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
						operId,
					});

					if (res.data.status === 201) {
						alert('Employee successfully created');
						resetForm();
						setTimeout(() => history('/Operdashboard'), 500);
						return;
					} else {
						alert('Employee unable to register');
						resetForm();
						return;
					}
				}
			} catch (error) {
				console.log(error);
				alert('Error occurred while registering employee');
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
		if (items.length > 0) {
			const data = items[0];
			const {
				'Employee Name': EmpName,
				'Employee Id': EmpIntId,
				'Date of birth': EmpDOB,
				'Employee Type': EmpType,
				'Phone no': EmpPhone,
				'Aadhar Number': EmpAadhar,
				'Address 1': EmpAddr1,
				'Address 2': EmpAddr2,
				City: EmpCity,
				Pincode: EmpPincode,
			} = data;

			// Set form values
			values.EmpName = EmpName || '';
			values.EmpIntId = EmpIntId || '';
			values.EmpPhone = EmpPhone || '';
			values.EmpAadhar = EmpAadhar || '';
			values.EmpAddr1 = EmpAddr1 || '';
			values.EmpAddr2 = EmpAddr2 || '';
			values.EmpCity = EmpCity || '';
			values.EmpPincode = EmpPincode || '';
			setEmpDOB(EmpDOB || '');
			setEmpType(EmpType || '');
		}
	}, [items]);

	useEffect(() => {
		const token = window.localStorage.getItem('Lekpay');
		const Token = JSON.parse(token);
		if (!Token) {
			history('/signin');
		}
	}, []);

	return (
		<div className='flex flex-row gap-4'>
			<Opersidebar />
			<div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-[90%] max-h-[100vh] overflow-y-auto mx-auto'>
				<div className='py-2 flex flex-col justify-center items-center'>
					<form
						className='max-w-[400px] w-full mx-auto text-sm flex-row'
						onSubmit={handleSubmit}
					>
						<h2 className='text-3xl text-pink-500 text-center pb-6'>
							Employee Register
						</h2>
						<div className='flex flex-row py-2'>
							<label className='justify-center items-center mr-4 mt-1'>
								Employee Name:{' '}
							</label>
							<input
								type='text'
								name='EmpName'
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.EmpName}
								className='border p-1 rounded w-[69%] hover:border-pink-500 duration-200'
							/>
							{errors.EmpName && touched.EmpName ? (
								<p className='text-red-500 text-xs '>{errors.EmpName}</p>
							) : null}
						</div>
						<div className='flex flex-row py-2'>
							<label className='justify-center items-center mr-10 mt-1'>
								Employee Id:{' '}
							</label>
							<input
								type='text'
								name='EmpIntId'
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.EmpIntId}
								className='border p-1 rounded w-[69%] hover:border-pink-500 duration-200'
							/>
							{errors.EmpIntId && touched.EmpIntId ? (
								<p className='text-red-500 text-xs '>{errors.EmpIntId}</p>
							) : null}
						</div>
						<div className='flex flex-row py-2'>
							<label className='justify-center items-center mr-9 mt-1'>
								Date of birth:{' '}
							</label>
							<input
								type='date'
								onChange={setData}
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
								onChange={setData1}
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
								name='EmpPhone'
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.EmpPhone}
								className='border p-1 rounded w-[69%] hover:border-pink-500 duration-200'
							/>
							{errors.EmpPhone && touched.EmpPhone ? (
								<p className='text-red-500 text-xs '>{errors.EmpPhone}</p>
							) : null}
						</div>
						<div className='flex flex-row py-2'>
							<label className='justify-center items-center mr-4 mt-1'>
								Aadhar Number:{' '}
							</label>
							<input
								type='number'
								name='EmpAadhar'
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.EmpAadhar}
								className='border p-1 rounded w-[69%] hover:border-pink-500 duration-200'
							/>
							{errors.EmpAadhar && touched.EmpAadhar ? (
								<p className='text-red-500 text-xs '>{errors.EmpAadhar}</p>
							) : null}
						</div>
						<div className='flex flex-row py-2'>
							<label className='justify-center items-center mr-14 mt-1'>
								Address 1:{' '}
							</label>
							<input
								type='text'
								name='EmpAddr1'
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.EmpAddr1}
								className='border p-1 rounded w-[69%] hover:border-pink-500 duration-200'
							/>
							{errors.EmpAddr1 && touched.EmpAddr1 ? (
								<p className='text-red-500 text-xs '>{errors.EmpAddr1}</p>
							) : null}
						</div>
						<div className='flex flex-row py-2'>
							<label className='justify-center items-center mr-14 mt-1'>
								Address 2:{' '}
							</label>
							<input
								type='text'
								name='EmpAddr2'
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.EmpAddr2}
								className='border p-1 rounded w-[69%] hover:border-pink-500 duration-200'
							/>
							{errors.EmpAddr2 && touched.EmpAddr2 ? (
								<p className='text-red-500 text-xs '>{errors.EmpAddr2}</p>
							) : null}
						</div>
						<div className='flex flex-row py-2'>
							<label className='justify-center items-center mr-20 mt-1'>
								City:{' '}
							</label>
							<input
								type='text'
								name='EmpCity'
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.EmpCity}
								className='border p-1 rounded w-[69%] ml-3 hover:border-pink-500 duration-200'
							/>
							{errors.EmpCity && touched.EmpCity ? (
								<p className='text-red-500 text-xs '>{errors.EmpCity}</p>
							) : null}
						</div>
						<div className='flex flex-row py-2'>
							<label className='justify-center items-center mr-16 mt-1'>
								Pincode:{' '}
							</label>
							<input
								type='number'
								name='EmpPincode'
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.EmpPincode}
								className='border p-1 rounded w-[69%] hover:border-pink-500 duration-200'
							/>
							{errors.EmpPincode && touched.EmpPincode ? (
								<p className='text-red-500 text-xs '>{errors.EmpPincode}</p>
							) : null}
						</div>
						<button
							className='border  w-full my-2 py-2  mb-16 text-white bg-pink-500 rounded text-lg hover:bg-pink-400 duration-200'
							onClick={handleSub}
						>
							{fileSelected ? 'Submit' : 'Register'}
						</button>
					</form>
				</div>
				<div className='m-auto grid grid-flow-row gap-4'>
					<button
						className='bg-gray-200 hover:bg-pink-300  px-2 py-2 rounded-md w-max'
						onClick={handleDownload}
					>
						Download Template
					</button>
					<input
						type='file'
						accept='.xlsx, .xls'
						onChange={(e) => {
							const file = e.target.files[0];
							readExcel(file);
						}}
					/>
				</div>
			</div>
		</div>
	);
};

export default Empregister;
