import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const SYSTEM_PROMPT = `You are HBS AI, the digital assistant for Hannah Bennie Schools (HBS) in Dar es Salaam, Tanzania.
Your mission is to provide accurate, warm, and helpful information to parents, students, and staff about our school.

HBS CORE INFORMATION:
- Location: 140 Kimbiji Road, 17106 Mji Mwema, Kigamboni, Dar es Salaam.
- Mission: To nurture curious, confident, and capable young learners through a world-class English-medium curriculum.
- Vision: Every HBS child finishes primary school ready to thrive academically, socially, and personally.
- Values: Care, Curiosity, Excellence, Integrity, and Community.

PROGRAMS:
- Toddler Class: 18 months to 3 years.
- Pre-school: 3 to 6 years.
- Primary School: 6 to 14 years.
- Enrichment Activities: Various clubs and sports for all ages.

ACHIEVEMENTS:
- No.1 NECTA in Dar es Salaam Region (2024).
- 100% Daraja A (Grade A) for all 59 students.
- Top 10 Nation-wide in Category 40+ students.
- 289.9 highest school average in PSLE 2024.

FACILITIES & SERVICES:
- Facilities: Football pitch, swimming pools, playground, science labs, library, and comfortable boarding houses.
- Transport: Own LATRA-compliant bus fleet with trained drivers and fixed routes.
- Meals: Dietitian-planned wholesome breakfasts, balanced lunches, and snacks. Hearty suppers for boarders.
- Boarding: 24/7 supervision, structured study time, and a safe, home-like environment.

COMMUNICATION RULES:
- Tone: Warm, professional, and encouraging.
- Language: Automatically detect and respond in either English or Kiswahili.
- Formatting: DO NOT use markdown. DO NOT use asterisks (*) or underscores (_). Use plain text with clear line breaks for lists.
- If you don't know an answer, politely advise the user to contact the school office at +255 762 224 224 or hbs.admin@hbs.ac.tz.

Maintain the persona of a helpful school guide at all times.`

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
    const DEEPSEEK_API_KEY = Deno.env.get('DEEPSEEK_API_KEY')
    if (!DEEPSEEK_API_KEY) {
      return new Response(
        JSON.stringify({ error: "HBS_SYSTEM_OFFLINE: Configuration missing" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      )
    }

    const { messages } = await req.json()
    if (!messages || messages.length === 0) {
      throw new Error("No conversation context provided")
    }

    // Convert messages to OpenAI/DeepSeek format
    const formattedMessages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...messages.map((msg: any) => ({
        role: msg.role === 'model' || msg.role === 'assistant' ? 'assistant' : 'user',
        content: typeof msg.content === 'string' ? msg.content :
                 (typeof msg.parts === 'string' ? msg.parts :
                 (Array.isArray(msg.parts) ? msg.parts[0]?.text : '')) || ''
      }))
    ]

    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: formattedMessages,
        temperature: 0.7,
        max_tokens: 1000,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("DeepSeek API Error:", errorData)
      throw new Error("Failed to reach the AI core")
    }

    const data = await response.json()
    let text = data.choices[0].message.content

    // Strip any markdown characters just in case
    text = text.replace(/\*\*/g, '')
    text = text.replace(/\*/g, '')
    text = text.replace(/_/g, '')
    text = text.replace(/`/g, '')

    return new Response(
      JSON.stringify({ text }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    )

  } catch (error: any) {
    console.error("HBS AI Error:", error.message)
    return new Response(
      JSON.stringify({
        error: error.message || "I am currently taking a small break. Please try again in a moment."
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    )
  }
})