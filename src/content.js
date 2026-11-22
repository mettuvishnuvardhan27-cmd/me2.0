export const email = 'mettuvishnuvardhan86@gmail.com'
export const site = 'https://www.mettuvishnuvardhan.dev'
export const socials = {
  LinkedIn: 'https://www.linkedin.com/in/mettu-vishnu-vardhan-97317a219/',
  GitHub: 'https://github.com/mettuvishnuvardhan27-cmd'
}

export const projects = [
  {
    id: 'orbix-elevators', currentClient: true, title: 'Orbix Elevators', type: 'Client website',
    description: 'A client website that presents Orbix’s home elevator designs and helps visitors explore their options.',
    objective: 'Give prospective customers a clear way to browse home elevator designs and discover the available options.',
    role: 'Website development',
    features: ['Home elevator collection', 'Product pages', 'Project gallery', 'Project inquiry links'],
    image: '/orbix-elevators.webp',
    alt: 'Orbix Elevators homepage with a residential elevator and a link to explore elevator designs',
    imageCaption: 'Live website homepage',
    live: 'https://www.orbixelevators.com/'
  },
  {
    id: 'vincit-fitness', currentClient: true, title: 'Vincit Fitness', type: 'Client website',
    description: 'A client website introducing Vincit Fitness and helping visitors explore gym memberships.',
    objective: 'Give prospective members a place to learn about the gym and see which membership fits their goals.',
    role: 'Website development',
    features: ['Membership overview', 'Gym photo gallery', 'Visit information', 'WhatsApp inquiry link'],
    image: '/vincit-fitness.webp',
    alt: 'Vincit Fitness homepage featuring the gym interior and a membership call to action',
    imageCaption: 'Live website homepage',
    live: 'https://www.vincitfitness.com/'
  },
  {
    id: 'career-iq', title: 'CareerIQ', type: 'AI career dashboard · MVP',
    description: 'An interactive career dashboard prototype for reviewing resumes and planning next steps.',
    objective: 'Help job seekers understand how their resume aligns with a role and what to work on next.',
    role: 'Product and interface design',
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    process: 'The published MVP uses demo data to explore the resume upload, feedback and roadmap flows. Live AI analysis and job data are planned integrations.',
    image: '/career-iq.webp',
    alt: 'CareerIQ dashboard with navigation and a sample career-readiness score',
    imageCaption: 'CareerIQ dashboard with demo data',
    features: ['Resume upload with sample ATS feedback', 'Job-description matching', 'Career roadmaps', 'Goal tracking and saved reports'],
    repo: 'https://github.com/dynamicscreations2025-debug/careear-iq'
  },
  {
    id: 'the-system', title: 'The System', type: 'Software project',
    description: 'A fitness and training tracker with a game-inspired interface.',
    objective: 'Bring training plans, nutrition targets, personal records and daily quests into one dashboard.',
    stack: ['HTML', 'CSS', 'JavaScript', 'Supabase'],
    features: ['Fitness profile and goal setup', 'Training split planning', 'Personal records', 'Quest tracking'],
    image: '/the-system.webp',
    alt: 'The System profile setup with fields for fitness goals and training split',
    imageCaption: 'Profile setup interface',
    repo: 'https://github.com/mettuvishnuvardhan27-cmd/the-systemm'
  }
]

export const services = [
  ['Website Development', 'Responsive websites for businesses and personal brands, with clear navigation and layouts that work on any screen.'],
  ['E-commerce Development', 'Online stores with product browsing, product management and a straightforward checkout.'],
  ['Landing Page Development', 'Focused pages for launches and campaigns, built around the action you want visitors to take.'],
  ['UI/UX Design', 'Responsive interfaces with clear user flows and a visual identity that fits your product.'],
  ['Website Redesign', 'Refresh an existing website with clearer content, updated visuals and a better mobile experience.']
]

export const skills = {
  Frontend: ['HTML', 'CSS', 'JavaScript', 'React', 'Next.js'],
  Backend: ['Python', 'Java'],
  Design: ['Figma', 'Canva', 'UI/UX', 'Responsive UI', 'Visual design'],
  Other: ['AI & ML', 'Software development', 'DaVinci Resolve', 'CapCut']
}
