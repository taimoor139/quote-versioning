import api from "@/lib/api";
import { CreateDocumentPayload, Document, DocumentVersion } from "../types";

export const documentService = {
  async createDocument(payload: CreateDocumentPayload): Promise<Document> {
    const response = await api.post<Document>("/documents", payload);
    return response.data;
  },

  async getDocument(id: number): Promise<Document> {
    const response = await api.get<Document>(`/documents/${id}`);
    return response.data;
  },

  async uploadVersion(documentId: number, file: File): Promise<DocumentVersion> {
    const formData = new FormData();
    formData.append("file", file);
    const response = await api.post<DocumentVersion>(
      `/documents/${documentId}/versions`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    return response.data;
  },
};
