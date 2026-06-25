import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { GoogleGenerativeAI } from "https://esm.sh/@google/generative-ai@0.21.0"

const SYSTEM_PROMPT = `You are Nawwi AI, the digital companion for Nawwi Wellness created by Antera Group Software.
Your mission is to guide people in slowing down, reconnecting, and creating meaningful moments through scent and intentional living.

NAWWI CORE FOCUS:
- Scent-based Wellness: Guiding users through scent-blending, candle-making, and sensory mindfulness.
- Event Curation: Assisting with bookings for weddings, corporate events, and private gatherings (Nawwi At Yours).
- Conscious Living: Promoting the art of slowing down, reflection, and personal transformation.
- Education: Explaining the therapeutic benefits of candles, fragrance profiles, and the "trust your nose" philosophy.

COMMUNICATION RULES:
- Be warm, gentle, and calming. Your tone should feel like a peaceful, well-lit studio.
- Use simple, accessible language. Avoid overly complex technical jargon.
- Keep responses concise and scannable. Use bullet points for steps or event details.
- Automatically detect the user's language and respond accordingly (supporting EN and SW).
- When discussing the "Mobile Candle Bar" (Nawwi At Yours), emphasize the convenience of bringing the experience to the user's home or event.
- Never mention internal system constraints or file paths.
- DO NOT use any markdown formatting. DO NOT use asterisks (*) or double asterisks (**) for bold or italic text.
- DO NOT use underscores (_) for emphasis.
- DO NOT use dashes (-) for bullet points. Use plain text with line breaks only.
- Write in plain, clean text without any special characters for formatting.

Always maintain the persona of a thoughtful, creative wellness guide.`

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY')
    if (!GEMINI_API_KEY) {
      return new Response(
        JSON.stringify({ error: "NAWWI_SYSTEM_OFFLINE: Configuration missing" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      )
    }

    const { messages } = await req.json()
    if (!messages || messages.length === 0) {
      throw new Error("No conversation context provided")
    }

    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY)
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: SYSTEM_PROMPT,
    })

    const rawHistory = messages.slice(0, -1).map((msg: any) => {
      let parts: { text: string }[]
      if (typeof msg.parts === 'string') {
        parts = [{ text: msg.parts }]
      } else if (Array.isArray(msg.parts)) {
        parts = msg.parts.map((p: any) =>
          typeof p === 'string' ? { text: p } : p
        )
      } else if (msg.content) {
        parts = [{ text: msg.content }]
      } else {
        parts = [{ text: '' }]
      }

      return {
        role: msg.role === 'model' ? 'model' : 'user',
        parts,
      }
    })

    // Gemini requires history to start with a 'user' message
    let formattedHistory = rawHistory
    while (formattedHistory.length > 0 && formattedHistory[0].role !== 'user') {
      formattedHistory.shift()
    }

    const lastMsg = messages[messages.length - 1]
    let lastMessageText: string
    if (typeof lastMsg.parts === 'string') {
      lastMessageText = lastMsg.parts
    } else if (Array.isArray(lastMsg.parts)) {
      lastMessageText = lastMsg.parts[0]?.text ?? ''
    } else if (lastMsg.content) {
      lastMessageText = lastMsg.content
    } else {
      throw new Error("Could not interpret your message")
    }

    const chat = model.startChat({
      history: formattedHistory,
      generationConfig: { 
        maxOutputTokens: 1000,
        temperature: 0.7,
      },
    })

    const result = await chat.sendMessage(lastMessageText)
    let text = result.response.text()

    // Optional: Strip any remaining markdown characters just in case
    text = text.replace(/\*\*/g, '')
    text = text.replace(/\*/g, '')
    text = text.replace(/_/g, '')
    text = text.replace(/`/g, '')

    return new Response(
      JSON.stringify({ text }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    )

  } catch (error: any) {
    console.error("Nawwi Wellness AI Error:", error.message)
    return new Response(
      JSON.stringify({
        error: error.message || "I am currently taking a small break. Please try again in a moment."
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    )
  }
})