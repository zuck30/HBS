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
        style={{ background: '#D4AF37' }}
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
      style={{ background: 'conic-gradient(from 0deg, #000080 0%, #D4AF37 50%, #000080 100%)' }}
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
    />
    <div
      className="absolute inset-[2px] rounded-full flex items-center justify-center overflow-hidden"
      style={{ background: '#000080', backdropFilter: 'blur(8px)' }}
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
                  background: '#000080',
                  color: 'white',
                  borderRadius: '20px 20px 5px 20px',
                }
              : {
                  background: 'transparent',
                  color: '#000080',
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
              style={{ color: '#D4AF37' }}
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

  useEffect(() => {
    const tick = () => setClockTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    tick();
    const t = setInterval(tick, 30000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isLoading]);

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
        role: m.role,
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
      setMessages(prev => [...prev, {
        role: 'assistant',
        text: "I'm sorry, I encountered an error. Please try again or contact us directly.",
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
            style={{ background: '#000080' }}
          >
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ background: '#D4AF37' }}
              animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut' }}
            />
            <span className="relative text-xl md:text-2xl">
              <Image src="/HBSlogo.png" alt="HBS" width={28} height={28} className="rounded-full" />
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat"
            initial={{ opacity: 0, scale: 0.85, y: 60 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 60 }}
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
              boxShadow: '0 -10px 40px rgba(0,0,0,0.2)',
              background: 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(40px)',
            }}
          >
             <style>{`
                @media (min-width: 768px) {
                  .chat-window {
                    width: 390px !important;
                    height: 600px !important;
                    border-radius: 40px !important;
                    bottom: 2rem !important;
                    right: 2rem !important;
                  }
                }
              `}</style>

              <div className="flex items-center justify-between px-6 py-4 bg-[#000080] text-white">
                <div className="flex items-center gap-3">
                  <Avatar size={32} />
                  <div className="flex flex-col">
                    <span className="text-xs font-bold uppercase tracking-widest">HBS Assistant</span>
                    <span className="text-[10px] opacity-70">Online</span>
                  </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                  <ChevronDown />
                </button>
              </div>

              <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-6 space-y-4" style={{ scrollbarWidth: 'none' }}>
                {messages.map((msg, idx) => (
                  <Bubble key={idx} msg={msg} isLast={idx === messages.length - 1} />
                ))}
                {isLoading && (
                  <div className="flex items-end gap-2">
                    <Avatar size={28} />
                    <TypingDots />
                  </div>
                )}

                {messages.length === 1 && (
                  <div className="flex flex-col gap-2 pt-4">
                    {quickPrompts.map((prompt, i) => (
                      <button
                        key={i}
                        onClick={() => handleSendMessage(prompt)}
                        className="text-left p-3 text-xs font-bold border border-neutral-100 rounded-2xl bg-white hover:bg-[#D4AF37]/5 hover:border-[#D4AF37] transition-all text-[#000080]"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="p-4 bg-white border-t border-neutral-100 flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1 bg-neutral-50 p-4 rounded-2xl text-xs font-medium outline-none focus:ring-1 focus:ring-[#D4AF37]"
                  placeholder="Ask me anything..."
                />
                <button
                  onClick={() => handleSendMessage()}
                  className="w-12 h-12 bg-[#000080] text-[#D4AF37] rounded-2xl flex items-center justify-center hover:bg-[#D4AF37] hover:text-white transition-all"
                >
                  <Send size={18} />
                </button>
              </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatAgent;