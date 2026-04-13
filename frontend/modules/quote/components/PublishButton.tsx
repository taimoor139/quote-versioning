"use client";

interface PublishButtonProps {
  onPublish: () => void;
  loading: boolean;
  isPublished: boolean;
}

export function PublishButton({ onPublish, loading, isPublished }: PublishButtonProps) {
  if (isPublished) {
    return (
      <div style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "10px 18px",
        background: "rgba(39,174,96,0.08)",
        border: "1px solid rgba(39,174,96,0.2)",
        borderRadius: "var(--radius)",
        color: "#4caf50",
        fontSize: "0.88rem",
        fontWeight: 500,
      }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="20 6 9 17 4 12" />
        </svg>
        Published
      </div>
    );
  }

  return (
    <button
      onClick={onPublish}
      disabled={loading}
      style={{
        background: loading ? "var(--surface-2)" : "var(--accent)",
        color: loading ? "var(--text-muted)" : "#0f0f0f",
        padding: "10px 20px",
        fontWeight: 600,
        fontSize: "0.9rem",
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        border: "none",
      }}
    >
      {loading ? (
        <>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: "spin 0.8s linear infinite" }}>
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
          </svg>
          Publishing…
        </>
      ) : (
        <>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" />
          </svg>
          Publish Quote
        </>
      )}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </button>
  );
}
