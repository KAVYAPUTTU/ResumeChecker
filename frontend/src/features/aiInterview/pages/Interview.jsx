import { useState } from "react"
import { useLocation } from "react-router"
import "../style/interview.scss"

const fallbackReport = {
  matchScore: 82,
  technicalQuestions: [
    {
      question: "Can you explain the difference between SQL and NoSQL databases, and why you chose MongoDB for your video streaming backend?",
      intension: "To assess your understanding of database paradigms and your ability to choose the right tool for specific application requirements.",
      answer: "Discuss schema design differences. Explain that MongoDB's flexible document model is great for storing nested metadata and media attributes, whereas relational databases are better for complex transactional relationships."
    },
    {
      question: "How do you handle authentication and authorization in a Node.js and Express application?",
      intension: "To verify practical knowledge of securing REST APIs using modern standards like JWT.",
      answer: "Explain JWT-based authentication, password hashing with bcrypt, protected-route middleware, and role-based access control."
    },
    { question: "What is the purpose of Docker, and how would you containerize a Node.js and MongoDB application?", intension: "To evaluate containerization skills and understanding of deployment consistency.", answer: "Explain Docker containers, a production Dockerfile, multi-stage builds, and Docker Compose." },
    { question: "How do you manage state and side effects in React applications?", intension: "To test core frontend development capabilities and React best practices.", answer: "Discuss useState, useEffect, Context API, and clean separation of concerns." },
    { question: "How do you ensure error handling and middleware reusability in Express.js?", intension: "To check backend architecture and maintainable server-side application practices.", answer: "Explain centralized error-handling middleware and standardized JSON error responses." },
    { question: "Can you explain how you would write unit and integration tests for a REST API in Node.js?", intension: "To evaluate testing methodologies using Jest and Supertest.", answer: "Mention Jest, Supertest, mocked database calls, and in-memory integration tests." },
    { question: "What are aggregation pipelines in MongoDB, and how did you use them in your projects?", intension: "To test advanced database querying and data processing skills.", answer: "Describe stages such as $match, $group, $lookup, and $project with a project example." }
  ],
  behavioralQuestions: [
     {
    question: "Tell me about a challenging project you worked on and how you handled it.",
    intension: "To understand how you approach difficult work, make decisions, and take ownership when a project becomes complicated.",
    answer: "Use the STAR method. Explain the project context, the specific challenge, the actions you took to solve it, and the measurable result. Mention what you learned."
  },
  {
    question: "Tell me about a time you had to learn a new technology quickly.",
    intension: "To assess your learning process, adaptability, and ability to become productive with unfamiliar tools.",
    answer: "Describe the situation, how you broke the topic into smaller parts, the resources or experiments you used, and how you applied the new knowledge to deliver a result."
  },
  {
    question: "Describe a time you disagreed with a teammate about a technical decision.",
    intension: "To evaluate communication, collaboration, and whether you can resolve technical disagreements constructively.",
    answer: "Explain how you listened to the other perspective, compared trade-offs using evidence, and reached a decision that supported the project rather than personal preference."
  },
  {
    question: "Tell me about a mistake you made and what you did after discovering it.",
    intension: "To check accountability, debugging habits, and whether you turn mistakes into improvements.",
    answer: "Be specific about the impact, explain how you investigated and fixed the issue, and finish with the test, review step, or process change you added to prevent it happening again."
  },
  {
    question: "How do you prioritize tasks when you have multiple deadlines?",
    intension: "To understand how you organize work, communicate risk, and protect the most important outcomes under pressure.",
    answer: "Explain how you compare urgency and impact, break work into smaller deliverables, communicate trade-offs early, and track progress so surprises do not appear at the deadline."
  }
  ],
  skillGaps: [
    { skill: "AWS Cloud Services", severity: "medium" },
    { skill: "PostgreSQL", severity: "low" },
    { skill: "Unit & Integration Testing (Jest/Supertest)", severity: "medium" },
    { skill: "CI/CD Pipelines", severity: "low" }
  ],
  preparationPlan: [
    { day: 1, focus: "Advanced Node.js & Express Architecture", tasks: ["Review advanced Express middleware patterns and centralized error handling."] },
    { day: 2, focus: "Database Management & Aggregation", tasks: ["Practice complex MongoDB aggregation pipeline queries."] },
    { day: 3, focus: "Testing and Quality Assurance", tasks: ["Learn the basics of Jest and Supertest for Node.js applications.", "Write unit and integration tests for an authentication endpoint."] },
    { day: 4, focus: "Containerization with Docker", tasks: ["Write a production-ready Dockerfile and use Docker Compose with MongoDB."] },
    { day: 5, focus: "Cloud & Deployment Basics (AWS)", tasks: ["Review EC2, S3, RDS, PM2, and GitHub Actions workflows."] },
    { day: 6, focus: "System Design & Behavioral Prep", tasks: ["Practice scalable architecture and prepare STAR-method project stories."] },
    { day: 7, focus: "Mock Interview & Final Review", tasks: ["Conduct a mock full-stack interview and review DSA patterns and project decisions."] }
  ]
}

