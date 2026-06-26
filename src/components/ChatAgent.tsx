'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, ChevronDown, Wifi, Battery, Signal } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { deepseekChat } from '@/lib/deepseek';

type Msg = { role: 'user' | 'assistant'; text: string; time: string };

const getTime = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

const quickPrompts = [
  "Tell me about admissions",
  "What programs do you offer?",
  "How do I apply?",
  "What are the fees?",
  "Tell me about boarding"
];

const TypingDots = () => (
  <div className="flex items-center gap-[5px] px-1 py-0.5">
    {[0, 1, 2].map(i => (
      <motion.div
        key={i}
        className="w-[7px] h-[7px] rounded-full"
        style={{ background: '#B331F1' }}
        animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
        transition={{ repeat: Infinity, duration: 0.9, delay: i * 0.15, ease: 'easeInOut' }}
      />
    ))}
  </div>
);

const Avatar = ({ size = 36 }: { size?: number }) => (
  <div className="relative shrink-0" style={{ width: size, height: size }}>
    <motion.div
      className="absolute inset-0 rounded-full"
      style={{ background: 'conic-gradient(from 0deg, #000000 0%, #B331F1 50%, #000000 100%)' }}
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
    />
    <div
      className="absolute inset-[2px] rounded-full flex items-center justify-center overflow-hidden"
      style={{ background: '#000000', backdropFilter: 'blur(8px)' }}
    >
      <Image
        src="/HBSlogo.png"
        alt="HBS AI"
        width={size - 6}
        height={size - 6}
        className="object-cover rounded-full"
      />
    </div>
  </div>
);

