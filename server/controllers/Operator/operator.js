const db = require('../../db/db');
const bcrypt = require('bcryptjs');
const moment = require('moment');
const axios = require('axios');
const qr = require('qr-image');
const saltRounds = 10;

//read last row from tblOperator by id
exports.getOperator = (req, res) => {
  var query = 'SELECT Num FROM tblOperator ORDER BY Num DESC LIMIT 1';
  db.query(query, (err, results) => {
    if (!err) {
      if (results.length > 0) {
        return res.status(200).json({ status: 201, data: results[0].Num});
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
  let tblOperator = req.body;
  let opid = parseInt(tblOperator.OperId);
  opid = opid + 1;
  var OperId = `OP${opid}`;
  var OperStatus = 'I';
  let CreatedDate = moment(new Date()).format('YYYY-MM-DD hh:mm:ss');
  bcrypt.hash(tblOperator.OperPassword, saltRounds, (err, hash) => {
    if (!err) {
      let query =
        'INSERT INTO tblOperator (Num, OperId, OperName, OperShortName, OperEmail, OperPhone, OperGSTIN, OperAddr1, OperAddr2, OperPassword, OperCity, OperPincode, OperStatus, OperContactName, OperContactMobile, OperContactEmail, OperCreatedDate) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
      db.query(
        query,
        [
          opid,
          OperId,
          tblOperator.OperName,
          tblOperator.OperShortName,
          tblOperator.OperEmail,
          tblOperator.OperPhone,
          tblOperator.OperGSTIN,
          tblOperator.OperAddr1,
          tblOperator.OperAddr2,
          hash,
          tblOperator.OperCity,
          tblOperator.OperPincode,
          OperStatus,
          tblOperator.OperContactName,
          tblOperator.OperPhone,
          tblOperator.OperContactEmail,
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
  let query = "SELECT * FROM tblOperator WHERE OperStatus = 'I'";
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
  var query = `SELECT * FROM tblOperator WHERE OperId = '${OperId}'`;
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
  const tblOperator = req.body;
  var query =
    'SELECT * FROM tblOperator WHERE OperEmail=? or OperContactEmail=?';
  db.query(
    query,
    [tblOperator.OperEmail, tblOperator.OperContactEmail],
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

//get operator name by id
exports.getOperatorShortName = (req,res) =>{
  let tblOperator = req.body;
  let OperId = tblOperator.operId;
  let query = 'SELECT OperShortName,OperName FROM tblOperator WHERE OperId = ?';
  db.query(query,[OperId],(err, result)=>{
    if(!err){
      res.status(200).json({status:201, data: result});
    }else{
      console.log(err);
    }
  })
}

//check asset registration number
exports.readAssetByRegNo = (req, res) =>{
	const { astRegNo } = req.params;
	let query = `SELECT AstRegNo FROM tblAsset WHERE AstRegNo  = '${astRegNo}'`
	db.query(query,(err, result)=>{
	  if (!err) {
		if(result.length > 0){
		  return res.status(200).json({ status:201, data:result.length });
		}else{
			return res.status(200).json({status:201, data: result.length});
		}
	  } else {
		return res.status(500).json(err);
	  }
	})
  }

//Create Asset
exports.createAsset = (req, res) => {
  let tblAsset = req.body;
  const OperID = tblAsset.operId;
  var query1 = `SELECT Num,AstId FROM tblAsset WHERE AstId LIKE '%${OperID}%' ORDER BY Num DESC LIMIT 1`;
  db.query(query1, (err, result) => {
    if (!err) {
      if (result.length > 0) {
        var ast = parseInt(result[0].Num);
        let astid = ast + 1;
        let AstId = `${OperID}A${astid}`;
        let CreatedDate = moment(new Date()).format('YYYY-MM-DD hh:mm:ss');
        var query =
          'INSERT INTO tblAsset (Num, AstId, AstRegNo, AstName, AstModel, AstChasNo, AstEngNo, AstPermitNo, AstInsurExp, AstPermitExp, AstCreatedDate) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        db.query(
          query,
          [
            astid,
            AstId,
            tblAsset.astRegNo,
            tblAsset.astName,
            tblAsset.astModel,
            tblAsset.astChasNo,
            tblAsset.astEngNo,
            tblAsset.astPermitNo,
            tblAsset.astInsurExp,
            tblAsset.astPermitExp,
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
        let astid = result.length;
        astid = astid + 1;
        let AstId = `${OperID}A${astid}`;
        let CreatedDate = moment(new Date()).format('YYYY-MM-DD hh:mm:ss');
        var query =
          'INSERT INTO tblAsset (Num, AstId, AstRegNo, AstName, AstModel, AstChasNo, AstEngNo, AstPermitNo, AstInsurExp, AstPermitExp, AstCreatedDate) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        db.query(
          query,
          [
            astid,
            AstId,
            tblAsset.astRegNo,
            tblAsset.astName,
            tblAsset.astModel,
            tblAsset.astChasNo,
            tblAsset.astEngNo,
            tblAsset.astPermitNo,
            tblAsset.astInsurExp,
            tblAsset.astPermitExp,
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
  //Qrcode using Qr-image
  const qrCode = qr.image(data, { type: 'png' });
  const qrCodeData = qr.imageSync(data, { type: 'png' }); // Get the QR code image data as a buffer
  var qr1 = qrCodeData.toString('base64');
  const query = 'UPDATE tblAsset SET QR = ? WHERE AstRegNo = ?';
  db.query(query,[qr1, data],(err, result)=>{
    if(!err){
      res.send(qrCodeData.toString('base64'));
      return;
    }else{
      console.log(err);
    }
  })
   // Send the QR code image data as the response
  
  // Create Qr code using Qr-code monkey
  // const apiKey =
  //   'zvfmiFY-JUvF_E6g23kOpylC7CmlnmAseIDk7rJairlJQhvw0kGW6Y1P6_1TQTUl';
  // const apiUrl = 'https://api.qrcode-monkey.com/qr/custom';
  // axios
  //   .post(
  //     apiUrl,
  //     {
  //       data: data,

  //       config:{
  //          "body": "circle",
  //          "eyeBall": "ball14",
  //           "logo":"https://iili.io/HOJjSwb.md.png",
  //        },
  //       "size":400,
  //       "download": true,
  //       "file": 'jpg',
  //     },
  //     {
  //       headers: {
  //         'X-QRCode-Monkey-API-Key': apiKey,
  //         'Content-Type': 'application/json',
  //       },
  //     }
  //   )
  //   .then((response) => {
  //     const qrcode = response.data;
  //     res.status(200).json({ status: 201, data: qrcode }); // The URL to the generated QR code image
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //     res.sendStatus(500);
  //   });
};

//read asset by operator id
exports.readAsset = (req,res) =>{
  let tblAsset = req.body;
  let operID = tblAsset.operId;
  let query = `SELECT AstId,AstRegNo,AstName,AstInsurExp,AstPermitExp,AStatus FROM tblAsset WHERE  AstId LIKE '%${operID}%'`;
  db.query(query, (err, result) =>{
    if(!err){
      res.status(200).json({status: 201, data: result});
      return;
    }else{
      res.status(500).json({message:result});
    }
  })
}
//read asset by operator id
exports.readAssetActive = (req,res) =>{
  let tblAssetRouteMap = req.body;
  const Time = tblAssetRouteMap.date;
  let operID = tblAssetRouteMap.operId;
  let query = `SELECT AstId FROM tblAssetRouteMap WHERE  AstId LIKE '%${operID}%' AND Status = 'A' AND Time LIKE '%${Time}%'`;
  db.query(query,(err, result) =>{
    if(!err){
      if(result.length> 0){
        let initialAsset = result[0].AstId;
        let currentAsset = '';
        let previousAsset = '';
        let assetSet = new Set();
        assetSet.add(initialAsset); // Add the initial asset directly to the set

        for (let i = 1; i < result.length; i++) {
          previousAsset = result[i - 1].AstId;
          currentAsset = result[i].AstId;

          if (previousAsset !== currentAsset) {
            assetSet.add(currentAsset); // Add the current asset if it is different from the previous one
          }
        }

        // Convert the set to an array
        let AssetArray = Array.from(assetSet);
        res.status(200).json({status: 201, data: AssetArray, result:result});
        return;
      }else{
        res.status(200).json({status: 201, message:"asset not found to operator", data:result});
      }
    }else{
      console.log(err)
    }
  })
}
//get asset by id
exports.getAssetById = (req, res) => {
  const { AstId } = req.params;
  var query = `SELECT * FROM tblAsset WHERE AstId = '${AstId}'`;
  db.query(query, (err, results) => {
    if (!err) {
      return res.status(200).json({ status: 201, data: results });
    } else {
      return res.status(500).json({ status: 500, data: err });
    }
  });
};

//soft delete from tblAsset by id
exports.deleteAsset = (req, res) => {
  const { AstId } = req.params;
  var AStatus = 'I';
  var query = 'UPDATE tblAsset SET AStatus = ? WHERE AstId = ? ';
  db.query(query, [AStatus, AstId], (err, results) => {
    if (!err) {
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: 'Asset does not found' });
      }
     res.status(201).json({status: 201, data: "Asset deleted successfully"});
     return ;
    } else {
      return res.status(500).json(err);
    }
  });
};

//update in tblAsset by id
exports.updateAsset = (req,res)=>{
  const { AstId } = req.params;
  let tblAsset = req.body;
  let AstModifyDate = moment().format('YYYY-MM-DD hh:mm:ss');
  let query = `UPDATE tblAsset SET  AstName=?, AstModel=?, AstChasNo=?, AstEngNo=?, AstPermitNo=?, AstInsurExp=?, AstPermitExp=?, AstModifyDate=?, AStatus=? WHERE AstId  = '${AstId}'`
  db.query(query,[ tblAsset.astName, tblAsset.astModel, tblAsset.astChasNo, tblAsset.astEngNo, tblAsset.astPermitNo, tblAsset.astInsurExp, tblAsset.astPermitExp, AstModifyDate, tblAsset.astatus],(err, result)=>{
    if (!err) {
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Asset does not found' });
      }
     res.status(201).json({status: 201, data: "Asset update successfully"});
     return ;
    } else {
      return res.status(500).json(err);
    }
  })
}

//Create Stage
exports.createStage = (req, res) => {
  var tblStageMaster = req.body;
  var operID = tblStageMaster.operId;
  var query1 = `SELECT Num,StageID FROM tblStageMaster WHERE StageID LIKE '%${operID}%' ORDER BY Num DESC LIMIT 1`;
  db.query(query1, (err, result) => {
    if (!err) {
      if (result.length > 0) {
        var stg = parseInt(result[0].Num); 
        let stgid = stg + 1;
        let StageID = `${operID}S${stgid}`;
        let CreatedDate = moment(new Date()).format('YYYY-MM-DD hh:mm:ss');

        var query =
          'INSERT INTO tblStageMaster (Num, StageID, StageName, CreatedDate) values(?, ?, ?, ?)';
        db.query(
          query,
          [stgid, StageID, tblStageMaster.StageName, CreatedDate],
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
        let stgid = result.length;
        stgid = stgid + 1;
        let StageID = `${operID}S${stgid}`;
        let CreatedDate = moment(new Date()).format('YYYY-MM-DD hh:mm:ss');
        var query =
          'INSERT INTO tblStageMaster (Num, StageID, StageName, CreatedDate) values(?, ?, ?, ?)';
        db.query(
          query,
          [stgid, StageID, tblStageMaster.StageName, CreatedDate],
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
  const tblStageMaster = req.body;
  const operID = tblStageMaster.operId;
  var query = `SELECT * FROM tblStageMaster WHERE StageName = ? AND StageID LIKE '%${operID}%'`;
  db.query(query, [tblStageMaster.StageName], (err, results) => {
    if (!err) {
      if (results.length > 0) {
        res.status(201).json({
          status: 201,
          data: `${tblStageMaster.StageName} already exist`,
        });
      } else if(results.length === 0){
        res.send({ data: 'User doesnt exist' });
      }
    } else {
      res.send(err);
    }
  });
};

//read Stage
exports.readStage = (req, res) => {
  var tblStageMaster = req.body;
  var operID = tblStageMaster.operId;
  var query1 = `SELECT StageID,StageName FROM tblStageMaster WHERE StageID LIKE '%${operID}%'`;
  db.query(query1, (err, result) => {
    if (!err) {
      if (result.length > 0) {
        res.status(200).json({ status: 201, data: result });
        return;
      } else {
        res.status(200).json({ status: 201, data: result });
      }
    } else {
      console.log(err);
    }
  });
};
// read stage for table
exports.readStageTbl = (req, res) => {
  var tblStageMaster = req.body;
  var operID = tblStageMaster.operId;
  var query1 = `SELECT * FROM tblStageMaster WHERE StageID LIKE '%${operID}%'`;
  db.query(query1, (err, result) => {
    if (!err) {
      if (result.length > 0) {
        res.status(200).json({ status: 201, data: result });
        return;
      } else {
        res.status(200).json({ status: 201, data: result });
      }
    } else {
      console.log(err);
    }
  });
};

//get stage by id
exports.getStageById = (req, res) => {
  const { StageID } = req.params;
  var query = `SELECT * FROM tblStageMaster WHERE StageID = '${StageID}'`;
  db.query(query, (err, results) => {
    if (!err) {
      return res.status(200).json({ status: 201, data: results });
    } else {
      return res.status(500).json({ status: 500, data: err });
    }
  });
};
//soft delete from tblStage by id
exports.deleteStage = (req, res) => {
  const { StageID } = req.params;
  var StageStatus = 'I';
  var query = 'UPDATE tblStageMaster SET StageStatus = ? WHERE StageID = ? ';
  db.query(query, [StageStatus, StageID], (err, results) => {
    if (!err) {
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: 'Stage does not found' });
      }
     res.status(201).json({status: 201, data: "Stage deleted successfully"});
     return ;
    } else {
      return res.status(500).json(err);
    }
  });
};

//update in tblStage by id
exports.updateStage = (req,res)=>{
  const { StageID } = req.params;
  let tblStageMaster = req.body;
  let ModifyDate = moment().format('YYYY-MM-DD hh:mm:ss');
  let query = `UPDATE tblStageMaster SET StageName=?, ModifyDate=?, StageStatus=? WHERE StageID  = '${StageID}'`
  db.query(query,[ tblStageMaster.StageName, ModifyDate, tblStageMaster.stgstatus],(err, result)=>{
    if (!err) {
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Stage does not found' });
      }
     res.status(201).json({status: 201, data: "Stage update successfully"});
     return ;
    } else {
      return res.status(500).json(err);
    }
  })
}

//create Route
exports.createRoute = (req, res) => {
  let tblRouteMaster = req.body;
  const OperId = tblRouteMaster.operId;
  var query1 = `SELECT Num,RouteID FROM tblRouteMaster WHERE RouteID LIKE '%${OperId}%' ORDER BY Num DESC LIMIT 1`;
  db.query(query1, (err, result) => {
    if (!err) {
      if (result.length > 0) {
        var rut = parseInt(result[0].Num);
        let rutid = rut + 1;
        var RouteID = `${OperId}R${rutid}`;
        let CreatedDate = moment(new Date()).format('YYYY-MM-DD hh:mm:ss');
        var query =
          'INSERT INTO tblRouteMaster (Num, RouteID, RouteName, RouteEffDate, RouteSStage, RouteEStage, CreatedDate) values(?, ?, ?, ?, ?, ?, ?)';
        db.query(
          query,
          [
            rutid,
            RouteID,
            tblRouteMaster.RouteName,
            tblRouteMaster.RouteEffDate,
            tblRouteMaster.RouteSStage,
            tblRouteMaster.RouteEStage,
            CreatedDate,
          ],
          (err, results) => {
            
            if (!err) {
              return res
                .status(200)
                .json({ status: 201, routeId:RouteID, data: 'route created successfully'  });
            } else {
              return res.status(500).json(err);
            }
          }
        );
      } else {
       let rutid = result.length;
        rutid = rutid + 1;
        let RouteID = `${OperId}R${rutid}`;
        let CreatedDate = moment(new Date()).format('YYYY-MM-DD hh:mm:ss');
        var query =
          'INSERT INTO tblRouteMaster (Num, RouteID, RouteName, RouteEffDate, RouteSStage, RouteEStage, CreatedDate) values(?, ?, ?, ?, ?, ?, ?)';
        db.query(
          query,
          [
            rutid,
            RouteID,
            tblRouteMaster.RouteName,
            tblRouteMaster.RouteEffDate,
            tblRouteMaster.RouteSStage,
            tblRouteMaster.RouteEStage,
            CreatedDate,
          ],
          (err, results) => {
            if (!err) {
              return res
                .status(200)
                .json({ status: 201,routeId:RouteID, data: 'route created successfully' });
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
  let tblRouteMaster = req.body;
  const OperId = tblRouteMaster.operId;
  var query1 = `SELECT RouteID,RouteName,RouteSStage,RouteEStage, RouteStatus FROM tblRouteMaster WHERE RouteID LIKE '%${OperId}%'`;
  db.query(query1, (err, result) => {
    if (!err) {
      if (result.length > 0) {
        res.status(200).json({ status: 201, data: result });
        return;
      } else {
        res.status(200).json({ status: 201, data:result});
      }
    } else {
      console.log(err);
    }
  });
};

//read asset by operator id
exports.readRouteActive = (req,res) =>{
  let tblAssetRouteMap = req.body;
  const Time = tblAssetRouteMap.date;
  let operID = tblAssetRouteMap.operId;
  let query = `SELECT RouteID FROM tblAssetRouteMap WHERE  RouteID LIKE '%${operID}%' AND Status = 'A' AND Time LIKE '%${Time}%'`;
  db.query(query,(err, result) =>{
    if(!err){
      if(result.length> 0){
        let initialRoute = result[0].RouteID;
        let currentRoute = '';
        let previousRoute = '';
        let RouteSet = new Set();
        RouteSet.add(initialRoute); // Add the initial asset directly to the set

        for (let i = 1; i < result.length; i++) {
          previousRoute = result[i - 1].RouteID;
          currentRoute = result[i].RouteID;

          if (previousRoute !== currentRoute) {
            RouteSet.add(currentRoute); // Add the current asset if it is different from the previous one
          }
        }

        // Convert the set to an array
        let RouteArray = Array.from(RouteSet);
        res.status(200).json({status: 201, data: RouteArray});
        return;
      }else{
        res.status(200).json({status: 201, message:"route not found to operator", data:result});
      }
    }else{
      console.log(err)
    }
  })
}

//get route by id
exports.getRouteById = (req, res) => {
  const { RouteID } = req.params;
  var query = `SELECT * FROM tblRouteMaster WHERE RouteID = '${RouteID}'`;
  db.query(query, (err, results) => {
    if (!err) {
      return res.status(200).json({ status: 201, data: results });
    } else {
      return res.status(500).json({ status: 500, data: err });
    }
  });
};

//soft delete from tblRoute by id
exports.deleteRoute = (req, res) => {
  const { RouteID } = req.params;
  var RouteStatus = 'I';
  var query = 'UPDATE tblRouteMaster SET RouteStatus = ? WHERE RouteID = ? ';
  db.query(query, [RouteStatus, RouteID], (err, results) => {
    if (!err) {
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: 'Route does not found' });
      }
     res.status(201).json({status: 201, data: "Route deleted successfully"});
     return ;
    } else {
      return res.status(500).json(err);
    }
  });
};

//update in tblRoute by id
exports.updateRoute = (req,res)=>{
  const { RouteID } = req.params;
  let tblRouteMaster = req.body;
  let RutModifyDate = moment().format('YYYY-MM-DD hh:mm:ss');
  let query = `UPDATE tblRouteMaster SET  RouteName=?, RouteEffDate=?, RouteSStage=?, RouteEStage=?, RutModifyDate=?, RouteStatus=? WHERE RouteID  = '${RouteID}'`
  db.query(query,[ tblRouteMaster.RouteName, tblRouteMaster.RouteEffDate, tblRouteMaster.RouteSStage, tblRouteMaster.RouteEStage, RutModifyDate, tblRouteMaster.RouteStatus],(err, result)=>{
    if (!err) {
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Route does not found' });
      }
     res.status(201).json({status: 201, data: "Route update successfully"});
     return ;
    } else {
      return res.status(500).json(err);
    }
  })
}

//create routestage map
exports.createRoutemap = (req, res) => {
  let tblRouteStageMap = req.body;
  const RouteID = tblRouteStageMap.route;
  const stageArr = tblRouteStageMap.arr;
  const fareArr = tblRouteStageMap.arr1;
  const effDate = tblRouteStageMap.effDate;

  const insertValues = async () => {
    for (let i = 0; i < stageArr.length; i++) {
      const routeVal = stageArr[i];
      const fareVal = JSON.stringify(fareArr[i]);
      const query =
        'INSERT INTO tblRouteStageMap (RouteID, StageID, Fare, EffectiveDate) VALUES (?, ?, ?, ?)';
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

//get data from tblTicketType
exports.readTicket = (req, res) => {
  let tblTicketType = req.body;
  const TTstatus = tblTicketType.ttstatus;
  var query1 = `SELECT TTid, TTname, TTduration FROM tblTicketType WHERE TTstatus = '${TTstatus}'`;
  db.query(query1, (err, result) => {
    if (!err) {
      if (result.length > 0) {
        res.status(200).json({ status: 201, data: result });
        return;
      } else {
        res.status(200).json({ status: 201, data: 'ticket  Not Found' });
      }
    } else {
      console.log(err);
    }
  });
};

//get ticket duration using ticket id
exports.readTicketDuration = (req, res) => {
  let tblTicketType = req.body;
  let TTID = tblTicketType.TTID;
  let query = `SELECT TTid, TTduration FROM tblTicketType WHERE TTid = '${TTID}'`;
  db.query(query,(err,result)=>{
    if(!err){
      if(result.length>0){
        let TTduration = JSON.parse(result[0].TTduration);
        let TTid = result[0].TTid;
        res.status(201).json({status: 201, data: {TTduration,TTid}});
      }
    }else{
      console.log(err);
    }
  })
}

//create route with ticket type in tblRouteTicketType
exports.createRouteTicType = (req, res) =>{
  let tblRouteTicketType = req.body;
  let RouteID = tblRouteTicketType.RouteID;
  let CreatedDate = moment(new Date()).format('YYYY-MM-DD');
  const TicketType = JSON.stringify(tblRouteTicketType.ApplicableTickets);
  const TicketDuration = JSON.stringify(tblRouteTicketType.ticketDuration);
  let query = 'INSERT INTO tblRouteTicketType (RouteID , TicketType, TicketDuration, CreatedDate) VALUES (?, ?, ?, ?)';
  db.query(query,[RouteID, TicketType, TicketDuration, CreatedDate],(err,result)=>{
    if(!err){
      res.status(200).json({status:201});
      return;
    }else{
      console.log(err);
    }
  })
}

//get ticket type based on route id
exports.readRouteTicType = (req, res)=>{
  let RouteID = req.body.RouteTicket;
  let query = `SELECT TicketType FROM tblRouteTicketType WHERE RouteID = '${RouteID}'`;
  db.query(query,(err,result)=>{
    if(!err){
      const data = JSON.parse(result[0].TicketType);
      let Ticketname = [];
      let TicketShortname = [];
      for(let i = 0; i< data.length; i++){
        const TicketType = data[i];
        let query2 = 'SELECT TTname, TTshortname FROM tblTicketType WHERE TTid = ?';
        db.query(query2,[TicketType],(err2,result2)=>{
          if(!err2){
              const ttname = result2[0].TTname;
              const ttshortname = result2[0].TTshortname;
              Ticketname.push(ttname);
              TicketShortname.push(ttshortname);
          } else {
            console.log(err2);
          }
        })
      }
      setTimeout(() => {
        res.status(200).json({status: 201, data:Ticketname, data1:TicketShortname});
      }, 1000);
    } else {
      console.log(err);
    }
  })
}

//get total transanction data
exports.readTransactionData = (req, res) =>{
  let tblTransaction = req.body;
  const OperId = tblTransaction.operId;
  let query = `SELECT Fare FROM tblTransaction WHERE RouteName LIKE '%${OperId}%' AND Status = 'PAID'`;
  db.query(query,(err,result)=>{
    if(!err){
      let totalTransaction = 0;
      for(let i = 0; i < result.length ; i++){
          totalTransaction += JSON.parse(result[i].Fare);
      }
      res.status(200).json({status:201 , data:totalTransaction});
    }else{
      console.log(err);
    }
  })
}

//get passengers data 
exports.readPassengersData = (req, res) =>{
  let tblTransaction = req.body;
  const OperId = tblTransaction.operId;
  const CreatedDate = tblTransaction.date;
  let query = `SELECT Passengers FROM tblTransaction WHERE RouteName LIKE '%${OperId}%' AND OrderTimeStamp LIKE '%${CreatedDate}%' AND Status = 'PAID'`;
  db.query(query,(err,result)=>{
    if(!err){
      if(result.length > 0){

        let totalPassengers = 0;
         for(let i = 0; i < result.length ; i++){
            totalPassengers += JSON.parse(result[i].Passengers);
          }
           res.status(200).json({status:201 , Passengers:totalPassengers, result:result});
       }else{
           let totalPassengers = 0;
           res.status(200).json({status:201 , Passengers:totalPassengers});
       }
    }else{
      console.log(err);
    }
  })
}

exports.readTransactionDataByAsset = (req, res) => {
  let tblTransaction = req.body;
  const OperId = tblTransaction.operId;
  let query = `SELECT Trip FROM tblTransaction WHERE RouteName LIKE '%${OperId}%' AND Status = 'PAID'`;
  db.query(query, (err, result) => {
    if (!err) {
      if (result.length > 0) {
        let initialAsset = result[0].Trip.match(/^(.*?)T/)[1];
        let previousAsset = '';
        let currentAsset = '';
        let totalAssetSet = new Set();
        totalAssetSet.add(initialAsset); // Add the initial asset directly to the set

        for (let i = 1; i < result.length; i++) {
          previousAsset = result[i - 1].Trip.match(/^(.*?)T/)[1];
          currentAsset = result[i].Trip.match(/^(.*?)T/)[1];

          if (previousAsset !== currentAsset) {
            totalAssetSet.add(currentAsset); // Add the current asset if it is different from the previous one
          }
        }
        
        // Convert the set to an array
        let totalAsset = Array.from(totalAssetSet);

        Promise.all([
          assetRegNo(totalAsset),
          assetRegNoFare(totalAsset)
        ])
          .then(([Asset, Fare]) => {
            res.status(200).json({ status: 201, data: { Asset, Fare, totalAsset} });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({ status: 500, message: 'Internal Server Error' });
          });
      }
    } else {
      console.log(err);
      res.status(500).json({ status: 500, message: 'Internal Server Error' });
    }
  });
};

const assetRegNo = (totalAsset) => {
  return new Promise((resolve, reject) => {
    let Asset = [];
    const queries = totalAsset.map((asset) => {
      return new Promise((resolve, reject) => {
        let query = 'SELECT AstRegNo FROM tblAsset WHERE AstId = ?';
        db.query(query, [asset], (err, result) => {
          if (!err) {
            if (result.length > 0) {
              Asset.push(result[0].AstRegNo);
            }
            resolve();
          } else {
            reject(err);
          }
        });
      });
    });

    Promise.all(queries)
      .then(() => {
        resolve(Asset);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const assetRegNoFare = (totalAsset) => {
  return new Promise((resolve, reject) => {
    const Fare = [];

    const queries = totalAsset.map((asset) => {
      return new Promise((resolve, reject) => {
        let query = `SELECT Fare FROM tblTransaction WHERE Trip LIKE '%${asset}%' AND Status = 'PAID'`;
        db.query(query, (err, result) => {
          if (!err) {
            let totalTransaction = 0;
            for (let i = 0; i < result.length; i++) {
              totalTransaction += JSON.parse(result[i].Fare);
            }
            Fare.push(totalTransaction);
            resolve();
          } else {
            reject(err);
          }
        });
      });
    });

    Promise.all(queries)
      .then(() => {
        resolve(Fare);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

//get route data by asset id
exports.readRouteByAssetID = (req, res) =>{
  const tblTransaction = req.body;
  const AstId = tblTransaction.AstId;
  let query = `SELECT RouteName FROM tblTransaction WHERE Trip LIKE '%${AstId}%' AND Status = 'PAID'`;
  db.query(query,(err, result)=>{
    if(!err){
      if(result.length > 0){
        let initalRoute = result[0].RouteName;
        let previousRoute = '';
        let currentRoute = '';
        let totalRoute = [];
        for (let i = 1; i < result.length - 1; i++) {
          previousRoute = result[i].RouteName;
          currentRoute = result[i + 1].RouteName;

          if (previousRoute !== currentRoute) {
            if (currentRoute !== initalRoute) {
              totalRoute.push(currentRoute);
            }
          }
        }
        totalRoute.push(initalRoute);
        Promise.all([
          getrouteName(totalRoute),
          routeFare(totalRoute, AstId)
        ])
          .then(([Route, Fare]) => {
            res.status(200).json({ status: 201, data: { Route, Fare, totalRoute} });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({ status: 500, message: 'Internal Server Error' });
          });
      }
    } else {
      console.log(err);
      res.status(500).json({ status: 500, message: 'Internal Server Error' });
    }
  });
};

const getrouteName = (totalRoute) => {
  return new Promise((resolve, reject) => {
    let Route = [];
    const queries = totalRoute.map((route) => {
      return new Promise((resolve, reject) => {
        let query = 'SELECT RouteName FROM tblRouteMaster WHERE RouteID = ?';
        db.query(query, [route], (err, result) => {
          if (!err) {
            if (result.length > 0) {
              Route.push(result[0].RouteName);
            }
            resolve();
          } else {
            reject(err);
          }
        });
      });
    });

    Promise.all(queries)
      .then(() => {
        resolve(Route);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const routeFare = (totalRoute, AstId) => {
  return new Promise((resolve, reject) => {
    const Fare = [];
    let AstID = AstId;
    const queries = totalRoute.map((route) => {
      return new Promise((resolve, reject) => {
        let query = `SELECT Fare FROM tblTransaction WHERE RouteName LIKE '%${route}%' AND Trip LIKE '%${AstId}%' AND Status = 'PAID'`;
        db.query(query, (err, result) => {
          if (!err) {
            let totalTransaction = 0;
            for (let i = 0; i < result.length; i++) {
              totalTransaction += JSON.parse(result[i].Fare);
            }
            Fare.push(totalTransaction);
            resolve();
          } else {
            reject(err);
          }
        });
      });
    });

    Promise.all(queries)
      .then(() => {
        resolve(Fare);
      })
      .catch((err) => {
        reject(err);
      });
  });
};