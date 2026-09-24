import { useRef, useState } from "react";
import { useInterview } from "../hooks/useInterview"

import "../style/home.scss"

function Home() {
    const { loading, generateReport } = useInterview();
    const [jobDescription, setJobDescription] = useState("")
    const [selfDescription, setSelfDescription] = useState("");
    const resumeInputRef = useRef()

    const handleGenerateReport =async ()=>{
        const resumeFile = resumeInputRef.currect.files[0]
        await generateReport({jobDescription,selfDescription,resumeFile})
    }
    return (
        <main className="home-page">
            <div className="home-page__glow home-page__glow--left" />
            <div className="home-page__glow home-page__glow--right" />

            <header className="page-header">
                <div className="page-header__title">
                    <span className="brand-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M6 2.75h8.1L19 7.6v13.65H6z" />
                            <path d="M14 2.75V8h5M9 12h6M9 15h6M9 18h3" />
                        </svg>
                    </span>
                    <h1>Resume <span>Report Generator</span></h1>
                </div>
                <p>Upload your resume and job description to get a tailored report with strengths,<br className="desktop-break" /> gaps and improvement suggestions.</p>
            </header>

            <section className="report-grid" aria-label="Resume report inputs">
                <article className="input-card job-card">
                    <div className="card-heading">
                        <span className="card-heading__icon" aria-hidden="true">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="7" width="18" height="14" rx="2" />
                                <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18M10 12v2h4v-2" />
                            </svg>
                        </span>
                        <div>
                            <h2>Job Description</h2>
                            <p>Enter the job description here...</p>
                        </div>
                    </div>

                    <textarea
                        onChange={(e) => (setJobDescription(e.target.value))}
                        id="jobDescription"
                        className="job-description-input"
                        placeholder="Enter the job description here..."
                        aria-label="Job description"
                        maxLength={5000}
                    />
                </article>

                <article className="input-card resume-card">
                    <div className="card-heading">
                        <span className="card-heading__icon" aria-hidden="true">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3h8l4 4v14H6zM14 3v5h4M9 12h6M9 16h4" /></svg>
                        </span>
                        <div>
                            <h2>Resume</h2>
                            <p className="card-heading__note">(Use Resume and self Description together for best results)</p>
                        </div>
                    </div>

                    <label className="resume-upload" htmlFor="resume">
                        <span className="upload-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M20.4 17.4A5 5 0 0 0 18 8h-1.3A7.8 7.8 0 0 0 2.8 14.7" /><path d="M8 15l4-4 4 4M12 11v9" /></svg></span>
                        <strong>Upload Resume</strong>
                        <input ref={resumeInputRef} id="resume" type="file" accept=".pdf,.doc,.docx" hidden />
                    </label>

                    <label className="subheading" htmlFor="selfDescription">
                        <span className="subheading__icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><circle cx="12" cy="9" r="2.5" /><path d="M7.5 18c.8-2.8 2.2-4 4.5-4s3.7 1.2 4.5 4" /></svg></span>
                        Self Description
                    </label>
                    <textarea onChange={(e) => (setSelfDescription(e.target.value))} id="selfDescription" placeholder="In a few sentences..." maxLength={500} />
                    <span className="textarea-counter">0/500</span>

                    <button className="generate-btn" type="button"><span aria-hidden="true">✧</span> Generate Interview Report</button>
                </article>
            </section>
        </main>
    )
}

export default Home
