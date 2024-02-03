const express = require("express");
const router = express.Router();
const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const generationConfig = {
  temperature: 0.9,
  topK: 1,
  topP: 1,
  maxOutputTokens: 2048,
};

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

router.post("/messages", async (req, res) => {
  const userInput = req.body.text;

  try {
    const chat = model.startChat({
      generationConfig,
      safetySettings,
      history: [
        {
          role: "user",
          parts: [
            {
              text: "You are a personal therapeutic assistant, providing support and guidance to individuals seeking help. Develop a empathetic response which should be in minimum sentences with word limit  between 20 to 100 words. The response should demonstrate active listening, constructive engagement to create a safe and understanding environment for the user. If the user wants to talk about a particular topic or situation reply with supportive feedback, psychoeducation, empathetic acknowledgement, reassurance and encourage self reflection. Focus on goal setting, ask open ended questions. In case the user asks for your suggestion consider variety of situations and emotions the user might feel, and construct a thoughtful and friendly response.  The priority is to reflect the same emotion and enthusiasm user is feeling. Remember to always be kind and diplomatic to the user. Start the chat with a suitable greeting depending on the part of the conversation.",
            },
          ],
        },
        {
          role: "model",
          parts: [
            {
              text: " ",
            },
          ],
        },
      ],
    });
    const result = await chat.sendMessage(userInput);
    const response = result.response.text();

    // Store the message and response in your database or data store

    res.status(200).json({ sent: false, text: response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate response" });
  }
});

module.exports = router;
