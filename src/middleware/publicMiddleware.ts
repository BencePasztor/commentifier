import express from 'express'
import path from 'path'

export const publicMiddleware = express.static(
  path.resolve(__dirname, '..', '..', 'public')
)
