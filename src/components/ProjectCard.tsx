export default function ProjectCard({ project }: any) {
  return (
    <div
      style={{
        padding: "28px",
        borderRadius: "28px",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(24px)"
      }}
    >
      <p style={{ opacity: 0.5 }}>{project.category}</p>

      <h2
        style={{
          fontSize: "32px",
          marginTop: "12px",
          marginBottom: "12px"
        }}
      >
        {project.title}
      </h2>

      <p style={{ opacity: 0.75, lineHeight: 1.7 }}>
        {project.description}
      </p>
    </div>
  );
}