import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Opersidebar from '../Opersidebar';
import { useNavigate } from 'react-router-dom';
import useIdleTimeout from '../../../useIdleTimeout';

const Stageregister = () => {
	const [StageName, setStageName] = useState('');
	const history = useNavigate();

	const setData = (e) => {
		setStageName(e.target.value);
	};

	const ID = window.localStorage.getItem('OperID');
	var operId = JSON.parse(ID);
	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!StageName) {
			alert('Fill the details');
			return;
		} else {
			const res = await axios.post(
				'https://lekpay.com/operator/stagevalidate',
				{
					StageName,
					operId,
				}
			);
			if (res.data.status === 201) {
				alert(res.data.data);
				var form1 = document.getElementsByName('contact-form')[0];
				form1.reset();
				return;
			} else {
				const res1 = await axios.post(
					'https://lekpay.com/operator/stagecreate',
					{
						StageName,
						operId,
					}
				);

				if (res1.data.status === 201) {
					alert('Stage Successfully Created');
					var form = document.getElementsByName('contact-form')[0];
					form.reset();
					return;
				} else {
					alert('Stage unable to Register');
					return;
				}
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
		}
	}, []);

	return (
		<div className='flex flex-row gap-4'>
			<Opersidebar />
			<div className='h-screen w-full justify-start items-start'>
				<div className='py-2 flex flex-col '>
					<form className='max-w-[400px] w-full mx-auto' name='contact-form'>
						<h2 className='text-4xl text-pink-500 text-center py-4'>
							Stage Register
						</h2>
						<div className='flex flex-col py-1'>
							<label>Stage Name</label>
							<input
								type='text'
								onChange={setData}
								className='border rounded w-full hover:border-pink-500 duration-200 p-1'
							/>
						</div>

						<button
							className='border w-full my-2 py-2 text-white bg-pink-500 rounded text-lg hover:bg-pink-400 duration-200'
							onClick={handleSubmit}
						>
							Submit
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Stageregister;
