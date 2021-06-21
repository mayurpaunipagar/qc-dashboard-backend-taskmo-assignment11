const { Router } = require("express");
const connection = require("../db/db");

module.exports = () => {
  const ninjacartApi = Router();

  ninjacartApi.get("/", (req, res) => {
    res.json({
      message: "GET USER",
    });
  });

  ninjacartApi.post("/lead_details", (req, res) => {
    const lead_id = req.body.lead_id;
    connection.query(
      "select * from ninjacart_leads WHERE lead_id=(select ref_table_id from fse_leads WHERE lead_id=?)",
      [lead_id],
      (error, data) => {
        if (error) {
          console.log("Error while fetching lead_details", error);
          res.sendStatus(503);
        } else if(data[0]) {
          connection.query(
            "select mobile_number from fse_user where user_id=?",
            [data[0].user_id],
            (error,data1)=>{
                if(error){
                    console.log("Error while fetching fse contact no.",error);
                    res.sendStatus(503);
                }else{
                    if(data1[0] && data1[0].mobile_number){
                        data[0].fse_contact_number=data1[0].mobile_number;
                        res.send({ lead_details: data[0] });
                    }else{
                      console.error("Error: while fetching fse_contact_number");
                      res.sendStatus(503);
                    }
                   
                }
            }
          );
        }else{
          res.sendStatus(503);
        }
      }
    );
  });

  ninjacartApi.post("/qc_remarks", (req, res) => {
    const merchant_number = req.body.merchant_number;
    connection.query(
      "SELECT qc_remark,created_on FROM ninjacart_leads WHERE merchant_number=? AND is_active=? order by created_on desc limit 4; ",
      [merchant_number, "0"],
      (error, data) => {
        if (error) {
          console.log("Error while fetching QC Remarks", error);
        } else {
          res.send(data);
        }
      }
    );
  });

  ninjacartApi.put("/:id", (req, res) => {
    console.log("Im handling PUT user Request");
    res.json({
      message: "PUT USER" + req.params.id,
    });
  });

  ninjacartApi.delete("/:id", (req, res) => {
    console.log("Im handling DELETE user Request");
    res.json({
      message: "DELETE USER" + req.params.id,
    });
  });

  return ninjacartApi;
};
