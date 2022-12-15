const fs=require('fs')
const cors=require('cors');
const cron=require('node-cron')
const express = require('express')
const db=require("./dbconnect")
const bodyparser=require('body-parser')
const readXlsxFile=require('read-excel-file/node')
const {parse}=require('csv-parse')
const { error } = require('console')
const { response } = require('express')
const app=express()
app.use('/current_file',express.static('current_file'))
app.use('/old_file',express.static('old_file'))
app.use(cors());


//API for all data
app.get('/',(req, res)=>{
   db.query("select * from axledata",(err,result)=>{
    if(err)
        res.send(err)
    else
        res.send(result)
   })
})

//API for data by date
// app.get("/:date",(req,res)=>{
//     data=req.params.date
//     db.query("select * from axledata where date=?",data,(err,result)=>{
//         if(err)
//             res.send(err)
//         else
//             res.send(result)
//     })
// })

//API for data by date from table trains
app.get("/:date",(req,res)=>{
    data=req.params.date
    db.query("select * from trains where date_t=?",data,(err,result)=>{
        if(err)
            res.send(err)
        else
            res.send(result)
    })
})

//API for data by date and train
app.get("/:train/:date",(req,res)=>{
    data=[req.params.train,req.params.date]
    db.query("select * from axledata where train=? and date_t=?",data,(err,result)=>{
        if(err)
            res.send(err)
        else
            res.send(result)
    })
})


app.listen(3000,()=>{
    console.log('server started...')
})



//import excel data to mysql
// function importExcelData2MySQL(file){
//     readXlsxFile("./current_file/"+file).then((rows) => {   
//     rows.shift()
//     db.query("insert into axledata values?",[rows],(error,response)=>{
//         console.log(error||"Data from file"+file+"inserted in table")
//         moveFile(file)
        
//     })
//     })
// }

//import csv data to mysql
function importcsvdata2mysql(file){
    let t=[]
    fs.createReadStream("./current_file/"+file)
    .pipe(parse({delimiter:",",from_line:2}))
    .on("data",function(rows){
        db.query("insert into axledata values(?)",[rows])
        t[0]=rows[1]
        t[1]=rows[7]
    })

.on("end",function(){
    console.log("Finished")
    console.log("Train:"+t)
    db.query("insert into trains(train,date_t) values(?)",[t])
    console.log("Train"+t+"recorded")
    moveFile(file)
})
.on("error",function(error){
    console.log(error.message)
})
}

//function to move file
function moveFile(f){
    fs.rename('./current_file/'+f,'./old_file/'+f,function(err){
        if(err)
            console.log(err)
        else
            console.log(f+"Files moved")
    })
}
function fileOperation(){
   fs.readdir('./current_file',function(err,file){
    if(err){
        console.log(err)
    }
    else{
        if(file.length!=0){
            for(i=0;i<file.length;i++)
            {
                importcsvdata2mysql(file[i])
                

            }
        }
    }
   })
}
fileOperation()
cron.schedule('* * * * *',fileOperation)