const db = require('../../db/db');
const bcrypt = require('bcryptjs');
const moment = require('moment');
const axios = require('axios');
// const qr = require('qr-image');
const saltRounds = 10;

//read last row from tbloperator by id
exports.getOperator = (req, res) => {
  var query = 'SELECT * FROM tbloperator ORDER BY OperId DESC LIMIT 1';
  db.query(query, (err, results) => {
    if (!err) {
      if (results.length > 0) {
        return res.status(200).json({ status: 201, data: results[0].OperId });
      } else {
        return res.status(200).json({ status: 201, data: '0' });
      }
    } else {
      return res.status(500).json({ status: 500, data: err });
    }
  });
};

//register operator
exports.createOperator = (req, res) => {
  let tbloperator = req.body;
  let opid = parseInt(tbloperator.OperId);
  opid = opid + 1;
  var OperId = `OP${opid}`;
  var OperStatus = 'I';
  let CreatedDate = moment(new Date()).format('YYYY-MM-DD hh:mm:ss');
  bcrypt.hash(tbloperator.OperPassword, saltRounds, (err, hash) => {
    if (!err) {
      let query =
        'INSERT INTO tbloperator (OperId, OperName, OperEmail, OperPhone, OperGSTIN, OperAddr1, OperAddr2, OperPassword, OperCity, OperPincode, OperStatus, OperContactName, OperContactMobile, OperContactEmail, OperCreatedDate) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
      db.query(
        query,
        [
          OperId,
          tbloperator.OperName,
          tbloperator.OperEmail,
          tbloperator.OperPhone,
          tbloperator.OperGSTIN,
          tbloperator.OperAddr1,
          tbloperator.OperAddr2,
          hash,
          tbloperator.OperCity,
          tbloperator.OperPincode,
          OperStatus,
          tbloperator.OperContactName,
          tbloperator.OperPhone,
          tbloperator.OperContactEmail,
          CreatedDate,
        ],
        (err, results) => {
          if (!err) {
            return res.status(200).json({ status: 201, data: results });
          } else {
            return res.status(500).json({ data: err });
          }
        }
      );
    } else {
      console.log(err);
    }
  });
};

//get all operators
exports.getAllOperators = (req, res) => {
  let query = "SELECT * FROM tbloperator WHERE OperStatus = 'I'";
  db.query(query, (err, results) => {
    if (!err) {
      return res.status(200).json({ status: 201, data: results });
    } else {
      return res.status(500).json({ status: 500, data: err });
    }
  });
};

//get operators by id
exports.getOperators = (req, res) => {
  const { OperId } = req.params;
  var query = `SELECT * FROM tbloperator WHERE OperId = '${OperId}'`;
  db.query(query, (err, results) => {
    if (!err) {
      return res.status(200).json({ status: 201, data: results });
    } else {
      return res.status(500).json({ status: 500, data: err });
    }
  });
};

//validate Operators by email
exports.validateOperator = (req, res) => {
  const tbloperator = req.body;
  var query =
    'SELECT * FROM tbloperator WHERE OperEmail=? or OperContactEmail=?';
  db.query(
    query,
    [tbloperator.OperEmail, tbloperator.OperContactEmail],
    (err, results) => {
      if (!err) {
        if (results.length > 0) {
          res.status(201).json({ status: 201, data: 'User already exist' });
        } else {
          res.send({ data: 'User doesnt exist' });
        }
      } else {
        res.send(err);
      }
    }
  );
};

