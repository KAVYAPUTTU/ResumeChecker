const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware")
const interviewController = require("../controllers/interview.controller")
const uploads = require("../middlewares/file.middleware")
const interviewRouter = express.Router();

//first authenticate then use multer-we will get file with name resume
interviewRouter.post("/",authMiddleware.authUser,uploads.single("resume"),interviewController.generateInterviewReportController)

module.exports = interviewRouter