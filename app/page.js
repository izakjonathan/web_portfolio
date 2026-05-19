import Link from "next/link";
import Nav from "../components/Nav";
import ProjectCard from "../components/ProjectCard";
import { projects } from "../data/projects";

export default function HomePage() {
  return (
    <>
      <Nav />
      <main className="main">
        <section className="hero">
          <div className="kicker">Creative Developer & Designer</div>
          <h1>
            Digital
            <br />
            Studio
          </h1>
          <p className="lead">
            Graphic design, interactive web apps, immersive interfaces,
            experimental UI systems and front-end development.
          </p>
          <div className="actions">
            <Link className="button" href="/projects">View projects</Link>
            <a className="button" href="mailto:izakhyllested@icloud.com">Contact</a>
          </div>
        </section>

        <section className="section">
          <h2>Featured Work</h2>
          <div className="grid">
            {projects.slice(0, 3).map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
