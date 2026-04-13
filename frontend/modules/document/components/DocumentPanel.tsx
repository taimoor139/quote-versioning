"use client";

import { useState, ChangeEvent } from "react";
import { Document, DocumentVersion } from "../types";
import { QuoteDocument } from "@/modules/quote/types";

interface DocumentPanelProps {
  // existing documents from the quote (pre-loaded)
  existingDocuments: QuoteDocument[];
  // newly created document (from this session)
  newDocument: Document | null;
  newVersions: DocumentVersion[];
  loading: boolean;
  error: string | null;
  onCreateDocument: (name: string, quoteId: number) => void;
  onUploadVersion: (documentId: number, file: File) => void;
  quoteId: number;
}

function VersionList({ versions, emptyLabel }: { versions: Array<{ id: number; version_number: number; file_url: string; created_at: string }>; emptyLabel?: string }) {
  if (versions.length === 0) {
    return <p style={{ color: "var(--text-dim)", fontSize: "0.82rem", fontStyle: "italic", padding: "4px 0" }}>{emptyLabel ?? "No versions yet."}</p>;
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 8 }}>
      {versions.map((v) => (
        <div key={v.id} style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "7px 12px", background: "var(--surface-2)",
          borderRadius: "var(--radius)", border: "1px solid var(--border)", fontSize: "0.83rem",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.75rem", color: "var(--accent)" }}>
              v{v.version_number}
            </span>
            <span style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}>
              {new Date(v.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
            </span>
          </div>
          <a href={v.file_url} target="_blank" rel="noreferrer" style={{ fontSize: "0.78rem", color: "var(--accent)" }}>
            Download ↗
          </a>
        </div>
      ))}
    </div>
  );
}

export function DocumentPanel({
  existingDocuments, newDocument, newVersions,
  loading, error, onCreateDocument, onUploadVersion, quoteId,
}: DocumentPanelProps) {
  const [docName, setDocName] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [activeDocId, setActiveDocId] = useState<number | null>(null);
  const [uploadTargetId, setUploadTargetId] = useState<number | null>(null);

  const handleCreate = () => {
    if (docName.trim()) { onCreateDocument(docName.trim(), quoteId); setDocName(""); }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => setSelectedFile(e.target.files?.[0] ?? null);

  const handleUpload = (docId: number) => {
    if (selectedFile) { onUploadVersion(docId, selectedFile); setSelectedFile(null); setUploadTargetId(null); }
  };

  // Combine existing docs with any newly created doc this session
  const allDocuments: QuoteDocument[] = [
    ...existingDocuments,
    ...(newDocument && !existingDocuments.find((d) => d.id === newDocument.id)
      ? [{ ...newDocument, versions: newVersions }]
      : []),
  ];

  return (
    <div style={{ marginTop: 32, border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", overflow: "hidden" }}>
      {/* Panel header */}
      <div style={{
        padding: "10px 16px", background: "var(--surface-2)",
        borderBottom: "1px solid var(--border)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <span style={{ fontSize: "0.7rem", color: "var(--text-dim)", letterSpacing: "0.07em", textTransform: "uppercase" }}>
          Documents & Versions
        </span>
        <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
          {allDocuments.length} document{allDocuments.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div style={{ padding: 16 }}>
        {error && (
          <div style={{
            background: "rgba(192,57,43,0.1)", border: "1px solid rgba(192,57,43,0.25)",
            borderRadius: "var(--radius)", padding: "8px 12px", color: "#e57373",
            fontSize: "0.82rem", marginBottom: 12,
          }}>{error}</div>
        )}

        {/* Existing documents */}
        {allDocuments.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 16 }}>
            {allDocuments.map((doc) => {
              const docVersions = doc.id === newDocument?.id
                ? newVersions
                : (doc.versions ?? []);
              const isOpen = activeDocId === doc.id;

              return (
                <div key={doc.id} style={{ border: "1px solid var(--border)", borderRadius: "var(--radius)", overflow: "hidden" }}>
                  {/* Doc row */}
                  <div
                    onClick={() => setActiveDocId(isOpen ? null : doc.id)}
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      padding: "10px 14px", cursor: "pointer", background: isOpen ? "rgba(201,169,110,0.05)" : "transparent",
                      transition: "background 0.1s",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
                      </svg>
                      <span style={{ fontSize: "0.88rem", fontWeight: 500 }}>{doc.name}</span>
                      <span style={{ fontSize: "0.72rem", color: "var(--text-dim)", fontFamily: "'DM Mono', monospace" }}>
                        #{doc.id}
                      </span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                        {docVersions.length} version{docVersions.length !== 1 ? "s" : ""}
                      </span>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2"
                        style={{ transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>

                  {/* Expanded versions + upload */}
                  {isOpen && (
                    <div style={{ padding: "0 14px 14px", borderTop: "1px solid var(--border)" }}>
                      <VersionList versions={docVersions} />

                      {/* Upload new version for this doc */}
                      {uploadTargetId === doc.id ? (
                        <div style={{ display: "flex", gap: 8, marginTop: 10, alignItems: "center" }}>
                          <label style={{
                            flex: 1, cursor: "pointer", display: "flex", alignItems: "center", gap: 8,
                            background: "var(--surface-2)", border: "1px solid var(--border)",
                            borderRadius: "var(--radius)", padding: "7px 12px",
                            fontSize: "0.82rem", color: selectedFile ? "var(--text)" : "var(--text-dim)",
                          }}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" />
                            </svg>
                            {selectedFile ? selectedFile.name : "Choose file…"}
                            <input type="file" onChange={handleFileChange} style={{ display: "none" }} />
                          </label>
                          <button onClick={() => handleUpload(doc.id)} disabled={!selectedFile || loading}
                            style={{ background: selectedFile ? "var(--accent)" : "var(--surface-2)", color: selectedFile ? "#0f0f0f" : "var(--text-dim)", fontWeight: 600, padding: "7px 12px", whiteSpace: "nowrap" }}>
                            {loading ? "…" : "Upload"}
                          </button>
                          <button onClick={() => { setUploadTargetId(null); setSelectedFile(null); }}
                            style={{ background: "transparent", color: "var(--text-muted)", border: "1px solid var(--border)", padding: "7px 10px" }}>
                            ✕
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => { setUploadTargetId(doc.id); setActiveDocId(doc.id); }}
                          style={{ marginTop: 10, background: "var(--surface-2)", color: "var(--text-muted)", border: "1px solid var(--border)", padding: "6px 12px", fontSize: "0.8rem" }}>
                          + Upload Version
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Create new document */}
        <div style={{ borderTop: allDocuments.length > 0 ? "1px solid var(--border)" : "none", paddingTop: allDocuments.length > 0 ? 14 : 0 }}>
          <p style={{ fontSize: "0.72rem", color: "var(--text-dim)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8 }}>
            Add Document
          </p>
          <div style={{ display: "flex", gap: 8 }}>
            <input
              type="text" placeholder="Document name" value={docName}
              onChange={(e) => setDocName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCreate()}
            />
            <button onClick={handleCreate} disabled={loading || !docName.trim()}
              style={{ background: "var(--surface-2)", color: "var(--text)", border: "1px solid var(--border)", whiteSpace: "nowrap", padding: "8px 14px" }}>
              {loading ? "Creating…" : "Create"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
