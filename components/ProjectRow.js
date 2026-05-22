export default function ProjectRow({ project, index }) {
  return (
    <article className="project-row">

      <span className="project-number blend-text">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="project-main">
        <h2 className="blend-text">
          {project.title}
        </h2>

        <p className="blend-text">
          {project.description}
        </p>
      </div>

      <div className="project-side">
        <span className="blend-text">
          {project.category}
        </span>

        <span className="blend-text">
          {project.year}
        </span>
      </div>

    </article>
  );
}