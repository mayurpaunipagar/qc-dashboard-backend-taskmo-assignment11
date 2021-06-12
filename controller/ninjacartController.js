const {Router} = require('express');
const connection=require("../db/db");

module.exports = () =>{
    const ninjacartApi = Router()

    ninjacartApi.get('/',(req,res)=>{
        res.json({
            message:"GET USER"
        })
    })

    ninjacartApi.post('/lead_details',(req,res)=>{
        const lead_id=req.body.lead_id;
        connection.query("select * from ninjacart_leads WHERE lead_id=(select ref_table_id from fse_leads WHERE lead_id=?)",[lead_id],(error,data,fields)=>{
            if(error){
                console.log("Error while fetching lead_details",error);
            }else{
                res.send({"lead_details":data[0]});
            }
        })
    })

    ninjacartApi.post('/qc_remarks',(req,res)=>{
        const merchant_number=req.body.merchant_number;
        connection.query("SELECT qc_remark,created_on FROM ninjacart_leads WHERE merchant_number=? AND is_active=? order by created_on desc limit 4; ",[merchant_number,"0"],(error,data)=>{
            if(error){
                console.log("Error while fetching QC Remarks",error)
            }else{
                res.send(data);
            }
        })
    })

    ninjacartApi.put('/:id',(req,res)=>{
        console.log("Im handling PUT user Request")
        res.json({
            message:"PUT USER" + req.params.id
        })
    })

    ninjacartApi.delete('/:id',(req,res)=>{
        console.log("Im handling DELETE user Request")
        res.json({
            message:"DELETE USER"+ req.params.id
        })
    })

    return ninjacartApi
}