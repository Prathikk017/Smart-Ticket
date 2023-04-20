const db = require('../../db/db');
const moment = require('moment');
const qr = require('qr-image');
var id = 0;

exports.getTransID = (req, res) => {
	id = id + 1;
	var Tid = '0' + id;
	let transData = req.body;
	let date = new Date();

	let day = date.getDate();
	let month = date.getMonth() + 1;
	let year = date.getFullYear();

	let hours = date.getHours();
	let minutes = date.getMinutes();
	let seconds = date.getSeconds();

	if (date < 10) {
		date = '0' + date;
	}
	if (month < 10) {
		month = '0' + month;
	}
	if (hours < 10) {
		hours = '0' + hours;
	}
	if (minutes < 10) {
		minutes = '0' + minutes;
	}
	if (seconds < 10) {
		seconds = '0' + seconds;
	}

	const orderTimeStamp =
		year +
		'-' +
		month +
		'-' +
		day +
		' ' +
		hours +
		':' +
		minutes +
		':' +
		seconds;
	console.log(orderTimeStamp);

	let slicedyear = year.toString().slice(2, 4);

	// This arrangement can be altered based on how we want the date's format to appear.
	let currentDate = `${slicedyear}${month}${day}`; // "YYMMDD"
	var OrderID = `T${currentDate}` + `${Tid}`;
	console.log(OrderID);
	query =
		'INSERT INTO tblTransaction (Id, RouteName, StartStage, EndStage, Fare, OrderID, OrderTimeStamp) VALUES(?, ?, ?, ?, ?, ?, ?)';
	db.query(
		query,
		[
			transData.Id,
			transData.RouteName,
			transData.StartStage,
			transData.EndStage,
			transData.Fare,
			OrderID,
			orderTimeStamp,
		],
		(err, result) => {
			if (!err) {
				return res.status(200).json({
					message: 'OrderID generated',
					data: { orderid: `${OrderID}` },
				});
			} else {
				return res.status(500).json(err);
			}
		}
	);
};

// update transactionID, Status and Timestamp fields
exports.getPaymentInfo = (req, res) => {
	let payData = req.body;
	let oid = payData.OrderID;
	let query =
		'UPDATE tblTransaction SET TransactionID = ?, TransactionTimeStamp = ?, Status = ? WHERE OrderID = ?';
	db.query(
		query,
		[payData.transid, payData.timestamp, payData.tstatus, oid],
		(err, results) => {
			if (!err) {
				res.json({ message: 'Edit Success', time: `${payData.timestamp}` });
			} else {
				res.json({ message: 'Edit Failure' });
			}
		}
	);
};

//create asset qrcode
exports.createTransQR = async (req, res) => {
	const qrstring = req.body;
	const oid = qrstring.orderid;
	const Tgen = qrstring.Tgen;
	const qrstatus = 'A';

	const data = JSON.stringify(qrstring);

	//Qrcode using Qr-image
	const qrCodeData = qr.imageSync(data, { type: 'png' }); // Get the QR code image data as a buffer
	var QRVal = qrCodeData.toString('base64');

	const query =
		'UPDATE tblTransaction SET QR = ?, QRStatus = ?, Tdata = ?, Tgen = ? WHERE OrderID = ?';
	db.query(query, [QRVal, qrstatus, data, Tgen, oid], (err, result) => {
		if (!err) {
			res.send(QRVal); // Send the QR code image data as the response
			return;
		} else {
			res.send(err);
		}
	});
};

// qrverify
exports.transQRVerify = async (req, res) => {
	let payData = req.body;
	let oid = payData.OrderID;
	console.log(payData);
	let qrok = 'I';
	let query = 'SELECT QRStatus FROM tblTransaction WHERE OrderID = ?';
	db.query(query, [oid], (err, results) => {
		if (!err) {
			if (results[0].QRStatus == 'A') {
				let query1 = 'UPDATE tblTransaction SET QRStatus = ? WHERE OrderID = ?';
				db.query(query1, [qrok, oid], (err, results) => {
					if (!err) {
						res.json({ message: 'OK' });
					}
				});
			} else {
				res.json({ message: 'Not OK' });
			}
		}
	});
};

// transaction history
exports.getHistory = async (req, res) => {
	let uid = req.body.UserId;
	var query = 'SELECT Tdata FROM tblTransaction WHERE Id = ?';
	db.query(query, [uid], (err, results) => {
		if (!err) {
			res.json(results);
		} else {
			res.send(err);
		}
	});
};
