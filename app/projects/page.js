import Nav from "../../components/Nav";
import ProjectCard from "../../components/ProjectCard";
import { projects } from "../../data/projects";

export default function ProjectsPage() {
  return (
    <>
      <Nav />
      <main className="main">
        <section className="section">
          <div className="kicker">Portfolio</div>
          <h1>Projects</h1>
          <p className="lead">
            A selection of web app, interface, graphic design and visual system work.
          </p>
        </section>

        <section className="section">
          <div className="grid">
            {projects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