//Create Asset
exports.createAsset = (req, res) => {
  let tblasset = req.body;
  const OperID = tblasset.operId;
  var query1 = `SELECT AstId FROM tblasset WHERE AstId LIKE '%${OperID}%' ORDER BY AstId DESC LIMIT 1`;
  db.query(query1, (err, result) => {
    if (!err) {
      if (result.length > 0) {
        var ast = result[0].AstId;
        var astid = parseInt(ast.slice(ast.length - 1));
        astid = astid + 1;
        let AstId = `${OperID}A${astid}`;
        let CreatedDate = moment(new Date()).format('YYYY-MM-DD hh:mm:ss');
        var query =
          'INSERT INTO tblasset (AstId, AstRegNo, AstName, AstModel, AstChasNo, AstEngNo, AstPermitNo, AstInsurExp, AstPermitExp, AstCreatedDate) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        db.query(
          query,
          [
            AstId,
            tblasset.astRegNo,
            tblasset.astName,
            tblasset.astModel,
            tblasset.astChasNo,
            tblasset.astEngNo,
            tblasset.astPermitNo,
            tblasset.astInsurExp,
            tblasset.astPermitExp,
            CreatedDate,
          ],
          (err, results) => {
            if (!err) {
              return res
                .status(200)
                .json({ status: 201, data: 'Asset created successfully' });
            } else {
              return res.status(500).json(err);
            }
          }
        );
      } else {
        astid = result.length;
        astid = astid + 1;
        let AstId = `${OperID}A${astid}`;
        let CreatedDate = moment(new Date()).format('YYYY-MM-DD hh:mm:ss');
        var query =
          'INSERT INTO tblasset (AstId, AstRegNo, AstName, AstModel, AstChasNo, AstEngNo, AstPermitNo, AstInsurExp, AstPermitExp, AstCreatedDate) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        db.query(
          query,
          [
            AstId,
            tblasset.astRegNo,
            tblasset.astName,
            tblasset.astModel,
            tblasset.astChasNo,
            tblasset.astEngNo,
            tblasset.astPermitNo,
            tblasset.astInsurExp,
            tblasset.astPermitExp,
            CreatedDate,
          ],
          (err, results) => {
            if (!err) {
              return res
                .status(200)
                .json({ status: 201, data: 'Asset created successfully' });
            } else {
              return res.status(500).json(err);
            }
          }
        );
      }
    } else {
      console.log(err);
    }
  });
};

