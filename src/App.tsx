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

type Lang = "es" | "en";

const translations = {
  es: {
    greeting: "Hola, soy",
    tagline: "Desarrollador Frontend - React & UI.",
    downloadCV: "Descargar CV",
    aboutTitle: "Sobre mí",
    aboutText:
      "Desarrollador Web Frontend con experiencia práctica en React.js, JavaScript, Material UI, HTML y CSS, aplicada en entornos productivos como sistemas CRM para contact centers. He participado en la integración de funcionalidades frontend-backend y en la personalización de Vicidial (PHP) para operaciones reales de call center. Cuento con conocimientos básicos de SQL Server y experiencia en soporte técnico de nivel 1. Actualmente expando mis habilidades hacia backend con Node.js, con enfoque en desarrollo full-stack y mejora continua.",
    projectsTitle: "Proyectos destacados",
    technologies: "Tecnologías:",
    viewDemo: "Ver demo",
    inDevelopment: "En desarrollo",
    certificationsTitle: "Certificaciones",
    viewCert: "Ver certificado",
    contactTitle: "Contáctame",
    darkMode: "Modo oscuro",
    lightMode: "Modo claro",
    prevProject: "Proyecto anterior",
    nextProject: "Proyecto siguiente",
    goToProject: "Ir al proyecto",
    copyEmail: "Copiar email",
    footer: "CV Web",
  },
  en: {
    greeting: "Hi, I'm",
    tagline: "Frontend Developer - React & UI.",
    downloadCV: "Download CV",
    aboutTitle: "About me",
    aboutText:
      "Frontend Web Developer with hands-on experience in React.js, JavaScript, Material UI, HTML and CSS, applied in productive environments such as CRM systems for contact centers. I have participated in frontend-backend functionality integration and in the customization of Vicidial (PHP) for real call center operations. I have basic knowledge of SQL Server and experience in level 1 technical support. I am currently expanding my skills towards backend with Node.js, focusing on full-stack development and continuous improvement.",
    projectsTitle: "Featured projects",
    technologies: "Technologies:",
    viewDemo: "View demo",
    inDevelopment: "In development",
    certificationsTitle: "Certifications",
    viewCert: "View certificate",
    contactTitle: "Contact me",
    darkMode: "Dark mode",
    lightMode: "Light mode",
    prevProject: "Previous project",
    nextProject: "Next project",
    goToProject: "Go to project",
    copyEmail: "Copy email",
    footer: "Web CV",
  },
};

const projects = [
  {
    title: "PulseDesk CRM",
    desc: {
      es: "Landing page de un CRM moderno con diseño limpio y animaciones fluidas.",
      en: "Landing page for a modern CRM with clean design and smooth animations.",
    },
    tech: "React, Vite, Supabase",
    link: "https://xnezx.github.io/pulsedesk-landing/",
    preview: previewPulsedesk,
  },
  {
    title: "Roomigo",
    desc: {
      es: "App para gestionar gastos y tareas compartidas entre los habitantes de un hogar.",
      en: "App to manage shared expenses and tasks among housemates.",
    },
    tech: "React Native",
    link: "#",
    preview: previewRoomigo,
    badge: true,
  },
  {
    title: "CRM Producción",
    desc: {
      es: "Aplicación de métricas con gráficos dinámicos, gestión de cuentas y filtros avanzados.",
      en: "Metrics app with dynamic charts, account management and advanced filters.",
    },
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

function getCarouselPos(index: number, active: number, total: number) {
  const pos = (((index - active) % total) + total) % total;
  if (pos === 0) return { x: 0, scale: 1, opacity: 1, zIndex: 3, rotateY: 0 };
  if (pos === 1)
    return { x: 270, scale: 0.78, opacity: 0.55, zIndex: 2, rotateY: -22 };
  return { x: -270, scale: 0.78, opacity: 0.55, zIndex: 2, rotateY: 22 };
}

function App() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [lang, setLang] = useState<Lang>("es");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light" || savedTheme === "dark") setTheme(savedTheme);
    const savedLang = localStorage.getItem("lang");
    if (savedLang === "es" || savedLang === "en") setLang(savedLang);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  const t = (key: keyof (typeof translations)["es"]) => translations[lang][key];

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  const toggleLang = () => setLang((prev) => (prev === "es" ? "en" : "es"));

  const [activeIndex, setActiveIndex] = useState(1);
  const [openCert, setOpenCert] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const [lightbox, setLightbox] = useState<string | null>(null);

  const copyEmail = () => {
    navigator.clipboard.writeText("danielma1507@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
        <div className="hero-controls">
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={theme === "light" ? t("darkMode") : t("lightMode")}
          >
            {theme === "light" ? (
              <>
                <FaMoon aria-hidden="true" /> {t("darkMode")}
              </>
            ) : (
              <>
                <FaSun aria-hidden="true" /> {t("lightMode")}
              </>
            )}
          </button>
          <button
            className="theme-toggle lang-toggle"
            onClick={toggleLang}
            aria-label="Cambiar idioma"
          >
            {lang === "es" ? "EN" : "ES"}
          </button>
        </div>

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
            {t("greeting")}
          </motion.p>
          <motion.h1 variants={heroItem}>Nestor Daniel Molina</motion.h1>
          <motion.p className="tagline" variants={heroItem}>
            {t("tagline")}
          </motion.p>
          <motion.div className="links" variants={heroItem}>
            <a
              href="/CVNDMA/CV-NestorDanielMolina.pdf"
              download
              className="button outline"
            >
              {t("downloadCV")}
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
        <h2>{t("aboutTitle")}</h2>
        <p>{t("aboutText")}</p>
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
        <h2>{t("projectsTitle")}</h2>
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
                <div className="card-preview-wrapper">
                  <motion.div
                    className="card-preview"
                    whileHover={{ scale: 1.06 }}
                    transition={{ duration: 0.25 }}
                    onClick={() => setLightbox(project.preview)}
                  >
                    <img
                      src={project.preview}
                      alt={`Preview ${project.title}`}
                      className="card-preview-img"
                    />
                  </motion.div>
                  {project.badge && (
                    <span className="card-badge">{t("inDevelopment")}</span>
                  )}
                </div>
                <h3>{project.title}</h3>
                <p>{project.desc[lang]}</p>
                <small>
                  {t("technologies")} {project.tech}
                </small>
                {!project.badge && project.link.startsWith("http") && (
                  <a
                    href={project.link}
                    className="card-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t("viewDemo")}
                  </a>
                )}
              </motion.article>
            );
          })}
        </div>
        <div className="carousel-nav">
          <button
            className="carousel-btn"
            onClick={prev}
            aria-label={t("prevProject")}
          >
            &#8592;
          </button>
          <div className="carousel-dots">
            {projects.map((_, i) => (
              <button
                key={i}
                className={`carousel-dot${i === activeIndex ? " carousel-dot--active" : ""}`}
                onClick={() => setActiveIndex(i)}
                aria-label={`${t("goToProject")} ${i + 1}`}
              />
            ))}
          </div>
          <button
            className="carousel-btn"
            onClick={next}
            aria-label={t("nextProject")}
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
        <h2>{t("certificationsTitle")}</h2>
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
                        {t("viewCert")}
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
        <h2>{t("contactTitle")}</h2>
        <div className="contact-row">
          <div className="social email-row">
            <FaEnvelope aria-hidden="true" />
            <span className="email-text">danielma1507@gmail.com</span>
            <button
              className="copy-btn"
              onClick={copyEmail}
              aria-label={t("copyEmail")}
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

      <footer className="footer">© Nestor Daniel Molina • {t("footer")}</footer>

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
