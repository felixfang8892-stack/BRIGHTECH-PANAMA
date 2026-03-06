import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { MessageSquare, Send, X, Bot, User, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Markdown from 'react-markdown';
import { PRODUCTS } from '../constants';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export default function ShoppingGuide() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([
    { role: 'model', text: '¡Hola! Soy el asistente virtual de BRIGHTECH. ¿En qué puedo ayudarte hoy? Puedo recomendarte sistemas de cámaras Dahua, explicarte la facturación electrónica en Panamá o ayudarte con sistemas POS.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    const productContext = PRODUCTS.map(p => 
      `- ${p.name}: ${p.description} (Precio: $${p.price.toFixed(2)}, Categoría: ${p.category})`
    ).join('\n');

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: messages.concat({ role: 'user', text: userMessage }).map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
        })),
        config: {
          systemInstruction: `Eres un experto asesor de ventas de BRIGHTECH Panamá. 
          
          CATÁLOGO DE PRODUCTOS DISPONIBLES:
          ${productContext}
          
          REGLAS DE RECOMENDACIÓN:
          1. Analiza las necesidades funcionales y el escenario de uso del cliente (ej. tienda pequeña, bodega, oficina).
          2. Recomienda automáticamente los productos del catálogo que mejor se adapten a su situación.
          3. IMPORTANTE: Presenta las recomendaciones de productos ordenadas por PRECIO de MAYOR a MENOR (de más caro a más barato).
          4. Explica brevemente por qué cada producto es adecuado para su escenario.
          
          Tu objetivo es ayudar a los clientes a elegir la mejor solución tecnológica. 
          Sé profesional, amable y conciso. Responde en español. 
          Menciona que pueden generar una cotización formal en PDF en la sección de "Cotizador" de la web.`
        }
      });

      const botResponse = response.text || 'Lo siento, no pude procesar tu solicitud.';
      setMessages(prev => [...prev, { role: 'model', text: botResponse }]);
    } catch (error) {
      console.error('Error calling Gemini:', error);
      setMessages(prev => [...prev, { role: 'model', text: 'Lo siento, hubo un error al conectar con el asistente. Por favor, intenta de nuevo más tarde.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-5 md:bottom-32 md:right-8 bg-primary text-white p-4 rounded-full shadow-2xl z-50 hover:scale-110 transition-transform"
        aria-label="Asistente de compras"
      >
        <MessageSquare size={24} />
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-5 right-5 w-[90vw] md:w-[400px] h-[600px] max-h-[80vh] bg-white rounded-2xl shadow-2xl z-[1002] flex flex-col overflow-hidden border border-gray-100"
          >
            {/* Header */}
            <div className="bg-primary p-4 text-white flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Bot size={24} />
                <div>
                  <h3 className="font-bold leading-none">Asistente BRIGHTECH</h3>
                  <span className="text-xs opacity-80">En línea ahora</span>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1 rounded">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex gap-2 max-w-[85%] ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${m.role === 'user' ? 'bg-secondary text-white' : 'bg-primary text-white'}`}>
                      {m.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                    </div>
                    <div className={`p-3 rounded-2xl text-sm ${m.role === 'user' ? 'bg-primary text-white rounded-tr-none' : 'bg-white text-gray-800 shadow-sm rounded-tl-none'}`}>
                      <div className="markdown-body">
                        <Markdown>{m.text}</Markdown>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-2 max-w-[85%]">
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shrink-0">
                      <Bot size={16} />
                    </div>
                    <div className="p-3 bg-white rounded-2xl rounded-tl-none shadow-sm">
                      <Loader2 size={16} className="animate-spin text-primary" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-100 bg-white">
              <form
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Escribe tu pregunta..."
                  className="flex-1 bg-gray-100 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-primary outline-none"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="bg-primary text-white p-2 rounded-xl disabled:opacity-50 hover:scale-105 transition-transform"
                >
                  <Send size={20} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
