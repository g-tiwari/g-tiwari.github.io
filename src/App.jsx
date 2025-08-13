import React, { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MapPin, Calendar, ExternalLink, List, History, Link as LinkIcon } from "lucide-react"
import ParallaxHero from "./components/ParallaxHero"
import ThemeToggle from "./components/ThemeToggle"
import { asset } from "./lib/asset"

const TIMELINE = [
  { date: "Jan 2025 – Present", title: "Senior Software Development Engineer (SDE‑III), Amazon", location: "San Francisco Bay Area · On‑site",
    bullets: [
      "Led EAA accessibility compliance across React Native and native Android/iOS clients.",
      "Integrated accessibility‑testability tooling for earlier defect detection and faster remediation.",
      "Drove core development and test automation for Bigscreen TV clients (Fire TV, Apple TV, Roku).",
      "Partnered with engineering leadership to align development strategy and automation architecture with the long‑term roadmap.",
      "Built and maintained features across Spring Boot services and front‑end TV clients.",
      "Bootstrapped AI‑driven accessibility documentation with Amazon Q to standardize best practices.",
      "Applied deterministic AI models to enhance E2E testing and auto‑generate unit/integration tests."
    ], links: [] },
  { date: "Sep 2023 – Dec 2024", title: "Senior Software Development Engineer in Test (SDET‑III), Amazon",
    location: "San Francisco Bay Area · On‑site",
    bullets: [
      "Directed cross‑platform automation strategy for React Native and native mobile apps.",
      "Built low‑level white‑box integration test frameworks for deep component validation.",
      "Mentored teams on E2E cross‑platform automation with WebdriverIO + TypeScript; implemented coverage enforcement in CI/CD."
    ], links: [] },
  { date: "Sep 2021 – Sep 2023", title: "Software Development Engineer in Test II (SDET‑II), Amazon",
    location: "San Francisco Bay Area", bullets: [], links: [] },
  { date: "Jan 2021 – Sep 2021", title: "SDET‑II, Amazon", location: "Bengaluru, India · On‑site",
    bullets: [
      "Spearheaded an E2E automation framework in Java + Selenium for a Desktop Music container app (C++ + Vue).",
      "Established CI/CD automation processes and integrated quality gates into build pipelines.",
      "Stack: C++, Core Java, JavaScript, Jenkins."
    ], links: [] },
  { date: "Aug 2017 – Jan 2021", title: "Quality Assurance Engineer II, Amazon", location: "Bangalore · On‑site",
    bullets: [
      "Led test automation for Fire TV and TV application platforms.",
      "Designed Selenium‑based frameworks for web and hybrid apps; championed early automation in new product lines."
    ], links: [] },
  { date: "Jul 2015 – Jul 2017", title: "Automation Quality Engineer II, S&P Global Market Intelligence",
    location: "Gurgaon, India",
    bullets: [
      "Built and maintained automation suites using Selenium, Java, Rest‑Assured, Appium, and SQL Server.",
      "Owned a shared automation framework used by 100+ engineers; managed Bitbucket/Maven reusable repositories.",
      "Deployed infra with 20+ VMs, Selenium Grid, Jenkins; created automation dashboard and documentation."
    ], links: [] },
  { date: "Jan 2015 – Jun 2015", title: "Senior Software Engineer, Optimus Information Inc.", location: "Noida, India · On‑site",
    bullets: [
      "Delivered custom test automation frameworks across web and mobile for multiple client apps.",
      "Led framework selection & implementation (Selenium WebDriver, Appium, Jenkins)."
    ], links: [] },
  { date: "Sep 2012 – Dec 2014", title: "Software Engineer, Optimus Information Inc.", location: "Noida, India · On‑site",
    bullets: [
      "Built and maintained automation frameworks for web and mobile using Selenium and Appium.",
      "Developed reusable testing components to reduce maintenance and speed delivery."
    ], links: [] },
]

