export default function ProjectRow({ project, index }) {
  return (
    <article className="project-row">
      <span className="project-number contrast-text">{String(index + 1).padStart(2, "0")}</span>

      <div className="project-main contrast-text">
        <h2>{project.title}</h2>
        <p>{project.description}</p>
      </div>

      <div className="project-side contrast-text">
        <span>{project.category}</span>
        <span>{project.year}</span>
      </div>
    </article>
  );
}
