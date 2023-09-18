import express from "express";
import * as dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const apiK = process.env.OPENAI_API_KEY;

const router = express.Router();

const openai = new OpenAI({
  apiKey: apiK,
});

router.route("/").get((req, res) => {
  res.send("Hello from Dalle");
});

router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body;

    const aiResponse = await openai.images.generate({
      model: "image-alpha-001", // Use the appropriate DALL-E model name
      prompt,
      n: 1,
      size: "1024x1024",
      response_format: "url",
    });

    const image = aiResponse.data;

    res.status(200).json({ photo: image });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send(
        error.response ? error.response.data.error.message : "An error occurred"
      );
  }
});

export default router;