const Bubble = ({ msg, isLast }: { msg: Msg; isLast: boolean }) => {
  const isUser = msg.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.38, ease: [0.23, 1, 0.32, 1] }}
      className={cn('flex items-end gap-2', isUser ? 'justify-end' : 'justify-start')}
    >
      {!isUser && <Avatar size={28} />}
      <div className={cn('flex flex-col gap-0.5', isUser ? 'items-end' : 'items-start', 'flex-1', isUser ? 'max-w-[85%]' : 'max-w-[85%]')}>
        <div
          className="px-4 py-2.5 text-[13.5px] leading-[1.55] shadow-sm w-full"
          style={
            isUser
              ? {
                  background: '#B331F1',
                  color: 'white',
                  borderRadius: '20px 20px 5px 20px',
                }
              : {
                  background: 'transparent',
                  color: '#1a1108',
                  borderRadius: '20px 20px 20px 5px',
                  padding: '4px 4px 4px 0',
                }
          }
        >
          <div className="whitespace-pre-wrap break-words">{msg.text}</div>
        </div>
        <div className="flex items-center gap-1 px-1">
          <span className="text-[10px]" style={{ color: 'rgba(0,0,0,0.3)' }}>{msg.time}</span>
          {isUser && isLast && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-[10px]"
              style={{ color: '#B331F1' }}
            >✓✓</motion.span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const ChatAgent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [clockTime, setClockTime] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  const hbsKnowledgeBase = `
    Hannah Bennie Schools (HBS) is a nursery and primary school in Dar es Salaam, Tanzania.
    Location: 140 Kimbiji Road, 17106 Mji Mwema, Kigamboni.
    Programs:
    - Toddler Class (18 MO - 3 YRS)
    - Pre-school (3 - 6 YRS)
    - Primary School (6 - 14 YRS)
    - Enrichment Activities (All ages)
    Achievements: No.1 NECTA in Dar es Salaam Region 2024, 100% Daraja A.
    Facilities: Football pitch, swimming pools, playground, transport fleet, boarding houses, labs, library.
    Meals: Wholesome breakfasts, balanced lunches, snacks, and hearty suppers for boarders.
    Transport: LATRA-compliant bus fleet with trained drivers.
    Boarding: 24/7 supervision, comfortable dorms, structured study time.
    Contact: +255 762 224 224, hbs.admin@hbs.ac.tz
  `;

  useEffect(() => {
    const tick = () => setClockTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    tick();
    const t = setInterval(tick, 30000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (text: string = input) => {
    const msgText = text || input;
    if (!msgText.trim() || isLoading) return;

    const userMsg: Msg = { role: 'user', text: msgText, time: getTime() };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput('');
    setIsLoading(true);

    try {
      const chatHistory = nextMessages.map(m => ({
        role: m.role === 'user' ? 'user' : 'assistant',
        content: m.text
      }));

      const systemPrompt = {
        role: 'system',
        content: `You are an AI assistant for Hannah Bennie Schools (HBS). Use the following knowledge base to answer questions accurately and warmly. If you don't know the answer, ask the user to contact the school office.
        Knowledge Base: ${hbsKnowledgeBase}`
      };

      const response = await deepseekChat([systemPrompt, ...chatHistory]);

      setMessages(prev => [...prev, {
        role: 'assistant',
        text: response,
        time: getTime()
      }]);
    } catch (err) {
      console.error('Chat error:', err);
      let errorMessage = "I'm sorry, I encountered an error. Please try again or contact us directly.";
      

      if (err instanceof Error) {
        if (err.message.includes('timeout')) {
          errorMessage = "The request is taking too long. Please try again in a moment.";
        } else if (err.message.includes('API key')) {
          errorMessage = "There's a configuration issue. Please contact support.";
        } else if (err.message.includes('network')) {
          errorMessage = "Network error. Please check your connection and try again.";
        }
      }
      
      setMessages(prev => [...prev, {
        role: 'assistant',
        text: errorMessage,
        time: getTime()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const initChat = () => {
    if (messages.length === 0) {
      setMessages([{
        role: 'assistant',
        text: "Hello! Welcome to Hannah Bennie Schools. How can I help you today?",
        time: getTime()
      }]);
    }
  };


  const CHAT_BG_COLOR = '#f5f5f5';

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            key="fab"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => {
              setIsOpen(true);
              initChat();
            }}
            className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 w-14 h-14 md:w-16 md:h-16 rounded-full shadow-2xl flex items-center justify-center"
            style={{ background: '#000000' }}
          >
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ background: '#B331F1' }}
              animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut' }}
            />
            <span className="relative text-xl md:text-2xl">
              <Image src="/HBSlogo.png" alt="HBS" width={28} height={28} className="rounded-full" />
            </span>
            <div className="absolute -top-0.5 -right-0.5 w-3 h-3 md:w-4 md:h-4 bg-[#B331F1] rounded-full border-2 border-white" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-black/20 md:hidden"
            />

            <motion.div
              key="chat"
              initial={{ opacity: 0, scale: 0.85, y: 60 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 60 }}
              transition={{ type: 'spring', damping: 26, stiffness: 300 }}
              className="chat-window fixed bottom-0 left-0 right-0 md:bottom-8 md:right-8 md:left-auto z-50 flex flex-col overflow-hidden mx-auto"
              style={{
                width: '100%',
                maxWidth: '100%',
                height: '90vh',
                maxHeight: '90vh',
                borderTopLeftRadius: 32,
                borderTopRightRadius: 32,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
                border: 'none',
                boxShadow: '0 -10px 40px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,255,255,0.06) inset',
                // Fixed: Use hex color instead of rgba to avoid animation warning
                background: CHAT_BG_COLOR,
                backdropFilter: 'blur(40px)',
                WebkitBackdropFilter: 'blur(40px)',
              }}
            >
              <style>{`
                @media (min-width: 768px) {
                  .chat-window {
                    width: 390px !important;
                    max-width: 390px !important;
                    height: min(780px, calc(100vh - 7rem)) !important;
                    max-height: min(780px, calc(100vh - 7rem)) !important;
                    border-radius: 52px !important;
                    border: 10px solid #0F0F0F !important;
                    box-shadow: 0 0 0 1px rgba(255,255,255,0.08) inset, 0 50px 120px rgba(0,0,0,0.6), 0 20px 60px rgba(0,0,0,0.35) !important;
                    bottom: 2rem !important;
                    right: 2rem !important;
                    left: auto !important;
                    top: auto !important;
                    margin: 0 !important;
                    overflow: hidden !important;
                  }
                }
              `}</style>

              <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ borderRadius: 'inherit', zIndex: 0 }}>
                <div className="absolute -top-8 -left-8 w-48 h-48 rounded-full opacity-15" style={{ background: '#B331F1', filter: 'blur(40px)' }} />
                <div className="absolute -bottom-8 -right-8 w-56 h-56 rounded-full opacity-10" style={{ background: '#000000', filter: 'blur(50px)' }} />
              </div>

              <div className="relative z-10 flex justify-center pt-3 pb-1 shrink-0">
                <div className="flex items-center justify-between px-4" style={{ width: 126, height: 34, background: '#000000', borderRadius: 20 }}>
                  <div className="w-2 h-2 rounded-full bg-white/20" />
                  <motion.div className="w-1.5 h-1.5 rounded-full bg-[#B331F1]" animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 2 }} />
                </div>
              </div>

              <div className="relative z-10 flex items-center justify-between px-7 py-1 shrink-0">
                <span className="text-black text-[12px] font-bold tracking-tight">{clockTime}</span>
                <div className="flex items-center gap-1.5">
                  <Signal size={12} style={{ color: '#000000' }} />
                  <Wifi size={12} style={{ color: '#000000' }} />
                  <Battery size={14} style={{ color: '#000000' }} />
                </div>
              </div>

              <div ref={scrollRef} className="relative z-10 flex-1 overflow-y-auto px-4 py-4 space-y-3" style={{ scrollbarWidth: 'none' }}>
                <div className="flex justify-end mb-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(false)}
                    className="w-8 h-8 rounded-full flex items-center justify-center transition-all"
                    style={{ background: 'rgba(0,0,0,0.07)' }}
                  >
                    <ChevronDown size={16} style={{ color: '#000000' }} />
                  </motion.button>
                </div>

                {messages.map((msg, idx) => (
                  <Bubble key={idx} msg={msg} isLast={idx === messages.length - 1} />
                ))}

                {isLoading && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-end gap-2">
                    <Avatar size={28} />
                    <div className="px-2 py-2">
                      <TypingDots />
                    </div>
                  </motion.div>
                )}

                {messages.length === 1 && !isLoading && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-2 ml-10 mt-2">
                    {quickPrompts.map((prompt, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.02, background: 'rgba(179,49,241,0.1)' }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleSendMessage(prompt)}
                        className="px-4 py-2.5 text-left text-[13px] font-medium border border-[#B331F1]/30 rounded-xl bg-white/50 backdrop-blur-sm transition-all text-black"
                      >
                        {prompt}
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </div>

              {/* Input Area */}
              <div className="relative z-10 p-3 bg-white/90 border-t border-black/5 flex gap-2 shrink-0">
                <div className="flex-1 flex items-center bg-white rounded-full border border-gray-200 px-4 py-1.5 focus-within:border-[#B331F1] focus-within:ring-2 focus-within:ring-[#B331F1]/20 transition-all">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1 bg-transparent text-sm outline-none placeholder:text-gray-400 py-1"
                    placeholder="Type your message..."
                  />
                  <button 
                    onClick={() => handleSendMessage()} 
                    className={cn(
                      "p-1.5 rounded-full transition-all ml-1",
                      input.trim() ? "bg-[#B331F1] text-white hover:bg-[#9a2ad1]" : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    )}
                    disabled={!input.trim()}
                  >
                    <Send size={16} className="shrink-0" />
                  </button>
                </div>
              </div>

              <div className="relative z-10 px-4 pt-3 shrink-0" style={{ background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(20px)', borderTop: '1px solid rgba(0,0,0,0.07)', paddingBottom: 'max(12px, env(safe-area-inset-bottom, 12px))' }}>
                <p className="text-[10px] text-center text-gray-400 mb-2 font-mono tracking-tighter uppercase font-bold">HBS AI Assistant</p>
                <div className="flex justify-center mt-1 mb-1">
                  <div className="w-28 h-[5px] rounded-full" style={{ background: 'rgba(0,0,0,0.18)' }} />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatAgent;