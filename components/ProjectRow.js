export default function ProjectRow({ project, index }) {
  const title = typeof project === "string" ? project : project.title;
  const category = typeof project === "string" ? "Selected Work" : project.category;
  const description = typeof project === "string" ? "" : project.description;

  return (
    <article className="project-row">
      <span className="project-number">{String(index + 1).padStart(2, "0")}</span>
      <div className="project-main">
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
      </div>
      <div className="project-side">
        <span>{category}</span>
        <span>View</span>
      </div>
    </article>
  );
}
