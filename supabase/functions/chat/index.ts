import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const DEEPSEEK_API_KEY = Deno.env.get('DEEPSEEK_API_KEY')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { messages } = await req.json()

    const systemPrompt = `
      You are the HBS Assistant, a helpful AI representative for Hannah Bennie Schools (HBS).
      HBS is a premier Nursery and Primary school in Kigamboni, Dar es Salaam.

      Key Info:
      - NECTA No.1 in Dar es Salaam Region (2024).
      - Programs: Toddler Class (18m-3y), Pre-school (3-6y), Primary School (6-14y), Enrichment.
      - Facilities: Swimming pools, Football pitch, Science labs, Computer rooms, Library.
      - Values: Care, Curiosity, Excellence, Integrity, Community.
      - We offer boarding for primary students.
      - Location: 140 Kimbiji Road, Mji Mwema, Kigamboni.

      Always be professional, warm, and informative. If you don't know an answer, ask the user to contact hbs.admin@hbs.ac.tz.
      Keep responses concise and formatted for a chat interface.
    `

    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages
        ],
      }),
    })

    const data = await response.json()
    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
