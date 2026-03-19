import { useState, useEffect } from "react"
import axios from "axios"
import { motion } from "framer-motion"
import ProjectCard from "./components/ProjectCard"
import SkillBadge from "./components/SkillBadge"
import ExperienceItem from "./components/ExperienceItem"
import { Github, Linkedin } from "lucide-react"

const API_BASE_URL = "http://localhost:8000/api"

function App() {
  const [projects, setProjects] = useState([])
  const [skills, setSkills] = useState([])
  const [experiences, setExperiences] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projRes, skillRes, expRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/projects`),
          axios.get(`${API_BASE_URL}/skills`),
          axios.get(`${API_BASE_URL}/experiences`)
        ])

        setProjects(projRes.data)
        setSkills(skillRes.data)
        setExperiences(expRes.data)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">

      {/* 🔝 NAVBAR */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-slate-900/70 border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">

          <h1 className="text-lg font-semibold text-white">
            Dev<span className="text-red-500">.</span>
            <span className="text-sky-400 ml-1">Stack</span>
          </h1>

          <div className="hidden md:flex gap-8 text-sm text-slate-300">
            <a href="#about" className="hover:text-white">About</a>
            <a href="#projects" className="hover:text-white">Projects</a>
            <a href="#skills" className="hover:text-white">Skills</a>
            <a href="#experience" className="hover:text-white">Experience</a>
          </div>

          <a href="#" className="text-sky-400 hover:text-white text-sm">
            Contact
          </a>
        </div>
      </nav>

      {/* 🚀 HERO */}
      <section id="about" className="pt-44 pb-28">
        <div className="max-w-6xl mx-auto px-6">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 bg-gradient-to-r from-red-500 via-white to-sky-400 bg-clip-text text-transparent">
              Building scalable & modern web experiences.
            </h1>

            <p className="text-slate-400 text-lg mb-10 leading-relaxed">
              Full-stack Laravel & React developer focused on performance,
              clean architecture, and elegant UI design.
            </p>

            <div className="flex items-center gap-6">
              <a
                href="#projects"
                className="px-6 py-3 rounded-lg text-sm font-medium bg-red-500 hover:bg-red-400 transition shadow-lg shadow-red-500/20"
              >
                View Work
              </a>

              <div className="flex gap-4 text-slate-400">

              <a
              href="https://github.com/loashinibojan/"
                
                target="_blank"
                rel="noopener noreferrer"
              > 
                <Github
                  size={20}
                  className="hover:text-white cursor-pointer transition"
                />
              </a>
              <a
                href="https://www.linkedin.com/in/loashini-bojan-651003356/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin
                  size={20}
                  className="hover:text-white cursor-pointer transition transform hover:scale-110"
                />
              </a>

            </div>
            </div>
          </motion.div>

        </div>
      </section>
      
      <section id="projects" className="py-28 border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-3xl font-semibold mb-12 text-white">
            Selected Work
          </h2>

          <div className="grid md:grid-cols-2 gap-10">
            {loading ? (
              [...Array(4)].map((_, i) => (
                <div key={i} className="h-56 bg-slate-800 rounded-lg animate-pulse" />
              ))
            ) : projects.length > 0 ? (
              projects.map((project) => (
                <motion.div key={project.id} whileHover={{ y: -5 }}>
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-red-500 hover:shadow-lg hover:shadow-red-500/10 transition">
                    <ProjectCard project={project} />
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-slate-500">No projects available.</p>
            )}
          </div>

        </div>
      </section>

      <section id="skills" className="py-28 border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-3xl font-semibold mb-12 text-white">
            Skills
          </h2>

          <div className="flex flex-wrap gap-4">
            {loading ? (
              [...Array(6)].map((_, i) => (
                <div key={i} className="h-10 w-24 bg-slate-800 rounded animate-pulse" />
              ))
            ) : (
              skills.map((skill) => (
                <div
                  key={skill.id}
                  className="px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 hover:border-sky-400 text-sm transition"
                >
                  <SkillBadge skill={skill} />
                </div>
              ))
            )}
          </div>

        </div>
      </section>

      <section id="experience" className="py-28 border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-3xl font-semibold mb-12 text-white">
            Experience
          </h2>

          <div className="space-y-6">
            {loading ? (
              [...Array(2)].map((_, i) => (
                <div key={i} className="h-28 bg-slate-800 rounded animate-pulse" />
              ))
            ) : (
              experiences.map((exp) => (
                <div
                  key={exp.id}
                  className="bg-slate-900 border border-slate-800 p-6 rounded-xl hover:border-sky-400 transition"
                >
                  <ExperienceItem experience={exp} />
                </div>
              ))
            )}
          </div>

        </div>
      </section>

      <footer className="py-24 border-t border-slate-800 text-center">
        <h2 className="text-3xl font-semibold text-white mb-4">
          Let’s work together
        </h2>

        <p className="text-slate-400 mb-6">
          Available for freelance and full-time opportunities.
        </p>

        <a href="mailto:hello@example.com" className="text-sky-400 text-lg hover:text-white">
          loashinibojan.dev@gmail.com
        </a>

        <p className="mt-10 text-sm text-slate-500">
          © 2026 • Portfolio
        </p>
      </footer>

    </div>
  )
}

export default App