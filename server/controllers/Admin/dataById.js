const db = require('../../db/db');

//get admin by id
exports.getAdminById = (req, res) => {
	const { AdminId } = req.params;
	var query = `SELECT * FROM tblLPAdm WHERE AdminId = '${AdminId}'`;
	db.query(query, (err, results) => {
		if (!err) {
			return res.status(200).json({ status: 201, data: results });
		} else {
			return res.status(500).json({ status: 500, data: err });
		}
	});
};

//get asset by id
exports.getAssetById = (req, res) => {
	const { AstId } = req.params;
	var query = `SELECT * FROM tblAsset WHERE AstId = '${AstId}'`;
	db.query(query, (err, results) => {
		if (!err) {
			return res.status(200).json({ status: 201, data: results });
		} else {
			return res.status(500).json({ status: 500, data: err });
		}
	});
};

//get operators by id
exports.getOperatorById = (req, res) => {
	const { OperId } = req.params;
	var query = `SELECT * FROM tblOperator WHERE OperId = '${OperId}'`;
	db.query(query, (err, results) => {
		if (!err) {
			return res.status(200).json({ status: 201, data: results });
		} else {
			return res.status(500).json({ status: 500, data: err });
		}
	});
};

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
//get user by id
exports.getUserById = (req, res) => {
	const { UserId } = req.params;
	var query = `SELECT * FROM tblCommuter WHERE UserId = '${UserId}'`;
	db.query(query, (err, results) => {
		if (!err) {
			return res.status(200).json({ status: 201, data: results });
		} else {
			return res.status(500).json({ status: 500, data: err });
		}
	});
};
