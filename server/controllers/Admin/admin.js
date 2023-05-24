const db = require('../../db/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const moment = require('moment');

const saltRounds = 10;

exports.login = (req, res) => {
	const tblLPAdm = req.body;
	var query = 'SELECT * FROM tblAuth WHERE MobileNo = ? or Email=?';
	db.query(query, [tblLPAdm.Aname, tblLPAdm.Aname], (err, results) => {
		if (!err) {
			if (results.length > 0) {
				bcrypt.compare(
					tblLPAdm.Apassword,
					results[0].Password,
					(err, response) => {
						if (response) {
							const user = {
								id: results[0].AuthID,
								username: results[0].Email,
								flag: results[0].Flag,
							};
							// Generate a JWT token with the user object and the secret key
							const token = jwt.sign(user, config.secret);
							res
								.status(201)
								.json({ status: 201, token: `${token}`, data: results[0] });
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

exports.verify = (req, res) => {
	const authHeader = req.body.authorization;
	if (authHeader) {
		const token = authHeader.split(' ')[1];

		jwt.verify(token, config.secret, (err, result) => {
			if (err) {
				return res.status(200).json({ data: 'Token is not valid' });
			} else {
				// Token is valid, send a response
				res.status(200).json({ status: 201, data: 'Token is valid' });
			}
		});
	} else {
		res.status(401).json({ data: 'You are not authenticated' });
	}
};

exports.createAdmin = (req, res) => {
	let tblLPAdm = req.body;
	console.log(tblLPAdm);
	var query1 = `SELECT Num, AdminId FROM tblLPAdm ORDER BY Num DESC LIMIT 1`;

	db.query(query1, (err, result) => {
		if (!err) {
			if (result.length > 0) {
				let admin = parseInt(result[0].Num);
				let admid = admin + 1;
				var AdminId = `LP${admid}`;
				var ACreatedDate = moment().format('YYYY-MM-DD');
				console.log(ACreatedDate);
				bcrypt.hash(tblLPAdm.Apassword, saltRounds, (err, hash) => {
					if (!err) {
						var query =
							'INSERT INTO tblLPAdm (Num, AdminId, Aname, Amobile, Agender, ADob, Aemail, Apassword, ACreatedDate) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)';
						db.query(
							query,
							[
								admid,
								AdminId,
								tblLPAdm.Aname,
								tblLPAdm.Amobile,
								tblLPAdm.Agender,
								tblLPAdm.ADoB,
								tblLPAdm.Aemail,
								hash,
								ACreatedDate,
							],
							(err, results) => {
								if (!err) {
									res
										.status(200)
										.json({ status: 201, message: 'admin added successfully' });
									addAuth(AdminId);
									return;
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
			} else {
				let admid = result.length;
				admid = admid + 1;
				bcrypt.hash(tblLPAdm.Apassword, saltRounds, (err, hash) => {
					if (!err) {
						var query =
							'INSERT INTO tblLPAdm (Num, AdminId, Aname, Amobile, Agender, ADob, Aemail, Apassword, ACreatedDate) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)';
						db.query(
							query,
							[
								admid,
								AdminId,
								tblLPAdm.Aname,
								tblLPAdm.Amobile,
								tblLPAdm.Agender,
								tblLPAdm.ADoB,
								tblLPAdm.Aemail,
								hash,
								ACreatedDate,
							],
							(err, results) => {
								if (!err) {
									res
										.status(201)
										.json({ status: 201, message: 'admin added successfully' });
									addAuth(AdminId);
									return;
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
			}
		} else {
			console.log(err);
		}
	});
};

const addAuth = (AdminId) => {
	var query =
		'INSERT INTO tblAuth(AuthID, MobileNo, Email, Password, Flag) SELECT AdminId, Amobile, Aemail, Apassword, Flag FROM tblLPAdm WHERE AdminId = ?';
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
	var query = 'UPDATE tblLPAdm SET Apassword = ? WHERE AdminId = ?';
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
	var query = 'DELETE FROM tblLPAdm WHERE AdminId = ?';
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
	var query = 'UPDATE tblOperator SET OperStatus = ? WHERE OperId = ? ';
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
		'INSERT INTO tblAuth(AuthID, MobileNo, Email, Password, Flag) SELECT OperId, OperPhone, OperEmail, OperPassword, Flag FROM tblOperator WHERE OperId= ?';
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

exports.getAllTransactions = (req, res) => {
	var query = 'SELECT * FROM tblTransaction';
	db.query(query, (err, results) => {
		if (!err) {
			return res.status(200).json({ status: 201, data: results });
		} else {
			return res.status(500).json({ status: 500, data: err });
		}
	});
};

exports.getInactiveOperators = (req, res) => {
	let status = 'I';
	let query = 'SELECT * FROM tblOperator WHERE OperStatus = ?';
	db.query(query, [status], (err, results) => {
		if (!err) {
			res.status(200).json({ status: 201, data: results });
		} else {
			res.status(500).json({ status: 500, data: err });
		}
	});
};

exports.getAllTicketTypes = (req, res) => {
	var query = 'SELECT * FROM tblTicketType';
	db.query(query, (err, results) => {
		if (!err) {
			return res.status(200).json({ status: 201, data: results });
		} else {
			return res.status(500).json({ status: 500, data: err });
		}
	});
};

// activate ticket type
exports.activateTicketType = (req, res) => {
	const TTid = req.body.id;
	var TTstatus = 'A';
	var query = 'UPDATE tblTicketType SET TTstatus = ? WHERE TTid = ? ';
	db.query(query, [TTstatus, TTid], (err, results) => {
		if (!err) {
			if (results.affectedRows === 0) {
				return res.status(404).json({ message: 'Ticket Type Not Found' });
			}
			return res.status(201).json({ status: 201, data: results });
		} else {
			return res.status(500).json(err);
		}
	});
};

// deactivate ticket type
exports.deactivateTicketType = (req, res) => {
	const TTid = req.body.id;
	var TTstatus = 'I';
	var query = 'UPDATE tblTicketType SET TTstatus = ? WHERE TTid = ? ';
	db.query(query, [TTstatus, TTid], (err, results) => {
		if (!err) {
			if (results.affectedRows === 0) {
				return res.status(404).json({ message: 'Ticket Type Not Found' });
			}
			return res.status(201).json({ status: 201, data: results });
		} else {
			return res.status(500).json(err);
		}
	});
};

//get all assets for operator
exports.getAllAssetOperator = (req, res) => {
	const tblAsset = req.body;
	const OperId = tblAsset.OperId;

	let query = `SELECT AstId FROM tblAsset WHERE AstId LIKE '%${OperId}%'`;
	db.query(query, (err, results) => {
		if (!err) {
			return res.status(200).json({ status: 201, data: results });
		} else {
			return res.status(500).json({ status: 500, data: err });
		}
	});
};

//get all employee for operator
exports.getAllEmployeeOperator = (req, res) => {
	const tblEmployee = req.body;
	const OperId = tblEmployee.OperId;

	var query = `SELECT EmpId FROM tblEmployee WHERE EmpId LIKE '%${OperId}%'`;
	db.query(query, (err, results) => {
		if (!err) {
			return res.status(200).json({ status: 201, data: results });
		} else {
			return res.status(500).json({ status: 500, data: err });
		}
	});
};

exports.getEmployeesByOperatorId = (req, res) => {
	const tblEmployee = req.body;
	const OperID = tblEmployee.OperId;
	var query = `SELECT * FROM tblEmployee WHERE EmpId LIKE '%${OperID}%'`;
	db.query(query, (err, results) => {
		if (!err) {
			return res.status(200).json({ status: 201, data: results });
		} else {
			return res.status(500).json({ status: 500, data: err });
		}
	});
};

exports.getAssetsByOperatorId = (req, res) => {
	const tblAsset = req.body.OperId;
	const OperID = tblAsset.OperId;
	let query = `SELECT * FROM tblAsset WHERE AstId LIKE '%${OperID}%'`;
	db.query(query, (err, results) => {
		if (!err) {
			return res.status(200).json({ status: 201, data: results });
		} else {
			return res.status(500).json({ status: 500, data: err });
		}
	});
};

//get total transanction data
exports.readTransactionData = (req, res) => {
	let query = `SELECT Fare FROM tblTransaction WHERE Status = 'PAID'`;
	db.query(query, (err, result) => {
		if (!err) {
			let totalTransaction = 0;
			for (let i = 0; i < result.length; i++) {
				totalTransaction += JSON.parse(result[i].Fare);
			}
			res.status(200).json({ status: 201, data: totalTransaction });
		} else {
			console.log(err);
		}
	});
};

exports.readTransactionDataByAsset = (req, res) => {
	let tblTransaction = req.body;
	const OperId = tblTransaction.OperId;
	let query = `SELECT Trip FROM tblTransaction WHERE RouteName LIKE '%${OperId}%' AND Status = 'PAID'`;
	db.query(query, (err, result) => {
		if (!err) {
			if (result.length > 0) {
				let initalAsset = result[0].Trip.match(/^(.*?)T/)[1];
				let previousAsset = '';
				let currentAsset = '';
				let totalAsset = [];
				for (let i = 1; i < result.length - 1; i++) {
					previousAsset = result[i].Trip.match(/^(.*?)T/)[1];
					currentAsset = result[i + 1].Trip.match(/^(.*?)T/)[1];

					if (previousAsset !== currentAsset) {
						if (currentAsset !== initalAsset) {
							totalAsset.push(currentAsset);
						}
					}
				}
				totalAsset.push(initalAsset);

				Promise.all([assetRegNo(totalAsset), assetRegNoFare(totalAsset)])
					.then(([Asset, Fare]) => {
						res
							.status(200)
							.json({ status: 201, data: { Asset, Fare, totalAsset } });
					})
					.catch((err) => {
						console.log(err);
						res
							.status(500)
							.json({ status: 500, message: 'Internal Server Error' });
					});
			}
		} else {
			console.log(err);
			res.status(500).json({ status: 500, message: 'Internal Server Error' });
		}
	});
};

const assetRegNo = (totalAsset) => {
	return new Promise((resolve, reject) => {
		let Asset = [];
		const queries = totalAsset.map((asset) => {
			return new Promise((resolve, reject) => {
				let query = 'SELECT AstRegNo FROM tblAsset WHERE AstId = ?';
				db.query(query, [asset], (err, result) => {
					if (!err) {
						if (result.length > 0) {
							Asset.push(result[0].AstRegNo);
						}
						resolve();
					} else {
						reject(err);
					}
				});
			});
		});

		Promise.all(queries)
			.then(() => {
				resolve(Asset);
			})
			.catch((err) => {
				reject(err);
			});
	});
};

const assetRegNoFare = (totalAsset) => {
	return new Promise((resolve, reject) => {
		const Fare = [];

		const queries = totalAsset.map((asset) => {
			return new Promise((resolve, reject) => {
				let query = `SELECT Fare FROM tblTransaction WHERE Trip LIKE '%${asset}%' AND Status = 'PAID'`;
				db.query(query, (err, result) => {
					if (!err) {
						let totalTransaction = 0;
						for (let i = 0; i < result.length; i++) {
							totalTransaction += JSON.parse(result[i].Fare);
						}
						Fare.push(totalTransaction);
						resolve();
					} else {
						reject(err);
					}
				});
			});
		});

		Promise.all(queries)
			.then(() => {
				resolve(Fare);
			})
			.catch((err) => {
				reject(err);
			});
	});
};

//get route data by asset id
exports.readRouteByAssetID = (req, res) => {
	const tblTransaction = req.body;
	const AstId = tblTransaction.AstId;
	let query = `SELECT RouteName FROM tblTransaction WHERE Trip LIKE '%${AstId}%' AND Status = 'PAID'`;
	db.query(query, (err, result) => {
		if (!err) {
			if (result.length > 0) {
				let initalRoute = result[0].RouteName;
				let previousRoute = '';
				let currentRoute = '';
				let totalRoute = [];
				for (let i = 1; i < result.length - 1; i++) {
					previousRoute = result[i].RouteName;
					currentRoute = result[i + 1].RouteName;

					if (previousRoute !== currentRoute) {
						if (currentRoute !== initalRoute) {
							totalRoute.push(currentRoute);
						}
					}
				}
				totalRoute.push(initalRoute);
				Promise.all([getrouteName(totalRoute), routeFare(totalRoute)])
					.then(([Route, Fare]) => {
						res
							.status(200)
							.json({ status: 201, data: { Route, Fare, totalRoute } });
					})
					.catch((err) => {
						console.log(err);
						res
							.status(500)
							.json({ status: 500, message: 'Internal Server Error' });
					});
			}
		} else {
			console.log(err);
			res.status(500).json({ status: 500, message: 'Internal Server Error' });
		}
	});
};

const getrouteName = (totalRoute) => {
	return new Promise((resolve, reject) => {
		let Route = [];
		const queries = totalRoute.map((route) => {
			return new Promise((resolve, reject) => {
				let query = 'SELECT RouteName FROM tblRouteMaster WHERE RouteID = ?';
				db.query(query, [route], (err, result) => {
					if (!err) {
						if (result.length > 0) {
							Route.push(result[0].RouteName);
						}
						resolve();
					} else {
						reject(err);
					}
				});
			});
		});

		Promise.all(queries)
			.then(() => {
				resolve(Route);
			})
			.catch((err) => {
				reject(err);
			});
	});
};

const routeFare = (totalRoute) => {
	return new Promise((resolve, reject) => {
		const Fare = [];

		const queries = totalRoute.map((route) => {
			return new Promise((resolve, reject) => {
				let query = `SELECT Fare FROM tblTransaction WHERE RouteName LIKE '%${route}%' AND Status = 'PAID'`;
				db.query(query, (err, result) => {
					if (!err) {
						let totalTransaction = 0;
						for (let i = 0; i < result.length; i++) {
							totalTransaction += JSON.parse(result[i].Fare);
						}
						Fare.push(totalTransaction);
						resolve();
					} else {
						reject(err);
					}
				});
			});
		});

		Promise.all(queries)
			.then(() => {
				resolve(Fare);
			})
			.catch((err) => {
				reject(err);
			});
	});
};
