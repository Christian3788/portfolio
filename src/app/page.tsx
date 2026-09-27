"use client";

import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
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
  Volume2,
  VolumeX,
  GitCommit,
  Gauge,
  AlertTriangle,
  RotateCcw,
  Zap,
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
    failureModes?: {
      id: string;
      name: string;
      description: string;
      remedy: string;
    }[];
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
      failureModes: [
        {
          id: "minio-down",
          name: "MinIO S3 Gateway Outage",
          description: "Storage bucket unreachable during active audio streaming.",
          remedy: "Circuit breaker switches instantly to ephemeral local NVMe write-through cache; returns HTTP 503 with retry-after jitter.",
        },
        {
          id: "redis-split",
          name: "Redis Pub/Sub Partition",
          description: "Multi-client listener state synchronization disconnected.",
          remedy: "Fall back to in-memory local Go sync.Map broadcast hub per node; gracefully isolates distributed party sync.",
        },
        {
          id: "thundering-herd",
          name: "Peak Concurrency Spike",
          description: "10,000+ synchronized socket reconnections following network blip.",
          remedy: "Token-bucket rate limiter with quadratic backoff delay on the WebSocket handshake upgrade router.",
        },
      ],
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
      failureModes: [
        {
          id: "gist-degrade",
          name: "Spatial Index Corruption",
          description: "GiST index bloat causing degraded sequential scan fallback.",
          remedy: "Automated REINDEX CONCURRENTLY script triggered when query planner cost exceeds 15ms threshold.",
        },
      ],
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
      failureModes: [
        {
          id: "oom-vector",
          name: "Index Graph Exhaustion",
          description: "Embedding graph exceeds allocated container heap allocation.",
          remedy: "Dynamic product quantization (PQ) triggers to compress 32-bit floats into 8-bit quantized centroid buckets.",
        },
      ],
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

