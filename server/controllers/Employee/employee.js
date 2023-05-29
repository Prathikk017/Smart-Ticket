const db = require('../../db/db');
// const twilio = require('twilio');
const moment = require('moment');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

// CREATE A NEW EMPLOYEE
exports.createEmployee = (req, res) => {
  let tblEmployee = req.body;
  
const dateFormats = ['DD-MMMM-YYYY', 'DD-MM-YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD', 'YYYY/MM/DD'];
  const OperID = tblEmployee.operId;
  var query1 = `SELECT Num,EmpId FROM tblEmployee WHERE EmpId LIKE '%${OperID}%' ORDER BY Num DESC LIMIT 1`;
  db.query(query1, (err, result) => {
    if (!err) {
      if (result.length > 0) {
        let emp = parseInt(result[0].Num);
        let empid = emp + 1;
        var EmpId = `${OperID}EMP${empid}`;
        let EmpDOB = moment(tblEmployee.EmpDOB, dateFormats).format('YYYY-MM-DD');
        var EStatus = 'A';
        var EmpCreatedDate = moment().format('YYYY-MM-DD hh:mm:ss');
          if (!err) {
            var query =
              'INSERT INTO tblEmployee (Num, EmpId, EmpName, EmpIntId, EmpDOB, EmpType, EmpMobile, EmpAadhar, EmpAddr1, EmpAddr2, EmpCity, EmpPincode, EStatus,  EmpCreatedDate) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
            db.query(
              query,
              [
                empid,
                EmpId,
                tblEmployee.EmpName,
                tblEmployee.EmpIntId,
                EmpDOB,
                tblEmployee.EmpType,
                tblEmployee.EmpMobile,
                tblEmployee.EmpAadhar,
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
      }else {
      let empid = result.length;
      empid = empid + 1;
      var EmpId = `${OperID}EMP${empid}`;
      var EStatus = 'A';
      let EmpDOB = moment(tblEmployee.EmpDOB,dateFormats ).format('YYYY-MM-DD');
      var EmpCreatedDate = moment().format('YYYY-MM-DD hh:mm:ss');
        if (!err) {
          var query =
            'INSERT INTO tblEmployee (Num, EmpId, EmpName, EmpIntId, EmpDOB, EmpType, EmpMobile, EmpAadhar,  EmpAddr1, EmpAddr2, EmpCity, EmpPincode, EStatus,  EmpCreatedDate) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
          db.query(
            query,
            [
              empid,
              EmpId,
              tblEmployee.EmpName,
              tblEmployee.EmpIntId,
              EmpDOB,
              tblEmployee.EmpType,
              tblEmployee.EmpMobile,
              tblEmployee.EmpAadhar,
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
    }
  }else{
    console.log(err);
  };
});
};

//read Employee by operator id
exports.readEmployee = (req,res)=>{
  let tblEmployee = req.body;
  let operID = tblEmployee.operId;
  let query = `SELECT Num, EmpId,EmpName,EmpIntId,EmpDOB,EmpType,EStatus FROM tblEmployee WHERE  EmpId LIKE '%${operID}%'  ORDER BY EmpName`;
  db.query(query, (err, result) =>{
    if(!err){
      res.status(200).json({status: 201, data: result});
      return;
    }else{
	res.status(500).json({message:result});
    }
  })
}

//get employee by id
exports.getEmployeeById = (req, res) => {
  const { EmpId } = req.params;
  var query = `SELECT * FROM tblEmployee WHERE EmpId = '${EmpId}'`;
  db.query(query, (err, results) => {
    if (!err) {
      return res.status(200).json({ status: 201, data: results });
    } else {
      return res.status(500).json({ status: 500, data: err });
    }
  });
};

//soft delete from tblEmployee by id
exports.deleteEmployee = (req, res) => {
  const { EmpId } = req.params;
  var EStatus = 'I';
  var query = 'UPDATE tblEmployee SET EStatus = ? WHERE EmpId = ? ';
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
  let query = `UPDATE tblEmployee SET EmpName=?, EmpIntId=?, EmpDOB=?, EmpType=?, EmpMobile=?, EmpAadhar=?, EmpAddr1=?, EmpAddr2=?, EmpCity=?, EmpPincode=?, EmpModifyDate=?, EStatus=? WHERE EmpId  = '${EmpId}'`;
  db.query(query,[tblEmployee.EmpName, tblEmployee.EmpIntId, tblEmployee.EmpDOB, tblEmployee.EmpType, tblEmployee.EmpMobile, tblEmployee.EmpAadhar, tblEmployee.EmpAddr1, tblEmployee.EmpAddr2, tblEmployee.EmpCity, tblEmployee.EmpPincode, EmpModifyDate, tblEmployee.estatus],(err, result)=>{
    if (!err) {
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Employee does not found' });
      }
     res.status(201).json({status: 201, data: "Employee update successfully"});
     return ;
    } else {
      return res.status(500).json(err);
    }
  });
};

//get routeid for conductor issue ticket
exports.getRouteId = (req, res) => {
  const eid = req.body.EmpId;
  let query = 'SELECT RouteID, revRoute, Trip FROM tblAssetRouteMap WHERE EmpId = ?';
  db.query(query, [eid], (err, results) => {
     if(!err) {
         return res.json(results[results.length - 1]);
     } else {
         res.send(err);
     }
  });
};

// Get asset and route id
exports.astroid = (req, res) => {
  const eid = req.body.EmpId;
  let query = 'SELECT AstId, RouteID, revRoute, Trip, Time FROM tblAssetRouteMap WHERE EmpId = ?';
  db.query(query, [eid], (err, results) => {
      if(!err) {
          return res.send(results);
      } else {
          res.send(err);
      }
  });
};

// Get Individual Trip Amounts
exports.tripAmounnt = async (req, res) => {
	let data = req.body;
	console.log('data',data);
	let astid = data.AstId;
	let routeid = data.RouteID;
	let trip = data.Trip;
	let time = data.Time;
	let revRoute = data.revRoute;
	var AstRegNo;
	var RouteName;
	let query = 'SELECT AstRegNo FROM tblAsset WHERE AstId = ?';
	db.query(query, [astid], (err, results) => {
		if (!err) {
			AstRegNo = results[0].AstRegNo;
			let query1 = 'SELECT RouteName FROM tblRouteMaster WHERE RouteID = ?';
			db.query(query1, [routeid], (err, results) => {
				if (!err) {
					RouteName = results[0].RouteName;
					let query2 = `SELECT Fare, Tgen, Passengers FROM tblTransaction WHERE Status LIKE '%PAID%' AND Trip LIKE '%${trip}%'`;
					db.query(query2, (err, results) => {
					    console.log('passno', results);
						let cashFare = 0;
						let qrFare = 0;
						let totalFare = 0;
						let cashpeeps = 0;
						let qrpeeps = 0;
						let totalpeeps = 0;
						let Time = time.slice(0, 10);
						for (let i = 0; i < results.length; i++) {
							if (results[i].Tgen === 'E') {
								cashFare = results[i].Fare + cashFare;
								cashpeeps = cashpeeps + results[i].Passengers;
							}
							if (results[i].Tgen === 'Q') {
								qrFare = results[i].Fare + qrFare;
								qrpeeps = qrpeeps + results[i].Passengers;
							}
						}
						totalFare = parseInt(cashFare) + parseInt(qrFare);
						totalpeeps = parseInt(cashpeeps) + parseInt(qrpeeps);
						if (!err) {
							res.json({
								AstRegNo: `${AstRegNo}`,
								RouteName: `${RouteName}`,
								cashFare: `${cashFare}`,
								qrFare: `${qrFare}`,
								totalFare: `${totalFare}`,
								cashpeeps: `${cashpeeps}`,
								qrpeeps: `${qrpeeps}`,
								totalpeeps: `${totalpeeps}`,
								revRoute: `${revRoute}`,
								time: `${Time}`,
								trip: `${trip}`,
							});
						}
					});
				}
			});
		} else {
			res.send(err);
		}
	});
};

//read employee by operator id
exports.readEmpActive = (req,res) =>{
	let tblAssetRouteMap = req.body;
	const Time = tblAssetRouteMap.date;
	let operID = tblAssetRouteMap.operId;
	let query = `SELECT EmpId FROM tblAssetRouteMap WHERE  EmpId LIKE '%${operID}%' AND Status = 'A' AND Time LIKE '%${Time}%'`;
	db.query(query,(err, result) =>{
	  if(!err){
		if(result.length> 0){
		  let initialemployee = result[0].EmpId;
			let currentemployee = '';
			let previousemployee = '';
			let employeeSet = new Set();
			employeeSet.add(initialemployee); // Add the initial asset directly to the set
	
			for (let i = 1; i < result.length; i++) {
			  previousemployee = result[i - 1].EmpId;
			  currentemployee = result[i].EmpId;
	
			  if (previousemployee !== currentemployee) {
				employeeSet.add(currentemployee); // Add the current asset if it is different from the previous one
			  }
			}
	
			// Convert the set to an array
			let EmployeeArray = Array.from(employeeSet);
		  res.status(200).json({status: 201, data: EmployeeArray});
		  return;
		}else{
		  res.status(200).json({status:201,message:"employee not found to operator", data:result});
		}
	  }else{
		console.log(err)
	  }
	})
  }
  
  //check EmployeeIntId is present
  exports.reademployeeIntId = (req, res) =>{
	const { EmpIntId } = req.params;
	let query = `SELECT EmpIntId FROM tblEmployee WHERE EmpIntId  = '${EmpIntId}'`
	db.query(query,(err, result)=>{
	  if (!err) {
		if(result.length > 0){
		  return res.status(200).json({ status:201, data:result.length });
		}else{
			return res.status(200).json({status:201, data: result.length});
		}
	  } else {
		return res.status(500).json(err);
	  }
	})
  }
