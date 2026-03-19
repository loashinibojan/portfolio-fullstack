function ExperienceItem({ experience }) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-white">
        {experience.role}
      </h3>

      <p className="text-sky-400 text-sm mb-1">
        {experience.company}
      </p>

      <p className="text-slate-500 text-xs mb-3">
        {experience.start_date} - {experience.end_date || "Present"}
      </p>

      <p className="text-slate-400 text-sm">
        {experience.description}
      </p>
    </div>
  )
}

export default ExperienceItem