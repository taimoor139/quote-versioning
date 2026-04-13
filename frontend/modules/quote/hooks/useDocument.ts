import { useCallback, useState } from "react";
import { documentService } from "@/modules/document/services/documentService";
import { Document, DocumentVersion } from "@/modules/document/types";

export function useDocument(
  initialDocument?: Document | null,
  initialVersions?: DocumentVersion[]
) {
  const [document, setDocument] = useState<Document | null>(initialDocument ?? null);
  const [versions, setVersions] = useState<DocumentVersion[]>(initialVersions ?? []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createDocument = useCallback(async (name: string, quoteId: number) => {
    setLoading(true);
    setError(null);
    try {
      const doc = await documentService.createDocument({ name, quote_id: quoteId });
      setDocument(doc);
      setVersions(doc.versions ?? []);
      return doc;
    } catch (err: any) {
      setError(err.message ?? "Failed to create document");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const uploadVersion = useCallback(async (documentId: number, file: File) => {
    setLoading(true);
    setError(null);
    try {
      const version = await documentService.uploadVersion(documentId, file);
      setVersions((prev) => [...prev, version]);
      return version;
    } catch (err: any) {
      setError(err.message ?? "Failed to upload version");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { document, versions, loading, error, createDocument, uploadVersion, setDocument, setVersions };
}
