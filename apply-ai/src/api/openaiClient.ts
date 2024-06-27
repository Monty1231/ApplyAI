import OpenAI from 'openai';

export async function initializeOpenAIClient(userMessage: string) {
  const openai = new OpenAI({
    apiKey: import.meta.env.VITE_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  const chatCompletion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: userMessage }],
  });

  return chatCompletion.choices[0].message.content;
}
