const db = require('../../db/db');
// const twilio = require('twilio');
const moment = require('moment');
const bcrypt = require('bcryptjs');
const saltRounds = 10;


//read last row from tblemployee by id
exports.getEmployee = (req, res) =>{
  var query = "SELECT * FROM tblemployee ORDER BY EmpId DESC LIMIT 1";
  db.query(query, (err, results) => {
    
    if (!err) {
      if(results.length>0){
        return res.status(200).json({ status: 201, data: results[0].EmpId });
      }else{
        return res.status(200).json({ status: 201, data: "0"});
      }
      
    } else {
      return res.status(500).json({ status: 500, data: err });
    }
  });
}
// CREATE A NEW EMPLOYEE
exports.create = (req, res) => {
  let tblEmployee = req.body;
  let id = parseInt(tblEmployee.EmpId);
  id = id + 1;
  const OperID = tblEmployee.operId;
  var EmpId = `${OperID}EMP${id}`;
  var EStatus = 'I';
  var EmpCreatedDate = moment().format('YYYY-MM-DD hh:mm:ss');
  bcrypt.hash(tblEmployee.EmpPassword, saltRounds, (err, hash) => {
    if (!err) {
      query =
        'INSERT INTO tblEmployee (EmpId, EmpName, EmpIntId, EmpDOB, EmpType, EmpMobile, EmpAadhar, EmpPassword, EmpAddr1, EmpAddr2, EmpCity, EmpPincode, EStatus,  EmpCreatedDate) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
      db.query(
        query,
        [
          EmpId,
          tblEmployee.EmpName,
          tblEmployee.EmpIntId,
          tblEmployee.EmpDOB,
          tblEmployee.EmpType,
          tblEmployee.EmpMobile,
          tblEmployee.EmpAadhar,
          hash,
          tblEmployee.EmpAddr1,
          tblEmployee.EmpAddr2,
          tblEmployee.EmpCity,
          tblEmployee.EmpPincode,
          EStatus,
          EmpCreatedDate,
        ],
        (err, results) => {
          if (!err) {
            return res
              .status(200)
              .json({ status: 201, data: 'Employee created successfully' });
          } else {
            return res.status(500).json(err);
          }
        }
      );
    } else {
      console.log(err);
    }
  });
};

//FIND EMPLOYEE IN EMPLOYEETABLE
exports.find = (req, res) => {
  const tblEmployee = req.body;
  query =
    'SELECT EmpId, Status FROM tblEmployee WHERE EmpMobile=? and EmpDOB=?';
  db.query(
    query,
    [tblEmployee.EmpMobile, tblEmployee.EmpDOB],
    (err, result) => {
      console.log(result);
      if (!err) {
        if (result == 0) {
          return res.status(200).json({ message: 'Employee Not Found' });
        } else {
          insertTblOtp(
            result[0].EmpId,
            tblEmployee.EmpMobile,
            result[0].Status
          );
          return res.status(200).send(result[0].EmpId);
        }
      } else {
        return res.status(500).json(err);
      }
    }
  );
};

//INSERT OTP INTO OTPTABLE
const insertTblOtp = (id, mobile, status) => {
  var otp = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
  var createdtime = moment().format('YYYY-MM-DD hh:mm:ss');
  query =
    'INSERT INTO tblOtp (id, mobile, status, otp, createdtime) VALUES(?, ?, ?, ?, ?)';
  db.query(query, [id, mobile, status, otp, createdtime], (err, result) => {
    if (!err) {
      // sendSMS(otp);
      return console.log('inserted into tblotp');
    } else {
      return console.log(err);
    }
  });
};

//CALL SMS API
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

//VERIFY USER OTP
exports.verifyOTP = (req, res) => {
  const tblOtp = req.body;
  var query = 'SELECT * FROM tblOtp WHERE id=? and otp=?';
  db.query(query, [tblOtp.id, tblOtp.otp], (err, results) => {
    if (!err) {
      if (results.length > 0) {
        res.status(201).json({ status: 201, data: 'Verified' });
        EStatusChng(tblOtp.id);
      } else {
        res.send({ data: 'Wrong OTP!!' });
      }
    } else {
      res.send(err);
    }
  });
};

//CHANGE STATUS OF EMPLOYEE TO A AFTER OTP VERIFICATION
const EStatusChng = (id) => {
  var EStatus = 'A';
  var query = 'UPDATE tblEmployee SET EStatus = ? WHERE EmpId = ?';
  db.query(query, [EStatus, id], (err, results) => {
    if (!err) {
      if (results.affectedRows == 0) {
        console.log('Employee not found');
      }
      console.log('EStatus updated');
      addAuth(id);
      return;
    } else {
      console.log(err);
    }
  });
};

//ADD EMPLOYEE DATA TO AUTHTABLE
const addAuth = (id) => {
  var query =
    'INSERT INTO tblAuth (AuthID, MobileNo, Password, Status) SELECT EmpId, EmpMobile, EmpPassword, Status FROM tblEmployee WHERE EmpId = ?';
  db.query(query, [id], (err, result) => {
    if (!err) {
      console.log(result);
    } else {
      console.log(err);
    }
  });
};

//SET OR RESET EMPLOYEE PASSWORD
exports.setPassword = (req, res) => {
  let tblEmployee = req.body;
  let id = tblEmployee.EmpId;
  bcrypt.hash(tblEmployee.EmpPassword, saltRounds, (err, hash) => {
    if (!err) {
      query = 'UPDATE tblEmployee SET EmpPassword = ? WHERE EmpId = ?';
      db.query(query, [hash, id], (err, results) => {
        if (!err) {
          if (results.affectedRows == 0) {
            return res.status(404).json({ message: 'Employee ID not Found' });
          }
          updtPassInAuth(hash, id);
          return res.status(200).json({ message: 'Password Set' });
        } else {
          return res.status(500).json(err);
        }
      });
    } else {
      console.log(err);
    }
  });
};

//UPDATE PASSWORD IN AUTHTABLE
const updtPassInAuth = (password, id) => {
  var query = 'UPDATE tblAuth SET Password = ? WHERE AuthId = ?';
  db.query(query, [password, id], (err, results) => {
    if (!err) {
      if (results.affectedRows == 0) {
        console.log('Employee not found');
      } else {
        console.log('Password set in auth');
      }
    }
  });
};

//EMPLOYEE LOGIN
exports.login = (req, res) => {
  const tblEmployee = req.body;
  var query = 'SELECT * FROM tblAuth WHERE MobileNo = ? and Status = ?';
  db.query(
    query,
    [tblEmployee.EmpMobile, tblEmployee.Status],
    (err, results) => {
      if (!err) {
        if (results.length > 0) {
          console.log(results);
          bcrypt.compare(
            tblEmployee.EmpPassword,
            results[0].Password,
            (err, response) => {
              if (response) {
                res.status(201).json({ status: 201, data: results[0].status });
              } else {
                res
                  .status(201)
                  .json({ message: 'Wrong Phone number/Password!!' });
              }
            }
          );
        } else {
          res.status(200).json({ status: 200, data: 'User doesnt exist' });
        }
      } else {
        res.send(err);
      }
    }
  );
};