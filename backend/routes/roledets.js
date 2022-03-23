const { userInfo } = require('os');
const User = require('../models/users.model');
let password="admin123"

//https://www.youtube.com/watch?v=ElZG_aOC7Yc

exports.seedadmin=()=>{
User.findOne({role: 'admin'},(err,admin)=>{
if(err) throw (err)
if(admin){
    return "admin account alredy exists"
}
userInfo.create({
    email: "admin",
    password:"admin",
    role:"admin"
},(err, user)=>{
        if(err) throw err
        bcrypt.genSalt(10,(err,salt)=>{
            if (err) throw err;
        })
bcrypt.hash(password,salt,(err,hash)=>{
    if (err)throw err
    user.password=hash;
    user.save((err, savedUser)=>{
            return "admin account created"
    })
})
})
})
}
