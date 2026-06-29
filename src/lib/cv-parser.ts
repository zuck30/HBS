'use server';

// @ts-ignore
import pdf from 'pdf-parse/lib/pdf-parse';
import { deepseekChat } from './deepseek';

export async function parseCVAction(arrayBuffer: ArrayBuffer) {
  try {
    const buffer = Buffer.from(arrayBuffer);
    const data = await pdf(buffer);
    const text = data.text;

    // Use AI to extract structured data from the text
    const prompt = `Extract structured information from the following CV text.
    Strictly follow these rules:
    1. Extract only what is present in the text.
    2. DO NOT assume or hallucinate teaching-related skills (like "Curriculum Development") if the candidate is applying for a technical role, unless they are explicitly in the text.
    3. Provide the result in VALID JSON format.

    JSON fields:
    - full_name
    - email
    - phone
    - education (brief summary)
    - experience (number of years)
    - skills (list of strings)
    - summary (brief professional summary)

    CV TEXT:
    ${text.substring(0, 4000)}

    Response must be ONLY the JSON object, no other text.`;

    const aiResponse = await deepseekChat([{ role: 'user', content: prompt }], false);

    // Attempt to parse JSON from AI response
    let parsedData = {};
    try {
      // Find the first { and last } to extract JSON in case AI added extra text
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsedData = JSON.parse(jsonMatch[0]);
      }
    } catch (e) {
      console.error("Failed to parse AI JSON response", e);
    }

    return {
      text,
      parsedData,
      wordCount: text.split(/\s+/).length,
    };
  } catch (error) {
    console.error('Error parsing PDF:', error);
    throw new Error('Failed to parse CV');
  }
}
