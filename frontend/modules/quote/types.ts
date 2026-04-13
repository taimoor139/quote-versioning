export interface Quote {
  id: number;
  title: string;
  customer_name: string;
  status: "draft" | "published";
  created_at: string;
  updated_at: string;
}

export interface QuoteItem {
  id: number;
  quote_id?: number;
  description: string;
  quantity: number;
  unit_price: string;   // API returns as string e.g. "89.00"
  line_total: number;   // API field is line_total
}

export interface QuoteDocument {
  id: number;
  name: string;
  quote_id: number;
  created_at: string;
  updated_at: string;
  versions: QuoteDocumentVersion[];
}

export interface QuoteDocumentVersion {
  id: number;
  document_id: number;
  version_number: number;
  file_url: string;
  created_at: string;
}

export interface QuoteDetail extends Quote {
  items: QuoteItem[];
  subtotal: string;
  tax: string;
  total: string;
  documents: QuoteDocument[];
  versions: QuoteDocumentVersion[];
}

export interface CreateQuotePayload {
  title: string;
  customer_name: string;
}

export interface AddItemPayload {
  description: string;
  quantity: number;
  unit_price: number;
}

export interface UpdateItemPayload {
  description?: string;
  quantity?: number;
  unit_price?: number;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}
