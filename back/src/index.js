import express from 'express';
import cors from 'cors';
import { config } from './config/config.js';
import { errorHandler } from './middleware/error.middleware.js';
import {getUser} from './service/user.js'

const app = express();

app.use(cors());
app.use(express.json());

app.use(errorHandler);
app.get('/users-list/:id', getUser);

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});