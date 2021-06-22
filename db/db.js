const mysql = require('mysql');
const connection = mysql.createConnection({
    host: '103.212.121.222',
    user: 'fmp',
    password: 'FMP@#123123',
    database: 'feedmypockets'
  });

  connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected with mysql db!...");
  });

// connection.query(`SELECT  * FROM fse_lead WHERE lead_id=1`,(error,list)=>{
//     if(error){
//         console.log("error occured",error);
//     }else{
//         console.log(list);
//     }
// })

module.exports=connection;