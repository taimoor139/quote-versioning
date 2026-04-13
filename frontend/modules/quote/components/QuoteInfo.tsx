"use client";

import { Quote } from "../types";

interface QuoteInfoProps {
  quote: Quote;
}

const statusStyle = (status: string) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  fontSize: "0.75rem",
  fontWeight: 500,
  letterSpacing: "0.06em",
  textTransform: "uppercase" as const,
  padding: "4px 10px",
  borderRadius: 20,
  background: status === "published" ? "rgba(39,174,96,0.12)" : "rgba(201,169,110,0.12)",
  color: status === "published" ? "#4caf50" : "var(--accent)",
  border: `1px solid ${status === "published" ? "rgba(39,174,96,0.25)" : "rgba(201,169,110,0.25)"}`,
});

export function QuoteInfo({ quote }: QuoteInfoProps) {
  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ fontSize: "2rem", color: "var(--text)", marginBottom: 6 }}>{quote.title}</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
            {quote.customer_name} &nbsp;·&nbsp; #{quote.id} &nbsp;·&nbsp;{" "}
            {new Date(quote.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>
        <span style={statusStyle(quote.status)}>
          <span style={{
            width: 6, height: 6, borderRadius: "50%",
            background: quote.status === "published" ? "#4caf50" : "var(--accent)",
            display: "inline-block",
          }} />
          {quote.status}
        </span>
      </div>
    </div>
  );
}
