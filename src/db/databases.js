const mongoose = require("mongoose")
require("dotenv").config()
async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("connected to database");
    } catch (error) {
        console.log(error);

    }
}

module.exports =connectDB