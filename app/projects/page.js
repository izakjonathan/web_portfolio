import Nav from "../../components/Nav";
import ProjectRow from "../../components/ProjectRow";
import { projects } from "../../data/projects";

export default function ProjectsPage() {
  return (
    <>
      <Nav />
      <main>
        <section className="subpage-hero">
          <div>
            <p>Portfolio</p>
            <p>Graphic Design / Web Development</p>
          </div>
          <h1>Projects</h1>
        </section>

        <section className="section">
          <div className="project-list">
            {projects.map((project, index) => (
              <ProjectRow key={project.title} project={project} index={index} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
