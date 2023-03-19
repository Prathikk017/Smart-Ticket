const db = require('../../db/db');

// GET FAQS ABOUT THE APP
exports.FAQs = (req, res) => {
  let query = 'SELECT * FROM tblfaq';
  db.query(query, (err, results) => {
    if (!err) {
      return res.status(200).json({ status: 201, data: results });
    } else {
      return res.status(500).json({ status: 500, data: err });
    }
  });
};
