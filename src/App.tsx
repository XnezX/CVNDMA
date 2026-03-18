import "./App.css";
import heroPng from "./assets/hero.jpeg";
import previewPulsedesk from "./assets/pulsedesk.jpeg";
import previewRoomigo from "./assets/roomigo.jpeg";
import previewDashboard from "./assets/CRMprod.jpeg";
import pdfBackend from "./assets/certificados/Certificado_BootcampdeBackendconPython.pdf?url";
import pdfWeb from "./assets/certificados/Certificado-Curso ProfesionalDesarrolloWeb.pdf?url";
import { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaMoon,
  FaSun,
  FaCopy,
  FaCheck,
} from "react-icons/fa";

const reveal = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const heroContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
};

const heroItem = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const projects = [
  {
    title: "PulseDesk CRM",
    description:
      "Landing page de un CRM moderno con diseño limpio y animaciones fluidas.",
    tech: "React, Vite, Supabase",
    link: "https://xnezx.github.io/pulsedesk-landing/",
    linkText: "Ver demo",
    preview: previewPulsedesk,
  },
  {
    title: "Roomigo",
    description:
      "App para gestionar gastos y tareas compartidas entre los habitantes de un hogar.",
    tech: "React Native",
    link: "#",
    linkText: "En desarrollo",
    preview: previewRoomigo,
  },
  {
    title: "CRM Producción",
    description:
      "Aplicación de métricas con gráficos dinámicos, gestion de cuentas y filtros avanzados.",
    tech: "React, Recharts, Tailwind",
    link: "#",
    preview: previewDashboard,
  },
];

const certifications = [
  {
    title: "Bootcamp de Backend con Python",
    institution: "CodigoFacilito",
    year: "2024",
    pdf: pdfBackend,
  },
  {
    title: "Curso Profesional de Desarrollo Web",
    institution: "CodigoFacilito",
    year: "2024",
    pdf: pdfWeb,
  },
];

function getCarouselPos(index: number, active: number, total: number) {
  const pos = (((index - active) % total) + total) % total;
  if (pos === 0) return { x: 0, scale: 1, opacity: 1, zIndex: 3, rotateY: 0 };
  if (pos === 1)
    return { x: 270, scale: 0.78, opacity: 0.55, zIndex: 2, rotateY: -22 };
  return { x: -270, scale: 0.78, opacity: 0.55, zIndex: 2, rotateY: 22 };
}

