const {Router} = require('express');
const connection=require("../db/db");

module.exports = () =>{
    const userApi = Router()

    userApi.get('/',(req,res)=>{
        const lead_id=req.body.lead_id;
        console.log("Im handling get user Request")
        connection.query("select lead_id from fieldon_jiomart_leads LIMIT 2;",(error,data,fields)=>{
            console.log("i am data",data);
            res.send({data});
        })
        // res.json({
        //     message:"GET USER"
        // })
    })

    userApi.post('/lead_details',(req,res)=>{
        const lead_id=req.body.lead_id;
        console.log("leadId",lead_id);
        connection.query("select * from fieldon_jiomart_leads WHERE lead_id=?",[lead_id],(error,data,fields)=>{
            res.send({"lead_details":data[0]});
        })
    })

    userApi.post('/qc_remarks',(req,res)=>{
        const mid=req.body.mid;
        connection.query("select qc_remark from fieldon_jiomart_leads WHERE mid=?",[mid],(error,data)=>{
            if(error){
                console.log("Error while fetching QC Remarks",error)
            }else{
                res.send(data);
            }
        })
    })

    userApi.put('/:id',(req,res)=>{
        console.log("Im handling PUT user Request")
        res.json({
            message:"PUT USER" + req.params.id
        })
    })

    userApi.delete('/:id',(req,res)=>{
        console.log("Im handling DELETE user Request")
        res.json({
            message:"DELETE USER"+ req.params.id
        })
    })

    return userApi
}