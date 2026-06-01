"use client";

import React, { useState, useMemo } from "react";
import { PRICING_DATA, Category, Item } from "@/data/prices";
import { Plus, Minus, Trash2, Copy, Check, Wrench, Receipt } from "lucide-react";

export default function MechanicCalculator() {
  const [counts, setCounts] = useState<{ [key: string]: number }>({});
  const [discount, setDiscount] = useState<number>(0);
  const [copied, setCopied] = useState(false);

  const updateCount = (id: string, delta: number) => {
    setCounts((prev) => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [id]: next };
    });
  };

  const reset = () => {
    setCounts({});
    setDiscount(0);
  };

  const selectedItems = useMemo(() => {
    const list: { item: Item; count: number }[] = [];
    PRICING_DATA.forEach((category) => {
      category.items.forEach((item) => {
        if (counts[item.id] > 0) {
          list.push({ item, count: counts[item.id] });
        }
      });
    });
    return list;
  }, [counts]);

  const subtotal = useMemo(() => {
    return selectedItems.reduce((acc, { item, count }) => acc + item.price * count, 0);
  }, [selectedItems]);

  const total = useMemo(() => {
    return Math.max(0, subtotal - discount);
  }, [subtotal, discount]);

  const copyToClipboard = () => {
    if (selectedItems.length === 0) return;

    let text = "📋 **FACTURA TALLER MECÁNICO**\n\n";
    selectedItems.forEach(({ item, count }) => {
      text += `🔹 ${item.name} x${count} - ${item.price * count}$\n`;
    });
    
    if (discount > 0) {
      text += `\n📉 **DESCUENTO: -${discount}$**`;
    }
    
    text += `\n💰 **TOTAL: ${total}$**`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 font-sans p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-800 pb-6">
          <div className="flex items-center gap-3">
            <div className="bg-orange-500 p-3 rounded-lg shadow-lg shadow-orange-500/20">
              <Wrench className="w-8 h-8 text-black" />
            </div>
            <div>
              <h1 className="text-3xl font-black uppercase tracking-tighter italic">
                MECHANIC <span className="text-orange-500 underline decoration-4 underline-offset-4">PRO</span> CALCULATOR
              </h1>
              <p className="text-neutral-500 text-sm font-medium uppercase tracking-widest">
                Sistema de Presupuestos GTAV RP
              </p>
            </div>
          </div>
          <button
            onClick={reset}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-neutral-900 hover:bg-red-950/30 hover:text-red-500 border border-neutral-800 hover:border-red-900/50 rounded-lg transition-all text-sm font-bold uppercase tracking-wider"
          >
            <Trash2 className="w-4 h-4" />
            Limpiar Todo
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Categories Section */}
          <div className="lg:col-span-8 space-y-8">
            {PRICING_DATA.map((category) => (
              <section key={category.name}>
                <h2 className="text-xl font-black mb-4 flex items-center gap-2 text-neutral-400 uppercase tracking-widest">
                  <span className="w-8 h-[2px] bg-orange-500"></span>
                  {category.name}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {category.items.map((item) => (
                    <div
                      key={item.id}
                      className={`group p-4 rounded-xl border transition-all duration-300 ${
                        counts[item.id] > 0
                          ? "bg-neutral-900 border-orange-500/50 ring-1 ring-orange-500/20"
                          : "bg-neutral-900/40 border-neutral-800 hover:border-neutral-700"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <h3 className="font-bold text-sm uppercase leading-tight group-hover:text-orange-400 transition-colors">
                            {item.name}
                          </h3>
                          <p className="text-orange-500 font-mono text-xs mt-1">{item.price}$ / ud</p>
                        </div>
                        {counts[item.id] > 0 && (
                          <span className="bg-orange-500 text-black text-[10px] font-black px-2 py-0.5 rounded uppercase">
                            x{counts[item.id]}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateCount(item.id, -1)}
                          className="flex-1 flex justify-center py-2 bg-neutral-800 hover:bg-neutral-700 rounded-md transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => updateCount(item.id, 1)}
                          className="flex-[2] flex justify-center py-2 bg-orange-500 hover:bg-orange-400 text-black font-black rounded-md transition-colors shadow-lg shadow-orange-500/10"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* Bill Sidebar */}
          <div className="lg:col-span-4 lg:sticky lg:top-8">
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl">
              <div className="bg-neutral-800/50 p-4 border-b border-neutral-700 flex items-center gap-2">
                <Receipt className="w-5 h-5 text-orange-500" />
                <h2 className="font-black uppercase tracking-wider text-sm">Resumen de Factura</h2>
              </div>

              <div className="p-6">
                {selectedItems.length === 0 ? (
                  <div className="text-center py-12">
                    <Wrench className="w-12 h-12 text-neutral-800 mx-auto mb-4 animate-pulse" />
                    <p className="text-neutral-500 text-sm italic">No hay piezas seleccionadas</p>
                  </div>
                ) : (
                  <div className="space-y-4 mb-8 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                    {selectedItems.map(({ item, count }) => (
                      <div key={item.id} className="flex justify-between items-center text-sm group">
                        <div className="flex flex-col">
                          <span className="text-neutral-300 group-hover:text-white transition-colors">
                            {item.name}
                          </span>
                          <span className="text-[10px] text-neutral-500 uppercase tracking-tighter">
                            {count} x {item.price}$
                          </span>
                        </div>
                        <span className="font-mono font-bold text-orange-500">{item.price * count}$</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="border-t border-dashed border-neutral-700 pt-6 mt-6 space-y-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] text-neutral-500 uppercase font-black tracking-widest">Descuento Directo ($)</label>
                    <div className="relative">
                      <input
                        type="number"
                        value={discount === 0 ? "" : discount}
                        onChange={(e) => setDiscount(Math.max(0, Number(e.target.value)))}
                        placeholder="0"
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-lg py-2 px-3 text-sm font-bold text-orange-500 focus:outline-none focus:border-orange-500/50 transition-colors"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-600 font-bold text-sm">$</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-end pt-2">
                    <div className="flex flex-col">
                      {discount > 0 && (
                        <span className="text-[10px] text-red-500 font-bold uppercase tracking-tighter line-through mb-1">
                          Subtotal: {subtotal}$
                        </span>
                      )}
                      <span className="text-neutral-500 uppercase font-black text-xs tracking-widest">Total Final</span>
                    </div>
                    <span className="text-4xl font-black text-white italic">
                      {total}<span className="text-orange-500 ml-1 not-italic">$</span>
                    </span>
                  </div>

                  <button
                    disabled={selectedItems.length === 0}
                    onClick={copyToClipboard}
                    className={`w-full py-4 rounded-xl flex items-center justify-center gap-3 font-black uppercase tracking-widest transition-all ${
                      copied
                        ? "bg-green-500 text-black scale-[0.98]"
                        : "bg-orange-500 hover:bg-orange-400 text-black disabled:bg-neutral-800 disabled:text-neutral-600 active:scale-[0.98] shadow-xl shadow-orange-500/20"
                    }`}
                  >
                    {copied ? (
                      <>
                        <Check className="w-5 h-5" />
                        ¡Copiado!
                      </>
                    ) : (
                      <>
                        <Copy className="w-5 h-5" />
                        Copiar para Discord
                      </>
                    )}
                  </button>
                  <p className="text-center text-[10px] text-neutral-600 mt-4 uppercase tracking-tighter">
                    V 1.0.0 • Taller Mecánico Los Santos
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #262626;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #404040;
        }
      `}</style>
    </main>
  );
}
