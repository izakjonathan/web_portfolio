import Link from 'next/link';
import { ProjectCard } from '@/components/ProjectCard';
import { SiteShell } from '@/components/SiteShell';
import { projects, labItems } from '@/data/projects';

export default function Home() {
  return (
    <SiteShell>
      <section className="hero section-pad">
        <div className="eyebrow">Graphic Design · Web Development · Creative Systems</div>
        <h1>Digital design that feels like software, and software that feels designed.</h1>
        <p className="hero-copy">
          I build immersive web apps, visual identities, interface systems, and experimental digital experiences with a strong focus on atmosphere, interaction, and practical production.
        </p>
        <div className="hero-actions">
          <Link className="button primary" href="/projects">View portfolio</Link>
          <Link className="button" href="/contact">Work with me</Link>
        </div>
      </section>

      <section className="section-pad split-section">
        <div>
          <p className="eyebrow">Studio model</p>
          <h2>Creative developer, visual designer, and systems builder.</h2>
        </div>
        <p>
          The work sits between graphic design, frontend engineering, mobile app interfaces, dashboards, branding, typography, and visual experimentation. The goal is not just to make things look good, but to make them feel clear, tactile, and alive.
        </p>
      </section>

      <section className="section-pad">
        <div className="section-head">
          <div>
            <p className="eyebrow">Selected work</p>
            <h2>Portfolio</h2>
          </div>
          <Link href="/projects">All projects →</Link>
        </div>
        <div className="project-grid">
          {projects.slice(0, 4).map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}
        </div>
      </section>

      <section className="section-pad lab-panel glass">
        <p className="eyebrow">Experimental lab</p>
        <h2>Interface material, motion, type, and web-app experiments.</h2>
        <div className="lab-grid">
          {labItems.map((item) => <span key={item}>{item}</span>)}
        </div>
      </section>
    </SiteShell>
  );
}
