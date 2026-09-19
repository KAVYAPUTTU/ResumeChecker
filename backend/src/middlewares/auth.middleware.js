const jwt = require("jsonwebtoken");
const blackListModel = require("../models/balcklist.model")

async function authUser(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            message: "Unauthorized"
        })
    }
    const isTokenBlackListed = await blackListModel.findOne({token});
    if(isTokenBlackListed){
        return res.status(401).json({
            message: "Token is invalid"
        })
    }
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        req.user = decoded;
        next();
    } catch (error) {
        console.log(error);
        
        return res.status(401).json({
            message: "Invalid Token"
        })
    }

}

module.exports= {authUser}