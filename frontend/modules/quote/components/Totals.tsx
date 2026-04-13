"use client";

import { QuoteDetail } from "../types";
import { useQuoteStore } from "../store";

interface TotalsProps {
  quote: QuoteDetail;
}

export function Totals({ quote }: TotalsProps) {
  const loading = useQuoteStore((s) => s.loading);

  const subtotal = parseFloat(quote.subtotal ?? "0");
  const tax = parseFloat(quote.tax ?? "0");
  const total = parseFloat(quote.total ?? "0");

  return (
    <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}>
      <div style={{
        width: 280,
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        opacity: loading ? 0.6 : 1,
        transition: "opacity 0.2s",
      }}>
        <div style={{
          padding: "9px 16px",
          background: "var(--surface-2)",
          borderBottom: "1px solid var(--border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
          <span style={{ fontSize: "0.7rem", color: "var(--text-dim)", letterSpacing: "0.07em", textTransform: "uppercase" }}>
            Summary
          </span>
          {loading && (
            <span style={{ fontSize: "0.68rem", color: "var(--accent)", letterSpacing: "0.04em" }}>
              recalculating…
            </span>
          )}
        </div>

        {[
          { label: "Subtotal", value: subtotal },
          { label: "Tax", value: tax },
        ].map(({ label, value }) => (
          <div key={label} style={{
            display: "flex", justifyContent: "space-between",
            padding: "10px 16px", borderBottom: "1px solid var(--border)", fontSize: "0.88rem",
          }}>
            <span style={{ color: "var(--text-muted)" }}>{label}</span>
            <span style={{ fontFamily: "'DM Mono', monospace" }}>${value.toFixed(2)}</span>
          </div>
        ))}

        <div style={{
          display: "flex", justifyContent: "space-between",
          padding: "13px 16px", background: "rgba(201,169,110,0.06)",
        }}>
          <span style={{ fontWeight: 600, fontSize: "0.9rem" }}>Total</span>
          <span style={{ fontFamily: "'DM Mono', monospace", fontWeight: 600, fontSize: "1.05rem", color: "var(--accent)" }}>
            ${total.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
