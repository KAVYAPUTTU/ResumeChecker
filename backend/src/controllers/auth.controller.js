const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const blackListModel = require("../models/balcklist.model")

async function registerUserController(req, res) {

    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({
            message: "All fields are required"
        })
    }
    const isUserAlreadyExsists = await userModel.findOne({
        $or: [{ username }, { email }]
    })
    if (isUserAlreadyExsists) {
        return res.status(400).json({
            message: "Account Already there"
        })
    }
    const hash = await bcrypt.hash(password, 10);
    const user = await userModel.create({
        username,
        email,
        password: hash
    });

    const token = jwt.sign({ id: user._id, username: user.username, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.cookie("token", token);

    res.status(201).json({
        message: "User Registered Successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        },
    });

}

async function loginUserController(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "All fields are required"
        })
    }
    const user = await userModel.findOne({ email });

    if (!user) {
        return res.status(400).json({
            message: "Invalid Email or Password"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid Email or Password"
        })
    }

    const token = jwt.sign({ id: user._id, username: user.username, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.cookie("token",token)

    res.status(200).json({
        message: "User Logged In Successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    });
}

//logout -> blacklisting token trough mongodb
async function logoutUserController(req, res) {
    const token = req.cookies.token;

    if(token){
        await blackListModel.create({token})
    }

    res.clearCookie("token");
    res.status(200).json({
        message: "User Logged Out Successfully"
    })
}

async function getMeController(req,res){
    const user = await userModel.findById(req.user.id).select("-password");
    return res.status(200).json({
        message:"User Fetched Successfully",
        user
    })
}

module.exports = { registerUserController, loginUserController ,logoutUserController ,getMeController}
