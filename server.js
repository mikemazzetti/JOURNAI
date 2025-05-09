import express from "express";
import cors from "cors";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/api/get-prompt", async (req, res) => {
  try {
    const { journalText } = req.body;

    if (!journalText) {
      return res.status(400).json({ error: "Journal text is required" });
    }

    const promptForAI = `Based on the following journal entry text, suggest a short and thoughtful follow-up prompt (1 sentence maximum length) to encourage more reflection. Do not repeat the text given, just provide the responseprompt, and use past entries for more insight.

Journal Text:
"${journalText}"

Suggested follow-up prompt:`;

    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: "user", content: promptForAI }],
      model: "gpt-3.5-turbo", // Select whatever model you want here
      temperature: 0.6,
      max_tokens: 50,
      n: 1,
    });

    const prompt = chatCompletion.choices[0]?.message?.content?.trim();
    if (prompt) {
      res.json({ prompt });
    } else {
      throw new Error("No prompt suggestion received from AI model");
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      error: "Failed to get prompt suggestion",
      details: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});