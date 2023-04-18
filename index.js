import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors';

import TaskRouter from './routers/tasksRouter.js';
import AuthController from './controllers/AuthController.js';
import connectDB from './db.js';
import AuthRouter from './routers/authRouter.js';

connectDB()

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/',AuthRouter)
app.use("/", AuthController.auth)
app.use('/items', TaskRouter);


app.listen(port, () => {
  console.log(process.env.uri, "uri");
  console.log(process.env.secretKey, "secret")

  console.log(`Example app listening at http://localhost:${port}`);
});