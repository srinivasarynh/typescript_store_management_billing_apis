import express from 'express';
import 'express-async-errors';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import hpp from 'hpp';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swaggerDocs/swagger';

import config from './config';

import { itemRouter } from "./routes/itemRouter";
import { billRouter } from "./routes/billRouter"

import { errorController } from "./controllers/errorController";
const app = express();


app.use(cors({
    origin: "*"
}));

app.options('*', cors());
app.use(helmet());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


if (config.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(hpp());
app.use(compression());
app.set('trust proxy', 1);


app.use("/api/v1/items", itemRouter);
app.use("/api/v1/bills", billRouter);


app.all('*', async (req, res) => {
    res.status(400).json({
        status: "error",
        message: "Please navigate to /api-docs to access api docs"
    })
});

app.use(errorController);

export default app;