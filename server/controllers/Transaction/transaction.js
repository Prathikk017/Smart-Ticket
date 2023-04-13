const db = require('../../db/db');
const moment = require('moment');
var id = 0;

exports.getTransID = (req, res) => {
	id = id + 1;
	var Tid = '0' + id;
	let transData = req.body;
	let date = new Date();

	let day = date.getDate();
	let month = date.getMonth() + 1;
	let year = date.getFullYear();

	if (date < 10) {
		date = '0' + date;
	}
	if (month < 10) {
		month = '0' + month;
	}

	let slicedyear = year.toString().slice(2, 4);

	// This arrangement can be altered based on how we want the date's format to appear.
	let currentDate = `${slicedyear}${month}${day}`; // "YYMMDD"
	var OrderID = `T${currentDate}` + `${Tid}`;
	console.log(OrderID);
	query =
		'INSERT INTO tblTransaction (UserId, RouteName, StartStage, EndStage, Fare, OrderID) VALUES(?, ?, ?, ?, ?, ?)';
	db.query(
		query,
		[
			transData.UserId,
			transData.RouteName,
			transData.StartStage,
			transData.EndStage,
			transData.Fare,
			OrderID,
		],
		(err, result) => {
			if (!err) {
				return res.status(200).json({
					message: 'OrderID generated',
					data: { id: `${OrderID}` },
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
		'UPDATE tblTransaction SET TransactionID = ?, Status = ?, TimeStamp = ? WHERE OrderID = ?';
	db.query(
		query,
		[payData.transid, payData.status, payData.timestamp, oid],
		(err, results) => {
			if (!err) {
				res.json({ message: 'Edit Success' });
			} else {
				res.json({ message: 'Edit Failure' });
			}
		}
	);
};
