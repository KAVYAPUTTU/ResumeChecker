const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware")
const interviewController = require("../controllers/interview.controller")
const uploads = require("../middlewares/file.middleware")
const interviewRouter = express.Router();

//first authenticate then use multer-we will get file with name resume
interviewRouter.post("/",authMiddleware.authUser,uploads.single("resume"),interviewController.generateInterviewReportController)
//get interview report by interviewId
interviewRouter.get("/report/:interviewId",authMiddleware.authUser,interviewController.getInterviewReportByIdController)
//get all interview reports of the logged user
interviewRouter.get("/",authMiddleware.authUser,interviewController.getAllInterviewReports)

module.exports = interviewRouter