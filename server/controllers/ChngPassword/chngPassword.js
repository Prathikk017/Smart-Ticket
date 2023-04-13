const db = require('../../db/db');
const moment = require('moment');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

//CHANGE USER PASSWORD
exports.chngPassword = (req, res) => {
	let modifiedDate = moment().format('YYYY-MM-DD');
	let setdata = req.body;
	console.log(setdata);
	if (setdata.flag == 'U') {
		let uid = setdata.Id;
		bcrypt.hash(setdata.Password, saltRounds, (err, hash) => {
			if (!err) {
				query =
					'UPDATE tblCommuter SET UPassword = ?, UModifiedDate = ? WHERE UserId = ?';
				db.query(query, [hash, modifiedDate, uid], (err, results) => {
					if (!err) {
						if (results.affectedRows == 0) {
							return res.status(404).json({ message: 'User ID not Found' });
						}
						updtPassInAuth(hash, uid);
						return res.status(200).json({ message: 'User Password Changed' });
					} else {
						return res.status(500).json(err);
					}
				});
			} else {
				console.log(err);
			}
		});
	}
	// CHANGE EMPLOYEE PASSWORD
	else if (setdata.flag == 'E') {
		let eid = setdata.Id;
		bcrypt.hash(setdata.Password, saltRounds, (err, hash) => {
			if (!err) {
				query =
					'UPDATE tblEmployee SET EmpPassword = ?, EmpModifiedDate = ? WHERE EmpId = ?';
				db.query(query, [hash, modifiedDate, eid], (err, results) => {
					if (!err) {
						if (results.affectedRows == 0) {
							return res.status(404).json({ message: 'Employee ID not Found' });
						}
						updtPassInAuth(hash, eid);
						return res
							.status(200)
							.json({ message: 'Employee Password Changed' });
					} else {
						return res.status(500).json(err);
					}
				});
			} else {
				console.log(err);
			}
		});
	}
	//   return res.status(500).json(err);
};

//UPDATE PASSWORD IN AUTHTABLE
const updtPassInAuth = (password, id) => {
	var query = 'UPDATE tblAuth SET Password = ? WHERE AuthId = ?';
	db.query(query, [password, id], (err, results) => {
		if (!err) {
			if (results.affectedRows == 0) {
				console.log('User not found');
			} else {
				console.log('Password changed in auth');
			}
		}
	});
};
