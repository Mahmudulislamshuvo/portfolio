export const STATS = [
  { value: '5+', label: 'YEARS OF EXPERIENCE' },
  { value: '120+', label: 'COMPLETED PROJECTS' },
  { value: '95+', label: 'HAPPY CLIENTS' },
  { value: '12k+', label: 'CODE COMMITS' },
];

export const SKILL_CATEGORIES = [
  {
    id: 'frontend-core',
    title: 'Frontend Core',
    icon: 'Code2',
    skills: ['JavaScript (ES6+)', 'HTML5', 'CSS3 / Modern CSS', 'TypeScript'],
  },
  {
    id: 'frameworks-libraries',
    title: 'Frameworks & Libraries',
    icon: 'Layers',
    skills: ['React.js', 'Next.js', 'Tailwind CSS v4', 'Redux Toolkit', 'Framer Motion'],
  },
  {
    id: 'tools-platforms',
    title: 'Tools & Platforms',
    icon: 'Wrench',
    skills: ['Git & GitHub', 'VS Code', 'Figma', 'Vercel', 'REST APIs'],
  },
];

export const EXPERIENCES = [
  {
    id: 'exp-1',
    role: 'Senior Frontend Engineer',
    company: 'TechNova Solutions',
    period: '2022 - Present',
    description: 'Leading the development of core UI components and design systems. Optimized dashboard rendering by 40% using Next.js 14 features.',
    achievements: [
      'Architected scalable component library',
      'Mentored 5+ junior developers',
    ],
  },
  {
    id: 'exp-2',
    role: 'Web Developer',
    company: 'Digital Stream Co.',
    period: '2020 - 2022',
    description: 'Developed and maintained client-facing e-commerce platforms. Implemented complex animations and micro-interactions.',
    achievements: [
      'Reduced bundle size by 30%',
      'Implemented automated CI/CD pipelines',
    ],
  },
  {
    id: 'exp-3',
    role: 'Junior Developer',
    company: 'StartUp Hub',
    period: '2018 - 2020',
    description: 'Contributed to building responsive landing pages and internal admin panels. Collaborated closely with UI/UX designers.',
    achievements: [
      "Won 'Employee of the Quarter'",
      'Built 20+ custom React hooks',
    ],
  },
];

export const INITIAL_REVIEWS = [
  {
    id: 'rev-1',
    name: 'Alex Johnson',
    role: 'CEO',
    company: 'TechVibe',
    rating: 5,
    comment: 'An incredible developer who truly understands UI/UX. The attention to detail in the micro-interactions is world-class.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    category: 'UI/UX',
    createdAt: '2026-08-15',
  },
  {
    id: 'rev-2',
    name: 'Sarah Chen',
    role: 'Founder',
    company: 'Bloom.ai',
    rating: 5,
    comment: 'Delivered our Next.js migration flawlessly. Performance metrics improved significantly right after launch.',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    category: 'React/Next.js',
    createdAt: '2026-08-20',
  },
  {
    id: 'rev-3',
    name: 'David Smith',
    role: 'Product Manager',
    company: 'Nexus',
    rating: 4.5,
    comment: 'Clean code and professional communication. One of the best frontend specialists I\'ve worked with.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    category: 'Full-Stack',
    createdAt: '2026-08-25',
  },
];

export const AVATAR_OPTIONS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
];

export const FEATURED_PROJECTS = [
  {
    id: 'proj-1',
    title: 'Pulse AI SaaS Analytics Platform',
    category: 'React/Next.js',
    description: 'High-performance real-time telemetry dashboard built with Next.js 14 App Router, Server Actions, and Tailwind CSS v4.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
    tech: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Tremor', 'Prisma'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    featured: true,
  },
  {
    id: 'proj-2',
    title: 'NeonSpace Design System & Tokens',
    category: 'UI/UX',
    description: 'Comprehensive design system token engine and interactive component library with fluid micro-interactions.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
    tech: ['Figma Tokens', 'React', 'Framer Motion', 'Storybook', 'Radix UI'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    featured: true,
  },
  {
    id: 'proj-3',
    title: 'OmniFlow Cloud E-Commerce Engine',
    category: 'Full-Stack',
    description: 'Headless multi-vendor e-commerce platform with sub-second page loads, Stripe Checkout, and edge caching.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
    tech: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'Stripe API'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    featured: true,
  },
  {
    id: 'proj-4',
    title: 'Aura Studio 3D Canvas Editor',
    category: 'UI/UX',
    description: 'Browser-based generative art studio and 3D visual workspace built with Three.js and custom GLSL shaders.',
    image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=800&auto=format&fit=crop&q=80',
    tech: ['Three.js', 'React Three Fiber', 'WebGL', 'TypeScript', 'Tailwind'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    featured: false,
  },
  {
    id: 'proj-5',
    title: 'DevCollab Realtime Code Workspace',
    category: 'Full-Stack',
    description: 'Collaborative code review and pair-programming environment with CRDT synchronization and Monaco editor.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
    tech: ['Next.js', 'WebSockets', 'Y.js', 'Monaco Editor', 'Tailwind'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    featured: false,
  },
  {
    id: 'proj-6',
    title: 'HyperLink Modern Documentation Hub',
    category: 'React/Next.js',
    description: 'Lightning-fast API & developer documentation portal with full-text search and interactive playground.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
    tech: ['MDX', 'Next.js', 'Algolia Search', 'Tailwind CSS'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    featured: false,
  },
];




