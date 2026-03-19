import { useState, useEffect } from "react"
import axios from "axios"

const API = "http://localhost:8000/api"

function Admin() {
  // PROJECT STATE
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [projects, setProjects] = useState([])

  // SKILL STATE
  const [skillName, setSkillName] = useState("")
  const [category, setCategory] = useState("frontend")
  const [skills, setSkills] = useState([])

  // EXPERIENCE STATE
  const [role, setRole] = useState("")
  const [company, setCompany] = useState("")
  const [experiences, setExperiences] = useState([])
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")

  // FETCH ALL DATA
  const fetchData = async () => {
    try {
      const [proj, skill, exp] = await Promise.all([
        axios.get(`${API}/projects`),
        axios.get(`${API}/skills`),
        axios.get(`${API}/experiences`)
      ])

      setProjects(proj.data)
      setSkills(skill.data)
      setExperiences(exp.data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // ================= PROJECT =================
  const addProject = async () => {
    if (!title || !description) return alert("Fill all fields")

    await axios.post(`${API}/projects`, { title, description })

    setTitle("")
    setDescription("")
    fetchData()
  }

  const deleteProject = async (id) => {
    await axios.delete(`${API}/projects/${id}`)
    fetchData()
  }

  // ================= SKILL =================
  const addSkill = async () => {
    if (!skillName) return

    await axios.post(`${API}/skills`, {
      name: skillName,
      category
    })

    setSkillName("")
    fetchData()
  }

  const deleteSkill = async (id) => {
    await axios.delete(`${API}/skills/${id}`)
    fetchData()
  }

  // GROUP SKILLS
  const groupedSkills = {
    frontend: skills.filter(s => s.category === "frontend"),
    backend: skills.filter(s => s.category === "backend"),
    database: skills.filter(s => s.category === "database"),
    tools: skills.filter(s => s.category === "tools"),
  }

  // ================= EXPERIENCE =================
  const addExperience = async () => {
    if (!role || !company || !startDate) return alert("Fill required fields")

    await axios.post(`${API}/experiences`, {
      role,
      company,
      start_date: startDate,
      end_date: endDate || null,
      description: "Worked on projects"
    })

    setRole("")
    setCompany("")
    setStartDate("")
    setEndDate("")
    fetchData()
  }

  const deleteExperience = async (id) => {
    await axios.delete(`${API}/experiences/${id}`)
    fetchData()
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10 space-y-12">

      <h1 className="text-3xl font-semibold">Admin Panel</h1>

      {/* ================= PROJECTS ================= */}
      <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 max-w-xl">
        <h2 className="text-lg mb-4">Add Project</h2>

        <input
          className="w-full p-3 mb-3 rounded bg-slate-800 border border-slate-700"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />

        <textarea
          className="w-full p-3 mb-3 rounded bg-slate-800 border border-slate-700"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />

        <button onClick={addProject} className="bg-red-500 px-4 py-2 rounded">
          Add
        </button>

        <div className="mt-4 space-y-2">
          {projects.map((p) => (
            <div key={p.id} className="flex justify-between bg-slate-800 p-2 rounded">
              <span>{p.title}</span>
              <button onClick={() => deleteProject(p.id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>

      {/* ================= SKILLS ================= */}
      <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 max-w-xl">
        <h2 className="text-lg mb-4">Add Skill</h2>

        <input
          className="w-full p-3 mb-3 rounded bg-slate-800 border border-slate-700"
          value={skillName}
          onChange={(e) => setSkillName(e.target.value)}
          placeholder="Skill name"
        />

        <select
          className="w-full p-3 mb-3 rounded bg-slate-800 border border-slate-700"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="frontend">Frontend</option>
          <option value="backend">Backend</option>
          <option value="database">Database</option>
          <option value="tools">Tools</option>
        </select>

        <button onClick={addSkill} className="bg-sky-500 px-4 py-2 rounded">
          Add
        </button>

        <div className="mt-4 space-y-4">
          {Object.entries(groupedSkills).map(([group, items]) => (
            <div key={group}>
              <h3 className="text-sm text-slate-400 capitalize mb-2">
                {group}
              </h3>

              <div className="flex flex-wrap gap-2">
                {items.map((s) => (
                  <div
                    key={s.id}
                    className="bg-slate-800 px-3 py-1 rounded flex items-center gap-2 border border-slate-700 hover:border-red-500 transition"
                  >
                    <span>{s.name}</span>
                    <button onClick={() => deleteSkill(s.id)}>✕</button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= EXPERIENCE ================= */}
      <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 max-w-xl">
        <h2 className="text-lg mb-4">Add Experience</h2>

        <input
          className="w-full p-3 mb-3 rounded bg-slate-800 border border-slate-700"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          placeholder="Role"
        />

        <input
          className="w-full p-3 mb-3 rounded bg-slate-800 border border-slate-700"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Company"
        />

        <input
          className="w-full p-3 mb-3 rounded bg-slate-800 border border-slate-700"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          placeholder="Start Date (e.g. 2023 or Jan 2023)"
        />

        <input
          className="w-full p-3 mb-3 rounded bg-slate-800 border border-slate-700"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          placeholder="End Date (leave empty for Present)"
        />

        <button onClick={addExperience} className="bg-green-500 px-4 py-2 rounded">
          Add
        </button>

        <div className="mt-4 space-y-2">
          {experiences.map((e) => (
            <div key={e.id} className="bg-slate-800 p-2 rounded flex justify-between">
              <div>
                <div className="font-medium">{e.role}</div>
                <div className="text-slate-400 text-sm">{e.company}</div>
                <div className="text-slate-500 text-xs">
                  {e.start_date} - {e.end_date || "Present"}
                </div>
            </div>
              <button onClick={() => deleteExperience(e.id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default Admin