export default function ProjectRow({ project }) {
  return (
    <div className="project-row">
      <h2>{project.title}</h2>
      <p>{project.description}</p>
    </div>
  );
}
