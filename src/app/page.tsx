"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { motion, useSpring, useMotionValue } from "framer-motion";
import Lenis from "lenis";
import {
  Play,
  Square,
  Search,
  ExternalLink,
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
  Volume2,
  VolumeX,
  Gauge,
  RotateCcw,
  Zap,
  Network,
  Command,
  Cpu,
  HardDrive,
  Workflow,
  Wifi,
  Briefcase,
  Code2,
  ChevronDown,
  ArrowRight,
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
  problem: string;
  constraint: string;
  solution: string;
  tags: string[];
  githubUrl: string;
  cloneCommand: string;
  hasAudioVisualizer?: boolean;
  hasGisSimulator?: boolean;
  codeSnippet: string;
  architecture: {
    nodes: { id: string; label: string; x: number; y: number }[];
    connections: { from: string; to: string }[];
    highlights: string[];
    tradeoffs: string;
  };
}

const projects: Project[] = [
  {
    id: "lyric",
    title: "LYRIC – Music Streaming Platform",
    description: "Audio streaming engine with HTTP 206 range requests, synchronized group playback, and an interactive waveform visualizer.",
    problem: "Streaming multi-megabyte lossless audio to mobile networks without buffer-induced server memory spikes.",
    constraint: "Serving concurrent listeners on limited RAM without buffering full files into heap or suffering scrubbing latency.",
    solution: "Engineered a Go HTTP 206 range streamer with 64KB chunk pipelines and WebSocket room synchronization; cut memory overhead by 78%.",
    tags: ["Go", "Next.js", "WebSockets", "MinIO", "Redis", "Prisma"],
    githubUrl: "https://github.com/Christian3788",
    cloneCommand: "git clone https://github.com/Christian3788/lyric.git",
    hasAudioVisualizer: true,
    codeSnippet: `// Go HTTP 206 Partial Content Range Streamer
func StreamAudioHandler(w http.ResponseWriter, r *http.Request) {
    rangeHeader := r.Header.Get("Range")
    start, end := parseByteRange(rangeHeader, totalFileSize)
    
    w.Header().Set("Content-Range", fmt.Sprintf("bytes %d-%d/%d", start, end, totalFileSize))
    w.Header().Set("Accept-Ranges", "bytes")
    w.WriteHeader(http.StatusPartialContent)

    // Stream directly via 64KB io.CopyBuffer without heap allocation
    buf := make([]byte, 64*1024)
    io.CopyBuffer(w, io.NewSectionReader(audioReader, start, end-start+1), buf)
}`,
    architecture: {
      nodes: [
        { id: "client", label: "Client (Next.js)", x: 50, y: 70 },
        { id: "gateway", label: "Go 206 Gateway", x: 220, y: 70 },
        { id: "redis", label: "Redis Pub/Sub", x: 390, y: 35 },
        { id: "minio", label: "MinIO S3 Bucket", x: 390, y: 110 },
      ],
      connections: [
        { from: "client", to: "gateway" },
        { from: "gateway", to: "redis" },
        { from: "gateway", to: "minio" },
      ],
      highlights: [
        "Go HTTP 206 Range Streamer serves 64KB byte-range buffers without loading full files into heap.",
        "Custom WebSocket Hub coordinates synchronous playback states across room peers.",
      ],
      tradeoffs: "Selected byte-range HTTP 206 chunking over HLS to minimize transcode overhead and enable sub-40ms seek latency.",
    },
  },
  {
    id: "spatial-risk",
    title: "Spatial Risk Analytics Engine",
    description: "Geographic vulnerability scoring engine utilizing PostGIS spatial indexing, IPCC vulnerability modeling formulas, and coordinate bounding queries.",
    problem: "Computing multi-layer spatial risk scores across tens of thousands of urban polygon zones within user-interactive time limits.",
    constraint: "Brute-force nested spatial loops lock Node.js event loops and degrade to multi-second execution times.",
    solution: "Shifted all geometric intersections to PostGIS GiST indexed queries; reduced query execution time from 118ms down to 3.12ms.",
    tags: ["PostGIS", "Next.js", "Prisma", "TypeScript"],
    githubUrl: "https://github.com/Christian3788",
    cloneCommand: "git clone https://github.com/Christian3788/spatial-risk.git",
    hasGisSimulator: true,
    codeSnippet: `-- Optimized Spatial Intersect using GiST R-Tree Index
EXPLAIN ANALYZE
SELECT id, hazard_level, ST_AsGeoJSON(geom)
FROM urban_vulnerability_layers
WHERE ST_DWithin(
    geom::geography,
    ST_SetSRID(ST_MakePoint($1, $2), 4326)::geography,
    5000
) AND status = 'active';`,
    architecture: {
      nodes: [
        { id: "client", label: "GeoJSON Coordinates", x: 50, y: 70 },
        { id: "gateway", label: "PostGIS Engine", x: 220, y: 70 },
        { id: "gist", label: "GiST Spatial Index", x: 390, y: 40 },
        { id: "ipcc", label: "IPCC Scoring Unit", x: 390, y: 110 },
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
      tradeoffs: "Offloaded spatial compute to Postgres PostGIS functions rather than Node.js worker threads to utilize native C-level geometric optimizations.",
    },
  },
  {
    id: "vector-vanguard",
    title: "Vector-Vanguard",
    description: "Vector search engine and high-dimensional similarity index built to perform nearest-neighbor lookups, metric space embeddings, and high-throughput vector queries.",
    problem: "Performing high-frequency similarity search across high-dimensional dense float vectors without external vector DB infrastructure.",
    constraint: "Standard distance calculations incur heavy CPU cache misses and garbage collection pauses under high read concurrency.",
    solution: "Designed contiguous float buffers with SIMD-style 4-way loop unrolling in Go; achieved sub-millisecond retrieval across dense vector spaces.",
    tags: ["Go", "Python", "Vector Search", "Algorithms", "Docker"],
    githubUrl: "https://github.com/Christian3788/Vector-Vanguard",
    cloneCommand: "git clone https://github.com/Christian3788/Vector-Vanguard.git",
    codeSnippet: `// 4-Way Loop Unrolled Euclidean Distance Evaluator
func EuclideanDistanceSIMD(a, b []float32) float32 {
    var sum float32
    n := len(a)
    for i := 0; i < n; i += 4 {
        d0 := a[i] - b[i]
        d1 := a[i+1] - b[i+1]
        d2 := a[i+2] - b[i+2]
        d3 := a[i+3] - b[i+3]
        sum += d0*d0 + d1*d1 + d2*d2 + d3*d3
    }
    return sum
}`,
    architecture: {
      nodes: [
        { id: "client", label: "Query Embeddings", x: 50, y: 70 },
        { id: "gateway", label: "SIMD Vector Matcher", x: 220, y: 70 },
        { id: "hnsw", label: "HNSW Graph Index", x: 390, y: 40 },
        { id: "quant", label: "PQ Quantizer", x: 390, y: 110 },
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
      tradeoffs: "Balanced index build speed against query recall by choosing an approximate nearest neighbor (ANN) approach over brute-force scanning.",
    },
  },
  {
    id: "kijijishare",
    title: "kijijiShare",
    description: "Peer-to-peer hyperlocal resource sharing and item exchange platform connecting communities with zero-friction item discovery and spatial coordination.",
    problem: "Preventing double-booking and stale status discrepancies during simultaneous reservations across low-bandwidth mobile devices.",
    constraint: "Unreliable network connectivity causing race conditions in distributed item claiming.",
    solution: "Implemented PostgreSQL strict serialized transactional claims in Prisma, complemented by radius spatial index filtering.",
    tags: ["TypeScript", "Next.js", "PostgreSQL", "Prisma", "Tailwind CSS"],
    githubUrl: "https://github.com/Christian3788/kijijiShare",
    cloneCommand: "git clone https://github.com/Christian3788/kijijiShare.git",
    codeSnippet: `// Atomic Double-Booking Claim Transaction
export async function claimItem(itemId: string, userId: string) {
  return await prisma.$transaction(async (tx) => {
    const item = await tx.item.findUnique({ where: { id: itemId } });
    if (!item || item.status !== "AVAILABLE") {
      throw new Error("Item claimed concurrently by peer");
    }
    return await tx.item.update({
      where: { id: itemId },
      data: { status: "RESERVED", claimedById: userId },
    });
  });
}`,
    architecture: {
      nodes: [
        { id: "client", label: "Mobile Client", x: 50, y: 70 },
        { id: "gateway", label: "Next.js App Server", x: 220, y: 70 },
        { id: "db", label: "PostgreSQL Prisma", x: 390, y: 70 },
      ],
      connections: [
        { from: "client", to: "gateway" },
        { from: "gateway", to: "db" },
      ],
      highlights: [
        "Geospatial radius queries to filter available neighborhood assets by user proximity.",
        "Robust relational schemas enforcing atomic reservations and status life cycles.",
      ],
      tradeoffs: "Used transactional PostgreSQL relational models for deterministic reservation guarantees rather than eventual-consistency document stores.",
    },
  },
];

const hobbies = [
  {
    title: "Astrophysical & Numerical Modeling",
    description: "Developing simulations from first principles, including relativistic ray-tracing, N-body dynamics, and gravitational lensing.",
    icon: Atom,
    badge: "Physics Simulation",
  },
  {
    title: "Quantum Simulation & Linear Algebra",
    description: "Implementing discrete state-vector engines, unitary gate transformations, and toy quantum algorithm simulators.",
    icon: Binary,
    badge: "Quantum CS",
  },
  {
    title: "Computational Biology & Emergence",
    description: "Writing reaction-diffusion solvers and cellular automata to model pattern morphogenesis and complex system dynamics.",
    icon: Dna,
    badge: "Complex Systems",
  },
  {
    title: "Technical Writing & Analytical Philosophy",
    description: "Writing long-form essays and speculative technical notes grounded in formal logic, information theory, and cosmology.",
    icon: BookOpen,
    badge: "Information Theory",
  },
];

const articles = [
  {
    title: "Implementing HTTP 206 Partial Content in Go for Media Streaming",
    date: "Sep 2026",
    summary: "A deep dive into parsing HTTP byte ranges, satisfying Range header bounds, and piping io.ReadSeeker streams safely to avoid memory exhaustion.",
    tags: ["Go", "Streaming", "HTTP"],
    link: "https://dev.to/christian-otieno",
  },
  {
    title: "Architecting Real-Time WebSocket Rooms with Goroutine Hubs",
    date: "Aug 2026",
    summary: "Preventing deadlocks and managing slow client write drops in high-throughput fan-out broadcast architectures.",
    tags: ["Concurrency", "Go", "WebSockets"],
    link: "https://dev.to/christian-otieno",
  },
  {
    title: "PostGIS Spatial Indexing: Query Optimization at Scale",
    date: "Jul 2026",
    summary: "Benchmarking GiST indexing against R-Tree structures when performing multi-polygon intersections across urban coordinates.",
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
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(false);

  // Persona Perspective
  const [audiencePersona, setAudiencePersona] = useState<"tech-lead" | "recruiter">("tech-lead");

  // Tabbed Project Deep-Dive State
  const [activeTabs, setActiveTabs] = useState<Record<string, "overview" | "code" | "architecture">>({
    lyric: "overview",
    "spatial-risk": "overview",
    "vector-vanguard": "overview",
    kijijishare: "overview",
  });

  // Collapsible 3-Part Engineering Anatomy Accordion per project
  const [expandedAnatomy, setExpandedAnatomy] = useState<Record<string, boolean>>({
    lyric: false,
    "spatial-risk": false,
    "vector-vanguard": false,
    kijijishare: false,
  });

  // Top Scroll Progress Bar
  const [scrollProgress, setScrollProgress] = useState(0);

  const isLight = mounted && resolvedTheme === "light";

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 350 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);
  const [cursorScale, setCursorScale] = useState(1);

  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [commandQuery, setCommandQuery] = useState("");

  const [gitEvents, setGitEvents] = useState<GitHubEvent[]>([]);
  const hapticAudioCtxRef = useRef<AudioContext | null>(null);

  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  const [gisCoord, setGisCoord] = useState({ x: 50, y: 50 });
  const [isGistMode, setIsGistMode] = useState(true);
  const [showSqlExplain, setShowSqlExplain] = useState(true);

  const [isBenchmarking, setIsBenchmarking] = useState(false);
  const [benchmarkResults, setBenchmarkResults] = useState<{
    jsTime: number;
    optTime: number;
    speedup: string;
    iterations: number;
  } | null>(null);

  const [peerLatency, setPeerLatency] = useState<number | null>(null);
  const [isPingingPeer, setIsPingingPeer] = useState(false);

  const lensingCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [lensPos, setLensPos] = useState({ x: 180, y: 70 });
  const starfieldCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Systems Lab Workbench States
  const [memoryHeap, setMemoryHeap] = useState<Array<{ id: number; allocated: boolean; size: number }>>(
    () => Array.from({ length: 32 }, (_, i) => ({ id: i, allocated: i % 7 === 0 || i % 11 === 0, size: 64 }))
  );
  const [lastMalloc, setLastMalloc] = useState<string>("0x0480");

  const [channelBuffer, setChannelBuffer] = useState<number[]>([]);
  const [channelCapacity] = useState<number>(2);
  const [goroutineStatus, setGoroutineStatus] = useState<"idle" | "running" | "deadlocked">("idle");
  const [deadlockError, setDeadlockError] = useState<string | null>(null);

  const [tcpState, setTcpState] = useState<"CLOSED" | "SYN_SENT" | "SYN_RECEIVED" | "ESTABLISHED">("CLOSED");
  const [cwndSize] = useState<number>(4);

  const [bloomArray, setBloomArray] = useState<number[]>(() => Array.from({ length: 32 }, () => 0));
  const [bloomInput, setBloomInput] = useState<string>("auth_token_hash");
  const [bloomMatch, setBloomMatch] = useState<boolean | null>(null);

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

  const allocateMemoryBlock = () => {
    playHapticClick(140, 0.02);
    setMemoryHeap((prev) => {
      const next = [...prev];
      const freeIdx = next.findIndex((b) => !b.allocated);
      if (freeIdx !== -1) {
        next[freeIdx] = { ...next[freeIdx], allocated: true };
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
        next[allocIdx] = { ...next[allocIdx], allocated: false };
      }
      return next;
    });
  };

  const sweepGarbageCollection = () => {
    playHapticClick(190, 0.04);
    setMemoryHeap((prev) => prev.map((b, i) => (i % 5 === 0 ? { ...b, allocated: false } : b)));
  };

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

  const stepTcpHandshake = () => {
    playHapticClick(160, 0.03);
    if (tcpState === "CLOSED") setTcpState("SYN_SENT");
    else if (tcpState === "SYN_SENT") setTcpState("SYN_RECEIVED");
    else if (tcpState === "SYN_RECEIVED") setTcpState("ESTABLISHED");
    else setTcpState("CLOSED");
  };

  // Lenis & Scroll Progress
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      setScrollProgress(totalScroll > 0 ? (currentScroll / totalScroll) * 100 : 0);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

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

    return () => {
      window.removeEventListener("scroll", handleScroll);
      lenis.destroy();
    };
  }, []);

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

      ctx.fillStyle = isLight ? "rgba(8, 145, 178, 0.28)" : "rgba(34, 211, 238, 0.45)";
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
  }, [isLight]);

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
        // Fallback
      }
    },
    [soundEnabled]
  );

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

  useEffect(() => {
    const canvas = lensingCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const gridSpacing = 16;
    const GM = 1400;

    const renderLensing = () => {
      ctx.fillStyle = isLight ? "#f8fafc" : "#070b14";
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
          ctx.arc(drawX, drawY, 1.3, 0, Math.PI * 2);
          ctx.fillStyle = dist < 22 ? "#f43f5e" : isLight ? "#0891b2" : "#22d3ee";
          ctx.fill();
        }
      }

      ctx.beginPath();
      ctx.arc(lensPos.x, lensPos.y, 8, 0, Math.PI * 2);
      ctx.fillStyle = isLight ? "#0f172a" : "#070b14";
      ctx.strokeStyle = isLight ? "#0891b2" : "#22d3ee";
      ctx.lineWidth = 2;
      ctx.fill();
      ctx.stroke();

      animId = requestAnimationFrame(renderLensing);
    };

    renderLensing();
    return () => cancelAnimationFrame(animId);
  }, [lensPos, isLight]);

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
        ctx.fillStyle = isLight ? "#0891b2" : "#22d3ee";
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

  return (
    <div className="relative min-h-screen bg-[#f8fafc] dark:bg-[#070b14] text-slate-900 dark:text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950 antialiased overflow-x-hidden transition-colors duration-200">
      {/* Top 2px Phosphor Cyan Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 h-[2px] bg-gradient-to-r from-cyan-600 via-cyan-400 to-sky-300 z-50 transition-all duration-75 shadow-[0_0_8px_rgba(6,182,212,0.8)]"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Subtle Matrix / Starfield Background */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-35 dark:hidden" />
      <canvas
        ref={starfieldCanvasRef}
        className="fixed inset-0 pointer-events-none z-0 opacity-40 hidden dark:block"
      />

      {/* Spring Interactive Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none z-50 border border-cyan-600/80 dark:border-cyan-400/80 bg-cyan-500/10 dark:bg-cyan-400/20 hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          scale: cursorScale,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      {/* Top Navigation */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-white/90 dark:bg-[#070b14]/85 border-b border-slate-200/90 dark:border-slate-800 transition-colors shadow-xs">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <a
            href="#"
            onClick={() => playHapticClick(80, 0.02)}
            className="font-mono font-extrabold text-base tracking-wider bg-gradient-to-r from-cyan-400 via-cyan-300 to-sky-300 bg-clip-text text-transparent flex items-center gap-1.5"
          >
            christian.dev
          </a>

          <div className="flex items-center gap-6">
            <nav className="flex items-center gap-5 sm:gap-6 text-sm font-medium text-slate-700 dark:text-slate-300">
              <a
                href="#about"
                onClick={() => playHapticClick(80, 0.02)}
                className="hover:text-slate-950 dark:hover:text-cyan-300 transition"
              >
                About
              </a>
              <a
                href="#projects"
                onClick={() => playHapticClick(80, 0.02)}
                className="hover:text-slate-950 dark:hover:text-cyan-300 transition"
              >
                Projects
              </a>
              <a
                href="#systems-lab"
                onClick={() => playHapticClick(80, 0.02)}
                className="hover:text-slate-950 dark:hover:text-cyan-300 transition hidden sm:inline"
              >
                Systems Lab
              </a>
              <a
                href="#articles"
                onClick={() => playHapticClick(80, 0.02)}
                className="hover:text-slate-950 dark:hover:text-cyan-300 transition hidden md:inline"
              >
                Writing
              </a>
              <button
                onClick={() => {
                  playHapticClick(110, 0.02);
                  setIsResumeOpen(true);
                }}
                className="text-cyan-700 dark:text-cyan-400 hover:text-cyan-800 dark:hover:text-cyan-300 font-bold transition"
              >
                Resume
              </button>
            </nav>

            <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800">
              <button
                onClick={() => {
                  playHapticClick(110, 0.02);
                  setIsCommandOpen(true);
                }}
                className="flex items-center gap-1.5 px-2.5 py-1 bg-white dark:bg-[#0d1527] border border-slate-300 dark:border-slate-800 hover:border-slate-400 dark:hover:border-cyan-500/50 rounded-md text-xs font-mono text-slate-800 dark:text-slate-300 transition shadow-2xs"
                title="Open Command Palette (Ctrl+K)"
              >
                <Command className="w-3.5 h-3.5 text-cyan-700 dark:text-cyan-400" />
                <span className="hidden sm:inline">Ctrl+K</span>
              </button>

              <button
                onClick={toggleSound}
                className={`p-1.5 rounded-lg border transition ${
                  soundEnabled
                    ? "bg-cyan-50 dark:bg-cyan-950/60 border-cyan-300 dark:border-cyan-800 text-cyan-800 dark:text-cyan-400 shadow-2xs"
                    : "bg-white dark:bg-[#0d1527] border-slate-300 dark:border-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-slate-300 shadow-2xs"
                }`}
                title={soundEnabled ? "Mute UI Sound Haptics" : "Enable UI Sound Haptics"}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>

              {mounted && (
                <button
                  onClick={() => {
                    playHapticClick(140, 0.02);
                    setTheme(isLight ? "dark" : "light");
                  }}
                  className="p-1.5 rounded-lg border border-slate-300 dark:border-slate-800 bg-white dark:bg-[#0d1527] text-slate-800 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition shadow-2xs"
                  title={`Switch to ${isLight ? "Dark" : "Light"} Mode`}
                >
                  {isLight ? (
                    <Moon className="w-4 h-4 text-slate-800" />
                  ) : (
                    <Sun className="w-4 h-4 text-amber-300" />
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 max-w-5xl mx-auto px-6 py-12 space-y-20 lg:space-y-24">
        {/* Active Focus Ticker & Perspective Switcher */}
        <section className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-[#0d1527] border border-slate-200/90 dark:border-slate-800 rounded-xl p-3.5 shadow-xs font-mono text-xs">
            <div className="flex items-center gap-2.5 overflow-x-auto">
              <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="font-bold text-slate-950 dark:text-slate-100 uppercase tracking-wider text-[11px]">
                Active Focus:
              </span>
              <span className="text-slate-700 dark:text-slate-300 truncate">
                Benchmarking lock-free concurrent ring buffers & io.CopyBuffer range streamers in Go
              </span>
            </div>

            {/* Persona Switcher */}
            <div className="flex items-center gap-1 self-start sm:self-auto bg-slate-100 dark:bg-[#070b14] p-1 rounded-lg border border-slate-200 dark:border-slate-800">
              <button
                onClick={() => {
                  playHapticClick(90, 0.02);
                  setAudiencePersona("tech-lead");
                }}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-medium transition ${
                  audiencePersona === "tech-lead"
                    ? "bg-cyan-500/15 border border-cyan-400/50 text-cyan-900 dark:text-cyan-300 font-bold shadow-2xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-slate-200"
                }`}
              >
                <Code2 className="w-3.5 h-3.5 text-cyan-700 dark:text-cyan-400" />
                <span>Tech Lead View</span>
              </button>
              <button
                onClick={() => {
                  playHapticClick(90, 0.02);
                  setAudiencePersona("recruiter");
                }}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-medium transition ${
                  audiencePersona === "recruiter"
                    ? "bg-cyan-500/15 border border-cyan-400/50 text-cyan-900 dark:text-cyan-300 font-bold shadow-2xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-slate-200"
                }`}
              >
                <Briefcase className="w-3.5 h-3.5 text-cyan-700 dark:text-cyan-400" />
                <span>Recruiter View</span>
              </button>
            </div>
          </div>

          {/* GitHub Activity & Node Ping Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5 font-mono text-xs">
            <div className="sm:col-span-3 bg-white dark:bg-[#0d1527] border border-slate-200/90 dark:border-slate-800 rounded-xl p-3 flex flex-wrap items-center justify-between gap-2 shadow-xs">
              <div className="flex items-center gap-2">
                <Radio className="w-3.5 h-3.5 text-cyan-700 dark:text-cyan-400 animate-pulse" />
                <span className="font-semibold text-slate-950 dark:text-slate-100">GitHub:</span>
                <span className="text-cyan-800 dark:text-cyan-400 font-bold">{gitEvents[0]?.repo || "portfolio"}</span>
                <span className="text-slate-600 dark:text-slate-400 text-[11px] truncate max-w-xs sm:max-w-md">
                  — {gitEvents[0]?.message || "Recent system updates"}
                </span>
              </div>
              <span className="text-[10px] text-slate-500 font-medium">{gitEvents[0]?.time}</span>
            </div>

            <button
              onClick={triggerPeerPing}
              disabled={isPingingPeer}
              className="bg-white dark:bg-[#0d1527] border border-slate-200/90 dark:border-slate-800 rounded-xl p-3 flex items-center justify-center gap-2 hover:border-cyan-500/50 dark:hover:border-cyan-400 transition shadow-xs"
            >
              <Network className="w-3.5 h-3.5 text-cyan-700 dark:text-cyan-400" />
              <span className="text-slate-800 dark:text-slate-200 font-semibold">
                {isPingingPeer ? "Pinging..." : peerLatency ? `RTT: ${peerLatency}ms` : "Ping Peer Mesh"}
              </span>
            </button>
          </div>
        </section>

        {/* =========================================================
            REFACTORED HERO SECTION
            Typography, contrast compliance & framed portrait card
            ========================================================= */}
        <section className="relative pt-6 pb-12 font-sans overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Typography & Content Hierarchy */}
            <div className="lg:col-span-7 space-y-6 z-10">
              
              {/* Eyebrow: Geist/JetBrains Mono, uppercase, tracking */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-800/60 font-mono text-xs uppercase tracking-[0.08em] text-cyan-300">
                <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Kisumu, Kenya &bull; Full-Stack Software Engineer</span>
              </div>

              {/* Main Heading: Sans-serif Inter / Geist Sans, high contrast */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-950 dark:text-white leading-[1.12]">
                Christian Amos <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-slate-950 via-slate-800 to-slate-600 dark:from-white dark:via-slate-100 dark:to-slate-400 bg-clip-text text-transparent">
                  Otieno
                </span>
              </h1>

              {/* Persona-Driven Primary Paragraph (WCAG AA Compliant text-slate-300 / 700) */}
              {audiencePersona === "tech-lead" ? (
                <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed max-w-xl font-normal">
                  Systems-focused software engineer specializing in low-overhead network
                  protocols in <span className="text-slate-950 dark:text-white font-medium">Go</span>, high-throughput spatial indexing
                  in <span className="text-slate-950 dark:text-white font-medium">PostGIS</span>, and deterministic interfaces in{" "}
                  <span className="text-slate-950 dark:text-white font-medium">Next.js &amp; TypeScript</span>.
                </p>
              ) : (
                <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed max-w-xl font-normal">
                  Full-stack software developer experienced in building production web
                  applications, real-time media services, and resilient database architectures.
                  Currently completing an intensive engineering apprenticeship at Zone01 Kisumu.
                </p>
              )}

              {/* Secondary Subtext (Accessible #94a3b8 / slate-400) */}
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl">
                Background in biotechnology and analytical modeling from Aga Khan University,
                applying empirical rigor to distributed computing, memory alignment, and system
                architecture.
              </p>

              {/* CTA & Social Cluster */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                {/* Primary CTA: Title-case, clean sans-serif */}
                <a
                  href="#projects"
                  onClick={() => playHapticClick(90, 0.02)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-sm tracking-normal text-slate-950 bg-gradient-to-r from-cyan-400 via-cyan-300 to-sky-300 hover:from-cyan-300 hover:to-sky-200 transition-all duration-200 shadow-[0_0_20px_rgba(6,182,212,0.35)] hover:shadow-[0_0_28px_rgba(34,211,238,0.55)] hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span>Explore Projects &amp; Demos</span>
                  <ArrowRight className="w-4 h-4 text-slate-950" />
                </a>

                {/* Secondary CTA: Title-case, clean sans-serif */}
                <button
                  type="button"
                  onClick={() => {
                    playHapticClick(110, 0.02);
                    setIsResumeOpen(true);
                  }}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg font-medium text-sm tracking-normal text-slate-800 dark:text-slate-200 bg-white/60 dark:bg-white/[0.04] hover:bg-white/90 dark:hover:bg-white/[0.08] border border-slate-300 dark:border-white/[0.08] hover:border-cyan-500/50 transition-all duration-200"
                >
                  <FileCode className="w-4 h-4 text-cyan-700 dark:text-cyan-400" />
                  <span>Resume / CV</span>
                </button>

                {/* Social Profiles */}
                <div className="flex items-center gap-3 pl-2 sm:pl-3 border-l border-slate-200 dark:border-white/[0.08] text-slate-600 dark:text-slate-400">
                  <a
                    href="https://github.com/Christian3788"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg hover:text-slate-950 dark:hover:text-white transition-colors"
                    title="GitHub Profile"
                    aria-label="GitHub Profile"
                  >
                    <GithubIcon className="w-5 h-5" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/christian-otieno-9a9806229/"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg hover:text-sky-700 dark:hover:text-sky-400 transition-colors"
                    title="LinkedIn Profile"
                    aria-label="LinkedIn Profile"
                  >
                    <LinkedinIcon className="w-5 h-5" />
                  </a>
                  <a
                    href="https://dev.to/christian-otieno"
                    target="_blank"
                    rel="noreferrer"
                    className="px-2.5 py-1 rounded-md hover:text-cyan-800 dark:hover:text-cyan-300 font-mono text-xs font-bold"
                    title="DEV.to Articles"
                    aria-label="DEV.to Articles"
                  >
                    DEV
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Refactored Portrait Card */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative group">
                {/* Ambient Cool-Cyan Backlight Glow */}
                <div 
                  className="absolute -inset-1.5 rounded-3xl bg-gradient-to-tr from-cyan-500/25 via-sky-500/15 to-transparent blur-2xl opacity-75 group-hover:opacity-100 transition duration-700 pointer-events-none"
                  aria-hidden="true"
                />

                {/* Explicit Portrait Card Wrapper */}
                <div className="relative w-[280px] h-[370px] sm:w-[320px] sm:h-[420px] lg:w-[340px] lg:h-[450px] rounded-2xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.02] backdrop-blur-xs overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-[1.01]">
                  <Image
                    src="/profile.jpg"
                    alt="Christian Amos Otieno - Software Engineer"
                    fill
                    priority
                    sizes="(max-width: 640px) 280px, (max-width: 1024px) 320px, 340px"
                    className="object-cover object-[50%_15%] contrast-[1.05] brightness-95"
                  />

                  {/* Seamless Bottom Vignette Gradient */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-t from-[#f8fafc] dark:from-[#070b14] via-transparent to-transparent pointer-events-none opacity-80" 
                    aria-hidden="true"
                  />

                  {/* Top Cyan Rim Light */}
                  <div 
                    className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent pointer-events-none" 
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Engineering Philosophy */}
        <section id="about" className="space-y-4">
          <h2 className="text-xl font-bold text-slate-950 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-3">
            Engineering Philosophy
          </h2>
          <div className="text-slate-700 dark:text-slate-300 space-y-4 leading-relaxed text-sm sm:text-base max-w-3xl">
            <p>
              My approach to software is centered around mechanical sympathy: understanding how byte buffers flow over sockets, keeping memory footprints deterministic, and making database query plans predictable before reaching for more hardware.
            </p>
            <p>
              Having studied microbiology and biotechnology before transitioning to full-stack engineering, I bring an experimental, first-principles mindset to writing code. Whether profiling vector algorithms, partitioning geospatial indexes in PostGIS, or designing state machines in TypeScript, I focus on building systems that remain clean under load.
            </p>
          </div>
        </section>

        {/* Core Technologies Badges */}
        <section id="skills" className="space-y-4">
          <h2 className="text-xl font-bold text-slate-950 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-3">
            Core Technologies
          </h2>
          <div className="flex flex-wrap gap-2 pt-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1.5 bg-white dark:bg-[#0d1527] border border-slate-200/90 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-md text-xs sm:text-sm font-mono font-medium hover:border-cyan-600 dark:hover:border-cyan-500/50 hover:text-cyan-800 dark:hover:text-cyan-300 transition-colors cursor-default shadow-2xs"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-slate-950 dark:text-white">Featured Projects</h2>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-cyan-100 dark:bg-cyan-950/80 text-cyan-900 dark:text-cyan-300 font-bold border border-cyan-300 dark:border-cyan-800">
                  {audiencePersona === "tech-lead" ? "Deep Systems Anatomy" : "Production Deliverables"}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                Real code, architectural diagrams, and interactive live sandboxes.
              </p>
            </div>

            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search projects or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white dark:bg-[#0d1527] border border-slate-300 dark:border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs sm:text-sm text-slate-900 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:border-cyan-600 dark:focus:border-slate-700 font-sans shadow-2xs"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {allFilterTags.slice(0, 8).map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  playHapticClick(80, 0.02);
                  setSelectedTag(tag);
                }}
                className={`text-xs px-3 py-1 rounded-md font-mono transition-colors shadow-2xs ${
                  selectedTag === tag
                    ? "bg-cyan-600 text-white dark:bg-cyan-500 dark:text-slate-950 font-bold"
                    : "bg-white dark:bg-[#0d1527] text-slate-700 dark:text-slate-300 border border-slate-200/90 dark:border-slate-800 hover:text-slate-950 dark:hover:text-white"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          <div className="grid gap-8">
            {filteredProjects.map((proj) => {
              const currentTab = activeTabs[proj.id] || "overview";
              const isAnatomyOpen = expandedAnatomy[proj.id] || false;

              return (
                <div
                  key={proj.id}
                  className="p-6 sm:p-7 border border-slate-200/90 dark:border-slate-800 rounded-2xl bg-white dark:bg-[#0d1527] hover:border-cyan-400/60 dark:hover:border-cyan-400/50 hover:shadow-lg dark:hover:shadow-[0_0_30px_-8px_rgba(6,182,212,0.25)] transition-all duration-300 space-y-5"
                >
                  {/* Top Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
                    <div>
                      <h3 className="text-xl font-bold text-slate-950 dark:text-white">
                        {proj.title}
                      </h3>
                      <p className="mt-1 text-sm text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
                        {proj.description}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {proj.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs bg-slate-100 dark:bg-[#070b14] border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-medium px-2 py-0.5 rounded font-mono"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-auto">
                      {proj.hasAudioVisualizer && (
                        <button
                          onClick={toggleAudioPreview}
                          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-full border transition font-mono font-semibold ${
                            isPlayingAudio
                              ? "bg-rose-50 dark:bg-rose-950/60 border-rose-300 dark:border-rose-800 text-rose-700 dark:text-rose-300"
                              : "bg-cyan-50 dark:bg-cyan-950/60 border-cyan-300 dark:border-cyan-800 text-cyan-900 dark:text-cyan-300 hover:border-cyan-500"
                          }`}
                        >
                          {isPlayingAudio ? (
                            <>
                              <Square className="w-3.5 h-3.5 fill-current" />
                              <span>Stop Wave</span>
                            </>
                          ) : (
                            <>
                              <Play className="w-3.5 h-3.5 fill-current" />
                              <span>Live Audio Stream</span>
                            </>
                          )}
                        </button>
                      )}

                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-[#070b14] border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-mono font-bold text-slate-800 dark:text-slate-200 hover:border-cyan-600 transition"
                      >
                        Code <ExternalLink className="w-3.5 h-3.5 text-cyan-700 dark:text-cyan-400" />
                      </a>
                    </div>
                  </div>

                  {/* Audio Waveform Canvas */}
                  {proj.hasAudioVisualizer && (
                    <div className="p-3 bg-slate-50 dark:bg-[#070b14] rounded-xl border border-slate-200 dark:border-slate-800 space-y-1.5">
                      <div className="flex justify-between text-[10px] font-mono text-slate-500">
                        <span>HTTP 206 Byte Range Chunking Stream (64KB Allocations)</span>
                        <span>{isPlayingAudio ? "FFT Active" : "Click 'Live Audio Stream'"}</span>
                      </div>
                      <canvas ref={canvasRef} width={500} height={36} className="w-full h-9 rounded bg-slate-200/50 dark:bg-[#0d1527]" />
                    </div>
                  )}

                  {/* Collapsible 3-Part Engineering Anatomy Accordion */}
                  <div className="border border-slate-200/80 dark:border-slate-800 rounded-xl overflow-hidden bg-slate-50/70 dark:bg-[#070b14]/50">
                    <button
                      onClick={() => {
                        playHapticClick(80, 0.02);
                        setExpandedAnatomy((prev) => ({ ...prev, [proj.id]: !isAnatomyOpen }));
                      }}
                      className="w-full px-4 py-2.5 flex items-center justify-between text-xs font-mono font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#0d1527] transition"
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-cyan-700 dark:text-cyan-400 font-extrabold">&gt;</span>
                        <span>Engineering Anatomy: Problem • Constraint • Architecture</span>
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${
                          isAnatomyOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {isAnatomyOpen && (
                      <div className="p-4 border-t border-slate-200 dark:border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs">
                        <div className="p-3 bg-white dark:bg-[#0d1527] rounded-lg border border-slate-200 dark:border-slate-800 space-y-1">
                          <span className="text-[10px] uppercase font-bold text-rose-700 dark:text-rose-400 block">
                            [1] The Problem
                          </span>
                          <p className="text-slate-700 dark:text-slate-300 font-sans leading-relaxed text-xs">
                            {proj.problem}
                          </p>
                        </div>

                        <div className="p-3 bg-white dark:bg-[#0d1527] rounded-lg border border-slate-200 dark:border-slate-800 space-y-1">
                          <span className="text-[10px] uppercase font-bold text-amber-700 dark:text-amber-400 block">
                            [2] Engineering Constraint
                          </span>
                          <p className="text-slate-700 dark:text-slate-300 font-sans leading-relaxed text-xs">
                            {proj.constraint}
                          </p>
                        </div>

                        <div className="p-3 bg-white dark:bg-[#0d1527] rounded-lg border border-slate-200 dark:border-slate-800 space-y-1">
                          <span className="text-[10px] uppercase font-bold text-cyan-800 dark:text-cyan-400 block">
                            [3] Architectural Solution
                          </span>
                          <p className="text-slate-700 dark:text-slate-300 font-sans leading-relaxed text-xs">
                            {proj.solution}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Tabbed Inspector Navigation */}
                  <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-slate-50/50 dark:bg-[#070b14]/50">
                    <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 px-3 bg-slate-100/70 dark:bg-[#0d1527] text-xs font-mono">
                      <div className="flex gap-2">
                        {[
                          { id: "overview", label: "Interactive Demo / Simulator" },
                          { id: "code", label: "Core Implementation Snippet" },
                          { id: "architecture", label: "System Topology & Trade-offs" },
                        ].map((t) => (
                          <button
                            key={t.id}
                            onClick={() => {
                              playHapticClick(80, 0.02);
                              setActiveTabs((prev) => ({ ...prev, [proj.id]: t.id as "overview" | "code" | "architecture" }));
                            }}
                            className={`py-2 px-3 border-b-2 font-medium transition ${
                              currentTab === t.id
                                ? "border-cyan-600 dark:border-cyan-400 text-cyan-900 dark:text-cyan-300 font-bold"
                                : "border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-slate-200"
                            }`}
                          >
                            {t.label}
                          </button>
                        ))}
                      </div>

                      <button
                        onClick={() => handleCopy(proj.cloneCommand, `clone-${proj.id}`)}
                        className="text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-slate-200 flex items-center gap-1 transition py-1 text-[11px] font-medium"
                      >
                        {copiedKey === `clone-${proj.id}` ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                        <span>{copiedKey === `clone-${proj.id}` ? "Copied" : "Copy Clone"}</span>
                      </button>
                    </div>

                    {/* Tab 1: Interactive Demo (GIS Simulator or Topology Overview) */}
                    {currentTab === "overview" && (
                      <div className="p-4 space-y-3">
                        {proj.hasGisSimulator ? (
                          <div className="space-y-3">
                            <div className="flex justify-between items-center text-xs font-mono text-slate-700 dark:text-slate-400">
                              <span className="flex items-center gap-1 text-cyan-800 dark:text-cyan-400 font-bold">
                                <Crosshair className="w-3.5 h-3.5" /> Interactive Spatial Query Sandbox (Click Grid)
                              </span>
                              <div className="flex gap-2">
                                <button
                                  onClick={() => setIsGistMode(!isGistMode)}
                                  className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold border ${
                                    isGistMode
                                      ? "bg-cyan-100 dark:bg-cyan-950 text-cyan-900 dark:text-cyan-300 border-cyan-400"
                                      : "bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-300 border-amber-400"
                                  }`}
                                >
                                  {isGistMode ? "GiST R-Tree Index" : "Sequential Scan"}
                                </button>
                                <button
                                  onClick={() => setShowSqlExplain(!showSqlExplain)}
                                  className="text-[10px] text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white"
                                >
                                  Toggle EXPLAIN Plan
                                </button>
                              </div>
                            </div>

                            <div
                              onClick={handleGisCanvasClick}
                              className="relative h-20 w-full bg-slate-100 dark:bg-[#070b14] rounded-lg border border-dashed border-slate-300 dark:border-slate-800 cursor-crosshair overflow-hidden"
                            >
                              <div
                                className={`absolute w-6 h-6 -ml-3 -mt-3 rounded-full border-2 ${
                                  isGistMode ? "border-cyan-600 bg-cyan-500/20" : "border-amber-600 bg-amber-500/20"
                                } animate-ping`}
                                style={{ left: `${gisCoord.x}%`, top: `${gisCoord.y}%` }}
                              />
                              <div
                                className={`absolute w-2.5 h-2.5 -ml-1.5 -mt-1.5 rounded-full ${
                                  isGistMode ? "bg-cyan-600 dark:bg-cyan-400" : "bg-amber-600 dark:bg-amber-400"
                                }`}
                                style={{ left: `${gisCoord.x}%`, top: `${gisCoord.y}%` }}
                              />
                            </div>

                            {showSqlExplain && (
                              <div className="p-3 bg-[#070b14] text-slate-100 rounded-lg font-mono text-[11px] space-y-1 border border-slate-800">
                                <span className="text-cyan-400 block font-bold">PostgreSQL Query Planner Output:</span>
                                {isGistMode ? (
                                  <pre className="text-cyan-300 whitespace-pre-wrap">
                                    Bitmap Heap Scan on urban_hazard_layers (cost=0.28..8.30 rows=12)<br />
                                    &nbsp;&nbsp;-&gt; Bitmap Index Scan on idx_hazard_gist<br />
                                    Execution Time: 3.12ms | Buffers: shared hit=14
                                  </pre>
                                ) : (
                                  <pre className="text-amber-300 whitespace-pre-wrap">
                                    Seq Scan on urban_hazard_layers (cost=0.00..1240.00 rows=14800)<br />
                                    &nbsp;&nbsp;Filter: ST_DWithin(geom, $1, 5000)<br />
                                    Execution Time: 118.40ms | Buffers: shared read=480
                                  </pre>
                                )}
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="p-4 bg-white dark:bg-[#0d1527] rounded-lg border border-slate-200 dark:border-slate-800 font-mono text-xs space-y-2">
                            <span className="text-cyan-800 dark:text-cyan-400 font-bold block">
                              Architecture Highlights:
                            </span>
                            <ul className="list-disc list-inside space-y-1 text-slate-700 dark:text-slate-300">
                              {proj.architecture.highlights.map((h, i) => (
                                <li key={i}>{h}</li>
                              ))}
                            </ul>
                            <div className="pt-2 text-slate-600 dark:text-slate-400 text-[11px] italic">
                              "{proj.architecture.tradeoffs}"
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Tab 2: Code Snippet */}
                    {currentTab === "code" && (
                      <div className="p-4 bg-[#070b14] text-slate-100 overflow-x-auto text-xs font-mono">
                        <pre className="text-cyan-300 leading-relaxed">{proj.codeSnippet}</pre>
                      </div>
                    )}

                    {/* Tab 3: System Topology */}
                    {currentTab === "architecture" && (
                      <div className="p-4 space-y-3 font-mono text-xs">
                        <div className="relative w-full h-32 bg-white dark:bg-[#070b14] rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden">
                          <svg className="absolute inset-0 w-full h-full">
                            {proj.architecture.connections.map((conn) => {
                              const from = proj.architecture.nodes.find((n) => n.id === conn.from);
                              const to = proj.architecture.nodes.find((n) => n.id === conn.to);
                              if (!from || !to) return null;

                              const path = `M ${from.x + 40} ${from.y} C ${
                                (from.x + to.x) / 2
                              } ${from.y}, ${(from.x + to.x) / 2} ${to.y}, ${to.x - 30} ${to.y}`;

                              return (
                                <path
                                  key={`${conn.from}-${conn.to}`}
                                  d={path}
                                  fill="none"
                                  stroke={isLight ? "#0891b2" : "#22d3ee"}
                                  strokeWidth="2"
                                  strokeDasharray="4 6"
                                  className="animate-[dash_1.5s_linear_infinite]"
                                />
                              );
                            })}
                          </svg>

                          {proj.architecture.nodes.map((node) => (
                            <div
                              key={node.id}
                              className="absolute -translate-x-1/2 -translate-y-1/2 px-2.5 py-1 rounded text-[11px] font-mono border bg-white dark:bg-[#0d1527] border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 shadow-xs"
                              style={{ left: node.x, top: node.y }}
                            >
                              {node.label}
                            </div>
                          ))}
                        </div>

                        <div className="p-3 bg-white dark:bg-[#0d1527] rounded-lg border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-xs">
                          <strong className="text-cyan-800 dark:text-cyan-400 block mb-1">
                            Core Trade-off Decision:
                          </strong>
                          {proj.architecture.tradeoffs}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Systems Lab */}
        <section id="systems-lab" className="space-y-6">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-3 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <h2 className="text-xl font-bold text-slate-950 dark:text-white flex items-center gap-2">
                <Cpu className="w-5 h-5 text-cyan-800 dark:text-cyan-400" /> Systems Engineering Interactive Lab
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                Live interactive visualizers exploring operating system memory, Go channel concurrency, TCP flow, and probabilistic hashing.
              </p>
            </div>
            <span className="text-[11px] font-mono text-cyan-800 dark:text-cyan-400 font-bold">Low-Level CS Internals</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* WORKBENCH 1: Memory Slab Allocator */}
            <div className="p-5 bg-white dark:bg-[#0d1527] border border-slate-200/90 dark:border-slate-800 rounded-xl space-y-4 flex flex-col justify-between shadow-xs hover:border-cyan-500/40 transition">
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="text-cyan-900 dark:text-cyan-400 flex items-center gap-1.5 font-bold">
                    <HardDrive className="w-4 h-4" /> 1. Virtual Memory Slab Allocator
                  </span>
                  <span className="text-slate-700 dark:text-slate-400 font-semibold">Ptr: {lastMalloc}</span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  Contiguous heap allocations with 64-byte alignment headers, showing fragmentation and free list sweeps.
                </p>

                <div className="grid grid-cols-8 gap-1.5 p-3 bg-slate-50 dark:bg-[#070b14] rounded-lg border border-slate-200 dark:border-slate-800 my-3">
                  {memoryHeap.map((slab) => (
                    <div
                      key={slab.id}
                      className={`h-5 rounded-sm transition-all border ${
                        slab.allocated
                          ? "bg-cyan-600 dark:bg-cyan-500/80 border-cyan-700 dark:border-cyan-400 shadow-2xs"
                          : "bg-slate-200 dark:bg-slate-900 border-slate-300 dark:border-slate-800"
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
                  className="px-3 py-1 bg-cyan-600 hover:bg-cyan-700 text-white dark:bg-cyan-500 dark:hover:bg-cyan-400 dark:text-slate-950 font-bold rounded-md transition shadow-2xs"
                >
                  malloc(64B)
                </button>
                <button
                  onClick={freeMemoryBlock}
                  className="px-3 py-1 bg-slate-100 hover:bg-slate-200 dark:bg-[#1e293b] dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-300 rounded-md transition"
                >
                  free()
                </button>
                <button
                  onClick={sweepGarbageCollection}
                  className="px-3 py-1 bg-slate-50 hover:bg-slate-100 dark:bg-[#070b14] border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 rounded-md transition"
                >
                  gc_sweep()
                </button>
              </div>
            </div>

            {/* WORKBENCH 2: Go Goroutine & Channel Concurrency */}
            <div className="p-5 bg-white dark:bg-[#0d1527] border border-slate-200/90 dark:border-slate-800 rounded-xl space-y-4 flex flex-col justify-between shadow-xs hover:border-cyan-500/40 transition">
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="text-cyan-900 dark:text-cyan-400 flex items-center gap-1.5 font-bold">
                    <Workflow className="w-4 h-4" /> 2. Go Channel Deadlock Simulator
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] uppercase font-mono font-bold ${
                      goroutineStatus === "deadlocked"
                        ? "bg-rose-100 dark:bg-rose-950 border border-rose-300 dark:border-rose-800 text-rose-800 dark:text-rose-300 animate-pulse"
                        : "bg-slate-100 dark:bg-[#1e293b] text-cyan-900 dark:text-cyan-300"
                    }`}
                  >
                    {goroutineStatus}
                  </span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  Worker goroutines reading and writing to a synchronized Go channel (`ch := make(chan int, {channelCapacity})`).
                </p>

                <div className="p-3 bg-slate-50 dark:bg-[#070b14] rounded-lg border border-slate-200 dark:border-slate-800 my-3 flex items-center justify-between font-mono text-xs">
                  <span className="text-slate-600 dark:text-slate-400 font-semibold">Producer &rarr;</span>
                  <div className="flex gap-2">
                    {Array.from({ length: channelCapacity }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-10 h-8 rounded border flex items-center justify-center font-bold transition-all ${
                          channelBuffer[i] !== undefined
                            ? "bg-cyan-100 dark:bg-cyan-950 border-cyan-500 text-cyan-950 dark:text-cyan-300"
                            : "bg-slate-200 dark:bg-slate-900 border-slate-300 dark:border-slate-800 text-slate-600 dark:text-slate-50"
                        }`}
                      >
                        {channelBuffer[i] ?? "∅"}
                      </div>
                    ))}
                  </div>
                  <span className="text-slate-600 dark:text-slate-400 font-semibold">&rarr; Consumer</span>
                </div>

                {deadlockError && (
                  <p className="text-[11px] font-mono text-rose-800 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/30 p-2 rounded border border-rose-200 dark:border-rose-900/60">
                    {deadlockError}
                  </p>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-xs">
                <button
                  onClick={produceChannelMessage}
                  className="px-3 py-1 bg-cyan-600 hover:bg-cyan-700 text-white dark:bg-cyan-500 dark:hover:bg-cyan-400 dark:text-slate-950 font-bold rounded-md transition shadow-2xs"
                >
                  ch &lt;- val
                </button>
                <button
                  onClick={consumeChannelMessage}
                  className="px-3 py-1 bg-slate-100 hover:bg-slate-200 dark:bg-[#1e293b] dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-300 rounded-md transition"
                >
                  &lt;- ch
                </button>
                <button
                  onClick={() => {
                    setChannelBuffer([]);
                    setGoroutineStatus("idle");
                    setDeadlockError(null);
                  }}
                  className="px-3 py-1 bg-slate-50 hover:bg-slate-100 dark:bg-[#070b14] border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 rounded-md transition"
                >
                  Reset Hub
                </button>
              </div>
            </div>

            {/* WORKBENCH 3: TCP Handshake */}
            <div className="p-5 bg-white dark:bg-[#0d1527] border border-slate-200/90 dark:border-slate-800 rounded-xl space-y-4 flex flex-col justify-between shadow-xs hover:border-cyan-500/40 transition">
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="text-cyan-900 dark:text-cyan-400 flex items-center gap-1.5 font-bold">
                    <Wifi className="w-4 h-4" /> 3. TCP 3-Way Handshake Pipeline
                  </span>
                  <span className="text-slate-700 dark:text-slate-400 font-semibold">State: {tcpState}</span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  SYN / SYN-ACK / ACK progression stepping through congestion window controls and socket lifecycles.
                </p>

                <div className="p-3 bg-slate-50 dark:bg-[#070b14] rounded-lg border border-slate-200 dark:border-slate-800 my-3 font-mono text-xs space-y-2">
                  <div className="flex justify-between items-center text-slate-700 dark:text-slate-300">
                    <span className="text-cyan-800 dark:text-cyan-400 font-bold">CLIENT</span>
                    <span>Socket Protocol Stream</span>
                    <span className="text-sky-800 dark:text-sky-400 font-bold">SERVER</span>
                  </div>
                  <div className="h-10 border border-dashed border-slate-300 dark:border-slate-800 rounded flex items-center justify-center text-slate-900 dark:text-slate-200 font-semibold">
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
                  className="px-3 py-1 bg-cyan-600 hover:bg-cyan-700 text-white dark:bg-cyan-500 dark:hover:bg-cyan-400 dark:text-slate-950 font-bold rounded-md transition shadow-2xs"
                >
                  Step Handshake &rarr;
                </button>
                <span className="text-[11px] text-slate-600 dark:text-slate-400 font-semibold">cwnd = {cwndSize} MSS</span>
              </div>
            </div>

            {/* WORKBENCH 4: Bloom Filter */}
            <div className="p-5 bg-white dark:bg-[#0d1527] border border-slate-200/90 dark:border-slate-800 rounded-xl space-y-4 flex flex-col justify-between shadow-xs hover:border-cyan-500/40 transition">
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="text-cyan-900 dark:text-cyan-400 flex items-center gap-1.5 font-bold">
                    <Binary className="w-4 h-4" /> 4. Probabilistic Bloom Filter Probe
                  </span>
                  <span className="text-slate-700 dark:text-slate-400 font-semibold">32-bit Array (k=3)</span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  Calculates 3 modulo hash offsets per key to guarantee zero false-negatives before hitting disk.
                </p>

                <div className="grid grid-cols-16 gap-1 p-2 bg-slate-50 dark:bg-[#070b14] rounded-lg border border-slate-200 dark:border-slate-800 my-3">
                  {bloomArray.map((bit, idx) => (
                    <div
                      key={idx}
                      className={`h-4 rounded-[2px] transition-all flex items-center justify-center text-[9px] font-mono ${
                        bit === 1
                          ? "bg-cyan-600 dark:bg-cyan-400 text-white dark:text-slate-950 font-bold"
                          : "bg-slate-200 dark:bg-slate-900 text-slate-600 dark:text-slate-500"
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
                    className="w-full bg-slate-50 dark:bg-[#070b14] border border-slate-300 dark:border-slate-800 rounded px-2.5 py-1 text-xs font-mono text-slate-900 dark:text-slate-200 focus:outline-none"
                    placeholder="Enter key to hash..."
                  />
                  {bloomMatch !== null && (
                    <span
                      className={`text-[10px] font-mono px-2 py-1 rounded whitespace-nowrap font-bold ${
                        bloomMatch
                          ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800"
                          : "bg-rose-100 dark:bg-rose-950 text-rose-900 dark:text-rose-300 border border-rose-300 dark:border-rose-800"
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
                  className="px-3 py-1 bg-cyan-600 hover:bg-cyan-700 text-white dark:bg-cyan-500 dark:hover:bg-cyan-400 dark:text-slate-950 font-bold rounded-md transition shadow-2xs"
                >
                  Insert Key
                </button>
                <button
                  onClick={handleBloomCheck}
                  className="px-3 py-1 bg-slate-100 hover:bg-slate-200 dark:bg-[#1e293b] border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-300 rounded-md transition"
                >
                  Check Key
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Vector Engine Benchmark */}
        <section id="benchmark" className="p-6 border border-slate-200/90 dark:border-slate-800 rounded-xl bg-white dark:bg-[#0d1527] space-y-4 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
            <div>
              <h2 className="text-xl font-bold text-slate-950 dark:text-white flex items-center gap-2">
                <Gauge className="w-5 h-5 text-cyan-800 dark:text-cyan-400" /> In-Browser Vector Engine Benchmark
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                Stress-testing Euclidean distance across 50,000 iterations of 128-dimensional dense float vectors in memory.
              </p>
            </div>
            <button
              onClick={runVectorBenchmark}
              disabled={isBenchmarking}
              className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-sky-400 text-slate-950 text-xs font-mono font-bold rounded-lg disabled:opacity-50 transition-all transform hover:-translate-y-0.5 flex items-center gap-2 self-start sm:self-auto shadow-[0_0_15px_rgba(6,182,212,0.4)]"
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
            <div className="p-3 bg-slate-50 dark:bg-[#070b14] rounded-lg border border-slate-200 dark:border-slate-800">
              <span className="text-slate-600 dark:text-slate-400 block mb-1 font-semibold">Standard Loop</span>
              <span className="text-lg font-bold text-slate-950 dark:text-slate-100">
                {benchmarkResults ? `${benchmarkResults.jsTime} ms` : "–"}
              </span>
              <span className="text-[10px] text-slate-500 block mt-1">Direct indexing</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-[#070b14] rounded-lg border border-slate-200 dark:border-slate-800">
              <span className="text-slate-600 dark:text-slate-400 block mb-1 font-semibold">Unrolled SIMD-Style Vector</span>
              <span className="text-lg font-bold text-cyan-800 dark:text-cyan-400">
                {benchmarkResults ? `${benchmarkResults.optTime} ms` : "–"}
              </span>
              <span className="text-[10px] text-slate-500 block mt-1">4-way parallel stride</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-[#070b14] rounded-lg border border-slate-200 dark:border-slate-800">
              <span className="text-slate-600 dark:text-slate-400 block mb-1 font-semibold">Measured Speedup</span>
              <span className="text-lg font-bold text-emerald-800 dark:text-emerald-400">
                {benchmarkResults ? benchmarkResults.speedup : "–"}
              </span>
              <span className="text-[10px] text-slate-500 block mt-1">Zero heap allocations</span>
            </div>
          </div>
        </section>

        {/* Technical Writing & Notes */}
        <section id="articles" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
            <h2 className="text-xl font-bold text-slate-950 dark:text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-slate-600 dark:text-slate-400" /> Engineering Writing & Notes
            </h2>
            <a
              href="https://dev.to/christian-otieno"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-mono text-cyan-800 dark:text-cyan-400 hover:underline flex items-center gap-1 font-bold"
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
                className="block p-5 border border-slate-200/90 dark:border-slate-800 rounded-xl bg-white dark:bg-[#0d1527] hover:border-cyan-400/50 transition group shadow-xs hover:shadow-md"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h3 className="text-base font-semibold text-slate-950 dark:text-slate-100 group-hover:text-cyan-800 dark:group-hover:text-cyan-400 transition">
                    {art.title}
                  </h3>
                  <span className="text-xs font-mono text-slate-500">{art.date}</span>
                </div>
                <p className="mt-2 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{art.summary}</p>
                <div className="mt-3 flex gap-2">
                  {art.tags.map((t) => (
                    <span key={t} className="text-xs font-mono text-slate-600 dark:text-slate-400 font-medium">
                      #{t}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Technical Interests & Lensing Canvas */}
        <section id="interests" className="space-y-6">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-3 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <h2 className="text-xl font-bold text-slate-950 dark:text-white flex items-center gap-2">
                <Compass className="w-5 h-5 text-slate-600 dark:text-slate-400" /> Technical Interests & Modeling Pursuits
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                Independent exploration in computational physics, complex systems, and formal logic.
              </p>
            </div>
            <span className="text-[11px] font-mono text-cyan-800 dark:text-cyan-400 font-bold">
              Interactive Gravitational Lensing (Drag to Lens) &darr;
            </span>
          </div>

          <div
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setLensPos({
                x: Math.round(e.clientX - rect.left),
                y: Math.round(e.clientY - rect.top),
              });
            }}
            className="relative rounded-xl border border-slate-200/90 dark:border-slate-800 overflow-hidden bg-white dark:bg-[#070b14] p-3 cursor-move shadow-xs"
          >
            <div className="flex justify-between items-center text-xs font-mono text-slate-700 dark:text-slate-300 mb-2 px-1 font-medium">
              <span>Relativistic Light Deflection Raytracer (alpha = 4GM / c^2 xi)</span>
              <span className="text-slate-500">Lens Pos: ({lensPos.x}, {lensPos.y})</span>
            </div>
            <canvas
              ref={lensingCanvasRef}
              width={540}
              height={140}
              className="w-full h-28 rounded bg-slate-100 dark:bg-[#0d1527]"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {hobbies.map((hobby) => {
              const Icon = hobby.icon;
              return (
                <div
                  key={hobby.title}
                  className="p-5 border border-slate-200/90 dark:border-slate-800 rounded-xl bg-white dark:bg-[#0d1527] hover:border-cyan-500/40 transition flex flex-col justify-between shadow-xs"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-cyan-800 dark:text-cyan-400" />
                        <h3 className="text-sm sm:text-base font-semibold text-slate-950 dark:text-slate-100">
                          {hobby.title}
                        </h3>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-[#070b14] border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                        {hobby.badge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mt-2">
                      {hobby.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="space-y-4">
          <h2 className="text-xl font-bold text-slate-950 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-3">Get in Touch</h2>
          <p className="text-slate-700 dark:text-slate-300 text-sm max-w-xl">
            Currently open to backend engineering roles, systems contracts, and collaborative research projects.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => handleCopy("christianamos67@gmail.com", "email-copy")}
              className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-[#0d1527] border border-slate-300 dark:border-slate-800 rounded-lg text-xs sm:text-sm font-mono text-slate-800 dark:text-slate-200 hover:border-cyan-600 dark:hover:border-slate-700 transition shadow-2xs"
            >
              {copiedKey === "email-copy" ? (
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              ) : (
                <Mail className="w-4 h-4 text-cyan-800 dark:text-cyan-400" />
              )}
              <span>{copiedKey === "email-copy" ? "Copied Email!" : "christianamos67@gmail.com"}</span>
            </button>

            <a
              href="https://github.com/Christian3788"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-[#0d1527] border border-slate-300 dark:border-slate-800 rounded-lg text-xs sm:text-sm font-mono text-slate-800 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-700 transition shadow-2xs"
            >
              <GithubIcon className="w-4 h-4" /> GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/christian-otieno-9a9806229/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-[#0d1527] border border-slate-300 dark:border-slate-800 rounded-lg text-xs sm:text-sm font-mono text-slate-800 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-700 transition text-sky-700 dark:text-sky-400 shadow-2xs"
            >
              <LinkedinIcon className="w-4 h-4" /> LinkedIn
            </a>
          </div>
        </section>
      </main>

      {/* Floating Action Dock */}
      <aside aria-label="Quick Actions" className="fixed bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 z-40 bg-white/95 dark:bg-[#0d1527]/95 backdrop-blur-md border border-slate-300/90 dark:border-slate-800 rounded-full px-3.5 py-1.5 sm:px-4 sm:py-2 shadow-xl flex items-center gap-2.5 sm:gap-3 text-xs font-mono">
        <button
          onClick={() => {
            playHapticClick(90, 0.02);
            setIsCommandOpen(true);
          }}
          className="flex items-center gap-1.5 text-slate-800 dark:text-slate-200 hover:text-cyan-800 dark:hover:text-cyan-400 font-bold transition"
        >
          <Command className="w-3.5 h-3.5 text-cyan-700 dark:text-cyan-400" />
          <span className="hidden sm:inline">Actions</span>
          <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] text-slate-600 dark:text-slate-400">Ctrl+K</kbd>
        </button>

        <span className="w-px h-3.5 bg-slate-300 dark:bg-slate-800" />

        <button
          onClick={downloadDynamicResume}
          className="flex items-center gap-1 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition font-semibold"
          title="Download Plaintext Resume"
        >
          <Download className="w-3.5 h-3.5 text-cyan-700 dark:text-cyan-400" />
          <span>CV</span>
        </button>

        <span className="w-px h-3.5 bg-slate-300 dark:bg-slate-800" />

        <button
          onClick={() => handleCopy("christianamos67@gmail.com", "quick-copy")}
          className="flex items-center gap-1 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition font-semibold"
        >
          <Mail className="w-3.5 h-3.5 text-cyan-700 dark:text-cyan-400" />
          <span>
            {copiedKey === "quick-copy" ? "Copied!" : "Email"}
          </span>
        </button>
      </aside>

      {/* Command Palette Drawer */}
      {isCommandOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 dark:bg-black/80 backdrop-blur-xs flex items-start justify-center pt-24 p-4">
          <div className="w-full max-w-lg bg-white dark:bg-[#070b14] border border-slate-300 dark:border-slate-800 rounded-xl overflow-hidden shadow-2xl font-mono text-xs">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0d1527]">
              <Command className="w-4 h-4 text-cyan-800 dark:text-cyan-400" />
              <input
                type="text"
                value={commandQuery}
                onChange={(e) => setCommandQuery(e.target.value)}
                placeholder="Jump to section or run action..."
                autoFocus
                className="w-full bg-transparent text-slate-900 dark:text-slate-100 placeholder-slate-500 focus:outline-none"
              />
              <button
                onClick={() => setIsCommandOpen(false)}
                className="text-slate-500 hover:text-slate-950 dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-2 max-h-72 overflow-y-auto space-y-1">
              <span className="text-[10px] text-slate-500 px-3 uppercase tracking-wider block py-1 font-semibold">
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
                  className="block px-3 py-2 rounded-md hover:bg-slate-100 dark:hover:bg-[#0d1527] text-slate-800 dark:text-slate-300 hover:text-cyan-800 dark:hover:text-cyan-400 transition font-medium"
                >
                  {cmd.label}
                </a>
              ))}

              <span className="text-[10px] text-slate-500 px-3 uppercase tracking-wider block pt-2 py-1 font-semibold">
                Actions
              </span>
              <button
                onClick={() => {
                  playHapticClick(100, 0.02);
                  setIsCommandOpen(false);
                  setIsResumeOpen(true);
                }}
                className="w-full text-left px-3 py-2 rounded-md hover:bg-slate-100 dark:hover:bg-[#0d1527] text-slate-800 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition flex items-center justify-between font-medium"
              >
                <span>Open Resume Drawer</span>
                <span className="text-slate-500 text-[10px]">Action</span>
              </button>
              <button
                onClick={() => {
                  handleCopy("christianamos67@gmail.com", "email-copy");
                  setIsCommandOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-md hover:bg-slate-100 dark:hover:bg-[#0d1527] text-slate-800 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition flex items-center justify-between font-medium"
              >
                <span>Copy Email (christianamos67@gmail.com)</span>
                <span className="text-slate-500 text-[10px]">Clipboard</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Resume Modal */}
      {isResumeOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 dark:bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-3xl bg-white dark:bg-[#070b14] border border-slate-300 dark:border-slate-800 rounded-xl overflow-hidden shadow-2xl p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div>
                <span className="text-xs font-mono text-cyan-800 dark:text-cyan-400 uppercase tracking-wider font-bold">
                  Curriculum Vitae
                </span>
                <h3 className="text-xl font-bold text-slate-950 dark:text-white mt-1">Christian Amos Otieno</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-mono mt-0.5">
                  Full-Stack Software Engineer • +254 713114123 • christianamos67@gmail.com
                </p>
              </div>
              <button
                onClick={() => {
                  playHapticClick(90, 0.02);
                  setIsResumeOpen(false);
                }}
                className="text-slate-500 hover:text-slate-950 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-5 text-sm text-slate-800 dark:text-slate-300 max-h-[60vh] overflow-y-auto pr-2 font-sans">
              <div>
                <h4 className="font-semibold text-slate-950 dark:text-white uppercase text-xs tracking-wider border-b border-slate-200 dark:border-slate-800 pb-1">
                  Professional Summary
                </h4>
                <p className="text-slate-700 dark:text-slate-300 mt-2 text-xs leading-relaxed">
                  Adaptive, highly analytical Full-Stack Software Engineer with extensive experience architecting scalable backend systems, high-performance web applications, and database integrations. Specialized in leveraging Go (Golang) for high-concurrency services, network protocols, and core CS optimization alongside modern frontends using TypeScript, Next.js, and Tailwind CSS.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-slate-950 dark:text-white uppercase text-xs tracking-wider border-b border-slate-200 dark:border-slate-800 pb-1">
                  Technical Skills
                </h4>
                <p className="text-slate-700 dark:text-slate-300 mt-2 text-xs leading-relaxed font-mono">
                  <strong className="text-slate-950 dark:text-slate-100">Languages:</strong> Go (Golang), TypeScript, JavaScript (ES6+), Python, SQL, HTML5, CSS3<br />
                  <strong className="text-slate-950 dark:text-slate-100">Frameworks:</strong> Next.js, React, Node.js, Prisma ORM, NextAuth, Tailwind CSS<br />
                  <strong className="text-slate-950 dark:text-slate-100">Databases & DevOps:</strong> PostgreSQL, PostGIS, Redis, Docker, Git, Linux/Bash Scripting
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-slate-950 dark:text-white uppercase text-xs tracking-wider border-b border-slate-200 dark:border-slate-800 pb-1">
                  Featured Projects
                </h4>
                <div className="space-y-3 mt-2 text-xs text-slate-700 dark:text-slate-300">
                  <div>
                    <span className="font-semibold text-slate-950 dark:text-white">LYRIC – Real-Time Music Streaming Platform</span>
                    <p className="mt-0.5">
                      Go, Next.js, WebSockets, MinIO S3, Redis, Prisma. HTTP 206 partial content range streaming engine with synchronized group listening rooms.
                    </p>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-950 dark:text-white">Spatial Risk Analytics Engine</span>
                    <p className="mt-0.5">
                      PostGIS, Next.js, Prisma, TypeScript. Sub-10ms geometric bounding queries utilizing GiST indexes and IPCC vulnerability scoring formulas.
                    </p>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-950 dark:text-white">Vector-Vanguard</span>
                    <p className="mt-0.5">
                      Go, Python, Docker. High-dimensional vector similarity index and nearest-neighbor search engine.
                    </p>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-950 dark:text-white">kijijiShare</span>
                    <p className="mt-0.5">
                      Next.js, TypeScript, PostgreSQL, Prisma. Hyperlocal resource sharing and community circular economy exchange platform.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-slate-950 dark:text-white uppercase text-xs tracking-wider border-b border-slate-200 dark:border-slate-800 pb-1">
                  Professional Experience & Education
                </h4>
                <div className="text-xs text-slate-700 dark:text-slate-300 space-y-1 mt-2">
                  <p>
                    <strong className="text-slate-950 dark:text-slate-100">Apprentice Software Engineer</strong> – Zone01 Kisumu (2026 – Present)
                  </p>
                  <p>
                    <strong className="text-slate-950 dark:text-slate-100">Neuro-Analytics & Brain-Data Integration</strong> – Skills for Africa (2023 – 2024)
                  </p>
                  <p>
                    <strong className="text-slate-950 dark:text-slate-100">B.Sc. in Microbiology and Biotechnology</strong> – Aga Khan University (2019 – 2022)
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-slate-200 dark:border-slate-800">
              <button
                onClick={downloadDynamicResume}
                className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-cyan-500 to-sky-400 text-slate-950 text-xs font-bold rounded-md transition shadow-[0_0_15px_rgba(6,182,212,0.4)]"
              >
                <Download className="w-3.5 h-3.5" /> Compile & Download CV
              </button>
              <button
                onClick={() => {
                  playHapticClick(90, 0.02);
                  setIsResumeOpen(false);
                }}
                className="px-4 py-2 bg-slate-100 dark:bg-[#0d1527] border border-slate-300 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-300 rounded-md hover:bg-slate-200 dark:hover:bg-slate-800 font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-200 dark:border-slate-800 py-10 text-center text-xs font-mono text-slate-600 dark:text-slate-400 pb-20">
        © {new Date().getFullYear()} Christian Amos Otieno. Built with Go, Next.js & Tailwind CSS.
      </footer>
    </div>
  );
}