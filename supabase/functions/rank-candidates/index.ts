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
      throw new Error("Configuration missing: DEEPSEEK_API_KEY")
    }

    const { jobDescription, candidates } = await req.json()
    if (!jobDescription || !candidates) {
      throw new Error("Missing job description or candidates list")
    }

    const prompt = `You are the HBS AI HR Specialist for Hannah Bennie Schools.
Your task is to rank the following candidates for the job description provided below.

JOB DESCRIPTION:
${jobDescription}

CANDIDATES:
${JSON.stringify(candidates, null, 2)}

RANKING CRITERIA:
1. Alignment with HBS values (Care, Curiosity, Excellence).
2. Pedagogical expertise (for teaching roles) or technical proficiency (for non-teaching roles).
3. Experience in similar environments (International/English-medium schools).
4. Clarity and professionalism of the application.

OUTPUT FORMAT:
Provide a ranked list. For each top candidate, include:
- A match score (0-100%).
- Key strengths.
- Potential concerns (if any).
- Recommendation level (Highly Recommended, Recommended, Consider).

DO NOT use markdown formatting (no bold, no asterisks). Use plain text only with clear spacing.
Keep the tone professional and objective.`

    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.3, // Lower temperature for more objective ranking
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to reach DeepSeek API")
    }

    const data = await response.json()
    let text = data.choices[0].message.content

    // Cleanup markdown just in case
    text = text.replace(/\*\*/g, '')
    text = text.replace(/\*/g, '')
    text = text.replace(/#/g, '')

    return new Response(
      JSON.stringify({ analysis: text }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    )

  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    )
  }
})