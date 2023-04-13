const db = require('../../db/db');

// PROFILE DETAILS
exports.Profile = (req, res) => {
	let profdata = req.body;
	const flag = profdata.flag;
	// USER PROFILE DETAILS
	if (flag === 'U') {
		let uid = profdata.id;
		let query =
			'SELECT UserId, Uname, Ugender, Umobile, Uemail, UDoB, UAddr1, UAddr2, Ucity, UPinCode, Uaadhar, Flag FROM tblCommuter WHERE UserId = ?';
		db.query(query, [uid], (err, results) => {
			console.log(results);
			if (!err) {
				res.json(results[0]);
			} else {
				res.send(err);
			}
		});
	}
	// 	EMPLOYEE PROFILE DETAILS
	else if (flag === 'E') {
		let eid = profdata.id;
		let query =
			'SELECT EmpId, EmpName, EmpMobile, EmpDOB, EmpAddr1, EmpAddr2, EmpCity, EmpPinCode, EmpAadhar, Flag FROM tblEmployee WHERE EmpId = ?';
		db.query(query, [eid], (err, results) => {
			console.log(results);
			if (!err) {
				res.json(results[0]);
			} else {
				res.send(err);
			}
		});
	}
};

// EDIT PROFILE
exports.Edit = (req, res) => {
	let editData = req.body;
	const flag = editData.flag;
	// EDIT USER PROFILE
	if (flag === 'U') {
		let uid = editData.Id;
		let query =
			'UPDATE tblCommuter SET Uname = ?, Ugender = ?, Uemail = ?, UAddr1 = ?, UAddr2 = ?, Ucity = ?, UPinCode = ?, Uphoto = ?, Uaadhar = ? WHERE UserId = ?';
		db.query(
			query,
			[
				editData.Name,
				editData.Gender,
				editData.Email,
				editData.Address1,
				editData.Address2,
				editData.City,
				editData.Pin,
				editData.Img,
				editData.Aadhar,
				uid,
			],
			(err, results) => {
				if (!err) {
					res.json({ message: 'Edit Success' });
				} else {
					res.json({ message: 'Edit Failure' });
				}
			}
		);
	}
};
