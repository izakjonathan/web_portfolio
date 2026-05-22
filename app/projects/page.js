import Nav from "../../components/Nav";
import ProjectRow from "../../components/ProjectRow";
import { projects } from "../../data/projects";

export default function ProjectsPage() {
  return (
    <>
      <Nav />

      <div className="red-mark archive-red-mark" aria-hidden="true">
        <img src="/hero-graphic.png" alt="" className="red-mark-image" />
      </div>

      <main className="main site is-ready">
        <section className="projects-page">
          <div className="hero-meta">
            <span>01 / ARCHIVE</span>
            <span>Selected work</span>
          </div>

          <h1 className="archive-title">Projects</h1>

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
