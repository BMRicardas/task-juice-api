import express from "express";
import { userRouter } from "./domains/users/users.route";
import { taskRouter } from "./domains/tasks/tasks.route";
import rateLimit from "express-rate-limit";

const PORT = process.env.PORT;

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});
app.use("/api", limiter);

app.use(express.json());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/tasks", taskRouter);

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error.message);
  process.exit(1); // Exit to prevent an unstable state
});

process.on("unhandledRejection", (error) => {
  if (error instanceof Error) {
    console.error("Unhandled Rejection:", error.message);
  } else {
    console.error("Unhandled Promise Rejection:", error);
  }
  process.exit(1);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
