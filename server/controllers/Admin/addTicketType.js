const db = require('../../db/db');
const moment = require('moment');

exports.addType = (req, res) => {
	let typeData = req.body;
	var query1 = `SELECT Num, TTid FROM tblTicketType ORDER BY Num DESC LIMIT 1`;
	db.query(query1, (err, result) => {
		if (!err) {
			if (result.length > 0) {
				let tt = parseInt(result[0].Num);
				let tid = tt + 1;
				var TTid = `TT${tid}`;
				var Status = 'I';
				var TTCreatedDate = moment().format('YYYY-MM-DD');
				if (!err) {
					var query =
						'INSERT INTO tblTicketType (Num, TTid, TTname, TTshortname, TTstatus, TTCreatedDate) VALUES(?, ?, ?, ?, ?, ?)';
					db.query(
						query,
						[
							tid,
							TTid,
							typeData.TTname,
							typeData.TTshortname,
							Status,
							TTCreatedDate,
						],
						(err, results) => {
							if (!err) {
								return res.status(200).json({
									status: 201,
									data: 'Ticket Type added successfully',
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
				let tid = result.length;
				tid = tt + 1;
				if (!err) {
					var query =
						'INSERT INTO tblTicketType (Num, TTid, TTname, TTshortname, TTstatus, TTCreatedDate) VALUES(?, ?, ?, ?, ?, ?)';
					db.query(
						query,
						[
							tid,
							TTid,
							typeData.TTname,
							typeData.TTshortname,
							Status,
							TTCreatedDate,
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
