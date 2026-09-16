const app = require("./src/app")
require("dotenv").config()
const connectDB = require("./src/db/databases")

connectDB()
app.listen(3000,()=>{
    console.log("listening on port 3000");
})
