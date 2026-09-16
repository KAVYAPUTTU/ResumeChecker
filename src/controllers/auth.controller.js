const userModel = require("../models/user.model");


async function registerUserController(req,res) {
    
    const {username ,email,password} = req.body;
    if(!username || !email || !password){
        return res.status(400).json(
            message:"please provide username , email , password"
        )
    }
    isUserAlreadyExsists = await userModel.findOne({
        $or:[{username},{email}]
    })
    if (isUserAlreadyExsists) {
        return res.status(400).json({
            message:"Account Already there"
        })
    }

    
}

module.exports = {registerUserController} 