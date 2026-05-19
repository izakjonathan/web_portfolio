import SiteShell from "@/components/SiteShell";

export default function AboutPage() {
  return (
    <SiteShell>
      <h1 style={{ fontSize: "72px" }}>About</h1>
      <p style={{
        maxWidth: "800px",
        lineHeight: 1.8,
        opacity: 0.75,
        fontSize: "20px"
      }}>
        Multidisciplinary creative developer and designer focused on immersive
        interfaces, interactive systems, experimental visuals, typography,
        motion and frontend experiences.
      </p>
    </SiteShell>
  );
}