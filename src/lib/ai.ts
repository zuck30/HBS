/**
 * AI Utilities for HBS using Deepseek
 */

const DEEPSEEK_API_KEY = process.env.NEXT_PUBLIC_DEEPSEEK_API_KEY;
const API_URL = 'https://api.deepseek.com/v1/chat/completions';

export async function generateJobDescription(jobTitle: string) {
  const prompt = `
    You are an HR expert for Hannah Bennie Schools (HBS), a top-tier Nursery and Primary school in Dar es Salaam, Tanzania.
    HBS is known for excellence (No.1 in NECTA 2024), nurturing curiosity, and providing world-class facilities.

    Generate a professional, warm, and humanized job description for the position: "${jobTitle}".
    Include:
    1. About the Role
    2. Key Responsibilities
    3. Requirements (Professional and Personal)
    4. Why Join HBS

    Keep the tone professional yet inviting. Use simple, clear English.
  `;

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7
      })
    });

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('AI Generation Error:', error);
    return null;
  }
}

export async function analyzeCV(cvText: string, jobRequirements: string) {
  const prompt = `
    You are an expert recruitment AI for Hannah Bennie Schools.
    Analyze the following CV text against the job requirements.

    Job Requirements:
    ${jobRequirements}

    CV Text:
    ${cvText}

    Tasks:
    1. Provide a "Suitability Score" from 0 to 100.
    2. Write a brief summary of why this candidate is a good or poor fit.
    3. List top 3 strengths and any red flags.

    Format the output as JSON:
    {
      "score": number,
      "summary": "string",
      "strengths": ["string"],
      "red_flags": ["string"]
    }
  `;

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [{ role: 'user', content: prompt }],
        response_format: { type: 'json_object' }
      })
    });

    const data = await response.json();
    return JSON.parse(data.choices[0].message.content);
  } catch (error) {
    console.error('AI CV Analysis Error:', error);
    return null;
  }
}
