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
  helmetMiddleware,
  decodeJwtMiddleware
} from '@/middleware'

const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morganMiddleware)
}

app.use(helmetMiddleware, corsMiddleware)

app.get('/', (req, res) => {
  res.send('It works! ^.^')
})

app.use(
  cookieParserMiddleware,
  jsonMiddleware,
  decodeJwtMiddleware,
  publicMiddleware,
  router,
  notFoundMiddleware,
  errorHandlerMiddleware
)

export default app
