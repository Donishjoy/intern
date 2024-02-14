const express=require('express')
const app = express()
const path=require('path')
const PORT=process.env.PORT || 3500; 

app.get('/',(req,res)=>
{
res.sendFile(path.join(__dirname,'views','index.html'));
});

//redirect
app.get('/new',(req,res)=>
{
    res.redirect('/')
})

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