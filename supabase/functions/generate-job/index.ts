import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

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
      throw new Error("Configuration missing")
    }

    const { jobTitle } = await req.json()
    if (!jobTitle) {
      throw new Error("Missing job title")
    }

    const prompt = `You are the HBS HR Manager. Generate a professional and humanized job description for the position of "${jobTitle}" at Hannah Bennie Schools (HBS).

HBS CONTEXT:
We are a leading Nursery & Primary school in Dar es Salaam, No.1 NECTA 2024. We value Care, Curiosity, and Excellence.

REQUIREMENTS FOR THE DESCRIPTION:
1. Overview: Warm introduction to the role and how it fits into the HBS family.
2. Key Responsibilities: Bulleted list of duties.
3. Requirements & Qualifications: What we are looking for in a candidate.
4. Why HBS: Mention our community, facilities, and commitment to excellence.

FORMATTING:
DO NOT use markdown (no bold, no asterisks). Use plain text with clear headings and line breaks.
Keep the tone professional yet inviting.`

    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      throw new Error("DeepSeek API failure")
    }

    const data = await response.json()
    let text = data.choices[0].message.content

    // Cleanup markdown
    text = text.replace(/\*\*/g, '')
    text = text.replace(/\*/g, '')

    return new Response(
      JSON.stringify({ description: text }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    )

  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    )
  }
})