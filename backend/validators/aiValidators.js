export const validateAIMessage = (req, res, next) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({
      success: false,
      message: "Message is required",
    });
  }

  if (typeof message !== "string") {
    return res.status(400).json({
      success: false,
      message: "Message must be a string",
    });
  }

  if (message.trim().length === 0) {
    return res.status(400).json({
      success: false,
      message: "Message cannot be empty",
    });
  }

  if (message.length > 1000) {
    return res.status(400).json({
      success: false,
      message: "Message cannot exceed 1000 characters",
    });
  }

  next();
};