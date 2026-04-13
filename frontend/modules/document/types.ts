export interface Document {
  id: number;
  name: string;
  quote_id: number;
  created_at: string;
  updated_at: string;
  versions?: DocumentVersion[];
}

export interface DocumentVersion {
  id: number;
  document_id: number;
  version_number: number;
  file_url: string;
  created_at: string;
}

export interface CreateDocumentPayload {
  name: string;
  quote_id: number;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}
