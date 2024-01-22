import express from 'express';
import router from '@/routes';
import {
    cookieParserMiddleware,
    corsMiddleware,
    notFoundMiddleware,
    errorHandlerMiddleware,
    jsonMiddleware,
    morganMiddleware
} from "@/middleware"

const app = express();

if (process.env.NODE_ENV === 'development') {
    app.use(morganMiddleware);
}

app.get('/', (req, res) => {
    res.send('It works! ^.^');
});

app.use(
    corsMiddleware,
    cookieParserMiddleware,
    jsonMiddleware,
    router,
    notFoundMiddleware,
    errorHandlerMiddleware
)

export default app