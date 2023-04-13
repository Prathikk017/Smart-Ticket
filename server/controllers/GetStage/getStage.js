const db = require('../../db/db');

exports.getRouteId = (req, res) => {
	let astid = req.body.AssetID;
	query = 'SELECT RouteID FROM tblAssetRouteMap WHERE AstId = ?';
	db.query(query, [astid], (err, results) => {
		if (!err) {
			res.send(results);
		} else {
			res.send(err);
		}
	});
};

exports.getStages = (req, res) => {
	let routeid = req.body.RouteID;
	query = `SELECT StageID, StageName FROM tblStageMaster WHERE StageID LIKE '%${routeid}%'`;
	db.query(query, (err, results) => {
		if (!err) {
			res.send(results);
		} else {
			res.send(err);
		}
	});
};

exports.ARFlag = (req, res) => {
	let arData = req.body;
	astid = arData.AstId;
	query = 'SELECT revRoute FROM tblAssetRouteMap WHERE AstId = ?';
	db.query(query, [astid], (err, results) => {
		if (!err) {
			res.send(results);
		} else {
			res.send(err);
		}
	});
};
