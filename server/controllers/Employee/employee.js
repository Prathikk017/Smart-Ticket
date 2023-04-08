const db = require('../../db/db');
// const twilio = require('twilio');
const moment = require('moment');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

// CREATE A NEW EMPLOYEE
exports.createEmployee = (req, res) => {
  let tblEmployee = req.body;
  const OperID = tblEmployee.operId;
  var query1 = `SELECT Num,EmpId FROM tblemployee WHERE EmpId LIKE '%${OperID}%' ORDER BY Num DESC LIMIT 1`;
  db.query(query1, (err, result) => {
    if (!err) {
      if (result.length > 0) {
        let emp = parseInt(result[0].Num);
        let empid = emp + 1;
        var EmpId = `${OperID}EMP${empid}`;
        var EStatus = 'I';
        var EmpCreatedDate = moment().format('YYYY-MM-DD hh:mm:ss');
        bcrypt.hash(tblEmployee.EmpPassword, saltRounds, (err, hash) => {
          if (!err) {
            var query =
              'INSERT INTO tblemployee (Num, EmpId, EmpName, EmpIntId, EmpDOB, EmpType, EmpMobile, EmpAadhar, EmpPassword, EmpAddr1, EmpAddr2, EmpCity, EmpPincode, EStatus,  EmpCreatedDate) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
            db.query(
              query,
              [
                empid,
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
                    .json({
                      status: 201,
                      data: 'Employee created successfully',
                    });
                } else {
                  return res.status(500).json(err);
                }
              }
            );
            return;
          } else {
            console.log(err);
          }
        });
      }else {
      let empid = result.length;
      empid = empid + 1;
      var EmpId = `${OperID}EMP${empid}`;
      var EStatus = 'I';
      var EmpCreatedDate = moment().format('YYYY-MM-DD hh:mm:ss');
      bcrypt.hash(tblEmployee.EmpPassword, saltRounds, (err, hash) => {
        if (!err) {
          var query =
            'INSERT INTO tblemployee (Num, EmpId, EmpName, EmpIntId, EmpDOB, EmpType, EmpMobile, EmpAadhar, EmpPassword, EmpAddr1, EmpAddr2, EmpCity, EmpPincode, EStatus,  EmpCreatedDate) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
          db.query(
            query,
            [
              empid,
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
                  .status(200).json({ status: 201, data: 'Employee created successfully' });
              } else {
                return res.status(500).json(err);
              }
            }
          );
        } else {
          console.log(err);
        }
      });
    }
  }else{
    console.log(err);
  };
})
}

//read Employee by operator id
exports.readEmployee = (req,res)=>{
  let tblemployee = req.body;
  let operID = tblemployee.operId;
  let query = `SELECT EmpId,EmpName,EmpIntId,EmpDOB,EmpType,EStatus FROM tblemployee WHERE  EmpId LIKE '%${operID}%'`;
  db.query(query, (err, result) =>{
    if(!err){
      res.status(200).json({status: 201, data: result});
      return;
    }else{
      res.status(500).json({message:"asset not found to operator"});
    }
  })
}

//get employee by id
exports.getEmployeeById = (req, res) => {
  const { EmpId } = req.params;
  var query = `SELECT * FROM tblemployee WHERE EmpId = '${EmpId}'`;
  db.query(query, (err, results) => {
    if (!err) {
      return res.status(200).json({ status: 201, data: results });
    } else {
      return res.status(500).json({ status: 500, data: err });
    }
  });
};

//soft delete from tblemployee by id
exports.deleteEmployee = (req, res) => {
  const { EmpId } = req.params;
  var EStatus = 'I';
  var query = 'UPDATE tblemployee SET EStatus = ? WHERE EmpId = ? ';
  db.query(query, [EStatus, EmpId], (err, results) => {
    if (!err) {
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: 'Employee does not found' });
      }
     res.status(201).json({status: 201, data: "Employee deleted successfully"});
     return ;
    } else {
      return res.status(500).json(err);
    }
  });
};

//update employee by ID
exports.updateEmployee = (req,res)=>{
  const { EmpId } = req.params;
  let tblEmployee = req.body;
  let EmpModifyDate = moment().format('YYYY-MM-DD hh:mm:ss');
  let query = `UPDATE tblemployee SET EmpName=?, EmpIntId=?, EmpDOB=?, EmpType=?, EmpMobile=?, EmpAadhar=?, EmpAddr1=?, EmpAddr2=?, EmpCity=?, EmpPincode=?, EmpModifyDate=? WHERE EmpId  = '${EmpId}'`
  db.query(query,[tblEmployee.EmpName, tblEmployee.EmpIntId, tblEmployee.EmpDOB, tblEmployee.EmpType, tblEmployee.EmpMobile, tblEmployee.EmpAadhar, tblEmployee.EmpAddr1, tblEmployee.EmpAddr2, tblEmployee.EmpCity, tblEmployee.EmpPincode, EmpModifyDate],(err, result)=>{
    if (!err) {
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Employee does not found' });
      }
     res.status(201).json({status: 201, data: "Employee update successfully"});
     return ;
    } else {
      return res.status(500).json(err);
    }
  })
}