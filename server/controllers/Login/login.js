const db = require('../../db/db');
const bcrypt = require('bcryptjs');

exports.login = (req, res) => {
  const logdata = req.body;
  var query = 'SELECT * FROM tblAuth WHERE MobileNo = ?';
  db.query(query, [logdata.Mobile], (err, results) => {
    if (!err) {
      if (results.length > 0) {
        console.log(results);
        bcrypt.compare(
          logdata.Password,
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
        res.status(200).json({ status: 200, data: 'Data doesnt exist' });
      }
    } else {
      res.send(err);
    }
  });
};