const PROJECTS = [
  { title: "VoiceAutomationClient", desc: "Java client that sends TTS or URL playback requests to a remote VoiceAutomationServer for voice UI testing.", tags: ["Java","Testing","TTS"], link: "https://github.com/g-tiwari/VoiceAutomationClient", media: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1600&auto=format&fit=crop" },
  { title: "GoogleVoiceTest", desc: "Sample Selenium tests using VoiceAutomationClient/Server to drive Google Voice interactions.", tags: ["Selenium","Java","Automation"], link: "https://github.com/g-tiwari/GoogleVoiceTest", media: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?q=80&w=1600&auto=format&fit=crop" },
  { title: "AutoEase-Framework", desc: "Experimentation with automation framework patterns and utilities.", tags: ["Java","Framework","Testing"], link: "https://github.com/g-tiwari/AutoEase-Framework", media: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1600&auto=format&fit=crop" },
]

const SKILLS = ["WebdriverIO","Appium","TypeScript","Java","React Native","iOS","Android","Oracle SQL/PLSQL","Accessibility (WCAG/EAA)","CI/CD","AI‑assisted reviews (Amazon Q)"]
const EDUCATION = []
const RESUME_LINK = ""

function Tabs({ tab, setTab }) {
  const items = useMemo(() => ([
    { id: "journey", label: "Journey", icon: History },
    { id: "projects", label: "Projects & Resume", icon: List },
  ]), [])

  return (
    <div className="sticky top-0 z-20 bg-[var(--surface)] backdrop-blur border-b border-token">
      <nav className="mx-auto max-w-4xl px-6 md:px-10 py-3 flex gap-2 items-center justify-between">
        <div className="flex gap-2">
          {items.map(({ id, label, icon: Icon }) => {
            const active = tab === id
            return (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition ${
                  active
                    ? "bg-[var(--tab-active-bg)] text-[var(--tab-active-fg)] shadow"
                    : "bg-surface text-body border border-token hover:bg-surface2"
                }`}
                aria-current={active ? "page" : undefined}
              >
                <Icon size={16} /> {label}
              </button>
            )
          })}
        </div>
        <ThemeToggle />
      </nav>
    </div>
  )
}

function TimelineItem({ item }) {
  return (
    <li className="relative ms-6">
      <span className="absolute -start-3 top-1.5 h-2.5 w-2.5 rounded-full bg-neutral-900 dark:bg-white" />
      <div className="flex flex-wrap items-baseline gap-x-3">
        <div className="text-xs uppercase tracking-wide text-muted flex items-center gap-1">
          <Calendar size={14}/> {item.date}
        </div>
        {item.location && (
          <div className="text-xs text-muted flex items-center gap-1"><MapPin size={14}/> {item.location}</div>
        )}
      </div>
      <h3 className="mt-1 text-xl font-semibold">{item.title}</h3>
      {item.bullets?.length ? (
        <ul className="mt-2 list-disc ps-5 text-neutral-700 dark:text-neutral-300 space-y-1">
          {item.bullets.map((b, i) => <li key={i}>{b}</li>)}
        </ul>
      ) : null}
    </li>
  )
}

function Journey() {
  return (
    <section className="bg-surface text-body">
      <div className="mx-auto w-full max-w-4xl px-6 md:px-10 py-6 md:py-10">
        <header className="mb-8 md:mb-10">
          <h2 className="text-2xl md:text-3xl font-black tracking-tight">Journey</h2>
          <p className="mt-2 text-muted">A chronological look at work, talks, and releases.</p>
        </header>

        {/* === About section on top === */}
        <section aria-labelledby="about-heading" className="mb-10 md:mb-12 rounded-2xl border border-token bg-surface2 p-5 md:p-6">
          <h3 id="about-heading" className="text-xl md:text-2xl font-semibold">About</h3>
          <p className="mt-3 text-neutral-700 dark:text-neutral-300">
            Innovative and results-driven Senior Software Development Engineer (SDE-III) with 13+ years of expertise in
            test automation architecture, cross-platform framework design, and quality engineering leadership across web,
            mobile, desktop, and TV platforms.
          </p>
          <p className="mt-3 text-neutral-700 dark:text-neutral-300">
            Proven track record of delivering scalable, maintainable, and high-coverage automation solutions that accelerate
            release cycles, improve product reliability, and ensure compliance with stringent accessibility standards.
          </p>

        <div className="mt-6">
            <h4 className="text-lg font-semibold">Career Highlights</h4>
            <ul className="mt-3 list-disc ps-5 space-y-2 text-neutral-700 dark:text-neutral-300">
              <li><strong>Leadership &amp; Mentorship:</strong> Guided cross-functional teams, influenced test strategy, and mentored engineers on automation best practices.</li>
              <li><strong>Accessibility Compliance (EAA):</strong> Drove Android, iOS, and React Native accessibility gap remediation; implemented automation tools for accessibility verification.</li>
              <li><strong>React Native Testing:</strong> Architected white-box integration frameworks, enforced code coverage in CI/CD, and built an E2E automation framework in TypeScript with WebdriverIO.</li>
              <li><strong>Framework Design &amp; Architecture:</strong> Created robust automation frameworks for web, mobile, desktop, and TV apps using Selenium WebDriver, WebdriverIO (TypeScript), and low-level integration tools.</li>
              <li><strong>Specialization in Early-Stage Testing:</strong> Expert in embedding quality checks early in the development lifecycle, shifting focus from reactive defect fixing to preventive bug detection.</li>
              <li><strong>Amazon Fire TV &amp; Bigscreen Apps:</strong> Led automation strategy and framework development for Fire TV and TV applications, enabling reliable large-scale deployments.</li>
              <li><strong>Desktop Chrome Container App:</strong> Delivered test automation for hybrid C++ and Vue.js applications with a Selenium-based framework.</li>
            </ul>
          </div>

          <p className="mt-6 text-neutral-700 dark:text-neutral-300">
            I specialize in transforming complex testing challenges into streamlined, automated solutions, enabling teams to ship with speed and confidence.
          </p>
        </section>

        {/* === Timeline === */}
        <ol className="relative border-s border-token space-y-8">
          {TIMELINE.map((item, idx) => <TimelineItem key={idx} item={item} />)}
        </ol>
      </div>
    </section>
  )
}

function ProjectCard({ p }) {
  return (
    <a href={p.link} className="group block rounded-3xl overflow-hidden border border-token bg-surface2 shadow-sm hover:shadow-xl transition">
      <div className="aspect-[4/3] overflow-hidden">
        <img src={p.media} alt={p.title} className="h-full w-full object-cover group-hover:scale-105 transition duration-500" />
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-lg font-semibold">{p.title}</h3>
          <ExternalLink size={18} className="opacity-60 group-hover:opacity-100" />
        </div>
        <p className="mt-2 text-sm text-muted">{p.desc}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {p.tags.map((t) => (
            <span key={t} className="text-[11px] rounded-full border border-token px-2 py-1 text-muted">{t}</span>
          ))}
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-t from-black/40 to-transparent" />
    </a>
  )
}

function ProjectsResume() {
  return (
    <section className="bg-surface text-body">
      <div className="mx-auto w-full max-w-4xl px-6 md:px-10 py-6 md:py-10 space-y-10">
        <header>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight">Projects & Resume</h2>
          <p className="mt-2 text-muted">Open‑source contributions, selected projects, and a compact resume overview.</p>
        </header>

        <div>
          <h3 className="text-lg font-semibold mb-4">Open‑Source & Selected Projects</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PROJECTS.map((p) => <ProjectCard key={p.title} p={p} />)}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {SKILLS.map((s) => (
              <span key={s} className="text-sm rounded-full border border-token px-3 py-1 text-muted">
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="border-t border-token pt-5 flex items-center justify-between flex-wrap gap-3">
          <div className="text-sm text-muted">
            Want the full CV with details and references? Grab the PDF.
          </div>
          <a
            href={RESUME_LINK || "#"}
            className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-medium transition ${RESUME_LINK ? "bg-[var(--accent)] text-[var(--accent-contrast)] hover:brightness-110 ring-2 ring-[var(--ring)] ring-offset-2 ring-offset-[var(--surface)]" : "bg-surface2 text-muted border border-token cursor-not-allowed"}`}
            onClick={(e) => { if (!RESUME_LINK) e.preventDefault() }}
          >
            <ExternalLink size={16} /> Download Resume (PDF)
          </a>
        </div>
      </div>
    </section>
  )
}

export default function App() {
  const [tab, setTab] = useState("journey")
  return (
    <main className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-surface text-body">
      <aside className="relative md:sticky md:top-0 h-[45vh] md:h-screen">
        <ParallaxHero src="images/golden-gate.webp" alt="Golden Gate Bridge in morning fog" speed={0.18} className="h-full">
          <div className="my-4 sm:my-20 sm:mx-8 flex flex-col sm:items-end text-center sm:text-right text-xs sm:text-base">
            <div className="flex flex-col items-center mb-6">
              <img
                alt="Gaurav Tiwari"
                width="128"
                height="128"
                decoding="async"
                className="rounded-full object-cover border-4 border-white/90 mb-4 shadow-[0_10px_40px_rgba(0,0,0,.25)]"
                src={asset('images/profile.jpg')}
              />
              <h1 className="text-2xl sm:text-4xl font-bold text-white">Gaurav Tiwari</h1>
              <p className="mt-3 max-w-xs sm:max-w-md text-white/95">
                Senior Software Development Engineer - (SDE-III) | Test Automation Architect | Accessibility Gap Remediation & Framework Design Expert
              </p>
            </div>
          </div>
        </ParallaxHero>
      </aside>

      <section className="bg-surface text-body">
        <Tabs tab={tab} setTab={setTab} />
        <AnimatePresence mode="wait">
          {tab === "journey" ? (
            <motion.div key="journey" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
              <Journey />
            </motion.div>
          ) : (
            <motion.div key="projects" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
              <ProjectsResume />
            </motion.div>
          )}
        </AnimatePresence>
        <footer className="mx-auto max-w-4xl px-6 py-12 text-sm text-muted">© {new Date().getFullYear()} Gaurav Tiwari</footer>
      </section>
    </main>
  )
}
