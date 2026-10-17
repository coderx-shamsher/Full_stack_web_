import express from "express";
import sqlConnection from "../Database/Queries/sql.server.connection.js";

const HealthRouter = express.Router();

HealthRouter.get("/backend", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend is running",
  });
});

HealthRouter.get("/database", async (req, res) => {
  try {
    // MySQL pool/connection 
    const connection = await sqlConnection.getConnection();

    try {
      await connection.query("SELECT 1");
    } 
    finally {
      connection.release();
    }

    res.status(200).json({
      success: true,
      message: "Database is connected",
    });

  } catch (error) {
    res.status(503).json({
      success: false,
      message: "Database is unavailable",
    });
  }
});

HealthRouter.get("/test-error", (req, res, next) => {
  const err = new Error("Test error");
  err.statusCode = 400;
  next(err);
});

export default HealthRouter;
