const fs=require('fs')

const path=require('path')
fs.readFile(path.join(__dirname,'files','don.txt'),'utf-8',(err,data)=>
{
    if(err)throw err;
    console.log(data);
})

console.log('Hello')

fs.writeFile(path.join(__dirname,'files','welcome.txt'),'Nice to meet ',(err,data)=>
{
    if(err)throw err;
    console.log('write complete');

    fs.appendFile(path.join(__dirname,'files','welcome.txt'),'\n yes \n ',(err,data)=>
    {
        if(err)throw err;
        console.log('append complete');
    })
    fs.rename(path.join(__dirname,'files','welcome.txt'),path.join(__dirname,'files','renamed.txt'),(err,data)=>
{
    if(err)throw err;
    console.log('rename complete');
})

})