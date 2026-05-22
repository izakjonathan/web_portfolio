export default function ProjectRow({ project, index }) {
  return (
    <article className="project-row">
      <span className="project-number contrast-text">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="project-main">
        <h2 className="contrast-text">{project.title}</h2>
        <p className="contrast-text">{project.description}</p>
      </div>

      <div className="project-side">
        <span className="contrast-text">{project.category}</span>
        <span className="contrast-text">{project.year}</span>
      </div>
    </article>
  );
}
