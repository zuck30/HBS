export async function getNawwiResponse(messages: { role: string; parts: { text: string }[] }[]) {
  const endpoint = process.env.NEXT_PUBLIC_CHAT_API_URL || '/api/chat';

  if (!endpoint || endpoint === 'your_supabase_edge_function_url') {
    // Fallback for development if env is not set
    if (process.env.NODE_ENV === 'development') {
        return "Nawwi AI development mode active. Please configure NEXT_PUBLIC_CHAT_API_URL for production.";
    }
    console.error("CHAT_API_URL is not defined");
    throw new Error("Chat service is currently unavailable.");
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''}`,
    },
    body: JSON.stringify({ messages }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to get response from Nawwi AI");
  }

  const data = await response.json();
  return data.text;
}