//create asset qrcode
exports.createQrcodeAsset = async (req, res) => {
  const data = req.body.data;
  const apiKey =
    'zvfmiFY-JUvF_E6g23kOpylC7CmlnmAseIDk7rJairlJQhvw0kGW6Y1P6_1TQTUl';
  const apiUrl = 'https://api.qrcode-monkey.com/qr/custom';
  axios
    .post(
      apiUrl,
      {
        data: data,
        config:{
           "body": "circle",
           "eyeBall": "ball14",

         },
        "size":400,
        "download": true,
        "file": 'svg',
      },
      {
        headers: {
          'X-QRCode-Monkey-API-Key': apiKey,
          'Content-Type': 'application/json',
        },
      }
    )
    .then((response) => {
      const qrcode = response.data;
      res.status(200).json({ status: 201, data: qrcode }); // The URL to the generated QR code image
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

//Create Stage
exports.createStage = (req, res) => {
  var tblstagemaster = req.body;
  var operID = tblstagemaster.operId;
  var query1 = `SELECT StageID FROM tblstagemaster WHERE StageID LIKE '%${operID}%' ORDER BY StageID DESC LIMIT 1`;
  db.query(query1, (err, result) => {
    if (!err) {
      if (result.length > 0) {
        var stg = result[0].StageID;
        var stgid = parseInt(stg.slice(stg.length - 1));
        stgid = stgid + 1;
        let StageID = `${operID}S${stgid}`;
        let CreatedDate = moment(new Date()).format('YYYY-MM-DD hh:mm:ss');

        var query =
          'INSERT INTO tblstagemaster (StageID, StageName, CreatedDate) values(?, ?, ?)';
        db.query(
          query,
          [StageID, tblstagemaster.StageName, CreatedDate],
          (err, results) => {
            if (!err) {
              return res
                .status(200)
                .json({ status: 201, data: 'stage created successfully' });
            } else {
              return res.status(500).json(err);
            }
          }
        );
      } else {
        stgid = result.length;
        stgid = stgid + 1;
        let StageID = `${operID}S${stgid}`;
        let CreatedDate = moment(new Date()).format('YYYY-MM-DD hh:mm:ss');
        var query =
          'INSERT INTO tblstagemaster (StageID, StageName, CreatedDate) values(?, ?, ?)';
        db.query(
          query,
          [StageID, tblstagemaster.StageName, CreatedDate],
          (err, results) => {
            if (!err) {
              return res
                .status(200)
                .json({ status: 201, data: 'stage created successfully' });
            } else {
              return res.status(500).json(err);
            }
          }
        );
      }
    } else {
      console.log(err);
    }
  });
};

//validate Stage by StageName
exports.validateStage = (req, res) => {
  const tblstagemaster = req.body;
  var query = `SELECT * FROM tblstagemaster WHERE StageName = ? AND StageID LIKE '%${operID}%`;
  db.query(query, [tblstagemaster.StageName], (err, results) => {
    if (!err) {
      if (results.length > 0) {
        res.status(201).json({
          status: 201,
          data: `${tblstagemaster.StageName} already exist`,
        });
      } else {
        res.send({ data: 'User doesnt exist' });
      }
    } else {
      res.send(err);
    }
  });
};

//read Stage
exports.readStage = (req, res) => {
  var tblstagemaster = req.body;
  var operID = tblstagemaster.operId;
  var query1 = `SELECT StageID,StageName FROM tblstagemaster WHERE StageID LIKE '%${operID}%'`;
  db.query(query1, (err, result) => {
    if (!err) {
      if (result.length > 0) {
        res.status(200).json({ status: 201, data: result });
        return;
      } else {
        res.status(200).json({ status: 201, data: 'Stage Not Found' });
      }
    } else {
      console.log(err);
    }
  });
};

//create Route
exports.createRoute = (req, res) => {
  let tblroutemaster = req.body;
  const OperId = tblroutemaster.operId;
  var query1 = `SELECT RouteID FROM tblroutemaster WHERE RouteID LIKE '%${OperId}%' ORDER BY RouteID DESC LIMIT 1`;
  db.query(query1, (err, result) => {
    if (!err) {
      if (result.length > 0) {
        var rut = result[0].RouteID;
        var rutid = parseInt(rut.slice(rut.length - 1));
        rutid = rutid + 1;
        let RouteID = `${OperId}R${rutid}`;
        let CreatedDate = moment(new Date()).format('YYYY-MM-DD hh:mm:ss');
        var query =
          'INSERT INTO tblroutemaster (RouteID, RouteName, RouteEffDate, RouteSStage, RouteEStage, CreatedDate) values(?, ?, ?, ?, ?, ?)';
        db.query(
          query,
          [
            RouteID,
            tblroutemaster.RouteName,
            tblroutemaster.RouteEffDate,
            tblroutemaster.RouteSStage,
            tblroutemaster.RouteEStage,
            CreatedDate,
          ],
          (err, results) => {
            if (!err) {
              return res
                .status(200)
                .json({ status: 201, data: 'route created successfully' });
            } else {
              return res.status(500).json(err);
            }
          }
        );
      } else {
        rutid = result.length;
        rutid = rutid + 1;
        let RouteID = `${OperId}R${rutid}`;
        let CreatedDate = moment(new Date()).format('YYYY-MM-DD hh:mm:ss');
        var query =
          'INSERT INTO tblroutemaster (RouteID, RouteName, RouteEffDate, RouteSStage, RouteEStage, CreatedDate) values(?, ?, ?, ?, ?, ?)';
        db.query(
          query,
          [
            RouteID,
            tblroutemaster.RouteName,
            tblroutemaster.RouteEffDate,
            tblroutemaster.RouteSStage,
            tblroutemaster.RouteEStage,
            CreatedDate,
          ],
          (err, results) => {
            if (!err) {
              return res
                .status(200)
                .json({ status: 201, data: 'route created successfully' });
            } else {
              return res.status(500).json(err);
            }
          }
        );
      }
    } else {
      console.log(err);
    }
  });
};

//read Route
exports.readRoute = (req, res) => {
  let tblroutemaster = req.body;
  const OperId = tblroutemaster.operId;
  var query1 = `SELECT RouteID,RouteName,RouteSStage,RouteEStage FROM tblroutemaster WHERE RouteID LIKE '%${OperId}%'`;
  db.query(query1, (err, result) => {
    if (!err) {
      if (result.length > 0) {
        res.status(200).json({ status: 201, data: result });
        return;
      } else {
        res.status(200).json({ status: 201, data: 'Route Not Found' });
      }
    } else {
      console.log(err);
    }
  });
};

//create routestage map
exports.createRoutemap = (req, res) => {
  let tblroutestagemap = req.body;
  const RouteID = tblroutestagemap.route;
  const stageArr = tblroutestagemap.stage;
  const fareArr = tblroutestagemap.fare;
  const effDate = tblroutestagemap.effDate;

  const insertValues = async () => {
    for (let i = 0; i < stageArr.length; i++) {
      const routeVal = stageArr[i];
      const fareVal = fareArr[i];
      const query =
        'INSERT INTO tblroutestagemap (RouteID, StageID, Fare, EffectiveDate) VALUES (?, ?, ?, ?)';
      await new Promise((resolve, reject) => {
        db.query(
          query,
          [RouteID, routeVal, fareVal, effDate],
          (error, results) => {
            if (error) {
              reject(error);
            } else {
              resolve(results);
            }
          }
        );
      });
    }
  };

  insertValues()
    .then(() => {
      res
        .status(200)
        .json({ status: 201, data: 'All values inserted successfully' });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error inserting values');
    });
};
