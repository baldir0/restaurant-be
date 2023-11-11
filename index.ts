import 'dotenv/config';
import express, { json, urlencoded } from 'express';
import 'express-async-errors';
import rateLimit from 'express-rate-limit';
import { restaurantRouter } from './routes/restaurant.router';
import cors from 'cors';
import { errorHandler } from './utils/errorHandler';
import { productRouter } from './routes/product.router';

const app = express();

app.use(cors({
    origin: ["http://localhost:3000"],
}))
app.use(json());
app.use(urlencoded({
    extended: true
}))

app.use(rateLimit({
    windowMs: 5 * 60 * 1000,
    limit: 100
}))

app.use('/restaurant', restaurantRouter)
app.use('/products', productRouter)

// const port = process.env.APP_BACK;

app.use(errorHandler);
app.listen(Number(process.env.APP_PORT), process.env.APP_HOST, () => {
    console.log(`Server listen on http://${process.env.APP_HOST}:${process.env.APP_PORT}/`)
}) 