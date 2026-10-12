import express from "express";

const HealthRouter = express.Router();

HealthRouter.get("/health", (req, res) => {
  res.json({
    success: true,
    Message: "Api is healthy !!",
  });
});

HealthRouter.get("/test-error", (req, res, next) => {
  const err = new Error("Test error");
  err.statusCode = 400;
  next(err);
});

export default HealthRouter;
