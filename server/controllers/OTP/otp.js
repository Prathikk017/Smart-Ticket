const db = require('../../db/db');

//VERIFY USER OTP
exports.otp = (req, res) => {
	const tblOtp = req.body;
	var query = 'SELECT * FROM tblOtp WHERE id=? and otp=?';
	db.query(query, [tblOtp.id, tblOtp.otp], (err, results) => {
		if (!err) {
			if (results.length > 0) {
				if (results[0].flag == 'E') {
					res.status(201).json({ status: 201, data: 'Verified' });
					EStatusChng(tblOtp.id);
				} else if (results[0].flag == 'U') {
					res.status(200).json({ status: 201, data: 'Verified' });
					UStatusChng(tblOtp.id);
				}
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
			addEAuth(id);
			return;
		} else {
			console.log(err);
		}
	});
};

// CHANGE STATUS TO A AFTER OTP VERIFICATION
const UStatusChng = (id) => {
	var UStatus = 'A';
	var query = 'UPDATE tblCommuter SET UStatus = ? WHERE UserId = ?';
	db.query(query, [UStatus, id], (err, results) => {
		if (!err) {
			if (results.affectedRows == 0) {
				console.log('User not found');
			}
			console.log('UStatus updated');
			addUAuth(id);
			return;
		} else {
			console.log(err);
		}
	});
};

//ADD USER DATA TO AUTHTABLE
const addUAuth = (id) => {
	var query =
		'INSERT INTO tblAuth (AuthID, MobileNo, Flag) SELECT UserId, UMobile, Flag FROM tblCommuter WHERE UserId = ?';
	db.query(query, [id], (err, result) => {
		if (!err) {
			console.log(result);
		} else {
			console.log(err);
		}
	});
};

//ADD EMPLOYEE DATA TO AUTHTABLE
const addEAuth = (id) => {
	var query =
		'INSERT INTO tblAuth (AuthID, MobileNo, Flag, Type) SELECT EmpId, EmpMobile, Flag, EmpType FROM tblEmployee WHERE EmpId = ?';
	db.query(query, [id], (err, result) => {
		if (!err) {
			console.log(result);
		} else {
			console.log(err);
		}
	});
};
