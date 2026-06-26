'use client';
import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, User, Sparkles } from 'lucide-react'

export const ChatAgent = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([
    { role: 'assistant', content: 'Habari! I am the HBS Assistant. How can I help you today regarding Hannah Bennie Schools?' }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage = { role: 'user' as const, content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] })
      })
      const data = await response.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.choices[0].message.content }])
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I am having trouble connecting. Please try again or email us at hbs.admin@hbs.ac.tz' }])
    } finally {
      setIsLoading(false)
    }
  }

  const quickPrompts = [
    'What are the school fees?',
    'Tell me about boarding',
    'Where are you located?',
    'How do I apply?'
  ]

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-neutral-950 text-white rounded-none flex items-center justify-center shadow-2xl hover:scale-110 transition-transform z-50 group"
      >
        <MessageCircle className="w-6 h-6 group-hover:rotate-12 transition-transform" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-28 right-8 w-[400px] h-[600px] bg-white border border-neutral-200 shadow-2xl z-50 flex flex-col font-mono"
          >
            <div className="p-6 border-b border-neutral-200 flex justify-between items-center bg-neutral-950 text-white">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/10 flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-widest leading-none">HBS Assistant</div>
                  <div className="text-[9px] text-neutral-400 uppercase tracking-widest mt-1">Online</div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div ref={scrollRef} className="flex-grow p-6 overflow-y-auto space-y-6 bg-neutral-50/50">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-4 text-xs leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-neutral-950 text-white font-bold'
                      : 'bg-white border border-neutral-200 text-neutral-600 font-sans normal-case'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-neutral-200 p-4">
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 bg-neutral-300 animate-bounce" />
                      <div className="w-1.5 h-1.5 bg-neutral-300 animate-bounce [animation-delay:0.2s]" />
                      <div className="w-1.5 h-1.5 bg-neutral-300 animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {messages.length === 1 && (
              <div className="px-6 pb-4 flex flex-wrap gap-2">
                {quickPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => setInput(prompt)}
                    className="text-[9px] font-bold uppercase tracking-widest px-3 py-2 bg-white border border-neutral-200 hover:border-black transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}

            <div className="p-6 border-t border-neutral-200 bg-white">
              <div className="flex gap-4">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask a question..."
                  className="flex-grow bg-neutral-50 border border-neutral-200 px-4 py-3 text-xs focus:outline-none focus:border-black transition-colors uppercase font-bold tracking-widest"
                />
                <button
                  onClick={handleSend}
                  className="w-12 h-12 bg-neutral-950 text-white flex items-center justify-center hover:bg-neutral-800 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
