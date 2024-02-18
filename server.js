require('dotenv').config();
const exp = require('constants');
const express=require('express')
const app = express()
const path=require('path')
const cors=require('cors')
const {logger}=require('./middleware/logEvents')
const corsOption=require('./config/corsOptions')
const errorHandler=require('./middleware/errorHandler')
const verifyJWT=require('./middleware/verifyJWT')
const cookieParser=require('cookie-parser')
const mongoose=require('mongoose');
const connectDB=require('./config/dbConn')
const PORT=process.env.PORT || 3500; 

//connect MongoDB
connectDB();


//custom middleware
app.use(logger);
//cross origin resource sharing

app.use(cors(corsOption));
//built in middleware to urlencoded data
//form data

app.use(express.urlencoded({extended:false}))

//built in middleware for JSON
app.use(express.json())

//middleware for cookie
app.use(cookieParser());


//serve static files
app.use('/',express.static(path.join(__dirname,'/public')))
app.use('/subdir',express.static(path.join(__dirname,'/public')))

//routes
app.use('/',require('./routes/root'));
app.use('/register',require('./routes/register'));
app.use('/auth',require('./routes/auth'));
app.use('/refresh',require('./routes/refresh'));
app.use('/logout',require('./routes/logout'));


app.use('/subdir',require('./routes/subdir'));

app.use(verifyJWT);
app.use('/employees',require('./routes/api/employees'))




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


mongoose.connection.once('open',()=>{
    console.log('Connected to MongoDB');
    app.listen(PORT,()=>console.log(`server running on ${PORT}`))
})
