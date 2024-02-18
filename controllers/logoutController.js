const User=require('../model/User')


const handleLogout=async(req,res)=>{
// on client,delete accesstoken

    const cookies=  req.cookies
if(!cookies?.jwt) return res.sendStatus(204); //no content to send
const refreshToken=cookies.jwt;

//is refreshtoken available in DB
const foundUser=await User.findOne({ refreshToken });
if(!foundUser) 
{
    res.clearCookie('jwt',{httpOnly:true})
    return res.sendStatus(403)
}
//Delete refreshtoken
foundUser.refreshToken='';
const result=await foundUser.save();
console.log(result);

res.clearCookie('jwt',{httpOnly:true}) //secure :true - only serves on htttps
res.sendStatus(204);
}
module.exports={handleLogout};