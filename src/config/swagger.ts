import swaggerJsdoc from 'swagger-jsdoc'
import path from 'path'
import { fileURLToPath } from 'url'

// 👇 recria __dirname no contexto ESM
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Chef Assist API',
      version: '1.0.0',
      description: 'API for restaurant order and product management.',
    },
    servers: [{ url: 'http://localhost:3000/api/v1' }],
  },
  apis: [
    path.join(__dirname, '../docs/*.yaml')
  ],
}

export const swaggerSpec = swaggerJsdoc(swaggerOptions)
