// openaiClient.ts
import OpenAI from "openai";

export async function initializeOpenAIClient() {
  const openai = new OpenAI({
    apiKey: import.meta.env.VITE_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  const chatCompletion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: "Hello!" }],
  });
  console.log(chatCompletion.choices[0].message.content);
}
