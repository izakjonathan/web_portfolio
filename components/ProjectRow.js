export default function ProjectRow({ project, index }) {
  return (
    <article className="project-row">
      <div className="project-index">{String(index + 1).padStart(2, "0")}</div>
      <div>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
      </div>
      <div className="project-meta">
        <span>{project.category}</span>
        <span>{project.year}</span>
      </div>
    </article>
  );
}
