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
    Provide the result in JSON format with the following fields:
    - full_name
    - email
    - phone
    - education (summary)
    - experience (years of experience as a number)
    - skills (list of strings)
    - summary (brief professional summary)

    CV TEXT:
    ${text.substring(0, 4000)} // Limit text size for API

    Response must be ONLY the JSON object, no other text.`;

    const aiResponse = await deepseekChat([{ role: 'user', content: prompt }]);

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
