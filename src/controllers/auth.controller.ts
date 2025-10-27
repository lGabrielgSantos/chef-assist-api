import { Request, Response } from "express"
import { AuthService } from "../services/auth.service"
import { success, error } from "../utils/response"

const authService = new AuthService()

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const { email, password, name } = req.body
      const user = await authService.register(email, password, name)
      return success(res, user, "User created successfully.", 201)
    } catch (err: any) {
      return error(res, err.message || "Error creating user.")
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body
      const session = await authService.login(email, password)
      return success(res, session, "Login successful.", 200)
    } catch (err: any) {
      return error(res, err.message || "Invalid credentials.")
    }
  }

  async me(req: Request, res: Response) {
    try {
      const authHeader = req.headers.authorization
      if (!authHeader) return error(res, "Token missing.", 401)

      const token = authHeader.split(" ")[1]
      const user = await authService.verifyToken(token)
      return success(res, user, "Authenticated user.", 200)
    } catch (err: any) {
      return error(res, err.message || "Invalid token.")
    }
  }
}
