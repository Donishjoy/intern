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

app.listen(PORT,()=>console.log(`server running on ${PORT}`))