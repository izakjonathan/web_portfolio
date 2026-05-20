import Nav from "../../components/Nav";
import ProjectRow from "../../components/ProjectRow";
import { projects } from "../../data/projects";

export default function ProjectsPage() {
  return (
    <>
      <Nav />

      <main className="main">
        <section className="projects-page">
          <div className="hero-meta reveal reveal-1">
            <span>01 / ARCHIVE</span>
            <span>Selected work</span>
          </div>

          <h1 className="archive-title reveal reveal-2">Projects</h1>

          <div className="project-list reveal reveal-4">
            {projects.map((project, index) => (
              <ProjectRow key={project.title} project={project} index={index} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
