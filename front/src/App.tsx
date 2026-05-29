import { Route, Routes } from "react-router-dom"
import Auth from "./Auth"
import Register from "./Register"
import Orders from "./Orders"
import ResumeBuilder from "./ResumeBuilder"
import ResumePreview from "./Resume"
import Resume from "./Resume2"

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Auth/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/orders/:id" element={<Orders/>} />
        <Route path="/resumebuilder" element={<ResumeBuilder/>} />
        <Route path="/resume/:resumeId" element={<ResumePreview />} />
        <Route path="/resume2/:resumeId" element={<Resume />} />
        <Route path="*" element={<div>404 - Page not found</div>} />
      </Routes>
    </div>
  )
}

export default App
