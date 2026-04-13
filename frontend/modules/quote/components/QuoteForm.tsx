"use client";

import { useState, FormEvent } from "react";
import { CreateQuotePayload } from "../types";

interface QuoteFormProps {
  onSubmit: (payload: CreateQuotePayload) => void;
  loading: boolean;
  error: string | null;
}

export function QuoteForm({ onSubmit, loading, error }: QuoteFormProps) {
  const [title, setTitle] = useState("");
  const [customerName, setCustomerName] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({ title, customer_name: customerName });
  };

  return (
    <div style={{
      minHeight: "calc(100vh - 56px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 24px",
    }}>
      <div style={{ width: "100%", maxWidth: 460 }}>
        <div style={{ marginBottom: 36 }}>
          <h1 style={{ fontSize: "2.2rem", color: "var(--text)", marginBottom: 8 }}>New Quote</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
            Create a draft quote to start adding line items.
          </p>
        </div>

        {error && (
          <div style={{
            background: "rgba(192,57,43,0.1)",
            border: "1px solid rgba(192,57,43,0.3)",
            borderRadius: "var(--radius)",
            padding: "10px 14px",
            color: "#e57373",
            fontSize: "0.85rem",
            marginBottom: 20,
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label style={{ display: "block", fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: 6, letterSpacing: "0.06em", textTransform: "uppercase" }}>
              Quote Title
            </label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Website Redesign Project" required />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: 6, letterSpacing: "0.06em", textTransform: "uppercase" }}>
              Customer Name
            </label>
            <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} placeholder="e.g. Acme Corporation" required />
          </div>

          <button type="submit" disabled={loading} style={{
            marginTop: 8,
            background: "var(--accent)",
            color: "#0f0f0f",
            padding: "11px 20px",
            fontWeight: 600,
            fontSize: "0.9rem",
          }}>
            {loading ? "Creating…" : "Create Quote →"}
          </button>
        </form>
      </div>
    </div>
  );
}
