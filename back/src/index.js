import express from 'express';
import cors from 'cors';
import { config } from './config/config.js';
import { errorHandler } from './middleware/error.middleware.js';
import userRoute  from './service/userRoutes.js'
import authenticateRoute  from './service/authenticationRoutes.js'

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});

userRoute(app);
authenticateRoute(app);
