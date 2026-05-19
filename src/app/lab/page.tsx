import { SiteShell } from '@/components/SiteShell';
import { labItems } from '@/data/projects';

export default function LabPage() {
  return (
    <SiteShell>
      <section className="section-pad page-hero">
        <p className="eyebrow">Lab</p>
        <h1>A place for experiments, visual tests, and interactive prototypes.</h1>
        <p>Use this section for shader tests, liquid glass experiments, typography sketches, generative graphics, and unfinished but interesting interface ideas.</p>
      </section>
      <section className="section-pad experiment-grid">
        {labItems.map((item, index) => (
          <div className="glass experiment" key={item}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <h2>{item}</h2>
            <p>Prototype slot for a live demo, video, or short write-up.</p>
          </div>
        ))}
      </section>
    </SiteShell>
  );
}
