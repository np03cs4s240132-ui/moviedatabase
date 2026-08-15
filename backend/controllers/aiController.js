import { askGroq } from "../services/groqAPI.js";

export const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;

    const reply = await askGroq(message);

    res.status(200).json({
      success: true,
      data: {
        reply,
      },
    });
  } catch (error) {
    console.error("AI Controller Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to get AI response",
    });
  }
};