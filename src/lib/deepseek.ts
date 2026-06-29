'use server';

// Helper function to clean markdown from text
function cleanMarkdown(text: string): string {
  // Remove markdown bold/italic ** and *
  let cleaned = text.replace(/\*\*(.*?)\*\*/g, '$1'); // Remove **bold**
  cleaned = cleaned.replace(/\*(.*?)\*/g, '$1'); // Remove *italic*
  cleaned = cleaned.replace(/__(.*?)__/g, '$1'); // Remove __underline__
  cleaned = cleaned.replace(/_(.*?)_/g, '$1'); // Remove _italic_
  
  // Remove markdown headers (#, ##, etc.)
  cleaned = cleaned.replace(/^#{1,6}\s+/gm, '');
  
  // Remove markdown links [text](url)
  cleaned = cleaned.replace(/\[(.*?)\]\(.*?\)/g, '$1');
  
  // Remove markdown code blocks
  cleaned = cleaned.replace(/```[\s\S]*?```/g, '');
  cleaned = cleaned.replace(/`(.*?)`/g, '$1');
  
  // Remove markdown lists (-, *, +)
  cleaned = cleaned.replace(/^[\s]*[-*+]\s+/gm, '• ');
  
  // Clean up extra whitespace
  cleaned = cleaned.replace(/\n{3,}/g, '\n\n');
  cleaned = cleaned.trim();
  
  return cleaned;
}

// DeepSeek API call with timeout and retry logic
export async function deepseekChat(messages: { role: string; content: string }[], clean: boolean = true) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000);

  try {
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages,
        temperature: 0.7,
        max_tokens: 1000,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('DeepSeek API Error:', errorData);
      throw new Error(`DeepSeek API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const rawContent = data.choices[0].message.content;
    
    // Clean the markdown before returning if requested
    return clean ? cleanMarkdown(rawContent) : rawContent;
  } catch (error: any) {
    clearTimeout(timeoutId);
    
    if (error.name === 'AbortError') {
      throw new Error('Request timeout - please try again');
    }
    
    console.error('DeepSeek API Error:', error);
    throw new Error('Failed to get response from AI. Please try again.');
  }
}

export async function deepseekGenerateJobDescription(jobTitle: string) {
  const prompt = `Generate a complete job description for the position of "${jobTitle}" at Hannah Bennie Schools (HBS). Include sections for Overview, Key Responsibilities, Requirements, and Qualifications. The tone should be professional yet simple and clear. Do not use markdown formatting. Use plain text only.`;

  return await deepseekChat([{ role: 'user', content: prompt }]);
}

export async function deepseekRankCandidates(jobDescription: string, candidates: any[]) {
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
Provide a ranked list. For each candidate, include:
- A match score (0-100%).
- Key strengths.
- Potential concerns (if any).
- Recommendation level (Highly Recommended, Recommended, Consider).

DO NOT use markdown formatting (no bold, no asterisks). Use plain text only with clear spacing.
Keep the tone professional and objective.`;

  return await deepseekChat([{ role: 'user', content: prompt }]);
}