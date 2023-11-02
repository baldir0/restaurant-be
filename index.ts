import 'dotenv/config';
import express, { json } from 'express';
import 'express-async-errors';
import rateLimit from 'express-rate-limit';

const app = express();

app.use(json());
app.use(rateLimit({
    windowMs: 5 * 60 * 1000,
    limit: 100
}))


// const port = process.env.APP_BACK;
app.listen(Number(process.env.APP_PORT), process.env.APP_HOST, () => {
    console.log(`Server listen on http://${process.env.APP_HOST}:${process.env.APP_PORT}/`)
}) 