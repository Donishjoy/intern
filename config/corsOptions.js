
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

module.exports=corsOption