import { Response } from "express";

export function success(
  res: Response,
  data: any,
  message = "Operation completed successfully.",
  p0: number
) {
  return res.status(200).json({
    success: true,
    message,
    data,
  });
}

export function error(
  res: Response,
  message = "Internal server error.",
  status = 500
) {
  return res.status(status).json({
    success: false,
    message,
  });
}
