import { SiteShell } from '@/components/SiteShell';

export default function AboutPage() {
  return (
    <SiteShell>
      <section className="section-pad page-hero about-copy">
        <p className="eyebrow">About</p>
        <h1>Design, development, and systems thinking.</h1>
        <p>
          I create digital work across graphic design, web development, interface systems, dashboards, branding, and mobile-first web apps. My work often combines visual identity, interaction design, data structure, and practical deployment.
        </p>
        <p>
          The approach is hands-on: build the thing, test it on real devices, polish the details, and make the final result feel clear, expressive, and usable.
        </p>
      </section>
    </SiteShell>
  );
}
