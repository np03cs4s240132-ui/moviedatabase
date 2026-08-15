import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config(
    {
        path: "./backend/.env"
    }
);

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export const askGroq = async (message) => {
  const response = await client.chat.completions.create({
    model: process.env.GROQ_MODEL || "openai/gpt-oss-20b",

    messages: [
      {
        role: "system",
        content:
          "You are a helpful movie assistant. Answer questions about movies, actors, genres, ratings, recommendations and watchlists. Keep responses short, around 2 or 3 lines.",
      },
      {
        role: "user",
        content: message,
      },
    ],
  });

  return response.choices[0].message.content;
};