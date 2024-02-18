const User=require('../model/User')

const bcrypt = require('bcrypt')

const handlenewUser = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required' });
    // check for duplicate username in the DB
    const duplicate = await User.findOne({ username: user });

    if (duplicate) return res.sendStatus(409);
    try {
        //encrypt the password
        const hashedPwd = await bcrypt.hash(pwd, 10)
        //new user and store in DB 
        const result = User.create({ 
            "username": user,
             "password": hashedPwd });
console.log(result);



        res.status(201).json({ 'success': `New user ${user} created` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}
module.exports = { handlenewUser };