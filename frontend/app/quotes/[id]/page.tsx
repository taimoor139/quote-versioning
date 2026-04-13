"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useQuoteStore } from "@/modules/quote/store";
import { useLoadQuote, useLineItems, usePublishQuote } from "@/modules/quote/hooks/useQuote";
import { useDocument } from "@/modules/quote/hooks/useDocument";

import { QuoteInfo } from "@/modules/quote/components/QuoteInfo";
import { LineItems } from "@/modules/quote/components/LineItems";
import { Totals } from "@/modules/quote/components/Totals";
import { PublishButton } from "@/modules/quote/components/PublishButton";
import { DocumentPanel } from "@/modules/document/components/DocumentPanel";

export default function QuoteDetailPage() {
  const params = useParams();
  const quoteId = Number(params.id);

  const quote = useQuoteStore((s) => s.quote);
  const loading = useQuoteStore((s) => s.loading);
  const error = useQuoteStore((s) => s.error);

  const { loadQuote } = useLoadQuote();
  const { handleAddItem, handleUpdateItem, handleDeleteItem } = useLineItems();
  const { publishQuote } = usePublishQuote();

  const {
    document: newDocument,
    versions: newVersions,
    loading: docLoading,
    error: docError,
    createDocument,
    uploadVersion,
  } = useDocument();

  useEffect(() => {
    if (quoteId) loadQuote(quoteId);
  }, [quoteId]);

  if (loading && !quote) {
    return (
      <main style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "calc(100vh - 56px)" }}>
        <div style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Loading quote…</div>
      </main>
    );
  }

  if (error && !quote) {
    return (
      <main style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "calc(100vh - 56px)" }}>
        <div style={{
          background: "rgba(192,57,43,0.1)", border: "1px solid rgba(192,57,43,0.25)",
          borderRadius: "var(--radius-lg)", padding: "20px 28px", color: "#e57373",
        }}>{error}</div>
      </main>
    );
  }

  if (!quote) return null;

  return (
    <main style={{ maxWidth: 920, margin: "0 auto", padding: "40px 24px" }}>
      <QuoteInfo quote={quote} />

      {error && (
        <div style={{
          background: "rgba(192,57,43,0.1)", border: "1px solid rgba(192,57,43,0.25)",
          borderRadius: "var(--radius)", padding: "8px 14px", color: "#e57373",
          fontSize: "0.85rem", marginBottom: 16,
        }}>{error}</div>
      )}

      {/* Line Items */}
      <LineItems
        items={quote.items}
        onAdd={handleAddItem}
        onUpdate={handleUpdateItem}
        onDelete={handleDeleteItem}
      />

      {/* Totals */}
      <Totals quote={quote} />

      {/* Publish bar */}
      <div style={{
        marginTop: 28, padding: "18px 0",
        borderTop: "1px solid var(--border)",
        display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12,
      }}>
        <span style={{ fontSize: "0.8rem", color: "var(--text-dim)" }}>
          {quote.status === "draft"
            ? "Review all line items before publishing."
            : `Published · ${new Date(quote.updated_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}`}
        </span>
        <PublishButton
          onPublish={publishQuote}
          loading={loading}
          isPublished={quote.status === "published"}
        />
      </div>

      {/* Documents — hydrate existing docs from quote, allow creating/uploading new ones */}
      <DocumentPanel
        existingDocuments={quote.documents ?? []}
        newDocument={newDocument}
        newVersions={newVersions}
        loading={docLoading}
        error={docError}
        onCreateDocument={createDocument}
        onUploadVersion={uploadVersion}
        quoteId={quoteId}
      />
    </main>
  );
}
