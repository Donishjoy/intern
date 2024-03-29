const User=require('../model/User')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')


const handleLogin=async(req,res)=>{
    const{user,pwd}=req.body;
if(!user ||!pwd) return res.status(400).json({'message':'Username and password are required'});

const foundUser=await User.findOne({ username: user });
if(!foundUser) return res.sendStatus(401) //Unauthorized
const match=await bcrypt.compare(pwd,foundUser.password)
if(match){

    const roles=Object.values(foundUser.roles);
    //create JWT
const accessToken=jwt.sign(
    {
        
            "UserInfo":{
        "username":foundUser.username,
    "roles":roles
    }
    },
        process.env.ACCESS_TOKEN_SECRET,//secret or private key for signing token 
        {expiresIn:'30s'}
)
const refreshToken=jwt.sign(
    {
        "username":foundUser.username},
        process.env.REFRESH_TOKEN_SECRET,//secret or private key for signing token 
        {expiresIn:'1d'}
)

//Saving refresh token with current user
foundUser.refreshToken=refreshToken;
const result=await foundUser.save();
console.log(result);

res.cookie('jwt',refreshToken,{httpOnly:true,maxAge:24*60*60*1000});
    res.json({accessToken})
}else{
    res.sendStatus(401);
}

}
module.exports={handleLogin};