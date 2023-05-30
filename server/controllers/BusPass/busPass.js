const db = require('../../db/db');
const moment = require('moment');

//search a operator for filtering data
exports.searchOperator = (req, res) => {
  const tblOperator = req.body;
  let OperShortName = tblOperator.search;
  let query = `SELECT OperId, OperName FROM tblOperator WHERE OperShortName LIKE '%${OperShortName}%' OR OperName LIKE '%${OperShortName}%'`;
  db.query(query, (err, result) => {
    if (!err) {
      if (result.length > 0) {
        res.status(200).json({ status: 201, data: result });
      } else {
        res.status(200).json({ status: 201, data: result.length });
      }
    } else {
      console.log(err);
    }
  });
};

//search a stage for filtering data
exports.searchStage = (req, res) => {
  const tblStageMaster = req.body;
  let OperId = tblStageMaster.OperId;
  let StageName = tblStageMaster.search;
  let query = `SELECT StageID, StageName FROM tblStageMaster WHERE StageID LIKE '%${OperId}%' AND StageName LIKE '%${StageName}%'`;
  db.query(query, (err, result) => {
    if (!err) {
      if (result.length > 0) {
        res.status(200).json({ status: 201, data: result });
      } else {
        res.status(200).json({ status: 201, data: result.length });
      }
    } else {
      console.log(err);
    }
  });
};

//search RouteID from StageID
exports.searchRoute = (req, res) => {
  const tblRouteStageMap = req.body;
  let StartStage = tblRouteStageMap.stage1;
  let EndStage = tblRouteStageMap.stage2;
  let query = `SELECT  rs1.RouteID, rs1.Fare AS StartStageFare,  rs2.Fare AS EndStageFare FROM tblRouteStageMap rs1 INNER JOIN tblRouteStageMap rs2 ON rs1.RouteID = rs2.RouteID  WHERE rs1.StageID = '${StartStage}' AND rs2.StageID = '${EndStage}' LIMIT 1`;
  db.query(query, (err, result) => {
    if (!err) {
      if (result.length > 0) {
        let RouteID = result[0].RouteID;
        let StartFare = JSON.parse(result[0].StartStageFare);
        let EndFare = JSON.parse(result[0].EndStageFare);
        var Fare = {}; // Initialize the Fare array
        for (let key in StartFare) {
          if (EndFare.hasOwnProperty(key) && StartFare.hasOwnProperty(key)) {
            Fare[key] = Math.abs(EndFare[key] - StartFare[key]);
          }
        }
        console.log(Fare);
        getTicketType(RouteID)
          .then((ticketTypeResult) => {
            res
              .status(200)
              .json({
                status: 201,
                data: result[0].RouteID,
                TicketType: ticketTypeResult,
                Fare
              });
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        res.status(200).json({ status: 201, data: result.length });
      }
    } else {
      console.log(err);
    }
  });
};

const getTicketType = (RouteID) => {
  return new Promise((resolve, reject) => {
    let query = `SELECT TicketType FROM tblRouteTicketType WHERE RouteID = '${RouteID}'`;
    db.query(query, (err, result) => {
      if (!err) {
        let TicketIDs = JSON.parse(result[0].TicketType);
        const promises = TicketIDs.map((TicketID) => getTicketName(TicketID));
        Promise.all(promises)
          .then((ticketNames) => {
            resolve(ticketNames);
          })
          .catch((error) => {
            reject(error);
          });
      } else {
        reject(err);
      }
    });
  });
};

const getTicketName = (TicketID) => {
  return new Promise((resolve, reject) => {
    let query = `SELECT TTid, TTname, TTshortname FROM tblTicketType WHERE TTid = '${TicketID}'`;
    db.query(query, (err, result) => {
      if (!err) {
        if (result.length > 0) {
          resolve(result[0]);
        } else {
          resolve(null); // TicketID not found
        }
      } else {
        reject(err);
      }
    });
  });
};
