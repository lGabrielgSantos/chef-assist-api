import express from 'express'
import routes from './routes'
import { logger } from './middlewares/logger.middleware'

const app = express()

app.use(express.json())

app.use(logger)

app.use('/api', routes)

app.use((req, res) => {
  return res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found.`,
  })
})

app.use((err: any, req: any, res: any, next: any) => {
  console.error('❌ Global error:', err)
  return res.status(500).json({
    success: false,
    message: 'Internal server error.',
  })
})

export default app
