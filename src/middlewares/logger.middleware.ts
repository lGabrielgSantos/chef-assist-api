import { Request, Response, NextFunction } from 'express'

export function logger(req: Request, res: Response, next: NextFunction) {
  const start = Date.now()

  res.on('finish', () => {
    const duration = Date.now() - start
    const method = req.method
    const url = req.originalUrl
    const status = res.statusCode

    const log = `[${new Date().toISOString()}] ${method} ${url} ${status} - ${duration}ms`
    console.log(log)
  })

  next()
}
