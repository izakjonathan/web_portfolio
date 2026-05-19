import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SiteShell } from '@/components/SiteShell';
import { projects } from '@/data/projects';

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();

  return (
    <SiteShell>
      <article className="section-pad case-study" style={{ ['--accent' as string]: project.accent }}>
        <Link className="back-link" href="/projects">← Projects</Link>
        <div className="case-hero glass">
          <div>
            <p className="eyebrow">{project.type} · {project.year}</p>
            <h1>{project.title}</h1>
            <p>{project.description}</p>
          </div>
          <div className="case-visual"><div /></div>
        </div>
        <div className="case-grid">
          <section className="glass">
            <h2>Role</h2>
            <p>{project.role}</p>
          </section>
          <section className="glass">
            <h2>Stack / Tools</h2>
            <div className="tag-row">{project.stack.map((tag) => <span key={tag}>{tag}</span>)}</div>
          </section>
          <section className="glass wide">
            <h2>Highlights</h2>
            <ul>{project.highlights.map((item) => <li key={item}>{item}</li>)}</ul>
          </section>
        </div>
      </article>
    </SiteShell>
  );
}
