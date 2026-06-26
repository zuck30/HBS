'use server';

export async function deepseekChat(messages: { role: string; content: string }[]) {
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
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch from DeepSeek API');
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

export async function deepseekGenerateJobDescription(jobTitle: string) {
  const prompt = `Generate a complete job description for the position of "${jobTitle}" at Hannah Bennie Schools (HBS). Include sections for Overview, Key Responsibilities, Requirements, and Qualifications. The tone should be professional yet simple and clear.`;

  return await deepseekChat([{ role: 'user', content: prompt }]);
}

export async function deepseekRankCandidates(jobDescription: string, candidates: any[]) {
  const prompt = `Rank the following candidates for the job: ${jobDescription}\n\nCandidates:\n${JSON.stringify(candidates)}\n\nProvide a ranked list with score breakdowns, insights, and reasons for recommendation for each top candidate.`;

  return await deepseekChat([{ role: 'user', content: prompt }]);
}
