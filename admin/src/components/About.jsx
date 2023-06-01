import React, { useEffect } from 'react';
import Footer from './Footer';
import Navbar from './Navbar';

const About = () => {
	useEffect(() => {
		window.scrollTo(0, 0); // Scrolls to the top of the page when the component is mounted
	}, []);

	return (
		<div>
			<Navbar />
			<div className='flex items-center justify-center h-screen'>
				<div className='mx-auto px-4 max-w-[1024px] text-justify'>
					<h1 className='font-semibold text-2xl'>
						LekPay is a Global platform for ticketing digitally proudly owned by
						Powaha Infotech Private Limited.
					</h1>
					<p>
						<br />
					</p>
					<p className='text-lg'>
						LekPay is on a Software as a Service (SaaS) platform where we
						on-board multiple operators(Transport, Entertainment, Events, etc)
						and provide them a platform to digitally elevate themselves and
						start collection of fare digitally from their commuters/audience.
						This is completely self service model by the commuters/audience
						which is paperless and information made available in real-time.
					</p>
					<p>
						<br />
					</p>
					<p className='text-lg'>
						The platform provides information of all asset activites and cash
						collections to the Operators in real time.
					</p>
					<p>
						<br />
					</p>
					<p className='text-lg'>
						We on-board the operator and setup all their assets and related
						employees on the platform. Commuters/Audience have to install our
						mobile app <strong>(LEKPAY)</strong> on their mobile phones. <br />{' '}
						User will scan the QR code in the asset, select the Source &
						Destination of travel and pays the fare as indicated via UPI. Ticket
						is generated and displayed to the Commuter/Audience.
					</p>
				</div>
			</div>
			<div>
				<Footer />
			</div>
		</div>
	);
};

export default About;
