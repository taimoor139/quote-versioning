import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Assesment — Quote Management",
  description: "Quote Draft & Versioning System",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <nav style={{
          borderBottom: "1px solid var(--border)",
          padding: "0 32px",
          height: 56,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "var(--surface)",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}>
          <a href="/quotes" style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "1.2rem",
            color: "var(--text)",
            letterSpacing: "-0.02em",
            textDecoration: "none",
          }}>
            Assesment<span style={{ color: "var(--accent)" }}>.</span>
          </a>
          <a href="/quotes" style={{
            fontSize: "0.8rem",
            color: "var(--text-muted)",
            background: "var(--surface-2)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius)",
            padding: "5px 12px",
            textDecoration: "none",
          }}>
            + New Quote
          </a>
        </nav>
        {children}
      </body>
    </html>
  );
}
