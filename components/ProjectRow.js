export default function ProjectRow({ project, index }) {
  return (
    <article className="project-row">
      <span className="project-number">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="project-main">
        <h2>{project.title}</h2>
        <p>{project.description}</p>
      </div>

      <div className="project-side">
        <span>{project.category}</span>
        <span>{project.year}</span>
      </div>
    </article>
  );
}
