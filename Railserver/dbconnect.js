const mysql=require("mysql")
const db=mysql.createConnection({
    host:"localhost",
    port:3306,
    user:"root",
    password:"Shlok@2108",
    database:"raildata"
})
db.connect(function(err){
    if(err)
        console.log(err)
    else
        console.log("Connected to MYSQL server...")
})
module.exports=db