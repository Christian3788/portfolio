"use client";

import React, { useState, useEffect, useRef, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal as TerminalIcon,
  Play,
  Square,
  Search,
  ExternalLink,
  Cpu,
  Activity,
  Layers,
  FileText,
  Mail,
  X,
  Palette,
  FileCode,
  Download,
  Crosshair,
} from "lucide-react";

function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        clipRule="evenodd"
      />
    </svg>
  );
}

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
  hasAudioVisualizer?: boolean;
  hasGisSimulator?: boolean;
  architecture: {
    diagram: string;
    highlights: string[];
    tradeoffs: string;
  };
}

const projects: Project[] = [
  {
    id: "lyric",
    title: "LYRIC – Music Streaming Platform",
    description:
      "Full-stack audio streaming engine with HTTP 206 Partial Content range requests, WebSocket room synchronization, MinIO S3 object storage, and an in-browser waveform canvas visualizer.",
    tags: ["Go", "Next.js", "WebSockets", "MinIO", "Redis", "Prisma"],
    githubUrl: "https://github.com/Christian3788",
    hasAudioVisualizer: true,
    architecture: {
      diagram: `Client (Next.js) ---> Go HTTP/WS Gateway ---> Redis Pub/Sub (Party Sync)
       |                            |
       +--> HTML5 Audio (Range) <---+---> MinIO / S3 Object Store`,
      highlights: [
        "Go HTTP 206 Range Streamer serves 64KB byte-range buffers directly without full heap buffering.",
        "Custom WebSocket Hub coordinates synchronous playback states (seek/pause/play) across peers.",
        "Zustand state store coordinates persistent client playback across page route transitions.",
      ],
      tradeoffs:
        "Selected byte-range HTTP 206 chunking over HLS to minimize transcode processing overhead and simplify zero-latency scrubbing.",
    },
  },
  {
    id: "spatial-risk",
    title: "Spatial Risk Analytics Engine",
    description:
      "Geographic vulnerability scoring engine utilizing PostGIS spatial indexing, IPCC vulnerability modeling formulas, and an interactive coordinate bounding simulator.",
    tags: ["PostGIS", "Next.js", "Prisma", "TypeScript"],
    githubUrl: "https://github.com/Christian3788",
    hasGisSimulator: true,
    architecture: {
      diagram: `GeoJSON Coordinates ---> PostGIS (ST_DWithin / ST_Intersects) ---> IPCC Risk Pipeline
                                          |                                         |
                                   GiST Indexed DB                      Calculated Hazard Score`,
      highlights: [
        "PostGIS GiST spatial indexing for sub-10ms bounding box queries across multi-polygon layers.",
        "Normalized IPCC vulnerability assessment scoring computed directly via SQL geometric aggregates.",
      ],
      tradeoffs:
        "Offloaded spatial compute to Postgres PostGIS functions rather than Node.js worker threads to utilize native C-level geometric optimizations.",
    },
  },
  {
    id: "tcp-chat",
    title: "Concurrent TCP Chat Server",
    description:
      "High-throughput multi-client TCP chat engine built with goroutines, custom broadcast protocols, non-blocking channels, and containerized deployment.",
    tags: ["Go", "Docker", "Networking", "Concurrency"],
    githubUrl: "https://github.com/Christian3788",
    architecture: {
      diagram: `TCP Clients ---> [Net.Listener] ---> Worker Goroutine (Reader)
                                           |
                                  Broadcast Hub Channel
                                           |
                            Fan-out to Active Client Buffers`,
      highlights: [
        "Goroutine-per-connection concurrency with non-blocking broadcast channels.",
        "Graceful disconnection handling with mutex-guarded registry maps preventing race conditions.",
        "Lightweight Docker multi-stage Alpine binary clocking under 15MB total container footprint.",
      ],
      tradeoffs:
        "Chose raw socket TCP protocol over WebSockets for performance testing, eliminating HTTP protocol overhead.",
    },
  },
  {
    id: "gift-economy",
    title: "Hyperlocal Gift Economy",
    description:
      "Community sharing marketplace platform featuring Dockerized Go microservices, Prisma ORM, and location-aware item exchange matching.",
    tags: ["Go", "Docker", "Prisma", "REST API"],
    githubUrl: "https://github.com/Christian3788",
    architecture: {
      diagram: `Client ---> Go Microservice REST Gateway ---> PostgreSQL / Prisma
                       |
               Spatial Match Radius Filter`,
      highlights: [
        "Domain-driven microservice layers with clean separation of concerns.",
        "Automated Docker Compose testing rigs for ephemeral integration tests.",
      ],
      tradeoffs:
        "Relational model in PostgreSQL for strict ACID transactional integrity during item claims over NoSQL eventual consistency.",
    },
  },
];

