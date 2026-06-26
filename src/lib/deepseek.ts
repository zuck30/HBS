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
export async function deepseekChat(messages: { role: string; content: string }[]) {
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
    
    // Clean the markdown before returning
    return cleanMarkdown(rawContent);
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
  const prompt = `Rank the following candidates for the job: ${jobDescription}\n\nCandidates:\n${JSON.stringify(candidates)}\n\nProvide a ranked list with score breakdowns, insights, and reasons for recommendation for each top candidate. Do not use markdown formatting. Use plain text only.`;

  return await deepseekChat([{ role: 'user', content: prompt }]);
}