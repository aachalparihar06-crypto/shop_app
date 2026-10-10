import React, { useState } from 'react';
import type { Product } from '../types';
import { formatINR } from '../utils/formatters';
import {
  Sparkles,
  Send,
  Info,
  Bot,
  User,
  ShoppingCart,
  Check,
} from 'lucide-react';

interface AIAssistantPageProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

interface ChatMessage {
  id: string;
  sender: 'assistant' | 'user';
  text: string;
  recommendedProducts?: Product[];
}

export const AIAssistantPage: React.FC<AIAssistantPageProps> = ({
  products,
  onAddToCart,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'assistant',
      text: 'Namaste! 🙏 I am your ShopEase rule-based shopping advisor. What are you looking to buy today? You can ask me for items by budget, workout essentials, travel gear, or best ratings.',
    },
  ]);
  const [input, setInput] = useState('');
  const [addedIds, setAddedIds] = useState<number[]>([]);

  const quickPrompts = [
    'Best tech under ₹3,000',
    'Workout & fitness essentials',
    'Travel & daily commute picks',
    'Highest rated product',
    'Affordable picks under ₹1,000',
  ];

  const handleSend = (textToSend: string) => {
    const query = textToSend.trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    // Rule-based logic
    setTimeout(() => {
      const lower = query.toLowerCase();
      let matched: Product[] = [];
      let responseText = '';

      if (lower.includes('3000') || lower.includes('tech') || lower.includes('electronic')) {
        matched = products.filter((p) => p.category === 'Electronics');
        responseText = 'Here are our top Indian electronic picks! The Wireless Headphones fall comfortably within ₹2,499 with stellar noise cancellation.';
      } else if (lower.includes('workout') || lower.includes('fitness') || lower.includes('gym')) {
        matched = products.filter((p) => p.category === 'Footwear' || p.category === 'Fitness');
        responseText = 'For active lifestyles and workouts, check out our Running Shoes (₹2,999) and insulated Water Bottle (₹499).';
      } else if (lower.includes('travel') || lower.includes('commute') || lower.includes('backpack')) {
        matched = products.filter((p) => p.category === 'Accessories' || p.name === 'Backpack');
        responseText = 'For commuting and trips, our multi-compartment Backpack at ₹1,499 is water-resistant and fits a 15.6" laptop.';
      } else if (lower.includes('rating') || lower.includes('highest') || lower.includes('best')) {
        matched = [...products].sort((a, b) => b.rating - a.rating).slice(0, 2);
        responseText = `Our top-rated champions are ${matched.map((m) => `${m.name} (${m.rating} ★)`).join(' and ')}!`;
      } else if (lower.includes('1000') || lower.includes('cheap') || lower.includes('budget') || lower.includes('affordable')) {
        matched = products.filter((p) => p.price <= 1000);
        responseText = 'Here are our high-value picks under ₹1,000 — great quality without stretching your budget:';
      } else {
        matched = products.slice(0, 3);
        responseText = `I found great matches in our store for "${query}":`;
      }

      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: responseText,
        recommendedProducts: matched,
      };

      setMessages((prev) => [...prev, assistantMsg]);
    }, 400);
  };

  const handleAddFromChat = (product: Product) => {
    onAddToCart(product);
    setAddedIds((prev) => [...prev, product.id]);
    setTimeout(() => {
      setAddedIds((prev) => prev.filter((id) => id !== product.id));
    }, 1500);
  };

  return (
    <div id="ai-assistant-view" className="space-y-6 animate-fadeIn max-w-4xl mx-auto">
      {/* Demo Notice Banner */}
      <div className="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-4 flex items-start gap-3">
        <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-900 leading-relaxed">
          <strong className="font-bold">Rule-Based Demo Engine:</strong> This is a local rule-based product recommendation interface designed for simulated user queries. It does not call external LLM or cloud AI APIs.
        </div>
      </div>

      {/* Main Chat Box */}
      <div className="bg-white/90 backdrop-blur-md rounded-3xl border border-slate-200/80 shadow-md flex flex-col h-[580px] overflow-hidden">
        {/* Chat Header */}
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/70 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-sm">
              <Sparkles className="w-4 h-4 text-amber-300" />
            </div>
            <div>
              <h2 className="font-bold text-sm text-slate-900">
                ShopEase AI Assistant
              </h2>
              <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Online • Rule Engine Active
              </span>
            </div>
          </div>

          <span className="text-xs text-slate-400 font-medium">Demo Mode</span>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'assistant' && (
                <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0 text-xs font-bold">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] sm:max-w-md rounded-2xl p-4 space-y-3 ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-tr-xs'
                    : 'bg-slate-100/90 text-slate-800 rounded-tl-xs'
                }`}
              >
                <p className="text-xs sm:text-sm leading-relaxed">{msg.text}</p>

                {/* Rendered Product Cards if present */}
                {msg.recommendedProducts && msg.recommendedProducts.length > 0 && (
                  <div className="pt-2 space-y-2 border-t border-slate-200/60">
                    {msg.recommendedProducts.map((p) => {
                      const isAdded = addedIds.includes(p.id);
                      return (
                        <div
                          key={p.id}
                          className="bg-white rounded-xl p-2.5 border border-slate-200 flex items-center justify-between gap-3 shadow-xs"
                        >
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-12 h-12 rounded-lg object-cover bg-slate-50 shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-bold text-slate-900 truncate">
                              {p.name}
                            </h4>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-xs font-extrabold text-indigo-600">
                                {formatINR(p.price)}
                              </span>
                              <span className="text-[10px] text-amber-600 font-bold">
                                {p.rating} ★
                              </span>
                            </div>
                          </div>
                          <button
                            id={`assistant-add-${p.id}`}
                            onClick={() => handleAddFromChat(p)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 flex items-center gap-1 cursor-pointer ${
                              isAdded
                                ? 'bg-emerald-600 text-white'
                                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'
                            }`}
                          >
                            {isAdded ? (
                              <>
                                <Check className="w-3.5 h-3.5" />
                                <span>Added</span>
                              </>
                            ) : (
                              <>
                                <ShoppingCart className="w-3.5 h-3.5" />
                                <span>Add</span>
                              </>
                            )}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0 text-xs font-bold">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Quick Prompts Chips */}
        <div className="px-6 py-2 bg-slate-50/50 border-t border-slate-100 flex items-center gap-2 overflow-x-auto scrollbar-none">
          <span className="text-[11px] font-semibold text-slate-400 shrink-0">Try:</span>
          {quickPrompts.map((prompt) => (
            <button
              key={prompt}
              onClick={() => handleSend(prompt)}
              className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:border-indigo-400 hover:text-indigo-600 text-[11px] font-medium text-slate-600 whitespace-nowrap transition-colors shadow-2xs cursor-pointer"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Chat Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(input);
          }}
          className="p-4 border-t border-slate-200/80 bg-white flex items-center gap-2"
        >
          <input
            id="assistant-chat-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about fitness shoes, noise cancelling audio, backpack under ₹1500..."
            className="flex-1 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          />
          <button
            type="submit"
            id="assistant-send-btn"
            className="p-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-sm transition-all active:scale-95 cursor-pointer"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
