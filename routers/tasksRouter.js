import express from 'express'
import tasksController from '../controllers/tasksController.js'

const TaskRouter = express.Router();

TaskRouter.get("/", tasksController.getList);
TaskRouter.get("/:id", tasksController.getById);
TaskRouter.post("/", tasksController.add);
TaskRouter.put("/:id", tasksController.update);
TaskRouter.delete("/:id", tasksController.delete);

export default TaskRouter
