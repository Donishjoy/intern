const http=require('http')
const path=require('path')
const fs=require('fs')
const fsPromises=require('fs').promises

const logEvents=require('./logEvents')

const EventEmitter=require('events')

class MyEmitter extends EventEmitter{ };


const myEmitter=new MyEmitter();


const PORT=process.env.PORT || 3500;
const server=http.createServer((req,res)=>
{
    console.log(req.url,req.method);

let filePath;
const extension=path.extname(req.url);
let contentType;

switch(extension)
{
    case 'json':
        contentType='text/javascript'
        break;
    case 'text':
        contentType='text/plain'
        break;
    default:
        contentType='text/html'
        break;
}


filePath=
contentType==='text/html' && req.url==='/'
?path.join(__dirname,'views','index.html')
:contentType==='text/html' && req.url.slice(-1)==='/'
?path.join(__dirname,'views',req.url,'index.html')
:contentType==='text/html'
?path.join(__dirname,'views',req.url)
:path.join(__dirname,req.url);


});
server.listen(PORT,()=>console.log(`Server running on ${PORT}`));
