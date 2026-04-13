"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuoteStore } from "@/modules/quote/store";
import { useListQuotes, useCreateQuote } from "@/modules/quote/hooks/useQuote";
import { Quote } from "@/modules/quote/types";

function statusBadge(status: string) {
  const isPublished = status === "published";
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      fontSize: "0.72rem", fontWeight: 500, letterSpacing: "0.06em",
      textTransform: "uppercase", padding: "3px 9px", borderRadius: 20,
      background: isPublished ? "rgba(39,174,96,0.12)" : "rgba(201,169,110,0.12)",
      color: isPublished ? "#4caf50" : "var(--accent)",
      border: `1px solid ${isPublished ? "rgba(39,174,96,0.25)" : "rgba(201,169,110,0.25)"}`,
    }}>
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: isPublished ? "#4caf50" : "var(--accent)", display: "inline-block" }} />
      {status}
    </span>
  );
}

export default function QuotesPage() {
  const router = useRouter();
  const quotes = useQuoteStore((s) => s.quotes);
  const loading = useQuoteStore((s) => s.loading);
  const error = useQuoteStore((s) => s.error);
  const { listQuotes } = useListQuotes();

  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [customerName, setCustomerName] = useState("");
  const { createQuote } = useCreateQuote();
  const creating = useQuoteStore((s) => s.loading);

  useEffect(() => { listQuotes(); }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    await createQuote({ title, customer_name: customerName });
  };

  return (
    <main style={{ maxWidth: 860, margin: "0 auto", padding: "40px 24px" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 32 }}>
        <div>
          <h1 style={{ fontSize: "2rem", marginBottom: 6 }}>Quotes</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.88rem" }}>
            {quotes.length} quote{quotes.length !== 1 ? "s" : ""} total
          </p>
        </div>
        <button
          onClick={() => setShowForm((v) => !v)}
          style={{ background: "var(--accent)", color: "#0f0f0f", fontWeight: 600, padding: "9px 18px" }}
        >
          {showForm ? "Cancel" : "+ New Quote"}
        </button>
      </div>

      {/* Inline create form */}
      {showForm && (
        <div style={{
          background: "var(--surface)", border: "1px solid var(--border)",
          borderRadius: "var(--radius-lg)", padding: "20px 24px", marginBottom: 28,
        }}>
          <h3 style={{ marginBottom: 16, fontSize: "1rem" }}>Create New Quote</h3>
          {error && (
            <div style={{
              background: "rgba(192,57,43,0.1)", border: "1px solid rgba(192,57,43,0.3)",
              borderRadius: "var(--radius)", padding: "8px 12px", color: "#e57373",
              fontSize: "0.82rem", marginBottom: 14,
            }}>{error}</div>
          )}
          <form onSubmit={handleCreate} style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: 10, alignItems: "end" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.7rem", color: "var(--text-muted)", marginBottom: 5, letterSpacing: "0.06em", textTransform: "uppercase" }}>Title</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Project name" required />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.7rem", color: "var(--text-muted)", marginBottom: 5, letterSpacing: "0.06em", textTransform: "uppercase" }}>Customer</label>
              <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} placeholder="Customer name" required />
            </div>
            <button type="submit" disabled={creating} style={{
              background: "var(--accent)", color: "#0f0f0f", fontWeight: 600, padding: "9px 18px",
            }}>
              {creating ? "Creating…" : "Create →"}
            </button>
          </form>
        </div>
      )}

      {/* Quotes table */}
      {loading && quotes.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 0", color: "var(--text-dim)", fontSize: "0.88rem" }}>Loading…</div>
      ) : quotes.length === 0 ? (
        <div style={{
          textAlign: "center", padding: "60px 24px",
          border: "1px dashed var(--border)", borderRadius: "var(--radius-lg)",
          color: "var(--text-dim)", fontSize: "0.88rem",
        }}>
          No quotes yet. Create your first one above.
        </div>
      ) : (
        <div style={{ border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", overflow: "hidden" }}>
          {/* Table header */}
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 180px 120px 100px",
            padding: "9px 16px", background: "var(--surface-2)",
            borderBottom: "1px solid var(--border)",
            fontSize: "0.7rem", color: "var(--text-dim)", letterSpacing: "0.07em", textTransform: "uppercase",
          }}>
            <span>Title / Customer</span>
            <span>Created</span>
            <span>Status</span>
            <span>Action</span>
          </div>

          {quotes.map((q: Quote, i) => (
            <div
              key={q.id}
              style={{
                display: "grid", gridTemplateColumns: "1fr 180px 120px 100px",
                padding: "14px 16px", alignItems: "center",
                borderBottom: i < quotes.length - 1 ? "1px solid var(--border)" : "none",
                cursor: "pointer", transition: "background 0.1s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.02)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              onClick={() => router.push(`/quotes/${q.id}`)}
            >
              <div>
                <div style={{ fontWeight: 500, fontSize: "0.9rem", marginBottom: 2 }}>{q.title}</div>
                <div style={{ color: "var(--text-muted)", fontSize: "0.78rem" }}>{q.customer_name}</div>
              </div>
              <span style={{ color: "var(--text-muted)", fontSize: "0.82rem" }}>
                {new Date(q.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </span>
              {statusBadge(q.status)}
              <span style={{ color: "var(--accent)", fontSize: "0.82rem" }}>View →</span>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
