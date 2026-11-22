import React, { useEffect, useState } from 'react'
import { ArrowDown, ArrowDownRight, ArrowUpRight, Asterisk, Menu, X } from 'lucide-react'
import { siCss, siDavinciresolve, siFigma, siHtml5, siJavascript, siNextdotjs, siPython, siReact } from 'simple-icons'
import Reveal from './components/Reveal.jsx'
import Inquiry from './components/Inquiry.jsx'
import { email, projects, services, site, skills, socials } from './content.js'

const nav = [['Home', 'home'], ['Work', 'work'], ['Services', 'services'], ['About', 'about'], ['Contact', 'contact']]
const sectionLink = id => `/#${id}`
const caseLink = project => `/projects/${project.id}/`
const whatsappNumber = (import.meta.env.VITE_WHATSAPP_NUMBER || '').replace(/[\s()+-]/g, '')
const whatsappMessage = encodeURIComponent('Hi Vishnu, I have a website project I’d like to discuss.')
const whatsappLink = /^[1-9]\d{6,14}$/.test(whatsappNumber)
  ? `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`
  : null
const number = index => String(index + 1).padStart(2, '0')
const skillIcons = {
  HTML: siHtml5, CSS: siCss, JavaScript: siJavascript, React: siReact,
  'Next.js': siNextdotjs, Python: siPython, Figma: siFigma, 'DaVinci Resolve': siDavinciresolve
}

function useActiveSection(home) {
  const [active, setActive] = useState(home ? 'home' : 'work')
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const sections = [...document.querySelectorAll('main > section')]
    function update() {
      const current = sections.findLast(section => section.getBoundingClientRect().top <= 110)
      const activeSection = sections.findLast(section =>
        nav.some(([, id]) => id === section.id) && section.getBoundingClientRect().top <= innerHeight * .42
      )
      setActive(activeSection?.id || (home ? 'home' : 'work'))
      setDark(Boolean(current?.classList.contains('dark')))
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [home])

  return { active, dark }
}

