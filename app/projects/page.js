import Nav from "../../components/Nav";
import { projects } from "../../data/projects";

export default function ProjectsPage(){
  return(
    <>
      <Nav />
      <main className="main">
        <section className="projects-page">
          <h1>Projects</h1>

          {projects.map((project, i) => (
            <div className="project-row" key={i}>
              <span>{String(i+1).padStart(2,"0")}</span>
              <h2>{project}</h2>
            </div>
          ))}
        </section>
      </main>
    </>
  )
}