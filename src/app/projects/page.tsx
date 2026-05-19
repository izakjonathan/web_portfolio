import { ProjectCard } from '@/components/ProjectCard';
import { SiteShell } from '@/components/SiteShell';
import { projects } from '@/data/projects';

export default function ProjectsPage() {
  return (
    <SiteShell>
      <section className="section-pad page-hero">
        <p className="eyebrow">Portfolio</p>
        <h1>Selected graphic design, web app, and interface projects.</h1>
        <p>Case-study structure for both visual work and development work. Replace the sample content with real projects as the portfolio grows.</p>
      </section>
      <section className="section-pad project-grid">
        {projects.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}
      </section>
    </SiteShell>
  );
}
