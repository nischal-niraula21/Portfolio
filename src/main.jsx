import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  Code2, MapPin, Send, Rocket, Users, BookOpen, Wrench, Palette, Paintbrush,
  ExternalLink, Download, Moon, Sun, ArrowUp, MessageCircle, Menu, X, Mail, PhoneCall
} from 'lucide-react';
import {
  FaGithub, FaLinkedinIn, FaFacebookF, FaInstagram, FaNodeJs
} from 'react-icons/fa';
import { SiMongodb, SiTailwindcss, SiExpress } from 'react-icons/si';
import './styles.css';

const skills = [
  { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
  { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Node.js', component: FaNodeJs },
  { name: 'Express.js', component: SiExpress },
  { name: 'MongoDB', component: SiMongodb },
  { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  { name: 'GitHub', component: FaGithub },
  { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
  { name: 'Tailwind CSS', component: SiTailwindcss },
  { name: 'VS Code', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' }
];

const projects = [
  {
    title: 'GharKhoj',
    type: 'Room Rental Platform',
    desc: 'A web platform to find and list rooms for rent in Nepal, built with a modern full-stack workflow.',
    tags: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS'],
    image: '/gharkhoj.png',
    link: 'https://gharkhoj.nischal-niraula.com.np/'
  },
  {
    title: 'Lily Cafe & Restaurant',
    type: 'Cafe & Restaurant',
    desc: 'A cozy cafe and restaurant offering great food, warm hospitality, and private cabin booking for a comfortable dining experience.',
    tags: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS'],
    image: '/lily-cafe.png',
    link: null
  },
  {
    title: 'Coming Soon',
    type: 'More Projects',
    desc: 'More practical projects are currently in development.',
    tags: ['Ideas', 'Design', 'Development'],
    emoji: '⚠️',
    link: null
  }
];

function SectionTitle({ eyebrow, title, desc }) {


  return (
    <div className="section-head reveal">
      <span className="eyebrow section-eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {desc && <p>{desc}</p>}
    </div>
  );
}

function App() {
  const [lightMode, setLightMode] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [aboutExpanded, setAboutExpanded] = React.useState(false);
  const [contactStatus, setContactStatus] = React.useState({ type: 'idle', message: '' });
  const roles = React.useMemo(() => ['Full-Stack Developer', 'UI/UX Designer', 'Graphics Designer'], []);
  const [roleIndex, setRoleIndex] = React.useState(0);
  const [typedRole, setTypedRole] = React.useState('');
  const [deletingRole, setDeletingRole] = React.useState(false);
  const handleContactSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setContactStatus({ type: 'sending', message: 'Sending…' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          email: data.get('email'),
          message: data.get('message'),
          website: data.get('website')
        })
      });

      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || 'Unable to send your message.');

      form.reset();
      setContactStatus({ type: 'success', message: 'Message sent successfully. I’ll get back to you soon.' });
    } catch (error) {
      setContactStatus({ type: 'error', message: error.message || 'Something went wrong. Please try again.' });
    }
  };

  React.useEffect(() => {
    if (lightMode) {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [lightMode]);

  React.useEffect(() => {
    const currentRole = roles[roleIndex];
    let delay = deletingRole ? 55 : 90;

    if (!deletingRole && typedRole === currentRole) {
      delay = 1350;
    } else if (deletingRole && typedRole === '') {
      delay = 280;
    }

    const timer = window.setTimeout(() => {
      if (!deletingRole && typedRole === currentRole) {
        setDeletingRole(true);
        return;
      }
      if (deletingRole && typedRole === '') {
        setDeletingRole(false);
        setRoleIndex(index => (index + 1) % roles.length);
        return;
      }
      setTypedRole(value => deletingRole
        ? currentRole.slice(0, Math.max(0, value.length - 1))
        : currentRole.slice(0, value.length + 1)
      );
    }, delay);

    return () => window.clearTimeout(timer);
  }, [typedRole, deletingRole, roleIndex, roles]);

  React.useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(entry => entry.isIntersecting && entry.target.classList.add('show')),
      { threshold: 0.2, rootMargin: '0px 0px -8% 0px' }
    );
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="site-shell">
      <div className="blue-mist mist-1" />
      <div className="blue-mist mist-2" />
      <div className="blue-mist mist-3" />

      <header className="navbar">
        <a href="#home" className="brand">Nischal Niraula</a>
        <nav className={mobileMenuOpen ? 'open' : ''}>
          <a href="#home" onClick={() => setMobileMenuOpen(false)}>Home</a>
          <a href="#about" onClick={() => setMobileMenuOpen(false)}>About</a>
          <a href="#skills" onClick={() => setMobileMenuOpen(false)}>Skills</a>
          <a href="#projects" onClick={() => setMobileMenuOpen(false)}>Projects</a>
          <a href="#services" onClick={() => setMobileMenuOpen(false)}>Services</a>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact</a>
        </nav>
        <div className="nav-actions">
          <button className="icon-btn" aria-label="Change theme" onClick={() => setLightMode(v => !v)}>
            {lightMode ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <a className="outline-btn" href="/Nischal-Niraula-CV.pdf" download>
            <Download size={16} />Download CV
          </a>
          <button
            className="icon-btn menu-toggle"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(v => !v)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <main>
        <section id="home" className="hero section">
          <div className="hero-copy reveal">
            <span className="eyebrow">TURNING IDEAS INTO REALITY</span>
            <h1>Hi, I’m<br /><span>Nischal Niraula</span></h1>
            <h3 className="hero-role">BCA Student & <span className="typed-role">{typedRole}</span><span className="typing-cursor" aria-hidden="true">|</span></h3>
            <p>I build modern, scalable, and practical web applications while continuously learning and exploring new technologies.
              Passionate about problem solving and creating solutions that make a real impact.</p>
            <div className="hero-actions">
              <a className="primary-btn" href="#projects">View My Work →</a>
              <a className="outline-btn" href="#contact"><MessageCircle size={16} />Let’s Talk</a>
            </div>
            <div className="social-row">
              <span>Connect with me</span>
              <a href="https://github.com/nischal-niraula21" aria-label="GitHub"><FaGithub /></a>
              <a href="#" aria-label="LinkedIn"><FaLinkedinIn /></a>
              <a href="https://www.facebook.com/share/1NCFKfP5U4/" aria-label="Facebook"><FaFacebookF /></a>
              <a href="#" aria-label="Instagram"><FaInstagram /></a>
            </div>
          </div>

          <div className="hero-visual reveal">
            <div className="orbit orbit-1" />
            <div className="orbit orbit-2" />
            <div className="orbit orbit-3" />
            <div className="code-badge"><Code2 size={34} /></div>
            <div className="portrait-frame">
              <img className="hero-photo" src="/hero-photo.png" alt="Nischal Niraula" />
            </div>
          </div>
          <div className="scroll-cue" aria-hidden="true">
            <div className="scroll-mouse"><span>↓</span></div>
            <span>SCROLL DOWN</span>
          </div>
        </section>

        <section id="about" className="section">
          <SectionTitle eyebrow="ABOUT ME" title="More Than Just a Developer" />
          <p className="about-copy reveal">I’m Nischal Niraula, a BCA student and aspiring full-stack developer from Nepal. I enjoy
            building web applications, exploring new technologies, and turning ideas into real world solutions. I’m always eager to learn, collaborate, and take on new challenges that help me grow personally and professionally.</p>
          <div className={`about-more ${aboutExpanded ? 'expanded' : ''}`} aria-hidden={!aboutExpanded}>
            <p>My journey into web development started with curiosity. While studying BCA, I became interested in understanding how the websites I used every day were actually built. What began with experimenting with simple pages slowly turned into hours of learning, testing ideas, fixing mistakes, and enjoying the feeling of making something work on my own.</p>
            <p>As I learned more, I wanted to build things that were useful rather than just practice examples. That mindset pushed me toward full-stack development and projects such as GharKhoj, where an idea could grow into a real application with a frontend, backend, database, authentication, and deployment. Every project has taught me something new and made me more confident about solving practical problems with technology.</p>
            <p>Today, I’m continuing to improve as a developer while also exploring UI/UX and graphic design. My goal is to combine development and creativity to turn the ideas I imagine into experiences people can actually use. I’m still learning, still building, and this portfolio is part of that journey of turning my dreams into reality.</p>
          </div>
          <button className="primary-btn about-read-more reveal" type="button" onClick={() => setAboutExpanded(value => !value)} aria-expanded={aboutExpanded}>
            {aboutExpanded ? 'Show Less ↑' : 'Read More →'}
          </button>
          <div className="about-stack">
            <div className="info-card reveal"><Code2 /><div><h4>Personal Projects</h4><p>Building real world projects and exploring new technologies.</p></div></div>
            <div className="info-card reveal"><Users /><div><h4>Collaborative Work</h4><p>Working with peers on academic and side projects to gain practical experience.</p></div></div>
            <div className="info-card reveal"><Rocket /><div><h4>Open Source Contribution</h4><p>Exploring open source and contributing where possible.</p></div></div>
            <div className="info-card reveal"><BookOpen /><div><h4>Continuous Learning</h4><p>Always learning, improving, and staying updated with the latest tech trends.</p></div></div>
          </div>
        </section>

        <section id="skills" className="section">
          <SectionTitle eyebrow="MY SKILLS" title="Tools & Technologies I Work With" desc="I constantly learn, explore, and use modern technologies to build efficient and scalable web applications." />
          <div className="skills-grid">
            {skills.map((skill, i) => {
              const Icon = skill.component;
              return (
                <div key={skill.name} className="skill-card reveal">
                  {Icon ? <Icon className="skill-react-icon" /> : <img src={skill.icon} alt={`${skill.name} logo`} className="skill-logo" />}
                  <span>{skill.name}</span>
                </div>
              );
            })}
          </div>
        </section>

        <section id="projects" className="section">
          <SectionTitle eyebrow="FEATURED PROJECTS" title="Some Things I’ve Built" desc="Here are a few of my recent projects. More exciting projects are on the way!" />
          <div className="projects-grid">
            {projects.map((p, i) => (
              <article
                className={`project-card reveal${p.link ? ' clickable' : ''}`}
                key={p.title}
                style={{ transitionDelay: `${i * 70}ms` }}
                onClick={() => p.link && window.open(p.link, '_blank', 'noopener,noreferrer')}
              >
                <div className={`project-img${p.image ? ' has-image' : ''}`}>
                  {p.image ? <img src={p.image} alt={`${p.title} website preview`} /> : p.emoji}
                </div>
                <h3>{p.title}</h3>
                <span className="project-type">{p.type}</span>
                <p>{p.desc}</p>
                <div className="tags">{p.tags.map(t => <span key={t}>{t}</span>)}</div>
                {p.link && (
                  <a className="project-link" href={p.link} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} aria-label="Open GharKhoj">
                    <ExternalLink size={18} />
                  </a>
                )}
              </article>
            ))}
          </div>
          <div className="projects-view-more-wrap reveal">
            <button className="primary-btn projects-view-more" type="button">View More →</button>
          </div>
        </section>

        <section id="services" className="section">
          <SectionTitle eyebrow="SERVICES" title="What I Do" desc="I’m open to freelance work, collaborations, and exciting opportunities." />
          <div className="services-grid">
            <div className="service-card reveal"><Code2 /><h3>Web Development</h3><p>Modern and responsive web applications tailored to your needs.</p></div>
            <div className="service-card reveal"><Palette /><h3>UI/UX Design</h3><p>Clean and user-friendly designs that focus on better user experience.</p></div>
            <div className="service-card reveal"><Rocket /><h3>Custom Projects</h3><p>Turning your ideas into functional and scalable web solutions.</p></div>
            <div className="service-card reveal"><Paintbrush /><h3>Graphic Design</h3><p>Creative visual designs for digital content, branding, and social media.</p></div>
            <div className="service-card reveal"><Wrench /><h3>Maintenance & Support</h3><p>Updates, fixes, and ongoing support to keep your website running smoothly.</p></div>
            <div className="service-card reveal"><MessageCircle /><h3>Consultation</h3><p>Guidance for projects, ideas, and technology choices.</p></div>
          </div>
        </section>

        <section id="contact" className="section contact-section">
          <div className="contact-copy reveal">
            <SectionTitle eyebrow="CONTACT" title="Let’s Work Together" desc="Have a project in mind or just want to say hello? Feel free to reach out!" />
            <div className="contact-list">
              <a className="contact-email"><span className="contact-icon"><Mail /></span><div className="contact-detail">
                <small>Email</small><span>contact@nischal-niraula.com.np</span></div></a>
              <a href="tel:+9779825983379"><span className="contact-icon"><PhoneCall /></span><div className="contact-detail"><small>Phone</small><span>+977 9825983379</span></div></a>
              <div><span className="contact-icon"><MapPin /></span><div className="contact-detail"><small>Location</small><span>Jhapa, Nepal</span></div></div>
            </div>
            <div className="social-row contact-socials">
              <a href="https://github.com/nischal-niraula21" aria-label="GitHub"><FaGithub /></a>
              <a href="#" aria-label="LinkedIn"><FaLinkedinIn /></a>
              <a href="https://www.facebook.com/share/1NCFKfP5U4/" aria-label="Facebook"><FaFacebookF /></a>
              <a href="#" aria-label="Instagram"><FaInstagram /></a>
            </div>
          </div>

          <div className="contact-form-wrap reveal">
            <div className="contact-form-head">
              <h3>Send Me a Message</h3>
              <p>Have something in mind? Send me a message and I’ll get back to you.</p>
            </div>
            <form className="contact-form" onSubmit={handleContactSubmit}>
              <div className="form-row">
                <div className="form-field"><label htmlFor="name">Your Name</label><input id="name" name="name" autoComplete="name" maxLength="80" required placeholder="Enter your name" /></div>
                <div className="form-field"><label htmlFor="email">Your Email</label><input id="email" name="email" type="email" autoComplete="email" maxLength="160" required placeholder="Enter your email" /></div>
              </div>
              <div className="form-field message-field"><label htmlFor="message">Your Message</label><textarea id="message" name="message" maxLength="3000" required placeholder="Write your message..." /></div>
              <div className="form-honeypot" aria-hidden="true"><label htmlFor="website">Website</label><input id="website" name="website" tabIndex="-1" autoComplete="off" /></div>
              <button type="submit" disabled={contactStatus.type === 'sending'}>{contactStatus.type === 'sending' ? 'Sending…' : 'Send Message'} <Send size={16} /></button>
              {contactStatus.message && <p className={`form-status ${contactStatus.type}`} role="status">{contactStatus.message}</p>}
            </form>
          </div>
        </section>
      </main>

      <footer><p>© 2026 Nischal Niraula. All rights reserved.</p></footer>
      <a href="#home" className="back-top" aria-label="Back to top"><ArrowUp size={18} /></a>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
