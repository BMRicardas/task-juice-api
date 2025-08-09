import express from "express";
import { userRouter } from "./domains/users/users.route";
import { taskRouter } from "./domains/tasks/tasks.route";
import rateLimit from "express-rate-limit";

const PORT = 4000;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});

const app = express();

app.use(limiter);
app.use(express.json());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/tasks", taskRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
