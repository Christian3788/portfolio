"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Square,
  Search,
  ExternalLink,
  Layers,
  FileText,
  Mail,
  X,
  FileCode,
  Download,
  Crosshair,
  Compass,
  Atom,
  Binary,
  Dna,
  BookOpen,
  MapPin,
  ArrowUpRight,
  Copy,
  Check,
  Sun,
  Moon,
  Radio,
  BookCheck,
  Terminal,
} from "lucide-react";

// Native SVG for GitHub
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

// Native SVG for LinkedIn
function LinkedinIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.2a1.62 1.62 0 0 0-1.62 1.62c0 .9.72 1.63 1.62 1.63.9 0 1.63-.73 1.63-1.63 0-.9-.73-1.62-1.63-1.62Z" />
    </svg>
  );
}

interface Project {
  id: string;
  title: string;
  description: string;
  context: string;
  tags: string[];
  githubUrl: string;
  cloneCommand: string;
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
      "Audio streaming engine with HTTP 206 partial content streaming, synchronized room playback across clients, and an interactive waveform canvas visualizer.",
    context:
      "Built to stream large audio files with low latency without buffering entire tracks into memory on the server.",
    tags: ["Go", "Next.js", "WebSockets", "MinIO", "Redis", "Prisma"],
    githubUrl: "https://github.com/Christian3788",
    cloneCommand: "git clone https://github.com/Christian3788/lyric.git",
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
      "Geographic vulnerability scoring engine utilizing PostGIS spatial indexing, IPCC vulnerability modeling formulas, and coordinate bounding queries.",
    context:
      "Benchmarked spatial join queries on polygon coordinate sets using GiST indexes to achieve sub-10ms response times.",
    tags: ["PostGIS", "Next.js", "Prisma", "TypeScript"],
    githubUrl: "https://github.com/Christian3788",
    cloneCommand: "git clone https://github.com/Christian3788/spatial-risk.git",
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
    id: "vector-vanguard",
    title: "Vector-Vanguard",
    description:
      "Vector search engine and high-dimensional similarity index built to perform nearest-neighbor lookups, metric space embeddings, and high-throughput vector queries.",
    context:
      "Engineered to explore embedding vector indexing, distance metrics (Cosine, Euclidean), and low-latency nearest-neighbor retrieval pipelines.",
    tags: ["Go", "Python", "Vector Search", "Algorithms", "Docker"],
    githubUrl: "https://github.com/Christian3788/Vector-Vanguard",
    cloneCommand: "git clone https://github.com/Christian3788/Vector-Vanguard.git",
    architecture: {
      diagram: `High-Dim Query Vectors ---> In-Memory Distance Evaluator (Cosine / Dot)
                                        |
                            Hierarchical Graph / Quantized Index
                                        |
                             Top-K Nearest Embeddings Returned`,
      highlights: [
        "High-performance vectorized similarity metrics evaluated across dense numeric vectors.",
        "Optimized memory access patterns and vector partitioning for sub-millisecond query cycles.",
        "Containerized benchmarking harness to stress-test throughput under concurrent read loads.",
      ],
      tradeoffs:
        "Balanced index build speed against query recall by choosing an approximate nearest neighbor (ANN) approach over brute-force exhaustive scanning.",
    },
  },
  {
    id: "kijijishare",
    title: "kijijiShare",
    description:
      "Peer-to-peer hyperlocal resource sharing and item exchange platform built to connect communities with zero-friction item discovery and spatial coordination.",
    context:
      "Built with location-aware radius queries and clean relational schemas to facilitate circular economy exchanges locally.",
    tags: ["TypeScript", "Next.js", "PostgreSQL", "Prisma", "Tailwind CSS"],
    githubUrl: "https://github.com/Christian3788/kijijiShare",
    cloneCommand: "git clone https://github.com/Christian3788/kijijiShare.git",
    architecture: {
      diagram: `User Client ---> Next.js App / API Route ---> PostgreSQL / Prisma
                       |
        Geospatial Radius Filter (Neighborhood Bounds) ---> Direct Peer Coordination`,
      highlights: [
        "Geospatial radius queries to filter available neighborhood assets by user proximity.",
        "Robust relational schemas enforcing atomic reservations and status life cycles.",
        "Lightweight, mobile-first progressive web interface designed for low-bandwidth environments.",
      ],
      tradeoffs:
        "Used transactional PostgreSQL relational models for deterministic reservation guarantees rather than eventual-consistency document stores.",
    },
  },
];

