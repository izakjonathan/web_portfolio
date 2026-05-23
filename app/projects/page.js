import Nav from "../../components/Nav";
import ProjectRow from "../../components/ProjectRow";
import { projects } from "../../data/projects";

export default function ProjectsPage() {
  return (
    <div className="blend-stage">
      <div className="stage-graphic" aria-hidden="true">
        <img src="/hero-graphic.png" alt="" className="stage-graphic-image" />
      </div>

      <Nav />

      <main className="main site archive-site">
        <section className="projects-page">
          <div className="hero-meta blend-layer">
            <span>01 / ARCHIVE</span>
            <span>Selected work</span>
          </div>

          <h1 className="archive-title blend-layer">Projects</h1>

          <div className="project-list">
            {projects.map((project, index) => (
              <ProjectRow key={project.title} project={project} index={index} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
