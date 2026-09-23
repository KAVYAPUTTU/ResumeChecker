const { PDFParse } = require("pdf-parse");
const generateInterviewReport = require("../services/ai.service")
const interviewReportModel = require("../models/interviewReport.model")
async function generateInterviewReportController(req, res) {
    const resumeFile = req.file;
    const parser = new PDFParse({
        data: req.file.buffer
    });

    const resumeContent = await parser.getText();

    const { selfDescription, jobDescription } = req.body;

    const interviewReportByAi = await generateInterviewReport({
        resume: resumeContent.text,
        selfDescription,
        jobDescription
    })
    console.log(
    JSON.stringify(interviewReportByAi.technicalQuestions, null, 2)
);
    const interviewReport = await interviewReportModel.create({
        user: req.user.id,
        resume: resumeContent.text,
        selfDescription,
        jobDescription,
        ...interviewReportByAi
    })

    res.status(201).json({
        message: "Interview report generated successfully",
        interviewReport
    })
}

module.exports = { generateInterviewReportController }