import SiteShell from "@/components/SiteShell";
import { projects } from "@/data/projects";

export default async function ProjectPage({ params }: any) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    return <SiteShell><h1>Project not found</h1></SiteShell>;
  }

  return (
    <SiteShell>
      <p style={{ opacity: 0.6 }}>{project.category}</p>
      <h1 style={{ fontSize: "72px" }}>{project.title}</h1>
      <p style={{
        maxWidth: "700px",
        fontSize: "20px",
        lineHeight: 1.7,
        opacity: 0.75
      }}>
        {project.description}
      </p>
    </SiteShell>
  );
}