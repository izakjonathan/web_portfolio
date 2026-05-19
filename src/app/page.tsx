import SiteShell from "@/components/SiteShell";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";

export default function HomePage() {
  return (
    <SiteShell>
      <section style={{ paddingTop: "80px", paddingBottom: "80px" }}>
        <p style={{ opacity: 0.6 }}>Creative Developer & Designer</p>
        <h1 style={{
          fontSize: "clamp(56px,10vw,120px)",
          lineHeight: 0.9,
          margin: "24px 0"
        }}>
          IZAK<br />HYLLESTED
        </h1>

        <p style={{
          maxWidth: "700px",
          opacity: 0.7,
          lineHeight: 1.7,
          fontSize: "20px"
        }}>
          Interactive web apps, visual systems, immersive interfaces,
          experimental UI and digital identity systems.
        </p>
      </section>

      <section>
        <h2 style={{ fontSize: "48px", marginBottom: "32px" }}>
          Featured Projects
        </h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
          gap: "24px"
        }}>
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </SiteShell>
  );
}