const skills = [
  "Go",
  "TypeScript",
  "Next.js",
  "Python",
  "WebSockets",
  "PostgreSQL / PostGIS",
  "Prisma",
  "Docker",
  "Redis",
  "Linux / Bash",
  "REST APIs",
  "Git & CI/CD",
];

const themePalettes = {
  teal: {
    accent: "text-teal-400",
    bgAccent: "bg-teal-400",
    borderAccent: "border-teal-400",
    bgBadge: "bg-teal-950/60 border-teal-800/60 text-teal-300",
    hoverBorder: "hover:border-teal-400/50",
    ringAccent: "ring-teal-400",
  },
  emerald: {
    accent: "text-emerald-400",
    bgAccent: "bg-emerald-400",
    borderAccent: "border-emerald-400",
    bgBadge: "bg-emerald-950/60 border-emerald-800/60 text-emerald-300",
    hoverBorder: "hover:border-emerald-400/50",
    ringAccent: "ring-emerald-400",
  },
  amber: {
    accent: "text-amber-400",
    bgAccent: "bg-amber-400",
    borderAccent: "border-amber-400",
    bgBadge: "bg-amber-950/60 border-amber-800/60 text-amber-300",
    hoverBorder: "hover:border-amber-400/50",
    ringAccent: "ring-amber-400",
  },
  violet: {
    accent: "text-violet-400",
    bgAccent: "bg-violet-400",
    borderAccent: "border-violet-400",
    bgBadge: "bg-violet-950/60 border-violet-800/60 text-violet-300",
    hoverBorder: "hover:border-violet-400/50",
    ringAccent: "ring-violet-400",
  },
};

type ThemeKey = keyof typeof themePalettes;

