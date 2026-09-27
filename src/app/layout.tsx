import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-christian3788.onrender.com"),
  title: "Christian Amos Otieno | Systems & Full-Stack Engineer",
  description:
    "Software Engineer specializing in Go (Golang) concurrency, distributed streaming engines, spatial PostGIS architectures, and modern Next.js systems.",
  openGraph: {
    title: "Christian Amos Otieno | Systems & Full-Stack Engineer",
    description:
      "High-throughput Go backends, spatial risk pipelines, and real-time audio systems.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Christian Amos Otieno | Systems & Full-Stack Engineer",
    description:
      "High-throughput Go backends, spatial risk pipelines, and real-time audio systems.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${mono.variable} font-sans transition-colors duration-200`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}