const db = require('../../db/db');

exports.Route = (req, res) => {
	query = 'SELECT * FROM tblRouteMaster';
	db.query(query, (err, result) => {
		if (!err) {
			res.send(result);
		} else {
			res.send(err);
		}
	});
};
