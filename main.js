const fs = require('fs');
const bluebird = require("bluebird");
const StringDecoder = require('string_decoder').StringDecoder;
const decoder = new StringDecoder('utf8');
const firstFile = "file1";

require('process').chdir('./files');

//3 Files Callback Hell 
fs.readFile(firstFile,"utf8",(err,data)=>{
    if(err){
        console.log(err);
        return;
    }
    fs.readFile(data,"utf8",(err,data)=>{
        if(err){
            console.log(err);
            return;
        }
        fs.readFile(data,"utf8",(err,data)=>{
            if(err){
                console.log(err);
                return;
            }
            console.log(data);
        })
    })
});

//Using Bluebird
const pfs = bluebird.promisifyAll(fs);

pfs.readFileAsync(firstFile)
    .then(pfs.readFileAsync)
    .then(pfs.readFileAsync)
    .then(buffer=>console.log(decoder.write(buffer)))
    .catch(console.log);

//Manual promisify
function readFileAsync(filePath){
    return new Promise((resolve,reject)=>{
        fs.readFile(filePath,"utf8",(err,data)=>{
            if(err){
                reject(err);
            }
            resolve(data);
        });
    });
}

readFileAsync(firstFile)
    .then(readFileAsync)
    .then(readFileAsync)
    .then(console.log)
    .catch(console.log);