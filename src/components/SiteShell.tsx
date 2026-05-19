import { Nav } from './Nav';

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="site-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="grain" />
      <Nav />
      {children}
    </main>
  );
}
