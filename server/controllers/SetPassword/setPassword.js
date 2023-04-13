const db = require('../../db/db');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

//SET USER PASSWORD
exports.setPassword = (req, res) => {
	let setdata = req.body;
	console.log(setdata);
	if (setdata.flag == 'U') {
		let uid = setdata.Id;
		bcrypt.hash(setdata.Password, saltRounds, (err, hash) => {
			if (!err) {
				query = 'UPDATE tblCommuter SET UPassword = ? WHERE UserId = ?';
				db.query(query, [hash, uid], (err, results) => {
					if (!err) {
						if (results.affectedRows == 0) {
							return res.status(404).json({ message: 'User ID not Found' });
						}
						updtPassInAuth(hash, uid);
						return res.status(200).json({ message: 'User Password Set' });
					} else {
						return res.status(500).json(err);
					}
				});
			} else {
				console.log(err);
			}
		});
	}
	// SET EMPLOYEE PASSWORD
	else if (setdata.flag == 'E') {
		let eid = setdata.Id;
		bcrypt.hash(setdata.Password, saltRounds, (err, hash) => {
			if (!err) {
				query = 'UPDATE tblEmployee SET EmpPassword = ? WHERE EmpId = ?';
				db.query(query, [hash, eid], (err, results) => {
					if (!err) {
						if (results.affectedRows == 0) {
							return res.status(404).json({ message: 'Employee ID not Found' });
						}
						updtPassInAuth(hash, eid);
						return res.status(200).json({ message: 'Employee Password Set' });
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
				console.log('Password set in auth');
			}
		}
	});
};
