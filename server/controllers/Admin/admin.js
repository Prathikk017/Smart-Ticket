const db = require('../../db/db');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
var id = 0;

exports.login = (req, res) => {
	const tblLPAdm = req.body;
	var query = 'SELECT * FROM tblauth WHERE MobileNo = ? or Email=?';
	db.query(query, [tblLPAdm.Aname, tblLPAdm.Aname], (err, results) => {
		if (!err) {
			if (results.length > 0) {
				bcrypt.compare(
					tblLPAdm.Apassword,
					results[0].Password,
					(err, response) => {
						if (response) {
							res.status(201).json({ status: 201, data: results[0] });
						} else {
							res.status(201).json({ message: 'Wrong username/password!!' });
						}
					}
				);
			} else {
				res.status(200).json({ status: 200, data: 'User doesnt exist' });
			}
		} else {
			res.send(err);
		}
	});
};

exports.createAdmin = (req, res) => {
	id = id + 1;
	let AdminId = `LP${id}`;
	let tblLPAdm = req.body;
	bcrypt.hash(tblLPAdm.Apassword, saltRounds, (err, hash) => {
		if (!err) {
			query =
				'INSERT INTO tbllpadm (AdminId, Aname, Amobile, Aemail, Apassword) values(?, ?, ?, ?, ?)';
			db.query(
				query,
				[AdminId, tblLPAdm.Aname, tblLPAdm.Amobile, tblLPAdm.Aemail, hash],
				(err, results) => {
					if (!err) {
						res.status(200).json({ message: 'admin added successfully' });
						addAuth(AdminId);
						return;
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

const addAuth = (AdminId) => {
	var query =
		'INSERT INTO tblauth(AuthID, MobileNo, Email, Password, Flag) SELECT AdminId, Amobile, Aemail, Apassword, Flag FROM tbllpadm WHERE AdminId = ?';
	db.query(query, [AdminId], (err, results) => {
		if (!err) {
			return console.log(results);
		} else {
			return console.log(err);
		}
	});
};

exports.getAllAdmins = (req, res) => {
	var query = 'SELECT * FROM tblLPAdm';
	db.query(query, (err, results) => {
		if (!err) {
			return res.status(200).json({ status: 201, data: results });
		} else {
			return res.status(500).json({ status: 500, data: err });
		}
	});
};

exports.resetPassword = (req, res) => {
	const id = req.params.id;
	let tblLPAdm = req.body;
	var query = 'UPDATE tbllpadm SET Apassword = ? WHERE AdminId = ?';
	db.query(query, [tblLPAdm.Apassword, id], (err, results) => {
		if (!err) {
			if (results.affectedRows === 0) {
				return res.status(404).json({ message: 'Admin id does not found' });
			}
			return res.status(200).json({ message: 'Admin updated successfully' });
		} else {
			return res.status(500).json(err);
		}
	});
};

exports.deleteAdmin = (req, res) => {
	const id = req.params.id;
	var query = 'DELETE FROM tbllpadm WHERE AdminId = ?';
	db.query(query, [id], (err, results) => {
		if (!err) {
			if (results.affectedRows === 0) {
				return res.status(404).json({ message: 'Admin id does not found' });
			}
			return res.status(200).json({ message: 'Admin deleted successfully' });
		} else {
			return res.status(500).json(err);
		}
	});
};

exports.approveOperator = (req, res) => {
	const { OperId } = req.params;
	var OperStatus = 'A';
	var query = 'UPDATE tbloperator SET OperStatus = ? WHERE OperId = ? ';
	db.query(query, [OperStatus, OperId], (err, results) => {
		if (!err) {
			if (results.affectedRows === 0) {
				return res.status(404).json({ message: 'Operator id does not found' });
			}
			res.status(201).json({ status: 201, data: results });
			addAuth1(OperId);
			return;
		} else {
			return res.status(500).json(err);
		}
	});
};

const addAuth1 = (OperId) => {
	var query =
		'INSERT INTO tblauth(AuthID, MobileNo, Email, Password, Flag) SELECT OperId, OperPhone, OperEmail, OperPassword, Flag FROM tbloperator WHERE OperId= ?';
	db.query(query, [OperId], (err, results) => {
		if (!err) {
			return console.log(results);
		} else {
			return console.log(err);
		}
	});
};

exports.getAllAssets = (req, res) => {
	var query = 'SELECT * FROM tblAsset';
	db.query(query, (err, results) => {
		if (!err) {
			return res.status(200).json({ status: 201, data: results });
		} else {
			return res.status(500).json({ status: 500, data: err });
		}
	});
};

exports.getAllOperators = (req, res) => {
	var query = 'SELECT * FROM tblOperator';
	db.query(query, (err, results) => {
		if (!err) {
			return res.status(200).json({ status: 201, data: results });
		} else {
			return res.status(500).json({ status: 500, data: err });
		}
	});
};

exports.getAllEmployees = (req, res) => {
	var query = 'SELECT * FROM tblEmployee';
	db.query(query, (err, results) => {
		if (!err) {
			return res.status(200).json({ status: 201, data: results });
		} else {
			return res.status(500).json({ status: 500, data: err });
		}
	});
};

exports.getAllUsers = (req, res) => {
	var query = 'SELECT * FROM tblCommuter';
	db.query(query, (err, results) => {
		if (!err) {
			return res.status(200).json({ status: 201, data: results });
		} else {
			return res.status(500).json({ status: 500, data: err });
		}
	});
};