const fallbackBehavioralQuestions = [
  {
    question: "Tell me about a challenging project you worked on and how you handled it.",
    intension: "To understand how you approach difficult work, make decisions, and take ownership when a project becomes complicated.",
    answer: "Use the STAR method. Explain the project context, the specific challenge, the actions you took to solve it, and the measurable result. Mention what you learned."
  },
  {
    question: "Tell me about a time you had to learn a new technology quickly.",
    intension: "To assess your learning process, adaptability, and ability to become productive with unfamiliar tools.",
    answer: "Describe the situation, how you broke the topic into smaller parts, the resources or experiments you used, and how you applied the new knowledge to deliver a result."
  },
  {
    question: "Describe a time you disagreed with a teammate about a technical decision.",
    intension: "To evaluate communication, collaboration, and whether you can resolve technical disagreements constructively.",
    answer: "Explain how you listened to the other perspective, compared trade-offs using evidence, and reached a decision that supported the project rather than personal preference."
  },
  {
    question: "Tell me about a mistake you made and what you did after discovering it.",
    intension: "To check accountability, debugging habits, and whether you turn mistakes into improvements.",
    answer: "Be specific about the impact, explain how you investigated and fixed the issue, and finish with the test, review step, or process change you added to prevent it happening again."
  },
  {
    question: "How do you prioritize tasks when you have multiple deadlines?",
    intension: "To understand how you organize work, communicate risk, and protect the most important outcomes under pressure.",
    answer: "Explain how you compare urgency and impact, break work into smaller deliverables, communicate trade-offs early, and track progress so surprises do not appear at the deadline."
  }
]

function Interview({ report }) {
  const location = useLocation()
  const [activeSection, setActiveSection] = useState("technical")
  const [openQuestion, setOpenQuestion] = useState(0)
  const routeData = location.state?.interviewReport || location.state?.report || location.state
  const data = report || routeData || fallbackReport
  const questions = data.technicalQuestions || []
  const behavioralQuestions = data.behavioralQuestionSchema?.length ? data.behavioralQuestionSchema : fallbackBehavioralQuestions
  const skills = data.skillGaps || []

  const sections = [
    { id: "technical", label: "Technical questions" },
    { id: "behavioral", label: "Behavioral questions" },
    { id: "roadmap", label: "Road Map" }
  ]

  return (
    <main className="interview-page">
      <section className="interview-shell">
        <aside className="interview-sidebar" aria-label="Report sections">
          <p className="sidebar-label">Sections</p>
          <nav>
            {sections.map((section) => (
              <button className={activeSection === section.id ? "is-active" : ""} key={section.id} onClick={() => setActiveSection(section.id)} type="button">
                <span className="nav-icon">{section.id === "technical" ? "‹›" : section.id === "behavioral" ? "▱" : "⌁"}</span>{section.label}
              </button>
            ))}
          </nav>
          <div className="sidebar-footer"><span className="status-dot" /> Report ready</div>
        </aside>

        <section className="interview-main">
          <div className="content-heading"><h1>{activeSection === "technical" ? "Technical Questions" : activeSection === "behavioral" ? "Behavioral Questions" : "Preparation Road Map"}</h1><span>{activeSection === "technical" ? `${questions.length} questions` : activeSection === "behavioral" ? `${behavioralQuestions.length} questions` : "7-day plan"}</span></div>
          {activeSection === "technical" && <QuestionList questions={questions} openQuestion={openQuestion} setOpenQuestion={setOpenQuestion} />}
          {activeSection === "behavioral" && <QuestionList questions={behavioralQuestions} openQuestion={openQuestion} setOpenQuestion={setOpenQuestion} />}
          {activeSection === "roadmap" && <div className="roadmap-list">{(data.preparationPlan || []).map((item) => <article className="roadmap-item" key={item.day}><span className="roadmap-node" /><div className="roadmap-copy"><div className="roadmap-title"><span className="day-number">Day {item.day}</span><h2>{item.focus}</h2></div><ul>{item.tasks.map((task) => <li key={task}>{task}</li>)}</ul></div></article>)}</div>}
        </section>

        <aside className="skills-panel">
          <div className="score-panel"><span className="panel-kicker">Match score</span><div className="score-ring"><strong>{data.matchScore || 0}</strong><span>%</span></div><p>Strong match for this role</p></div>
          <div className="panel-heading"><h2>Skill Gaps</h2></div>
          <div className="skill-list">{skills.map((item) => <div className="skill-row" key={item.skill}><span>{item.skill}</span><em className={`severity severity--${item.severity}`}>{item.severity}</em></div>)}</div>
        </aside>
      </section>
    </main>
  )
}

function QuestionList({ questions, openQuestion, setOpenQuestion }) {
  return (
    <div className="question-list">
      {questions.map((question, index) => (
        <article className={`question-card ${openQuestion === index ? "is-open" : ""}`} key={question.question}>
          <button className="question-toggle" onClick={() => setOpenQuestion(openQuestion === index ? -1 : index)} type="button">
            <span className="question-number">Q{String(index + 1).padStart(2, "0")}</span>
            <span>{question.question}</span>
            <b>{openQuestion === index ? "⌃" : "⌄"}</b>
          </button>
          {openQuestion === index && <div className="question-details"><div><span className="detail-label intention-label">Intention</span><p>{question.intension}</p></div><div><span className="detail-label answer-label">Model answer</span><p>{question.answer}</p></div></div>}
        </article>
      ))}
    </div>
  )
}

export default Interview