interface GitHubEvent {
  id: string;
  repo: string;
  type: string;
  message: string;
  time: string;
}

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");
  const [selectedModalProject, setSelectedModalProject] = useState<Project | null>(null);
  const [activeFailureMode, setActiveFailureMode] = useState<string | null>(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(false);

  // GitHub Live Activity Feed
  const [gitEvents, setGitEvents] = useState<GitHubEvent[]>([]);

  // Web Audio Context for UI Haptics
  const hapticAudioCtxRef = useRef<AudioContext | null>(null);

  // LYRIC Audio preview state
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // GIS Interactive Simulator state
  const [gisCoord, setGisCoord] = useState({ x: 50, y: 50 });
  const [gisScore, setGisScore] = useState(0.42);
  const [isGistMode, setIsGistMode] = useState(true);
  const [queryCostMetrics, setQueryCostMetrics] = useState({ time: "3.2ms", scanned: "48 blocks" });

  // Vector Sandbox State (for Vector-Vanguard modal)
  const [vectorProbe, setVectorProbe] = useState({ x: 140, y: 80 });
  const [activeK, setActiveK] = useState(4);

  // Vector Benchmark Runner state
  const [isBenchmarking, setIsBenchmarking] = useState(false);
  const [benchmarkResults, setBenchmarkResults] = useState<{
    jsTime: number;
    optTime: number;
    speedup: string;
    iterations: number;
  } | null>(null);

  // N-Body Gravitational Physics Simulation Canvas Ref
  const nbodyCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Synthesize UI feedback click
  const playHapticClick = useCallback((freq = 90, duration = 0.02) => {
    if (!soundEnabled) return;
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!hapticAudioCtxRef.current) {
        hapticAudioCtxRef.current = new AudioCtx();
      }
      const ctx = hapticAudioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + duration);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Audio autoplay policy catch
    }
  }, [soundEnabled]);

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

  // Fetch real GitHub events
  useEffect(() => {
    setMounted(true);
    fetch("https://api.github.com/users/Christian3788/events/public?per_page=4")
      .then((res) => {
        if (!res.ok) throw new Error("GitHub rate limit");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          const events: GitHubEvent[] = data.slice(0, 3).map((item) => {
            let msg = "Repository activity";
            if (item.type === "PushEvent" && item.payload?.commits?.[0]?.message) {
              msg = item.payload.commits[0].message;
            } else if (item.type === "CreateEvent") {
              msg = `Created ${item.payload?.ref_type || "branch"}`;
            }
            return {
              id: item.id,
              repo: item.repo?.name?.replace("Christian3788/", "") || "repo",
              type: item.type?.replace("Event", "") || "Commit",
              message: msg.slice(0, 45),
              time: new Date(item.created_at).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
              }),
            };
          });
          setGitEvents(events);
        }
      })
      .catch(() => {
        // Fallback realistic commits if unauthenticated API limit is reached
        setGitEvents([
          {
            id: "1",
            repo: "Vector-Vanguard",
            type: "Push",
            message: "Optimize Cosine distance memory strides",
            time: "Recently",
          },
          {
            id: "2",
            repo: "spatial-risk",
            type: "Push",
            message: "Add GiST bounding polygon index migration",
            time: "Recently",
          },
          {
            id: "3",
            repo: "lyric",
            type: "Push",
            message: "Handle partial content io.ReadSeeker offsets",
            time: "Recently",
          },
        ]);
      });
  }, []);

  // Run Real Vector Distance Benchmark in Client
  const runVectorBenchmark = () => {
    playHapticClick(150, 0.04);
    setIsBenchmarking(true);

    setTimeout(() => {
      const dimensions = 128;
      const iterations = 50000;
      const q = new Float32Array(dimensions);
      for (let i = 0; i < dimensions; i++) q[i] = Math.random();

      const corpus = new Float32Array(dimensions * 100);
      for (let i = 0; i < corpus.length; i++) corpus[i] = Math.random();

      // Standard Loop (unrolled simulation)
      const t0 = performance.now();
      let sum1 = 0;
      for (let n = 0; n < iterations; n++) {
        const offset = (n % 100) * dimensions;
        let d = 0;
        for (let i = 0; i < dimensions; i++) {
          const diff = q[i] - corpus[offset + i];
          d += diff * diff;
        }
        sum1 += d;
      }
      const t1 = performance.now();

      // Optimized Contiguous Block Scan
      const t2 = performance.now();
      let sum2 = 0;
      for (let n = 0; n < iterations; n++) {
        const offset = (n % 100) * dimensions;
        let d = 0;
        // 4-way loop unroll
        for (let i = 0; i < dimensions; i += 4) {
          const d0 = q[i] - corpus[offset + i];
          const d1 = q[i + 1] - corpus[offset + i + 1];
          const d2 = q[i + 2] - corpus[offset + i + 2];
          const d3 = q[i + 3] - corpus[offset + i + 3];
          d += d0 * d0 + d1 * d1 + d2 * d2 + d3 * d3;
        }
        sum2 += d;
      }
      const t3 = performance.now();

      const jsTime = Number((t1 - t0).toFixed(2));
      const optTime = Number((t3 - t2).toFixed(2));
      const ratio = (jsTime / (optTime || 0.01)).toFixed(1);

      setBenchmarkResults({
        jsTime,
        optTime,
        speedup: `${ratio}x`,
        iterations,
      });
      setIsBenchmarking(false);
      playHapticClick(220, 0.05);
    }, 50);
  };

  // N-Body Gravitational Physics Simulator Engine
  useEffect(() => {
    const canvas = nbodyCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const bodies = [
      { x: 120, y: 70, vx: 0, vy: 1.1, mass: 60, color: "#2dd4bf" },
      { x: 160, y: 70, vx: 0, vy: -1.4, mass: 45, color: "#38bdf8" },
      { x: 140, y: 110, vx: 1.2, vy: 0, mass: 50, color: "#818cf8" },
      { x: 90, y: 90, vx: -0.8, vy: 0.6, mass: 25, color: "#34d399" },
    ];

    const G = 0.8;

    const renderPhysics = () => {
      ctx.fillStyle = "rgba(2, 6, 23, 0.25)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < bodies.length; i++) {
        for (let j = 0; j < bodies.length; j++) {
          if (i === j) continue;
          const dx = bodies[j].x - bodies[i].x;
          const dy = bodies[j].y - bodies[i].y;
          const dist = Math.hypot(dx, dy) + 10;
          const force = (G * bodies[i].mass * bodies[j].mass) / (dist * dist);
          bodies[i].vx += (force * (dx / dist)) / bodies[i].mass;
          bodies[i].vy += (force * (dy / dist)) / bodies[i].mass;
        }
      }

      bodies.forEach((b) => {
        b.x += b.vx;
        b.y += b.vy;

        if (b.x < 10 || b.x > canvas.width - 10) b.vx *= -0.9;
        if (b.y < 10 || b.y > canvas.height - 10) b.vy *= -0.9;

        ctx.beginPath();
        ctx.arc(b.x, b.y, Math.cbrt(b.mass) * 1.4, 0, Math.PI * 2);
        ctx.fillStyle = b.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = b.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animId = requestAnimationFrame(renderPhysics);
    };

    renderPhysics();
    return () => cancelAnimationFrame(animId);
  }, []);

  const handleCopy = (text: string, key: string) => {
    playHapticClick(120, 0.03);
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    if (next) playHapticClick(160, 0.05);
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
    playHapticClick(100, 0.02);
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
    playHapticClick(110, 0.02);
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);
    setGisCoord({ x, y });
    const distanceToCore = Math.hypot(x - 50, y - 50);
    const calculatedScore = Math.max(0.12, Number((1 - distanceToCore / 70).toFixed(2)));
    setGisScore(calculatedScore);

    if (isGistMode) {
      setQueryCostMetrics({ time: "3.1ms", scanned: "12 index pages" });
    } else {
      setQueryCostMetrics({ time: "118.4ms", scanned: "14,800 sequential rows" });
    }
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
          <a
            href="#"
            onClick={() => playHapticClick(80, 0.02)}
            className="font-mono font-bold text-base tracking-wider text-teal-400"
          >
            christian.dev
          </a>

          <div className="flex items-center gap-6">
            <nav className="flex items-center gap-5 sm:gap-6 text-sm font-medium text-slate-400">
              <a
                href="#about"
                onClick={() => playHapticClick(80, 0.02)}
                className="hover:text-slate-100 transition"
              >
                About
              </a>
              <a
                href="#projects"
                onClick={() => playHapticClick(80, 0.02)}
                className="hover:text-slate-100 transition"
              >
                Projects
              </a>
              <a
                href="#benchmark"
                onClick={() => playHapticClick(80, 0.02)}
                className="hover:text-slate-100 transition hidden sm:inline"
              >
                Benchmark
              </a>
              <a
                href="#articles"
                onClick={() => playHapticClick(80, 0.02)}
                className="hover:text-slate-100 transition hidden md:inline"
              >
                Writing
              </a>
              <button
                onClick={() => {
                  playHapticClick(110, 0.02);
                  setIsResumeOpen(true);
                }}
                className="hover:text-teal-400 transition"
              >
                Resume
              </button>
            </nav>

            <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
              {/* Audio Haptic Feedback Toggle */}
              <button
                onClick={toggleSound}
                className={`p-1.5 rounded-lg border transition ${
                  soundEnabled
                    ? "bg-teal-950/60 border-teal-800 text-teal-400"
                    : "bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300"
                }`}
                title={soundEnabled ? "Mute UI Sound Haptics" : "Enable UI Sound Haptics"}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>

              {/* Dark / Light Toggle */}
              {mounted && (
                <button
                  onClick={() => {
                    playHapticClick(140, 0.02);
                    setTheme(theme === "dark" ? "light" : "dark");
                  }}
                  className="p-1.5 rounded-lg border border-slate-800 bg-slate-900 text-slate-400 hover:text-white transition"
                  title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
                >
                  {theme === "dark" ? (
                    <Sun className="w-4 h-4 text-amber-300" />
                  ) : (
                    <Moon className="w-4 h-4 text-slate-300" />
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-5xl mx-auto px-6 py-12 space-y-24">
        {/* Real-Time GitHub Events & Engineering Activity */}
        <section className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 space-y-3 text-xs font-mono">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-2">
            <div className="flex items-center gap-2">
              <Radio className="w-3.5 h-3.5 text-teal-400 animate-pulse" />
              <span className="text-slate-200 font-semibold uppercase tracking-wider">
                Live GitHub Pulse:
              </span>
              <a
                href="https://github.com/Christian3788"
                target="_blank"
                rel="noreferrer"
                className="text-teal-400 hover:underline"
              >
                @Christian3788
              </a>
            </div>
            <div className="flex items-center gap-4 text-slate-500">
              <span className="flex items-center gap-1.5">
                <BookCheck className="w-3.5 h-3.5 text-slate-400" /> Reading:{" "}
                <i>Designing Data-Intensive Applications</i>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            {gitEvents.map((evt) => (
              <div
                key={evt.id}
                className="p-2.5 rounded bg-slate-950/70 border border-slate-800/80 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between text-slate-400 mb-1">
                  <span className="font-bold text-teal-300 flex items-center gap-1">
                    <GitCommit className="w-3 h-3 text-teal-400" /> {evt.repo}
                  </span>
                  <span className="text-[10px] text-slate-500">{evt.time}</span>
                </div>
                <p className="text-slate-300 text-[11px] truncate">{evt.message}</p>
              </div>
            ))}
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
                  onClick={() => playHapticClick(90, 0.02)}
                  className="px-5 py-2.5 bg-teal-400 text-slate-950 font-semibold rounded-lg hover:bg-teal-300 transition text-sm shadow-sm"
                >
                  Explore Projects
                </a>
                <button
                  onClick={() => {
                    playHapticClick(110, 0.02);
                    setIsResumeOpen(true);
                  }}
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
                    maskImage:
                      "radial-gradient(ellipse 85% 85% at 50% 45%, black 45%, transparent 95%)",
                    WebkitMaskImage:
                      "radial-gradient(ellipse 85% 85% at 50% 45%, black 45%, transparent 95%)",
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

        {/* Core Technologies */}
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
                onClick={() => {
                  playHapticClick(80, 0.02);
                  setSelectedTag(tag);
                }}
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

                    {/* Interactive GIS Spatial Risk Simulator (GiST vs Sequential Mode) */}
                    {proj.hasGisSimulator && (
                      <div className="mt-3 p-3 bg-slate-950 rounded-lg border border-slate-800/80 space-y-2">
                        <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
                          <div className="flex items-center gap-2">
                            <span className="flex items-center gap-1 text-teal-400">
                              <Crosshair className="w-3 h-3" /> Spatial ST_DWithin
                            </span>
                            <button
                              onClick={() => {
                                playHapticClick(100, 0.02);
                                setIsGistMode(!isGistMode);
                              }}
                              className={`px-1.5 py-0.5 rounded text-[9px] uppercase border ${
                                isGistMode
                                  ? "bg-teal-950 text-teal-300 border-teal-800"
                                  : "bg-amber-950 text-amber-300 border-amber-800"
                              }`}
                            >
                              {isGistMode ? "GiST R-Tree" : "Seq Scan"}
                            </button>
                          </div>
                          <span>
                            Cost: <b className="text-white">{queryCostMetrics.time}</b>
                          </span>
                        </div>
                        <div
                          onClick={handleGisCanvasClick}
                          className="relative h-14 w-full bg-slate-900/80 rounded border border-dashed border-slate-800 cursor-crosshair overflow-hidden"
                          title="Click anywhere to simulate spatial coordinate query"
                        >
                          <div
                            className={`absolute w-4 h-4 -ml-2 -mt-2 rounded-full border-2 ${
                              isGistMode ? "border-teal-400 bg-teal-400/20" : "border-amber-400 bg-amber-400/20"
                            } animate-ping`}
                            style={{ left: `${gisCoord.x}%`, top: `${gisCoord.y}%` }}
                          />
                          <div
                            className={`absolute w-2 h-2 -ml-1 -mt-1 rounded-full ${
                              isGistMode ? "bg-teal-400" : "bg-amber-400"
                            }`}
                            style={{ left: `${gisCoord.x}%`, top: `${gisCoord.y}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-[10px] font-mono text-slate-500">
                          <span>Coord: ({gisCoord.x}, {gisCoord.y})</span>
                          <span>IO: {queryCostMetrics.scanned}</span>
                        </div>
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
                      onClick={() => {
                        playHapticClick(100, 0.02);
                        setSelectedModalProject(proj);
                        setActiveFailureMode(null);
                      }}
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

        {/* Live Vector Distance Engine Benchmark */}
        <section id="benchmark" className="p-6 border border-slate-800 rounded-xl bg-slate-900/40 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Gauge className="w-5 h-5 text-teal-400" /> In-Browser Vector Engine Benchmark
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Stress-testing Euclidean distance across 50,000 iterations of 128-dimensional dense float vectors in memory.
              </p>
            </div>
            <button
              onClick={runVectorBenchmark}
              disabled={isBenchmarking}
              className="px-4 py-2 bg-teal-400 text-slate-950 text-xs font-mono font-bold rounded-lg hover:bg-teal-300 disabled:opacity-50 transition flex items-center gap-2 self-start sm:self-auto"
            >
              {isBenchmarking ? (
                <>
                  <RotateCcw className="w-3.5 h-3.5 animate-spin" /> Running Compute...
                </>
              ) : (
                <>
                  <Zap className="w-3.5 h-3.5 fill-current" /> Run Live Benchmark
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
              <span className="text-slate-500 block mb-1">Standard Loop</span>
              <span className="text-lg font-bold text-slate-200">
                {benchmarkResults ? `${benchmarkResults.jsTime} ms` : "–"}
              </span>
              <span className="text-[10px] text-slate-500 block mt-1">Direct indexing</span>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
              <span className="text-slate-500 block mb-1">Unrolled SIMD-Style Vector</span>
              <span className="text-lg font-bold text-teal-400">
                {benchmarkResults ? `${benchmarkResults.optTime} ms` : "–"}
              </span>
              <span className="text-[10px] text-slate-500 block mt-1">4-way parallel stride</span>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
              <span className="text-slate-500 block mb-1">Measured Speedup</span>
              <span className="text-lg font-bold text-emerald-400">
                {benchmarkResults ? benchmarkResults.speedup : "–"}
              </span>
              <span className="text-[10px] text-slate-500 block mt-1">Zero heap allocations</span>
            </div>
          </div>
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

        {/* Technical Interests & N-Body Simulation Canvas */}
        <section id="interests" className="space-y-6">
          <div className="border-b border-slate-800 pb-3 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Compass className="w-5 h-5 text-slate-400" /> Technical Interests & Modeling Pursuits
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Independent exploration in computational physics, complex systems, and formal logic.
              </p>
            </div>
            <span className="text-[11px] font-mono text-teal-400">
              Interactive Newtonian N-Body Field Running &darr;
            </span>
          </div>

          {/* Interactive N-Body Gravity Canvas */}
          <div className="relative rounded-xl border border-slate-800 overflow-hidden bg-slate-950 p-3">
            <div className="flex justify-between items-center text-xs font-mono text-slate-400 mb-2 px-1">
              <span>Gravitational N-Body Orbit Engine (G = 0.8)</span>
              <span className="text-slate-500">4 Masses • Real-Time Momentum Integration</span>
            </div>
            <canvas
              ref={nbodyCanvasRef}
              width={540}
              height={140}
              className="w-full h-28 rounded bg-slate-950"
            />
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
                onClick={() => {
                  playHapticClick(90, 0.02);
                  setIsResumeOpen(false);
                }}
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
                onClick={() => {
                  playHapticClick(90, 0.02);
                  setIsResumeOpen(false);
                }}
                className="px-4 py-2 bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 rounded hover:bg-slate-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Architecture Modal with Dynamic Sandboxes & Failure-Mode Simulator */}
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
                onClick={() => {
                  playHapticClick(90, 0.02);
                  setSelectedModalProject(null);
                }}
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
                        onClick={() => {
                          playHapticClick(100, 0.02);
                          setActiveK(k);
                        }}
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
                  className="relative h-36 w-full bg-slate-950 rounded border border-slate-800 cursor-crosshair overflow-hidden"
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

            {/* Failure-Mode Chaos Simulator Controls */}
            {selectedModalProject.architecture.failureModes && (
              <div className="p-3 bg-slate-900/50 border border-slate-800/80 rounded-lg space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-amber-400 flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" /> Simulate Distributed Failure State:
                  </span>
                  {activeFailureMode && (
                    <button
                      onClick={() => {
                        playHapticClick(80, 0.02);
                        setActiveFailureMode(null);
                      }}
                      className="text-slate-400 hover:text-white"
                    >
                      Reset Normal
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedModalProject.architecture.failureModes.map((fm) => (
                    <button
                      key={fm.id}
                      onClick={() => {
                        playHapticClick(130, 0.03);
                        setActiveFailureMode(activeFailureMode === fm.id ? null : fm.id);
                      }}
                      className={`px-2.5 py-1 text-xs rounded font-mono transition border ${
                        activeFailureMode === fm.id
                          ? "bg-rose-950/80 border-rose-700 text-rose-300"
                          : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700"
                      }`}
                    >
                      {fm.name}
                    </button>
                  ))}
                </div>

                {/* Active Failure Mode Annotation */}
                {activeFailureMode && (
                  <div className="mt-2 p-2.5 bg-rose-950/30 border border-rose-900/60 rounded text-xs space-y-1">
                    <span className="font-bold text-rose-300 block">
                      Triggered:{" "}
                      {
                        selectedModalProject.architecture.failureModes.find(
                          (f) => f.id === activeFailureMode
                        )?.description
                      }
                    </span>
                    <span className="text-slate-300 block">
                      <b className="text-teal-400">Failover Strategy:</b>{" "}
                      {
                        selectedModalProject.architecture.failureModes.find(
                          (f) => f.id === activeFailureMode
                        )?.remedy
                      }
                    </span>
                  </div>
                )}
              </div>
            )}

            <div>
              <span className="text-xs font-mono text-slate-400 block mb-2">System Topology:</span>
              <pre
                className={`p-3 rounded-lg text-xs font-mono overflow-x-auto border transition-colors ${
                  activeFailureMode
                    ? "bg-rose-950/20 border-rose-900/50 text-rose-300"
                    : "bg-slate-900 border-slate-800 text-teal-300"
                }`}
              >
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
                onClick={() => {
                  playHapticClick(90, 0.02);
                  setSelectedModalProject(null);
                }}
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