import { ExternalLink, Github } from "lucide-react"

function ProjectCard({ project }) {
  return (
    <div>
      <h3 className="text-xl font-semibold text-white mb-2">
        {project.title}
      </h3>

      <p className="text-slate-400 text-sm mb-4">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {project.tech_stack?.map((tech, i) => (
          <span
            key={i}
            className="text-xs px-2 py-1 bg-slate-800 border border-slate-700 rounded-md"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="flex gap-4 text-sm">
        {project.github_url && (
          <a
            href={project.github_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sky-400 hover:text-white"
          >
            <Github size={16} /> Code
          </a>
        )}

        {project.live_url && (
          <a
            href={project.live_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-red-400 hover:text-white"
          >
            <ExternalLink size={16} /> Live
          </a>
        )}
      </div>
    </div>
  )
}

export default ProjectCard