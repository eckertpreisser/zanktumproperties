import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, X } from 'lucide-react';
import { sendConciergeMessage } from '../services/geminiService';
import { ChatMessage, Language } from '../types';
import { getTranslations } from '../constants';

interface ConciergeProps {
  lang: Language;
}

const Concierge: React.FC<ConciergeProps> = ({ lang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const content = getTranslations(lang).concierge;

  // We need to manage messages state carefully when language changes.
  // Ideally, we reset the history on language change or just start with a new greeting.
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  // Initialize greeting when lang changes or on mount
  useEffect(() => {
    setMessages([{ role: 'model', text: content.greeting }]);
  }, [lang, content.greeting]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    // Prepare history for API
    const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
    }));

    // Pass the current language to the service
    const responseText = await sendConciergeMessage(userMsg, history, lang);

    setMessages(prev => [...prev, { role: 'model', text: responseText || content.unavailable }]);
    setIsLoading(false);
  };

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex h-14 w-14 items-center justify-center rounded-full shadow-2xl transition-all hover:scale-105 ${
            isOpen ? 'bg-navy-900 text-white' : 'bg-gold-500 text-white'
          }`}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Sparkles className="h-6 w-6" />}
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[350px] sm:w-[400px] overflow-hidden rounded-lg border border-gold-400/20 bg-cream-50 shadow-2xl animate-slide-up font-sans">
          
          {/* Header */}
          <div className="bg-navy-900 p-4 text-white">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-500/20 text-gold-400 border border-gold-500/50">
                <Sparkles size={18} />
              </div>
              <div>
                <h3 className="font-serif text-lg font-medium leading-none">Aria</h3>
                <p className="text-xs text-white/60">AI Concierge • {content.online}</p>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="h-80 overflow-y-auto bg-white p-4 space-y-4 scrollbar-thin">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                    msg.role === 'user'
                      ? 'bg-navy-800 text-white rounded-br-none'
                      : 'bg-cream-100 text-navy-900 border border-stone-200 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
             {isLoading && (
              <div className="flex justify-start">
                 <div className="bg-cream-100 rounded-2xl px-4 py-3 border border-stone-200">
                    <div className="flex gap-1">
                        <span className="w-1.5 h-1.5 bg-navy-900/40 rounded-full animate-bounce"></span>
                        <span className="w-1.5 h-1.5 bg-navy-900/40 rounded-full animate-bounce delay-100"></span>
                        <span className="w-1.5 h-1.5 bg-navy-900/40 rounded-full animate-bounce delay-200"></span>
                    </div>
                 </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-stone-200 bg-cream-50 p-3">
            <form onSubmit={handleSubmit} className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={content.placeholder}
                className="w-full rounded-full border border-stone-300 bg-white py-3 pl-4 pr-12 text-sm text-navy-900 placeholder:text-stone-400 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-gold-500 p-2 text-white transition-colors hover:bg-gold-600 disabled:opacity-50"
              >
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Concierge;