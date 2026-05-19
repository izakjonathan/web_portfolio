import Link from "next/link";
import Nav from "../components/Nav";
import ProjectRow from "../components/ProjectRow";
import { projects } from "../data/projects";

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <section className="hero">
          <div className="hero-top">
            <div>
              <p>006/2027</p>
              <p>Copenhagen, DK</p>
              <p>Graphic Design / Web Development</p>
            </div>
            <div className="roles">
              <p>Designer</p>
              <p>Developer</p>
              <p>Creative Systems</p>
            </div>
          </div>

          <h1>
            Izak
            <br />
            Hyllested
          </h1>

          <div className="hero-bottom">
            <p>
              Portfolio for graphic design, web development, interactive
              interfaces, identity systems and experimental digital work.
            </p>
            <Link href="/projects">Selected Work →</Link>
          </div>
        </section>

        <section className="section">
          <div className="section-heading">
            <h2>Selected Work</h2>
            <p>Portfolio / Archive / Experiments</p>
          </div>

          <div className="project-list">
            {projects.slice(0, 4).map((project, index) => (
              <ProjectRow key={project.title} project={project} index={index} />
            ))}
          </div>
        </section>

        <section className="info-grid">
          <div>
            <h2>Practice</h2>
          </div>
          <div>
            <p>
              I work across visual identity, interface design, product systems,
              typography, mobile-first web apps and experimental interaction.
            </p>
          </div>
          <div>
            <p>
              The work combines graphic design thinking with deployable web
              development: fast prototypes, polished interfaces and complete
              digital products.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
