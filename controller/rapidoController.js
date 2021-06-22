const { Router } = require("express");
const connection = require("../db/db");

module.exports = () => {
  const rapidoApi = Router();

  rapidoApi.get("/", (req, res) => {
    res.json({
      message: "GET USER",
    });
  });

  rapidoApi.post("/add", (req, res) => {
    const {
      user_id,
      driver_name,
      contact_number,
      aadhar_front_image,
      aadhar_back_image,
      aadhar_number,
      rc_front_image,
      rc_back_image,
      vehicle_number,
      dl_front_image,
      dl_back_image,
      registration_screenshot,
      latlong,
    } = req.body;
    const query =
      `INSERT INTO rapido_leads (user_id,driver_name,driver_contact,aadhar_front_image,aadhar_back_image,aadhar_number,rc_front_image,rc_back_image,vehicle_number,dl_front_image,dl_back_image,registration_screenshot,latlong,qc_status,stage1_status,stage2_status,stage3_status,stage4_status,qc_remark,qc_updated_on,qc_admin_id,created_on,updated_on,is_active)` +
      ` VALUES ("${user_id}", "${driver_name}", "${contact_number}", "${aadhar_front_image}","${aadhar_back_image}","${aadhar_number}","${rc_front_image}","${rc_back_image}","${vehicle_number}","${dl_front_image}","${dl_back_image}","${registration_screenshot}","${latlong}","0","0","0","0","0","test remark",${Date.now()},"1",${Date.now()},${Date.now()},"0")`;
    connection.query(query, (error, data) => {
      if (error) {
        res.status(503).send({
          error: true,
          message: error.message,
        });
      } else {
        res.send({
          error: false,
          message: "success",
        });
      }
    });
  });

  rapidoApi.put("/:id", (req, res) => {
    console.log("Im handling PUT user Request");
    res.json({
      message: "PUT USER" + req.params.id,
    });
  });

  rapidoApi.delete("/:id", (req, res) => {
    console.log("Im handling DELETE user Request");
    res.json({
      message: "DELETE USER" + req.params.id,
    });
  });

  return rapidoApi;
};
