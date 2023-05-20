import React, { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const RefundsAndCancels = () => {
	useEffect(() => {
		window.scrollTo(0, 0); // Scrolls to the top of the page when the component is mounted
	}, []);

	return (
		<div>
			<Navbar />
			<div className='flex items-center justify-center h-screen'>
				<div className='mx-auto px-4 max-w-[1024px] text-justify'>
					<h1 className='font-semibold text-xl'>
						Commuter/Passenger ticket/Pass cancellation & refunds
					</h1>
					<p>
						<br />
					</p>
					<p>
						Ticket/Pass once purchased by Commuter/Passenger will not be
						cancelled when the request is successful by the application.
						However, subject to the user/commuter/passenger reasoning, LekPay
						reserves the right to deny any refund to user/commuter/passenger
						pursuant to a cancellation initiated by the user. If tickets/pass is
						not successful and the user/commuter/passenger provides sufficient
						proof, the money may be refunded within 10 days, as may be necessary
						at the sole discretion of LeyPay.
					</p>
					<p>
						<br />
					</p>
					<h1 className='font-semibold text-xl'>
						Ticket/pass, cancellation policy
					</h1>
					<p>
						<br />
					</p>
					<p>
						1. Tickets/pass once booked is non-refundable and non-transferrable
						<br />
						2. User/commuter/passenger should use the mobile app to register and
						make ticket/pass purchase from the LekPay app
						<br />
						3. In case of any fraud detected, LekPay reserves the right to block
						the user from further using the app and no money will be refunded.
					</p>
					<p>
						<br />
					</p>
					<h1 className='font-semibold text-xl'>Platform fee</h1>
					<p>
						We do not charge any platform fees for ticket/pass purchase, the
						charges paid by the users will be completely transferred to the
						Transport operator account.
					</p>
					<p>
						For any support or query write us at{' '}
						<strong>lekpayinfo@gmail.com</strong>
					</p>
				</div>
			</div>

			<div>
				<Footer />
			</div>
		</div>
	);
};

export default RefundsAndCancels;
