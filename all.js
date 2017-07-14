const fs = require("bluebird")
    .promisifyAll(require('fs'));
const process = require('process');

process.chdir('./files');

function concatAndWrite(arr){
    console.log(
        arr.reduce((p,c)=>p+" - "+c,"Result: "));
}

//All with Callbacks
fs.readdir('.','utf8',(err,files)=>{
    if(err){
        console.log(err);
        return;
    }
    const cb = callbackCounter(files.length,concatAndWrite);
    files.forEach(file=>{
        fs.readFile(file,cb);
    });
});

function callbackCounter(limit,cb){
    let arr = [];
    return (err,data)=>{
        if(err){
            console.log(err);
            return;
        }
        arr.push(data);
        if(arr.length==limit){
            cb(arr);
        }
    };
}

//Using Promise all
fs.readdirAsync('.','utf8')
    .then((files)=>{
        return Promise.all(
            files.map(file=>fs.readFileAsync(file,"utf8")));
    })
    .then(concatAndWrite)
    .catch(console.log);

//Using Promise all
async function usingAwait(fp){
    const files = await fs.readdirAsync(fp,'utf8');
    const content = await Promise.all(
            files.map(file=>fs.readFileAsync(file,"utf8")));
    concatAndWrite(content);
}

usingAwait('.')
    .catch(console.log);