import Link from 'next/link';
import type { Project } from '@/data/projects';

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <Link className="project-card glass" href={`/projects/${project.slug}`} style={{ ['--accent' as string]: project.accent }}>
      <div className="project-orb" />
      <div className="project-meta">
        <span>{String(index + 1).padStart(2, '0')}</span>
        <span>{project.type}</span>
      </div>
      <h3>{project.title}</h3>
      <p>{project.intro}</p>
      <div className="tag-row">
        {project.stack.slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}
      </div>
    </Link>
  );
}
