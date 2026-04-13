import { useCallback } from "react";
import { useQuoteStore } from "../store";
import { quoteService } from "../services/quoteService";
import { AddItemPayload, CreateQuotePayload, UpdateItemPayload } from "../types";
import { useRouter } from "next/navigation";

export function useListQuotes() {
  const { setQuotes, setLoading, setError } = useQuoteStore();

  const listQuotes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const quotes = await quoteService.listQuotes();
      setQuotes(quotes);
    } catch (err: any) {
      setError(err.message ?? "Failed to load quotes");
    } finally {
      setLoading(false);
    }
  }, [setQuotes, setLoading, setError]);

  return { listQuotes };
}

export function useCreateQuote() {
  const { setLoading, setError } = useQuoteStore();
  const router = useRouter();

  const createQuote = useCallback(
    async (payload: CreateQuotePayload) => {
      setLoading(true);
      setError(null);
      try {
        const quote = await quoteService.createQuote(payload);
        router.push(`/quotes/${quote.id}`);
      } catch (err: any) {
        setError(err.message ?? "Failed to create quote");
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setError, router]
  );

  return { createQuote };
}

export function useLoadQuote() {
  const { setQuote, setLoading, setError } = useQuoteStore();

  const loadQuote = useCallback(
    async (id: number) => {
      setLoading(true);
      setError(null);
      try {
        const quote = await quoteService.getQuote(id);
        setQuote(quote);
      } catch (err: any) {
        setError(err.message ?? "Failed to load quote");
      } finally {
        setLoading(false);
      }
    },
    [setQuote, setLoading, setError]
  );

  return { loadQuote };
}

export function useLineItems() {
  const { addItem, updateItem, removeItem, setQuote, setError } = useQuoteStore();
  const quote = useQuoteStore((s) => s.quote);

  // After any mutation, silently refetch the full quote so backend-calculated
  // totals (subtotal, tax, total) are always fresh without a page reload.
  const refreshQuote = useCallback(async (quoteId: number) => {
    try {
      const refreshed = await quoteService.getQuote(quoteId);
      setQuote(refreshed);
    } catch {
      // silently ignore refresh errors — item mutation already succeeded
    }
  }, [setQuote]);

  const handleAddItem = useCallback(
    async (payload: AddItemPayload) => {
      if (!quote) return;
      setError(null);
      try {
        const item = await quoteService.addItem(quote.id, payload);
        addItem(item);              // optimistic: show item immediately
        await refreshQuote(quote.id); // then sync totals from server
      } catch (err: any) {
        setError(err.message ?? "Failed to add item");
      }
    },
    [quote, addItem, setError, refreshQuote]
  );

  const handleUpdateItem = useCallback(
    async (itemId: number, payload: UpdateItemPayload) => {
      if (!quote) return;
      setError(null);
      try {
        const updated = await quoteService.updateItem(itemId, payload);
        updateItem(updated);           // optimistic: update row immediately
        await refreshQuote(quote.id);  // then sync totals from server
      } catch (err: any) {
        setError(err.message ?? "Failed to update item");
      }
    },
    [quote, updateItem, setError, refreshQuote]
  );

  const handleDeleteItem = useCallback(
    async (itemId: number) => {
      if (!quote) return;
      setError(null);
      try {
        await quoteService.deleteItem(itemId);
        removeItem(itemId);            // optimistic: remove row immediately
        await refreshQuote(quote.id);  // then sync totals from server
      } catch (err: any) {
        setError(err.message ?? "Failed to delete item");
      }
    },
    [quote, removeItem, setError, refreshQuote]
  );

  return { handleAddItem, handleUpdateItem, handleDeleteItem };
}

export function usePublishQuote() {
  const { setQuote, setLoading, setError } = useQuoteStore();
  const quote = useQuoteStore((s) => s.quote);

  const publishQuote = useCallback(async () => {
    if (!quote) return;
    setLoading(true);
    setError(null);
    try {
      await quoteService.publishQuote(quote.id);
      const refreshed = await quoteService.getQuote(quote.id);
      setQuote(refreshed);
    } catch (err: any) {
      setError(err.message ?? "Failed to publish quote");
    } finally {
      setLoading(false);
    }
  }, [quote, setQuote, setLoading, setError]);

  return { publishQuote };
}
