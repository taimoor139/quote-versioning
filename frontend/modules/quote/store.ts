import { create } from "zustand";
import { Quote, QuoteDetail, QuoteItem } from "./types";

interface QuoteState {
  quotes: Quote[];
  quote: QuoteDetail | null;
  loading: boolean;
  error: string | null;

  setQuotes: (quotes: Quote[]) => void;
  setQuote: (quote: QuoteDetail) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  addItem: (item: QuoteItem) => void;
  updateItem: (item: QuoteItem) => void;
  removeItem: (itemId: number) => void;
  updateQuoteStatus: (quote: Quote) => void;
  reset: () => void;
}

const initialState = {
  quotes: [],
  quote: null,
  loading: false,
  error: null,
};

export const useQuoteStore = create<QuoteState>((set) => ({
  ...initialState,

  setQuotes: (quotes) => set({ quotes }),
  setQuote: (quote) => set({ quote }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  addItem: (item) =>
    set((state) => {
      if (!state.quote) return state;
      return { quote: { ...state.quote, items: [...state.quote.items, item] } };
    }),

  updateItem: (updatedItem) =>
    set((state) => {
      if (!state.quote) return state;
      return {
        quote: {
          ...state.quote,
          items: state.quote.items.map((i) => (i.id === updatedItem.id ? updatedItem : i)),
        },
      };
    }),

  removeItem: (itemId) =>
    set((state) => {
      if (!state.quote) return state;
      return {
        quote: {
          ...state.quote,
          items: state.quote.items.filter((i) => i.id !== itemId),
        },
      };
    }),

  updateQuoteStatus: (updatedQuote) =>
    set((state) => {
      if (!state.quote) return state;
      return {
        quote: { ...state.quote, status: updatedQuote.status, updated_at: updatedQuote.updated_at },
      };
    }),

  reset: () => set(initialState),
}));
