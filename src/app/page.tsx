export default function Home() {
  const projects = [
    {
      title: "Concurrent TCP Chat Server",
      description: "High-throughput multi-client TCP chat engine built with goroutines, custom protocols, and broadcast channels.",
      tags: ["Go", "Docker", "Networking"],
      link: "https://github.com/Christian3788",
    },
    {
      title: "Spatial Risk Analytics Engine",
      description: "Geographic vulnerability scoring engine utilizing spatial queries and vulnerability modeling.",
      tags: ["PostGIS", "Next.js", "Prisma"],
      link: "https://github.com/Christian3788",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 px-6 py-16 max-w-4xl mx-auto space-y-16">
      {/* Hero Section */}
      <section className="space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          Hi, I'm <span className="text-teal-400">Christian Amos</span>
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl">
          Software engineer focused on scalable backend systems, distributed architectures, and modern web applications.
        </p>
        <div className="flex gap-4 pt-2">
          <a
            href="#projects"
            className="px-5 py-2.5 bg-teal-400 text-slate-950 font-semibold rounded-lg hover:bg-teal-300 transition"
          >
            View Projects
          </a>
          <a
            href="https://github.com/Christian3788"
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2.5 border border-slate-700 font-semibold rounded-lg hover:bg-slate-900 transition"
          >
            GitHub Profile
          </a>
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
              className="p-6 border border-slate-800 rounded-xl bg-slate-900/40 hover:border-slate-700 transition flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-semibold text-slate-100">{proj.title}</h3>
                <p className="mt-2 text-sm text-slate-400 leading-relaxed">{proj.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {proj.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-slate-800 text-teal-300 px-2.5 py-1 rounded-md font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-6">
                <a
                  href={proj.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-semibold text-teal-400 hover:text-teal-300"
                >
                  View Repository &rarr;
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}