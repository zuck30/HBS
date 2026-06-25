import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function getScentRecommendation(quizAnswers: any) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
    You are a scent expert for Nawwi Wellness, a luxury candle brand from Tanzania.
    Based on the following user preferences, recommend 3-5 candles from our collection.

    User Preferences:
    ${JSON.stringify(quizAnswers)}

    Please respond in a structured JSON format:
    {
      "recommendations": [
        { "name": "Candle Name", "reason": "Why it matches", "match_type": "Best Match | Also Consider | Budget Option" }
      ]
    }
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  try {
    // Attempt to parse JSON from the response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    return jsonMatch ? JSON.parse(jsonMatch[0]) : { error: "Failed to parse recommendation" };
  } catch (e) {
    return { error: "Invalid response from AI" };
  }
}
