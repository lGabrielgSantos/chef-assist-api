import { Response } from 'express'

/**
 * ✅ Send a standardized success response
 */
export function success(res: Response, data: any, message = 'Operation completed successfully.') {
  return res.status(200).json({
    success: true,
    message,
    data,
  })
}

/**
 * ❌ Send a standardized error response
 */
export function error(res: Response, message = 'Internal server error.', status = 500) {
  return res.status(status).json({
    success: false,
    message,
  })
}
