import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";

export default function HomePage() {
  return (
    <div>
      <section style={{ paddingTop: "80px", paddingBottom: "80px" }}>
        <p style={{ opacity: 0.6 }}>Creative Developer & Designer</p>

        <h1
          style={{
            fontSize: "clamp(64px,12vw,140px)",
            lineHeight: 0.9,
            margin: "20px 0"
          }}
        >
          IZAK
          <br />
          HYLLESTED
        </h1>

        <p
          style={{
            maxWidth: "700px",
            opacity: 0.75,
            lineHeight: 1.8,
            fontSize: "20px"
          }}
        >
          Interactive web apps, immersive interfaces, visual systems,
          experimental UI and creative development.
        </p>
      </section>

      <section>
        <h2 style={{ fontSize: "48px", marginBottom: "32px" }}>
          Featured Work
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
            gap: "24px"
          }}
        >
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </section>
    </div>
  );
}