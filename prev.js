const fs = require('fs');
const bluebird = require("bluebird");
const firstFile = "file1";

require('process').chdir('./files');

//3 Files Callback Hell 
fs.readFile(firstFile,"utf8",(err,data1)=>{
    if(err){
        console.log(err);
        return;
    }
    fs.readFile(data1,"utf8",(err,data2)=>{
        if(err){
            console.log(err);
            return;
        }
        fs.readFile(data2,"utf8",(err,data3)=>{
            if(err){
                console.log(err);
                return;
            }
            console.log(data3,data2,data1);
        })
    })
});

//Using Bluebird
const pfs = bluebird.promisifyAll(fs);

pfs.readFileAsync(firstFile,"utf8")
    .then(data=>Promise.all([pfs.readFileAsync(data,"utf8"),data]))
    .then(data=>Promise.all([pfs.readFileAsync(data[0],"utf8"),...data]))
    .then(data=>console.log(...data))
    .catch(console.log);