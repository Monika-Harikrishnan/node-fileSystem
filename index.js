const express = require('express')
const app = express()
const PORT = 5000;
const fs = require("fs");
const folderPath = "./Files"

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.post("/createFile",(req,res) => {

    if(!fs.existsSync(folderPath)){
        fs.mkdirSync(folderPath)
    }
    
    let date = new Date();
    let dateString = date.toString().replace(/:/g, '-'); //remove the special character and convert the date into string
    fs.writeFile(`${folderPath}/date-time.txt`,dateString,(err)=>{
        if(err){
            res.status(500).send(err); //sent error as response if therr is error 
        }else{
            res.status(200).send("File created successfully..."); // sent the response after creating the file
        }
    })
})

app.get("/readFiles",(req,res) => {
    
    fs.readdir(`${folderPath}`, (err,files) => {
        if (err) {
            res.status(500).send(err); //sent error as response if therr is error 
          } else {
            res.status(200).json(files); //sent file name as the response
          }
    })
})

app.listen(PORT, ()=> console.log("Server listening on port",PORT))

////// git testing