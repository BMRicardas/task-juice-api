import express from "express";
import { userRouter } from "./domains/users/users.route";
import { taskRouter } from "./domains/tasks/tasks.route";

const PORT = 4000;

const app = express();

app.use(express.json());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/tasks", taskRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
