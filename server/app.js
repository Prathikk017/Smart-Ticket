const express = require('express');
const db = require('./db/db');
const app = express();
const cron = require('node-cron');
const axios = require('axios');
const cors = require('cors');
const port = 8004;

const loginRoute = require('./routes/Login/login');
const adminRoute = require('./routes/Admin/admin');
const dataByIdRoute = require('./routes/Admin/dataById');
const ticketTypeRoute = require('./routes/Admin/addTicketType');
const userRoute = require('./routes/User/user');
const employeeRoute = require('./routes/Employee/employee');
const operatorRoute = require('./routes/Operator/operator');
const faqsRoute = require('./routes/FAQs/FAQs');
const findRoute = require('./routes/Find/find');
const otpRoute = require('./routes/OTP/otp');
const profileRoute = require('./routes/Profile/profile');
const setPassRoute = require('./routes/SetPassword/setPassword');
const chngPassRoute = require('./routes/ChngPassword/chngPassword');
const setRouteRoute = require('./routes/SetRoute/setRoute');
const getRoute = require('./routes/GetRoute/getRoute');
const getStage = require('./routes/GetStage/getStage');
const getFare = require('./routes/CalculateFare/fare');
const getTransactionId = require('./routes/Transaction/transaction');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use('/login', loginRoute);
app.use('/admin', adminRoute);
app.use('/admin', dataByIdRoute);
app.use('/admin', ticketTypeRoute);
app.use('/user', userRoute);
app.use('/employee', employeeRoute);
app.use('/operator', operatorRoute);
app.use('/faqs', faqsRoute);
app.use('/find', findRoute);
app.use('/otp', otpRoute);
app.use('/profile', profileRoute);
app.use('/set', setPassRoute);
app.use('/chng', chngPassRoute);
app.use('/setRoute', setRouteRoute);
app.use('/getRoute', getRoute);
app.use('/getStage', getStage);
app.use('/getFare', getFare);
app.use('/transaction', getTransactionId);




app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
  
	// Start the cron job after the server is up and running
	startCronJob();
  });
  
  function startCronJob() {
	const CRON_EXPRESSION = '29 10 * * *'; // Run the cron job once per day at midnight
  
	cron.schedule(CRON_EXPRESSION, async () => {
	  console.log('Cron job is running...');
	  try {
		const res = await axios.post('http://localhost:8004/operator/asset/checkexpiries');

		if(res.data.status === 201){
			console.log(res.data.data);
		}
	  } catch (error) {
		console.error('Error running cron job:', error);
	  }
	});
  }

module.exports = app;
