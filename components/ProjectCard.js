export default function ProjectCard({ project }) {
  return (
    <article className="card">
      <div className="kicker">{project.category}</div>
      <h3>{project.title}</h3>
      <p>{project.description}</p>
    </article>
  );
}
