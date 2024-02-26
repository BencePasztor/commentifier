import express from 'express'
import router from '@/routes'
import {
  cookieParserMiddleware,
  corsMiddleware,
  notFoundMiddleware,
  errorHandlerMiddleware,
  jsonMiddleware,
  morganMiddleware,
  publicMiddleware,
  helmetMiddleware
} from '@/middleware'

const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morganMiddleware)
}

app.use(
  helmetMiddleware,
  corsMiddleware,
  cookieParserMiddleware,
  jsonMiddleware,
  publicMiddleware,
  router,
  notFoundMiddleware,
  errorHandlerMiddleware
)

app.get('/', (req, res) => {
  res.send('It works! ^.^')
})

export default app
