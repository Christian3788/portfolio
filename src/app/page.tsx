import React from "react";

interface Project {
  title: string;
  description: string;
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
}

const projects: Project[] = [
  {
    title: "LYRIC – Music Streaming Platform",
    description:
      "Full-stack audio streaming system featuring HTTP 206 partial content range streaming in Go, real-time WebSocket synchronized 'Listen Along' rooms, MinIO object storage, and a Next.js persistent audio player.",
    tags: ["Go", "Next.js", "WebSockets", "MinIO", "Redis", "Prisma"],
    githubUrl: "https://github.com/Christian3788",
  },
  {
    title: "Concurrent TCP Chat Server",
    description:
      "High-throughput multi-client TCP chat engine built with goroutines, custom broadcast protocols, and containerized deployment.",
    tags: ["Go", "Docker", "Networking", "Concurrency"],
    githubUrl: "https://github.com/Christian3788",
  },
  {
    title: "Spatial Risk Analytics Engine",
    description:
      "Geographic vulnerability scoring engine utilizing spatial queries, vulnerability modeling formulas, and PostGIS data layers.",
    tags: ["PostGIS", "Next.js", "Prisma", "TypeScript"],
    githubUrl: "https://github.com/Christian3788",
  },
  {
    title: "Hyperlocal Gift Economy",
    description:
      "Community sharing marketplace platform featuring Dockerized Go microservices, Prisma ORM, and location-aware item exchange.",
    tags: ["Go", "Docker", "Prisma", "REST API"],
    githubUrl: "https://github.com/Christian3788",
  },
];

const skills: string[] = [
  "Go",
  "TypeScript",
  "Next.js",
  "WebSockets",
  "Python",
  "PostgreSQL / PostGIS",
  "Prisma",
  "Docker",
  "Redis",
  "Git & CI/CD",
  "REST APIs",
  "Linux / Shell",
];

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-teal-500 selection:text-slate-950">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-900">
        <nav className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="font-mono font-bold text-teal-400 text-lg tracking-wider">
            CA.dev
          </a>
          <div className="flex items-center gap-6 text-sm font-medium text-slate-300">
            <a href="#about" className="hover:text-teal-400 transition-colors">
              About
            </a>
            <a href="#skills" className="hover:text-teal-400 transition-colors">
              Skills
            </a>
            <a href="#projects" className="hover:text-teal-400 transition-colors">
              Projects
            </a>
            <a href="#contact" className="hover:text-teal-400 transition-colors">
              Contact
            </a>
          </div>
        </nav>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16 space-y-20">
        {/* Hero Section */}
        <section className="space-y-6 pt-4">
          <div className="inline-block px-3 py-1 rounded-full bg-teal-950/70 border border-teal-800/60 text-xs font-mono text-teal-300">
            Available for new opportunities
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Hi, I'm <span className="text-teal-400">Christian Amos</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl leading-relaxed">
            Software engineer focused on scalable backend systems, distributed architectures, spatial data, and modern web applications.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href="#projects"
              className="px-6 py-3 bg-teal-400 text-slate-950 font-semibold rounded-lg hover:bg-teal-300 transition-all shadow-md shadow-teal-950"
            >
              View Projects
            </a>
            <a
              href="https://github.com/Christian3788"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 border border-slate-700 bg-slate-900/50 font-semibold rounded-lg hover:bg-slate-850 hover:border-slate-600 transition-all"
            >
              GitHub Profile
            </a>
            <a
              href="#contact"
              className="px-6 py-3 border border-transparent text-slate-300 hover:text-white transition-colors"
            >
              Get in Touch &rarr;
            </a>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="space-y-4">
          <h2 className="text-2xl font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
            About Me
          </h2>
          <div className="text-slate-400 space-y-4 leading-relaxed">
            <p>
              I build resilient backend microservices, real-time protocols, and data-intensive applications. My workflow balances low-level efficiency with modern full-stack development, ensuring applications are performant, maintainable, and production-ready.
            </p>
            <p>
              Whether engineering low-latency streaming services and concurrent networking applications in Go, modeling complex spatial datasets with PostGIS, or building reactive interfaces with Next.js, I enjoy tackling architectural challenges from end to end.
            </p>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="space-y-4">
          <h2 className="text-2xl font-bold text-white border-b border-slate-800 pb-3">
            Core Technologies
          </h2>
          <div className="flex flex-wrap gap-2.5 pt-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="px-3.5 py-1.5 bg-slate-900/80 border border-slate-800 text-slate-300 rounded-lg text-sm font-mono hover:border-teal-500/50 hover:text-teal-300 transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="space-y-6">
          <h2 className="text-2xl font-bold text-white border-b border-slate-800 pb-3">
            Featured Projects
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {projects.map((proj) => (
              <div
                key={proj.title}
                className="p-6 border border-slate-800/80 rounded-xl bg-slate-900/40 hover:border-slate-700 hover:bg-slate-900/70 transition-all flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl font-semibold text-slate-100">{proj.title}</h3>
                  <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                    {proj.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {proj.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-slate-950 border border-slate-800 text-teal-300 px-2.5 py-1 rounded-md font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between">
                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-semibold text-teal-400 hover:text-teal-300 transition-colors"
                  >
                    View Repository &rarr;
                  </a>
                  {proj.liveUrl && (
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
                    >
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="space-y-6">
          <h2 className="text-2xl font-bold text-white border-b border-slate-800 pb-3">
            Get in Touch
          </h2>
          <p className="text-slate-400 leading-relaxed">
            Interested in collaborating, hiring, or discussing software architecture? Feel free to reach out directly.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="mailto:christianamos67@gmail.com"
              className="px-5 py-2.5 bg-slate-900 border border-slate-700 text-teal-400 font-mono text-sm rounded-lg hover:border-teal-400 transition-colors"
            >
              Send an Email
            </a>
            <a
              href="https://github.com/Christian3788"
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 bg-slate-900 border border-slate-700 text-slate-300 font-mono text-sm rounded-lg hover:border-slate-500 hover:text-white transition-colors"
            >
              GitHub / Christian3788
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-8 mt-20 text-center text-xs text-slate-600">
        <p>© {new Date().getFullYear()} Christian Amos. Built with Next.js & Tailwind CSS.</p>
      </footer>
    </div>
  );
}