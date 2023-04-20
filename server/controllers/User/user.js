const db = require('../../db/db');
// const twilio = require('twilio');
// const dotenv = require('dotenv');
const moment = require('moment');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

// dotenv.config();

// CREATE A NEW EMPLOYEE
exports.register = (req, res) => {
	let tblCommuter = req.body;
	var query1 = `SELECT Num, UserId FROM tblCommuter ORDER BY Num DESC LIMIT 1`;
	db.query(query1, (err, result) => {
		if (!err) {
			if (result.length > 0) {
				let user = parseInt(result[0].Num);
				let uid = user + 1;
				var UserId = `U${uid}`;
				var UStatus = 'I';
				var Flag = 'U';
				var UCreatedDate = moment().format('YYYY-MM-DD');
				if (!err) {
					var query =
						'INSERT INTO tblCommuter (Num, UserId, Umobile, UDoB, UStatus, Flag, UCreatedDate) VALUES(?, ?, ?, ?, ?, ?, ?)';
					db.query(
						query,
						[
							uid,
							UserId,
							tblCommuter.Mobile,
							tblCommuter.Dob,
							UStatus,
							Flag,
							UCreatedDate,
						],
						(err, results) => {
							if (!err) {
								return res.status(200).json({
									status: 201,
									data: 'User created successfully',
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
			} else {
				let uid = result.length;
				uid = uid + 1;
				if (!err) {
					var query =
						'INSERT INTO tblCommuter (Num, UserId, Umobile, UDoB, UStatus, Flag, UCreatedDate) VALUES(?, ?, ?, ?, ?, ?, ?)';
					db.query(
						query,
						[
							uid,
							UserId,
							tblCommuter.Mobile,
							tblCommuter.Dob,
							UStatus,
							Flag,
							UCreatedDate,
						],
						(err, results) => {
							if (!err) {
								return res
									.status(200)
									.json({ status: 201, data: 'User created successfully' });
							} else {
								return res.status(500).json(err);
							}
						}
					);
				} else {
					console.log(err);
				}
			}
		} else {
			console.log(err);
		}
	});
};

// // CREATE A NEW USER IN USERTABLE
// exports.register = (req, res) => {
//   id = id + 1;
//   var UserId = `U${id}`;
//   var UStatus = 'I';
//   var Flag = 'U';
//   var UCreatedDate = moment().format('YYYY-MM-DD hh:mm:ss');
//   let tblCommuter = req.body;
//   query =
//     'INSERT INTO tblCommuter (UserId, Umobile, UDoB, UStatus, Flag, UCreatedDate) VALUES(?, ?, ?, ?, ?, ?)';
//   db.query(
//     query,
//     [UserId, tblCommuter.Mobile, tblCommuter.Dob, UStatus, Flag, UCreatedDate],
//     (err, result) => {
//       if (!err) {
//         insertTblOtp(UserId, tblCommuter.Mobile, Flag);
//         return res
//           .status(200)
//           .json({ message: 'user created', data: {"id":`${UserId}`, "flag":`${Flag}`}});
//       } else {
//         return res.status(500).json(err);
//       }
//     }
//   );
// };

// INSERT OTP INTO OTPTABLE
const insertTblOtp = (id, mobile, status) => {
	var otp = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
	var createdtime = moment().format('YYYY-MM-DD hh:mm:ss');
	query =
		'INSERT INTO tblOtp (id, mobile, status, otp, createdtime) VALUES(?, ?, ?, ?, ?)';
	db.query(query, [id, mobile, status, otp, createdtime], (err, result) => {
		if (!err) {
			// sendSMS(otp);
			return console.log('inserted into tblotp');
		} else {
			return console.log(err);
		}
	});
};

// CALL SMS API
// const sendSMS = (otp) => {
//   const client = new twilio(
//     process.env.TWILIO_SID,
//     process.env.TWILIO_AUTH_TOKEN
//   );

//   return client.messages
//     .create({
//       body: `${Uotp}`,
//       from: '+12764962602',
//       to: process.env.NUMBER,
//     })
//     .then((message) => {
//       console.log(message, 'Message Sent');
//     })
//     .catch((err) => {
//       console.log(err, 'Message NOT Sent');
//     });
// };

// VERIFY OTP
exports.verifyOTP = (req, res) => {
	const tblOtp = req.body;
	var query = 'SELECT * FROM tblOtp WHERE id=? and otp=?';
	db.query(query, [tblOtp.id, tblOtp.otp], (err, results) => {
		if (!err) {
			if (results.length > 0) {
				res.status(201).json({ status: 201, data: 'Verified' });
				UStatusChng(tblOtp.id);
			} else {
				res.send({ data: 'Wrong OTP!!' });
			}
		} else {
			res.send(err);
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
			addAuth(id);
			return;
		} else {
			console.log(err);
		}
	});
};

// ADD  USER DATA TO USERTABLE
const addAuth = (id) => {
	var query =
		'INSERT INTO tblAuth (AuthID, MobileNo, Password, Status) SELECT UserId, Umobile, UPassword, Status FROM tblCommuter WHERE UserId = ?';
	db.query(query, [id], (err, result) => {
		if (!err) {
			console.log(result);
		} else {
			console.log(err);
		}
	});
};

//USER LOGIN
exports.login = (req, res) => {
	const tblCommuter = req.body;
	var query = 'SELECT * FROM tblAuth WHERE MobileNo = ? and Status = ?';
	db.query(query, [tblCommuter.Umobile, tblCommuter.Status], (err, results) => {
		if (!err) {
			if (results.length > 0) {
				console.log(results);
				bcrypt.compare(
					tblCommuter.UPassword,
					results[0].Password,
					(err, response) => {
						if (response) {
							res.status(201).json({ status: 201, data: results });
						} else {
							res
								.status(201)
								.json({ message: 'Wrong Phone number/Password!!' });
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

//SET OR RESET USER PASSWORD
exports.setPassword = (req, res) => {
	let tblCommuter = req.body;
	let id = tblCommuter.UserId;
	bcrypt.hash(tblCommuter.UPassword, saltRounds, (err, hash) => {
		if (!err) {
			query = 'UPDATE tblCommuter SET UPassword = ? WHERE UserId = ?';
			db.query(query, [hash, id], (err, results) => {
				if (!err) {
					if (results.affectedRows == 0) {
						return res.status(404).json({ message: 'User ID not Found' });
					}
					updtPassInAuth(hash, id);
					return res.status(200).json({ message: 'Password Set' });
				} else {
					return res.status(500).json(err);
				}
			});
		} else {
			console.log(err);
		}
	});
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
