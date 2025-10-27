import { Request, Response, NextFunction } from "express"
import { supabase } from "../config/supabaseClient"
import { error } from "../utils/response"
import { User } from "@supabase/supabase-js"

interface AuthenticatedRequest extends Request {
  user?: User
}

export async function authenticate(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization
  if (!authHeader) return error(res, "Missing token.", 401)

  const token = authHeader.split(" ")[1]
  const { data, error: authError } = await supabase.auth.getUser(token)

  if (authError || !data.user) return error(res, "Invalid token.", 401)

  req.user = data.user // ✅ sem erro de tipo
  next()
}
