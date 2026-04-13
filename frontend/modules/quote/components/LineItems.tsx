"use client";

import { useState, FormEvent } from "react";
import { QuoteItem, AddItemPayload, UpdateItemPayload } from "../types";

interface LineItemsProps {
  items: QuoteItem[];
  onAdd: (payload: AddItemPayload) => void;
  onUpdate: (itemId: number, payload: UpdateItemPayload) => void;
  onDelete: (itemId: number) => void;
}

const btnPrimary: React.CSSProperties = {
  background: "var(--accent)", color: "#0f0f0f", fontWeight: 600, padding: "7px 14px",
};
const btnGhost: React.CSSProperties = {
  background: "transparent", color: "var(--text-muted)",
  border: "1px solid var(--border)", padding: "5px 12px", fontSize: "0.8rem",
};
const btnDanger: React.CSSProperties = {
  background: "rgba(192,57,43,0.1)", color: "#e57373",
  border: "1px solid rgba(192,57,43,0.2)", padding: "5px 12px", fontSize: "0.8rem",
};

function AddItemForm({ onAdd }: { onAdd: (p: AddItemPayload) => void }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [unitPrice, setUnitPrice] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onAdd({ description, quantity, unit_price: parseFloat(unitPrice) });
    setDescription(""); setQuantity(1); setUnitPrice("");
  };

  return (
    <form onSubmit={handleSubmit} style={{
      display: "grid",
      gridTemplateColumns: "1fr 80px 120px auto",
      gap: 8,
      padding: "12px 16px",
      background: "var(--surface-2)",
      borderTop: "1px solid var(--border)",
      borderRadius: "0 0 var(--radius-lg) var(--radius-lg)",
    }}>
      <input type="text" placeholder="Item description" value={description} onChange={(e) => setDescription(e.target.value)} required />
      <input type="number" placeholder="Qty" value={quantity} min={1} onChange={(e) => setQuantity(Number(e.target.value))} required />
      <input type="number" placeholder="Unit price" value={unitPrice} min={0} step="0.01" onChange={(e) => setUnitPrice(e.target.value)} required />
      <button type="submit" style={btnPrimary}>Add</button>
    </form>
  );
}

interface RowProps {
  item: QuoteItem;
  onUpdate: (id: number, p: UpdateItemPayload) => void;
  onDelete: (id: number) => void;
  index: number;
}

function LineItemRow({ item, onUpdate, onDelete, index }: RowProps) {
  const [editing, setEditing] = useState(false);
  const [description, setDescription] = useState(item.description);
  const [quantity, setQuantity] = useState(item.quantity);
  const [unitPrice, setUnitPrice] = useState(parseFloat(item.unit_price ?? "0"));

  const handleSave = () => {
    onUpdate(item.id, { description, quantity, unit_price: unitPrice });
    setEditing(false);
  };

  const unitPriceNum = parseFloat(item.unit_price ?? "0");
  const lineTotal = Number(item.line_total ?? 0);

  const rowStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "32px 1fr 80px 110px 110px 120px",
    gap: 8,
    padding: "12px 16px",
    alignItems: "center",
    borderBottom: "1px solid var(--border)",
    fontSize: "0.88rem",
    transition: "background 0.1s",
  };

  if (editing) {
    return (
      <div style={{ ...rowStyle, background: "rgba(201,169,110,0.05)" }}>
        <span style={{ color: "var(--text-dim)", fontFamily: "var(--mono)", fontSize: "0.75rem" }}>{index + 1}</span>
        <input value={description} onChange={(e) => setDescription(e.target.value)} style={{ fontSize: "0.85rem" }} />
        <input type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} style={{ fontSize: "0.85rem" }} />
        <input type="number" value={unitPrice} step="0.01" onChange={(e) => setUnitPrice(Number(e.target.value))} style={{ fontSize: "0.85rem" }} />
        <span style={{ color: "var(--text-muted)", fontFamily: "'DM Mono', monospace" }}>${lineTotal.toFixed(2)}</span>
        <div style={{ display: "flex", gap: 6 }}>
          <button onClick={handleSave} style={btnPrimary}>Save</button>
          <button onClick={() => setEditing(false)} style={btnGhost}>✕</button>
        </div>
      </div>
    );
  }

  return (
    <div style={rowStyle}>
      <span style={{ color: "var(--text-dim)", fontFamily: "'DM Mono', monospace", fontSize: "0.75rem" }}>{index + 1}</span>
      <span>{item.description}</span>
      <span style={{ color: "var(--text-muted)" }}>{item.quantity}</span>
      <span style={{ fontFamily: "'DM Mono', monospace" }}>${unitPriceNum.toFixed(2)}</span>
      <span style={{ fontFamily: "'DM Mono', monospace", color: "var(--text)" }}>${lineTotal.toFixed(2)}</span>
      <div style={{ display: "flex", gap: 6 }}>
        <button onClick={() => setEditing(true)} style={btnGhost}>Edit</button>
        <button onClick={() => onDelete(item.id)} style={btnDanger}>Del</button>
      </div>
    </div>
  );
}

export function LineItems({ items, onAdd, onUpdate, onDelete }: LineItemsProps) {
  return (
    <div style={{
      border: "1px solid var(--border)",
      borderRadius: "var(--radius-lg)",
      overflow: "hidden",
      marginTop: 24,
    }}>
      {/* Header */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "32px 1fr 80px 110px 110px 120px",
        gap: 8,
        padding: "10px 16px",
        background: "var(--surface-2)",
        borderBottom: "1px solid var(--border)",
        fontSize: "0.7rem",
        color: "var(--text-dim)",
        letterSpacing: "0.07em",
        textTransform: "uppercase",
      }}>
        <span>#</span>
        <span>Description</span>
        <span>Qty</span>
        <span>Unit Price</span>
        <span>Total</span>
        <span>Actions</span>
      </div>

      {items.length === 0 ? (
        <div style={{ padding: "32px 16px", textAlign: "center", color: "var(--text-dim)", fontSize: "0.88rem" }}>
          No items yet — add one below.
        </div>
      ) : (
        items.map((item, i) => (
          <LineItemRow key={item.id} item={item} onUpdate={onUpdate} onDelete={onDelete} index={i} />
        ))
      )}

      <AddItemForm onAdd={onAdd} />
    </div>
  );
}