function Header({ home }) {
  const [open, setOpen] = useState(false)
  const { active, dark } = useActiveSection(home)
  const href = id => home ? `#${id}` : sectionLink(id)

  useEffect(() => {
    if (!open) return
    const closeOnEscape = event => {
      if (event.key === 'Escape') {
        setOpen(false)
        document.getElementById('menu-button')?.focus()
      }
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [open])

  return <header className={`header ${dark ? 'header-dark' : ''}`}>
    <div className="wrap header-inner">
      <a className="monogram" href={href('home')} aria-label="MV. — Mettu Vishnu Vardhan home">MV<span>.</span></a>
      <nav id="primary" className={open ? 'primary is-open' : 'primary'} aria-label="Primary">
        {nav.map(([label, id]) => <a key={id} href={href(id)} onClick={() => setOpen(false)}
          aria-current={active === id ? 'location' : undefined}>{label}</a>)}
      </nav>
      <a className="header-cta" href={href('contact')} onClick={() => setOpen(false)}>Let’s talk <ArrowUpRight size={15}/></a>
      <button id="menu-button" className="menu-button" type="button" aria-controls="primary" aria-expanded={open}
        aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button>
    </div>
  </header>
}

function Action({ children, href, secondary = false }) {
  function move(event) {
    if (!matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)').matches) return
    const { left, top, width, height } = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--mx', `${(event.clientX - left - width / 2) * .12}px`)
    event.currentTarget.style.setProperty('--my', `${(event.clientY - top - height / 2) * .16}px`)
  }
  function reset(event) {
    event.currentTarget.style.removeProperty('--mx')
    event.currentTarget.style.removeProperty('--my')
  }
  return <a className={`action ${secondary ? 'action-secondary' : ''}`} href={href} onPointerMove={move} onPointerLeave={reset}>
    {children}<ArrowUpRight size={17}/>
  </a>
}

function Hero() {
  return <section className="hero" id="home" aria-labelledby="hero-title">
    <div className="wrap">
      <div className="hero-meta mono"><span><i/> {import.meta.env.VITE_AVAILABLE_FOR_PROJECTS === 'true' ? 'Available for projects' : 'Freelance web developer'}</span><span>Hyderabad, India</span></div>
      <div className="hero-grid">
        <div className="hero-copy">
          <h1 id="hero-title">
            <span className="mask"><span>I Build Digital</span></span>{' '}
            <span className="mask"><span>Experiences That</span></span>{' '}
            <span className="mask serif"><span>Stand Out.</span></span>
          </h1>
          <p>I’m Vishnu Vardhan — a creative developer crafting modern websites, memorable digital experiences and meaningful solutions for ambitious brands.</p>
          <div className="actions"><Action href="#work">Explore My Work</Action><Action secondary href="#contact">Let’s Build Something</Action></div>
        </div>
        <div className="hero-art">
          <img src="/vishnu-portrait.png" alt="Mettu Vishnu Vardhan" width="526" height="935" fetchPriority="high"/>
          <span className="art-plus" aria-hidden="true">+</span>
          <div className="art-caption mono"><span>Design.<br/>Develop.<br/>Deliver.</span><Asterisk size={31} strokeWidth={1.4}/></div>
        </div>
      </div>
      <div className="hero-foot mono"><span>Mettu Vishnu Vardhan</span><a href="#work">Scroll to explore <ArrowDown size={15}/></a></div>
    </div>
  </section>
}

function ProjectArt({ project, eager = false }) {
  return <div className={`project-visual screenshot ${project.id}`}><img src={project.image} alt={project.alt}
    width="1200" height="750" loading={eager ? 'eager' : 'lazy'}/></div>
}

function Work() {
  return <section className="section work dark" id="work">
    <div className="wrap">
      <Reveal><div className="section-head"><div><p className="kicker mono">Selected Work</p><h2>Built with <em>intent.</em></h2></div><p>Websites, digital products and software projects. Explore the brief, my role and the work behind each one.</p></div></Reveal>
      <Reveal><div className="collaborations" id="clients">
        <h3>Brands I’m currently working with</h3>
        {projects.filter(project => project.currentClient).map(project =>
          <a key={project.id} href={caseLink(project)}>{project.title} <ArrowUpRight size={16}/></a>
        )}
      </div></Reveal>
      <div className="project-list">
        {projects.map((project, index) => <Reveal className="project-reveal" key={project.id}>
          <article className="project">
            <div className="project-cover">
              <div aria-hidden="true"><ProjectArt project={project}/></div>
              <a className="project-cover-link" href={caseLink(project)} aria-label={`View the ${project.title} case study`}>
                <span className="view-label mono">View <ArrowUpRight size={14}/></span>
              </a>
            </div>
            <div className="project-info">
              <div className="project-label mono"><span>{number(index)}</span> {project.currentClient ? 'Current client · Website' : project.type}</div>
              <h3><a href={caseLink(project)}>{project.title}</a></h3>
              <p>{project.description}</p>
              {project.stack && <ul className="chips compact" aria-label="Technologies">{project.stack.map(item => <li key={item}>{item}</li>)}</ul>}
              <ProjectLinks project={project} showCase/>
            </div>
          </article>
        </Reveal>)}
      </div>
    </div>
  </section>
}

function ProjectLinks({ project, showCase }) {
  return <div className="project-links">
    {showCase && <a href={caseLink(project)}>Case study <ArrowUpRight size={15}/></a>}
    {project.live && <a href={project.live} target="_blank" rel="noreferrer">Live website <ArrowUpRight size={15}/></a>}
    {project.repo && <a href={project.repo} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={15}/></a>}
  </div>
}

function Services() {
  return <section className="section" id="services"><div className="wrap">
    <Reveal><div className="section-head"><div><p className="kicker mono">Services</p><h2>What I can build <em>for you.</em></h2></div></div></Reveal>
    <div className="service-list">
      {services.map(([title, description], index) => <Reveal key={title}>
        <details name="services" open={index === 0}>
          <summary><span className="service-number serif">{number(index)}</span><span>{title}</span><span className="service-toggle" aria-hidden="true"/></summary>
          <p>{description}</p>
        </details>
      </Reveal>)}
    </div>
    <Reveal><div className="process">
      <h3>How we’ll work together</h3>
      <ol>
        <li><strong>Scope</strong><span>Agree on your goals, deliverables and timeline.</span></li>
        <li><strong>Design & build</strong><span>Review the design and check in as the site comes together.</span></li>
        <li><strong>Launch</strong><span>Test the site across devices and walk through the handoff.</span></li>
      </ol>
    </div></Reveal>
  </div></section>
}

function About() {
  const [category, setCategory] = useState('Frontend')
  return <section className="section about dark" id="about"><div className="wrap">
    <Reveal><div className="about-grid">
      <div><p className="kicker mono">About me</p><h2>Curious by nature.<br/><em>Creative by choice.</em></h2></div>
      <div className="about-copy">
        <p>I’m Mettu Vishnu Vardhan, a developer and creative problem-solver based in Hyderabad. I like taking a rough idea and making it feel clear, useful and considered on the web.</p>
        <p>I’m pursuing a B.Tech in Computer Science Engineering (AI & ML) at St. Peter’s Engineering College. As a co-founder at Pixel Chai, I work across websites, visual design and digital content. I also enjoy video editing and building AI-powered products.</p>
        <a className="about-link" href="#certifications">See certifications <ArrowUpRight size={15}/></a>
      </div>
    </div></Reveal>
    <Reveal><div className="skills" id="skills">
      <h3>Skills & tools</h3>
      <div className="skill-tabs" role="group" aria-label="Skill categories">
        {Object.keys(skills).map(name => <button key={name} type="button" aria-pressed={name === category} onClick={() => setCategory(name)}>{name}</button>)}
      </div>
      <ul className="chips skill-chips" key={category} aria-live="polite">{skills[category].map(skill => {
        const icon = skillIcons[skill]
        return <li key={skill}>{icon && <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d={icon.path}/></svg>}{skill}</li>
      })}</ul>
    </div></Reveal>
  </div></section>
}

function Credentials() {
  return <section className="section credentials" id="certifications"><div className="wrap">
    <Reveal><div className="section-head"><div><p className="kicker mono">Credentials</p><h2>Always <em>learning.</em></h2></div></div></Reveal>
    <div className="credentials-grid">
      <Reveal><article>
        <a className="cert-preview" href="/deloitte-certificate.png" target="_blank" rel="noreferrer"><img width="1280" height="904" loading="lazy" src="/deloitte-certificate.png" alt="Open the Deloitte Data Analytics Job Simulation certificate"/></a>
        <p className="mono">Forage · June 2026</p><h3>Deloitte Data Analytics Job Simulation</h3>
        <p>Practical tasks in data analysis and forensic technology.</p>
      </article></Reveal>
      <Reveal><article>
        <div className="certificate-type"><Asterisk size={38} strokeWidth={1.2}/><span className="serif">Google<br/>Analytics</span></div>
        <p className="mono">Coursera Project Network · July 2025</p><h3>Getting Started in Google Analytics</h3>
        <p>Completed an online project through Coursera Project Network.</p>
      </article></Reveal>
    </div>
  </div></section>
}

export function Testimonials({ entries = [] }) {
  if (!entries.length) return null
  return <section className="section"><div className="wrap"><h2>Client feedback</h2><div className="credentials-grid">
    {entries.map(({ id, quote, name, role }) => <Reveal key={id}><figure><blockquote>{quote}</blockquote><figcaption>{name} · {role}</figcaption></figure></Reveal>)}
  </div></div></section>
}

function Contact() {
  return <section className="section contact dark" id="contact"><div className="wrap contact-grid">
    <Reveal><div className="contact-copy">
      <p className="kicker mono">Contact</p>
      <h2>Have a project in mind? <em>Let’s make it happen.</em></h2>
      <p>Whether you’re launching something new or upgrading an existing experience, I’d love to help bring your idea to life.</p>
      <a className="email-link" href={`mailto:${email}`}>{email} <ArrowUpRight size={16}/></a>
      <div className="contact-socials">{['LinkedIn', 'GitHub'].map(label => <a key={label} href={socials[label]} target="_blank" rel="noreferrer">{label} <ArrowUpRight size={14}/></a>)}</div>
      {whatsappLink && <Action href={whatsappLink}>Chat on WhatsApp</Action>}
    </div></Reveal>
    <Inquiry/>
  </div></section>
}

function Footer({ home }) {
  return <footer className="footer dark"><div className="wrap">
    {home && <div className="footer-phrase">Let’s create something <em>extraordinary.</em></div>}
    <div className="footer-bottom"><a className="monogram" href={home ? '#home' : '/'} aria-label="MV. — Mettu Vishnu Vardhan home">MV<span>.</span></a>
      <span>© {new Date().getFullYear()} Mettu Vishnu Vardhan</span>
      <nav aria-label="Social profiles">{Object.entries(socials).map(([label, href]) => <a key={label} href={href} target="_blank" rel="noreferrer">{label} <ArrowUpRight size={13}/></a>)}</nav>
      <a href={home ? '#home' : '#main'}>Back to top ↑</a>
    </div>
  </div></footer>
}

function CaseStudy({ project }) {
  const entries = [
    ['Objective', project.objective], ['My role', project.role], ['Design and development', project.process],
    ['Features', project.features], ['Tools & technologies', project.stack]
  ].filter(([, value]) => value)
  return <>
    <section className="section case-intro"><div className="wrap">
      <a className="back-link" href="/#work">← All work</a>
      <p className="kicker mono">{project.type}</p>
      <h1>{project.title}</h1><p className="case-lede">{project.description}</p>
      <ProjectLinks project={project}/>
      <ProjectArt project={project} eager/>
      <p className="image-caption mono">{project.imageCaption || 'Project cover artwork'}</p>
    </div></section>
    {entries.length > 0 && <section className="section dark case-details"><div className="wrap case-grid">
      {entries.map(([label, value]) => <article key={label}><h2>{label}</h2>{Array.isArray(value)
        ? <ul>{value.map(item => <li key={item}>{item}</li>)}</ul> : <p>{value}</p>}</article>)}
    </div></section>}
    <section className="case-next"><div className="wrap">
      <a href={caseLink(projects[(projects.indexOf(project) + 1) % projects.length])}>Next project <ArrowDownRight/></a>
    </div></section>
  </>
}

function Missing() {
  return <section className="section missing"><div className="wrap">
    <p className="kicker mono">404</p><h1>Page not found.</h1><p>Find current projects in the work section or get in touch about a specific project.</p>
    <div className="actions"><Action href="/#work">View work</Action><Action secondary href="/#contact">Contact</Action></div>
  </div></section>
}

export default function App() {
  const path = window.location.pathname.replace(/\/$/, '') || '/'
  const home = path === '/' || path === '/contact'
  const project = projects.find(item => path === `/projects/${item.id}`)

  useEffect(() => {
    if (!home) {
      document.title = project ? `${project.title} | Mettu Vishnu Vardhan` : 'Page not found | Mettu Vishnu Vardhan'
      const description = project?.description || 'Find current work and contact Mettu Vishnu Vardhan.'
      document.querySelector('meta[name="description"]').content = description
      document.querySelector('link[rel="canonical"]').href = project ? site + caseLink(project) : site + path
    }
    if (home && (window.location.hash || path === '/contact')) {
      const hash = window.location.hash.slice(1) || 'contact'
      const target = document.getElementById(hash === 'credentials' || hash === 'certifications' ? 'certifications' : hash === 'top' ? 'home' : hash)
      if (target) requestAnimationFrame(() => target.scrollIntoView({ behavior: 'instant' }))
    }
  }, [home, path, project])

  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <Header home={home}/>
    <main id="main" tabIndex={-1} className={home ? '' : 'inner-page'}>
      {home ? <><Hero/><Work/><Services/><About/><Credentials/><Testimonials/><Contact/></>
        : project ? <CaseStudy project={project}/> : <Missing/>}
    </main>
    <Footer home={home}/>
  </>
}
