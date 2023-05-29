const db = require('../../db/db');
const moment = require('moment');

//search a operator for filtering data
exports.searchOperator = (req, res)=>{
   const tblOperator = req.body;
   let OperShortName = tblOperator.search;
   let query = `SELECT OperId, OperName FROM tblOperator WHERE OperShortName LIKE '%${OperShortName}%' OR OperName LIKE '%${OperShortName}%'`;
   db.query(query,(err,result)=>{
    if(!err){
        if(result.length > 0){
            res.status(200).json({status:201, data: result});
        }else{
            res.status(200).json({status:201, data: result.length});
        }
       
    }else{
        console.log(err);
    }
   })
}

//search a stage for filtering data 
exports.searchStage = (req, res)=>{
    const tblStageMaster = req.body;
    let OperId = tblStageMaster.OperId;
    let StageName = tblStageMaster.search;
    let query = `SELECT StageID, StageName FROM tblStageMaster WHERE StageID LIKE '%${OperId}%' AND StageName LIKE '%${StageName}%'`;
    db.query(query,(err, result)=>{
        if(!err){
            if(result.length > 0){
                res.status(200).json({status:201, data: result});
            }else{
                res.status(200).json({status:201, data: result.length});
            }
           
        }else{
            console.log(err);
        }
    })
}

//search RouteID from StageID 
exports.searchRoute = (req, res) => {
    const tblRouteStageMap = req.body;
    let StartStage = tblRouteStageMap.stage1;
    let EndStage = tblRouteStageMap.stage2;
    let query = `SELECT  rs1.RouteID, rs1.Fare AS StartStageFare,  rs2.Fare AS EndStageFare FROM tblRouteStageMap rs1 INNER JOIN tblRouteStageMap rs2 ON rs1.RouteID = rs2.RouteID  WHERE rs1.StageID = '${StartStage}' AND rs2.StageID = '${EndStage}' LIMIT 1`;
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
  }