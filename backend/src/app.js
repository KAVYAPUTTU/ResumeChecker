const express = require("express")
const authRouter = require("./routes/auth.route")
const app = express()
const cookieParser = require("cookie-parser")
const cors = require("cors")
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(express.json())

app.use("/api/auth",authRouter)

module.exports = app