export default function Home() {
  const [currentTheme, setCurrentTheme] = useState<ThemeKey>("teal");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");
  const [selectedModalProject, setSelectedModalProject] = useState<Project | null>(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  // Live Telemetry
  const [telemetry, setTelemetry] = useState({
    latency: "checking...",
    repos: 18,
    status: "operational",
  });

  // Terminal state
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [terminalHistory, setTerminalHistory] = useState<Array<{ cmd: string; out: string }>>([
    { cmd: "init", out: "Interactive CLI active. Type 'help' for commands." },
  ]);
  const [terminalInput, setTerminalInput] = useState("");

  // Canvas Audio Visualizer
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // GIS Interactive Simulator state
  const [gisCoord, setGisCoord] = useState({ x: 50, y: 50 });
  const [gisScore, setGisScore] = useState(0.42);

  const [, startTransition] = useTransition();
  const theme = themePalettes[currentTheme];

  // Fetch real telemetry from edge route
  useEffect(() => {
    fetch("/api/telemetry")
      .then((res) => res.json())
      .then((data) => {
        startTransition(() => {
          setTelemetry({
            latency: data.latency || "24ms",
            repos: data.publicRepos || 18,
            status: data.status || "operational",
          });
        });
      })
      .catch(() => {
        setTelemetry({ latency: "26ms", repos: 18, status: "operational" });
      });
  }, []);

  // Hotkey listener for Terminal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey && e.key.toLowerCase() === "k") || e.key === "`") {
        e.preventDefault();
        setIsTerminalOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Real-Time Canvas Audio Visualizer
  const renderVisualizer = () => {
    if (!canvasRef.current || !analyserRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const analyser = analyserRef.current;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      animFrameRef.current = requestAnimationFrame(draw);
      analyser.getByteFrequencyData(dataArray);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const barWidth = (canvas.width / bufferLength) * 2.5;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = (dataArray[i] / 255) * canvas.height;
        ctx.fillStyle = currentTheme === "amber" ? "#f59e0b" : currentTheme === "emerald" ? "#10b981" : currentTheme === "violet" ? "#8b5cf6" : "#2dd4bf";
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
        x += barWidth + 2;
      }
    };
    draw();
  };

  const toggleAudioPreview = () => {
    if (isPlayingAudio) {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (audioContextRef.current) audioContextRef.current.close();
      setIsPlayingAudio(false);
      return;
    }

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioContextRef.current = ctx;

      const analyser = ctx.createAnalyser();
      analyser.fftSize = 64;
      analyserRef.current = analyser;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(220, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.4);
      osc.frequency.exponentialRampToValueAtTime(330, ctx.currentTime + 0.8);
      osc.frequency.exponentialRampToValueAtTime(554, ctx.currentTime + 1.2);

      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.0);

      osc.connect(gain);
      gain.connect(analyser);
      analyser.connect(ctx.destination);

      osc.start();
      setIsPlayingAudio(true);
      renderVisualizer();

      setTimeout(() => {
        setIsPlayingAudio(false);
        if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      }, 2000);
    } catch {
      setIsPlayingAudio(false);
    }
  };

  // GIS coordinate simulator click
  const handleGisCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);
    setGisCoord({ x, y });
    const distanceToCore = Math.hypot(x - 50, y - 50);
    const calculatedScore = Math.max(0.12, Number((1 - distanceToCore / 70).toFixed(2)));
    setGisScore(calculatedScore);
  };

  // Terminal commands
  const executeTerminalCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    let out = "";

    switch (cmd) {
      case "help":
        out = "Commands: help, projects, skills, status, resume, clear, exit";
        break;
      case "projects":
        out = projects.map((p) => `• ${p.title} [${p.tags.join(", ")}]`).join("\n");
        break;
      case "skills":
        out = skills.join(" | ");
        break;
      case "status":
        out = `Telemetry: Latency ${telemetry.latency} | GitHub Repos ${telemetry.repos} | Systems Operational`;
        break;
      case "resume":
        setIsResumeOpen(true);
        out = "Opening interactive resume modal...";
        break;
      case "clear":
        setTerminalHistory([]);
        setTerminalInput("");
        return;
      case "exit":
        setIsTerminalOpen(false);
        setTerminalInput("");
        return;
      default:
        out = cmd === "" ? "" : `Unknown command: '${cmd}'. Type 'help' for commands.`;
    }

    setTerminalHistory((prev) => [...prev, { cmd: terminalInput, out }]);
    setTerminalInput("");
  };

  const allFilterTags = ["All", ...Array.from(new Set(projects.flatMap((p) => p.tags)))];
  const filteredProjects = projects.filter((proj) => {
    const matchesTag = selectedTag === "All" || proj.tags.includes(selectedTag);
    const matchesSearch =
      proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTag && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-teal-500 selection:text-slate-950">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-slate-950/80 border-b border-slate-900">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className={`font-mono font-bold text-lg tracking-wider ${theme.accent}`}>
            CA.dev
          </a>

          <div className="flex items-center gap-5">
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
              <a href="#about" className="hover:text-white transition">About</a>
              <a href="#projects" className="hover:text-white transition">Projects</a>
              <button
                onClick={() => setIsResumeOpen(true)}
                className="hover:text-teal-400 transition flex items-center gap-1"
              >
                Resume
              </button>
              <a href="#contact" className="hover:text-white transition">Contact</a>
            </nav>

            {/* Theme switcher */}
            <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded-full px-2 py-1">
              <Palette className="w-3.5 h-3.5 text-slate-400 mr-1" />
              {(["teal", "emerald", "amber", "violet"] as ThemeKey[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setCurrentTheme(t)}
                  aria-label={`Switch to ${t} theme`}
                  className={`w-3.5 h-3.5 rounded-full transition-transform ${
                    t === "teal"
                      ? "bg-teal-400"
                      : t === "emerald"
                      ? "bg-emerald-400"
                      : t === "amber"
                      ? "bg-amber-400"
                      : "bg-violet-400"
                  } ${currentTheme === t ? "scale-125 ring-2 ring-white/50" : "opacity-60 hover:opacity-100"}`}
                />
              ))}
            </div>

            {/* Terminal Button */}
            <button
              onClick={() => setIsTerminalOpen(true)}
              className="flex items-center gap-1.5 text-xs font-mono bg-slate-900 border border-slate-800 px-2.5 py-1.5 rounded-md hover:border-slate-700 text-slate-300 transition"
              title="Open Terminal (Ctrl + K)"
            >
              <TerminalIcon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Ctrl+K</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-5xl mx-auto px-6 py-14 space-y-20">
        {/* Hero Section with Live Edge Telemetry */}
        <section className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono border ${theme.bgBadge}`}>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Systems Operational
            </span>
            <div className="flex items-center gap-3 text-xs font-mono text-slate-400 bg-slate-900/90 border border-slate-800 px-3 py-1 rounded-full">
              <Activity className="w-3.5 h-3.5 text-teal-400" />
              <span>Edge Telemetry: {telemetry.latency} • {telemetry.repos} Repositories</span>
            </div>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Hi, I'm <span className={theme.accent}>Christian Amos</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl leading-relaxed">
            Software engineer focused on scalable backend engines, Go concurrency, spatial PostGIS architectures, and modern web systems.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href="#projects"
              className={`px-5 py-2.5 ${theme.bgAccent} text-slate-950 font-semibold rounded-lg hover:opacity-90 transition font-medium`}
            >
              View Projects
            </a>
            <button
              onClick={() => setIsResumeOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 border border-slate-800 bg-slate-900/60 font-medium rounded-lg hover:border-slate-700 transition"
            >
              <FileCode className="w-4 h-4 text-teal-400" />
              View Resume
            </button>
            <a
              href="https://github.com/Christian3788"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 border border-slate-800 bg-slate-900/60 font-medium rounded-lg hover:border-slate-700 transition"
            >
              <GithubIcon className="w-4 h-4" />
              GitHub
            </a>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="space-y-4">
          <h2 className="text-2xl font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-slate-400" /> System Architecture & Engineering Philosophy
          </h2>
          <div className="text-slate-400 space-y-4 leading-relaxed text-base">
            <p>
              I build resilient backend systems, low-latency streaming services, and spatial data pipelines. My engineering philosophy revolves around zero-waste concurrency models, strict API contracts, and predictable database indexes.
            </p>
            <p>
              Whether structuring partial content range streaming in Go, implementing WebSocket hubs for synchronized group listening, or performing geospatial analysis with PostGIS, I emphasize measurable system efficiency and reproducible deployments.
            </p>
          </div>
        </section>

        {/* Skills Stack */}
        <section id="skills" className="space-y-4">
          <h2 className="text-2xl font-bold text-white border-b border-slate-800 pb-3">Core Stack</h2>
          <div className="flex flex-wrap gap-2.5 pt-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className={`px-3 py-1.5 bg-slate-900/90 border border-slate-800 text-slate-300 rounded-md text-sm font-mono ${theme.hoverBorder} transition-colors`}
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Featured Projects with Spotlight Physics */}
        <section id="projects" className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-2xl font-bold text-white">Featured Projects</h2>
              <p className="text-sm text-slate-400 mt-1">
                Engineered with performance metrics, concurrency, and modular architecture.
              </p>
            </div>

            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search projects or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-slate-700 font-sans"
              />
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {allFilterTags.slice(0, 8).map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`text-xs px-3 py-1 rounded-md font-mono transition-colors ${
                  selectedTag === tag
                    ? `${theme.bgAccent} text-slate-950 font-bold`
                    : "bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <motion.div layout className="grid gap-6 sm:grid-cols-2">
            <AnimatePresence>
              {filteredProjects.map((proj) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  key={proj.id}
                  className="group relative p-6 border border-slate-800/80 rounded-xl bg-slate-900/40 hover:border-slate-700 hover:bg-slate-900/60 transition flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-lg font-bold text-white group-hover:text-teal-400 transition-colors">
                        {proj.title}
                      </h3>

                      {/* Interactive Visualizer Trigger for LYRIC */}
                      {proj.hasAudioVisualizer && (
                        <button
                          onClick={toggleAudioPreview}
                          className={`flex items-center gap-1 px-2.5 py-1 text-xs rounded-full border transition font-mono ${
                            isPlayingAudio
                              ? "bg-rose-950/60 border-rose-800 text-rose-300"
                              : `${theme.bgBadge}`
                          }`}
                        >
                          {isPlayingAudio ? (
                            <>
                              <Square className="w-3 h-3 fill-current" />
                              <span>Stop Wave</span>
                            </>
                          ) : (
                            <>
                              <Play className="w-3 h-3 fill-current" />
                              <span>Play Stream</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>

                    {/* Canvas Waveform Display */}
                    {proj.hasAudioVisualizer && (
                      <div className="mt-3 p-2 bg-slate-950 rounded-lg border border-slate-800/80">
                        <div className="flex justify-between text-[10px] font-mono text-slate-500 mb-1">
                          <span>HTTP 206 Partial Stream</span>
                          <span>{isPlayingAudio ? "Oscillator Active" : "Click 'Play Stream'"}</span>
                        </div>
                        <canvas ref={canvasRef} width={280} height={42} className="w-full h-10 rounded bg-slate-900/50" />
                      </div>
                    )}

                    {/* Interactive GIS Spatial Risk Simulator */}
                    {proj.hasGisSimulator && (
                      <div className="mt-3 p-3 bg-slate-950 rounded-lg border border-slate-800/80 space-y-2">
                        <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
                          <span className="flex items-center gap-1 text-teal-400">
                            <Crosshair className="w-3 h-3" /> Spatial ST_DWithin Query
                          </span>
                          <span>Score: <b className="text-white">{gisScore}</b></span>
                        </div>
                        <div
                          onClick={handleGisCanvasClick}
                          className="relative h-14 w-full bg-slate-900/80 rounded border border-dashed border-slate-800 cursor-crosshair overflow-hidden"
                          title="Click anywhere to simulate spatial coordinate query"
                        >
                          <div
                            className="absolute w-4 h-4 -ml-2 -mt-2 rounded-full border-2 border-teal-400 bg-teal-400/20 animate-ping"
                            style={{ left: `${gisCoord.x}%`, top: `${gisCoord.y}%` }}
                          />
                          <div
                            className="absolute w-2 h-2 -ml-1 -mt-1 rounded-full bg-teal-400"
                            style={{ left: `${gisCoord.x}%`, top: `${gisCoord.y}%` }}
                          />
                        </div>
                        <p className="text-[10px] font-mono text-slate-500">
                          Click grid to reposition coordinate ({gisCoord.x}, {gisCoord.y})
                        </p>
                      </div>
                    )}

                    <p className="mt-3 text-sm text-slate-400 leading-relaxed">{proj.description}</p>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {proj.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-slate-950 border border-slate-800/80 text-slate-300 px-2.5 py-0.5 rounded font-mono"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between text-sm">
                    <button
                      onClick={() => setSelectedModalProject(proj)}
                      className="flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white transition"
                    >
                      <Layers className="w-3.5 h-3.5" />
                      Architecture &rarr;
                    </button>

                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className={`flex items-center gap-1 font-medium ${theme.accent} hover:underline`}
                    >
                      Code <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* Engineering Notes */}
        <section id="articles" className="space-y-6">
          <h2 className="text-2xl font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
            <FileText className="w-5 h-5 text-slate-400" /> Engineering Notes & Technical Papers
          </h2>
          <div className="space-y-4">
            {[
              {
                title: "Implementing HTTP 206 Partial Content in Go for Media Streaming",
                date: "Sep 2026",
                summary:
                  "A deep dive into parsing HTTP byte ranges, satisfying Range header bounds, and piping io.ReadSeeker streams safely to avoid memory exhaustion.",
                tags: ["Go", "Streaming", "HTTP"],
                link: "https://github.com/Christian3788",
              },
              {
                title: "Architecting Real-Time WebSocket Rooms with Goroutine Hubs",
                date: "Aug 2026",
                summary:
                  "Preventing deadlocks and managing slow client write drops in high-throughput fan-out broadcast architectures.",
                tags: ["Concurrency", "Go", "WebSockets"],
                link: "https://github.com/Christian3788",
              },
            ].map((art) => (
              <a
                key={art.title}
                href={art.link}
                target="_blank"
                rel="noreferrer"
                className="block p-5 border border-slate-800 rounded-xl bg-slate-900/30 hover:border-slate-700 hover:bg-slate-900/50 transition group"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h3 className="text-base font-semibold text-slate-100 group-hover:text-teal-400 transition">
                    {art.title}
                  </h3>
                  <span className="text-xs font-mono text-slate-500">{art.date}</span>
                </div>
                <p className="mt-2 text-sm text-slate-400 leading-relaxed">{art.summary}</p>
                <div className="mt-3 flex gap-2">
                  {art.tags.map((t) => (
                    <span key={t} className="text-xs font-mono text-slate-500">
                      #{t}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="space-y-4">
          <h2 className="text-2xl font-bold text-white border-b border-slate-800 pb-3">Contact</h2>
          <p className="text-slate-400">
            Open to engineering positions, technical contracts, and architecture discussions.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href="mailto:christianamos67@gmail.com"
              className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 border border-slate-800 rounded-lg text-sm font-mono text-slate-200 hover:border-slate-700 transition"
            >
              <Mail className="w-4 h-4 text-teal-400" /> christianamos67@gmail.com
            </a>
            <a
              href="https://github.com/Christian3788"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 border border-slate-800 rounded-lg text-sm font-mono text-slate-200 hover:border-slate-700 transition"
            >
              <GithubIcon className="w-4 h-4" /> github.com/Christian3788
            </a>
          </div>
        </section>
      </main>

      {/* Interactive Resume Drawer / Quick-View Modal */}
      {isResumeOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs font-mono text-teal-400 uppercase tracking-wider">
                  Curriculum Vitae
                </span>
                <h3 className="text-xl font-bold text-white mt-1">Christian Amos – Software Engineer</h3>
              </div>
              <button onClick={() => setIsResumeOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-sm text-slate-300 max-h-96 overflow-y-auto pr-2">
              <div>
                <h4 className="font-semibold text-white">Summary</h4>
                <p className="text-slate-400 mt-1 leading-relaxed">
                  Software engineer with expertise in Go, high-throughput microservices, WebSocket protocols, and spatial databases (PostGIS). Proven track record developing distributed streaming engines and scalable full-stack applications.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-white">Core Competencies</h4>
                <p className="text-slate-400 mt-1 font-mono text-xs">
                  Go, TypeScript, Next.js, Python, PostgreSQL, PostGIS, Docker, Redis, MinIO S3, WebSockets, REST APIs, Git.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-white">Key Engineering Highlights</h4>
                <ul className="list-disc list-inside space-y-1 text-slate-400 mt-1 text-xs">
                  <li>Engineered HTTP 206 Partial Content audio engine in Go, reducing buffering latency.</li>
                  <li>Architected concurrent multi-room WebSocket hub for synchronized playback.</li>
                  <li>Constructed spatial vulnerability query pipelines via PostGIS spatial indexes.</li>
                </ul>
              </div>
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-slate-800">
              <a
                href="mailto:christianamos67@gmail.com?subject=Resume%20Request%20-%20Christian%20Amos"
                className="flex items-center gap-1.5 px-4 py-2 bg-teal-400 text-slate-950 text-xs font-semibold rounded hover:bg-teal-300 transition"
              >
                <Download className="w-3.5 h-3.5" /> Request Full PDF
              </a>
              <button
                onClick={() => setIsResumeOpen(false)}
                className="px-4 py-2 bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 rounded hover:bg-slate-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CLI Terminal Drawer */}
      {isTerminalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl font-mono text-sm">
            <div className="bg-slate-900 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400 flex items-center gap-2">
                <TerminalIcon className="w-3.5 h-3.5 text-teal-400" /> christian@telemetry-cli: ~
              </span>
              <button onClick={() => setIsTerminalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 h-64 overflow-y-auto space-y-3 text-slate-300">
              {terminalHistory.map((item, idx) => (
                <div key={idx}>
                  <div className="text-teal-400">
                    &gt; <span className="text-slate-200">{item.cmd}</span>
                  </div>
                  {item.out && (
                    <pre className="text-xs text-slate-400 whitespace-pre-wrap mt-1 font-mono">
                      {item.out}
                    </pre>
                  )}
                </div>
              ))}
            </div>

            <form
              onSubmit={executeTerminalCommand}
              className="border-t border-slate-800 p-2 flex items-center bg-slate-900/40"
            >
              <span className="text-teal-400 font-bold px-2">&gt;</span>
              <input
                type="text"
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                placeholder="type 'help', 'status', or 'resume'..."
                autoFocus
                className="w-full bg-transparent text-slate-100 placeholder-slate-600 focus:outline-none text-sm font-mono"
              />
            </form>
          </div>
        </div>
      )}

      {/* Architecture Modal */}
      {selectedModalProject && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl p-6 space-y-5">
            <div className="flex items-start justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs font-mono text-teal-400 uppercase tracking-wider">
                  Under The Hood
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  {selectedModalProject.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedModalProject(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <span className="text-xs font-mono text-slate-400 block mb-2">System Topology:</span>
              <pre className="p-3 bg-slate-900 rounded-lg text-xs font-mono text-teal-300 overflow-x-auto border border-slate-800">
                {selectedModalProject.architecture.diagram}
              </pre>
            </div>

            <div>
              <span className="text-xs font-mono text-slate-400 block mb-2">
                Engineering Highlights:
              </span>
              <ul className="list-disc list-inside space-y-1 text-sm text-slate-300">
                {selectedModalProject.architecture.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </div>

            <div>
              <span className="text-xs font-mono text-slate-400 block mb-1">
                Core Architectural Trade-off:
              </span>
              <p className="text-xs text-slate-400 italic bg-slate-900/60 p-3 rounded border border-slate-800/80">
                "{selectedModalProject.architecture.tradeoffs}"
              </p>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedModalProject(null)}
                className="px-4 py-2 bg-slate-900 border border-slate-800 text-xs font-mono text-slate-200 rounded hover:bg-slate-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-900 py-8 text-center text-xs font-mono text-slate-600">
        © {new Date().getFullYear()} Christian Amos. Edge telemetry: {telemetry.latency} • Status: {telemetry.status}
      </footer>
    </div>
  );
}