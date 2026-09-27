"use client";

import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { motion, AnimatePresence, useSpring, useMotionValue } from "framer-motion";
import Lenis from "lenis";
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
  Network,
  Command,
  Database,
  Cpu,
  Activity,
  HardDrive,
  Workflow,
  Wifi,
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

// Monospace Glyph Decryptor Component
function ScrambleText({ text, className = "" }: { text: string; className?: string }) {
  const [displayText, setDisplayText] = useState(text);
  const glyphs = "!<>-_\\/[]{}—=+*^?#________0101";

  const scramble = () => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (index < iteration) return text[index];
            return glyphs[Math.floor(Math.random() * glyphs.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }
      iteration += 1 / 2;
    }, 25);
  };

  return (
    <span onMouseEnter={scramble} className={`cursor-default font-mono ${className}`}>
      {displayText}
    </span>
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
    nodes: { id: string; label: string; x: number; y: number; type: "gateway" | "client" | "storage" | "cache" }[];
    connections: { from: string; to: string }[];
    highlights: string[];
    tradeoffs: string;
    failureModes?: {
      id: string;
      name: string;
      affectedNode: string;
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
      nodes: [
        { id: "client", label: "Client (Next.js)", x: 50, y: 70, type: "client" },
        { id: "gateway", label: "Go 206 Gateway", x: 220, y: 70, type: "gateway" },
        { id: "redis", label: "Redis Pub/Sub", x: 390, y: 35, type: "cache" },
        { id: "minio", label: "MinIO S3 Bucket", x: 390, y: 110, type: "storage" },
      ],
      connections: [
        { from: "client", to: "gateway" },
        { from: "gateway", to: "redis" },
        { from: "gateway", to: "minio" },
      ],
      highlights: [
        "Go HTTP 206 Range Streamer serves 64KB byte-range buffers directly without full heap buffering.",
        "Custom WebSocket Hub coordinates synchronous playback states across peers.",
        "Zustand state store coordinates persistent client playback across page route transitions.",
      ],
      tradeoffs:
        "Selected byte-range HTTP 206 chunking over HLS to minimize transcode processing overhead and simplify zero-latency scrubbing.",
      failureModes: [
        {
          id: "minio-down",
          name: "MinIO S3 Gateway Outage",
          affectedNode: "minio",
          description: "Storage bucket unreachable during active audio streaming.",
          remedy: "Circuit breaker switches instantly to local NVMe read-through cache; returns HTTP 503 with retry-after jitter.",
        },
        {
          id: "redis-split",
          name: "Redis Pub/Sub Partition",
          affectedNode: "redis",
          description: "Multi-client listener state synchronization disconnected.",
          remedy: "Fall back to in-memory local Go sync.Map broadcast hub per node; gracefully isolates distributed party sync.",
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
      nodes: [
        { id: "client", label: "GeoJSON Coordinates", x: 50, y: 70, type: "client" },
        { id: "gateway", label: "PostGIS Engine", x: 220, y: 70, type: "gateway" },
        { id: "gist", label: "GiST Spatial Index", x: 390, y: 40, type: "cache" },
        { id: "ipcc", label: "IPCC Scoring Unit", x: 390, y: 110, type: "storage" },
      ],
      connections: [
        { from: "client", to: "gateway" },
        { from: "gateway", to: "gist" },
        { from: "gateway", to: "ipcc" },
      ],
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
          affectedNode: "gist",
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
      nodes: [
        { id: "client", label: "Query Embeddings", x: 50, y: 70, type: "client" },
        { id: "gateway", label: "SIMD Vector Matcher", x: 220, y: 70, type: "gateway" },
        { id: "hnsw", label: "HNSW Graph Index", x: 390, y: 40, type: "cache" },
        { id: "quant", label: "PQ Quantizer", x: 390, y: 110, type: "storage" },
      ],
      connections: [
        { from: "client", to: "gateway" },
        { from: "gateway", to: "hnsw" },
        { from: "gateway", to: "quant" },
      ],
      highlights: [
        "High-performance vectorized similarity metrics evaluated across dense numeric vectors.",
        "Optimized memory access patterns and vector partitioning for sub-millisecond query cycles.",
      ],
      tradeoffs:
        "Balanced index build speed against query recall by choosing an approximate nearest neighbor approach.",
      failureModes: [
        {
          id: "oom-vector",
          name: "Index Graph Exhaustion",
          affectedNode: "hnsw",
          description: "Embedding graph exceeds allocated container heap allocation.",
          remedy: "Dynamic product quantization triggers to compress 32-bit floats into 8-bit quantized centroid buckets.",
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
      nodes: [
        { id: "client", label: "Mobile Client", x: 50, y: 70, type: "client" },
        { id: "gateway", label: "Next.js App Server", x: 220, y: 70, type: "gateway" },
        { id: "db", label: "PostgreSQL Prisma", x: 390, y: 70, type: "storage" },
      ],
      connections: [
        { from: "client", to: "gateway" },
        { from: "gateway", to: "db" },
      ],
      highlights: [
        "Geospatial radius queries to filter available neighborhood assets by user proximity.",
        "Robust relational schemas enforcing atomic reservations and status life cycles.",
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
      "Developing simulations from first principles, including relativistic ray-tracing, N-body dynamics, and gravitational lensing.",
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

  // Velocity-Aware Physics Cursor Spring State
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 350 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);
  const [cursorScale, setCursorScale] = useState(1);

  // Command Palette State
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [commandQuery, setCommandQuery] = useState("");

  // GitHub Live Activity Feed
  const [gitEvents, setGitEvents] = useState<GitHubEvent[]>([]);

  // Web Audio Context for UI Haptics
  const hapticAudioCtxRef = useRef<AudioContext | null>(null);

  // LYRIC Audio preview state & 3D Waterfall Spectrogram
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const waterfallCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // GIS Interactive Simulator state
  const [gisCoord, setGisCoord] = useState({ x: 50, y: 50 });
  const [gisScore, setGisScore] = useState(0.42);
  const [isGistMode, setIsGistMode] = useState(true);
  const [showSqlExplain, setShowSqlExplain] = useState(false);

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

  // Peer Mesh Latency Sandbox state
  const [peerLatency, setPeerLatency] = useState<number | null>(null);
  const [isPingingPeer, setIsPingingPeer] = useState(false);

  // Gravitational Lensing Shader Canvas Ref
  const lensingCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [lensPos, setLensPos] = useState({ x: 180, y: 70 });

  // Starfield Constellation Background Canvas Ref
  const starfieldCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // --- SYSTEM LAB 1: Memory Slab Allocator State ---
  const [memoryHeap, setMemoryHeap] = useState<Array<{ id: number; allocated: boolean; size: number; label?: string }>>(
    () => Array.from({ length: 32 }, (_, i) => ({ id: i, allocated: i % 7 === 0 || i % 11 === 0, size: 64 }))
  );
  const [lastMalloc, setLastMalloc] = useState<string>("0x0480");

  // --- SYSTEM LAB 2: Go Goroutine & Deadlock Simulator ---
  const [channelBuffer, setChannelBuffer] = useState<number[]>([]);
  const [channelCapacity, setChannelCapacity] = useState<number>(2);
  const [goroutineStatus, setGoroutineStatus] = useState<"idle" | "running" | "deadlocked">("idle");
  const [deadlockError, setDeadlockError] = useState<string | null>(null);

  // --- SYSTEM LAB 3: TCP Handshake & Sliding Window ---
  const [tcpState, setTcpState] = useState<"CLOSED" | "SYN_SENT" | "SYN_RECEIVED" | "ESTABLISHED">("CLOSED");
  const [packetLossPct, setPacketLossPct] = useState<number>(0);
  const [cwndSize, setCwndSize] = useState<number>(4);

  // --- SYSTEM LAB 4: Bloom Filter Probe ---
  const [bloomArray, setBloomArray] = useState<number[]>(() => Array.from({ length: 32 }, () => 0));
  const [bloomInput, setBloomInput] = useState<string>("user_token_99");
  const [bloomMatch, setBloomMatch] = useState<boolean | null>(null);

  // Hash functions for Bloom Filter
  const hash1 = (s: string) => {
    let h = 0;
    for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) % 32;
    return Math.abs(h);
  };
  const hash2 = (s: string) => {
    let h = 0;
    for (let i = 0; i < s.length; i++) h = (h * 17 + s.charCodeAt(i)) % 32;
    return Math.abs(h);
  };
  const hash3 = (s: string) => {
    let h = 0;
    for (let i = 0; i < s.length; i++) h = (h * 53 + s.charCodeAt(i)) % 32;
    return Math.abs(h);
  };

  const handleBloomInsert = () => {
    if (!bloomInput.trim()) return;
    const i1 = hash1(bloomInput);
    const i2 = hash2(bloomInput);
    const i3 = hash3(bloomInput);
    setBloomArray((prev) => {
      const next = [...prev];
      next[i1] = 1;
      next[i2] = 1;
      next[i3] = 1;
      return next;
    });
    setBloomMatch(true);
    playHapticClick(180, 0.03);
  };

  const handleBloomCheck = () => {
    const i1 = hash1(bloomInput);
    const i2 = hash2(bloomInput);
    const i3 = hash3(bloomInput);
    const present = bloomArray[i1] === 1 && bloomArray[i2] === 1 && bloomArray[i3] === 1;
    setBloomMatch(present);
    playHapticClick(present ? 200 : 90, 0.04);
  };

  // Memory Allocator actions
  const allocateMemoryBlock = () => {
    playHapticClick(140, 0.02);
    setMemoryHeap((prev) => {
      const next = [...prev];
      const freeIdx = next.findIndex((b) => !b.allocated);
      if (freeIdx !== -1) {
        next[freeIdx] = { ...next[freeIdx], allocated: true, label: "slab_ptr" };
        setLastMalloc(`0x0${(freeIdx * 64).toString(16).toUpperCase()}`);
      }
      return next;
    });
  };

  const freeMemoryBlock = () => {
    playHapticClick(110, 0.02);
    setMemoryHeap((prev) => {
      const next = [...prev];
      const allocIdx = next.findIndex((b) => b.allocated);
      if (allocIdx !== -1) {
        next[allocIdx] = { ...next[allocIdx], allocated: false, label: undefined };
      }
      return next;
    });
  };

  const sweepGarbageCollection = () => {
    playHapticClick(190, 0.04);
    setMemoryHeap((prev) => prev.map((b, i) => (i % 5 === 0 ? { ...b, allocated: false } : b)));
  };

  // Goroutine actions
  const produceChannelMessage = () => {
    playHapticClick(150, 0.02);
    if (channelBuffer.length >= channelCapacity) {
      setGoroutineStatus("deadlocked");
      setDeadlockError("fatal error: all goroutines are asleep - deadlock! Channel send blocked on full buffer.");
      return;
    }
    setGoroutineStatus("running");
    setDeadlockError(null);
    setChannelBuffer((prev) => [...prev, Math.floor(Math.random() * 90 + 10)]);
  };

  const consumeChannelMessage = () => {
    playHapticClick(130, 0.02);
    if (channelBuffer.length === 0) {
      setGoroutineStatus("deadlocked");
      setDeadlockError("runtime block: goroutine 4 [chan receive]: channel is empty without pending producers.");
      return;
    }
    setGoroutineStatus("running");
    setDeadlockError(null);
    setChannelBuffer((prev) => prev.slice(1));
  };

  // TCP Handshake action
  const stepTcpHandshake = () => {
    playHapticClick(160, 0.03);
    if (tcpState === "CLOSED") setTcpState("SYN_SENT");
    else if (tcpState === "SYN_SENT") setTcpState("SYN_RECEIVED");
    else if (tcpState === "SYN_RECEIVED") setTcpState("ESTABLISHED");
    else setTcpState("CLOSED");
  };

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  // Track Mouse Movement for Velocity Physics Cursor
  useEffect(() => {
    let lastX = 0;
    let lastY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const vx = e.clientX - lastX;
      const vy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;

      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const speed = Math.hypot(vx, vy);
      setCursorScale(Math.min(1.7, 1 + speed * 0.015));
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Starfield Constellation Background Loop
  useEffect(() => {
    const canvas = starfieldCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const stars = Array.from({ length: 55 }).map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      radius: Math.random() * 1.2 + 0.5,
    }));

    const render = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "rgba(45, 212, 191, 0.45)";
      stars.forEach((s) => {
        s.x += s.vx;
        s.y += s.vy;
        if (s.x < 0) s.x = canvas.width;
        if (s.x > canvas.width) s.x = 0;
        if (s.y < 0) s.y = canvas.height;
        if (s.y > canvas.height) s.y = 0;

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  // Synthesize UI feedback click
  const playHapticClick = useCallback(
    (freq = 90, duration = 0.02) => {
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
        // Audio autoplay policy fallback
      }
    },
    [soundEnabled]
  );

  // Pre-generated static vector nodes
  const vectorPoints = useMemo(() => {
    const pts = [];
    const seedPoints = [
      [40, 50], [60, 90], [120, 40], [180, 70], [210, 110], [90, 120], [150, 130],
      [240, 60], [80, 30], [170, 45], [130, 95], [260, 120], [50, 140], [220, 30],
    ];
    for (let i = 0; i < seedPoints.length; i++) {
      pts.push({ id: i, x: seedPoints[i][0], y: seedPoints[i][1] });
    }
    return pts;
  }, []);

  // Hotkey listener for Command Palette (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsCommandOpen((prev) => !prev);
        playHapticClick(120, 0.02);
      }
      if (e.key === "Escape") {
        setIsCommandOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [playHapticClick]);

  // Fetch GitHub events
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

  // Gravitational Lensing Canvas Raytracer
  useEffect(() => {
    const canvas = lensingCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const gridSpacing = 16;
    const GM = 1400;

    const renderLensing = () => {
      ctx.fillStyle = "#020617";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let x = gridSpacing; x < canvas.width; x += gridSpacing) {
        for (let y = gridSpacing; y < canvas.height; y += gridSpacing) {
          const dx = x - lensPos.x;
          const dy = y - lensPos.y;
          const dist = Math.hypot(dx, dy) + 0.1;
          const deflection = GM / (dist * dist);
          const drawX = x + (dx / dist) * Math.min(deflection, 45);
          const drawY = y + (dy / dist) * Math.min(deflection, 45);

          ctx.beginPath();
          ctx.arc(drawX, drawY, 1.2, 0, Math.PI * 2);
          ctx.fillStyle = dist < 22 ? "#f43f5e" : "#38bdf8";
          ctx.fill();
        }
      }

      ctx.beginPath();
      ctx.arc(lensPos.x, lensPos.y, 8, 0, Math.PI * 2);
      ctx.fillStyle = "#000000";
      ctx.strokeStyle = "#2dd4bf";
      ctx.lineWidth = 2;
      ctx.fill();
      ctx.stroke();

      animId = requestAnimationFrame(renderLensing);
    };

    renderLensing();
    return () => cancelAnimationFrame(animId);
  }, [lensPos]);

  // Peer Mesh Latency Probe
  const triggerPeerPing = () => {
    playHapticClick(140, 0.03);
    setIsPingingPeer(true);
    const start = performance.now();
    setTimeout(() => {
      const elapsed = Math.round(performance.now() - start + (Math.random() * 8 + 18));
      setPeerLatency(elapsed);
      setIsPingingPeer(false);
      playHapticClick(190, 0.04);
    }, 120);
  };

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

      // Standard Loop
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

  // 3D Audio Spectrum Waterfall & Waveform
  const renderVisualizer = () => {
    if (!canvasRef.current || !analyserRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const waterfallCanvas = waterfallCanvasRef.current;
    const wCtx = waterfallCanvas?.getContext("2d");

    const analyser = analyserRef.current;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      animFrameRef.current = requestAnimationFrame(draw);
      analyser.getByteFrequencyData(dataArray);

      // 2D Frequency Bar
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const barWidth = (canvas.width / bufferLength) * 2.5;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = (dataArray[i] / 255) * canvas.height;
        ctx.fillStyle = "#2dd4bf";
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
        x += barWidth + 2;
      }

      // Rolling Waterfall Spectrogram
      if (waterfallCanvas && wCtx) {
        // Shift existing rows down
        const imgData = wCtx.getImageData(0, 0, waterfallCanvas.width, waterfallCanvas.height - 1);
        wCtx.putImageData(imgData, 0, 1);

        // Draw new top row
        for (let i = 0; i < bufferLength; i++) {
          const val = dataArray[i];
          const hue = 180 + (val / 255) * 120; // Cyan to purple
          wCtx.fillStyle = `hsl(${hue}, 90%, ${val / 5}%)`;
          wCtx.fillRect((i / bufferLength) * waterfallCanvas.width, 0, waterfallCanvas.width / bufferLength + 1, 1);
        }
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
      }, 3500);
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
  };

  const downloadDynamicResume = () => {
    playHapticClick(120, 0.02);
    const resumeText = `CHRISTIAN AMOS OTIENO
Full-Stack Software Engineer | Kisumu, Kenya
Email: christianamos67@gmail.com | Phone: +254 713114123
GitHub: https://github.com/Christian3788 | LinkedIn: https://www.linkedin.com/in/christian-otieno-9a9806229/

TECHNICAL COMPETENCIES:
Languages: Go (Golang), TypeScript, Python, SQL, JavaScript (ES6+)
Databases & Cloud: PostgreSQL, PostGIS, Redis, Docker, MinIO S3, Linux/Bash
Frameworks & Libraries: Next.js, React, Prisma ORM, WebSockets, Tailwind CSS

FEATURED ARCHITECTURES:
- LYRIC (Go, Next.js, WebSockets, MinIO S3): Audio streaming engine with HTTP 206 byte-range buffering.
- Spatial Risk Analytics Engine (PostGIS, Next.js): GiST indexed bounding box spatial queries.
- Vector-Vanguard (Go, Python, Docker): High-dimensional similarity index and nearest-neighbor search.
- kijijiShare (TypeScript, Next.js, PostgreSQL): Hyperlocal circular economy resource platform.

EDUCATION & EXPERIENCE:
- Apprentice Full-Stack Developer – Zone01 Kisumu (2026 - Present)
- Neuro-Analytics & Brain-Data Integration – Skills for Africa (2023 - 2024)
- B.Sc. in Microbiology and Biotechnology – Aga Khan University (2019 - 2022)
`;
    const blob = new Blob([resumeText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Christian_Amos_Otieno_Resume.txt";
    a.click();
    URL.revokeObjectURL(url);
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
    <div className="relative min-h-screen bg-slate-950 text-slate-100 dark:bg-slate-950 dark:text-slate-100 font-sans selection:bg-teal-500 selection:text-slate-950 antialiased overflow-x-hidden">
      {/* Background Starfield Canvas */}
      <canvas
        ref={starfieldCanvasRef}
        className="fixed inset-0 pointer-events-none z-0 opacity-40"
      />

      {/* Velocity-Aware Spring Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none z-50 border border-teal-400/80 bg-teal-400/20 hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          scale: cursorScale,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      {/* Top Navbar */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-slate-950/80 border-b border-slate-900">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <a
            href="#"
            onClick={() => playHapticClick(80, 0.02)}
            className="font-mono font-bold text-base tracking-wider text-teal-400 flex items-center gap-1.5"
          >
            <ScrambleText text="christian.dev" />
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
                href="#systems-lab"
                onClick={() => playHapticClick(80, 0.02)}
                className="hover:text-slate-100 transition hidden sm:inline"
              >
                Systems Lab
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
              {/* Command Palette Trigger */}
              <button
                onClick={() => {
                  playHapticClick(110, 0.02);
                  setIsCommandOpen(true);
                }}
                className="flex items-center gap-1.5 px-2 py-1 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded text-xs font-mono text-slate-400 transition"
                title="Open Command Palette (Ctrl+K)"
              >
                <Command className="w-3.5 h-3.5 text-teal-400" />
                <span className="hidden sm:inline">Ctrl+K</span>
              </button>

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
      <main className="relative z-10 max-w-5xl mx-auto px-6 py-12 space-y-24">
        {/* Real-Time GitHub Events & Edge Peer Ping */}
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

            {/* Peer Mesh Latency Probe Action */}
            <div className="flex items-center gap-3">
              <button
                onClick={triggerPeerPing}
                disabled={isPingingPeer}
                className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-950 border border-slate-800 rounded text-slate-300 hover:border-teal-700 transition"
              >
                <Network className="w-3.5 h-3.5 text-teal-400" />
                <span>
                  {isPingingPeer
                    ? "Pinging Node..."
                    : peerLatency
                    ? `Edge RTT: ${peerLatency}ms`
                    : "Ping Peer Mesh"}
                </span>
              </button>
              <div className="flex items-center gap-1 text-slate-500 hidden sm:flex">
                <BookCheck className="w-3.5 h-3.5 text-slate-400" />
                <span>DDIA (Kleppmann)</span>
              </div>
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
                  <ScrambleText text="Christian Amos Otieno" />
                </h1>
              </div>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
                I build reliable backend services, network protocols, and spatial data tools. Most of my work involves writing low-latency systems in <span className="text-white font-medium">Go</span>, optimizing geospatial queries in <span className="text-white font-medium">PostGIS</span>, and building crisp interfaces in <span className="text-white font-medium">Next.js</span>.
              </p>

              <p className="text-sm text-slate-400 leading-relaxed max-w-xl">
                Currently an apprentice at Zone01 Kisumu, exploring real-time streaming architectures, discrete simulation engines, and technical writing on the side.
              </p>

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

        {/* Core Technologies with Glyph Scramble on Badges */}
        <section id="skills" className="space-y-4">
          <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-3">
            Core Technologies
          </h2>
          <div className="flex flex-wrap gap-2 pt-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1.5 bg-slate-900 border border-slate-800 text-slate-300 rounded-md text-xs sm:text-sm font-mono hover:border-teal-500/50 hover:text-teal-300 transition-colors cursor-default"
              >
                <ScrambleText text={skill} />
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
                        <ScrambleText text={proj.title} />
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

                    {/* Canvas Waveform Display & 3D Waterfall Spectrogram for LYRIC */}
                    {proj.hasAudioVisualizer && (
                      <div className="mt-3 p-2 bg-slate-950 rounded-lg border border-slate-800/80 space-y-2">
                        <div className="flex justify-between text-[10px] font-mono text-slate-500">
                          <span>HTTP 206 Partial Stream</span>
                          <span>{isPlayingAudio ? "FFT Active" : "Click 'Play Stream'"}</span>
                        </div>
                        <canvas
                          ref={canvasRef}
                          width={280}
                          height={30}
                          className="w-full h-8 rounded bg-slate-900/50"
                        />
                        <div className="text-[9px] font-mono text-slate-500 uppercase tracking-wider">
                          3D Spectrum Waterfall (Rolling FFT)
                        </div>
                        <canvas
                          ref={waterfallCanvasRef}
                          width={280}
                          height={50}
                          className="w-full h-12 rounded bg-slate-900/70"
                        />
                      </div>
                    )}

                    {/* Interactive GIS Spatial Risk Simulator */}
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
                          <button
                            onClick={() => {
                              playHapticClick(100, 0.02);
                              setShowSqlExplain(!showSqlExplain);
                            }}
                            className="text-slate-400 hover:text-white flex items-center gap-1"
                          >
                            <Database className="w-3 h-3 text-teal-400" />
                            <span>{showSqlExplain ? "Hide Plan" : "EXPLAIN ANALYZE"}</span>
                          </button>
                        </div>

                        {/* Interactive Click Grid */}
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

                        {/* Expandable SQL Explain Plan */}
                        {showSqlExplain && (
                          <div className="p-2 bg-slate-900 rounded border border-slate-800 text-[10px] font-mono space-y-1">
                            <span className="text-teal-400 block font-bold">PostgreSQL Execution Plan:</span>
                            {isGistMode ? (
                              <pre className="text-slate-300 whitespace-pre-wrap">
                                Bitmap Heap Scan on hazard_polygons (cost=0.28..8.30 rows=12)<br />
                                &nbsp;&nbsp;-&gt; Bitmap Index Scan on idx_hazard_gist<br />
                                Execution Time: 3.12ms | Buffers: shared hit=14
                              </pre>
                            ) : (
                              <pre className="text-amber-300 whitespace-pre-wrap">
                                Seq Scan on hazard_polygons (cost=0.00..1240.00 rows=14800)<br />
                                &nbsp;&nbsp;Filter: ST_DWithin(geom, $1, 5000)<br />
                                Execution Time: 118.40ms | Buffers: shared read=480
                              </pre>
                            )}
                          </div>
                        )}

                        <div className="flex justify-between text-[10px] font-mono text-slate-500">
                          <span>Coord: ({gisCoord.x}, {gisCoord.y})</span>
                          <span>Score: {gisScore}</span>
                        </div>
                      </div>
                    )}

                    <p className="mt-3 text-sm text-slate-400 leading-relaxed">{proj.description}</p>
                    <p className="mt-2 text-xs text-slate-500 italic">{proj.context}</p>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {proj.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-slate-950 border border-slate-800/80 text-slate-300 px-2.5 py-0.5 rounded font-mono hover:border-teal-500/40 transition"
                        >
                          <ScrambleText text={tag} />
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

        {/* --- SYSTEMS LAB: 4 LIVE INTERACTIVE ENGINEERING WORKBENCHES --- */}
        <section id="systems-lab" className="space-y-6">
          <div className="border-b border-slate-800 pb-3 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Cpu className="w-5 h-5 text-teal-400" /> Systems Engineering Interactive Lab
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Live interactive visualizers exploring operating system memory, Go channel concurrency, TCP flow, and probabilistic hashing.
              </p>
            </div>
            <span className="text-[11px] font-mono text-teal-400">Low-Level CS Internals</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* WORKBENCH 1: Virtual Memory Heap Allocator */}
            <div className="p-5 bg-slate-900/40 border border-slate-800 rounded-xl space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="text-teal-400 flex items-center gap-1.5 font-bold">
                    <HardDrive className="w-4 h-4" /> 1. Virtual Memory Slab Allocator
                  </span>
                  <span className="text-slate-500">Ptr: {lastMalloc}</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Contiguous heap allocations with 64-byte alignment headers, showing fragmentation and free list sweeps.
                </p>

                {/* 32 Memory Slabs Grid */}
                <div className="grid grid-cols-8 gap-1.5 p-3 bg-slate-950 rounded-lg border border-slate-800/80 my-3">
                  {memoryHeap.map((slab) => (
                    <div
                      key={slab.id}
                      className={`h-5 rounded-sm transition-all border ${
                        slab.allocated
                          ? "bg-teal-500/80 border-teal-400 shadow-sm shadow-teal-500/20"
                          : "bg-slate-900 border-slate-800"
                      }`}
                      title={`Address: 0x0${(slab.id * 64).toString(16).toUpperCase()} (${
                        slab.allocated ? "ALLOCATED" : "FREE"
                      })`}
                    />
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-xs">
                <button
                  onClick={allocateMemoryBlock}
                  className="px-3 py-1 bg-teal-400 text-slate-950 font-bold rounded hover:bg-teal-300 transition"
                >
                  malloc(64B)
                </button>
                <button
                  onClick={freeMemoryBlock}
                  className="px-3 py-1 bg-slate-800 border border-slate-700 text-slate-300 rounded hover:bg-slate-700 transition"
                >
                  free()
                </button>
                <button
                  onClick={sweepGarbageCollection}
                  className="px-3 py-1 bg-slate-950 border border-slate-800 text-slate-400 rounded hover:text-white transition"
                >
                  gc_sweep()
                </button>
              </div>
            </div>

            {/* WORKBENCH 2: Go Goroutine & Channel Concurrency */}
            <div className="p-5 bg-slate-900/40 border border-slate-800 rounded-xl space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="text-teal-400 flex items-center gap-1.5 font-bold">
                    <Workflow className="w-4 h-4" /> 2. Go Channel Deadlock Simulator
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] uppercase font-mono ${
                      goroutineStatus === "deadlocked"
                        ? "bg-rose-950 border border-rose-800 text-rose-300 animate-pulse"
                        : "bg-slate-800 text-teal-300"
                    }`}
                  >
                    {goroutineStatus}
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Worker goroutines reading and writing to a synchronized Go channel (`ch := make(chan int, {channelCapacity})`).
                </p>

                {/* Channel Buffer Visualizer */}
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800/80 my-3 flex items-center justify-between font-mono text-xs">
                  <span className="text-slate-500">Producer &rarr;</span>
                  <div className="flex gap-2">
                    {Array.from({ length: channelCapacity }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-10 h-8 rounded border flex items-center justify-center font-bold transition-all ${
                          channelBuffer[i] !== undefined
                            ? "bg-teal-950 border-teal-500 text-teal-300"
                            : "bg-slate-900 border-slate-800 text-slate-600"
                        }`}
                      >
                        {channelBuffer[i] ?? "∅"}
                      </div>
                    ))}
                  </div>
                  <span className="text-slate-500">&rarr; Consumer</span>
                </div>

                {deadlockError && (
                  <p className="text-[11px] font-mono text-rose-400 bg-rose-950/30 p-2 rounded border border-rose-900/60">
                    {deadlockError}
                  </p>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-xs">
                <button
                  onClick={produceChannelMessage}
                  className="px-3 py-1 bg-teal-400 text-slate-950 font-bold rounded hover:bg-teal-300 transition"
                >
                  ch &lt;- val
                </button>
                <button
                  onClick={consumeChannelMessage}
                  className="px-3 py-1 bg-slate-800 border border-slate-700 text-slate-300 rounded hover:bg-slate-700 transition"
                >
                  &lt;- ch
                </button>
                <button
                  onClick={() => {
                    setChannelBuffer([]);
                    setGoroutineStatus("idle");
                    setDeadlockError(null);
                  }}
                  className="px-3 py-1 bg-slate-950 border border-slate-800 text-slate-400 rounded hover:text-white transition"
                >
                  Reset Hub
                </button>
              </div>
            </div>

            {/* WORKBENCH 3: TCP Handshake & Sliding Window */}
            <div className="p-5 bg-slate-900/40 border border-slate-800 rounded-xl space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="text-teal-400 flex items-center gap-1.5 font-bold">
                    <Wifi className="w-4 h-4" /> 3. TCP 3-Way Handshake Pipeline
                  </span>
                  <span className="text-slate-500">State: {tcpState}</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  SYN / SYN-ACK / ACK progression stepping through congestion window controls and socket lifecycles.
                </p>

                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800/80 my-3 font-mono text-xs space-y-2">
                  <div className="flex justify-between items-center text-slate-400">
                    <span className="text-teal-400 font-bold">CLIENT</span>
                    <span className="text-slate-500">Socket Protocol Stream</span>
                    <span className="text-sky-400 font-bold">SERVER</span>
                  </div>
                  <div className="h-10 border border-dashed border-slate-800 rounded flex items-center justify-center text-slate-300">
                    {tcpState === "CLOSED" && "Socket Inactive (CLOSED)"}
                    {tcpState === "SYN_SENT" && "Client &rarr; [SYN Seq=100] &rarr; Server"}
                    {tcpState === "SYN_RECEIVED" && "Server &rarr; [SYN-ACK Seq=300 Ack=101] &rarr; Client"}
                    {tcpState === "ESTABLISHED" && "Connection Open: [ACK Seq=101 Ack=301] • ESTABLISHED"}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 font-mono text-xs">
                <button
                  onClick={stepTcpHandshake}
                  className="px-3 py-1 bg-teal-400 text-slate-950 font-bold rounded hover:bg-teal-300 transition"
                >
                  Step Handshake &rarr;
                </button>
                <span className="text-[11px] text-slate-500">cwnd = {cwndSize} MSS</span>
              </div>
            </div>

            {/* WORKBENCH 4: Bloom Filter Set Membership Probe */}
            <div className="p-5 bg-slate-900/40 border border-slate-800 rounded-xl space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="text-teal-400 flex items-center gap-1.5 font-bold">
                    <Binary className="w-4 h-4" /> 4. Probabilistic Bloom Filter Probe
                  </span>
                  <span className="text-slate-500">32-bit Array (k=3)</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Calculates 3 modulo hash offsets per key to guarantee zero false-negatives before hitting disk.
                </p>

                {/* 32 Bits Array */}
                <div className="grid grid-cols-16 gap-1 p-2 bg-slate-950 rounded-lg border border-slate-800/80 my-3">
                  {bloomArray.map((bit, idx) => (
                    <div
                      key={idx}
                      className={`h-4 rounded-[2px] transition-all flex items-center justify-center text-[9px] font-mono ${
                        bit === 1 ? "bg-teal-400 text-slate-950 font-bold" : "bg-slate-900 text-slate-600"
                      }`}
                      title={`Bit #${idx}: ${bit}`}
                    >
                      {bit}
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={bloomInput}
                    onChange={(e) => setBloomInput(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1 text-xs font-mono text-slate-200 focus:outline-none"
                    placeholder="Enter key to hash..."
                  />
                  {bloomMatch !== null && (
                    <span
                      className={`text-[10px] font-mono px-2 py-1 rounded whitespace-nowrap ${
                        bloomMatch ? "bg-emerald-950 text-emerald-300" : "bg-rose-950 text-rose-300"
                      }`}
                    >
                      {bloomMatch ? "Probably In Set" : "Definitely NOT"}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1 font-mono text-xs">
                <button
                  onClick={handleBloomInsert}
                  className="px-3 py-1 bg-teal-400 text-slate-950 font-bold rounded hover:bg-teal-300 transition"
                >
                  Insert Key
                </button>
                <button
                  onClick={handleBloomCheck}
                  className="px-3 py-1 bg-slate-800 border border-slate-700 text-slate-300 rounded hover:bg-slate-700 transition"
                >
                  Check Key
                </button>
              </div>
            </div>
          </div>
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
                    <ScrambleText text={art.title} />
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

        {/* Technical Interests & Gravitational Lensing Shader Canvas */}
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
              Interactive Gravitational Lensing (Drag to Lens) &darr;
            </span>
          </div>

          {/* Gravitational Lensing Raytracer Canvas */}
          <div
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setLensPos({
                x: Math.round(e.clientX - rect.left),
                y: Math.round(e.clientY - rect.top),
              });
            }}
            className="relative rounded-xl border border-slate-800 overflow-hidden bg-slate-950 p-3 cursor-move"
          >
            <div className="flex justify-between items-center text-xs font-mono text-slate-400 mb-2 px-1">
              <span>Relativistic Light Deflection Raytracer (alpha = 4GM / c^2 xi)</span>
              <span className="text-slate-500">Lens Pos: ({lensPos.x}, {lensPos.y})</span>
            </div>
            <canvas
              ref={lensingCanvasRef}
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

      {/* Global Interactive Command Palette (Ctrl+K / Cmd+K) */}
      {isCommandOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-start justify-center pt-24 p-4">
          <div className="w-full max-w-lg bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl font-mono text-xs">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-800 bg-slate-900/60">
              <Command className="w-4 h-4 text-teal-400" />
              <input
                type="text"
                value={commandQuery}
                onChange={(e) => setCommandQuery(e.target.value)}
                placeholder="Jump to section, filter tech, or run command..."
                autoFocus
                className="w-full bg-transparent text-slate-100 placeholder-slate-500 focus:outline-none"
              />
              <button
                onClick={() => setIsCommandOpen(false)}
                className="text-slate-500 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-2 max-h-72 overflow-y-auto space-y-1">
              <span className="text-[10px] text-slate-500 px-3 uppercase tracking-wider block py-1">
                Navigation & Shortcuts
              </span>
              {[
                { label: "View Projects Grid", href: "#projects" },
                { label: "Explore Systems Engineering Lab", href: "#systems-lab" },
                { label: "Run In-Browser Vector Benchmark", href: "#benchmark" },
                { label: "View Engineering Notes & Writing", href: "#articles" },
                { label: "Explore Gravitational Lensing Canvas", href: "#interests" },
              ].map((cmd) => (
                <a
                  key={cmd.label}
                  href={cmd.href}
                  onClick={() => {
                    playHapticClick(90, 0.02);
                    setIsCommandOpen(false);
                  }}
                  className="block px-3 py-2 rounded hover:bg-slate-900 text-slate-300 hover:text-teal-400 transition"
                >
                  {cmd.label}
                </a>
              ))}

              <span className="text-[10px] text-slate-500 px-3 uppercase tracking-wider block pt-2 py-1">
                Actions
              </span>
              <button
                onClick={() => {
                  playHapticClick(100, 0.02);
                  setIsCommandOpen(false);
                  setIsResumeOpen(true);
                }}
                className="w-full text-left px-3 py-2 rounded hover:bg-slate-900 text-slate-300 hover:text-white transition flex items-center justify-between"
              >
                <span>Open Resume Drawer</span>
                <span className="text-slate-600 text-[10px]">Action</span>
              </button>
              <button
                onClick={() => {
                  handleCopy("christianamos67@gmail.com", "email-copy");
                  setIsCommandOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded hover:bg-slate-900 text-slate-300 hover:text-white transition flex items-center justify-between"
              >
                <span>Copy Email (christianamos67@gmail.com)</span>
                <span className="text-slate-600 text-[10px]">Clipboard</span>
              </button>
            </div>
          </div>
        </div>
      )}

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
              <button
                onClick={downloadDynamicResume}
                className="flex items-center gap-1.5 px-4 py-2 bg-teal-400 text-slate-950 text-xs font-semibold rounded hover:bg-teal-300 transition"
              >
                <Download className="w-3.5 h-3.5" /> Compile & Download CV
              </button>
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

      {/* Interactive Architecture Modal with Dynamic SVG Cable Circuit Routing */}
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

            {/* Dynamic SVG Animated Circuit & Cable Routing Engine */}
            <div className="relative p-4 bg-slate-900/90 border border-slate-800 rounded-lg space-y-2">
              <div className="flex justify-between items-center text-xs font-mono text-slate-300 mb-1">
                <span className="text-teal-400 flex items-center gap-1">
                  <Network className="w-3.5 h-3.5" /> Interactive Cable & Packet Pipeline
                </span>
                <span className="text-slate-500 text-[10px]">Animated SVG Paths</span>
              </div>

              <div className="relative w-full h-36 bg-slate-950 rounded border border-slate-800/80 overflow-hidden">
                <svg className="absolute inset-0 w-full h-full">
                  {selectedModalProject.architecture.connections.map((conn) => {
                    const fromNode = selectedModalProject.architecture.nodes.find(
                      (n) => n.id === conn.from
                    );
                    const toNode = selectedModalProject.architecture.nodes.find(
                      (n) => n.id === conn.to
                    );
                    if (!fromNode || !toNode) return null;

                    const isBroken =
                      activeFailureMode &&
                      selectedModalProject.architecture.failureModes?.find(
                        (f) => f.id === activeFailureMode
                      )?.affectedNode === conn.to;

                    const path = `M ${fromNode.x + 40} ${fromNode.y} C ${
                      (fromNode.x + toNode.x) / 2
                    } ${fromNode.y}, ${(fromNode.x + toNode.x) / 2} ${toNode.y}, ${
                      toNode.x - 30
                    } ${toNode.y}`;

                    return (
                      <g key={`${conn.from}-${conn.to}`}>
                        <path
                          d={path}
                          fill="none"
                          stroke={isBroken ? "#f43f5e" : "#0f766e"}
                          strokeWidth="2"
                          strokeDasharray={isBroken ? "4 4" : "none"}
                        />
                        {!isBroken && (
                          <path
                            d={path}
                            fill="none"
                            stroke="#2dd4bf"
                            strokeWidth="2"
                            strokeDasharray="6 14"
                            className="animate-[dash_1.5s_linear_infinite]"
                          />
                        )}
                      </g>
                    );
                  })}
                </svg>

                {/* Render Topology Nodes */}
                {selectedModalProject.architecture.nodes.map((node) => {
                  const isNodeFailing =
                    activeFailureMode &&
                    selectedModalProject.architecture.failureModes?.find(
                      (f) => f.id === activeFailureMode
                    )?.affectedNode === node.id;

                  return (
                    <div
                      key={node.id}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 px-2.5 py-1 rounded text-[11px] font-mono border transition-all ${
                        isNodeFailing
                          ? "bg-rose-950/90 border-rose-600 text-rose-300 ring-2 ring-rose-500/40 animate-pulse"
                          : "bg-slate-900 border-slate-700 text-slate-200"
                      }`}
                      style={{ left: node.x, top: node.y }}
                    >
                      {node.label}
                    </div>
                  );
                })}
              </div>
            </div>

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
      <footer className="relative z-10 border-t border-slate-900 py-8 text-center text-xs font-mono text-slate-500">
        © {new Date().getFullYear()} Christian Amos Otieno. Built with Go, Next.js & Tailwind CSS.
      </footer>
    </div>
  );
}