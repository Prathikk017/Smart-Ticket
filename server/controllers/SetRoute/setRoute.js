const db = require('../../db/db');

exports.setRoute = (req, res) => {
	let astroData = req.body;
	query =
		'INSERT INTO tblAssetRouteMap (EmpId, AstId, RouteID,) VALUES(?, ?, ?)';
	db.query(
		query,
		[astroData.EmpId, astroData.AstId, astroData.RouteID],
		(err, result) => {
			if (!err) {
				res.json({ message: 'Asset Route Map Success' });
			} else {
				res.json({ message: 'Asset Route Map Failure' });
			}
		}
	);
};
