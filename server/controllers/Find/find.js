const db = require('../../db/db');
const moment = require('moment');
// const twilio = require('twilio');
// const dotenv = require('dotenv');

// dotenv.config();

exports.findUSER = (req, res) => {
  const data = req.body;
  query = 'SELECT UserId, Flag FROM tblCommuter WHERE UMobile = ? and UDoB = ?';
  db.query(query, [data.Mobile, data.Dob], (err, results) => {
    if (!err) {
      if (results == 0) {
        return res.status(200).json({ message: 'User not found' });
      } else {
        return res.status(200).send(results);
      }
    } else {
      console.log(err);
    }
  });
};

exports.findEMPLOYEE = (req, res) => {
  const data = req.body;
  query =
    'SELECT EmpId, Flag FROM tblEmployee WHERE EmpMobile = ? and EmpDOB = ?';
  db.query(query, [data.Mobile, data.Dob], (err, results) => {
    if (!err) {
      if (results == 0) {
        return res.status(200).json({ message: 'Employee not found' });
      } else {
        insertTblOtp(results[0].EmpId, data.Mobile, results[0].Flag);
        return res.status(200).send(results);
      }
    } else {
      console.log(err);
    }
  });
};

//INSERT OTP INTO OTPTABLE
const insertTblOtp = (id, mobile, flag) => {
  var otp = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
  var createdtime = moment().format('YYYY-MM-DD hh:mm:ss');
  query =
    'INSERT INTO tblOtp (id, mobile, flag, otp, createdtime) VALUES(?, ?, ?, ?, ?)';
  db.query(query, [id, mobile, flag, otp, createdtime], (err, result) => {
    if (!err) {
      // sendSMS(otp);
      return console.log('inserted into tblotp');
    } else {
      return console.log(err);
    }
  });
};

// CALL SMS API
// const sendSMS = (Eotp) => {
//   const client = new twilio(
//     'AC4a9df1bac3df96fc0e86a29f95592576',
//     '22c765466032d111c2a9a370ad154996'
//   );

//   return client.messages
//     .create({
//       body: `${Eotp}`,
//       from: '+12764962602',
//       to: '+917892067697',
//     })
//     .then((message) => {
//       console.log(message, 'Message Sent');
//     })
//     .catch((err) => {
//       console.log(err, 'Message NOT Sent');
//     });
// };
