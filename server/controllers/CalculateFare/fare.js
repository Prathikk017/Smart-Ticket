const db = require('../../db/db');

exports.Fare = (req, res) => {
	let ftData = req.body;
	let from;
	let From = ftData.from;
	let To = ftData.to;
	query = 'SELECT Fare FROM tblRouteStageMap WHERE StageID = ?';
	db.query(query, [From], (err, results) => {
		if (!err) {
			from = results[0].Fare;
			//   res.json({fromFare: from});
		} else {
			console.log(err);
		}
	});
	query1 = 'SELECT Fare FROM tblRouteStageMap WHERE StageID = ?';
	db.query(query1, [To], (err, results) => {
		if (!err) {
			to = results[0].Fare;
			console.log(typeof to);
			console.log(typeof from);
			if (to > from) {
				let from_to = to - from;
				res.json({ Fare: from_to });
				console.log(from_to);
			} else {
				let from_to = from - to;
				res.json({ Fare: from_to });
				console.log(from_to);
			}
		} else {
			console.log(err);
		}
	});
};
