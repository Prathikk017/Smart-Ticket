const db = require('../../db/db');
// const twilio = require('twilio');
const moment = require('moment');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

// CREATE A NEW EMPLOYEE
exports.createEmployee = (req, res) => {
	let tblEmployee = req.body;
	const OperID = tblEmployee.operId;
	var query1 = `SELECT Num,EmpId FROM tblEmployee WHERE EmpId LIKE '%${OperID}%' ORDER BY Num DESC LIMIT 1`;
	db.query(query1, (err, result) => {
	  if (!err) {
		if (result.length > 0) {
		  let emp = parseInt(result[0].Num);
		  let empid = emp + 1;
		  var EmpId = `${OperID}EMP${empid}`;
		  var EStatus = 'I';
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
				  tblEmployee.EmpDOB,
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
		var EStatus = 'I';
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
				tblEmployee.EmpDOB,
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
  })
  }
  
  //read Employee by operator id
  exports.readEmployee = (req,res)=>{
	let tblEmployee = req.body;
	let operID = tblEmployee.operId;
	let query = `SELECT EmpId,EmpName,EmpIntId,EmpDOB,EmpType,EStatus FROM tblEmployee WHERE  EmpId LIKE '%${operID}%'`;
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
	let query = `UPDATE tblEmployee SET EmpName=?, EmpIntId=?, EmpDOB=?, EmpType=?, EmpMobile=?, EmpAadhar=?, EmpAddr1=?, EmpAddr2=?, EmpCity=?, EmpPincode=?, EmpModifyDate=?, EStatus=? WHERE EmpId  = '${EmpId}'`
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
	})
  }

//get routeid for conductor issue ticket
exports.getRouteId = (req, res) => {
	const eid = req.body.EmpId;
	let query = 'SELECT RouteID, revRoute FROM tblAssetRouteMap WHERE EmpId = ?';
	db.query(query, [eid], (err, results) => {
		if (!err) {
			return res.json(results[results.length - 1]);
		} else {
			res.send(err);
		}
	});
};

// Get asset and route id
exports.astroid = (req, res) => {
	const eid = req.body.EmpId;
	let query =
		'SELECT AstId, RouteID, revRoute, Time FROM tblAssetRouteMap WHERE EmpId = ?';
	db.query(query, [eid], (err, results) => {
		if (!err) {
			return res.send(results);
		} else {
			res.send(err);
		}
	});
};

// Get Individual Trip Amounts
exports.tripAmounnt = async (req, res) => {
	let data = req.body;
	let astid = data.AstId;
	let routeid = data.RouteID;
	let fromTime = data.fromTime;
	let toTime = data.toTime;
	var AstRegNo;
	var RouteName;
	let query = 'SELECT AstRegNo FROM tblAsset WHERE AstId = ?';
	db.query(query, [astid], (err, results) => {
		if (!err) {
			console.log(results[0]);
			AstRegNo = results[0].AstRegNo;
			let query1 = 'SELECT RouteName FROM tblRouteMaster WHERE RouteID = ?';
			db.query(query1, [routeid], (err, results) => {
				console.log(results[0]);
				if (!err) {
					RouteName = results[0].RouteName;
					let query2 = `SELECT Fare FROM tblTransaction WHERE OrderTimeStamp BETWEEN '${fromTime}' AND '${toTime}'`;
					db.query(query2, (err, results) => {
						let date = fromTime.substring(0, 10);
						let totalFare = 0;
						for (let i = 0; i < results.length; i++) {
							totalFare = results[i].Fare + totalFare;
						}
						if (!err) {
							console.log(totalFare);
							res.json({
								AstRegNo: `${AstRegNo}`,
								RouteName: `${RouteName}`,
								TotalFare: `${totalFare}`,
								date: `${date}`,
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