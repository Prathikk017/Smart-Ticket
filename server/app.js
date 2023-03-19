const express = require('express');
const db = require('./db/db');
const app = express();
const cors = require('cors');
const port = 8004;


const adminRoute = require('./routes/Admin/admin');
const userRoute = require('./routes/User/user');
const employeeRoute = require('./routes/Employee/employee');
const operatorRoute = require('./routes/Operator/operator');
const faqsRoute = require('./routes/FAQs/FAQs');


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use('/admin', adminRoute);
app.use('/user', userRoute);
app.use('/employee', employeeRoute);
app.use('/operator', operatorRoute);
app.use('/faqs', faqsRoute);

app.listen(port, () => {
    console.log(`server listening on ${port}`);
  });
  
module.exports = app;