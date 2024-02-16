const exp = require('constants');
const express=require('express')
const app = express()
const path=require('path')
const cors=require('cors')
const {logger}=require('./middleware/logEvents')

const errorHandler=require('./middleware/errorHandler')
const PORT=process.env.PORT || 3500; 

//custom middleware
app.use(logger);
//cross origin resource sharing

const whitelist=['https://yoursite.com','https://127.0.0.1:5500','https://localhost:3500']
const corsOption={
    origin:(origin,callback)=>{
        if(whitelist.indexOf(origin)!==-1 ||!origin){
            callback(null,true)
        }
        else{
            callback(new Error('not allowed by cors'))
        }
    },optionsSuccessStatus:200
}
app.use(cors(corsOption));
//built in middleware to urlencoded data
//form data

app.use(express.urlencoded({extended:false}))

//built in middleware for JSON
app.use(express.json())

//serve static files
app.use('/',express.static(path.join(__dirname,'/public')))
app.use('/subdir',express.static(path.join(__dirname,'/public')))

//routes
app.use('/',require('./routes/root'));

app.use('/subdir',require('./routes/subdir'));





//route handlers

app.get('/hello(.html)?',(req,res,next)=>{

    console.log("opened hello");
    next();
},(req,res)=>
{
    res.send("Hello world")
})

//chain routers
const one=(req,res,next)=>{
    console.log('one')
    next()
;}
const two=(req,res,next)=>{
    console.log('two')
    next()
;}
const three=(req,res,next)=>{
    console.log('three')
    res.send('finished')
}

app.get('/chain(.html)?',[one,two,three]);

app.listen(PORT,()=>console.log(`server running on ${PORT}`))