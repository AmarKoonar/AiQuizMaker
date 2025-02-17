const OpenAI = require('openai');
require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');

app.use(cors());
const token = process.env.AI_KEY;
app.use(express.json());
const client = new OpenAI({
    baseURL: "https://models.inference.ai.azure.com",
    apiKey: token
  });

app.post('/get_question', async (req, res) => {
    const {subject,num} = req.body;
    const response = await client.chat.completions.create({
        messages: [
          { role:"system", content: "" },
          { role:"user", content: `Generate ${num} multiple-choice questions on the subject ${subject}'.
            Follow this JSON structure:
            {
              "questions": [
                {
                  "question": "string",
                  "answers": ["string", "string", "string", "string"],
                  "correct_answer": "string"
                }
              ]
            }
            Make sure the response is valid JSON.`}
        ],
        model: "gpt-4o-mini",
        temperature: 1,
        max_tokens: 4096,
        top_p: 1
      });
    const rawResponse = response.choices[0].message.content;
    const cleanedResponse = rawResponse.replace(/```json|```/g, '').trim();
    const message = JSON.parse(cleanedResponse);

    //const quizData = JSON.parse(message);
    res.json(message);
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
