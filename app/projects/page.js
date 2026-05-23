import Nav from "../../components/Nav";
import ProjectRow from "../../components/ProjectRow";
import { projects } from "../../data/projects";

export default function ProjectsPage() {
  return (
    <div className="app-layers">
      <div className="l3-graphic-layer" aria-hidden="true">
        <img src="/hero-graphic.png" alt="" className="l3-graphic-image" />
      </div>

      <main className="main l2-text-layer archive-site content-blend">
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

      <div className="l1-menu-layer">
        <Nav />
      </div>
    </div>
  );
}