function App() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light" || savedTheme === "dark") {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const [activeIndex, setActiveIndex] = useState(1);
  const [openCert, setOpenCert] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("danielma1507@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const prev = () =>
    setActiveIndex((i) => (i - 1 + projects.length) % projects.length);
  const next = () => setActiveIndex((i) => (i + 1) % projects.length);

  const { scrollY } = useScroll();
  const avatarSize = useTransform(scrollY, [0, 280], [200, 110]);
  const avatarBorderRadius = useTransform(scrollY, [0, 280], [16, 50]);
  return (
    <main className="cv-container">
      <section id="hero" className="section hero-section">
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={
            theme === "light" ? "Activar modo oscuro" : "Activar modo claro"
          }
        >
          {theme === "light" ? (
            <>
              <FaMoon aria-hidden="true" /> Modo oscuro
            </>
          ) : (
            <>
              <FaSun aria-hidden="true" /> Modo claro
            </>
          )}
        </button>
        <motion.div
          className="inner"
          initial="hidden"
          animate="visible"
          variants={heroContainer}
        >
          <motion.img
            src={heroPng}
            alt="Nestor Daniel"
            className="avatar"
            variants={heroItem}
            style={{
              width: avatarSize,
              height: avatarSize,
              borderRadius: avatarBorderRadius,
            }}
          />
          <motion.p className="subheadline" variants={heroItem}>
            Hola, soy
          </motion.p>
          <motion.h1 variants={heroItem}>Nestor Daniel Molina</motion.h1>
          <motion.p className="tagline" variants={heroItem}>
            Desarrollador Frontend - React &amp; UI .
          </motion.p>
          <motion.div className="links" variants={heroItem}>
            <a
              href="/CVNDMA/CV-NestorDanielMolina.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="button outline"
            >
              Descargar CV
            </a>
          </motion.div>
        </motion.div>
      </section>

      <motion.section
        id="about"
        className="section"
        whileInView="visible"
        initial="hidden"
        viewport={{ once: true }}
        variants={reveal}
      >
        <h2>Sobre mí</h2>
        <p>
          Desarrollador Web Frontend con experiencia práctica en React.js,
          JavaScript, Material UI, HTML y CSS, aplicada en entornos productivos
          como sistemas CRM para contact centers. He participado en la
          integración de funcionalidades frontend-backend y en la
          personalización de Vicidial (PHP) para operaciones reales de call
          center. Cuento con conocimientos básicos de SQL Server y experiencia
          en soporte técnico de nivel 1. Actualmente expando mis habilidades
          hacia backend con Node.js, con enfoque en desarrollo full-stack y
          mejora continua.
        </p>
        <div className="stack">
          <span>React</span>
          <span>JavaScript</span>
          <span>TypeScript</span>
          <span>HTML</span>
          <span>CSS</span>
          <span>Material UI</span>
          <span>Node.js</span>
          <span>PHP</span>
          <span>SQL Server</span>
          <span>Git</span>
        </div>
      </motion.section>

      <motion.section
        id="projects"
        className="section"
        whileInView="visible"
        initial="hidden"
        viewport={{ once: true }}
        variants={reveal}
      >
        <h2>Proyectos destacados</h2>
        <div className="carousel">
          {projects.map((project, index) => {
            const anim = getCarouselPos(index, activeIndex, projects.length);
            const isActive = index === activeIndex;
            return (
              <motion.article
                key={project.title}
                className={`card carousel-card${isActive ? " card--active" : ""}`}
                animate={anim}
                transition={{ duration: 0.45, ease: "easeInOut" }}
              >
                <motion.div
                  className="card-preview"
                  whileHover={{ scale: 1.06 }}
                  transition={{ duration: 0.25 }}
                  onClick={() => setLightbox(project.preview)}
                >
                  <img
                    src={project.preview}
                    alt={`Preview de ${project.title}`}
                    className="card-preview-img"
                  />
                </motion.div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <small>Tecnologías: {project.tech}</small>
                <a
                  href={project.link}
                  className="card-link"
                  {...(project.link.startsWith("http") && {
                    target: "_blank",
                    rel: "noopener noreferrer",
                  })}
                >
                  {project.linkText}
                </a>
              </motion.article>
            );
          })}
        </div>
        <div className="carousel-nav">
          <button
            className="carousel-btn"
            onClick={prev}
            aria-label="Proyecto anterior"
          >
            &#8592;
          </button>
          <div className="carousel-dots">
            {projects.map((_, i) => (
              <button
                key={i}
                className={`carousel-dot${i === activeIndex ? " carousel-dot--active" : ""}`}
                onClick={() => setActiveIndex(i)}
                aria-label={`Ir al proyecto ${i + 1}`}
              />
            ))}
          </div>
          <button
            className="carousel-btn"
            onClick={next}
            aria-label="Proyecto siguiente"
          >
            &#8594;
          </button>
        </div>
      </motion.section>

      <motion.section
        id="certifications"
        className="section"
        whileInView="visible"
        initial="hidden"
        viewport={{ once: true }}
        variants={reveal}
      >
        <h2>Certificaciones</h2>
        <div className="accordion">
          {certifications.map((cert, i) => {
            const isOpen = openCert === i;
            return (
              <div
                key={i}
                className={`accordion-item${isOpen ? " accordion-item--open" : ""}`}
              >
                <button
                  className="accordion-header"
                  onClick={() => setOpenCert(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <span className="accordion-title">{cert.title}</span>
                  <span className="accordion-meta">
                    {cert.institution} · {cert.year}
                  </span>
                  <motion.span
                    className="accordion-icon"
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    ▼
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      className="accordion-body"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <a
                        href={cert.pdf}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="button"
                      >
                        Ver certificado
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </motion.section>

      <motion.section
        id="contact"
        className="section"
        whileInView="visible"
        initial="hidden"
        viewport={{ once: true }}
        variants={reveal}
      >
        <h2>Contactame</h2>
        <div className="contact-row">
          <div className="social email-row">
            <FaEnvelope aria-hidden="true" />
            <span className="email-text">danielma1507@gmail.com</span>
            <button
              className="copy-btn"
              onClick={copyEmail}
              aria-label="Copiar email"
            >
              {copied ? (
                <FaCheck aria-hidden="true" />
              ) : (
                <FaCopy aria-hidden="true" />
              )}
            </button>
          </div>
          <a
            href="https://github.com/XnezX"
            target="_blank"
            rel="noopener noreferrer"
            className="social"
          >
            <FaGithub aria-hidden="true" /> GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/ndma-"
            target="_blank"
            rel="noopener noreferrer"
            className="social"
          >
            <FaLinkedin aria-hidden="true" /> LinkedIn
          </a>
        </div>
      </motion.section>

      <footer className="footer">© Nestor Daniel Molina • CV Web</footer>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setLightbox(null)}
          >
            <motion.img
              src={lightbox}
              className="lightbox-img"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

export default App;
