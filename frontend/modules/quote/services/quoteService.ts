import api from "@/lib/api";
import {
  CreateQuotePayload,
  Quote,
  QuoteDetail,
  AddItemPayload,
  UpdateItemPayload,
  QuoteItem,
} from "../types";

export const quoteService = {
  async listQuotes(): Promise<Quote[]> {
    const response = await api.get<Quote[]>("/quotes");
    return response.data;
  },

  async createQuote(payload: CreateQuotePayload): Promise<Quote> {
    const response = await api.post<Quote>("/quotes/create", payload);
    return response.data;
  },

  async getQuote(id: number): Promise<QuoteDetail> {
    const response = await api.get<QuoteDetail>(`/quotes/${id}`);
    return response.data;
  },

  async addItem(quoteId: number, payload: AddItemPayload): Promise<QuoteItem> {
    const response = await api.post<QuoteItem>(`/quotes/${quoteId}/items`, payload);
    return response.data;
  },

  async updateItem(itemId: number, payload: UpdateItemPayload): Promise<QuoteItem> {
    const response = await api.put<QuoteItem>(`/items/${itemId}`, payload);
    return response.data;
  },

  async deleteItem(itemId: number): Promise<void> {
    await api.delete(`/items/${itemId}`);
  },

  async publishQuote(quoteId: number): Promise<Quote> {
    const response = await api.post<Quote>(`/quotes/${quoteId}/publish`);
    return response.data;
  },
};
