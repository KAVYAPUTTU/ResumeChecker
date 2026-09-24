import { useParams } from "react-router"
import { InterviewContext } from "../Interview.context"
import { getAllInterviewReports, getInterviewReportById, generateInterviewReport } from "../services/interview.api"
import { useContext, useEffect } from "react"

export const useInterview = () => {

    const context = useContext(InterviewContext);
    const { interviewId } = useParams()

    if (!context) {
        throw new Error("useInterview must be used within an interview Provider")
    }
    const { loading, setLoading, report, setReport, setReports, reports } = context;

    const generateReport = async ({ jobDescription, selfDescription, resumeFile }) => {
        setLoading(true)
        let response = null
        try {
            response = await generateInterviewReport({ jobDescription, selfDescription, resumeFile });
            setReport(response.interviewReport)
        } catch (error) {
            console.log(error);

        } finally {
            setLoading(false)
        }
        return response.interviewReport
    }

    const getReportById = async (interviewId) => {
        setLoading(true);
        let response = null
        try {
            response = await getInterviewReportById(interviewId)
            setReport(response.interviewReport)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
        return response.interviewReport
    }
    const getReports = async () => {
        setLoading(true);
        let response = null
        try {
            response = await getAllInterviewReports()
            setReports(response.interviewReports)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
        return response.interviewReports
    }


    useEffect(() => {
        if (interviewId) {
            getReportById(interviewId)
        } else {
            getReports()
        }
    }, [interviewId])

    return { loading, setLoading, report, setReport, setReports, reports, generateReport, getReportById, getReports }
}
