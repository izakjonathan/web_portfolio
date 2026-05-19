import Link from "next/link";

export default function ProjectCard({ project }: any) {
  return (
    <Link href={`/projects/${project.slug}`} style={{ textDecoration: "none" }}>
      <div style={{
        border: "1px solid rgba(255,255,255,0.12)",
        padding: "32px",
        borderRadius: "28px",
        background: "rgba(255,255,255,0.04)",
        backdropFilter: "blur(20px)",
        minHeight: "220px",
        transition: "0.3s"
      }}>
        <p style={{ opacity: 0.6 }}>{project.category}</p>
        <h2 style={{ fontSize: "32px", marginTop: "12px" }}>
          {project.title}
        </h2>
        <p style={{ opacity: 0.7, lineHeight: 1.6 }}>
          {project.description}
        </p>
      </div>
    </Link>
  );
}