const hobbies = [
  {
    title: "Astrophysical & Numerical Modeling",
    description:
      "Developing simulations from first principles, including N-body gravitational dynamics and relativistic ray-tracing.",
    icon: Atom,
    badge: "Physics Simulation",
  },
  {
    title: "Quantum Simulation & Linear Algebra",
    description:
      "Implementing discrete state-vector engines, unitary gate transformations, and toy quantum algorithm simulators.",
    icon: Binary,
    badge: "Quantum CS",
  },
  {
    title: "Computational Biology & Emergence",
    description:
      "Writing reaction-diffusion solvers and cellular automata to model pattern morphogenesis and complex system dynamics.",
    icon: Dna,
    badge: "Complex Systems",
  },
  {
    title: "Technical Writing & Analytical Philosophy",
    description:
      "Writing long-form essays and speculative fiction grounded in formal logic, information theory, and cosmology.",
    icon: BookOpen,
    badge: "Information Theory",
  },
];

const articles = [
  {
    title: "Implementing HTTP 206 Partial Content in Go for Media Streaming",
    date: "Sep 2026",
    summary:
      "A deep dive into parsing HTTP byte ranges, satisfying Range header bounds, and piping io.ReadSeeker streams safely to avoid memory exhaustion.",
    tags: ["Go", "Streaming", "HTTP"],
    link: "https://dev.to/christian-otieno",
  },
  {
    title: "Architecting Real-Time WebSocket Rooms with Goroutine Hubs",
    date: "Aug 2026",
    summary:
      "Preventing deadlocks and managing slow client write drops in high-throughput fan-out broadcast architectures.",
    tags: ["Concurrency", "Go", "WebSockets"],
    link: "https://dev.to/christian-otieno",
  },
  {
    title: "PostGIS Spatial Indexing: Query Optimization at Scale",
    date: "Jul 2026",
    summary:
      "Benchmarking GiST indexing against R-Tree structures when performing multi-polygon intersections across urban coordinates.",
    tags: ["PostGIS", "Databases"],
    link: "https://dev.to/christian-otieno",
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

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");
  const [selectedModalProject, setSelectedModalProject] = useState<Project | null>(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Audio preview state
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // GIS Interactive Simulator state
  const [gisCoord, setGisCoord] = useState({ x: 50, y: 50 });
  const [gisScore, setGisScore] = useState(0.42);

  // Vector Sandbox State (for Vector-Vanguard modal)
  const [vectorProbe, setVectorProbe] = useState({ x: 140, y: 80 });
  const [activeK, setActiveK] = useState(4);

  // Pre-generated static vector nodes
  const vectorPoints = useMemo(() => {
    const pts = [];
    const seedPoints = [
      [40, 50], [60, 90], [120, 40], [180, 70], [210, 110], [90, 120], [150, 130],
      [240, 60], [80, 30], [170, 45], [130, 95], [260, 120], [50, 140], [220, 30]
    ];
    for (let i = 0; i < seedPoints.length; i++) {
      pts.push({ id: i, x: seedPoints[i][0], y: seedPoints[i][1] });
    }
    return pts;
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Canvas visualizer
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
        ctx.fillStyle = "#2dd4bf";
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
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
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

  const handleGisCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);
    setGisCoord({ x, y });
    const distanceToCore = Math.hypot(x - 50, y - 50);
    const calculatedScore = Math.max(0.12, Number((1 - distanceToCore / 70).toFixed(2)));
    setGisScore(calculatedScore);
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

  // Calculate top-K nearest neighbors dynamically for Vector-Vanguard sandbox
  const sortedNeighbors = useMemo(() => {
    return [...vectorPoints]
      .map((pt) => {
        const dist = Math.hypot(pt.x - vectorProbe.x, pt.y - vectorProbe.y);
        const similarity = Math.max(0, 1 - dist / 200).toFixed(3);
        return { ...pt, dist, similarity };
      })
      .sort((a, b) => a.dist - b.dist);
  }, [vectorPoints, vectorProbe]);

  const nearestIds = useMemo(() => {
    return new Set(sortedNeighbors.slice(0, activeK).map((n) => n.id));
  }, [sortedNeighbors, activeK]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 dark:bg-slate-950 dark:text-slate-100 font-sans selection:bg-teal-500 selection:text-slate-950 antialiased">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-slate-950/80 border-b border-slate-900">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="font-mono font-bold text-base tracking-wider text-teal-400">
            christian.dev
          </a>

          <div className="flex items-center gap-6">
            <nav className="flex items-center gap-5 sm:gap-6 text-sm font-medium text-slate-400">
              <a href="#about" className="hover:text-slate-100 transition">About</a>
              <a href="#projects" className="hover:text-slate-100 transition">Projects</a>
              <a href="#articles" className="hover:text-slate-100 transition hidden sm:inline">Writing</a>
              <a href="#interests" className="hover:text-slate-100 transition hidden md:inline">Interests</a>
              <button onClick={() => setIsResumeOpen(true)} className="hover:text-teal-400 transition">
                Resume
              </button>
              <a href="#contact" className="hover:text-slate-100 transition hidden sm:inline">Contact</a>
            </nav>

            {/* Dark / Light Toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-1.5 rounded-lg border border-slate-800 bg-slate-900 text-slate-400 hover:text-white transition"
                title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
              >
                {theme === "dark" ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-slate-300" />}
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-5xl mx-auto px-6 py-12 space-y-24">
        {/* Engineering Status Ticker (Proof of Continuous Learning) */}
        <section className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <Radio className="w-3.5 h-3.5 text-teal-400 animate-pulse" />
            <span className="text-slate-200 font-semibold uppercase tracking-wider">Active Focus:</span>
            <span className="text-slate-300">Benchmarking HNSW vs. IVF approximate vector index search latency in Go</span>
          </div>
          <div className="flex items-center gap-4 text-slate-500">
            <span className="flex items-center gap-1.5">
              <BookCheck className="w-3.5 h-3.5 text-slate-400" /> Reading: <i>Designing Data-Intensive Applications</i>
            </span>
            <span className="hidden sm:inline border-l border-slate-800 pl-4">Zone01 Apprentice</span>
          </div>
        </section>

        {/* Hero Section */}
        <section className="relative pt-2 pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Bio (7 cols) */}
            <div className="lg:col-span-7 space-y-6 z-10">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono text-teal-400 uppercase tracking-widest">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Kisumu, Kenya • Software Engineer</span>
                </div>
                <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
                  Christian Amos Otieno
                </h1>
              </div>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
                I build reliable backend services, network protocols, and spatial data tools. Most of my work involves writing low-latency systems in <span className="text-white font-medium">Go</span>, optimizing geospatial queries in <span className="text-white font-medium">PostGIS</span>, and building crisp interfaces in <span className="text-white font-medium">Next.js</span>.
              </p>

              <p className="text-sm text-slate-400 leading-relaxed max-w-xl">
                Currently an apprentice at Zone01 Kisumu, exploring real-time streaming architectures, discrete simulation engines, and technical writing on the side.
              </p>

              {/* Clean, intentional button hierarchy */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <a
                  href="#projects"
                  className="px-5 py-2.5 bg-teal-400 text-slate-950 font-semibold rounded-lg hover:bg-teal-300 transition text-sm shadow-sm"
                >
                  Explore Projects
                </a>
                <button
                  onClick={() => setIsResumeOpen(true)}
                  className="px-5 py-2.5 bg-slate-900 border border-slate-800 text-slate-200 font-medium rounded-lg hover:border-slate-700 hover:text-white transition text-sm flex items-center gap-2"
                >
                  <FileCode className="w-4 h-4 text-teal-400" />
                  Resume
                </button>

                {/* Minimalist social links */}
                <div className="flex items-center gap-3 pl-3 border-l border-slate-800 text-slate-400">
                  <a
                    href="https://github.com/Christian3788"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white transition p-1"
                    title="GitHub Profile"
                  >
                    <GithubIcon className="w-5 h-5" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/christian-otieno-9a9806229/"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-sky-400 transition p-1"
                    title="LinkedIn Profile"
                  >
                    <LinkedinIcon className="w-5 h-5" />
                  </a>
                  <a
                    href="https://dev.to/christian-otieno"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-teal-400 transition p-1 text-xs font-mono font-bold"
                    title="DEV.to Articles"
                  >
                    DEV
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Large Seamless Portrait with Radial Fade (5 cols) */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative w-72 h-[420px] sm:w-80 sm:h-[480px] lg:w-[350px] lg:h-[510px]">
                <div
                  className="relative w-full h-full"
                  style={{
                    maskImage: "radial-gradient(ellipse 85% 85% at 50% 45%, black 45%, transparent 95%)",
                    WebkitMaskImage: "radial-gradient(ellipse 85% 85% at 50% 45%, black 45%, transparent 95%)",
                  }}
                >
                  <Image
                    src="/profile.jpg"
                    alt="Christian Amos Otieno"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover object-top filter contrast-[1.03] brightness-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="space-y-4">
          <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-3">
            Engineering Background & Focus
          </h2>
          <div className="text-slate-400 space-y-4 leading-relaxed text-sm sm:text-base max-w-3xl">
            <p>
              My approach to software is centered around mechanical sympathy: understanding how byte buffers flow over sockets, keeping memory footprints deterministic, and making database query plans predictable before reaching for more hardware.
            </p>
            <p>
              Having studied microbiology and biotechnology before transitioning to full-stack engineering, I bring an experimental, first-principles mindset to writing code. Whether profiling vector algorithms, partitioning geospatial indexes in PostGIS, or designing state machines in TypeScript, I focus on building systems that remain clean under load.
            </p>
          </div>
        </section>

        {/* Skills Stack */}
        <section id="skills" className="space-y-4">
          <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-3">
            Core Technologies
          </h2>
          <div className="flex flex-wrap gap-2 pt-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1.5 bg-slate-900 border border-slate-800 text-slate-300 rounded-md text-xs sm:text-sm font-mono hover:border-slate-700 transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Featured Projects */}
        <section id="projects" className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl font-bold text-white">Featured Projects</h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Real code, architectural diagrams, and interactive live sandboxes.
              </p>
            </div>

            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search projects or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-slate-700 font-sans"
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
                    ? "bg-teal-400 text-slate-950 font-bold"
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
                  className="group relative p-6 border border-slate-800/80 rounded-xl bg-slate-900/30 hover:border-slate-700 hover:bg-slate-900/50 transition flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-lg font-bold text-white group-hover:text-teal-400 transition-colors">
                        {proj.title}
                      </h3>

                      {proj.hasAudioVisualizer && (
                        <button
                          onClick={toggleAudioPreview}
                          className={`flex items-center gap-1 px-2.5 py-1 text-xs rounded-full border transition font-mono ${
                            isPlayingAudio
                              ? "bg-rose-950/60 border-rose-800 text-rose-300"
                              : "bg-teal-950/60 border-teal-800/60 text-teal-300 hover:border-teal-700"
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

                    {/* Canvas Waveform Display for LYRIC */}
                    {proj.hasAudioVisualizer && (
                      <div className="mt-3 p-2 bg-slate-950 rounded-lg border border-slate-800/80">
                        <div className="flex justify-between text-[10px] font-mono text-slate-500 mb-1">
                          <span>HTTP 206 Partial Stream</span>
                          <span>{isPlayingAudio ? "Oscillator Active" : "Click 'Play Stream'"}</span>
                        </div>
                        <canvas
                          ref={canvasRef}
                          width={280}
                          height={42}
                          className="w-full h-10 rounded bg-slate-900/50"
                        />
                      </div>
                    )}

                    {/* Interactive GIS Spatial Risk Simulator */}
                    {proj.hasGisSimulator && (
                      <div className="mt-3 p-3 bg-slate-950 rounded-lg border border-slate-800/80 space-y-2">
                        <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
                          <span className="flex items-center gap-1 text-teal-400">
                            <Crosshair className="w-3 h-3" /> Spatial ST_DWithin Query
                          </span>
                          <span>
                            Hazard Score: <b className="text-white">{gisScore}</b>
                          </span>
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
                    <p className="mt-2 text-xs text-slate-500 italic">{proj.context}</p>

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
                      View Architecture &rarr;
                    </button>

                    <div className="flex items-center gap-3">
                      {/* One-click git clone copy */}
                      <button
                        onClick={() => handleCopy(proj.cloneCommand, `clone-${proj.id}`)}
                        className="text-xs font-mono text-slate-500 hover:text-slate-300 flex items-center gap-1 transition"
                        title={proj.cloneCommand}
                      >
                        {copiedKey === `clone-${proj.id}` ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                        <span>{copiedKey === `clone-${proj.id}` ? "Copied" : "Clone"}</span>
                      </button>

                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1 font-medium text-teal-400 hover:underline text-xs font-mono"
                      >
                        Code <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* Technical Writing & Articles */}
        <section id="articles" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-slate-400" /> Engineering Writing & Notes
            </h2>
            <a
              href="https://dev.to/christian-otieno"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-mono text-teal-400 hover:underline flex items-center gap-1"
            >
              dev.to/christian-otieno <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
          <div className="space-y-4">
            {articles.map((art) => (
              <a
                key={art.title}
                href={art.link}
                target="_blank"
                rel="noreferrer"
                className="block p-5 border border-slate-800/80 rounded-xl bg-slate-900/20 hover:border-slate-700 hover:bg-slate-900/40 transition group"
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

        {/* Technical Interests & Research Pursuits */}
        <section id="interests" className="space-y-6">
          <div className="border-b border-slate-800 pb-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Compass className="w-5 h-5 text-slate-400" /> Technical Interests & Modeling Pursuits
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Independent exploration in computational physics, complex systems, discrete algorithms, and formal logic.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {hobbies.map((hobby) => {
              const Icon = hobby.icon;
              return (
                <div
                  key={hobby.title}
                  className="p-5 border border-slate-800/80 rounded-xl bg-slate-900/20 hover:border-slate-700 hover:bg-slate-900/40 transition flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-teal-400" />
                        <h3 className="text-sm sm:text-base font-semibold text-slate-100">
                          {hobby.title}
                        </h3>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-400">
                        {hobby.badge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed mt-2">
                      {hobby.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Interactive Contact Drawer & Instant Email Copier */}
        <section id="contact" className="space-y-4">
          <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-3">Get in Touch</h2>
          <p className="text-slate-400 text-sm max-w-xl">
            Currently open to backend engineering roles, systems contracts, and collaborative research projects.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            {/* Quick Email Copier */}
            <button
              onClick={() => handleCopy("christianamos67@gmail.com", "email-copy")}
              className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 border border-slate-800 rounded-lg text-xs sm:text-sm font-mono text-slate-200 hover:border-slate-700 transition"
            >
              {copiedKey === "email-copy" ? (
                <Check className="w-4 h-4 text-emerald-400" />
              ) : (
                <Mail className="w-4 h-4 text-teal-400" />
              )}
              <span>{copiedKey === "email-copy" ? "Copied Email!" : "christianamos67@gmail.com"}</span>
            </button>

            <a
              href="https://github.com/Christian3788"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 border border-slate-800 rounded-lg text-xs sm:text-sm font-mono text-slate-200 hover:border-slate-700 transition"
            >
              <GithubIcon className="w-4 h-4" /> GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/christian-otieno-9a9806229/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 border border-slate-800 rounded-lg text-xs sm:text-sm font-mono text-slate-200 hover:border-slate-700 transition text-sky-400"
            >
              <LinkedinIcon className="w-4 h-4" /> LinkedIn
            </a>
          </div>
        </section>
      </main>

      {/* Interactive Resume Modal */}
      {isResumeOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-3xl bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs font-mono text-teal-400 uppercase tracking-wider">
                  Curriculum Vitae
                </span>
                <h3 className="text-xl font-bold text-white mt-1">Christian Amos Otieno</h3>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  Full-Stack Software Engineer • +254 713114123 • christianamos67@gmail.com
                </p>
              </div>
              <button
                onClick={() => setIsResumeOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-5 text-sm text-slate-300 max-h-[60vh] overflow-y-auto pr-2 font-sans">
              <div>
                <h4 className="font-semibold text-white uppercase text-xs tracking-wider border-b border-slate-800 pb-1">
                  Professional Summary
                </h4>
                <p className="text-slate-400 mt-2 text-xs leading-relaxed">
                  Adaptive, highly analytical Full-Stack Software Engineer with extensive experience architecting scalable backend systems, high-performance web applications, and database integrations. Specialized in leveraging Go (Golang) for high-concurrency services, network protocols, and core CS optimization alongside modern frontends using TypeScript, Next.js, and Tailwind CSS.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-white uppercase text-xs tracking-wider border-b border-slate-800 pb-1">
                  Technical Skills
                </h4>
                <p className="text-slate-400 mt-2 text-xs leading-relaxed font-mono">
                  <strong className="text-slate-200">Languages:</strong> Go (Golang), TypeScript, JavaScript (ES6+), Python, SQL, HTML5, CSS3<br />
                  <strong className="text-slate-200">Frameworks:</strong> Next.js, React, Node.js, Prisma ORM, NextAuth, Tailwind CSS<br />
                  <strong className="text-slate-200">Databases & DevOps:</strong> PostgreSQL, PostGIS, Redis, Docker, Git, Linux/Bash Scripting
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-white uppercase text-xs tracking-wider border-b border-slate-800 pb-1">
                  Featured Projects
                </h4>
                <div className="space-y-3 mt-2 text-xs text-slate-400">
                  <div>
                    <span className="font-semibold text-white">LYRIC – Real-Time Music Streaming Platform</span>
                    <p className="mt-0.5">
                      Go, Next.js, WebSockets, MinIO S3, Redis, Prisma. HTTP 206 partial content range streaming engine with synchronized group listening rooms.
                    </p>
                  </div>
                  <div>
                    <span className="font-semibold text-white">Spatial Risk Analytics Engine</span>
                    <p className="mt-0.5">
                      PostGIS, Next.js, Prisma, TypeScript. Sub-10ms geometric bounding queries utilizing GiST indexes and IPCC vulnerability scoring formulas.
                    </p>
                  </div>
                  <div>
                    <span className="font-semibold text-white">Vector-Vanguard</span>
                    <p className="mt-0.5">
                      Go, Python, Docker. High-dimensional vector similarity index and nearest-neighbor search engine.
                    </p>
                  </div>
                  <div>
                    <span className="font-semibold text-white">kijijiShare</span>
                    <p className="mt-0.5">
                      Next.js, TypeScript, PostgreSQL, Prisma. Hyperlocal resource sharing and community circular economy exchange platform.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-white uppercase text-xs tracking-wider border-b border-slate-800 pb-1">
                  Professional Experience & Education
                </h4>
                <div className="text-xs text-slate-400 space-y-1 mt-2">
                  <p>
                    <strong className="text-slate-200">Apprentice Software Engineer</strong> – Zone01 Kisumu (2026 – Present)
                  </p>
                  <p>
                    <strong className="text-slate-200">Neuro-Analytics & Brain-Data Integration</strong> – Skills for Africa (2023 – 2024)
                  </p>
                  <p>
                    <strong className="text-slate-200">B.Sc. in Microbiology and Biotechnology</strong> – Aga Khan University (2019 – 2022)
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-slate-800">
              <a
                href="/resume.pdf"
                download="Christian_Amos_Otieno_Resume.pdf"
                className="flex items-center gap-1.5 px-4 py-2 bg-teal-400 text-slate-950 text-xs font-semibold rounded hover:bg-teal-300 transition"
              >
                <Download className="w-3.5 h-3.5" /> Download Official PDF
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

      {/* Interactive Architecture Modal with Dynamic Sandboxes */}
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

            {/* Special Live Sandbox: Vector-Vanguard 2D Nearest-Neighbor Probe */}
            {selectedModalProject.id === "vector-vanguard" && (
              <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-lg space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-slate-300">
                  <span className="flex items-center gap-1.5 text-teal-400">
                    <Terminal className="w-3.5 h-3.5" /> Interactive 2D Embedding Metric Probe
                  </span>
                  <div className="flex items-center gap-2">
                    <span>k-NN:</span>
                    {[3, 4, 6].map((k) => (
                      <button
                        key={k}
                        onClick={() => setActiveK(k)}
                        className={`px-2 py-0.5 rounded text-[10px] ${
                          activeK === k
                            ? "bg-teal-400 text-slate-950 font-bold"
                            : "bg-slate-800 text-slate-400"
                        }`}
                      >
                        {k}
                      </button>
                    ))}
                  </div>
                </div>

                <div
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    setVectorProbe({
                      x: Math.round(e.clientX - rect.left),
                      y: Math.round(e.clientY - rect.top),
                    });
                  }}
                  className="relative h-40 w-full bg-slate-950 rounded border border-slate-800 cursor-crosshair overflow-hidden"
                >
                  {/* Scatter plot points */}
                  {vectorPoints.map((pt) => {
                    const isNear = nearestIds.has(pt.id);
                    return (
                      <div
                        key={pt.id}
                        className={`absolute w-2.5 h-2.5 -ml-1 -mt-1 rounded-full transition-colors ${
                          isNear ? "bg-teal-400 ring-4 ring-teal-400/20" : "bg-slate-600"
                        }`}
                        style={{ left: pt.x, top: pt.y }}
                      />
                    );
                  })}

                  {/* Active query vector probe */}
                  <div
                    className="absolute w-3 h-3 -ml-1.5 -mt-1.5 rounded-full bg-rose-400 border border-white"
                    style={{ left: vectorProbe.x, top: vectorProbe.y }}
                  />
                </div>

                <div className="text-[11px] font-mono text-slate-400 flex justify-between">
                  <span>Hover to move query vector ({vectorProbe.x}, {vectorProbe.y})</span>
                  <span className="text-teal-400">
                    Top similarity: {sortedNeighbors[0]?.similarity || "0.000"}
                  </span>
                </div>
              </div>
            )}

            {/* Special Live Sandbox: LYRIC Byte-Range Buffer Inspector */}
            {selectedModalProject.id === "lyric" && (
              <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-lg space-y-2">
                <span className="text-xs font-mono text-teal-400 block">
                  Chunk Buffer Allocator (64KB Slices)
                </span>
                <div className="grid grid-cols-12 gap-1 h-6">
                  {Array.from({ length: 24 }).map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-full rounded-sm ${
                        idx < 9
                          ? "bg-teal-400/80"
                          : idx === 9
                          ? "bg-teal-400 animate-pulse"
                          : "bg-slate-800"
                      }`}
                      title={`Chunk #${idx} (${idx * 64}KB - ${(idx + 1) * 64}KB)`}
                    />
                  ))}
                </div>
                <div className="flex justify-between text-[10px] font-mono text-slate-500">
                  <span className="text-teal-300">Buffered in Memory: 576 KB</span>
                  <span>Total File Size: 1.54 MB</span>
                </div>
              </div>
            )}

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
      <footer className="border-t border-slate-900 py-8 text-center text-xs font-mono text-slate-500">
        © {new Date().getFullYear()} Christian Amos Otieno. Built with Go, Next.js & Tailwind CSS.
      </footer>
    </div>
  );
}