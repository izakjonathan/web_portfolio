import Nav from "../../components/Nav";
import ProjectRow from "../../components/ProjectRow";
import { projects } from "../../data/projects";

export default function ProjectsPage() {
  return (
    <>
      <div className="blend-stage">
        <div className="red-mark archive-red-mark" aria-hidden="true">
          <img src="/hero-graphic.png" alt="" className="red-mark-image" />
        </div>

        <Nav />

        <main className="main site">
        <section className="projects-page">
          <div className="hero-meta">
            <span className="blend-text">01 / ARCHIVE</span>
            <span className="blend-text">Selected work</span>
          </div>

          <h1 className="archive-title blend-text">Projects</h1>

          <div className="project-list">
            {projects.map((project, index) => (
              <ProjectRow key={project.title} project={project} index={index} />
            ))}
          </div>
        </section>
        </main>
      </div>
    </>
  );
}
