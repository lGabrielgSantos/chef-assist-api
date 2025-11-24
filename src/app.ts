import express from 'express'
import routes from './routes'
import { logger } from './middlewares/logger.middleware'
import swaggerUi from 'swagger-ui-express'
import { swaggerSpec } from './config/swagger'
import cors from "cors";

const app = express()

app.use(express.json())

app.use(
  cors({
    origin: ["http://localhost:3000"], // Porta do seu frontend
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true,
  })
);

app.use(logger)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

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
