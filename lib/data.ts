export const profile = {
  name: 'Ranjith T',
  initials: 'RT',
  role: 'Computer Science Engineering Student',
  company: 'KSR College of Engineering',
  graduation: 'Expected 2029',
  email: 'ranjitht323748@gmail.com',
  github: 'https://github.com/ranjith11102007',
  linkedin: 'https://www.linkedin.com/in/ranjith-t-a69a1a292',
  leetcode: 'https://leetcode.com/u/RanjithT2007',
  githubUsername: 'ranjith11102007',
  headline: 'I build useful things, not tutorial demos.',
  intro:
    'Computer Science Engineering student who likes turning real problems into working products. Web development, applied AI, and offline-first tools are my current playground.',
  status: 'Open to hackathons & collaborations',
}

export const navItems = [
  { id: 'home', label: 'Home', index: '00' },
  { id: 'about', label: 'About', index: '01' },
  { id: 'projects', label: 'Projects', index: '02' },
  { id: 'stack', label: 'Stack', index: '03' },
  { id: 'activity', label: 'Activity', index: '04' },
  { id: 'contact', label: 'Contact', index: '05' },
] as const

export type Project = {
  index: string
  title: string
  category: string
  description: string
  tags: string[]
  repo: string
  live?: string
  accent: string
  featured?: boolean
}

export const projects: Project[] = [
  {
    index: '01',
    title: 'Care-AI',
    category: 'AI / Healthcare',
    description:
      'An AI mental-health and crisis support system for remote communities, with CBT-based chat, mood tracking and a low-bandwidth mode.',
    tags: ['TypeScript', 'React', 'Vite', 'Firebase', 'Vercel AI SDK'],
    repo: 'https://github.com/ranjith11102007/Care-AI',
    live: 'https://care-ai-three.vercel.app',
    accent: '#3ee7ff',
    featured: true,
  },
  {
    index: '02',
    title: 'FormLink',
    category: 'Marketplace / Full-stack',
    description:
      'A marketplace connecting local farmers directly with customers. Product listings, cart, orders, delivery OTP and an admin panel.',
    tags: ['Python', 'Flask', 'SQLite', 'Jinja2', 'Razorpay'],
    repo: 'https://github.com/ranjith11102007/FormLink',
    live: 'https://form-link-omega.vercel.app',
    accent: '#b6ff5c',
  },
  {
    index: '03',
    title: 'LEARNOFFLINE',
    category: 'PWA / Education',
    description:
      'An offline-first learning PWA for low-connectivity regions. Download lessons, take quizzes offline, and sync when the network returns.',
    tags: ['JavaScript', 'IndexedDB', 'Service Workers', 'PWA'],
    repo: 'https://github.com/ranjith11102007/LEARNOFFLINE',
    accent: '#a78bfa',
  },
  {
    index: '04',
    title: 'Mini-Runner',
    category: 'Game / Browser',
    description:
      'A fast-paced endless runner with dynamic obstacle dodging, power-ups and score tracking. Built from scratch with vanilla web tech.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    repo: 'https://github.com/ranjith11102007/Mini-Runner',
    accent: '#ff8fb1',
  },
]

export const skillGroups = [
  {
    label: 'Languages',
    code: 'lang',
    items: ['Python', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3'],
  },
  {
    label: 'Frontend',
    code: 'ui',
    items: ['React', 'Vite', 'Tailwind', 'Next.js', 'PWA'],
  },
  {
    label: 'Backend & Data',
    code: 'api',
    items: ['Flask', 'Jinja2', 'Firebase', 'SQLite', 'IndexedDB'],
  },
  {
    label: 'Tools & Platform',
    code: 'ops',
    items: ['Git', 'GitHub', 'Vercel', 'Razorpay', 'Vercel AI SDK'],
  },
]

export const learning = [
  'Core programming & data structures',
  'Responsive UI and modern React patterns',
  'Offline-first architecture',
  'Applied AI in real products',
  'Clean code, Git and deployment workflows',
]
