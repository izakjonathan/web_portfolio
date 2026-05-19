export type Project = {
  slug: string;
  title: string;
  type: string;
  year: string;
  intro: string;
  description: string;
  role: string;
  stack: string[];
  highlights: string[];
  accent: string;
};

export const projects: Project[] = [
  {
    slug: 'liquid-glass-interface-system',
    title: 'Liquid Glass Interface System',
    type: 'UI System / Web Development',
    year: '2026',
    intro: 'A cinematic mobile-first interface language built around translucent layers, optical distortion, and tactile motion.',
    description:
      'An experimental design system exploring Apple-inspired liquid materials, glass panels, layered depth, motion feedback, and high-contrast readability for web apps.',
    role: 'Visual direction, interface design, frontend development, interaction model',
    stack: ['Next.js', 'CSS', 'SVG filters', 'Responsive UI', 'Motion design'],
    highlights: ['Frosted glass cards', 'Adaptive mobile layout', 'Layered depth', 'Specular highlights'],
    accent: '#a8f7ff'
  },
  {
    slug: 'bar-os-dashboard',
    title: 'Bar OS Dashboard',
    type: 'Web App / Operations System',
    year: '2026',
    intro: 'A management dashboard concept for multi-venue hospitality operations, finance, suppliers, margins, and decision making.',
    description:
      'A data-heavy operating system designed to make revenue, payroll, purchases, supplier trends, and margin development readable from a premium app-style interface.',
    role: 'Product design, dashboard architecture, frontend development, data modelling',
    stack: ['WordPress', 'Google Sheets', 'REST APIs', 'JavaScript', 'CSS'],
    highlights: ['Manager view', 'Supplier analysis', 'Monthly comparisons', 'Data quality checks'],
    accent: '#d6ff69'
  },
  {
    slug: 'adventure-roulette',
    title: 'Adventure Roulette',
    type: 'Mobile Web App',
    year: '2026',
    intro: 'A playful fullscreen adventure generator designed for spontaneous nearby activities and cinematic mobile interaction.',
    description:
      'A native-feeling iPhone web app concept with geolocation, place discovery modes, suspense states, anti-repeat memory, glass controls, and immersive background treatment.',
    role: 'Creative concept, app UX, frontend development, interaction design',
    stack: ['Next.js', 'Geolocation', 'Places APIs', 'CSS', 'Vercel'],
    highlights: ['Explore modes', 'Suspense animation', 'Homescreen-ready UI', 'Mobile-first interaction'],
    accent: '#ff9e64'
  },
  {
    slug: 'shams-visual-system',
    title: 'Shams Visual System',
    type: 'Graphic Design / Identity',
    year: '2026',
    intro: 'A loose, sun-driven identity direction using handmade typography, abstract symbols, stickers, and festival graphics.',
    description:
      'A graphic design exploration combining wobbly sun marks, expressive lettering, high-contrast shapes, and rough printed texture for event and cultural visuals.',
    role: 'Logo exploration, typography, graphic system, art direction',
    stack: ['Illustration', 'Typography', 'Poster design', 'Sticker design'],
    highlights: ['Abstract sun marks', 'Connected lettering', 'Print texture', 'Festival visual language'],
    accent: '#ff70c8'
  }
];

export const labItems = [
  'Realtime glass distortion',
  'Mobile homescreen web apps',
  'Experimental typography systems',
  'Operational dashboard interfaces',
  'Generative poster backgrounds',
  'Cinematic micro-interactions'
];
