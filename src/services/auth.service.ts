import { supabase } from "../config/supabaseClient"

export class AuthService {
  // Cria novo usuário
  async register(email: string, password: string, name?: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name }, // dados adicionais salvos no perfil
      },
    })

    if (error) throw new Error(error.message)
    return data.user
  }

  // Login do usuário
  async login(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw new Error(error.message)
    return data.session // contém o JWT e dados do usuário
  }

  // Verifica token JWT
  async verifyToken(token: string) {
    const { data, error } = await supabase.auth.getUser(token)
    if (error) throw new Error(error.message)
    return data.user
  }
}
